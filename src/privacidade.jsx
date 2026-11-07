import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPage from '@/components/PrivacyPage';
import '@/index.css';

// Deliberately bare next to `main.jsx`: no contact-form provider, no modal, no
// toaster, no motion config and no Helmet. This page is static text, and
// Helmet is what injects the analytics tags on the main site.
ReactDOM.createRoot(document.getElementById('root')).render(<PrivacyPage />);
