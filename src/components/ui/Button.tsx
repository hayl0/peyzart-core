import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-gradient-to-r from-peyzart-cyan to-peyzart-blue hover:shadow-lg hover:shadow-peyzart-cyan/50 text-white',
  secondary:
    'bg-gradient-to-r from-peyzart-purple to-peyzart-magenta hover:shadow-lg hover:shadow-peyzart-purple/50 text-white',
  outline:
    'border-2 border-peyzart-cyan text-peyzart-cyan hover:bg-peyzart-cyan/10 hover:shadow-lg hover:shadow-peyzart-cyan/30',
  danger: 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg hover:shadow-red-500/50',
  success: 'bg-green-500 hover:bg-green-600 text-white hover:shadow-lg hover:shadow-green-500/50',
};

const sizes = {
  sm: 'px-4 py-2 text-sm font-medium rounded-lg',
  md: 'px-6 py-3 text-base font-semibold rounded-xl',
  lg: 'px-8 py-4 text-lg font-bold rounded-2xl',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      loading = false,
      fullWidth = false,
      className = '',
      children,
      disabled,
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        disabled={disabled || loading}
        onClick={onClick}
        type={type}
        className={`
          ${sizes[size]}
          ${variants[variant]}
          ${fullWidth ? 'w-full' : ''}
          ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          transition-all duration-200 flex items-center justify-center gap-2
          backdrop-blur-sm border border-white/10
          ${className}
        `}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
