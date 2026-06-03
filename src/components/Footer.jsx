import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';

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
    <footer id="contact" className="bg-brand-blueSoft border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6">
              <img 
                src="/logo-footer.png" 
                alt="Logo compacta HeloraDev" 
                className="h-24 w-auto rounded-xl"
              />
            </div>
          </div>

          <div>
            <p className="font-bold mb-4 text-primary">Links rápidos</p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Serviços</button></li>
              <li><button onClick={() => scrollToSection('how-we-work')} className="hover:text-primary transition-colors">Como trabalhamos</button></li>
              <li><button onClick={() => scrollToSection('technologies')} className="hover:text-primary transition-colors">Tecnologias</button></li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-4 text-primary">Contato</p>
            <div className="space-y-3">
              <a 
                href="mailto:dev4me@helora.dev" 
                onClick={handleEmailClick}
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>dev4me@helora.dev</span>
              </a>
              <a 
                href="https://www.linkedin.com/company/heloradev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => handleSocialClick('LinkedIn')}
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-primary transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://www.instagram.com/heloradev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => handleSocialClick('Instagram')}
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-primary transition-colors text-sm"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} HeloraDev. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
