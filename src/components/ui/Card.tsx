import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  variant?: 'glass' | 'gradient' | 'solid';
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variants = {
  glass: 'backdrop-blur-xl bg-white/10 border border-white/20 hover:border-white/40',
  gradient:
    'bg-gradient-to-br from-peyzart-cyan/20 to-peyzart-purple/20 border border-white/20 hover:border-peyzart-cyan/50',
  solid: 'bg-white/5 border border-white/15 hover:border-white/30',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'glass', hover = true, className = '', children }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0, 240, 255, 0.1)' } : undefined}
        className={`
          ${variants[variant]}
          rounded-2xl p-6 transition-all duration-300
          ${className}
        `}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
