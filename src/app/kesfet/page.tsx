"use client";

import { useState, useMemo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, MapPin, Star, Clock, Filter, ChevronRight, X, Sprout } from 'lucide-react';
import { gsap } from 'gsap';

// Mock Data (Real data will come from Firestore/Prisma)
const MOCK_LANDSCAPERS = [
  { id: '1', name: 'Bahçe Sanatı Peyzaj', rating: 4.8, reviews: 124, price: 350, position: { lat: 41.0082, lng: 28.9784 }, services: ['Çim Biçme', 'Budama'], image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'Yeşil Dünya Uzmanları', rating: 4.5, reviews: 89, price: 500, position: { lat: 41.0122, lng: 28.9654 }, services: ['Tasarım', 'Sulama Sistemi'], image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=400&auto=format&fit=crop' },
  { id: '3', name: 'Zeytin Bahçe Bakım', rating: 4.9, reviews: 210, price: 400, position: { lat: 41.0052, lng: 28.9884 }, services: ['Budama', 'İlaçlama'], image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=400&auto=format&fit=crop' },
];

const containerStyle = { width: '100%', height: '100%' };
const center = { lat: 41.0082, lng: 28.9784 }; // İstanbul Center

export default function DiscoverPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const [selected, setSelected] = useState<any>(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (selected) {
      setShowPanel(true);
      gsap.fromTo(".side-panel", { x: 400, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    }
  }, [selected]);

  return (
    <div className="flex h-screen bg-nature-mesh font-sans overflow-hidden">
      {/* Sidebar: Filters & List */}
      <div className="w-full md:w-[400px] bg-white/80 backdrop-blur-2xl border-r border-white/20 flex flex-col z-20">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
             <div className="bg-primary p-2 rounded-xl">
                <Sprout className="w-5 h-5 text-white" />
             </div>
             <h1 className="text-xl font-black text-primary-dark uppercase tracking-tighter">Peyzart Keşfet</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
            <input 
              placeholder="Şehir veya hizmet ara..." 
              className="w-full pl-12 pr-4 py-4 bg-primary/5 border-0 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 placeholder:text-primary/30"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['Puan', 'Fiyat', 'Mesafe', 'Hizmet Tipi'].map((f) => (
              <button key={f} className="whitespace-nowrap px-4 py-2 bg-white border border-primary/10 rounded-xl text-xs font-bold text-primary-dark/60 hover:bg-primary/5 flex items-center gap-2">
                <Filter className="w-3 h-3" />
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-10">
          <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest px-2">Yakınınızdaki Uzmanlar</p>
          {MOCK_LANDSCAPERS.map((l) => (
            <div 
              key={l.id} 
              onClick={() => setSelected(l)}
              className={`group p-4 rounded-3xl border transition-all cursor-pointer ${selected?.id === l.id ? 'bg-primary border-primary shadow-xl shadow-primary/20' : 'bg-white border-primary/5 hover:border-primary/20 shadow-sm'}`}
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-inner">
                  <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className={`font-bold text-sm ${selected?.id === l.id ? 'text-white' : 'text-primary-dark'}`}>{l.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-black ml-1">{l.rating}</span>
                    </div>
                    <span className={`text-[10px] font-bold ${selected?.id === l.id ? 'text-white/60' : 'text-primary/40'}`}>({l.reviews} Yorum)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {l.services.map(s => (
                      <span key={s} className={`text-[9px] px-2 py-0.5 rounded-full ${selected?.id === l.id ? 'bg-white/20 text-white' : 'bg-primary/5 text-primary'}`}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className={`text-right ${selected?.id === l.id ? 'text-white' : 'text-primary-dark'}`}>
                   <p className="text-xs font-black">₺{l.price}</p>
                   <p className="text-[8px] font-bold opacity-60">başlayan</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Map */}
      <div className="flex-1 relative bg-gray-100">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            options={{
              styles: mapStyles, // Modern Green Map Style
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            {MOCK_LANDSCAPERS.map((l) => (
              <Marker 
                key={l.id} 
                position={l.position} 
                onClick={() => setSelected(l)}
                icon={{
                  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                  fillColor: selected?.id === l.id ? '#1B5E20' : '#2E7D32',
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: '#FFFFFF',
                  scale: 2
                }}
              />
            ))}
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-nature-mesh">
             <div className="animate-spin text-primary"><Sprout className="w-10 h-10" /></div>
          </div>
        )}

        {/* Selected Landscaper Info Panel (Glassmorphism GSAP) */}
        {selected && showPanel && (
          <div className="side-panel absolute bottom-10 right-10 w-[350px] bg-white/40 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] z-30">
             <button onClick={() => setShowPanel(false)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/40"><X className="w-4 h-4" /></button>
             <div className="space-y-6">
                <div className="h-40 w-full rounded-3xl overflow-hidden">
                   <img src={selected.image} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                   <h2 className="text-xl font-black text-primary-dark">{selected.name}</h2>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center text-yellow-500 bg-white/50 px-3 py-1 rounded-full border border-white">
                         <Star className="w-4 h-4 fill-current" />
                         <span className="text-xs font-black ml-1">{selected.rating}</span>
                      </div>
                      <div className="flex items-center text-primary-dark/60 text-xs font-bold">
                         <Clock className="w-4 h-4 mr-1" />
                         30-45 dk mesafe
                      </div>
                   </div>
                </div>
                <div className="flex gap-3">
                   <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform">Teklif Al</button>
                   <button className="p-4 bg-white/50 border border-white rounded-2xl hover:bg-white/80"><ChevronRight className="w-5 h-5 text-primary" /></button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Minimal Modern Green Map Styles
const mapStyles = [
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] },
  { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] },
  { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#E8F5E9" }, { "lightness": 21 }] }
];
