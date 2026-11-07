import React from 'react';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  Building2,
  Boxes,
  Factory,
  Truck,
  Wrench,
} from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import SurfaceCard from '@/components/SurfaceCard';
import { useInView } from '@/hooks/useInView';
import { useCopy } from '@/content/CopyContext';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

// Keyed rather than positional — see the note in Problems.jsx.
const ICONS = {
  logistics: Truck,
  warehouses: Boxes,
  maintenance: Wrench,
  serviceProviders: BriefcaseBusiness,
  offices: Building2,
  scaling: Factory,
};

const WhoItsFor = () => {
  const [ref, isInView] = useInView({ once: true });
  const { whoItsFor } = useCopy();

  return (
    // About and WhoItsFor are both S0 back-to-back: the seam is a hairline
    // rather than a background flip, which avoids the striped-template look.
    <section
      id="who-its-for"
      aria-labelledby="who-its-for-title"
      className="py-20 sm:py-28 px-4 bg-brand-blue border-t border-white/[0.06]"
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
            id="who-its-for-title"
            align="center"
            eyebrow={whoItsFor.eyebrow}
            title={whoItsFor.title}
            lead={whoItsFor.lead}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whoItsFor.items.map((audience, index) => {
            const Icon = ICONS[audience.key];

            return (
              <SurfaceCard
                key={audience.key}
                tone="default"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.42,
                  delay: Math.min(index, 5) * 0.04,
                  ease: EASE_OUT_SOFT,
                }}
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/[0.12] ring-1 ring-inset ring-primary/20">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-h4 text-copy-strong">{audience.title}</h3>
                <p className="text-small text-copy">{audience.description}</p>
              </SurfaceCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
