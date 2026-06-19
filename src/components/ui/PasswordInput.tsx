'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  showStrength?: boolean;
  value?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, showStrength = false, value = '', className = '', ...props }, ref) => {
    const [show, setShow] = useState(false);

    const strength = () => {
      let score = 0;
      if (value.length >= 8) score++;
      if (/[A-Z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;
      return score;
    };

    const strengthLabels = ['', 'Zayıf', 'Orta', 'İyi', 'Güçlü'];
    const strengthColors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#4CAF50'];
    const s = strength();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-white text-sm font-semibold mb-2">{label}</label>
        )}
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            ref={ref}
            type={show ? 'text' : 'password'}
            className={`
              w-full px-4 py-3 pl-11 pr-12 rounded-xl
              bg-white/10 border border-white/20
              text-white placeholder-white/40
              focus:bg-white/15 focus:border-bright-green/50
              focus:outline-none focus:ring-2 focus:ring-bright-green/20
              transition-all duration-300
              backdrop-blur-sm
              ${error ? 'border-red-500/50' : ''}
              ${className}
            `}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {showStrength && value.length > 0 && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{ backgroundColor: i <= s ? strengthColors[s] : 'rgba(255,255,255,0.1)' }}
                />
              ))}
            </div>
            <p className="text-xs mt-1" style={{ color: strengthColors[s] || 'rgba(255,255,255,0.4)' }}>
              {strengthLabels[s]}
            </p>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
