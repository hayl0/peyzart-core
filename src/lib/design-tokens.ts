/**
 * Design System Constants
 * Centralized design tokens and constants
 */

export const COLORS = {
  greenish: {
    darkest: '#121d16',
    dark: '#1b5e20',
    medium: '#2e7d32',
    bright: '#4caf50',
    lime: '#cddc39',
    yellow: '#fbc02d',
    bg: '#f0f2f5',
  },
  liquid: {
    red: {
      from: '#ff5f57',
      to: '#ff241a',
    },
    black: {
      from: '#2a2a2a',
      to: '#000000',
    },
  },
} as const;

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem',
} as const;

export const TYPOGRAPHY = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

export const BORDER_RADIUS = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
  '5xl': '3rem',
  round: '9999px',
} as const;

export const SHADOWS = {
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
} as const;

export const BREAKPOINTS = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1060,
  tooltip: 1080,
  notification: 9999,
} as const;

export type ColorVariant = keyof typeof COLORS.greenish;
export type SizeVariant = 'sm' | 'md' | 'lg';
