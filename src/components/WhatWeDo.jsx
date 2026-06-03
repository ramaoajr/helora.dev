import React from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertCircle, BarChart3 } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const WhatWeDo = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  const benefits = [
    {
      icon: Zap,
      title: 'Less Manual Work',
      description: 'Automate repetitive tasks and workflows so your team can focus on what actually matters—growing your business.',
    },
    {
      icon: AlertCircle,
      title: 'Fewer Errors',
      description: 'Eliminate human error with automated systems that handle data consistently and accurately every single time.',
    },
    {
      icon: BarChart3,
      title: 'More Control',
      description: 'Get complete visibility into your operations with custom dashboards and real-time reporting built for your needs.',
    },
  ];

  return (
    <section id="what-we-do" className="py-20 sm:py-28 px-4 bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What <span className="text-primary">We Do</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We build systems that make your business run smoother, faster, and with complete transparency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="bg-[#052441] p-8 rounded-lg border border-border hover:border-primary transition-colors duration-300 group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;