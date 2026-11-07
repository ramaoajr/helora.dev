import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Declaring `input` REPLACES Vite's default single entry, so `index.html`
      // has to be listed here explicitly — drop it and the whole main site
      // stops being built.
      //
      // `privacidade` stays a flat file on purpose: it emits
      // `dist/privacidade.html`, which Cloudflare Pages serves at the clean
      // `/privacidade` with a 200. A `privacidade/index.html` layout would
      // instead redirect `/privacidade` to `/privacidade/`.
      input: {
        index: path.resolve(__dirname, 'index.html'),
        privacidade: path.resolve(__dirname, 'privacidade.html'),
      },
    },
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
