import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  PRIVACY_PATH,
  CONSENT_LABEL,
  CONSENT_LINK_TEXT,
  MARKETING_LABEL,
} from '@/lib/consent';

/**
 * Shared adaptation of `ui/checkbox.jsx` for this panel. The primitive is
 * frozen, so every deviation is made here at the call site:
 *
 * - `bg-white/[0.05]` is the surface the panel's inputs and <select> use. Safe
 *   because the primitive's `data-[state=checked]:bg-primary` is the more
 *   specific selector, so a ticked box still paints amber.
 * - `focus-visible:ring-0` cancels the primitive's `ring-1 ring-ring`, which
 *   would draw amber immediately outside an already-amber border — read as a
 *   thicker border, not as a ring. One indicator is the goal, and the house
 *   indicator is the `:focus-visible` outline in src/index.css.
 * - That outline then has to be restored by hand. It lives in `@layer base`,
 *   while the primitive's `focus-visible:outline-none` is a utility, and the
 *   utilities layer always wins — so cancelling the ring without this would
 *   leave the box with no focus indicator at all (verified: the computed
 *   outline becomes `2px solid transparent`, which is what `outline-none`
 *   expands to). These four utilities re-state the base rule's own values.
 * - `relative` + the `after:` pseudo-element grow the pointer target from
 *   16x16 to 32x32 with no layout shift, clearing WCAG 2.5.8's 24x24 minimum.
 *   This is why the label text is deliberately NOT a click target: the
 *   mandatory label contains a link, and a toggle region wrapped around a link
 *   mis-fires constantly at 375px.
 * - `mt-[3px]` with `items-start`, never `items-center`: `text-small` is
 *   14px/1.6, a 22.4px line box whose centre sits at 11.2px, while the 16px box
 *   centres at 8px. On a label that wraps to three lines `items-center` would
 *   float the box to the middle of the paragraph instead of the first line.
 */
const BOX_CLASS =
  'relative mt-[3px] shrink-0 bg-white/[0.05] focus-visible:ring-0 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ring ' +
  "after:absolute after:-inset-2 after:content-['']";

/**
 * One checkbox plus its labelling text, optionally followed by an error line.
 *
 * `aria-labelledby` rather than a <label htmlFor>: `Checkbox.Root` puts
 * `role="checkbox"` on a <button>, and the native input Radix adds for form
 * bubbling is `aria-hidden` with `tabindex="-1"`. `for` would resolve
 * inconsistently across browsers and can name the wrong node — and a <label>
 * whose `for` does not work is a lie in the markup. So the labelling element is
 * a <span className="block">.
 */
const ConsentRow = ({ id, checked, onCheckedChange, boxRef, error, required, children }) => (
  <div className="flex items-start gap-3">
    <Checkbox
      id={id}
      ref={boxRef}
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-labelledby={`${id}-label`}
      aria-required={required ? 'true' : undefined}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(BOX_CLASS, error && 'border-destructive')}
    />
    <div className="min-w-0 flex-1 space-y-1.5">
      {/* `text-small`, explicitly not `text-micro`: this is the text a legal
          consent is recorded against, so it must not read as fine print.
          `min-w-0` on this column stops a long unbroken token overflowing at
          375px. */}
      <span id={`${id}-label`} className="block max-w-[56ch] text-small text-copy">
        {children}
      </span>
      {error && (
        <p id={`${id}-error`} className="text-micro text-destructive">
          {error}
        </p>
      )}
    </div>
  </div>
);

/**
 * The two LGPD consent rows: mandatory data-processing consent, then the
 * optional marketing opt-in. Presentational — every value and handler is a
 * prop, and all copy comes from src/lib/consent.js.
 *
 * `step` drives the same visibility rule as the step-2 field group, so the
 * block renders in exactly the states the Submit button does. That is what
 * keeps the authored error out of a `display:none` subtree.
 */
const ContactFormConsent = ({
  step,
  consent,
  marketingOptIn,
  error,
  onConsentChange,
  onMarketingChange,
  consentRef,
}) => (
  // KEEP IN SYNC WITH THE SUBMIT BUTTON below, which is `hidden sm:inline-flex`
  // on step 1. If Submit can be pressed, this block must be on screen — an
  // error set on a hidden block is an error nobody can read.
  <div className={cn('space-y-3', step === 1 && 'hidden sm:block')}>
    <ConsentRow
      id="consent"
      checked={consent}
      onCheckedChange={onConsentChange}
      boxRef={consentRef}
      error={error}
      required
    >
      {CONSENT_LABEL}{' '}
      {/* A new tab is load-bearing, not a style choice: /privacidade is a
          separate document and a full page load, and the form has no
          persistence, so navigating in place throws away everything typed.
          Same origin, so `noreferrer` would buy nothing.
          The underline is permanent — colour alone inside a sentence is
          invisible at rest and fails WCAG 1.4.1. No opacity modifier on
          `primary`: it is `'hsl(var(--primary))'` with no `<alpha-value>`
          placeholder, so Tailwind cannot apply alpha to it.
          Plain inline <a>, so it can break across lines at 375px. */}
      {/* `noreferrer` is redundant on a same-origin link — there is no third
          party to withhold the referrer from, and the privacy page runs no
          analytics that would read it. It is here anyway so the file carries no
          standing lint exception: a disable comment is a rule every later
          reader has to re-litigate, and this one buys nothing. */}
      <a
        href={PRIVACY_PATH}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded font-semibold text-copy-strong underline decoration-primary decoration-1 underline-offset-[3px] transition-colors duration-200 ease-out-soft hover:text-primary"
      >
        {CONSENT_LINK_TEXT}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </ConsentRow>

    <ConsentRow
      id="marketing"
      checked={marketingOptIn}
      onCheckedChange={onMarketingChange}
    >
      {MARKETING_LABEL}
    </ConsentRow>
  </div>
);

export default ContactFormConsent;
