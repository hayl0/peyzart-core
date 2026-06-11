"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidButtonBlack } from '@/components/features/dashboard/LiquidUI';

const mockOrders = [
  {
    id: 1,
    landscaper: 'Ali Çimen',
    service: 'Çim Biçme',
    date: '2024-04-15',
    price: 350,
    status: 'completed',
    statusText: 'Tamamlandı',
    rating: null,
  },
  {
    id: 2,
    landscaper: 'Ayşe Bahçıvan',
    service: 'Bitki Dikimi',
    date: '2024-04-18',
    price: 450,
    status: 'in-progress',
    statusText: 'Yolda',
    rating: null,
  },
  {
    id: 3,
    landscaper: 'Mehmet Gül',
    service: 'Sulama Sistemi',
    date: '2024-04-20',
    price: 1200,
    status: 'accepted',
    statusText: 'Kabul Edildi',
    rating: null,
  },
  {
    id: 4,
    landscaper: 'Fatma Yapı',
    service: 'Dekoratif Taş',
    date: '2024-04-25',
    price: 600,
    status: 'pending',
    statusText: 'Bekliyor',
    rating: null,
  },
];

const statusColors = {
  pending: { bg: 'bg-yellow-500/20', border: 'border-yellow-400', text: 'text-yellow-400' },
  accepted: { bg: 'bg-blue-500/20', border: 'border-blue-400', text: 'text-blue-400' },
  'in-progress': { bg: 'bg-cyan-500/20', border: 'border-cyan-400', text: 'text-cyan-400' },
  completed: { bg: 'bg-green-500/20', border: 'border-green-400', text: 'text-green-400' },
};

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black text-white mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Siparişlerim
          </span>
        </h1>
        <p className="text-white/60">Tüm sipariş ve rezervasyonlarınız</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 pb-4 border-b border-white/10 overflow-x-auto">
        {['Tümü', 'Beklemede', 'Aktif', 'Tamamlandı'].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 whitespace-nowrap text-white/60 hover:text-white transition-colors border-b-2 border-transparent hover:border-cyan-400 pb-2"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {mockOrders.map((order, idx) => {
          const colors = statusColors[order.status as keyof typeof statusColors];
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="liquid-glass-card p-6 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Order Info */}
                <div className="md:col-span-2">
                  <h3 className="text-white font-semibold mb-1">{order.service}</h3>
                  <p className="text-white/60 text-sm">👨‍🌾 {order.landscaper}</p>
                  <p className="text-white/40 text-xs mt-2">📅 {new Date(order.date).toLocaleDateString('tr-TR')}</p>
                </div>

                {/* Price */}
                <div className="md:col-span-1">
                  <p className="text-white/60 text-sm mb-1">Ücret</p>
                  <p className="text-cyan-400 font-bold text-lg">₺{order.price}</p>
                </div>

                {/* Status */}
                <div className="md:col-span-1">
                  <span className={`inline-block px-3 py-1 rounded-full border text-sm font-semibold ${colors.bg} ${colors.border} ${colors.text}`}>
                    {order.statusText}
                  </span>
                </div>

                {/* Action */}
                <div className="md:col-span-1 text-right">
                  <Link href={`/order/${order.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    >
                      Detay →
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Extra Info for Completed Orders */}
              {order.status === 'completed' && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-white/60 text-sm">Hizmet tamamlandı. Puanlama yapabilirsiniz.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-yellow-500/20 border border-yellow-400 text-yellow-400 rounded-lg font-semibold text-sm hover:bg-yellow-500/30 transition-all"
                    >
                      ⭐ Puanla
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {mockOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-white text-xl font-semibold mb-2">Sipariş bulunamadı</h3>
          <p className="text-white/60 mb-6">Henüz hiç sipariş vermemiş olabilirsiniz</p>
          <Link href="/home">
            <LiquidButtonBlack label="Peyzajcı Ara" className="w-full max-w-xs" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
