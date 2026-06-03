import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const About = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-20 sm:py-28 px-4 bg-[#052441]">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            About <span className="text-primary">Helora</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
          <p className="text-lg text-gray-300 leading-relaxed">
            We're a development team specialising in custom automation and internal tools for growing businesses. 
            Our focus is on creating systems that eliminate repetitive tasks, reduce errors, and give you complete 
            visibility over your operations.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            We don't do generic. Every solution we build is tailored to your specific workflows, challenges, and goals. 
            Whether you need to automate data processing or integrate disparate systems—we make it happen with modern, reliable technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;