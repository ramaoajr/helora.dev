import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const About = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  return (
    <section id="about" className="py-20 sm:py-28 px-4 bg-brand-blueSoft">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Sobre a HeloraDev
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Não somos uma agência de sites. Somos uma parceira para organizar a operação.
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
          <p className="text-lg text-gray-300 leading-relaxed">
            Trabalhamos com empresas que já sentem o limite de processos manuais,
            ferramentas desconectadas e decisões sem visibilidade. Nosso foco é entender a
            rotina real, simplificar o fluxo e transformar o que funciona no improviso em sistema.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            A solução pode ser uma automação, uma aplicação interna, uma integração ou apenas uma
            nova forma de organizar responsabilidades. O ponto central é sempre o mesmo: tecnologia
            aplicada ao controle operacional, sem excesso e sem promessa genérica.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
