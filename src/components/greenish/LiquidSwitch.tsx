"use client";

import { motion } from "framer-motion";

interface SwitchProps {
  active: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export function LiquidSwitch({ active, onChange, label }: SwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className={`liquid-switch ${active ? 'active' : ''}`}
        onClick={() => onChange(!active)}
        whileTap={{ scale: 0.95 }}
      />
      {label && (
        <span className="text-sm font-medium text-gray-600">{label}</span>
      )}
    </div>
  );
}
