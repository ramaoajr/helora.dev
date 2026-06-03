import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/context/ContactFormContext';

const Hero = () => {
  const { openContactForm } = useContactForm();

  return (
    <section id="hero" className="relative isolate overflow-hidden pt-20 px-4 sm:px-6 lg:px-8 bg-brand-blue">
      <Helmet>
        <title>HeloraDev - Operações eficientes para empresas em crescimento</title>
        <meta name="description" content="Transformamos operações desorganizadas em processos eficientes com automação, sistemas sob medida e consultoria técnica para PMEs." />
      </Helmet>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#0B1F33_0%,#102F4F_58%,#0B1F33_100%)]" />
      <div className="mx-auto max-w-7xl py-12 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10 lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-primary"
            >
              Consultoria operacional e tecnologia sob medida
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Transformamos operações desorganizadas em processos eficientes.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto lg:mx-0"
            >
              A HeloraDev organiza fluxos, automatiza tarefas e cria sistemas internos para
              empresas que precisam de mais controle, menos retrabalho e decisões baseadas em dados.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button onClick={openContactForm} size="lg" className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg">
                Agendar conversa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-white/20 px-8 py-3 text-base font-semibold text-white hover:border-primary hover:text-primary transition-colors duration-300"
              >
                Conhecer serviços
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hidden md:flex justify-center lg:justify-end"
          >
            <img
              src="/hero.png"
              alt="HeloraDev - processos transformados em sistemas"
              className="w-full max-w-md rounded-lg shadow-2xl shadow-black/40 border border-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
