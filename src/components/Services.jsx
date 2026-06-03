import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ClipboardCheck, Network, PanelsTopLeft } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const Services = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  const services = [
    {
      icon: Bot,
      title: 'Automação',
      description: 'Automatizamos tarefas repetitivas e integrações entre ferramentas para reduzir esforço manual.',
      examples: ['alertas e aprovações', 'sincronização de dados', 'relatórios automáticos'],
    },
    {
      icon: PanelsTopLeft,
      title: 'Sistemas sob medida',
      description: 'Criamos aplicações internas para fluxos que não cabem em ferramentas genéricas.',
      examples: ['portais operacionais', 'dashboards de controle', 'gestão de ordens e solicitações'],
    },
    {
      icon: ClipboardCheck,
      title: 'Organização operacional',
      description: 'Mapeamos processos, eliminamos ruído e transformamos rotinas soltas em fluxos claros.',
      examples: ['SOPs e checklists', 'responsáveis e prazos', 'indicadores de operação'],
    },
    {
      icon: Network,
      title: 'Consultoria técnica',
      description: 'Ajudamos a decidir o que automatizar, o que integrar e qual tecnologia usar em cada etapa.',
      examples: ['diagnóstico de stack', 'arquitetura de solução', 'roadmap de implementação'],
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 px-4 bg-brand-blueSoft" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Serviços
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sistemas, automações e clareza para a operação real.
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A HeloraDev atua como parceira técnica e estratégica para empresas que precisam
            organizar o trabalho antes de escalar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
              className="bg-brand-blue p-7 rounded-lg border border-brand-blueMuted hover:border-primary transition-colors duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-5">{service.description}</p>
                  <ul className="grid gap-2">
                    {service.examples.map((example) => (
                      <li key={example} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
