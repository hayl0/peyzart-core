'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, MapPin, ChevronLeft, Calendar } from 'lucide-react';
import { api } from '@/lib/api-client';

interface ServiceDetail {
  id: string;
  name: string;
  service: string;
  price: number;
  description: string;
  unit: string;
  rating: number;
  reviewCount: number;
  distance: number;
  image: string;
  images: string[];
  availableDays: string[];
  lat: number;
  lng: number;
}

interface Review {
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewsResponse {
  reviews: Review[];
  averageRating: number;
  total: number;
}

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    params.then(({ id }) => {
      api.get<ServiceDetail>(`/api/services/${id}`).then(setService).catch(() => {});
      api.get<ReviewsResponse>(`/api/services/${id}/reviews`).then((data) => {
        setReviews(data.reviews);
        setReviewTotal(data.total);
      }).catch(() => {});
    });
  }, [params]);

  if (!service) return null;

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors">
            <ChevronLeft size={18} />
            Geri
          </button>
          <span className="text-xl font-extrabold text-[var(--theme-text)]">₺{service.price}</span>
        </div>

        <div className="h-48 md:h-64 rounded-[24px] overflow-hidden mb-6 bg-[var(--theme-border)]">
          <img src={service.image} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--theme-text)] mb-1">{service.name}</h1>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-3">{service.service}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 font-semibold text-[var(--theme-text)]">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              {service.rating}
              <span className="text-[var(--theme-text-muted)] font-normal">({service.reviewCount})</span>
            </span>
            <span className="flex items-center gap-1 text-[var(--theme-text-secondary)]">
              <MapPin size={14} />
              {service.distance} km
            </span>
          </div>
        </div>

        <div className="nature-card p-4 md:p-5 mb-4">
          <h3 className="font-bold text-sm text-[var(--theme-text)] mb-2">Açıklama</h3>
          <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-sm text-[var(--theme-text)] mb-3">Galeri</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {service.images.length > 0
              ? service.images.map((img, i) => (
                  <div key={i} className="w-24 h-24 md:w-28 md:h-28 rounded-[16px] overflow-hidden flex-shrink-0 bg-[var(--theme-border)]">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-24 h-24 md:w-28 md:h-28 rounded-[16px] overflow-hidden flex-shrink-0 bg-gradient-to-br from-bright-green/20 to-emerald-400/20" />
                ))}
          </div>
        </div>

        <div className="nature-card p-4 md:p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-bright-green" />
            <h3 className="font-bold text-sm text-[var(--theme-text)]">Müsait Günler</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            {service.availableDays.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all border ${
                  selectedDay === day
                    ? 'bg-bright-green text-white border-bright-green'
                    : 'bg-[var(--theme-card)] text-[var(--theme-text)] border-[var(--theme-border)] hover:border-bright-green/40'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-sm text-[var(--theme-text)] mb-3">Yorumlar ({reviewTotal})</h3>
          <div className="space-y-3">
            {reviews.map((review, i) => (
              <div key={i} className="nature-card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-bright-green/20 flex items-center justify-center text-xs font-bold text-bright-green">{review.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--theme-text)]">{review.author}</p>
                    <p className="text-[11px] text-[var(--theme-text-muted)]">{review.date}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-semibold text-[var(--theme-text)]">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-[var(--theme-card)] border-t border-[var(--theme-border)] p-4 lg:static lg:border-none lg:bg-transparent lg:p-0">
          <div className="max-w-4xl mx-auto">
            <Link href={`/booking?serviceId=${service.id}&price=${service.price}`} className="block w-full btn-primary text-center text-sm">
              Hemen Rezervasyon Yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
