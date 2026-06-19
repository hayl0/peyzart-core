'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, MessageCircle, Send } from 'lucide-react';
import ShimmerSkeleton from '../_components/ShimmerSkeleton';
import EmptyState from '../_components/EmptyState';
import ErrorBanner from '../_components/ErrorBanner';
import Pagination from '../_components/Pagination';
import { api } from '@/lib/api-client';

interface Review {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  reply: string | null;
  repliedAt: string | null;
}

interface ReviewData {
  averageRating: number;
  totalReviews: number;
  distribution: Record<string, number>;
  reviews: Review[];
  pagination: { page: number; totalPages: number; total: number };
}

const SORT_OPTIONS = ['En Yeni', 'En Yüksek Puan', 'En Düşük Puan'];

const SORT_MAP: Record<string, string> = {
  'En Yeni': 'newest',
  'En Yüksek Puan': 'highest',
  'En Düşük Puan': 'lowest',
};

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
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [distribution, setDistribution] = useState<{ stars: number; count: number }[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = useCallback(async () => {
    setStatus('loading');
    try {
      const sortParam = SORT_MAP[sort];
      const data = await api.get<ReviewData>(`/api/landscaper/reviews?sort=${sortParam}&page=${page}&limit=20`);
      setAverageRating(data.averageRating);
      setTotalReviews(data.totalReviews);

      const distArray: { stars: number; count: number }[] = [];
      for (let i = 5; i >= 1; i--) {
        distArray.push({ stars: i, count: data.distribution[String(i)] || 0 });
      }
      setDistribution(distArray);

      setReviews(data.reviews);
      setTotalPages(data.pagination.totalPages);

      setStatus(data.reviews.length === 0 ? 'empty' : 'success');
    } catch {
      setStatus('error');
    }
  }, [sort, page]);

  useEffect(() => {
    queueMicrotask(() => fetchReviews());
  }, [fetchReviews]);

  const handleReply = async (reviewId: string) => {
    if (!replyText.trim()) return;
    try {
      await api.post(`/api/landscaper/reviews/${reviewId}/reply`, { message: replyText });
      setReplyId(null);
      setReplyText('');
      fetchReviews();
    } catch {
      //
    }
  };

  const maxCount = distribution.length > 0 ? Math.max(...distribution.map(d => d.count)) : 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white">Yorumlar</h1>
      </div>

      {status === 'loading' && (
        <ShimmerSkeleton variant="card" count={3} />
      )}

      {status === 'error' && (
        <ErrorBanner message="Yorumlar yüklenirken bir hata oluştu" onRetry={fetchReviews} />
      )}

      {status === 'empty' && (
        <EmptyState message="Henüz yorum bulunmuyor" />
      )}

      {status === 'success' && (
        <>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center justify-center min-w-[120px]">
                <span className="text-4xl font-extrabold text-white">{averageRating}</span>
                <StarRating rating={5} size={16} />
                <span className="text-[11px] text-white/40 mt-1">{totalReviews} yorum</span>
              </div>
              <div className="flex-1 space-y-1.5">
                {distribution.map(d => (
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

          <div className="flex gap-2 overflow-x-auto pb-2">
            {SORT_OPTIONS.map(s => (
              <button key={s} onClick={() => { setSort(s); setPage(1); }}
                className={`px-4 py-2.5 rounded-[50px] text-xs font-semibold whitespace-nowrap border transition-all ${
                  sort === s
                    ? 'bg-bright-green text-white border-bright-green'
                    : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20'
                }`}>
                {s}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {reviews.map((review, i) => (
              <div key={review.id} className="bg-white/5 border border-white/10 rounded-[16px] p-4 md:p-5">
                <div className="flex gap-3">
                  <AvatarCircle name={review.customer} index={i} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-white text-sm">{review.customer}</h3>
                      <span className="text-[10px] text-white/30">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} size={12} />
                    <p className="text-xs text-white/60 mt-2 leading-relaxed">{review.comment}</p>
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
                        <button onClick={() => handleReply(review.id)}
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

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
