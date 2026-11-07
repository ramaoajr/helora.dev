/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Server-side proxy for the contact form. The Make.com webhook URL and API key
 * live ONLY in environment variables (MAKE_WEBHOOK_URL / MAKE_API_KEY) so they
 * never reach the public JavaScript bundle.
 *
 * The browser gets back nothing but `{ ok: true }` or a generic error code —
 * the upstream status/body is never forwarded, so the internal automation
 * stays opaque to the client.
 *
 * Ported from the Vercel Serverless Function this started life as. The
 * validation rules below are unchanged; only the request/response plumbing
 * differs (Workers runtime: Request/Response objects, `env` instead of
 * `process.env`, and no pre-parsed body).
 */

const UPSTREAM_TIMEOUT_MS = 8000;

// Whitelist: exactly the payload shape the contact form sends.
// `required` fields are enforced here on the server — the browser's
// checkValidity() is only a UX echo and must never be trusted.
const FIELDS = [
  { name: 'name', required: true, maxLength: 120 },
  { name: 'company', required: true, maxLength: 160 },
  { name: 'email', required: true, maxLength: 254 },
  { name: 'phone', required: false, maxLength: 40 },
  { name: 'subject', required: false, maxLength: 200 },
  { name: 'message', required: false, maxLength: 5000 },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Which language version of the site the lead came from, so the automation can
 * pick the matching auto-reply template.
 *
 * Kept out of FIELDS on purpose: those entries get a generic "is a string,
 * under N characters" check, which would happily forward `locale: "<script>"`.
 * This clamps the value to exactly two outcomes, so the branch downstream is a
 * clean two-way split that never needs a catch-all arm.
 */
function normaliseLocale(raw) {
  // Absent — a visitor on a cached bundle from before this field existed.
  // Portuguese is the only published version, so that is where they were.
  // Revisit this default once /en ships and both are in circulation.
  if (typeof raw !== 'string' || raw.trim() === '') return 'pt';

  // Present — the rule as specified: Portuguese is 'pt', anything else is
  // 'en'. Matching on the primary subtag keeps pt, pt-BR and pt-PT together.
  return raw.trim().toLowerCase().split(/[-_]/)[0] === 'pt' ? 'pt' : 'en';
}

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

/**
 * The Workers runtime hands us a raw Request, so the body is parsed here.
 * Anything that is not a JSON object returns null.
 */
async function readJsonBody(request) {
  let parsed;
  try {
    parsed = await request.json();
  } catch {
    return null;
  }
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
}

/**
 * Validates and normalises the lead. Returns either the sanitised payload
 * (whitelisted keys only, same shape the form used to POST to Make) or the
 * list of invalid fields.
 */
function validateLead(body) {
  const errors = [];
  const payload = {};

  for (const field of FIELDS) {
    const raw = body[field.name];

    if (raw !== undefined && raw !== null && typeof raw !== 'string') {
      errors.push(field.name);
      continue;
    }

    const value = typeof raw === 'string' ? raw.trim() : '';

    if (field.required && value === '') {
      errors.push(field.name);
      continue;
    }

    if (value.length > field.maxLength) {
      errors.push(field.name);
      continue;
    }

    payload[field.name] = value;
  }

  if (!errors.includes('email') && !EMAIL_PATTERN.test(payload.email || '')) {
    errors.push('email');
  }

  // Derived, never rejected: an odd value becomes a valid one rather than
  // failing a lead that is otherwise complete.
  payload.locale = normaliseLocale(body.locale);

  return errors.length > 0 ? { errors } : { payload };
}

/**
 * Forwards the sanitised lead to Make with the secret header.
 * Never returns the upstream body to the caller — only an outcome tag.
 */
async function forwardToMake(payload, { url, apiKey }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-make-apikey': apiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      // Status only — never the body, and never the URL or key.
      console.error(`[contact] upstream rejected the lead (status ${upstream.status})`);
      return 'upstream_error';
    }

    return 'ok';
  } catch (error) {
    if (error && error.name === 'AbortError') {
      console.error(`[contact] upstream timed out after ${UPSTREAM_TIMEOUT_MS}ms`);
      return 'upstream_timeout';
    }
    console.error(`[contact] upstream request failed: ${error && error.name}`);
    return 'upstream_error';
  } finally {
    clearTimeout(timer);
  }
}

// Exported as onRequest rather than onRequestPost so that a non-POST gets an
// explicit 405 here, instead of falling through to the SPA rewrite and
// answering with HTML that the form would read as success.
export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json; charset=utf-8', Allow: 'POST' },
    });
  }

  const url = env.MAKE_WEBHOOK_URL;
  const apiKey = env.MAKE_API_KEY;

  if (!url || !apiKey) {
    console.error('[contact] missing MAKE_WEBHOOK_URL and/or MAKE_API_KEY');
    return json(500, {
      ok: false,
      error: 'server_misconfigured',
      message: 'Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.',
    });
  }

  const body = await readJsonBody(request);
  if (!body) {
    return json(400, {
      ok: false,
      error: 'invalid_json',
      message: 'Não foi possível ler os dados enviados.',
    });
  }

  const { errors, payload } = validateLead(body);
  if (errors) {
    return json(400, {
      ok: false,
      error: 'validation_error',
      fields: errors,
      message: 'Verifique os campos obrigatórios e tente novamente.',
    });
  }

  const outcome = await forwardToMake(payload, { url, apiKey });

  if (outcome === 'upstream_timeout') {
    return json(504, {
      ok: false,
      error: 'upstream_timeout',
      message: 'O envio demorou demais. Tente novamente.',
    });
  }

  if (outcome === 'upstream_error') {
    return json(502, {
      ok: false,
      error: 'upstream_error',
      message: 'Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.',
    });
  }

  return json(200, { ok: true });
}
