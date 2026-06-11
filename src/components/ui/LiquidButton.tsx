/**
 * Modern Liquid Button Wrapper
 * Redirects to the central LiquidUI system for consistency.
 */

import React from 'react';
import { LiquidButtonRed, LiquidButtonBlack } from '@/components/greenish/LiquidUI';

interface LiquidButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  isLoading?: boolean;
}

const LiquidButton: React.FC<LiquidButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  className,
  isLoading
}) => {
  if (variant === 'primary') {
    return (
      <LiquidButtonRed 
        label={label} 
        onClick={onClick} 
        className={className} 
        isLoading={isLoading} 
      />
    );
  }

  return (
    <LiquidButtonBlack 
      label={label} 
      onClick={onClick} 
      className={className} 
      isLoading={isLoading} 
    />
  );
};

export default LiquidButton;
