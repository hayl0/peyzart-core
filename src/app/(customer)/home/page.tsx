"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidButtonRed } from '@/components/greenish/LiquidUI';

const mockServices = [
  {
    id: 1,
    name: 'Ali Çimen',
    service: 'Çim Biçme',
    price: 350,
    rating: 4.8,
    reviews: 156,
    distance: 2.3,
    image: '👨‍🌾',
    description: 'Profesyonel çim biçme ve bahçe bakımı'
  },
  {
    id: 2,
    name: 'Ayşe Bahçıvan',
    service: 'Bitki Dikimi',
    price: 450,
    rating: 4.9,
    reviews: 203,
    distance: 1.5,
    image: '👩‍🌾',
    description: 'Ağaç, çiçek ve peyzaj düzenlemesi'
  },
  {
    id: 3,
    name: 'Mehmet Gül',
    service: 'Sulama Sistemi',
    price: 1200,
    rating: 4.7,
    reviews: 89,
    distance: 3.2,
    image: '💧',
    description: 'Otomatik sulama sistemi kurulumu'
  },
  {
    id: 4,
    name: 'Fatma Yapı',
    service: 'Dekoratif Taş',
    price: 600,
    rating: 4.6,
    reviews: 72,
    distance: 4.1,
    image: '🪨',
    description: 'Dekoratif taş ve peyzaj tasarımı'
  },
];

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
    const matchesService = !selectedService || service.service === selectedService;
    return matchesSearch && matchesPrice && matchesService;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-8 pb-20">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-gradient rounded-3xl p-12 text-center space-y-4"
      >
        <h1 className="text-5xl font-black text-white">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Peyzajcı Bul
          </span>
        </h1>
        <p className="text-white/80 text-lg">Profesyonel peyzaj hizmetleri için doğru kişiyi bulun</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="liquid-glass-card p-6 space-y-6 sticky top-24">
            {/* Search */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Ara</label>
              <input
                type="text"
                placeholder="Hizmet veya isim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="liquid-glass-input w-full px-4 py-2 text-white placeholder-white/30"
              />
            </div>

            {/* Service Filter */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3">Hizmet Tipi</label>
              <div className="space-y-2">
                {['Çim Biçme', 'Bitki Dikimi', 'Sulama Sistemi', 'Dekoratif Taş'].map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(selectedService === service ? null : service)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      selectedService === service
                        ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                        : 'bg-white/5 border border-white/10 text-white/80 hover:border-white/20'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3">
                Fiyat Aralığı: ₺{priceRange[0]} - ₺{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3">Puan</label>
              <select className="liquid-glass-input w-full px-3 py-2 text-white">
                <option>Tüm Puanlar</option>
                <option>4.5+ ⭐</option>
                <option>4.7+ ⭐</option>
                <option>4.9+ ⭐</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Map & Services */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Map Placeholder */}
          <div className="hero-gradient rounded-3xl p-8 min-h-96 flex items-center justify-center border border-cyan-400/20">
            <div className="text-center space-y-4">
              <div className="text-6xl">🗺️</div>
              <h3 className="text-white text-xl font-semibold">Harita Görünümü</h3>
              <p className="text-white/60">Google Maps API entegrasyonu yapılabilir</p>
            </div>
          </div>

          {/* Services List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {filteredServices.length} Peyzajcı Bulundu
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="liquid-glass-card p-6 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{service.image}</div>
                        <div>
                          <h3 className="text-white font-semibold">{service.name}</h3>
                          <p className="text-white/60 text-sm">{service.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-cyan-400 font-bold">₺{service.price}</div>
                        <div className="text-white/60 text-xs">başlangıç</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-yellow-400">⭐ {service.rating}</span>
                      <span className="text-white/60">({service.reviews} yorum)</span>
                      <span className="text-white/60 ml-auto">📍 {service.distance} km</span>
                    </div>

                    <p className="text-white/80 text-sm">{service.description}</p>

                    {/* CTA Button */}
                    <Link href={`/service/${service.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                      >
                        Detaylı Gör
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
