'use client';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-[14px] p-4 flex items-center justify-between">
      <p className="text-red-400 text-xs font-medium">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-xs font-semibold text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all shrink-0">
          Tekrar Dene
        </button>
      )}
    </div>
  );
}
