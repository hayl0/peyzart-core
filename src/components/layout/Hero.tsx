import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  title: React.ReactNode;
  subtitle?: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  }[];
  backgroundImage?: string;
  className?: string;
}

export const Hero = ({
  title,
  subtitle,
  description,
  cta,
  backgroundImage,
  className = '',
}: HeroProps) => {
  return (
    <section
      className={`
        relative min-h-screen flex items-center justify-center overflow-hidden
        ${className}
      `}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-peyzart-darker/50 to-peyzart-darker/80" />

      {/* Animated Background Elements */}
      <motion.div
        animate={
          {
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }
        }
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-peyzart-cyan rounded-full blur-3xl"
      />
      <motion.div
        animate={
          {
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.1, 0.15, 0.1],
          }
        }
        transition={{ duration: 20, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-peyzart-purple rounded-full blur-3xl"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-peyzart-cyan font-bold text-lg mb-4 uppercase tracking-widest"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {cta.map((button, i) => (
              <a
                key={i}
                href={button.href}
                className={`
                  px-8 py-4 rounded-xl font-bold text-lg transition-all
                  ${
                    button.variant === 'secondary'
                      ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                      : 'bg-gradient-to-r from-peyzart-cyan to-peyzart-blue text-white shadow-lg shadow-peyzart-cyan/50 hover:shadow-xl'
                  }
                `}
              >
                {button.text}
              </a>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-peyzart-cyan/50 rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-peyzart-cyan rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};
