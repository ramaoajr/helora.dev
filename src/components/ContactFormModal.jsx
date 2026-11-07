import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
// `ui/dialog.jsx` wraps these same primitives, but its `DialogContent` bundles a
// non-`forceMount` portal (which kills exit animations), a hardcoded English
// "Close" label and tailwindcss-animate classes that fight Framer for control of
// opacity/scale. We compose the underlying primitives it is built on instead —
// same package, no new dependency, `ui/dialog.jsx` untouched.
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactFormFields from '@/components/ContactFormFields';
import ContactFormConsent from '@/components/ContactFormConsent';
import { useContactForm } from '@/context/ContactFormContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { getSiteLocale } from '@/lib/locale';
import { CONSENT_VERSION, CONSENT_ERROR } from '@/lib/consent';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

// Brazil first and pre-selected: this is a pt-BR site for Brazilian SMBs. The
// rest of the list stays — the client does serve clients abroad, they just pick.
const COUNTRY_CODES = [
  { code: 'BR', dial: '+55', flag: '🇧🇷' }, { code: 'GB', dial: '+44', flag: '🇬🇧' },
  { code: 'US', dial: '+1', flag: '🇺🇸' }, { code: 'AU', dial: '+61', flag: '🇦🇺' },
  { code: 'CA', dial: '+1', flag: '🇨🇦' }, { code: 'DE', dial: '+49', flag: '🇩🇪' },
  { code: 'FR', dial: '+33', flag: '🇫🇷' }, { code: 'IN', dial: '+91', flag: '🇮🇳' },
  { code: 'ES', dial: '+34', flag: '🇪🇸' }, { code: 'IT', dial: '+39', flag: '🇮🇹' },
  { code: 'JP', dial: '+81', flag: '🇯🇵' }, { code: 'CN', dial: '+86', flag: '🇨🇳' },
];

const DEFAULT_DIAL_CODE = '+55';

/**
 * Data-use reassurance under the submit button. Copy is pending from the
 * client — while it is null the whole line (icon included) stays out of the
 * DOM. Set it to a string to switch it on.
 */
const DATA_USE_NOTE = null;

// Which step's group renders each required field. Below `sm` only the current
// step's group is in the layout, so this is what tells us which step to show
// before pointing the browser at an invalid control.
const REQUIRED_FIELD_STEPS = { name: 1, email: 1, subject: 2, message: 2 };

const REQUIRED_FIELD_IDS = Object.keys(REQUIRED_FIELD_STEPS);
const STEP_1_REQUIRED_FIELD_IDS = REQUIRED_FIELD_IDS.filter(id => REQUIRED_FIELD_STEPS[id] === 1);

