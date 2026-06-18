'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-[14px] border backdrop-blur-md transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    } ${
      type === 'success'
        ? 'bg-bright-green/10 border-bright-green/20 text-bright-green'
        : 'bg-red-500/10 border-red-500/20 text-red-400'
    }`}>
      {type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
      <span className="text-xs font-semibold">{message}</span>
      <button onClick={onClose} className="opacity-50 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}
