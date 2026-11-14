/**
 * Cloudflare Pages Function — POST /api/optout
 *
 * Marketing unsubscribe. The visitor types an address on the data-processing
 * page; this forwards it to the automation, which takes them off the list.
 *
 * The webhook URL lives only in MAKE_WEBHOOK_OPTOUTMKT and the key in
 * MAKE_API_KEY — the same key the contact endpoint uses. Neither ever reaches
 * the public bundle.
 *
 * This file deliberately repeats the small helpers in `contact.js` rather than
 * importing them. Everything under `functions/` is a route, so a shared module
 * would need a layout this project has not tested, and the contact endpoint is
 * live. Twenty lines of duplication is the cheaper risk. IF YOU FIX A BUG IN
 * ONE OF THESE HELPERS, FIX IT IN BOTH.
 *
 * ---------------------------------------------------------------------------
 * THE ANSWER IS ALWAYS THE SAME, AND THAT IS THE POINT
 *
 * A valid request gets `{ ok: true }` whether or not the address was on the
 * list. Saying "you were not subscribed" would turn this into a way to ask the
 * site whether any given person is on it, one address at a time, from a form
 * that needs no account.
 *
 * The matching half of that rule lives in the automation, and this endpoint
 * cannot enforce it: ONLY SEND THE CONFIRMATION E-MAIL WHEN THE ADDRESS WAS
 * ACTUALLY FOUND AND UNSUBSCRIBED. Sending it either way would let anyone make
 * this domain post mail to a stranger by typing their address, which costs the
 * domain its sending reputation and the recipient their patience.
 * ---------------------------------------------------------------------------
 */

const UPSTREAM_TIMEOUT_MS = 8000;

const EMAIL_MAX_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Which language version asked, so the confirmation comes back in it. */
function normaliseLocale(raw) {
  if (typeof raw !== 'string' || raw.trim() === '') return 'pt';
  return raw.trim().toLowerCase().split(/[-_]/)[0] === 'pt' ? 'pt' : 'en';
}

/**
 * The honeypot field's name, duplicated from `src/lib/honeypot.js` because
 * everything under `functions/` is a route and cannot import from the Vite
 * tree. CHANGE IT IN ALL THREE PLACES AT ONCE: if the form stops sending the
 * field this looks for, the trap fails OPEN and nothing says so.
 */
const HONEYPOT_FIELD = 'helora_hp';

/**
 * A filled honeypot means a machine, because the field is off-screen, out of
 * the tab order and out of autofill.
 *
 * The caller is told `{ ok: true }` and nothing is forwarded. Answering 400
 * would tell a bot which field gave it away, and it would come back without
 * that field; a 200 ends the conversation and costs the automation nothing.
 */
function isTrapped(body) {
  const value = body[HONEYPOT_FIELD];
  return typeof value === 'string' && value.trim() !== '';
}

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

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
 * The whole payload is one address plus context. No name, no message: asking
 * for anything else would be collecting data in order to stop contacting
 * someone, which is the wrong direction.
 */
function validateRequest(body) {
  const raw = body.email;

  if (raw !== undefined && raw !== null && typeof raw !== 'string') return { errors: ['email'] };

  const email = typeof raw === 'string' ? raw.trim() : '';
  if (email === '' || email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { errors: ['email'] };
  }

  return {
    payload: {
      // Lowercased so the automation's lookup is not defeated by the caps a
      // visitor typed; addresses are matched case-insensitively in practice.
      email: email.toLowerCase(),
      locale: normaliseLocale(body.locale),
      // Stamped here, never taken from the client: this is the record of when
      // consent was withdrawn, and the visitor controls their own clock.
      requested_at: new Date().toISOString(),
      // Where the request came from, so a later channel (an e-mail footer
      // link, say) is distinguishable from this one.
      source: 'privacy_page',
    },
  };
}

async function forwardToMake(payload, { url, apiKey }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-make-apikey': apiKey },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      // Status only — never the body, the URL or the key.
      console.error(`[optout] upstream rejected the request (status ${upstream.status})`);
      return 'upstream_error';
    }
    return 'ok';
  } catch (error) {
    if (error && error.name === 'AbortError') {
      console.error(`[optout] upstream timed out after ${UPSTREAM_TIMEOUT_MS}ms`);
      return 'upstream_timeout';
    }
    console.error(`[optout] upstream request failed: ${error && error.name}`);
    return 'upstream_error';
  } finally {
    clearTimeout(timer);
  }
}

// onRequest, not onRequestPost, for the same reason as contact.js: a GET must
// get an explicit 405 here instead of falling through to the SPA rewrite and
// answering with HTML that a caller would read as success.
export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json; charset=utf-8', Allow: 'POST' },
    });
  }

  const url = env.MAKE_WEBHOOK_OPTOUTMKT;
  const apiKey = env.MAKE_API_KEY;

  if (!url || !apiKey) {
    console.error('[optout] missing MAKE_WEBHOOK_OPTOUTMKT and/or MAKE_API_KEY');
    return json(500, { ok: false, error: 'server_misconfigured' });
  }

  const body = await readJsonBody(request);
  if (!body) return json(400, { ok: false, error: 'invalid_json' });

  if (isTrapped(body)) {
    console.error('[optout] honeypot filled, dropping silently');
    return json(200, { ok: true });
  }

  const { errors, payload } = validateRequest(body);
  if (errors) return json(400, { ok: false, error: 'validation_error', fields: errors });

  const outcome = await forwardToMake(payload, { url, apiKey });

  if (outcome === 'upstream_timeout') return json(504, { ok: false, error: 'upstream_timeout' });
  if (outcome === 'upstream_error') return json(502, { ok: false, error: 'upstream_error' });

  // Same answer for an address that was on the list and one that never was.
  return json(200, { ok: true });
}
