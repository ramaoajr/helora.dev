import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { useCopy } from '@/content/CopyContext';

// Shared by the quick links and the two social links. py-3 gives a 46px touch
// target at phone widths; from sm up the pointer is precise enough that the
// smaller padding is what keeps the row dense instead of airy.
const LINK_CLASS =
  'inline-flex items-center gap-2 rounded py-3 sm:py-2 text-small text-copy hover:text-primary transition-colors duration-200 ease-out-soft';

const Footer = () => {
  const { footer, a11y } = useCopy();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Links are real anchors (middle-click and open-in-new-tab work, correct
  // role); the click handler only upgrades the jump to a smooth scroll. Same
  // reasoning as the header nav.
  const handleNavClick = (event, id) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer id="contact" className="bg-brand-deep pt-10 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Three bands, no separating rule: the density change between the
          identity band, the link row and the copyright is the separation. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <img
            src="/logo-header.png"
            alt="HeloraDev"
            width="151"
            height="32"
            loading="lazy"
            decoding="async"
            className="h-8 w-auto shrink-0"
          />

          {/* A monitored address on the company's own domain is the credibility
              signal here, so it carries body weight, not fine print. */}
          <a
            href="mailto:dev4me@helora.dev"
            className="inline-flex items-center gap-2 rounded py-3 text-body font-semibold text-copy-strong transition-colors duration-200 ease-out-soft hover:text-primary sm:py-2"
          >
            <Mail className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden="true" />
            <span>dev4me@helora.dev</span>
          </a>
        </div>

        <nav
          aria-label={a11y.footerNav}
          className="flex flex-wrap justify-center gap-x-6 gap-y-1 sm:justify-start"
        >
          {/* The visible labels are copy; the scroll target ids are the
              sections' identity and live in the copy modules beside them. */}
          {footer.quickLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => handleNavClick(event, item.id)}
              className={LINK_CLASS}
            >
              {item.label}
            </a>
          ))}
          {/* LinkedIn and Instagram are proper nouns: the same word in every
              language, so they are not in the copy modules. */}
          <a
            href="https://www.linkedin.com/company/heloradev/"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/heloradev/"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Instagram</span>
          </a>
        </nav>

        <p className="text-center text-micro text-copy-muted sm:text-left">
          {footer.copyright(new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
