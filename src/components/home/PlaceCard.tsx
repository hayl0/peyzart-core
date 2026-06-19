'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface PlaceCardProps {
  id: string;
  name: string;
  service: string;
  price: number;
  rating: number;
  distance: number;
  gradient?: string;
}

export default function PlaceCard({
  id,
  name,
  service,
  price,
  rating,
  distance,
  gradient = 'linear-gradient(135deg, #4CAF50, #2E7D32)',
}: PlaceCardProps) {
  return (
    <Link
      href={`/service/${id}`}
      className="block flex-shrink-0 w-[200px] md:w-[240px] snap-start"
    >
      <div className="bg-[var(--theme-card)] rounded-[16px] border border-[var(--theme-border)] overflow-hidden transition-all duration-200 hover:shadow-lg active:scale-[0.97]"
        style={{ boxShadow: 'var(--theme-shadow)' }}
      >
        <div className="h-[80px] relative" style={{ background: gradient }}>
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-bold text-dark-forest shadow-sm">
            ★ {(rating ?? 0).toFixed(1)}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-bold text-[13px] text-[var(--theme-text)] leading-tight mb-0.5 truncate">
            {name}
          </h3>
          <p className="text-[11px] text-[var(--theme-text-secondary)] mb-2 truncate">
            {service}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[16px] text-[var(--theme-text)]">
              ₺{price}
            </span>
            <span className="text-[11px] text-[var(--theme-text-secondary)] flex items-center gap-1">
              <MapPin size={10} />
              {(distance ?? 0).toFixed(1)} km
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
