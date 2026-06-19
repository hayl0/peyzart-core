'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryTiles from '@/components/home/CategoryTiles';
import FeaturedSection from '@/components/home/FeaturedSection';
import NearbySection from '@/components/home/NearbySection';
import StatsSection from '@/components/home/StatsSection';
import { api } from '@/lib/api-client';

interface Landscaper {
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

export default function CustomerHomePage() {
  const [state, setState] = useState<PageState>('loading');
  const [landscapers, setLandscapers] = useState<Landscaper[]>([]);

  const loadData = () => {
    setState('loading');
    Promise.all([
      api.get<{ services: Landscaper[] }>('/api/services?limit=10').catch(() => ({ services: [] })),
      api.get<{ experts: number; customers: number; satisfaction: number }>('/api/stats').catch(() => ({ experts: 0, customers: 0, satisfaction: 98 })),
    ]).then(([servicesData]) => {
      const mapped = servicesData.services.map(s => ({
        id: s.id,
        name: s.name,
        service: s.name,
        price: s.price ?? 0,
        rating: s.rating ?? 0,
        reviewCount: s.reviewCount ?? 0,
        distance: s.distance ?? 0,
        lat: s.lat ?? 0,
        lng: s.lng ?? 0,
        gradient: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
      }));
      setLandscapers(mapped);
      setState(mapped.length === 0 ? 'empty' : 'success');
    }).catch(() => setState('error'));
  };

  useEffect(() => {
    queueMicrotask(() => loadData());
  }, []);

  return (
    <main className="min-h-screen bg-[var(--theme-bg)] px-4 md:px-6 pb-24">
      <HeroSection />
      <CategoryTiles />
      <FeaturedSection />
      <NearbySection
        landscapers={landscapers}
        state={state}
        onRetry={loadData}
      />
      <StatsSection />
    </main>
  );
}
