'use client';

import { Search, SlidersHorizontal, DollarSign, Star, MapPin } from 'lucide-react';
import ServiceCard from './ServiceCard';
import ServiceCardSkeleton from './ServiceCardSkeleton';
import AnimateOnScroll from './AnimateOnScroll';

interface Landscaper {
  id: string;
  name: string;
  service: string;
  price: number;
  rating: number;
  reviewCount: number;
  distance: number;
  gradient: string;
}

type PageState = 'loading' | 'success' | 'empty' | 'error';

const FILTERS = [
  { label: 'Tüm Hizmetler', icon: SlidersHorizontal },
  { label: 'Fiyat', icon: DollarSign },
  { label: 'Puan', icon: Star },
  { label: 'Mesafe', icon: MapPin },
];

interface NearbySectionProps {
  landscapers: Landscaper[];
  state: PageState;
  onRetry: () => void;
}

export default function NearbySection({ landscapers, state, onRetry }: NearbySectionProps) {
  return (
    <section className="bg-[var(--theme-bg)]">
      <div className="relative h-[30vh] min-h-[200px] bg-gradient-to-br from-[#a8d5a2] via-[#81c784] to-[#66bb6a] dark-theme-map">
        <style>{`
          [data-theme="dark"] .dark-theme-map {
            background: linear-gradient(135deg, #1a3a1a, #1a3a1a, #2a5a2a) !important;
          }
        `}</style>
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 flex items-center gap-3 shadow-lg">
            <Search size={18} className="text-[var(--theme-text-muted)]" />
            <span className="text-sm text-[var(--theme-text-muted)]">Haritada ara...</span>
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <button className="w-10 h-10 bg-[var(--theme-card)] rounded-full flex items-center justify-center shadow-lg border border-[var(--theme-border)]">
            <MapPin size={18} className="text-bright-green" />
          </button>
        </div>
      </div>

      <AnimateOnScroll delay={300}>
        <div className="px-4 -mt-3 relative z-10">
          <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
            {FILTERS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex items-center gap-2 bg-[var(--theme-card)] border border-[var(--theme-border)] px-4 py-2.5 rounded-[50px] text-xs font-semibold text-[var(--theme-text)] whitespace-nowrap shadow-sm hover:shadow transition-all"
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[17px] font-bold text-[var(--theme-text)]">
              {state === 'loading' ? 'Uzmanlar yükleniyor...' : 'Yakınındaki Uzmanlar'}
            </h2>
            {state === 'success' && (
              <button className="text-xs font-semibold text-bright-green">Tümünü Gör →</button>
            )}
          </div>

          {state === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-[14px] p-4 mb-4" data-theme-red>
              <style>{`
                [data-theme="dark"] [data-theme-red] {
                  background: rgba(239, 68, 68, 0.1) !important;
                  border-color: rgba(239, 68, 68, 0.3) !important;
                }
              `}</style>
              <p className="text-sm text-red-600 font-medium">
                Hizmetler yüklenirken bir hata oluştu
              </p>
              <button onClick={onRetry} className="text-sm font-semibold text-red-600 mt-2 underline">
                Tekrar Dene
              </button>
            </div>
          )}

          {state === 'empty' && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm font-semibold text-[var(--theme-text)] mb-1">
                Bu kriterlere uygun peyzajcı bulunamadı
              </p>
              <p className="text-xs text-[var(--theme-text-secondary)] mb-4">
                Filtreleri değiştirerek tekrar deneyin
              </p>
              <button
                onClick={onRetry}
                className="text-sm font-semibold text-bright-green underline"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          )}

          {state === 'loading' && (
            <div className="grid grid-cols-2 gap-3 pb-4">
              {[1, 2, 3, 4].map((i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
          )}

          {state === 'success' && (
            <div className="grid grid-cols-2 gap-3 pb-4">
              {landscapers.map((l) => (
                <ServiceCard
                  key={l.id}
                  id={l.id}
                  name={l.name}
                  service={l.service}
                  price={l.price}
                  rating={l.rating}
                  reviewCount={l.reviewCount}
                  distance={l.distance}
                  gradient={l.gradient}
                />
              ))}
            </div>
          )}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
