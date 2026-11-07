import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPage from '@/components/PrivacyPage';
import en from '@/content/en';
import { CopyProvider } from '@/content/CopyContext';
import '@/index.css';

// English twin of `privacidade.jsx`, bare for the same reason. Like it, this
// page is counted by the zone-wide cookieless beacon and says so in its own
// text instead of claiming an exemption.
ReactDOM.createRoot(document.getElementById('root')).render(
  <CopyProvider copy={en}>
    <PrivacyPage />
  </CopyProvider>
);
