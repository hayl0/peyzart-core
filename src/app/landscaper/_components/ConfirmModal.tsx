'use client';
import { X } from 'lucide-react';

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'default';
  confirmLabel?: string;
}

export default function ConfirmModal({ title, message, onConfirm, onCancel, variant = 'default', confirmLabel = 'Onayla' }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0D2E1A] border border-white/10 rounded-[20px] p-6 max-w-sm w-full mx-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <button onClick={onCancel} className="text-white/30 hover:text-white/60"><X size={16} /></button>
        </div>
        <p className="text-xs text-white/50 mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2.5 bg-white/5 text-white/60 rounded-[10px] text-xs font-semibold hover:bg-white/10 transition-all">İptal</button>
          <button onClick={onConfirm}
            className={`px-4 py-2.5 rounded-[10px] text-xs font-bold transition-all ${
              variant === 'danger' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-bright-green text-white hover:bg-bright-green/90'
            }`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
