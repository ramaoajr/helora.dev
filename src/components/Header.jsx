import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/context/ContactFormContext';
import { useCopy } from '@/content/CopyContext';

const MOBILE_MENU_ID = 'mobile-menu';

/**
 * Link to the other language version.
 *
 * A real anchor to a real URL, not a client-side toggle: the two versions are
 * separate documents with their own canonical and their own hreflang, and a
 * crawler has to be able to follow this.
 *
 * `lang` on the anchor so a screen reader pronounces "Português" with
 * Portuguese phonemes instead of reading it as English, and vice versa. The
 * `aria-label` is in the language of the page the link sits on, because that is
 * the language the rest of the page is being announced in.
 */
const LanguageLink = ({ alternate, label, className }) => (
  <a
    href={alternate.href}
    hrefLang={alternate.lang}
    lang={alternate.lang}
    aria-label={label}
    className={className}
  >
    <Languages className="h-4 w-4 shrink-0" aria-hidden="true" />
    <span>{alternate.label}</span>
  </a>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const { openContactForm } = useContactForm();
  const { nav, a11y, alternate } = useCopy();

  // The mobile panel is a header disclosure, not a modal dialog: Escape and a
  // pointer press outside the header dismiss it, but the page keeps scrolling
  // and focus is left where the user put it.
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Links are real anchors (open-in-new-tab works, correct role); the click
  // handler only upgrades the jump to a smooth scroll.
  const handleNavClick = (event, id) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 bg-brand-blue/90 backdrop-blur-md border-b border-white/[0.08]"
    >
      <nav aria-label={a11y.mainNav} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.button
            type="button"
            aria-label={a11y.toTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logo-header.png"
              alt="HeloraDev"
              width="151"
              height="32"
              decoding="async"
              className="h-8 w-auto shrink-0"
            />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex items-center gap-6"
          >
            {nav.items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
                className="group relative py-2 text-small text-copy hover:text-copy-strong transition-colors duration-200 ease-out-soft"
              >
                {item.label}
                {/* bottom-1 keeps the rule 4px under the text now that py-2
                    padding sits between the text and the anchor's bottom edge. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-primary transition-transform duration-200 ease-out-soft group-hover:scale-x-100"
                />
              </a>
            ))}
            <LanguageLink
              alternate={alternate}
              label={a11y.languageSwitch}
              className="inline-flex items-center gap-2 rounded py-2 text-small text-copy transition-colors duration-200 ease-out-soft hover:text-copy-strong"
            />
            <Button onClick={openContactForm} size="sm" className="font-bold">
              {nav.cta}
            </Button>
          </motion.div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={mobileMenuOpen ? a11y.closeMenu : a11y.openMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id={MOBILE_MENU_ID}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 w-full bg-brand-blue border-t border-white/[0.08] lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {nav.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleNavClick(event, item.id)}
                  className="text-small text-copy hover:text-copy-strong transition-colors duration-200 ease-out-soft text-left py-3"
                >
                  {item.label}
                </a>
              ))}
              <LanguageLink
                alternate={alternate}
                label={a11y.languageSwitch}
                className="inline-flex items-center gap-2 rounded py-3 text-small text-copy transition-colors duration-200 ease-out-soft hover:text-copy-strong"
              />
              <Button onClick={openContactForm} className="w-full font-bold mt-2">
                {nav.cta}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
