import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPage from '@/components/PrivacyPage';
import pt from '@/content/pt';
import { CopyProvider } from '@/content/CopyContext';
import '@/index.css';

// Deliberately bare next to `main.jsx`: no contact-form provider, no modal, no
// toaster and no motion config. This page is static text.
//
// It also carries no analytics beacon — `privacidade.html` and `privacy.html`
// are the two entries that leave it out, so a page explaining data processing
// measures nobody who reads it.
//
// The copy provider is the one piece it does share, because the page is the
// same component in both languages.
ReactDOM.createRoot(document.getElementById('root')).render(
  <CopyProvider copy={pt}>
    <PrivacyPage />
  </CopyProvider>
);
