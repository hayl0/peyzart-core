"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidButtonRed, LiquidButtonBlack } from '@/components/greenish/LiquidUI';

const mockOrder = {
  id: 1,
  landscaper: {
    name: 'Ali Çimen',
    rating: 4.8,
    phone: '+90 555 123 4567',
    avatar: '👨‍🌾',
  },
  service: 'Çim Biçme',
  status: 'in-progress',
  statusSteps: [
    { step: 'Kabul Edildi', completed: true, time: '10:30' },
    { step: 'Yolda', completed: true, time: '14:15' },
    { step: 'Hizmet Veriliyor', completed: true, time: 'Şu an' },
    { step: 'Tamamlandı', completed: false, time: '-' },
  ],
  address: 'Gümüşsuyu Mah. Çevre Yolu No:45, İstanbul',
  date: '2024-04-18',
  time: '14:00',
  price: 450,
  notes: 'Arka bahçeye dikkat et, tehlikeli kablolar var.',
};

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'landscaper', text: 'Merhaba! Adresinize gitmek üzere yolda', time: '14:20' },
    { id: 2, sender: 'customer', text: 'Tahmini ne zaman geleceksiniz?', time: '14:25' },
    { id: 3, sender: 'landscaper', text: '15-20 dakika içinde orada olacağım', time: '14:26' },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <Link href="/orders" className="text-white/60 hover:text-white transition-colors">
          ← Siparişler
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Landscaper Card */}
          <div className="liquid-glass-card p-6 flex items-center gap-6">
            <div className="text-5xl">{mockOrder.landscaper.avatar}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">{mockOrder.landscaper.name}</h2>
              <p className="text-yellow-400 mb-3">⭐ {mockOrder.landscaper.rating}</p>
              <p className="text-white/60 text-sm">📞 {mockOrder.landscaper.phone}</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="hero-gradient rounded-3xl p-12 min-h-64 flex items-center justify-center border border-cyan-400/20">
            <div className="text-center space-y-4">
              <div className="text-6xl">🗺️</div>
              <h3 className="text-white text-xl font-semibold">Canlı Harita Takibi</h3>
              <p className="text-white/60">Google Maps API ile gerçek konumu takip edebilirsiniz</p>
            </div>
          </div>

          {/* Status Steps */}
          <div className="liquid-glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold text-lg mb-6">Sipariş Durumu</h3>
            
            {mockOrder.statusSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 pb-4"
              >
                <motion.div
                  animate={{
                    scale: item.completed ? 1.2 : 1,
                    backgroundColor: item.completed ? '#00f0ff' : 'rgba(255,255,255,0.1)',
                  }}
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    item.completed ? 'text-gray-900' : 'text-white/60'
                  }`}
                >
                  {item.completed ? '✓' : idx + 1}
                </motion.div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${item.completed ? 'text-white' : 'text-white/60'}`}>
                    {item.step}
                  </h4>
                  <p className="text-white/40 text-sm">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Details */}
          <div className="liquid-glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Sipariş Detayları</h3>
            
            <div className="space-y-3 pb-4 border-b border-white/10">
              <div className="flex justify-between">
                <span className="text-white/60">Hizmet</span>
                <span className="text-white font-semibold">{mockOrder.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Tarih & Saat</span>
                <span className="text-white font-semibold">
                  {new Date(mockOrder.date).toLocaleDateString('tr-TR')} {mockOrder.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Adres</span>
                <span className="text-white font-semibold text-right">{mockOrder.address}</span>
              </div>
            </div>

            {mockOrder.notes && (
              <div>
                <p className="text-white/60 text-sm mb-2">Özel Not</p>
                <p className="text-white/80 italic">"{mockOrder.notes}"</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-4"
        >
          {/* Chat Box */}
          <div className="liquid-glass-card p-6 flex flex-col h-96">
            <h3 className="text-white font-semibold mb-4">Mesajlaşma</h3>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'customer'
                        ? 'bg-cyan-500/30 border border-cyan-400 text-white'
                        : 'bg-white/10 border border-white/20 text-white/80'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-white/40 mt-1">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mesaj gönder..."
                className="liquid-glass-input flex-1 px-3 py-2 text-white placeholder-white/30 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-cyan-500/30 border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-500/40 transition-all"
              >
                📤
              </motion.button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="liquid-glass-card p-6 space-y-3">
            <h3 className="text-white font-semibold mb-3">Ödeme Özeti</h3>
            <div className="flex justify-between pb-3 border-b border-white/10">
              <span className="text-white/60">Hizmet Ücreti</span>
              <span className="text-white">₺{mockOrder.price}</span>
            </div>
            <div className="flex justify-between font-bold text-white">
              <span>Toplam Tutar</span>
              <span className="text-cyan-400 text-lg">₺{mockOrder.price}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <LiquidButtonRed label="Destek Al" className="w-full !py-3" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <LiquidButtonBlack label="İptal Et" className="w-full !py-3" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
