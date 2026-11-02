import React from 'react';
import { motion } from 'framer-motion';
import {
  AppWindow,
  BarChart3,
  Bot,
  CreditCard,
  Database,
  KeyRound,
  Smartphone,
  Workflow,
} from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import SurfaceCard from '@/components/SurfaceCard';
import { useInView } from '@/hooks/useInView';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

// Eight capabilities, not eleven tool names: the buyer searches for what the
// thing does, never for the stack. Eight also fills the 4-column grid as an
// exact 4x2, so the final row is never ragged.
const CAPABILITIES = [
  {
    title: 'Software sob medida',
    description: 'Sistemas que rodam no navegador, feitos para o seu fluxo.',
    icon: AppWindow,
  },
  {
    title: 'Aplicativos móveis',
    description: 'Para quem trabalha fora do escritório, direto no celular.',
    icon: Smartphone,
  },
  {
    title: 'Agentes de IA',
    description: 'Respondem, triam e executam tarefas sem alguém no meio.',
    icon: Bot,
  },
  {
    title: 'Automações e integrações',
    description: 'Fazem suas ferramentas conversarem entre si.',
    icon: Workflow,
  },
  {
    title: 'Bancos de dados profissionais',
    description: 'Um lugar só para o dado, com histórico e dono.',
    icon: Database,
  },
  {
    title: 'Relatórios e painéis',
    description: 'O número do dia pronto, sem montar planilha.',
    icon: BarChart3,
  },
  {
    title: 'Contas e controle de acesso',
    description: 'Cada pessoa vê o que precisa, e só isso.',
    icon: KeyRound,
  },
  {
    title: 'Serviços de pagamento',
    description: 'Cobrança, assinatura e repasse dentro do sistema.',
    icon: CreditCard,
  },
];

const Technologies = () => {
  const [ref, isInView] = useInView({ once: true });

  return (
    // Support tier: this section lists scope, not proof, so it runs shorter,
    // narrower and on quieter cards than the rest. The icon plates stay
    // neutral on purpose — amber is reserved for Services, WhoItsFor and the
    // three solid CTAs, and 8 amber plates here would drown them out.
    //
    // The id stays `technologies` even though the section is now about
    // capabilities: the nav never writes the hash, so renaming it would only
    // couple this file to Header.jsx and Footer.jsx for zero user-facing gain.
    <section
      id="technologies"
      aria-labelledby="technologies-title"
      className="py-16 sm:py-24 px-4 bg-brand-blueSoft"
      ref={ref}
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
          className="mb-10 sm:mb-14"
        >
          <SectionIntro
            id="technologies-title"
            align="left"
            eyebrow="O que construímos"
            title="O que fica funcionando na sua empresa."
            lead="Oito frentes. Um projeto costuma usar três ou quatro."
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAPABILITIES.map((capability, index) => (
            <SurfaceCard
              key={capability.title}
              tone="quiet"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.42,
                delay: Math.min(index, 5) * 0.04,
                ease: EASE_OUT_SOFT,
              }}
            >
              <div className="flex items-start gap-3 lg:block">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-inset ring-white/[0.08]">
                  <capability.icon className="h-5 w-5 text-copy" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-1 text-h4 text-copy-strong lg:mt-4">{capability.title}</h3>
                  <p className="text-small text-copy">{capability.description}</p>
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
