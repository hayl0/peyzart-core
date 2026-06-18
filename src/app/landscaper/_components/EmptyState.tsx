'use client';
import { type LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon: Icon = Inbox, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-[20px] p-10 text-center">
      <Icon size={28} className="text-white/20 mx-auto mb-3" />
      <p className="text-white/40 text-sm mb-3">{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="px-5 py-2.5 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
