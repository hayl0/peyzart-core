import React from 'react';

interface SelectProps {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  defaultValue?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', onChange, value, defaultValue }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-white text-sm font-semibold mb-2">{label}</label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-white/10 border border-white/20
            text-white
            focus:bg-white/15 focus:border-peyzart-cyan/50
            focus:outline-none focus:ring-2 focus:ring-peyzart-cyan/20
            transition-all duration-300
            backdrop-blur-sm
            cursor-pointer
            ${error ? 'border-red-500/50' : ''}
            ${className}
          `}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
