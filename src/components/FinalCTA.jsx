import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/context/ContactFormContext';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

/**
 * Reassurance line shown under the CTA button (response time, "sem compromisso",
 * etc.). The copy is pending from the client — while this is empty the whole
 * line, wrapper included, stays out of the DOM. Set it to a string to switch on.
 */
const REASSURANCE = null;

const FinalCTA = () => {
  const [ref, isInView] = useInView({ threshold: 0.3, once: true });
  const { openContactForm } = useContactForm();

  return (
    <section
      ref={ref}
      id="final-cta"
      aria-labelledby="final-cta-title"
      className="relative isolate overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-brand-deep"
    >
      {/* Amber wash behind the panel — lifts the CTA off the deepest surface
          without introducing a second background colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 top-1/2 h-[380px] w-[760px] max-w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
          className="text-center"
        >
          <p className="text-eyebrow uppercase text-primary">
            Próximo passo
          </p>
          <h2 id="final-cta-title" className="mt-5 text-h2-sm md:text-h2 text-copy-strong">
            Conte onde a sua operação trava.
          </h2>
          <p className="mt-6 text-lead-sm md:text-lead text-copy">
            Vamos entender a sua operação e identificar onde tecnologia pode gerar resultado
            sem criar complexidade desnecessária.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.42, delay: 0.15, ease: EASE_OUT_SOFT }}
            className="mt-10"
          >
            <Button
              onClick={openContactForm}
              size="lg"
              className="font-bold w-full sm:w-auto"
            >
              Falar com a HeloraDev
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* The wrapper only forces the line onto its own row — the button is
                inline-flex, so an inline-flex sibling would sit beside it. */}
            {REASSURANCE && (
              <div>
                <p className="mt-5 inline-flex items-center gap-2 text-small text-copy-muted">
                  <MessageCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {REASSURANCE}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
