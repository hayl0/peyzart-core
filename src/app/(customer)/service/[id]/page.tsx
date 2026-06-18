'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, MapPin, ChevronLeft, Calendar } from 'lucide-react';

export default function ServiceDetailPage() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState('');

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors">
            <ChevronLeft size={18} />
            Geri
          </button>
          <span className="text-xl font-extrabold text-[var(--theme-text)]">₺350</span>
        </div>

        <div className="h-48 md:h-64 rounded-[24px] overflow-hidden mb-6 bg-[var(--theme-border)]">
          <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--theme-text)] mb-1">Bahçe Sanatı</h1>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-3">Çim Bakımı</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 font-semibold text-[var(--theme-text)]">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              4.2
              <span className="text-[var(--theme-text-muted)] font-normal">(124)</span>
            </span>
            <span className="flex items-center gap-1 text-[var(--theme-text-secondary)]">
              <MapPin size={14} />
              2.3 km
            </span>
          </div>
        </div>

        <div className="nature-card p-4 md:p-5 mb-4">
          <h3 className="font-bold text-sm text-[var(--theme-text)] mb-2">Açıklama</h3>
          <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
            Profesyonel çim biçme, gübreleme ve bakım hizmeti. 10 yıllık tecrübe ile bahçenizi yenileyelim.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-sm text-[var(--theme-text)] mb-3">Galeri</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
              'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=400&q=80',
              'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
              'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?w=400&q=80'].map((img, i) => (
              <div key={i} className="w-24 h-24 md:w-28 md:h-28 rounded-[16px] overflow-hidden flex-shrink-0 bg-[var(--theme-border)]">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="nature-card p-4 md:p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-bright-green" />
            <h3 className="font-bold text-sm text-[var(--theme-text)]">Müsait Günler</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all border ${
                  selectedDay === day
                    ? 'bg-bright-green text-white border-bright-green'
                    : 'bg-[var(--theme-card)] text-[var(--theme-text)] border-[var(--theme-border)] hover:border-bright-green/40'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-sm text-[var(--theme-text)] mb-3">Yorumlar (3)</h3>
          <div className="space-y-3">
            {[
              { author: 'Mehmet K.', avatar: 'MK', rating: 5, date: '2 gün önce', text: 'Çok profesyonel ve hızlı çalıştı. Tavsiye ederim!' },
              { author: 'Zeynep A.', avatar: 'ZA', rating: 5, date: '1 hafta önce', text: 'Bahçe tamamen yenilendi. Sonuçtan çok memnunum.' },
              { author: 'Can D.', avatar: 'CD', rating: 4, date: '2 hafta önce', text: 'İş kalitesi iyi, zamanlama biraz aksadı ama düzeltildi.' },
            ].map((review, i) => (
              <div key={i} className="nature-card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-bright-green/20 flex items-center justify-center text-xs font-bold text-bright-green">{review.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--theme-text)]">{review.author}</p>
                    <p className="text-[11px] text-[var(--theme-text-muted)]">{review.date}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-semibold text-[var(--theme-text)]">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-[var(--theme-card)] border-t border-[var(--theme-border)] p-4 lg:static lg:border-none lg:bg-transparent lg:p-0">
          <div className="max-w-4xl mx-auto">
            <Link href="/booking" className="block w-full btn-primary text-center text-sm">
              Hemen Rezervasyon Yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
