"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidButtonRed, LiquidButtonBlack } from '@/components/greenish/LiquidUI';

const mockServices = [
  {
    id: 1,
    name: 'Çim Biçme',
    description: 'Profesyonel çim biçme ve bahçe bakımı',
    price: 350,
    status: 'active',
    image: '✂️',
    estimatedTime: '2-3 saat',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Bitki Dikimi',
    description: 'Ağaç, çiçek ve peyzaj düzenlemesi',
    price: 450,
    status: 'active',
    image: '🌱',
    estimatedTime: '3-4 saat',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Ağaç Budama',
    description: 'Büyük ağaçlar için özel budama hizmeti',
    price: 800,
    status: 'active',
    image: '🌳',
    estimatedTime: '4-5 saat',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Sulama Sistemi Kurulum',
    description: 'Otomatik sulama sistemi tasarımı ve kurulumu',
    price: 1200,
    status: 'paused',
    image: '💧',
    estimatedTime: '6-8 saat',
    rating: 4.6,
  },
];

export default function LandscaperServiceManagement() {
  const [services, setServices] = useState(mockServices);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    estimatedTime: '',
  });

  const toggleServiceStatus = (id: number) => {
    setServices(
      services.map((s) =>
        s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-black text-white mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Hizmet Yönetimi
          </span>
        </h1>
        <p className="text-white/60">Sunduğunuz hizmetleri yönetin ve özelleştirin</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Services List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`liquid-glass-card p-6 ${
                service.status === 'paused' ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{service.image}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                    <p className="text-white/60 text-sm">{service.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleServiceStatus(service.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    service.status === 'active'
                      ? 'bg-green-500/20 border border-green-400 text-green-400 hover:bg-green-500/30'
                      : 'bg-gray-500/20 border border-gray-400 text-gray-400 hover:bg-gray-500/30'
                  }`}
                >
                  {service.status === 'active' ? '✓ Aktif' : '✕ Pasif'}
                </button>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-3 gap-4 py-4 mb-4 border-y border-white/10">
                <div>
                  <p className="text-white/60 text-sm mb-1">Başlangıç Fiyatı</p>
                  <p className="text-cyan-400 font-bold text-lg">₺{service.price}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Tahmini Süre</p>
                  <p className="text-white font-semibold">{service.estimatedTime}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Puan</p>
                  <p className="text-yellow-400 font-bold">⭐ {service.rating}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setEditingId(service.id)}
                  className="flex-1 py-2 px-3 bg-cyan-500/30 border border-cyan-400 text-cyan-300 rounded-lg font-semibold text-sm hover:bg-cyan-500/40 transition-all"
                >
                  ✏️ Düzenle
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 py-2 px-3 bg-white/5 border border-white/10 text-white/80 rounded-lg font-semibold text-sm hover:border-white/20 transition-all"
                >
                  📊 İstatistikler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="py-2 px-3 bg-red-500/20 border border-red-400 text-red-400 rounded-lg font-semibold text-sm hover:bg-red-500/30 transition-all"
                >
                  🗑️
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sidebar - Add New Service */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="liquid-glass-card p-6 sticky top-24 space-y-6">
            <h3 className="text-xl font-bold text-white">Yeni Hizmet Ekle</h3>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Hizmet Adı</label>
              <input
                type="text"
                placeholder="Ör: Çim Biçme"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="liquid-glass-input w-full px-4 py-2 text-white placeholder-white/30 text-sm"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Açıklama</label>
              <textarea
                placeholder="Hizmet açıklaması..."
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="liquid-glass-input w-full px-4 py-2 text-white placeholder-white/30 text-sm min-h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Başlangıç Fiyatı (₺)</label>
              <input
                type="number"
                placeholder="350"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                className="liquid-glass-input w-full px-4 py-2 text-white placeholder-white/30 text-sm"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Tahmini Süre</label>
              <input
                type="text"
                placeholder="2-3 saat"
                value={newService.estimatedTime}
                onChange={(e) => setNewService({ ...newService, estimatedTime: e.target.value })}
                className="liquid-glass-input w-full px-4 py-2 text-white placeholder-white/30 text-sm"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Çalışma Saatleri</label>
              <select className="liquid-glass-input w-full px-4 py-2 text-white text-sm">
                <option>09:00 - 17:00</option>
                <option>08:00 - 18:00</option>
                <option>10:00 - 16:00</option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Hizmet Alanı (km)</label>
              <input
                type="number"
                placeholder="10"
                className="liquid-glass-input w-full px-4 py-2 text-white placeholder-white/30 text-sm"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <LiquidButtonRed label="Hizmet Ekle" className="w-full !py-3" />
            </motion.div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <p className="text-white/60 text-xs uppercase font-semibold">Yönetim</p>
              <button className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg transition-all text-white/80 text-sm hover:text-white">
                📅 Takvim Ayarları
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg transition-all text-white/80 text-sm hover:text-white">
                💰 Fiyatlandırma
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg transition-all text-white/80 text-sm hover:text-white">
                ⚙️ Tercihler
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
