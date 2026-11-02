import { useState, useEffect, useRef } from 'react';

/**
 * Observes `ref` and flips `isInView` to true once it enters the viewport.
 *
 * `isInView` latches: it is never set back to false. Entrance animations are
 * one-way, so callers keep their state once revealed.
 *
 * @param {object}  [options]
 * @param {number}  [options.threshold=0]   IntersectionObserver threshold.
 * @param {string}  [options.rootMargin]    Defaults to a -12% bottom inset so a
 *   section reveals slightly before its top edge reaches the viewport bottom.
 * @param {boolean} [options.once=false]    Disconnect the observer after the
 *   first intersection instead of keeping it alive for the page's lifetime.
 * @returns {[React.RefObject, boolean]}
 */
export const useInView = ({
  threshold = 0,
  rootMargin = '0px 0px -12% 0px',
  once = false,
} = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsInView(true);
        if (once) {
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isInView];
};
