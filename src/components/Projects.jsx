import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const projects = [
    {
      title: 'Custom CRM Integration',
      description: 'Built a fully automated CRM system that integrates sales, customer support, and analytics in one unified platform.',
      tags: ['Automation', 'Integration', 'Analytics'],
    },
    {
      title: 'Inventory Management System',
      description: 'Developed a real-time inventory tracking system with automated reordering and multi-warehouse support.',
      tags: ['Real-time', 'Automation', 'Logistics'],
    },
    {
      title: 'Data Processing Pipeline',
      description: 'Created an automated pipeline that processes thousands of records daily, reducing manual work by 95%.',
      tags: ['Automation', 'Data Processing', 'Efficiency'],
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-[#052441]" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-[#FFD531]">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-[#FFD531] mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Real solutions we've built for real businesses facing real challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#001D37] p-6 rounded-lg border border-[#0f2e4a] hover:border-[#FFD531] transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-[#FFD531] transition-colors duration-300">
                  {project.title}
                </h3>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#FFD531] transition-colors duration-300" />
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#FFD531]/10 text-[#FFD531] text-xs rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;