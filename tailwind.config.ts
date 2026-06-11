import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'peyzart': {
          cyan: '#00f0ff',
          magenta: '#ff006e',
          blue: '#3b82f6',
          purple: '#a855f7',
          dark: '#0a0e27',
          darker: '#050811',
          success: '#4caf50',
          warning: '#fbc02d',
          danger: '#ff5f57',
        },
        'greenish': {
          darkest: '#121d16',
          dark: '#1b5e20',
          medium: '#2e7d32',
          bright: '#4caf50',
          lime: '#cddc39',
          bg: '#f0f2f5',
        },
      },
      fontFamily: {
        'sora': 'var(--font-sora)',
        'jetbrains': 'var(--font-jetbrains)',
      },
      boxShadow: {
        'button-red': '0 10px 20px -5px rgba(255, 95, 87, 0.4), 0 4px 6px -2px rgba(255, 95, 87, 0.2)',
        'button-black': '0 10px 20px -5px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'glass-glow': '0 0 15px rgba(76, 175, 80, 0.4), inset 0 0 10px rgba(76, 175, 80, 0.2)',
        'glass-inset': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 5px rgba(0, 240, 255, 0.3)' },
          '50%': { 'box-shadow': '0 0 20px rgba(0, 240, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      backgroundImage: {
        'liquid-red': 'linear-gradient(135deg, #ff5f57 0%, #ff241a 100%)',
        'liquid-black': 'linear-gradient(135deg, #2a2a2a 0%, #000000 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
    },
  },
  plugins: [animate],
};

export default config;
