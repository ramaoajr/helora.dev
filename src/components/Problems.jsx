import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ClipboardList,
  Clock,
  FileSpreadsheet,
  HelpCircle,
  MessageSquareWarning,
  Repeat,
  Route,
  Search,
} from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const Problems = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  const problems = [
    {
      icon: FileSpreadsheet,
      title: 'Planilhas controlando tudo',
      description: 'Dados críticos ficam em arquivos soltos, sem dono claro e sem histórico confiável.',
    },
    {
      icon: MessageSquareWarning,
      title: 'Informação espalhada',
      description: 'WhatsApp, e-mail, sistemas e conversas guardam pedaços diferentes da operação.',
    },
    {
      icon: Repeat,
      title: 'Retrabalho recorrente',
      description: 'A equipe refaz conferências, atualizações e cópias manuais que poderiam ser automáticas.',
    },
    {
      icon: Search,
      title: 'Pouca visibilidade',
      description: 'Prazos, responsáveis e gargalos só aparecem quando o problema já virou urgência.',
    },
    {
      icon: Route,
      title: 'Processos sem padrão',
      description: 'Cada pessoa executa de um jeito, o que torna treinamento, escala e qualidade instáveis.',
    },
    {
      icon: Clock,
      title: 'Relatórios atrasados',
      description: 'Indicadores chegam tarde porque dependem de coleta, limpeza e consolidação manual.',
    },
    {
      icon: AlertTriangle,
      title: 'Erros difíceis de rastrear',
      description: 'Falhas em cadastro, pedido ou atendimento passam por várias mãos antes de serem percebidas.',
    },
    {
      icon: HelpCircle,
      title: 'Status pouco claro',
      description: 'Clientes e gestores perguntam onde algo está porque não existe uma fonte única de verdade.',
    },
    {
      icon: ClipboardList,
      title: 'Crescimento sem controle',
      description: 'A demanda aumenta, mas os processos continuam dependentes de esforço manual e memória.',
    },
  ];

  return (
    <section id="problems" className="py-20 sm:py-28 px-4 bg-brand-blue" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Problemas que resolvemos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Operações travam antes de parecerem grandes problemas.
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Quando processos dependem de planilhas, mensagens e memória, a empresa perde tempo,
            controle e previsibilidade todos os dias.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
              className="bg-brand-blueSoft p-6 rounded-lg border border-brand-blueMuted"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <problem.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
              <p className="text-sm leading-6 text-gray-300">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
