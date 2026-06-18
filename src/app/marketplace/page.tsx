'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, MapPin, Compass, TrendingUp, Sparkles } from 'lucide-react';

const CATEGORIES = ['Tümü', 'Çim Bakımı', 'Peyzaj Tasarım', 'Sulama', 'Budama', 'Çiçek Dikimi', 'İlaçlama'];

const SERVICES = [
  { id: '1', name: 'Bahçe Sanatı', service: 'Çim Bakımı', price: 350, rating: 4.2, reviews: 124, distance: 2.3, featured: true },
  { id: '2', name: 'Yeşil Dünya', service: 'Peyzaj Tasarım', price: 750, rating: 5.0, reviews: 89, distance: 5.1, featured: true },
  { id: '3', name: 'Doğa Bahçe', service: 'Budama & Bakım', price: 250, rating: 4.5, reviews: 56, distance: 1.8, featured: false },
  { id: '4', name: 'Zeytin Peyzaj', service: 'Sulama Sistemi', price: 1200, rating: 4.8, reviews: 210, distance: 3.5, featured: true },
  { id: '5', name: 'Çiçek Dünyası', service: 'Çiçek Dikimi', price: 180, rating: 4.3, reviews: 42, distance: 4.2, featured: false },
  { id: '6', name: 'Yeşil Alan', service: 'Ağaç Budama', price: 500, rating: 4.6, reviews: 78, distance: 6.0, featured: false },
];

export default function MarketplacePage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('Tümü');

  const filtered = SERVICES.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(query.toLowerCase()) || s.service.toLowerCase().includes(query.toLowerCase());
    const matchCat = cat === 'Tümü' || s.service.includes(cat);
    return matchSearch && matchCat;
  });

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
          {CATEGORIES.map(c => (
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
              {SERVICES.filter(s => s.featured).map(s => (
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
