import React, { createContext, useContext, useState } from 'react';

const ContactFormContext = createContext();

export const ContactFormProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContactForm = () => setIsOpen(true);

  const closeContactForm = () => setIsOpen(false);
  
  const toggleContactForm = () => setIsOpen(prev => !prev);

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