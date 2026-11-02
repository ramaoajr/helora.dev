import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TONES = {
  quiet: 'rounded-xl bg-white/[0.03] border border-white/[0.06] p-5',
  default: 'rounded-xl bg-white/[0.04] border border-white/[0.07] shadow-card p-6 sm:p-7',
  feature: 'rounded-2xl bg-white/[0.05] border border-white/[0.09] shadow-card p-7 sm:p-8',
};

const HOVER_TONES = {
  quiet: 'hover:bg-white/[0.07] hover:border-white/[0.14]',
  default: 'hover:bg-white/[0.07] hover:border-white/[0.14] hover:shadow-card-hover',
  feature: 'hover:bg-white/[0.07] hover:border-white/[0.14] hover:shadow-card-hover',
};

// The hover lift MUST stay a motion value, not a Tailwind `-translate-y`:
// a CSS transform fights the inline transform Framer writes for entrance
// animations and leaves the card stuck or jumping. Timing lives inside
// `whileHover` so a caller's own entrance `transition` can't clobber it.
const HOVER_LIFT = {
  y: -2,
  transition: { type: 'tween', duration: 0.2, ease: [0.16, 1, 0.3, 1] },
};

const SurfaceCard = React.forwardRef(
  ({ as = 'div', tone = 'default', interactive = true, className, children, ...props }, ref) => {
    const Comp = motion[as] ?? motion.div;

    return (
      <Comp
        ref={ref}
        className={cn(
          'transition-[background-color,border-color,box-shadow] duration-200 ease-out-soft',
          TONES[tone] ?? TONES.default,
          interactive && (HOVER_TONES[tone] ?? HOVER_TONES.default),
          className
        )}
        {...(interactive && { whileHover: HOVER_LIFT })}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SurfaceCard.displayName = 'SurfaceCard';

export default SurfaceCard;
