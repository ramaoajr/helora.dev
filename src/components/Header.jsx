import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/context/ContactFormContext';

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

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'What We Do', id: 'what-we-do' },
    { label: 'Technologies', id: 'technologies' },
    { label: 'Who It\'s For', id: 'who-its-for' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#001D37]/80 backdrop-blur-sm border-b border-[#0f2e4a]">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="https://horizons-cdn.hostinger.com/b3b9bc9f-0341-469c-9ea6-612034def2a6/4036a0a5834fc9c61298c4c6b623ae04.png" 
              alt="Helora Dev" 
              className="h-8 w-auto"
            />
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
            >
              <Button onClick={openContactForm} size="sm" className="font-bold">
                Get in Touch
              </Button>
            </motion.div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#001D37] border-t border-[#0f2e4a] md:hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-primary transition-colors duration-300 text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={openContactForm} className="w-full font-bold mt-2">
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;