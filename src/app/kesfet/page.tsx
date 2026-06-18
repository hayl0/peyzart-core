'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Compass, Star, MapPin } from 'lucide-react';

const CATEGORIES = [
  { label: 'Çim Bakımı', icon: '🌿' },
  { label: 'Peyzaj Tasarım', icon: '🎨' },
  { label: 'Sulama', icon: '💧' },
  { label: 'Ağaç Budama', icon: '🌳' },
  { label: 'Çit & Duvar', icon: '🪴' },
  { label: 'Bahçe Temizlik', icon: '🧹' },
  { label: 'İlaçlama', icon: '🧪' },
  { label: 'Çiçek Dikimi', icon: '🌸' },
];

const PLACES = [
  { id: '1', name: 'Bahçe Sanatı', service: 'Çim Bakımı', rating: 4.2, reviews: 124, price: 350, distance: 2.3 },
  { id: '2', name: 'Yeşil Dünya', service: 'Peyzaj Tasarım', rating: 5.0, reviews: 89, price: 750, distance: 5.1 },
  { id: '3', name: 'Doğa Bahçe', service: 'Budama & Bakım', rating: 4.5, reviews: 56, price: 250, distance: 1.8 },
  { id: '4', name: 'Zeytin Peyzaj', service: 'Sulama Sistemi', rating: 4.8, reviews: 210, price: 1200, distance: 3.5 },
];

export default function KesfetPage() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('');

  const filtered = PLACES.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.service.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Compass size={22} className="text-bright-green" />
          <h1 className="text-2xl font-bold text-[var(--theme-text)]">Keşfet</h1>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Peyzajcı veya hizmet ara..."
            className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] pl-10 pr-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {CATEGORIES.map(cat => (
            <button key={cat.label} onClick={() => setActiveCat(activeCat === cat.label ? '' : cat.label)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-[50px] text-xs font-semibold whitespace-nowrap transition-all border ${
                activeCat === cat.label
                  ? 'bg-bright-green text-white border-bright-green'
                  : 'bg-[var(--theme-card)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-bright-green/40'
              }`}>
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="nature-card p-10 text-center">
              <Compass size={40} className="mx-auto mb-3 text-[var(--theme-text-muted)]" />
              <p className="text-sm text-[var(--theme-text-secondary)]">Sonuç bulunamadı</p>
            </div>
          ) : filtered.map(p => (
            <Link key={p.id} href={`/service/${p.id}`}
              className="nature-card p-4 flex items-center gap-4 block hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-bright-green to-lime flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {p.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[var(--theme-text)] truncate">{p.name}</h3>
                <p className="text-xs text-[var(--theme-text-secondary)]">{p.service}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-[var(--theme-text-muted)]">
                  <span className="flex items-center gap-0.5"><Star size={11} className="text-yellow-500 fill-yellow-500" /> {p.rating}</span>
                  <span className="flex items-center gap-0.5"><MapPin size={11} /> {p.distance} km</span>
                </div>
              </div>
              <span className="font-extrabold text-sm text-[var(--theme-text)]">₺{p.price}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
