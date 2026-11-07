import React from 'react';
import { motion } from 'framer-motion';
import SectionIntro from '@/components/SectionIntro';
import { useInView } from '@/hooks/useInView';
import { useCopy } from '@/content/CopyContext';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

const About = () => {
  const [ref, isInView] = useInView({ once: true });
  const { about } = useCopy();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-white/[0.06] py-20 sm:py-28 px-4 bg-brand-blue"
    >
      <div className="container mx-auto max-w-5xl" ref={ref}>
        {/* Asymmetric editorial split: the claim holds the narrow column, the
            argument runs in the wider one. */}
        {/* Split at lg, not md: at 768px the 0.4fr column is only 240px wide while the
            h2 has already stepped up to 40px, wrapping the title to eight ragged lines. */}
        <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
          >
            <SectionIntro
              id="about-title"
              align="left"
              eyebrow={about.eyebrow}
              title={about.title}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.42, delay: 0.08, ease: EASE_OUT_SOFT }}
            className="space-y-5"
          >
            {/* Index as key: a fixed, ordered pair of paragraphs that is never
                reordered, filtered or appended to. */}
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body text-copy">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
