/* global process */
/**
 * Vercel Serverless Function (Node runtime) — POST /api/contact
 *
 * Server-side proxy for the contact form. The Make.com webhook URL and API key
 * live ONLY in environment variables (MAKE_WEBHOOK_URL / MAKE_API_KEY) so they
 * never reach the public JavaScript bundle.
 *
 * The browser gets back nothing but `{ ok: true }` or a generic error code —
 * the upstream status/body is never forwarded, so the internal automation
 * stays opaque to the client.
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
 * Vercel's Node runtime parses `application/json` bodies for us, but it can
 * also hand back a raw string (or nothing). Normalise to a plain object or
 * return null when the body is not usable JSON.
 */
function readJsonBody(req) {
  const body = req.body;

  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  if (body && typeof body === 'object' && !Array.isArray(body)) return body;

  return null;
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const url = process.env.MAKE_WEBHOOK_URL;
  const apiKey = process.env.MAKE_API_KEY;

  if (!url || !apiKey) {
    console.error('[contact] missing MAKE_WEBHOOK_URL and/or MAKE_API_KEY');
    return res.status(500).json({
      ok: false,
      error: 'server_misconfigured',
      message: 'Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.',
    });
  }

  const body = readJsonBody(req);
  if (!body) {
    return res.status(400).json({
      ok: false,
      error: 'invalid_json',
      message: 'Não foi possível ler os dados enviados.',
    });
  }

  const { errors, payload } = validateLead(body);
  if (errors) {
    return res.status(400).json({
      ok: false,
      error: 'validation_error',
      fields: errors,
      message: 'Verifique os campos obrigatórios e tente novamente.',
    });
  }

  const outcome = await forwardToMake(payload, { url, apiKey });

  if (outcome === 'upstream_timeout') {
    return res.status(504).json({
      ok: false,
      error: 'upstream_timeout',
      message: 'O envio demorou demais. Tente novamente.',
    });
  }

  if (outcome === 'upstream_error') {
    return res.status(502).json({
      ok: false,
      error: 'upstream_error',
      message: 'Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.',
    });
  }

  return res.status(200).json({ ok: true });
}
