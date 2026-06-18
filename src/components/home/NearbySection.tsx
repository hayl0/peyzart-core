'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, DollarSign, Star, MapPin, X, Maximize2 } from 'lucide-react';
import { MapboxMap } from '@/components/map';
import PlaceCard from './PlaceCard';
import ServiceCard from './ServiceCard';
import ServiceCardSkeleton from './ServiceCardSkeleton';
import AnimateOnScroll from './AnimateOnScroll';

export interface Landscaper {
  id: string;
  name: string;
  service: string;
  price: number;
  rating: number;
  reviewCount: number;
  distance: number;
  gradient: string;
  lat: number;
  lng: number;
}

type PageState = 'loading' | 'success' | 'empty' | 'error';

const FILTERS = [
  { label: 'Tümü', icon: SlidersHorizontal },
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mapLandscapers = landscapers.map((l) => ({
    id: l.id,
    name: l.name,
    service: l.service,
    price: l.price,
    rating: l.rating,
    reviewCount: l.reviewCount,
    distance: l.distance,
    lat: l.lat,
    lng: l.lng,
  }));

  return (
    <section className="bg-[var(--theme-bg)]">
      <div className="relative mx-4 md:mx-6">
        <div className="h-[180px] md:h-[220px] rounded-[16px] overflow-hidden relative border border-[var(--theme-border)]">
          {state === 'loading' && (
            <div className="absolute inset-0 bg-[var(--theme-bg)] flex items-center justify-center z-20">
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-bright-green/30 border-t-bright-green rounded-full animate-spin" />
                <span className="text-xs text-[var(--theme-text-muted)]">Harita yükleniyor...</span>
              </div>
            </div>
          )}
          {state === 'error' && (
            <div className="absolute inset-0 bg-[var(--theme-bg)] flex items-center justify-center z-20">
              <div className="text-center">
                <p className="text-xs font-semibold text-[var(--theme-text)] mb-2">
                  Harita yüklenemedi
                </p>
                <button
                  onClick={onRetry}
                  className="text-xs font-semibold text-bright-green underline"
                >
                  Tekrar Dene
                </button>
              </div>
            </div>
          )}
          {(state === 'success' || state === 'empty') && (
            <div className="relative w-full h-full">
              <MapboxMap
                landscapers={mapLandscapers}
                onSelect={setSelectedId}
                selectedId={selectedId}
              />
              <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[var(--theme-bg)]/95 via-[var(--theme-card)]/60 to-transparent backdrop-blur-xl">
                <div className="px-3 pt-2.5 pb-2">
                  <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[12px] px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm">
                    <Search size={15} className="text-[var(--theme-text-muted)] shrink-0" />
                    <span className="text-xs text-[var(--theme-text-muted)]">Haritada ara...</span>
                  </div>
                </div>
                <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
                  {FILTERS.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      className="flex items-center gap-1.5 bg-[var(--theme-card)]/90 backdrop-blur-sm border border-[var(--theme-border)] px-3 py-1.5 rounded-[50px] text-[11px] font-semibold text-[var(--theme-text)] whitespace-nowrap shadow-sm hover:shadow transition-all"
                    >
                      <Icon size={12} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-2 left-2 z-10">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="w-8 h-8 rounded-full bg-[var(--theme-card)]/90 backdrop-blur-sm border border-[var(--theme-border)] flex items-center justify-center shadow-sm hover:shadow transition-all text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
                >
                  <Maximize2 size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimateOnScroll delay={200}>
        <div className="px-4 md:px-6 mt-3 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[17px] font-bold text-[var(--theme-text)]">
              {state === 'loading'
                ? 'Uzmanlar yükleniyor...'
                : state === 'empty'
                  ? 'Yakındaki Uzmanlar'
                  : 'Yakınındaki Uzmanlar'}
            </h2>
            {state === 'success' && (
              <button className="text-xs font-semibold text-bright-green">
                Tümünü Gör →
              </button>
            )}
          </div>

          {state === 'error' && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-[14px] p-4 mb-4">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                Hizmetler yüklenirken bir hata oluştu
              </p>
              <button
                onClick={onRetry}
                className="text-sm font-semibold text-red-600 dark:text-red-400 mt-2 underline"
              >
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
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-[200px] md:w-[240px]">
                  <ServiceCardSkeleton />
                </div>
              ))}
            </div>
          )}

          {state === 'success' && (
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {landscapers.map((l) => (
                <PlaceCard
                  key={l.id}
                  id={l.id}
                  name={l.name}
                  service={l.service}
                  price={l.price}
                  rating={l.rating}
                  distance={l.distance}
                  gradient={l.gradient}
                />
              ))}
            </div>
          )}

          {state === 'success' && (
            <div className="md:hidden grid grid-cols-2 gap-3 pb-4 mt-4 pt-4 border-t border-[var(--theme-border)]">
              <p className="col-span-2 text-[11px] font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider">
                Tüm Hizmetler
              </p>
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

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[var(--theme-bg)] animate-in fade-in duration-200">
          <div className="h-full w-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--theme-card)] border-b border-[var(--theme-border)] z-10">
              <h2 className="text-sm font-bold text-[var(--theme-text)]">Yakınındaki Uzmanlar</h2>
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-8 h-8 rounded-full bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-all"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 relative">
              <MapboxMap
                landscapers={mapLandscapers}
                onSelect={setSelectedId}
                selectedId={selectedId}
              />
              <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[var(--theme-bg)]/95 via-[var(--theme-card)]/60 to-transparent backdrop-blur-xl">
                <div className="px-3 pt-2.5 pb-2">
                  <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[12px] px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm">
                    <Search size={15} className="text-[var(--theme-text-muted)] shrink-0" />
                    <span className="text-xs text-[var(--theme-text-muted)]">Haritada ara...</span>
                  </div>
                </div>
                <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
                  {FILTERS.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      className="flex items-center gap-1.5 bg-[var(--theme-card)]/90 backdrop-blur-sm border border-[var(--theme-border)] px-3 py-1.5 rounded-[50px] text-[11px] font-semibold text-[var(--theme-text)] whitespace-nowrap shadow-sm hover:shadow transition-all"
                    >
                      <Icon size={12} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-[var(--theme-card)] border-t border-[var(--theme-border)] px-4 py-3 overflow-x-auto">
              <div className="flex gap-3 snap-x snap-mandatory">
                {landscapers.map((l) => (
                  <PlaceCard
                    key={l.id}
                    id={l.id}
                    name={l.name}
                    service={l.service}
                    price={l.price}
                    rating={l.rating}
                    distance={l.distance}
                    gradient={l.gradient}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
