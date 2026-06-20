'use client';

import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface ServiceCardProps {
  id: string;
  name: string;
  service: string;
  price: number;
  rating: number;
  reviewCount: number;
  distance: number;
  image?: string;
  gradient?: string;
  featured?: boolean;
}

export default function ServiceCard({
  id,
  name,
  service,
  price,
  rating,
  reviewCount,
  distance,
  image,
  gradient = 'linear-gradient(135deg, #4CAF50, #2E7D32)',
  featured = false,
}: ServiceCardProps) {
  const stars = Math.floor(rating);

  return (
    <Link href={`/service/${id}`}>
      <div
        className="bg-[var(--theme-card)] rounded-[20px] border border-[var(--theme-border)] overflow-hidden transition-all duration-200 hover:shadow-lg active:scale-[0.98] relative"
        style={{ boxShadow: 'var(--theme-shadow)' }}
      >
        {featured && (
          <div className="absolute top-2 left-2 z-10 bg-lime text-[11px] font-bold text-dark-forest px-2.5 py-0.5 rounded-full shadow-md">
            Öne Çıkan
          </div>
        )}
        <div className="h-[76px] relative">
          <ImageWithFallback
            src={image || ''}
            alt={name}
            className="w-full h-full"
            fallback={gradient}
          />
        </div>

        <div className="p-3">
          <h3 className="font-bold text-[15px] text-[var(--theme-text)] leading-tight mb-0.5">
            {name}
          </h3>

          <p className="text-xs text-[var(--theme-text-secondary)] mb-1.5">
            {service}
          </p>

          <div className="flex items-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                className={star <= stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs font-semibold text-[var(--theme-text)] ml-1">
              {(rating ?? 0).toFixed(1)}
            </span>
            <span className="text-[11px] text-[var(--theme-text-muted)] ml-0.5">
              ({reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[18px] text-[var(--theme-text)]">
              ₺{price}
            </span>
            <span className="text-xs text-[var(--theme-text-secondary)] flex items-center gap-1">
              <MapPin size={10} />
              {(distance ?? 0).toFixed(1)} km
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
