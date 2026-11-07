import React, { createContext, useContext } from 'react';

/**
 * Every visitor-facing string on the site, supplied by whichever entry point
 * rendered the tree.
 *
 * There is deliberately no default value and no fallback locale here. A missing
 * provider is a wiring mistake in an entry point, and the loud throw below
 * surfaces it on the first render instead of letting the site paint with
 * `undefined` scattered through the headings.
 *
 * Each HTML entry imports exactly one locale, so only that locale's strings end
 * up in its bundle — the English page never ships the Portuguese copy. That is
 * the whole reason this is a context rather than a module that reads
 * `<html lang>` and resolves itself: self-resolution would pull every locale
 * into every bundle.
 */
const CopyContext = createContext(null);

export const CopyProvider = ({ copy, children }) => (
  <CopyContext.Provider value={copy}>{children}</CopyContext.Provider>
);

/**
 * The whole copy object. Callers destructure the slice they need:
 *
 *   const { hero } = useCopy();
 */
export const useCopy = () => {
  const copy = useContext(CopyContext);
  if (!copy) {
    throw new Error('useCopy must be used within a CopyProvider');
  }
  return copy;
};
