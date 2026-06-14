export default function ServiceCardSkeleton() {
  return (
    <div className="bg-[var(--theme-card)] rounded-[20px] border border-[var(--theme-border)] overflow-hidden animate-pulse">
      <div className="h-[76px] bg-gray-200" style={{ backgroundColor: 'var(--theme-border)' }} />
      <div className="p-3 space-y-2">
        <div className="h-4 rounded w-3/4" style={{ backgroundColor: 'var(--theme-border)' }} />
        <div className="h-3 rounded w-1/2" style={{ backgroundColor: 'var(--theme-border)' }} />
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--theme-border)' }} />
          ))}
        </div>
        <div className="flex justify-between">
          <div className="h-5 rounded w-16" style={{ backgroundColor: 'var(--theme-border)' }} />
          <div className="h-3 rounded w-12" style={{ backgroundColor: 'var(--theme-border)' }} />
        </div>
      </div>
    </div>
  );
}
