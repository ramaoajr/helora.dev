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
 * One version string covers every language. It identifies the wording a
 * visitor agreed to, and each language's rendering of that wording is the same
 * agreement — which is why the lead also records `locale`, so a stored consent
 * names both the version and the language it was read in. Translating a label
 * does not create a new version; changing what a label *says* does, in every
 * language at once.
 *
 * The labels themselves live in the copy modules under `src/content`, beside
 * the rest of the visitor-facing text. They are copy, and the privacy page
 * that explains them is copy too — only this contract with the server is not.
 */

export const CONSENT_VERSION = '2026-11-07';
