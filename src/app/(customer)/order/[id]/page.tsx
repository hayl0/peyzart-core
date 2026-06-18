'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, User, MapPin, Calendar, Clock, Send, CheckCircle } from 'lucide-react';

const STEPS = [
  { label: 'Talep Alındı', time: '10:30', done: true },
  { label: 'Kabul Edildi', time: '11:00', done: true },
  { label: 'Hizmet Başladı', time: '14:15', done: true },
  { label: 'Tamamlandı', time: '-', done: false },
];

const MESSAGES = [
  { id: 1, from: 'provider', text: 'Merhaba! Adresinize gitmek üzere yoldayım', time: '14:20' },
  { id: 2, from: 'me', text: 'Tahmini ne zaman gelirsiniz?', time: '14:25' },
  { id: 3, from: 'provider', text: '15-20 dk içinde orada olurum', time: '14:26' },
];

export default function OrderDetailPage() {
  const [input, setInput] = useState('');

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24">
        {/* Back */}
        <Link href="/orders" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors mb-4">
          <ChevronLeft size={18} />
          Siparişler
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-4">
            {/* Provider Card */}
            <div className="nature-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-bright-green/20 flex items-center justify-center text-bright-green font-bold text-lg">
                A
              </div>
              <div>
                <h2 className="font-bold text-[var(--theme-text)]">Ali Çimen</h2>
                <p className="text-xs text-[var(--theme-text-secondary)]">⭐ 4.8 · 156 yorum</p>
              </div>
              <button className="ml-auto text-xs font-semibold text-bright-green bg-bright-green/10 px-3 py-1.5 rounded-full hover:bg-bright-green/20 transition-colors">
                Ara
              </button>
            </div>

            {/* Map Placeholder */}
            <div className="h-40 md:h-48 rounded-[20px] bg-gradient-to-br from-[#a8d5a2] to-[#66bb6a] flex items-center justify-center">
              <div className="text-center">
                <MapPin size={24} className="mx-auto text-white/80 mb-1" />
                <p className="text-xs text-white/70">Harita entegrasyonu yakında</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="nature-card p-5">
              <h3 className="font-bold text-sm text-[var(--theme-text)] mb-4">Sipariş Durumu</h3>
              <div className="space-y-0">
                {STEPS.map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        s.done ? 'bg-bright-green text-white' : 'bg-[var(--theme-border)] text-[var(--theme-text-muted)]'
                      }`}>
                        {s.done ? <CheckCircle size={16} /> : i + 1}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`w-0.5 h-8 ${s.done ? 'bg-bright-green' : 'bg-[var(--theme-border)]'}`} />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className={`text-sm font-semibold ${s.done ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-muted)]'}`}>{s.label}</p>
                      <p className="text-xs text-[var(--theme-text-muted)]">{s.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="nature-card p-5 space-y-3">
              <h3 className="font-bold text-sm text-[var(--theme-text)]">Detaylar</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--theme-text-secondary)]">Hizmet</span>
                  <span className="font-semibold text-[var(--theme-text)]">Çim Biçme</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--theme-text-secondary)]">Tarih</span>
                  <span className="font-semibold text-[var(--theme-text)]">18 Nisan 2024 · 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--theme-text-secondary)]">Adres</span>
                  <span className="font-semibold text-[var(--theme-text)] text-right max-w-[200px]">Gümüşsuyu Mah. Çevre Yolu No:45</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--theme-border)]">
                  <span className="font-bold text-[var(--theme-text)]">Toplam</span>
                  <span className="font-extrabold text-lg text-[var(--theme-text)]">₺450</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Chat */}
          <div className="space-y-4">
            <div className="nature-card p-4 flex flex-col h-[400px]">
              <h3 className="font-bold text-sm text-[var(--theme-text)] mb-3">Mesajlar</h3>
              <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
                {MESSAGES.map(msg => (
                  <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : ''}`}>
                    <div className={`max-w-[80%] px-3.5 py-2 rounded-[16px] text-sm ${
                      msg.from === 'me'
                        ? 'bg-bright-green text-white rounded-br-[4px]'
                        : 'bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-bl-[4px]'
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-0.5 ${msg.from === 'me' ? 'text-white/60' : 'text-[var(--theme-text-muted)]'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Mesaj yaz..."
                  className="flex-1 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-3.5 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                <button className="w-11 h-11 bg-bright-green rounded-full flex items-center justify-center text-white hover:bg-bright-green/90 transition-colors flex-shrink-0">
                  <Send size={16} />
                </button>
              </div>
            </div>

            <button className="w-full py-3 border border-red-200 text-red-500 rounded-[14px] text-sm font-semibold hover:bg-red-50 transition-colors">
              İptal Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
