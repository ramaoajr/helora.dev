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
import { useInView } from '@/hooks/useInView';

const Technologies = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

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
    <section id="technologies" className="py-20 sm:py-28 px-4 bg-brand-blueSoft" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Tecnologias
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stack moderno para construir, integrar e sustentar a operação.
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Escolhemos ferramentas pela aderência ao problema, velocidade de implantação e
            capacidade de manutenção no longo prazo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.04 }}
              className="bg-brand-blue p-5 rounded-lg border border-brand-blueMuted hover:border-primary transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300">
                  <tech.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {tech.name}
                  </h3>
                  <p className="text-sm leading-6 text-gray-300">{tech.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
