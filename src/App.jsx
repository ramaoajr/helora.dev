import React from 'react';
import { MotionConfig } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Problems from '@/components/Problems';
import Services from '@/components/Services';
import HowWeWork from '@/components/HowWeWork';
import Technologies from '@/components/Technologies';
import WhoItsFor from '@/components/WhoItsFor';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactFormModal from '@/components/ContactFormModal';
import { Toaster } from '@/components/ui/toaster';
import { ContactFormProvider } from '@/context/ContactFormContext';

/**
 * No <Helmet> here any more, and no react-helmet-async anywhere.
 *
 * It existed only to inject Google Analytics and the Meta pixel at runtime.
 * Both are gone: between them they wrote three identifiers into every
 * visitor's browser (`_ga`, `_ga_<id>` and `_fbp`) before anyone had agreed to
 * anything, which is the thing the rules actually object to — a missing
 * paragraph on the privacy page was the symptom, not the problem.
 *
 * Visits are now counted by Cloudflare Web Analytics, whose beacon is a plain
 * script tag in index.html and en.html. It stores nothing in the browser, so
 * there is no consent to collect and no banner to build.
 *
 * Title, description and the rest of the metadata were never Helmet's job:
 * they live statically in each HTML entry, where a crawler sees them without
 * running any JavaScript.
 */
function App() {
  return (
    <ContactFormProvider>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-brand-blue text-white">
          <Header />
          <main>
            <Hero />
            <Problems />
            <Services />
            <HowWeWork />
            <About />
            <WhoItsFor />
            <Technologies />
            <FinalCTA />
          </main>
          <Footer />
          <ContactFormModal />
          <Toaster />
        </div>
      </MotionConfig>
    </ContactFormProvider>
  );
}

export default App;
