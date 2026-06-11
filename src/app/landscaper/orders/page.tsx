"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidButtonRed, LiquidButtonBlack } from '@/components/greenish/LiquidUI';

const mockOrders = [
  {
    id: 1,
    customer: 'Ahmet Yılmaz',
    service: 'Çim Biçme',
    phone: '+90 555 123 4567',
    address: 'Gümüşsuyu Mah. ...',
    date: '2024-04-18',
    time: '14:00',
    price: 350,
    status: 'pending',
    notes: 'Arka bahçeye dikkat et',
  },
  {
    id: 2,
    customer: 'Zeynep Kaya',
    service: 'Bitki Dikimi',
    phone: '+90 555 456 7890',
    address: 'Ataköy Mah. ...',
    date: '2024-04-18',
    time: '16:30',
    price: 450,
    status: 'accepted',
    notes: '',
  },
  {
    id: 3,
    customer: 'Can Demir',
    service: 'Sulama Sistemi',
    phone: '+90 555 789 0123',
    address: 'Tarabya Mah. ...',
    date: '2024-04-19',
    time: '10:00',
    price: 1200,
    status: 'in-progress',
    notes: 'Sistem planı eklenmiş',
  },
  {
    id: 4,
    customer: 'Mehmet Şahin',
    service: 'Çim Biçme',
    phone: '+90 555 234 5678',
    address: 'Taksim Mah. ...',
    date: '2024-04-17',
    time: '09:00',
    price: 350,
    status: 'completed',
    notes: '',
  },
];

const statusColors = {
  pending: { bg: 'bg-yellow-500/20', border: 'border-yellow-400', text: 'text-yellow-400', label: 'Bekliyor' },
  accepted: { bg: 'bg-blue-500/20', border: 'border-blue-400', text: 'text-blue-400', label: 'Kabul Edildi' },
  'in-progress': { bg: 'bg-cyan-500/20', border: 'border-cyan-400', text: 'text-cyan-400', label: 'Yapılıyor' },
  completed: { bg: 'bg-green-500/20', border: 'border-green-400', text: 'text-green-400', label: 'Tamamlandı' },
};

export default function LandscaperOrders() {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredOrders = mockOrders.filter((order) => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

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
            Siparişlerim
          </span>
        </h1>
        <p className="text-white/60">Gelen hizmet taleplerini yönetin</p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-8 pb-4 border-b border-white/10 overflow-x-auto">
        {[
          { key: 'all', label: 'Tümü' },
          { key: 'pending', label: 'Beklemede' },
          { key: 'accepted', label: 'Kabul Edildi' },
          { key: 'in-progress', label: 'Yapılıyor' },
          { key: 'completed', label: 'Tamamlandı' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 whitespace-nowrap font-semibold transition-all border-b-2 ${
              filter === tab.key
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, idx) => {
          const colors = statusColors[order.status as keyof typeof statusColors];
          const isSelected = selectedOrder === order.id;

          return (
            <motion.button
              key={order.id}
              onClick={() => setSelectedOrder(isSelected ? null : order.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="w-full text-left"
            >
              <div
                className={`liquid-glass-card p-6 transition-all ${
                  isSelected ? 'ring-2 ring-cyan-400' : 'hover:shadow-lg hover:shadow-cyan-500/30'
                }`}
              >
                {/* Header Row */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4">
                  {/* Customer */}
                  <div className="md:col-span-2">
                    <h3 className="text-white font-semibold mb-1">{order.customer}</h3>
                    <p className="text-white/60 text-sm">{order.service}</p>
                  </div>

                  {/* Date & Time */}
                  <div className="md:col-span-1">
                    <p className="text-white/60 text-sm mb-1">Tarih/Saat</p>
                    <p className="text-white text-sm font-semibold">
                      {new Date(order.date).toLocaleDateString('tr-TR')} {order.time}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-1">
                    <p className="text-white/60 text-sm mb-1">Fiyat</p>
                    <p className="text-cyan-400 font-bold">₺{order.price}</p>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-1">
                    <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${colors.bg} ${colors.border} ${colors.text}`}>
                      {colors.label}
                    </span>
                  </div>

                  {/* Action Arrow */}
                  <div className="md:col-span-1 text-right">
                    <span className="text-white/60">{isSelected ? '▼' : '▶'}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-white/10 space-y-4"
                  >
                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-white/60 text-sm mb-2">Müşteri Telefonu</p>
                        <p className="text-white font-semibold flex items-center gap-2">
                          📞 {order.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm mb-2">Tam Adres</p>
                        <p className="text-white font-semibold">{order.address}</p>
                      </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <p className="text-white/60 text-sm mb-2">Müşteri Notu</p>
                        <p className="text-white/80">"{order.notes}"</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-white/10 flex-wrap">
                      {order.status === 'pending' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-3 bg-green-500/30 border border-green-400 text-green-400 rounded-lg font-semibold hover:bg-green-500/40 transition-all"
                          >
                            ✓ Kabul Et
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:border-white/40 transition-all"
                          >
                            💬 Teklif Ver
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-3 bg-red-500/20 border border-red-400 text-red-400 rounded-lg font-semibold hover:bg-red-500/30 transition-all"
                          >
                            ✗ Reddet
                          </motion.button>
                        </>
                      )}

                      {order.status === 'accepted' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-3 bg-cyan-500/30 border border-cyan-400 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/40 transition-all"
                          >
                            📞 Müşteri Ara
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:border-white/40 transition-all"
                          >
                            💬 Mesaj Gönder
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-3 bg-blue-500/30 border border-blue-400 text-blue-300 rounded-lg font-semibold hover:bg-blue-500/40 transition-all"
                          >
                            ✓ Kabul Edin
                          </motion.button>
                        </>
                      )}

                      {order.status === 'in-progress' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-3 bg-cyan-500/30 border border-cyan-400 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/40 transition-all"
                          >
                            📍 Konum Paylaş
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-3 bg-green-500/30 border border-green-400 text-green-400 rounded-lg font-semibold hover:bg-green-500/40 transition-all"
                          >
                            ✓ Tamamla
                          </motion.button>
                        </>
                      )}

                      {order.status === 'completed' && (
                        <button
                          disabled
                          className="px-6 py-3 bg-white/10 border border-white/20 text-white/60 rounded-lg font-semibold cursor-default"
                        >
                          ✓ Hizmet Tamamlandı
                        </button>
                      )}
                    </div>

                    {/* Additional Info */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white/80">
                      <p>💡 İpucu: Müşteriye hemen ulaşmak daha iyi değerlendirme almanızı sağlar.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-white text-xl font-semibold mb-2">Sipariş bulunamadı</h3>
          <p className="text-white/60">Henüz bu kategoride sipariş yoktur</p>
        </motion.div>
      )}
    </div>
  );
}
