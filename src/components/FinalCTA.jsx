import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/context/ContactFormContext';
import { useCopy } from '@/content/CopyContext';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

const FinalCTA = () => {
  const [ref, isInView] = useInView({ threshold: 0.3, once: true });
  const { openContactForm } = useContactForm();
  const { finalCta } = useCopy();

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
          <p className="text-eyebrow uppercase text-primary">{finalCta.eyebrow}</p>
          <h2 id="final-cta-title" className="mt-5 text-h2-sm md:text-h2 text-copy-strong">
            {finalCta.title}
          </h2>
          <p className="mt-6 text-lead-sm md:text-lead text-copy">{finalCta.lead}</p>
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
              {finalCta.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* The wrapper only forces the line onto its own row — the button is
                inline-flex, so an inline-flex sibling would sit beside it.
                `reassurance` is still null in both copy modules, which keeps
                the whole line out of the DOM. */}
            {finalCta.reassurance && (
              <div>
                <p className="mt-5 inline-flex items-center gap-2 text-small text-copy-muted">
                  <MessageCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {finalCta.reassurance}
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
