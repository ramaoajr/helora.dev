import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/context/ContactFormContext';

const Hero = () => {
  const { openContactForm } = useContactForm();

  return (
    <section id="hero" className="relative isolate overflow-hidden pt-14 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Helora Dev - Automation and Internal Apps for Growing Companies</title>
        <meta name="description" content="Custom automation systems and internal apps for companies that want to grow organised. We help you work smarter with less manual work, fewer errors, and more control." />
      </Helmet>
      <div
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-[#0f2e4a] shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50/10 sm:-mr-80 lg:-mr-96"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
        <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
          {/* Content Column */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Simplify Your Workflow, Amplify Your Growth.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Custom automation systems and internal apps for companies that want to grow organized.
              We help you work smarter with less manual work, fewer errors, and more control.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-x-6"
            >
              <Button onClick={openContactForm} size="lg" className="px-8 py-3 text-lg font-semibold shadow-lg">
                Get in Touch
              </Button>
              <a href="#about" className="text-sm font-semibold leading-6 text-white hover:text-primary transition-colors duration-300">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center lg:justify-end hidden md:block"
          >
            <img
              src="/hero.png"
              alt="Helora Dev Logo - Turning Processes into Systems"
              className="w-full max-w-md rounded-lg shadow-2xl shadow-black/50"
            />
          </motion.div>
        </div>
      </div>
      <div
        className="absolute inset-y-0 left-1/2 -z-10 -ml-96 w-[200%] origin-bottom-left skew-x-[30deg] bg-[#0f2e4a] shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50/10 sm:-ml-80 lg:-ml-96"
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;