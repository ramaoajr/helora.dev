import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPage from '@/components/PrivacyPage';
import pt from '@/content/pt';
import { CopyProvider } from '@/content/CopyContext';
import '@/index.css';

// Deliberately bare next to `main.jsx`: no contact-form provider, no modal, no
// toaster and no motion config. This page is static text.
//
// Visits to it are counted like any other page: Cloudflare injects a cookieless
// beacon at the edge across the whole zone, which this entry cannot opt out of.
// The page's own text says so rather than claiming an exemption it does not have.
//
// The copy provider is the one piece it does share, because the page is the
// same component in both languages.
ReactDOM.createRoot(document.getElementById('root')).render(
  <CopyProvider copy={pt}>
    <PrivacyPage />
  </CopyProvider>
);
