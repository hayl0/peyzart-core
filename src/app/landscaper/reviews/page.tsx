'use client';

import { useState, useEffect } from 'react';
import { Star, MessageCircle, Send } from 'lucide-react';
import ShimmerSkeleton from '../_components/ShimmerSkeleton';
import EmptyState from '../_components/EmptyState';
import ErrorBanner from '../_components/ErrorBanner';
import Pagination from '../_components/Pagination';

const SORT_OPTIONS = ['En Yeni', 'En Yüksek Puan', 'En Düşük Puan'];

const DISTRIBUTION = [
  { stars: 5, count: 18 },
  { stars: 4, count: 4 },
  { stars: 3, count: 1 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];

const REVIEWS = [
  { id: 1, name: 'Ayşe Yıldız', date: '10 Haziran 2026', rating: 5, text: 'Harika bir hizmet! Bahçem tamamen değişti. Çok profesyonel ve titiz çalıştılar. Kesinlikle tavsiye ederim.' },
  { id: 2, name: 'Mehmet Demir', date: '8 Haziran 2026', rating: 4, text: 'İşlerini iyi yapıyorlar, zamanında geldiler ve istediğimiz gibi çimleri biçtiler. Ufak bir gecikme oldu ama genel olarak memnun kaldık.' },
  { id: 3, name: 'Zeynep Kaya', date: '5 Haziran 2026', rating: 5, text: 'Bitki dikimi için anlaştık ve sonuç muhteşem oldu. Herkese gönül rahatlığıyla önerebilirim.' },
  { id: 4, name: 'Can Öztürk', date: '1 Haziran 2026', rating: 3, text: 'Ortalama bir deneyimdi. İletişim biraz zayıftı ama iş kalitesi fena değil. Geliştirilebilir.' },
];

const TOTAL_REVIEWS = 24;
const AVERAGE_RATING = 4.8;

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

const GRADIENTS = [
  'from-emerald-500 to-teal-600',
  'from-sky-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
];

function AvatarCircle({ name, index }: { name: string; index: number }) {
  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
      {getInitials(name)}
    </div>
  );
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={`${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
      ))}
    </div>
  );
}

export default function LandscaperReviewsPage() {
  const [status, setStatus] = useState<'loading' | 'error' | 'empty' | 'success'>('loading');
  const [sort, setSort] = useState('En Yeni');
  const [page, setPage] = useState(1);
  const [replyId, setReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setStatus('success'), 1000);
    return () => clearTimeout(timer);
  }, []);

  const maxCount = Math.max(...DISTRIBUTION.map(d => d.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white">Yorumlar</h1>
      </div>

      {status === 'loading' && (
        <ShimmerSkeleton variant="card" count={3} />
      )}

      {status === 'error' && (
        <ErrorBanner message="Yorumlar yüklenirken bir hata oluştu" onRetry={() => setStatus('loading')} />
      )}

      {status === 'empty' && (
        <EmptyState message="Henüz yorum bulunmuyor" />
      )}

      {status === 'success' && (
        <>
          {/* Average Rating Summary Card */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center justify-center min-w-[120px]">
                <span className="text-4xl font-extrabold text-white">{AVERAGE_RATING}</span>
                <StarRating rating={5} size={16} />
                <span className="text-[11px] text-white/40 mt-1">{TOTAL_REVIEWS} yorum</span>
              </div>
              <div className="flex-1 space-y-1.5">
                {DISTRIBUTION.map(d => (
                  <div key={d.stars} className="flex items-center gap-2">
                    <span className="text-[11px] text-white/50 w-14 shrink-0 text-right">{d.stars} yıldız</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400/80 rounded-full transition-all"
                        style={{ width: `${maxCount > 0 ? (d.count / maxCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-white/40 w-6 text-right">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sort Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {SORT_OPTIONS.map(s => (
              <button key={s} onClick={() => setSort(s)}
                className={`px-4 py-2.5 rounded-[50px] text-xs font-semibold whitespace-nowrap border transition-all ${
                  sort === s
                    ? 'bg-bright-green text-white border-bright-green'
                    : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20'
                }`}>
                {s}
              </button>
            ))}
          </div>

          {/* Review Cards */}
          <div className="space-y-3">
            {REVIEWS.map((review, i) => (
              <div key={review.id} className="bg-white/5 border border-white/10 rounded-[16px] p-4 md:p-5">
                <div className="flex gap-3">
                  <AvatarCircle name={review.name} index={i} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-white text-sm">{review.name}</h3>
                      <span className="text-[10px] text-white/30">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} size={12} />
                    <p className="text-xs text-white/60 mt-2 leading-relaxed">{review.text}</p>
                    <button onClick={() => {
                      if (replyId === review.id) {
                        setReplyId(null);
                        setReplyText('');
                      } else {
                        setReplyId(review.id);
                        setReplyText('');
                      }
                    }} className="flex items-center gap-1 mt-3 text-[11px] font-semibold text-bright-green hover:text-bright-green/80 transition-all">
                      <MessageCircle size={12} />
                      Yanıtla
                    </button>
                    {replyId === review.id && (
                      <div className="mt-3 space-y-2">
                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={3} placeholder="Yanıtınızı yazın..."
                          className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-xs text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30 resize-none" />
                        <button onClick={() => { setReplyId(null); setReplyText(''); }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-bright-green text-white rounded-[10px] text-[11px] font-bold hover:bg-bright-green/90 transition-all">
                          <Send size={12} />
                          Gönder
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination page={page} totalPages={3} onChange={setPage} />
        </>
      )}
    </div>
  );
}
