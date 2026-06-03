import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, Map, Search } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const HowWeWork = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  const steps = [
    {
      icon: Search,
      title: 'Diagnóstico',
      description: 'Entendemos a operação, os gargalos, as ferramentas atuais e o impacto de cada problema.',
    },
    {
      icon: Map,
      title: 'Planejamento',
      description: 'Definimos o fluxo ideal, prioridades, riscos e o caminho técnico mais simples para implementar.',
    },
    {
      icon: CheckCircle2,
      title: 'Implementação',
      description: 'Construímos automações, sistemas e integrações com ciclos curtos e validação operacional.',
    },
    {
      icon: BarChart3,
      title: 'Acompanhamento',
      description: 'Ajustamos o que foi implantado, medimos resultado e evoluímos a operação com dados reais.',
    },
  ];

  return (
    <section id="how-we-work" className="py-20 sm:py-28 px-4 bg-brand-blue" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Como trabalhamos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Primeiro entendemos. Depois construímos.
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            O processo reduz risco, evita soluções genéricas e mantém a tecnologia conectada
            ao que a operação precisa entregar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
              className="relative bg-brand-blueSoft p-6 rounded-lg border border-brand-blueMuted"
            >
              <span className="text-sm font-bold text-primary">0{index + 1}</span>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center my-5">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm leading-6 text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
