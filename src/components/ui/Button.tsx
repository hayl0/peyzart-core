import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-gradient-to-r from-bright-green to-medium-green hover:shadow-lg hover:shadow-bright-green/30 text-white',
  secondary:
    'bg-gradient-to-r from-dark-forest to-peyzart-green hover:shadow-lg hover:shadow-dark-forest/30 text-white',
  outline:
    'border-2 border-bright-green text-bright-green hover:bg-bright-green/10 hover:shadow-lg hover:shadow-bright-green/20',
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
      type = 'button'
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
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          icon
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
