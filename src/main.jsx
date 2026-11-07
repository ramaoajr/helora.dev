import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import pt from '@/content/pt';
import { CopyProvider } from '@/content/CopyContext';
import '@/index.css';

// The Portuguese entry. `index.html` carries `lang="pt-BR"`, and this is where
// the matching copy enters the tree — the one line that differs between this
// entry and the English one, which is why `App` itself needs no locale prop.
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <CopyProvider copy={pt}>
      <App />
    </CopyProvider>
  </HelmetProvider>
);
