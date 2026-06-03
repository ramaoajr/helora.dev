import React from 'react';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  Building2,
  Boxes,
  Factory,
  Truck,
  Wrench,
} from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const WhoItsFor = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  const audiences = [
    {
      icon: Truck,
      title: 'Logística',
      description: 'Operações com entregas, status, rotas, ocorrências e comunicação entre equipes.',
    },
    {
      icon: Boxes,
      title: 'Armazéns',
      description: 'Controle de recebimento, separação, inventário, expedição e produtividade operacional.',
    },
    {
      icon: Wrench,
      title: 'Manutenção',
      description: 'Ordens de serviço, SLA, técnicos em campo, peças, chamados e histórico de atendimento.',
    },
    {
      icon: BriefcaseBusiness,
      title: 'Prestadores',
      description: 'Empresas de serviço que precisam padronizar execução, agenda, cobrança e acompanhamento.',
    },
    {
      icon: Building2,
      title: 'Escritórios',
      description: 'Times administrativos com aprovações, documentos, tarefas recorrentes e relatórios.',
    },
    {
      icon: Factory,
      title: 'Empresas em expansão',
      description: 'PMEs que cresceram, mas ainda operam com controles frágeis e processos informais.',
    },
  ];

  return (
    <section id="who-its-for" className="py-20 sm:py-28 px-4 bg-brand-blue" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Para quem
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Empresas com operação concreta, rotina intensa e pouco espaço para retrabalho.
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Atuamos melhor onde processo, equipe e informação precisam andar juntos todos os dias.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
              className="bg-brand-blueSoft p-6 rounded-lg border border-brand-blueMuted"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                <audience.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{audience.title}</h3>
              <p className="text-gray-300 leading-relaxed">{audience.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
