"use client";

import { motion } from "framer-motion";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCardBlack({ title, children }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-card-black p-6"
    >
      <h3 className="text-lg font-semibold text-white/90 mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}

export function DashboardCardWarning({ title, children }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-card-warning p-6"
    >
      <h3 className="text-lg font-semibold text-amber-900 mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}

export function DashboardCardWhite({ title, children }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-card-white p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}
