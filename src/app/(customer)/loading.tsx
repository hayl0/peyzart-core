export default function CustomerLoading() {
  return (
    <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-bright-green/30 border-t-bright-green rounded-full animate-spin" />
        <p className="text-sm text-[var(--theme-text-muted)]">Yükleniyor...</p>
      </div>
    </div>
  );
}
