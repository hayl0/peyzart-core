'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Star, MapPin, Compass, Sparkles } from 'lucide-react';
import { api } from '@/lib/api-client';

interface ServiceItem {
  id: string;
  name: string;
  service: string;
  price: number;
  rating: number;
  distance: number;
  featured: boolean;
}

export default function MarketplacePage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('Tümü');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['Tümü']);

  useEffect(() => {
    api.get<{ services: ServiceItem[]; categories?: string[] }>('/api/services?limit=50').then(r => {
      setServices(r.services);
      if (r.categories) setCategories(['Tümü', ...r.categories]);
    });
  }, []);

  useEffect(() => {
    if (!query && cat === 'Tümü') return;
    const params = new URLSearchParams({ limit: '50' });
    if (query) params.set('search', query);
    if (cat !== 'Tümü') params.set('category', cat);
    api.get<{ services: ServiceItem[] }>(`/api/services?${params}`).then(r => {
      setServices(r.services);
    });
  }, [query, cat]);

  const filtered = services;

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A2E1A] to-[#1B5E20] px-4 md:px-6 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Compass size={18} className="text-lime" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-lime">Peyzart Pazar Yeri</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Bahçeni <span className="text-lime">Keşfet</span></h1>
          <p className="text-white/60 text-sm md:text-base max-w-xl mb-6">En iyi peyzaj uzmanlarını bul, fiyatları karşılaştır, hemen rezervasyon yap.</p>
          <div className="relative max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Hizmet veya peyzajcı ara..."
              className="w-full h-12 pl-10 pr-4 rounded-[14px] bg-white/10 border border-white/20 text-white text-sm outline-none focus:bg-white/15 focus:border-lime/40 transition-all placeholder:text-white/40" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-4 relative z-10 pb-24">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2.5 rounded-[50px] text-xs font-semibold whitespace-nowrap border transition-all ${
                cat === c
                  ? 'bg-bright-green text-white border-bright-green'
                  : 'bg-[var(--theme-card)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-bright-green/40'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        {filtered.filter(s => s.featured).length > 0 && !query && cat === 'Tümü' && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-bright-green" />
              <h2 className="text-sm font-bold text-[var(--theme-text)]">Öne Çıkanlar</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {services.filter(s => s.featured).map(s => (
                <Link key={s.id} href={`/service/${s.id}`}
                  className="nature-card p-4 min-w-[240px] block hover:shadow-md transition-all flex-shrink-0">
                  <div className="h-24 rounded-[14px] bg-gradient-to-br from-bright-green/30 to-lime/30 mb-3 flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl opacity-30">{s.name.charAt(0)}</span>
                    <span className="absolute top-2 right-2 bg-lime text-dark-forest text-[9px] font-bold px-2 py-0.5 rounded-full">Öne Çıkan</span>
                  </div>
                  <h3 className="font-bold text-sm text-[var(--theme-text)]">{s.name}</h3>
                  <p className="text-xs text-[var(--theme-text-secondary)] mb-2">{s.service}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-lg text-[var(--theme-text)]">₺{s.price}</span>
                    <span className="flex items-center gap-0.5 text-xs text-yellow-500"><Star size={12} className="fill-yellow-500" />{s.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Compass size={40} className="mx-auto mb-3 text-[var(--theme-text-muted)]" />
            <p className="text-sm text-[var(--theme-text-secondary)]">Bu kriterlere uygun hizmet bulunamadı</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[var(--theme-text)]">{query || cat !== 'Tümü' ? 'Sonuçlar' : 'Tüm Hizmetler'}</h2>
              <span className="text-xs text-[var(--theme-text-muted)]">{filtered.length} hizmet</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(s => (
                <Link key={s.id} href={`/service/${s.id}`}
                  className="nature-card p-4 block hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="h-28 rounded-[16px] bg-gradient-to-br from-bright-green/20 to-lime/20 mb-3 flex items-center justify-center">
                    <span className="text-3xl opacity-40">{s.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[var(--theme-text)] mb-0.5">{s.name}</h3>
                  <p className="text-xs text-[var(--theme-text-secondary)] mb-2">{s.service}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-lg text-[var(--theme-text)]">₺{s.price}</span>
                    <div className="flex items-center gap-2 text-xs text-[var(--theme-text-muted)]">
                      <span className="flex items-center gap-0.5"><Star size={12} className="text-yellow-500 fill-yellow-500" />{s.rating}</span>
                      <span className="flex items-center gap-0.5"><MapPin size={11} />{s.distance} km</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
