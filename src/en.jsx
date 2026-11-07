import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import en from '@/content/en';
import { CopyProvider } from '@/content/CopyContext';
import '@/index.css';

// The English entry. Identical to `main.jsx` apart from the copy module it
// hands the provider — which is the whole point of the content layer, and why
// `App` and every component below it need no locale branch.
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <CopyProvider copy={en}>
      <App />
    </CopyProvider>
  </HelmetProvider>
);
