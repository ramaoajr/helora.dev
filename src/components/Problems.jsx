import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ClipboardList,
  Clock,
  FileSpreadsheet,
  HelpCircle,
  MessageSquareWarning,
  Repeat,
  Route,
  Search,
} from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import { useInView } from '@/hooks/useInView';
import { useCopy } from '@/content/CopyContext';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

// Nine items would otherwise stagger for a full second; capping the index
// keeps the last row inside a 0.24s budget.
const STAGGER_STEP = 0.04;
const STAGGER_CAP = 5;

// Keyed, not positional: the copy modules name each item, so a reordered or
// retitled list in one language cannot shift every icon in the other.
const ICONS = {
  spreadsheets: FileSpreadsheet,
  scattered: MessageSquareWarning,
  rework: Repeat,
  visibility: Search,
  nonstandard: Route,
  lateReports: Clock,
  untraceable: AlertTriangle,
  unclearStatus: HelpCircle,
  growth: ClipboardList,
};

const Problems = () => {
  const [ref, isInView] = useInView({ once: true });
  const { problems } = useCopy();

  return (
    <section
      id="problems"
      aria-labelledby="problems-title"
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
            id="problems-title"
            align="split"
            eyebrow={problems.eyebrow}
            title={problems.title}
            lead={problems.lead}
          />
        </motion.div>

        {/* A hairline checklist, not cards: the visitor should tick through the
            nine items in a few seconds and move on. */}
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {problems.items.map((problem, index) => {
            const Icon = ICONS[problem.key];

            return (
              <motion.li
                key={problem.key}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.42,
                  delay: Math.min(index, STAGGER_CAP) * STAGGER_STEP,
                  ease: EASE_OUT_SOFT,
                }}
                className="border-t border-white/[0.07] pt-5"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <h3 className="text-h4 text-copy-strong">{problem.title}</h3>
                </div>
                <p className="mt-2 text-small text-copy">{problem.description}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Problems;
