'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Palette, Droplets, Trees, Fence, Sparkles, FlaskRound, Flower2 } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

const ICONS = [Sprout, Palette, Droplets, Trees, Fence, Sparkles, FlaskRound, Flower2];

const CATEGORIES = [
  { label: 'Çim Bakımı', slug: 'cim-bakimi' },
  { label: 'Peyzaj Tasarımı', slug: 'peyzaj-tasarim' },
  { label: 'Sulama', slug: 'sulama' },
  { label: 'Ağaç Budama', slug: 'agac-budama' },
  { label: 'Çit & Duvar', slug: 'cit-duvar' },
  { label: 'Bahçe Temizliği', slug: 'bahce-temizlik' },
  { label: 'İlaçlama', slug: 'ilaclama' },
  { label: 'Çiçek Dikimi', slug: 'cicek-dikimi' },
];

export default function CategoryTiles() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-8 md:py-10 bg-[var(--theme-bg)]">
      <AnimateOnScroll delay={100}>
        <div className="px-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 bg-bright-green rounded-full" />
            <h2 className="text-sm font-bold text-[var(--theme-text)]">Kategoriler</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-5">
            {CATEGORIES.map((cat, i) => {
              const Icon = ICONS[i];
              const isActive = active === cat.slug;
              return (
                <motion.button key={cat.slug} onClick={() => setActive(isActive ? null : cat.slug)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex flex-col items-center gap-2.5 min-w-[92px] snap-center transition-all duration-200 ${
                    isActive ? 'scale-105' : 'hover:scale-105'
                  }`}>
                  <div className={`w-[76px] h-[76px] md:w-[88px] md:h-[88px] rounded-2xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-br from-bright-green to-lime text-white shadow-lg shadow-bright-green/20'
                      : 'bg-white border border-[var(--theme-border)] text-[var(--theme-text)] hover:shadow-md hover:border-bright-green/30'
                  }`}>
                    <Icon size={28} className="md:w-[32px] md:h-[32px]" />
                  </div>
                  <span className="text-[11px] md:text-xs font-semibold text-[var(--theme-text)] text-center leading-tight">
                    {cat.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
