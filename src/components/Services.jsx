import React from 'react';
import { Bot, ClipboardCheck, Network, PanelsTopLeft } from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import SurfaceCard from '@/components/SurfaceCard';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useCopy } from '@/content/CopyContext';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];
const STAGGER_STEP = 0.06;
const STAGGER_CAP = 5;

// Keyed rather than positional — see the note in Problems.jsx.
const ICONS = {
  automation: Bot,
  customSystems: PanelsTopLeft,
  operations: ClipboardCheck,
  consulting: Network,
};

const Services = () => {
  const [ref, isInView] = useInView({ once: true });
  const { services } = useCopy();

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="py-24 sm:py-32 px-4 bg-brand-blueSoft"
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
            id="services-title"
            align="center"
            eyebrow={services.eyebrow}
            title={services.title}
            lead={services.lead}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.items.map((service, index) => {
            const Icon = ICONS[service.key];

            return (
              <SurfaceCard
                key={service.key}
                as="article"
                tone="feature"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.42,
                  delay: Math.min(index, STAGGER_CAP) * STAGGER_STEP,
                  ease: EASE_OUT_SOFT,
                }}
              >
                {/* The inset ring is what gives the flat amber square an edge. */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/[0.12] ring-1 ring-inset ring-primary/20">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-h3 text-copy-strong">{service.title}</h3>
                <p className="mb-5 text-body text-copy">{service.description}</p>
                <ul className="grid gap-2">
                  {service.examples.map((example) => (
                    <li key={example} className="flex items-center gap-2.5 text-small text-copy">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                      {example}
                    </li>
                  ))}
                </ul>
              </SurfaceCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
