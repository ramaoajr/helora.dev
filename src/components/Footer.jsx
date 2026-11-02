import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';

// Shared by the quick links and the secondary contact links. The negative
// margin cancels the padding visually, so the touch target grows without
// changing the rhythm of the list. Callers add their own display utility.
const LINK_CLASS =
  // py-3 gives a 46px touch target on its own, so the lists carry no extra
  // space-y — the padding itself sets the rhythm and the targets never overlap.
  'inline-block py-3 rounded text-small text-copy hover:text-primary transition-colors duration-200 ease-out-soft';

const Footer = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSocialClick = (platform) => {
    if (window.fbq) {
      window.fbq('track', 'ViewContent', { content_name: `${platform} Profile` });
    }
  };

  const handleEmailClick = () => {
    if (window.fbq) {
      window.fbq('track', 'Contact');
    }
  };

  return (
    <footer id="contact" className="bg-brand-deep pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/logo-header.png"
              alt="HeloraDev"
              width="189"
              height="40"
              loading="lazy"
              decoding="async"
              className="h-10 w-auto"
            />
          </div>

          <div>
            <p className="mb-4 text-eyebrow uppercase text-copy-muted">Links rápidos</p>
            <ul className="space-y-0">
              <li>
                <button type="button" onClick={() => scrollToSection('services')} className={`inline-block ${LINK_CLASS}`}>
                  Serviços
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('how-we-work')} className={`inline-block ${LINK_CLASS}`}>
                  Como trabalhamos
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('technologies')} className={`inline-block ${LINK_CLASS}`}>
                  Tecnologias
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-eyebrow uppercase text-copy-muted">Contato</p>
            <div className="space-y-1">
              {/* A monitored address on the company's own domain is a real
                  credibility signal, so it carries body weight, not fine print. */}
              <div>
                <a
                  href="mailto:dev4me@helora.dev"
                  onClick={handleEmailClick}
                  className="inline-flex items-center gap-2 py-3 rounded text-body font-semibold text-copy-strong hover:text-primary transition-colors duration-200 ease-out-soft"
                >
                  <Mail className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span>dev4me@helora.dev</span>
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/company/heloradev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('LinkedIn')}
                  className={`inline-flex items-center gap-2 ${LINK_CLASS}`}
                >
                  <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/heloradev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('Instagram')}
                  className={`inline-flex items-center gap-2 ${LINK_CLASS}`}
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-12 pt-8 text-center">
          <p className="text-micro text-copy-muted">
            © {new Date().getFullYear()} HeloraDev. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
