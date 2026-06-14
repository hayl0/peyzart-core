'use client';

import { useJsApiLoader } from '@react-google-maps/api';
import { gsap } from 'gsap';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';

// Mock Data (Real data will come from Firestore/Prisma)
const MOCK_LANDSCAPERS = [
  {
    id: '1',
    name: 'Bahçe Sanatı Peyzaj',
    rating: 4.8,
    reviews: 124,
    price: 350,
    position: { lat: 41.0082, lng: 28.9784 },
    services: ['Çim Biçme', 'Budama'],
    image:
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Yeşil Dünya Uzmanları',
    rating: 4.5,
    reviews: 89,
    price: 500,
    position: { lat: 41.0122, lng: 28.9654 },
    services: ['Tasarım', 'Sulama Sistemi'],
    image:
      'https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Zeytin Bahçe Bakım',
    rating: 4.9,
    reviews: 210,
    price: 400,
    position: { lat: 41.0052, lng: 28.9884 },
    services: ['Budama', 'İlaçlama'],
    image:
      'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=400&auto=format&fit=crop',
  },
];

const containerStyle = { width: '100%', height: '100%' };
const center = { lat: 41.0082, lng: 28.9784 }; // İstanbul Center

export default function DiscoverPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [selected, setSelected] = useState<any>(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (selected) {
      setShowPanel(true);
      gsap.fromTo(
        '.side-panel',
        { x: 400, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [selected]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-200 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-green-900">Discover</h1>
      </header>

      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-6">
          Explore Landscaping Services Near You
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Find the best landscapers and services in your area.
        </p>
        <SearchBar
          placeholder="Search for landscapers or services..."
          onSearch={(query: string) => alert(`Searching for ${query}`)}
        />
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-green-700 mb-6">Top Landscapers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for landscaper cards */}
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Landscaper Name</h3>
            <p className="text-gray-600">Description of the landscaper's services.</p>
          </div>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-600">
        <p>&copy; 2026 Peyzart. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Minimal Modern Green Map Styles
const mapStyles = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ffffff' }, { lightness: 17 }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }, { lightness: 21 }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#E8F5E9' }, { lightness: 21 }],
  },
];
