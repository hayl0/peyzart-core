"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidButtonRed, LiquidButtonBlack } from '@/components/greenish/LiquidUI';

export default function CustomerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    address: 'Gümüşsuyu Mah. Çevre Yolu No:45',
    city: 'İstanbul',
    savedAddresses: [
      { id: 1, type: 'Ev', address: 'Gümüşsuyu Mah. ...', default: true },
      { id: 2, type: 'İş', address: 'Ataköy Mah. ...', default: false },
    ],
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

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
            Profil
          </span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="liquid-glass-card p-8 text-center sticky top-24 space-y-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-4xl mx-auto">
              👤
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
              <p className="text-white/60 text-sm">{profile.email}</p>
              <p className="text-white/60 text-sm">{profile.phone}</p>
            </div>
            <div className="pt-6 border-t border-white/10 space-y-2 text-sm">
              <p className="text-white/60">⭐ Toplam Puanladığim: <span className="text-white font-semibold">4.6</span></p>
              <p className="text-white/60">📋 Toplam Sipariş: <span className="text-white font-semibold">12</span></p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Tabs */}
          <div className="flex gap-3 pb-4 border-b border-white/10 overflow-x-auto">
            {['Bilgiler', 'Adresler', 'Güvenlik', 'Tercihler'].map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 whitespace-nowrap text-white/60 hover:text-white transition-colors border-b-2 border-transparent hover:border-cyan-400 pb-2"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Personal Information */}
          <div className="liquid-glass-card p-8 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Kişisel Bilgiler</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-cyan-500/30 border border-cyan-400 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/40 transition-all"
              >
                {isEditing ? '✓ Kaydet' : '✏️ Düzenle'}
              </motion.button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Ad Soyad</label>
                <input
                  type="text"
                  defaultValue={profile.name}
                  disabled={!isEditing}
                  className={`liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30 ${
                    !isEditing ? 'opacity-60' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">E-posta</label>
                <input
                  type="email"
                  defaultValue={profile.email}
                  disabled={!isEditing}
                  className={`liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30 ${
                    !isEditing ? 'opacity-60' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Telefon</label>
                <input
                  type="tel"
                  defaultValue={profile.phone}
                  disabled={!isEditing}
                  className={`liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30 ${
                    !isEditing ? 'opacity-60' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Şehir</label>
                <select
                  defaultValue={profile.city}
                  disabled={!isEditing}
                  className={`liquid-glass-input w-full px-4 py-3 text-white ${!isEditing ? 'opacity-60' : ''}`}
                >
                  <option>İstanbul</option>
                  <option>Ankara</option>
                  <option>İzmir</option>
                </select>
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="liquid-glass-card p-8 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Kayıtlı Adresler</h3>

            <div className="space-y-3">
              {profile.savedAddresses.map((addr) => (
                <motion.div
                  key={addr.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border-2 ${
                    addr.default
                      ? 'bg-cyan-500/20 border-cyan-400'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{addr.type}</h4>
                    {addr.default && <span className="text-cyan-400 text-xs font-semibold">Varsayılan</span>}
                  </div>
                  <p className="text-white/80 text-sm mb-3">{addr.address}</p>
                  <div className="flex gap-2">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                      ✏️ Düzenle
                    </button>
                    <button className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors">
                      🗑️ Sil
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <LiquidButtonBlack label="+ Yeni Adres Ekle" className="w-full" />
            </motion.div>
          </div>

          {/* Security */}
          <div className="liquid-glass-card p-8 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Güvenlik</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Mevcut Şifre</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="••••••••"
                  className="liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Yeni Şifre</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="••••••••"
                  className="liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Şifreyi Onayla</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="liquid-glass-input w-full px-4 py-3 text-white placeholder-white/30"
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <LiquidButtonRed label="Şifreyi Güncelle" className="w-full" />
            </motion.div>
          </div>

          {/* Danger Zone */}
          <div className="liquid-glass-card p-8 space-y-4 border-red-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Tehlikeli İşlemler</h3>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button className="w-full py-3 px-4 bg-red-500/20 border border-red-400 text-red-400 rounded-xl font-semibold hover:bg-red-500/30 transition-all">
                🔓 Oturumu Kapat
              </button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button className="w-full py-3 px-4 bg-red-500/20 border border-red-400 text-red-400 rounded-xl font-semibold hover:bg-red-500/30 transition-all">
                🗑️ Hesabı Sil
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
