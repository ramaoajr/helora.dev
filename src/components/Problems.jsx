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
import SectionIntro from '@/components/SectionIntro';
import { useInView } from '@/hooks/useInView';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

// Nine items would otherwise stagger for a full second; capping the index
// keeps the last row inside a 0.24s budget.
const STAGGER_STEP = 0.04;
const STAGGER_CAP = 5;

const LEAD =
  'Quando processos dependem de planilhas, mensagens e memória, a empresa perde tempo, controle e previsibilidade todos os dias.';

const Problems = () => {
  const [ref, isInView] = useInView({ once: true });

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
    <section
      id="problems"
      aria-labelledby="problems-title"
      className="py-20 sm:py-28 px-4 bg-brand-blue"
      ref={ref}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
          className="mb-10 sm:mb-14"
        >
          <SectionIntro
            id="problems-title"
            align="split"
            eyebrow="Problemas que resolvemos"
            title="Operações travam antes de parecerem grandes problemas."
            lead={LEAD}
          />
        </motion.div>

        {/* A hairline checklist, not cards: the visitor should tick through the
            nine items in a few seconds and move on. */}
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.li
              key={problem.title}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.42,
                delay: Math.min(index, STAGGER_CAP) * STAGGER_STEP,
                ease: EASE_OUT_SOFT,
              }}
              className="border-t border-white/[0.07] pt-5"
            >
              <div className="flex items-center gap-3">
                <problem.icon className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                <h3 className="text-h4 text-copy-strong">{problem.title}</h3>
              </div>
              <p className="mt-2 text-small text-copy">{problem.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Problems;
