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
      // Every entry is a FLAT file for the same reason: `en.html` emits
      // `dist/en.html`, which Cloudflare Pages serves at the clean `/en` with
      // a 200. An `en/index.html` layout would redirect `/en` to `/en/`.
      input: {
        index: path.resolve(__dirname, 'index.html'),
        privacidade: path.resolve(__dirname, 'privacidade.html'),
        en: path.resolve(__dirname, 'en.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
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
