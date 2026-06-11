/**
 * Peyzart Liquid Design System Components
 * High-performance, accessible, and premium UI elements with liquid aesthetics.
 * 
 * @module LiquidUI
 */

"use client";

import React from 'react';
import { Search, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonProps, InputProps, ToggleProps } from '@/types/ui';
import { hapticImpactLight, hapticImpactMedium } from '@/lib/haptics';

/**
 * LiquidButtonRed - A premium, high-contrast action button.
 * 
 * @param {ButtonProps} props - Component properties
 */
export const LiquidButtonRed: React.FC<ButtonProps> = ({ 
  label, 
  className, 
  isLoading, 
  disabled, 
  onClick,
  ...props 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    hapticImpactLight();
    if (onClick) onClick(e);
  };

  return (
    <button 
      className={cn(
        "liquid-button-red relative px-10 py-4 text-sm font-bold tracking-wider uppercase transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        "shadow-button-red hover:brightness-110",
        className
      )}
      onClick={handleClick}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{label || props.children}</span>
      </div>
    </button>
  );
};

/**
 * LiquidButtonBlack - A sleek, professional dark mode button.
 */
export const LiquidButtonBlack: React.FC<ButtonProps> = ({ 
  label, 
  className, 
  isLoading, 
  disabled, 
  onClick,
  ...props 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    hapticImpactLight();
    if (onClick) onClick(e);
  };

  return (
    <button 
      className={cn(
        "liquid-button-black relative px-10 py-4 text-sm font-bold tracking-wider uppercase transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        "shadow-button-black hover:bg-zinc-900",
        className
      )}
      onClick={handleClick}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{label || props.children}</span>
      </div>
    </button>
  );
};

/**
 * LiquidSearch - High-fidelity glassmorphism search input.
 */
export const LiquidSearch: React.FC<InputProps> = ({ className, ...props }) => (
  <div className={cn(
    "liquid-glass-input p-1.5 flex items-center gap-4 w-full max-w-xl group transition-all duration-300 focus-within:ring-2 focus-within:ring-white/10",
    className
  )}>
    <div className="pl-4 py-3 flex-1 flex flex-col gap-1">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest select-none">Search Query</span>
        <input 
            type="text" 
            placeholder="Search assets or suggestions..." 
            className="bg-transparent border-none outline-none text-white font-semibold placeholder:text-white/20 w-full"
            aria-label="Search"
            onFocus={() => hapticImpactLight()}
            {...props}
        />
    </div>
    <div className="pr-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-focus-within:bg-white/10 transition-colors">
            <Search className="w-5 h-5 text-white/40 group-focus-within:text-white transition-all duration-300" />
        </div>
    </div>
  </div>
);

/**
 * LiquidIconToggle - Premium toggle component with neon glow effects.
 */
export const LiquidIconToggle: React.FC<ToggleProps> = ({ active, onChange, label, ariaLabel }) => {
    const handleToggle = () => {
        hapticImpactMedium();
        onChange?.(!active);
    };

    return (
        <button 
            onClick={handleToggle}
            className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center liquid-glass-card shadow-glass-inset cursor-pointer group transition-all duration-300",
                active ? "ring-2 ring-greenish-bright/30" : "hover:bg-white/5"
            )}
            aria-pressed={active}
            aria-label={ariaLabel || label || "Toggle state"}
            title={label}
        >
            <div className={cn(
                "w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-500",
                active ? 'border-greenish-bright bg-greenish-bright/10 shadow-glass-glow' : 'border-white/20'
            )}>
                <div className={cn(
                    "w-4 h-4 rounded-sm rotate-45 transition-all duration-500",
                    active ? 'bg-greenish-bright scale-110' : 'bg-white/20 scale-90'
                )} />
            </div>
        </button>
    );
};

