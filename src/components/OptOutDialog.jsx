import React, { useEffect, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCopy } from '@/content/CopyContext';
import { cn } from '@/lib/utils';

// Same surface the contact form's inputs use, so the two forms on this site do
// not read as two design systems.
const FIELD_SURFACE =
  'h-11 bg-white/[0.05] border-white/[0.10] text-copy-strong placeholder:text-copy-muted focus:border-primary';

/**
 * Marketing unsubscribe.
 *
 * Composed from the Radix primitives rather than `ui/dialog.jsx`, which ships a
 * hardcoded English "Close" label — unusable on a page that exists in two
 * languages — and animation classes this page has no runtime for.
 *
 * No Framer Motion and no toaster here on purpose. The privacy entry is
 * deliberately bare (see privacidade.jsx), its bundle is a few kilobytes, and
 * pulling in an animation library plus a toast viewport to report the outcome
 * of one field would cost more than the page itself. The outcome is shown in
 * place instead, which also survives being read by someone who never sees a
 * toast because it timed out.
 */
const OptOutDialog = ({ open, onOpenChange }) => {
  const { optout, locale } = useCopy();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const inputRef = useRef(null);

  // A reopened dialog must never show the previous attempt's outcome, or the
  // address somebody else typed on a shared machine.
  useEffect(() => {
    if (!open) {
      setEmail('');
      setStatus('idle');
    }
  }, [open]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const input = inputRef.current;
    // The browser's own message, for the same reason as the contact form: it is
    // already translated by the browser and describes the exact fault.
    if (input && !input.checkValidity()) {
      input.reportValidity();
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/optout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });
      if (!response.ok) throw new Error('request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-brand-deep/80 backdrop-blur-sm" />
        {/* `pointer-events-none` on the shell lets a click beside the panel
            reach the overlay, which dismisses the dialog. */}
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPrimitive.Content
            aria-modal="true"
            onOpenAutoFocus={(event) => {
              // Focus the field rather than the panel: there is exactly one
              // thing to do here and it saves a keystroke.
              event.preventDefault();
              inputRef.current?.focus();
            }}
            className="pointer-events-auto relative w-full max-w-md rounded-xl border border-white/[0.10] bg-brand-blue p-6 shadow-hero sm:p-8"
          >
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={optout.close}
                className="absolute right-4 top-4 text-copy-muted hover:text-copy-strong"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DialogPrimitive.Close>

            <DialogPrimitive.Title className="pr-12 text-h3 text-copy-strong">
              {status === 'success' ? optout.successTitle : optout.title}
            </DialogPrimitive.Title>

            {status === 'success' ? (
              // The wording holds whether or not the address was on the list,
              // because the endpoint answers the same either way. See the note
              // in functions/api/optout.js.
              <DialogPrimitive.Description className="mt-3 text-small text-copy">
                {optout.successBody}
              </DialogPrimitive.Description>
            ) : (
              <>
                <DialogPrimitive.Description className="mt-3 text-small text-copy">
                  {optout.description}
                </DialogPrimitive.Description>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="optout-email" className="text-small text-copy">
                      {optout.emailLabel}
                    </Label>
                    <Input
                      id="optout-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      ref={inputRef}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={cn(FIELD_SURFACE)}
                    />
                  </div>

                  {status === 'error' && (
                    // Not `role="alert"`: the message is rendered as a result of
                    // the submit the user just made, so it is already in the
                    // reading order at the moment they are looking for it.
                    <p className="text-micro text-destructive">{optout.errorBody}</p>
                  )}

                  <Button type="submit" disabled={status === 'loading'} className="w-full font-bold">
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        {optout.submitting}
                      </>
                    ) : (
                      optout.submit
                    )}
                  </Button>
                </form>
              </>
            )}
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default OptOutDialog;
