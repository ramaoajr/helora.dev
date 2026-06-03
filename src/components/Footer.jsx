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
    <footer id="contact" className="bg-[#052441] border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6">
              <img 
                src="https://horizons-cdn.hostinger.com/b3b9bc9f-0341-469c-9ea6-612034def2a6/7864406f158b5db94e14eb23510f3dc9.png" 
                alt="Helora Dev Compact Logo" 
                className="h-24 w-auto rounded-xl"
              />
            </div>
          </div>

          <div>
            <p className="font-bold mb-4 text-primary">Quick Links</p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button></li>
              <li><button onClick={() => scrollToSection('what-we-do')} className="hover:text-primary transition-colors">What We Do</button></li>
              <li><button onClick={() => scrollToSection('technologies')} className="hover:text-primary transition-colors">Technologies</button></li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-4 text-primary">Get in Touch</p>
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
                <span>Connect on LinkedIn</span>
              </a>
              <a 
                href="https://www.instagram.com/heloradev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => handleSocialClick('Instagram')}
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-primary transition-colors text-sm"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Helora Dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;