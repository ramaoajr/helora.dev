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
    <section className="py-20 sm:py-28 px-4 bg-brand-blue relative overflow-hidden" ref={ref}>
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Próximo passo
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Seu negócio precisa de mais controle, menos retrabalho e processos mais eficientes.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Vamos entender a sua operação e identificar onde tecnologia pode gerar resultado
            sem criar complexidade desnecessária.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <Button
              onClick={openContactForm}
              size="lg"
              className="font-bold w-full sm:w-auto"
            >
              Falar com a HeloraDev
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
