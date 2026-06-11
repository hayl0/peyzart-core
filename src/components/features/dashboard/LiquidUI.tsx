/**
 * Peyzart Liquid UI Primitives
 * Architecture: Feature-Specific UI with Native Hooks
 */

"use client";

import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonProps, InputProps, ToggleProps } from '@/types/ui';
import { useHaptics } from '@/hooks/useHaptics';

export const LiquidButtonRed: React.FC<ButtonProps> = ({ 
  label, className, isLoading, disabled, onClick, ...props 
}) => {
  const { triggerImpactLight } = useHaptics();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerImpactLight();
    if (onClick) onClick(e);
  };

  return (
    <button 
      className={cn(
        "liquid-button-red relative px-10 py-4 text-sm font-bold tracking-wider uppercase transition-all active:scale-95 disabled:opacity-50",
        "bg-gradient-to-r from-[#ff5f57] to-[#ff241a] text-white rounded-2xl shadow-lg hover:brightness-110",
        className
      )}
      onClick={handleClick}
      disabled={isLoading || disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{label || props.children}</span>
      </div>
    </button>
  );
};

export const LiquidButtonBlack: React.FC<ButtonProps> = ({ 
  label, className, isLoading, disabled, onClick, ...props 
}) => {
  const { triggerImpactLight } = useHaptics();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerImpactLight();
    if (onClick) onClick(e);
  };

  return (
    <button 
      className={cn(
        "liquid-button-black relative px-10 py-4 text-sm font-bold tracking-wider uppercase transition-all active:scale-95",
        "bg-[#0a0e14] text-white rounded-2xl border border-white/10 hover:bg-zinc-900",
        className
      )}
      onClick={handleClick}
      disabled={isLoading || disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{label || props.children}</span>
      </div>
    </button>
  );
};

export const LiquidSearch: React.FC<InputProps> = ({ className, ...props }) => {
  const { triggerImpactLight } = useHaptics();
  return (
    <div className={cn("glass-panel p-1.5 flex items-center gap-4 w-full max-w-xl group transition-all rounded-2xl", className)}>
      <div className="pl-4 py-3 flex-1 flex flex-col gap-1">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Search</span>
        <input 
          type="text" 
          className="bg-transparent border-none outline-none text-white font-semibold placeholder:text-white/20 w-full"
          onFocus={() => triggerImpactLight()}
          {...props}
        />
      </div>
      <div className="pr-4">
        <Search className="w-5 h-5 text-white/40 group-focus-within:text-white transition-colors" />
      </div>
    </div>
  );
};

export const LiquidIconToggle: React.FC<ToggleProps> = ({ active, onChange, label }) => {
  const { triggerImpactMedium } = useHaptics();
  const handleToggle = () => {
    triggerImpactMedium();
    onChange?.(!active);
  };

  return (
    <button 
      onClick={handleToggle}
      className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center glass-panel transition-all",
        active ? "ring-2 ring-greenish-bright/30" : ""
      )}
      aria-pressed={active}
      title={label}
    >
      <div className={cn(
        "w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all",
        active ? 'border-greenish-bright bg-greenish-bright/10' : 'border-white/20'
      )}>
        <div className={cn("w-4 h-4 rounded-sm rotate-45 transition-all", active ? 'bg-greenish-bright' : 'bg-white/20')} />
      </div>
    </button>
  );
};
