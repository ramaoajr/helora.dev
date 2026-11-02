import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/context/ContactFormContext';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

/**
 * Trust signals rendered under the CTA row.
 * Content is pending from the client — while this array is empty the whole
 * bar (wrapper included) stays out of the DOM. Add `{ icon, label }` entries
 * (icon = a 16px lucide component) to switch it on.
 */
const TRUST_ITEMS = [];

const Hero = () => {
  const { openContactForm } = useContactForm();

  return (
    <section id="hero" className="relative isolate overflow-hidden pt-20 px-4 sm:px-6 lg:px-8 bg-brand-blue">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,theme(colors.brand.blue)_0%,theme(colors.brand.blueSoft)_58%,theme(colors.brand.blue)_100%)]" />
      <div className="mx-auto max-w-7xl py-12 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10 lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
              className="mb-5 flex items-center justify-center gap-3 text-eyebrow uppercase text-primary lg:justify-start"
            >
              {/* The leading rule is a left-alignment device; on the centred
                  mobile layout it detaches from the wrapped label, so it only
                  appears once the eyebrow is left-aligned. */}
              <span className="hidden h-px w-6 shrink-0 bg-primary lg:block" aria-hidden="true" />
              Consultoria operacional e tecnologia sob medida
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_SOFT }}
              className="text-display-sm md:text-display text-copy-strong"
            >
              Sua operação não deveria depender de planilhas e memória.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT_SOFT }}
              className="mt-6 text-lead-sm md:text-lead text-copy max-w-2xl mx-auto lg:mx-0"
            >
              A HeloraDev organiza fluxos, automatiza tarefas e cria sistemas internos para
              empresas que precisam de mais controle, menos retrabalho e decisões baseadas em dados.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT_SOFT }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button onClick={openContactForm} size="lg" className="w-full sm:w-auto">
                Descrever minha operação
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href="#services">Conhecer serviços</a>
              </Button>
            </motion.div>

            {TRUST_ITEMS.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.4, ease: EASE_OUT_SOFT }}
                className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:divide-x sm:divide-white/[0.12]"
              >
                {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 sm:px-5 first:sm:pl-0">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-small text-copy">{label}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.35, ease: EASE_OUT_SOFT }}
            className="mt-12 lg:mt-0 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[260px] md:max-w-md">
              <div
                className="absolute -z-10 inset-0 scale-90 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
              />
              <img
                src="/hero-diagram.svg"
                alt="Planilhas, mensagens e documentos dispersos sendo transformados em um sistema conectado"
                width="800"
                height="800"
                decoding="async"
                fetchPriority="high"
                className="w-full rounded-2xl border border-white/10 shadow-hero"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
