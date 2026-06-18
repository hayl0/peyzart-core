'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryTiles from '@/components/home/CategoryTiles';
import FeaturedSection from '@/components/home/FeaturedSection';
import NearbySection from '@/components/home/NearbySection';
import StatsSection from '@/components/home/StatsSection';

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
    const data: Landscaper[] = [
      { id: '1', name: 'Bahçe Sanatı', service: 'Çim Bakımı', price: 350, rating: 4.2, reviewCount: 124, distance: 2.3, gradient: 'linear-gradient(135deg, #4CAF50, #2E7D32)', lat: 41.0082, lng: 28.9784 },
      { id: '2', name: 'Yeşil Dünya', service: 'Peyzaj Tasarım', price: 750, rating: 5.0, reviewCount: 89, distance: 5.1, gradient: 'linear-gradient(135deg, #CDDC39, #FBC02D)', lat: 41.0550, lng: 29.0050 },
      { id: '3', name: 'Doğa Bahçe', service: 'Budama & Bakım', price: 250, rating: 4.5, reviewCount: 56, distance: 1.8, gradient: 'linear-gradient(135deg, #66BB6A, #43A047)', lat: 40.9900, lng: 28.9500 },
      { id: '4', name: 'Zeytin Peyzaj', service: 'Sulama Sistemi', price: 1200, rating: 4.8, reviewCount: 210, distance: 3.5, gradient: 'linear-gradient(135deg, #26A69A, #00897B)', lat: 41.0300, lng: 29.0200 },
    ];
    setLandscapers(data);
    setState('success');
  };

  useEffect(() => {
    loadData();
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
