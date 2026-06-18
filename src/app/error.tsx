'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-red-400 text-2xl font-bold">!</span>
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Beklenmeyen bir hata oluştu</h2>
        <p className="text-sm text-white/50 mb-6">
          {error.message || 'Sayfa yüklenirken bir sorun oluştu.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-bright-green text-dark-forest font-semibold rounded-xl text-sm hover:bg-bright-green/90 transition-all"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
}
