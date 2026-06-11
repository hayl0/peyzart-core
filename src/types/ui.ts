/**
 * Peyzart UI Component Types
 * Centralized type definitions for all UI components to ensure strict type safety.
 */

import { ReactNode, ButtonHTMLAttributes } from 'react';

export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning' | 'info';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  label?: string;
  variant?: 'solid' | 'outline' | 'ghost' | 'liquid';
  color?: ColorVariant | 'greenish' | 'black' | 'red';
  size?: SizeVariant;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface CardProps extends BaseProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  isHoverable?: boolean;
  isGlass?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface ToggleProps {
  active?: boolean;
  onChange?: (active: boolean) => void;
  label?: string;
  ariaLabel?: string;
}
