import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/context/ContactFormContext';

const FinalCTA = () => {
  const [ref, isInView] = useInView({ threshold: 0.3, once: true });
  const { openContactForm } = useContactForm();

  return (
    <section className="py-20 sm:py-28 px-4 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-[spin_30s_linear_infinite]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to <span className="text-primary">Automate Your Growth?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's talk about your challenges and build a system that solves them. No sales pitch—just a straightforward conversation about what you need.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Button
              onClick={openContactForm}
              size="lg"
              className="font-bold w-full sm:w-auto"
            >
              Take the first step
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;