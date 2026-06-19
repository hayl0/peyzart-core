'use client';

interface ShimmerSkeletonProps {
  variant?: 'card' | 'row' | 'table' | 'chart';
  count?: number;
}

export default function ShimmerSkeleton({ variant = 'card', count = 1 }: ShimmerSkeletonProps) {
  if (variant === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-[18px] p-4 animate-pulse">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-[27px] h-[27px] rounded-[9px] bg-white/5" />
              <div className="h-[9px] w-24 bg-white/5 rounded" />
            </div>
            <div className="h-[22px] w-16 bg-white/5 rounded mb-2" />
            <div className="h-[9px] w-20 bg-white/5 rounded" />
          </div>
        ))}
      </>
    );
  }
  if (variant === 'chart') {
    return (
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px] animate-pulse">
        <div className="flex justify-between mb-3">
          <div className="h-[12px] w-28 bg-white/5 rounded" />
          <div className="h-[10px] w-8 bg-white/5 rounded" />
        </div>
        <div className="flex gap-[6px] h-[48px] items-end">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-1 bg-white/5 rounded-t-[4px]" style={{ height: `${30 + (i * 17 + 5) % 71}%` }} />
          ))}
        </div>
      </div>
    );
  }
  // row variant (for orders/reviews list)
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-[16px] p-4 animate-pulse">
          <div className="flex justify-between mb-2">
            <div className="h-[14px] w-32 bg-white/5 rounded" />
            <div className="h-[14px] w-16 bg-white/5 rounded" />
          </div>
          <div className="h-[11px] w-48 bg-white/5 rounded" />
        </div>
      ))}
    </>
  );
}
