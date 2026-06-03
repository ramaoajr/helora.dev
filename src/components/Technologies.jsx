import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

// Icon Components
const NotionIcon = ({ className, style }) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.5 4H4.5C3.67157 4 3 4.67157 3 5.5V18.5C3 19.3284 3.67157 20 4.5 20H19.5C20.3284 20 21 19.3284 21 18.5V5.5C21 4.67157 20.3284 4 19.5 4ZM8.5 16L7 16V8L8.5 8L12.5 13.5V8H14V16H12.5L8.5 10.5V16Z" />
  </svg>
);

const OpenAIIcon = ({ className, style }) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0843 1.6557-1.0842h.1341a.71.71 0 0 1 .4504.1486l4.2443 2.4542a4.5127 4.5127 0 0 1-3.7496-.4023zm3.7944-1.5037-2.4842-1.4328.0048-2.8377.0095-2.0255 1.7601-1.0185 2.8025 1.6185a4.5127 4.5127 0 0 1-2.0927 5.696zm2.4604-5.461-1.551-3.5516-1.6557 1.0842-1.6557 1.0843 1.6366 3.7505a4.5127 4.5127 0 0 1-4.2253-1.6709l2.4555-1.4233 2.4555-1.4233 2.5366 1.4519a4.4755 4.4755 0 0 1 .0033 1.6982zm-8.2435-5.3275 3.2064 1.8538-1.6366 3.7504a4.5127 4.5127 0 0 1-3.6924-4.2157l2.1226 1.2223zM3.467 11.2586l3.2064-1.8537 1.6557 1.0842 1.6557 1.0843-3.2064 1.8538a4.5127 4.5127 0 0 1-3.3114-2.1686zm3.6264-6.3905a4.4755 4.4755 0 0 1 2.8812 1.036l-.1419.0843-1.6557 1.0843h-.1389a.71.71 0 0 1-.4456-.1438L3.3482 4.4697a4.5127 4.5127 0 0 1 3.7452.3984zm11.3787 1.954-1.7601 1.0185-2.8025-1.6185a4.5127 4.5127 0 0 1 2.0927-5.696l2.4842 1.4328-.0048 2.8377-.0095 2.0255z" />
  </svg>
);

const N8NIcon = ({ className, style }) => (
   <svg 
    role="img" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.482 17.584c-1.385.795-1.385 2.096 0 2.89l3.05 1.752c1.386.796 3.65.796 5.035 0l3.05-1.752c1.386-.794 1.386-2.095 0-2.89l-3.05-1.752c-1.385-.795-3.65-.795-5.035 0l-3.05 1.752z M.383 10.643c-1.385.794-1.385 2.095 0 2.89l3.05 1.75c1.385.796 3.65.796 5.035 0l3.05-1.75c1.385-.795 1.385-2.096 0-2.89l-3.05-1.75c-1.385-.796-3.65-.796-5.035 0l-3.05 1.75zm6.545-9.014c-1.385.794-1.385 2.095 0 2.89l3.05 1.75c1.386.796 3.65.796 5.035 0l3.05-1.75c1.386-.794 1.386-2.095 0-2.89l-3.05-1.75c-1.385-.795-3.65-.795-5.035 0l-3.05 1.75z" />
  </svg>
);

const SupabaseIcon = ({ className, style }) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21.362 9.354H12.035L14.717 0H7.07l-4.432 14.646h9.327L9.283 24l12.079-14.646z" />
  </svg>
);


const Technologies = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const technologies = [
    {
      name: 'Notion',
      description: 'For collaborative workspaces and knowledge management systems',
      color: '#FFFFFF', // White for neutral
      icon: NotionIcon,
    },
    {
      name: 'IA Tools',
      description: 'Leveraging Artificial Intelligence for smart automation and data analysis',
      color: '#FFD531', // Using brand yellow
      icon: OpenAIIcon,
    },
    {
      name: 'N8N',
      description: 'Powerful workflow automation for connecting apps and services',
      color: '#FFFFFF', // White
      icon: N8NIcon,
    },
    {
      name: 'Supabase',
      description: 'For scalable backend infrastructure and real-time databases',
      color: '#FFD531', // Brand yellow
      icon: SupabaseIcon,
    },
  ];

  return (
    <section id="technologies" className="py-20 px-4 bg-[#001D37]" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-[#FFD531]">Technology Stack</span>
          </h2>
          <div className="w-20 h-1 bg-[#FFD531] mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We use modern, proven technologies to build reliable systems that scale with your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-[#052441] p-6 rounded-lg border border-[#0f2e4a] hover:border-[#FFD531] transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${tech.color}15` }}
                >
                  <tech.icon 
                    className="w-7 h-7"
                    style={{ color: tech.color }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#FFD531] transition-colors duration-300">
                    {tech.name}
                  </h3>
                  <p className="text-gray-300">{tech.description}</p>
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