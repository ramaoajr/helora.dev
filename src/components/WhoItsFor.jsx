import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Building2, TrendingUp, Users } from 'lucide-react';

const WhoItsFor = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  const audiences = [
    {
      icon: Building2,
      title: 'Growing Companies',
      description: 'You\'re scaling fast and manual processes are holding you back. You need systems that grow with you.',
    },
    {
      icon: TrendingUp,
      title: 'Data-Driven Businesses',
      description: 'You have data scattered across tools and need a unified view to make better decisions.',
    },
    {
      icon: Users,
      title: 'Operations Teams',
      description: 'You\'re tired of repetitive tasks and need automation to free up time for strategic work.',
    },
  ];

  return (
    <section id="who-its-for" className="py-20 sm:py-28 px-4 bg-[#052441]" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who <span className="text-primary">Helora</span> Is For
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We work with businesses that are ready to invest in systems that actually work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <audience.icon className="w-10 h-10 text-primary" />
                </div>
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