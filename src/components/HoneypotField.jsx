import React from 'react';
import { HONEYPOT_FIELD } from '@/lib/honeypot';

/**
 * A field no person ever fills, and no person can reach.
 *
 * Hidden off-screen rather than with `display:none`, because some bots skip
 * what is not rendered. It is kept out of the accessibility tree with
 * `aria-hidden`, out of the tab order with `tabIndex={-1}`, and out of autofill
 * with `autoComplete="off"` and a name no browser vocabulary recognises — all
 * three matter, because a filled honeypot is discarded in silence and a
 * screen-reader user or an eager password manager must never trip it.
 *
 * The value lives in the parent's state so a submit can read it, and nothing
 * else in the app ever looks at it.
 */
const HoneypotField = ({ value, onChange }) => (
  <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
    <label htmlFor={HONEYPOT_FIELD}>Website</label>
    <input
      id={HONEYPOT_FIELD}
      name={HONEYPOT_FIELD}
      type="text"
      value={value}
      onChange={onChange}
      tabIndex={-1}
      autoComplete="off"
    />
  </div>
);

export default HoneypotField;
