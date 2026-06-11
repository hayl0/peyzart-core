"use client";

import { motion } from "framer-motion";

interface IconCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}

export function IconCard({ icon, label, value, subValue }: IconCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="icon-card p-5 flex flex-col gap-3 min-w-[160px]"
    >
      <div className="w-12 h-12 rounded-2xl bg-green-600/20 flex items-center justify-center text-green-700">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subValue && <p className="text-sm text-green-600 font-medium">{subValue}</p>}
      </div>
    </motion.div>
  );
}
