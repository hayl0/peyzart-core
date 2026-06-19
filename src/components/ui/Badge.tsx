import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const variants = {
  default: 'bg-bright-green/20 text-bright-green border border-bright-green/50',
  success: 'bg-green-500/20 text-green-400 border border-green-500/50',
  warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50',
  error: 'bg-red-500/20 text-red-400 border border-red-500/50',
  info: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
};

const sizes = {
  sm: 'px-3 py-1 text-xs font-medium',
  md: 'px-4 py-2 text-sm font-semibold',
  lg: 'px-6 py-3 text-base font-bold',
};

export const Badge: React.FC<BadgeProps & { children: React.ReactNode }> = ({
  variant = 'default',
  size = 'md',
  icon,
  children,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-full inline-flex items-center gap-2
        backdrop-blur-sm
      `}
    >
      {icon}
      {children}
    </motion.div>
  );
};
