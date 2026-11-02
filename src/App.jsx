import React from 'react';
import { Helmet } from 'react-helmet-async';
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

function App() {
  return (
    <ContactFormProvider>
      {/* Title and description live statically in index.html (single source of truth, crawler-visible). */}
      <Helmet>
        {/* facebook-domain-verification lives statically in index.html (crawler-visible, no JS). */}
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WGCXWRMLPS"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WGCXWRMLPS');
          `}
        </script>

        {/* Meta Pixel Code */}
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            // autoConfig off: without it the pixel scrapes the contact form and
            // sends the visitor's hashed name, e-mail and phone to Facebook on
            // submit, undisclosed. Only the events configured below are sent.
            fbq('set', 'autoConfig', false, '1393231512478272');
            fbq('init', '1393231512478272');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1393231512478272&ev=PageView&noscript=1"
            />
          `}
        </noscript>
        {/* End Meta Pixel Code */}
      </Helmet>
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
