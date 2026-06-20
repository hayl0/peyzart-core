'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import AnimateOnScroll from './AnimateOnScroll';

const FEATURED = [
  { id: 'f1', name: 'Yeşil Dünya Peyzaj', service: 'Peyzaj Tasarım', price: 750, rating: 5.0, reviewCount: 89, distance: 5.1,
    image: '/images/categories/bahce-peyzaj.jpg' },
  { id: 'f2', name: 'Doğa Bahçe Sanatı', service: 'Bahçe Düzenleme', price: 950, rating: 4.9, reviewCount: 156, distance: 2.8,
    image: '/images/services/cardak-pergola.jpg' },
  { id: 'f3', name: 'Zeytin Peyzaj', service: 'Sulama Sistemi', price: 1200, rating: 4.8, reviewCount: 210, distance: 3.5,
    image: '/images/services/sulama-sistemi.jpg' },
  { id: 'f4', name: 'Bahçe Sanatı', service: 'Çim Bakımı', price: 350, rating: 4.2, reviewCount: 124, distance: 2.3,
    image: '/images/services/yapay-cim.jpg' },
];

export default function FeaturedSection() {
  return (
    <section className="py-8 md:py-10 bg-[var(--theme-bg)]">
      <AnimateOnScroll delay={200}>
        <div className="px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-bright-green rounded-full" />
              <h2 className="text-sm font-bold text-[var(--theme-text)]">Öne Çıkan Peyzajcılar</h2>
            </div>
            <Link href="/kesfet" className="flex items-center gap-1 text-xs font-semibold text-bright-green hover:underline">
              Tümünü Gör <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-4">
            {FEATURED.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <Link href={`/service/${item.id}`} className="min-w-[260px] md:min-w-0 snap-start block group">
                  <div className="bg-white rounded-[20px] border border-[var(--theme-border)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-[140px] overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-2 left-2 bg-lime text-[11px] font-bold text-dark-forest px-2.5 py-0.5 rounded-full shadow-md">
                        Öne Çıkan
                      </div>
                      <div className="absolute bottom-2 left-3 text-white">
                        <p className="text-xs font-bold">{item.name}</p>
                      </div>
                    </div>
                    <div className="p-3.5">
                      <p className="text-xs text-[var(--theme-text-secondary)] mb-2">{item.service}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} size={11}
                            className={star <= Math.floor(item.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'} />
                        ))}
                        <span className="text-xs font-semibold text-[var(--theme-text)] ml-1">{(item.rating ?? 0).toFixed(1)}</span>
                        <span className="text-[11px] text-[var(--theme-text-muted)] ml-0.5">({item.reviewCount})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-lg text-[var(--theme-text)]">₺{item.price}</span>
                        <span className="text-xs text-[var(--theme-text-secondary)] flex items-center gap-1">
                          <MapPin size={10} /> {(item.distance ?? 0).toFixed(1)} km
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
