"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidButtonRed, LiquidButtonBlack } from '@/components/greenish/LiquidUI';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: 'Çim Biçme - Ali Çimen',
    address: '',
    date: '',
    time: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              className={`flex-1 flex items-center ${s < 3 ? 'after:flex-1 after:h-1 after:mx-4' : ''}`}
            >
              <motion.div
                animate={{
                  scale: step >= s ? 1.2 : 1,
                  backgroundColor: step >= s ? '#00f0ff' : 'rgba(255,255,255,0.1)',
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
              >
                {s}
              </motion.div>
              {s < 3 && (
                <div
                  className={`h-1 flex-1 mx-4 ${step > s ? 'bg-cyan-400' : 'bg-white/10'}`}
                />
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between text-white/60 text-sm">
          <span>Bilgiler</span>
          <span>Ödeme</span>
          <span>Onay</span>
        </div>
      </div>

      {/* Step 1: Address & Details */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Hizmet Bilgilerini Girin</h2>

          <div className="liquid-glass-card p-8 space-y-6">
            {/* Service Selected */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Seçilen Hizmet</label>
              <div className="px-4 py-3 bg-cyan-500/20 border border-cyan-400 text-white rounded-xl">
                {formData.service}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Hizmet Adresi</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Sokak, Bulvar, No... Gümüşsuyu Mah. ..."
                className="liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30 min-h-24 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Tarih</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="liquid-glass-input w-full px-4 py-3 text-white"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Saat</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="liquid-glass-input w-full px-4 py-3 text-white"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Telefon Numarası</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+90 5XX XXX XX XX"
                className="liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Özel Not (Opsiyonel)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Ör: Arka bahçeye dikkat et, tehlikeli kablolar var..."
                className="liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30 min-h-20 resize-none"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-8">
            <Link href="/home" className="flex-1">
              <LiquidButtonBlack label="Geri" className="w-full" />
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(2)}
              className="flex-1"
            >
              <LiquidButtonRed label="Devam Et" className="w-full" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Ödeme Bilgileri</h2>

          <div className="liquid-glass-card p-8 space-y-6">
            {/* Summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
              <div className="flex justify-between text-white/80">
                <span>Hizmet Ücreti</span>
                <span>₺350</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Hizmet Vergisi</span>
                <span>₺35</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white text-lg">
                <span>Toplam</span>
                <span className="text-cyan-400">₺385</span>
              </div>
            </div>

            {/* Discount Code */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">İndirim Kodu (Opsiyonel)</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="PEYZART20"
                  className="liquid-glass-input flex-1 px-4 py-3 text-white placeholder-white/30"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-cyan-500/30 border border-cyan-400 text-cyan-300 rounded-xl font-semibold hover:bg-cyan-500/40 transition-all"
                >
                  Uygula
                </motion.button>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3">Ödeme Yöntemi</label>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full p-4 border-2 border-cyan-400 bg-cyan-500/20 text-white rounded-xl font-semibold flex items-center gap-3"
                >
                  💳 Kredi/Debit Kartı
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full p-4 border-2 border-white/10 bg-white/5 text-white rounded-xl font-semibold flex items-center gap-3 hover:border-white/20"
                >
                  📱 Apple Pay
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full p-4 border-2 border-white/10 bg-white/5 text-white rounded-xl font-semibold flex items-center gap-3 hover:border-white/20"
                >
                  🏦 Banka Transferi
                </motion.button>
              </div>
            </div>

            {/* Card Form */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Kart Numarası</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className="liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Ay/Yıl</label>
                  <input
                    type="text"
                    placeholder="12/25"
                    className="liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(1)}
              className="flex-1"
            >
              <LiquidButtonBlack label="Geri" className="w-full" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(3)}
              className="flex-1"
            >
              <LiquidButtonRed label="Devam Et" className="w-full" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-4 py-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-4xl font-black text-white">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Rezervasyon Başarılı!
              </span>
            </h2>
            <p className="text-white/80 max-w-md mx-auto">
              Peyzajcı Ali Çimen yakında sizinle iletişime geçecektir. Rezervasyon detaylarınız e-postanıza gönderilmiştir.
            </p>
          </div>

          <div className="liquid-glass-card p-8 space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Sipariş Özeti</h3>

            <div className="space-y-3 pb-4 border-b border-white/10">
              <div className="flex justify-between text-white/80">
                <span>Sipariş No:</span>
                <span className="text-cyan-400 font-mono">#ORD-2024-001234</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Peyzajcı:</span>
                <span>Ali Çimen</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Hizmet:</span>
                <span>Çim Biçme</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Tarih:</span>
                <span>{formData.date}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-white text-lg">
              <span>Toplam Ödenen Tutar</span>
              <span className="text-cyan-400">₺385</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <Link href="/orders" className="block">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <LiquidButtonRed label="Siparişlerim" className="w-full !py-4" />
              </motion.div>
            </Link>
            <Link href="/home" className="block">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <LiquidButtonBlack label="Ana Sayfaya Dön" className="w-full !py-4" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
