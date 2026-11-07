/**
 * The consent record's client half.
 *
 * `CONSENT_VERSION` is intentionally duplicated in `functions/api/contact.js`,
 * in its `CONSENT_VERSIONS` allowlist. `functions/` is bundled separately from
 * the Vite tree and cannot import across the `@` alias, so there is no shared
 * module to put it in.
 *
 * THE TWO MUST ALWAYS CHANGE TOGETHER, IN THE SAME COMMIT. If the client posts
 * a version the server's allowlist does not carry, every submission fails with
 * a `consent_version` validation error — the form looks broken for a reason
 * nobody will guess from the screen.
 *
 * The wording below is what that version identifies. Changing a word of either
 * label means a new version here and in the function, because a consent record
 * that cannot name the text it was given against is not a record.
 */

export const CONSENT_VERSION = '2026-11-07';

/** Where the mandatory label's link points. */
export const PRIVACY_PATH = '/privacidade';

/**
 * Mandatory consent. Split because the link closes the sentence and has to be
 * a real anchor in the JSX.
 */
export const CONSENT_LABEL =
  'Concordo com o tratamento dos meus dados e em ser contactado no e-mail ou telefone que informei.';

export const CONSENT_LINK_TEXT = 'Como tratamos seus dados';

/**
 * Optional marketing opt-in. Ships unticked, and nothing depends on it.
 *
 * "Posso cancelar quando quiser" states a right the LGPD already grants
 * (Art. 8 §5 — consent may be revoked at any time). It is not a feature
 * promise, so it holds even before any mailing is set up.
 */
export const MARKETING_LABEL =
  'Quero receber novidades da HeloraDev por e-mail. Posso cancelar quando quiser.';

/**
 * Shown only after a submit attempt with the mandatory box unticked. Authored
 * rather than mirrored from the browser: `ui/checkbox.jsx` renders
 * `role="checkbox"` on a button, so there is no native `validationMessage`.
 */
export const CONSENT_ERROR =
  'Para enviar, você precisa concordar com o tratamento dos seus dados.';
