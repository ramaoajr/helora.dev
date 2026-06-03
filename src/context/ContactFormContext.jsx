import React, { createContext, useContext, useState } from 'react';

const ContactFormContext = createContext();

export const ContactFormProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContactForm = () => {
    // Track 'Contact' event when Get in Touch button is clicked (opens modal)
    if (window.fbq) {
      window.fbq('track', 'Contact');
    }
    setIsOpen(true);
  };

  const closeContactForm = () => setIsOpen(false);
  
  const toggleContactForm = () => {
    setIsOpen(prev => {
      if (!prev && window.fbq) {
        // If it was closed and is now opening
        window.fbq('track', 'Contact');
      }
      return !prev;
    });
  };

  return (
    <ContactFormContext.Provider value={{ isOpen, openContactForm, closeContactForm, toggleContactForm }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
};