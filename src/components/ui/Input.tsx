import React from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-white text-sm font-semibold mb-2">{label}</label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">{icon}</div>}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 ${icon ? 'pl-12' : ''} rounded-xl
              bg-white/10 border border-white/20
              text-white placeholder-white/40
              focus:bg-white/15 focus:border-peyzart-cyan/50
              focus:outline-none focus:ring-2 focus:ring-peyzart-cyan/20
              transition-all duration-300
              backdrop-blur-sm
              ${error ? 'border-red-500/50' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
