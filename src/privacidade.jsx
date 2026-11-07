import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPage from '@/components/PrivacyPage';
import pt from '@/content/pt';
import { CopyProvider } from '@/content/CopyContext';
import '@/index.css';

// Deliberately bare next to `main.jsx`: no contact-form provider, no modal, no
// toaster, no motion config and no Helmet. This page is static text, and
// Helmet is what injects the analytics tags on the main site.
//
// The copy provider is the one piece it does share, because the page is the
// same component in both languages.
ReactDOM.createRoot(document.getElementById('root')).render(
  <CopyProvider copy={pt}>
    <PrivacyPage />
  </CopyProvider>
);
