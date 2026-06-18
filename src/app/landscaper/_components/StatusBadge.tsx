'use client';

interface StatusBadgeProps {
  status: string;
  label: string;
}

const STYLES: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  accepted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'in-progress': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  completed: 'bg-bright-green/10 text-bright-green border-bright-green/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  active: 'bg-bright-green/10 text-bright-green border-bright-green/20',
  inactive: 'bg-white/5 text-white/30 border-white/10',
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STYLES[status] || STYLES.inactive}`}>
      {label}
    </span>
  );
}
