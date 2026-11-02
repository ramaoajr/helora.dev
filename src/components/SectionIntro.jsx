import React from 'react';
import { cn } from '@/lib/utils';

const ALIGNMENTS = {
  center: 'text-center max-w-3xl mx-auto',
  left: 'text-left max-w-3xl',
};

/**
 * Shared section header: eyebrow + title (+ optional lead).
 * `align="split"` puts eyebrow/title in column 1 and the lead in column 2.
 * Pass `id` so a section can reference the heading via `aria-labelledby`.
 */
const SectionIntro = ({ eyebrow, title, lead, align = 'left', id, className }) => {
  const isSplit = align === 'split';

  const eyebrowNode = eyebrow ? (
    <span className="mb-3 inline-flex items-center gap-3 text-eyebrow uppercase text-primary">
      <span className="h-px w-6 bg-primary" aria-hidden="true" />
      {eyebrow}
    </span>
  ) : null;

  const titleNode = (
    <h2
      id={id}
      className={cn('text-h2-sm md:text-h2 text-copy-strong', lead && !isSplit && 'mb-4')}
    >
      {title}
    </h2>
  );

  const leadNode = lead ? (
    <p className="text-lead-sm md:text-lead text-copy">{lead}</p>
  ) : null;

  if (isSplit) {
    return (
      <div className={cn('grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-16', className)}>
        <div>
          {eyebrowNode}
          {titleNode}
        </div>
        {leadNode && <div>{leadNode}</div>}
      </div>
    );
  }

  return (
    <div className={cn(ALIGNMENTS[align] ?? ALIGNMENTS.left, className)}>
      {eyebrowNode}
      {titleNode}
      {leadNode}
    </div>
  );
};

export default SectionIntro;
