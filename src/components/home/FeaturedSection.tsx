'use client';

import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

const FEATURED = [
  {
    id: 'f1',
    name: 'Yeşil Dünya Peyzaj',
    service: 'Peyzaj Tasarım',
    price: 750,
    rating: 5.0,
    reviewCount: 89,
    distance: 5.1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=250&fit=crop',
  },
  {
    id: 'f2',
    name: 'Doğa Bahçe Sanatı',
    service: 'Bahçe Düzenleme',
    price: 950,
    rating: 4.9,
    reviewCount: 156,
    distance: 2.8,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=250&fit=crop',
  },
  {
    id: 'f3',
    name: 'Zeytin Peyzaj',
    service: 'Sulama Sistemi',
    price: 1200,
    rating: 4.8,
    reviewCount: 210,
    distance: 3.5,
    image: 'https://images.unsplash.com/photo-1621274790574-5f0d4c7fdfbf?w=400&h=250&fit=crop',
  },
  {
    id: 'f4',
    name: 'Bahçe Sanatı',
    service: 'Çim Bakımı',
    price: 350,
    rating: 4.2,
    reviewCount: 124,
    distance: 2.3,
    image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=400&h=250&fit=crop',
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-6 md:py-8 bg-[var(--theme-bg)]">
      <AnimateOnScroll delay={200}>
        <div className="px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-bold text-[var(--theme-text)]">
              Öne Çıkan Peyzajcılar
            </h2>
            <button className="text-xs font-semibold text-bright-green">
              Tümünü Gör →
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-4">
            {FEATURED.map((item) => (
              <Link
                key={item.id}
                href={`/service/${item.id}`}
                className="min-w-[260px] md:min-w-0 snap-start"
              >
                <div className="bg-[var(--theme-card)] rounded-[20px] border border-[var(--theme-border)] overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                  <div className="relative h-[130px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-lime text-[11px] font-bold text-dark-forest px-2.5 py-0.5 rounded-full shadow-md">
                      Öne Çıkan
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-[15px] text-[var(--theme-text)] leading-tight mb-0.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[var(--theme-text-secondary)] mb-1.5">
                      {item.service}
                    </p>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={
                            star <= Math.floor(item.rating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                      <span className="text-xs font-semibold text-[var(--theme-text)] ml-1">
                        {item.rating.toFixed(1)}
                      </span>
                      <span className="text-[11px] text-[var(--theme-text-muted)] ml-0.5">
                        ({item.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[18px] text-[var(--theme-text)]">
                        ₺{item.price}
                      </span>
                      <span className="text-xs text-[var(--theme-text-secondary)] flex items-center gap-1">
                        <MapPin size={10} />
                        {item.distance.toFixed(1)} km
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
