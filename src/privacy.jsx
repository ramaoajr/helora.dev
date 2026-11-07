import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPage from '@/components/PrivacyPage';
import en from '@/content/en';
import { CopyProvider } from '@/content/CopyContext';
import '@/index.css';

// English twin of `privacidade.jsx`, bare for the same reason: a page that
// explains data processing runs no analytics on the person reading it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <CopyProvider copy={en}>
    <PrivacyPage />
  </CopyProvider>
);
