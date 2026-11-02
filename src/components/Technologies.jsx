import React from 'react';
import { motion } from 'framer-motion';
import {
  Atom,
  BadgeDollarSign,
  Braces,
  Code2,
  Database,
  GitBranch,
  LayoutTemplate,
  Network,
  NotebookTabs,
  ServerCog,
  Workflow,
} from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import SurfaceCard from '@/components/SurfaceCard';
import { useInView } from '@/hooks/useInView';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];

const Technologies = () => {
  const [ref, isInView] = useInView({ once: true });

  const technologies = [
    {
      name: 'WeWeb',
      description: 'Interfaces operacionais e aplicações internas com entrega rápida.',
      icon: LayoutTemplate,
    },
    {
      name: 'React',
      description: 'Frontends robustos para sistemas sob medida e dashboards.',
      icon: Atom,
    },
    {
      name: 'Tailwind',
      description: 'Design system consistente, responsivo e fácil de evoluir.',
      icon: Code2,
    },
    {
      name: 'Supabase',
      description: 'Backend, autenticação e APIs para produtos internos escaláveis.',
      icon: ServerCog,
    },
    {
      name: 'PostgreSQL',
      description: 'Dados estruturados, relatórios e regras operacionais confiáveis.',
      icon: Database,
    },
    {
      name: 'n8n',
      description: 'Automações, integrações e workflows entre ferramentas.',
      icon: Workflow,
    },
    {
      name: 'Make',
      description: 'Cenários de automação para processos administrativos e comerciais.',
      icon: Network,
    },
    {
      name: 'Notion',
      description: 'Bases de conhecimento, documentação e organização de processos.',
      icon: NotebookTabs,
    },
    {
      name: 'GitHub',
      description: 'Versionamento, revisão e entrega técnica com rastreabilidade.',
      icon: GitBranch,
    },
    {
      name: 'Vercel',
      description: 'Deploys rápidos e confiáveis para interfaces e aplicações web.',
      icon: Braces,
    },
    {
      name: 'Stripe',
      description: 'Pagamentos, assinaturas e fluxos financeiros quando o produto exige.',
      icon: BadgeDollarSign,
    },
  ];

  return (
    // Support tier: the stack matters less to the buyer than the outcome, so
    // this section runs shorter, narrower and on quieter cards than the rest.
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
            eyebrow="Tecnologias"
            title="Stack moderno para construir, integrar e sustentar a operação."
            lead="Escolhemos ferramentas pela aderência ao problema, velocidade de implantação e capacidade de manutenção no longo prazo."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((tech, index) => (
            <SurfaceCard
              key={tech.name}
              tone="quiet"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.42,
                delay: Math.min(index, 5) * 0.04,
                ease: EASE_OUT_SOFT,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/[0.12] ring-1 ring-inset ring-primary/20">
                  <tech.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-1 text-h4 text-copy-strong">{tech.name}</h3>
                  <p className="text-small text-copy">{tech.description}</p>
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
