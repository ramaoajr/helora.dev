/**
 * The honeypot field's name, shared by both forms.
 *
 * Intentionally duplicated in `functions/api/contact.js` and
 * `functions/api/optout.js`. Everything under `functions/` is a route, so
 * there is no shared module to import from. CHANGE IT IN ALL THREE OR THE
 * TRAP STOPS WORKING SILENTLY — the server would look for a field the form no
 * longer sends, which fails open rather than closed.
 *
 * Not called `website`, `url` or `fax`, which browsers and password managers
 * recognise and may autofill. A filled honeypot is dropped without a word, so
 * an autofilled one would be a real visitor's message vanishing with nothing
 * on screen to explain it. A name no vocabulary knows cannot be autofilled;
 * the generic bots this is aimed at fill every input they find regardless.
 */
export const HONEYPOT_FIELD = 'helora_hp';
