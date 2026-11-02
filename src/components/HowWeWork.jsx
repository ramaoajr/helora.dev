import React from 'react';
import { motion } from 'framer-motion';
import SectionIntro from '@/components/SectionIntro';
import { useInView } from '@/hooks/useInView';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];
const STAGGER_STEP = 0.06;
const STAGGER_CAP = 5;

const LEAD =
  'O processo reduz risco, evita soluções genéricas e mantém a tecnologia conectada ao que a operação precisa entregar.';

const HowWeWork = () => {
  const [ref, isInView] = useInView({ once: true });

  const steps = [
    {
      title: 'Diagnóstico',
      description: 'Entendemos a operação, os gargalos, as ferramentas atuais e o impacto de cada problema.',
    },
    {
      title: 'Planejamento',
      description: 'Definimos o fluxo ideal, prioridades, riscos e o caminho técnico mais simples para implementar.',
    },
    {
      title: 'Implementação',
      description: 'Construímos automações, sistemas e integrações com ciclos curtos e validação operacional.',
    },
    {
      title: 'Acompanhamento',
      description: 'Ajustamos o que foi implantado, medimos resultado e evoluímos a operação com dados reais.',
    },
  ];

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-title"
      className="py-20 sm:py-28 px-4 bg-brand-blue"
      ref={ref}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
          className="mb-10 sm:mb-14"
        >
          <SectionIntro
            id="how-we-work-title"
            align="center"
            eyebrow="Como trabalhamos"
            title="Primeiro entendemos. Depois construímos."
            lead={LEAD}
          />
        </motion.div>

        {/* A stepper, not four identical boxes: the sequence is the message. */}
        {/* Four columns only from lg: at md the widest step title
            ("Acompanhamento") is wider than a quarter of the container and
            spills into its neighbour. */}
        <ol className="grid gap-x-8 gap-y-12 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.42,
                delay: Math.min(index, STAGGER_CAP) * STAGGER_STEP,
                ease: EASE_OUT_SOFT,
              }}
              className="relative"
            >
              {index < steps.length - 1 && (
                // Vertical in the row gap while the steps are stacked,
                // horizontal across the column gap from lg up, aligned to the
                // numeral's mid-height.
                <div
                  aria-hidden="true"
                  className="absolute left-3 top-full mt-4 h-4 w-px border-l border-white/[0.07] lg:left-full lg:top-8 lg:mt-0 lg:h-px lg:w-8 lg:border-l-0 lg:border-t"
                />
              )}
              <span className="tnum block text-[4rem] font-bold leading-none text-primary/25">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-h3 text-copy-strong">{step.title}</h3>
              <p className="mt-2 text-body text-copy">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowWeWork;
