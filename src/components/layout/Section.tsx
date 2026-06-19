import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ title, description, children, className = '' }: SectionProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-bright-green via-medium-green to-peyzart-green bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            {description && (
              <p className="text-white/60 text-lg max-w-2xl">{description}</p>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};
