import classNames from 'classnames';
import React from 'react';

interface LiquidButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const LiquidButton: React.FC<LiquidButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  const buttonClass = classNames(
    'relative inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300 rounded-full shadow-lg',
    {
      'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500':
        variant === 'primary',
      'bg-gray-800 hover:bg-gray-700': variant === 'secondary',
    }
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default LiquidButton;
