'use client';

import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

const CATEGORIES = [
  { label: 'Çim Bakımı', emoji: '🌿', slug: 'cim-bakimi' },
  { label: 'Peyzaj Tasarımı', emoji: '🎨', slug: 'peyzaj-tasarim' },
  { label: 'Sulama', emoji: '💧', slug: 'sulama' },
  { label: 'Ağaç Budama', emoji: '🌳', slug: 'agac-budama' },
  { label: 'Çit & Duvar', emoji: '🪴', slug: 'cit-duvar' },
  { label: 'Bahçe Temizliği', emoji: '🧹', slug: 'bahce-temizlik' },
  { label: 'İlaçlama', emoji: '🧪', slug: 'ilaclama' },
  { label: 'Çiçek Dikimi', emoji: '🌸', slug: 'cicek-dikimi' },
];

export default function CategoryTiles() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-6 md:py-8 bg-[var(--theme-bg)]">
      <AnimateOnScroll delay={100}>
        <div className="px-4 max-w-5xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-4">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActive(isActive ? null : cat.slug)}
                  className={`flex flex-col items-center gap-2 min-w-[88px] snap-center transition-all duration-200 ${
                    isActive ? 'scale-105' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center text-2xl md:text-3xl transition-all duration-200 border-2 ${
                      isActive
                        ? 'bg-bright-green/10 border-bright-green shadow-md'
                        : 'bg-[var(--theme-card)] border-[var(--theme-border)] hover:shadow-md'
                    }`}
                  >
                    {cat.emoji}
                  </div>
                  <span className="text-[11px] md:text-xs font-semibold text-[var(--theme-text)] text-center leading-tight">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
