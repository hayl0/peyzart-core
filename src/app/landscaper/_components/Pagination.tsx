'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button onClick={() => onChange(page - 1)} disabled={page === 1}
        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-30 hover:bg-white/10 transition-all">
        <ChevronLeft size={14} className="text-white/60" />
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button key={i} onClick={() => onChange(i + 1)}
          className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
            page === i + 1 ? 'bg-bright-green text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
          }`}>
          {i + 1}
        </button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}
        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-30 hover:bg-white/10 transition-all">
        <ChevronRight size={14} className="text-white/60" />
      </button>
    </div>
  );
}