const ContactFormModal = () => {
  const { isOpen, closeContactForm } = useContactForm();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [countryCode, setCountryCode] = useState(DEFAULT_DIAL_CODE);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
  // Kept out of `formData`: it is spread as strings, the server wants booleans.
  const [consent, setConsent] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [consentError, setConsentError] = useState(null);
  const nameInputRef = useRef(null);
  const consentRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setErrors({});
      // A reopened modal must never arrive pre-consented or showing a stale error.
      setConsent(false);
      setMarketingOptIn(false);
      setConsentError(null);
    }
  }, [isOpen]);

  // Mirrors how `handleChange` clears a field error: once the box is ticked the
  // reason for the message is gone, so the message goes with it.
  const handleConsentChange = (checked) => {
    setConsent(checked === true);
    if (checked === true) setConsentError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setErrors(p => (p[name] ? { ...p, [name]: undefined } : p));
  };
  const handleCountryChange = (e) => setCountryCode(e.target.value);

  // Mirrors the native validity state into ARIA. `reportValidity()` below stays
  // the source of the visible browser message; this only exposes it to AT.
  const syncErrors = () => {
    setErrors(REQUIRED_FIELD_IDS.reduce((acc, id) => {
      const input = document.getElementById(id);
      if (input && !input.checkValidity()) acc[id] = input.validationMessage;
      return acc;
    }, {}));
  };

  // Points the browser's own message at the first invalid control in `ids`, and
  // returns whether it found one. Below `sm` the group that is not the current
  // step is `display:none`, and `reportValidity()` on a hidden control shows
  // nothing while logging "An invalid form control... is not focusable" — so we
  // switch to that control's step first. `flushSync` is what makes it visible
  // *now* rather than on the next render, since the report cannot wait.
  const reportFirstInvalid = (ids) => {
    const invalid = ids
      .map(id => document.getElementById(id))
      .find(input => input && !input.checkValidity());
    if (!invalid) return false;

    const targetStep = REQUIRED_FIELD_STEPS[invalid.id];
    if (targetStep !== step) flushSync(() => setStep(targetStep));
    invalid.reportValidity();
    return true;
  };

  const handleNext = () => {
    syncErrors();
    if (reportFirstInvalid(STEP_1_REQUIRED_FIELD_IDS)) return;
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual validation to handle "noValidate" on form
    syncErrors();
    if (reportFirstInvalid(REQUIRED_FIELD_IDS)) return;

    // After the native pass, not woven into it: `reportFirstInvalid` runs on
    // `checkValidity()`, which the Radix checkbox button does not have. The
    // `flushSync` is for the same reason as the one in that helper — Enter in a
    // text input submits implicitly, including on mobile step 1 where this
    // block is `display:none`, and an error must never be set on a hidden block.
    if (!consent) {
      if (step !== 2) flushSync(() => setStep(2));
      setConsentError(CONSENT_ERROR);
      consentRef.current?.focus();
      return;
    }

    setLoading(true);
    // `locale` tells the automation which language to answer in. It describes
    // the site version this form was submitted from, not the visitor's browser
    // settings — see src/lib/locale.js for why that distinction matters.
    const payload = {
      ...formData,
      phone: formData.phone ? `${countryCode} ${formData.phone}` : '',
      locale: getSiteLocale(),
      consent,
      marketing_opt_in: marketingOptIn,
      // No `consent_at`: the server stamps it, overwriting anything sent here.
      consent_version: CONSENT_VERSION,
    };
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Network response was not ok');

      // Track 'Lead' event on successful submission
      if (window.fbq) {
        window.fbq('track', 'Lead');
      }

      toast({ title: "Mensagem enviada!", description: "Vamos responder em breve." });
      setFormData({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
      setConsent(false);
      setMarketingOptIn(false);
      setConsentError(null);
      setTimeout(closeContactForm, 1000);
    } catch (error) {
      toast({ variant: "destructive", title: "Erro", description: "Algo deu errado. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  // Fires before the focus scope moves focus, so `activeElement` is still the
  // button that opened the modal — the only chance to record it. Focus then
  // goes to the first field rather than the panel itself.
  const handleOpenAutoFocus = (event) => {
    event.preventDefault();
    openerRef.current = document.activeElement;
    nameInputRef.current?.focus();
  };

  // Radix's modal content restores focus to its own <Dialog.Trigger>, which we
  // don't use — the CTAs live in Header/Hero/FinalCTA and just flip context
  // state. Without this, focus falls to <body> on close.
  const handleCloseAutoFocus = (event) => {
    event.preventDefault();
    const opener = openerRef.current;
    if (opener && document.contains(opener)) opener.focus();
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => { if (!open) closeContactForm(); }}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT_SOFT }}
                className="fixed inset-0 z-50 bg-brand-deep/80 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            {/* Centring shell: `pointer-events-none` lets a click beside the
                panel fall through to the overlay, which dismisses the dialog. */}
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
              <DialogPrimitive.Content
                asChild
                forceMount
                aria-modal="true"
                onOpenAutoFocus={handleOpenAutoFocus}
                onCloseAutoFocus={handleCloseAutoFocus}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: EASE_OUT_SOFT }}
                  className="pointer-events-auto relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/[0.10] bg-brand-blue p-6 sm:p-8 shadow-hero"
                >
                  <DialogPrimitive.Close asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Fechar"
                      className="absolute top-4 right-4 text-copy-muted hover:text-copy-strong"
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </DialogPrimitive.Close>

                  <div className="space-y-2 pr-12 text-left">
                    <DialogPrimitive.Title className="text-h3 text-copy-strong">
                      Fale com a HeloraDev
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="text-small text-copy-muted">
                      {step === 1 ? "Preencha o formulário e vamos responder em breve." : "Conte um pouco mais sobre o que você precisa."}
                    </DialogPrimitive.Description>
                  </div>

                  {/* Progress for the mobile-only 2-step flow. Non-textual on
                      purpose: the copy for this screen is frozen. */}
                  <div className="mt-5 flex gap-1.5 sm:hidden" aria-hidden="true">
                    <span className="h-1 flex-1 rounded-full bg-primary" />
                    <span
                      className={cn(
                        'h-1 flex-1 rounded-full transition-colors duration-200 ease-out-soft',
                        step === 2 ? 'bg-primary' : 'bg-white/[0.12]'
                      )}
                    />
                  </div>

                  <form onSubmit={handleSubmit} className="grid gap-5 pt-6" noValidate>
                    <ContactFormFields
                      step={step}
                      formData={formData}
                      errors={errors}
                      countryCode={countryCode}
                      countryCodes={COUNTRY_CODES}
                      onChange={handleChange}
                      onCountryChange={handleCountryChange}
                      nameInputRef={nameInputRef}
                    />

                    <ContactFormConsent
                      step={step}
                      consent={consent}
                      marketingOptIn={marketingOptIn}
                      error={consentError}
                      onConsentChange={handleConsentChange}
                      onMarketingChange={(checked) => setMarketingOptIn(checked === true)}
                      consentRef={consentRef}
                    />

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 sm:block">
                      {/* Back Button (Mobile Only) */}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className={cn("flex-1 sm:hidden", step === 1 && "hidden")}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Voltar
                      </Button>

                      {/* Next Button (Mobile Only) */}
                      <Button
                        type="button"
                        onClick={handleNext}
                        className={cn("w-full sm:hidden", step === 2 && "hidden")}
                      >
                        Próximo <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Button>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={loading}
                        className={cn(
                          "font-bold",
                          step === 1 ? "hidden sm:inline-flex w-full" : "flex-[2] sm:w-full"
                        )}
                      >
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />Enviando...</> : 'Enviar'}
                      </Button>

                      {DATA_USE_NOTE && (
                        <p className="mt-4 flex items-start gap-2 text-micro text-copy-muted">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                          {DATA_USE_NOTE}
                        </p>
                      )}
                    </div>
                  </form>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};

export default ContactFormModal;
