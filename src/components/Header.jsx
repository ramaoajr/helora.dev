import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/context/ContactFormContext';

const MOBILE_MENU_ID = 'mobile-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openContactForm } = useContactForm();

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

  const navItems = [
    { label: 'Problemas', id: 'problems' },
    { label: 'Serviços', id: 'services' },
    { label: 'Processo', id: 'how-we-work' },
    { label: 'Para quem', id: 'who-its-for' },
    { label: 'Tecnologias', id: 'technologies' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-blue/90 backdrop-blur-md border-b border-white/[0.08]">
      <nav aria-label="Navegação principal" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.button
            type="button"
            aria-label="Ir para o topo"
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
              className="h-8 w-auto"
            />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex items-center gap-6"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
                className="group relative text-small text-copy hover:text-copy-strong transition-colors duration-200 ease-out-soft"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-primary transition-transform duration-200 ease-out-soft group-hover:scale-x-100"
                />
              </a>
            ))}
            <Button onClick={openContactForm} size="sm" className="font-bold">
              Falar com a HeloraDev
            </Button>
          </motion.div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
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
            className="absolute top-full left-0 w-full bg-brand-blue border-t border-white/[0.08] md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleNavClick(event, item.id)}
                  className="text-small text-copy hover:text-copy-strong transition-colors duration-200 ease-out-soft text-left py-3"
                >
                  {item.label}
                </a>
              ))}
              <Button onClick={openContactForm} className="w-full font-bold mt-2">
                Falar com a HeloraDev
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
