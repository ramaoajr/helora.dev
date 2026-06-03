import React from 'react';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <title>HeloraDev - Operações eficientes para empresas em crescimento</title>
        <meta name="description" content="Transformamos operações desorganizadas em processos eficientes com automação, sistemas sob medida e consultoria técnica para PMEs." />
        <meta name="facebook-domain-verification" content="f0f1zudj3ypu1hn8tg500ius85lk3b" />
        
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
    </ContactFormProvider>
  );
}

export default App;
