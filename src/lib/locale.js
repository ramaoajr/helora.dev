/**
 * Which language version of the site the visitor is reading — not the language
 * their browser is configured in.
 *
 * Derived from `<html lang>` because that attribute is the one thing that
 * already differs between the two entry points: `index.html` declares
 * `pt-BR`, and the planned `/en/index.html` will declare `en`. Nothing has to
 * be configured per build, and the value cannot drift from what the served
 * page actually claims to be.
 *
 * Deliberately NOT `navigator.language`: a Brazilian visitor whose browser is
 * set to English, reading the Portuguese page, must still get the Portuguese
 * reply. The question is which site they submitted from, not who they are.
 */

export const LOCALES = ['pt', 'en'];

export const FALLBACK_LOCALE = 'pt';

/**
 * @returns {'pt' | 'en'} never anything else, so downstream automation can
 * branch on exactly two values without needing a catch-all arm.
 */
export function getSiteLocale() {
  if (typeof document === 'undefined') return FALLBACK_LOCALE;

  const lang = (document.documentElement.getAttribute('lang') || '').trim().toLowerCase();

  // A missing attribute is "unknown", not "not Portuguese", so it falls back
  // instead of guessing `en`. Keeping this identical to the server's handling
  // of an absent field is what stops the two from drifting apart.
  if (lang === '') return FALLBACK_LOCALE;

  // Match on the primary subtag so `pt`, `pt-BR` and `pt-PT` all read as
  // Portuguese. Per the rule: Portuguese is `pt`, everything else is `en`.
  return lang.split(/[-_]/)[0] === 'pt' ? 'pt' : 'en';
}
