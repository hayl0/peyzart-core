'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, MapPin, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api-client';

interface TimelineStep {
  label: string;
  time: string;
  done: boolean;
}

interface OrderDetail {
  id: string;
  service: string;
  provider: string;
  providerRating: number;
  providerReviews: number;
  providerPhone: string;
  date: string;
  time: string;
  address: string;
  price: number;
  status: string;
  label: string;
  timeline: TimelineStep[];
}

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    api.get<OrderDetail>(`/api/orders/${params.id}`).then(setOrder).catch(() => setOrder(null));
  }, [params.id]);

  if (!order) {
    return (
      <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center">
        <p className="text-sm text-[var(--theme-text-secondary)]">Yükleniyor...</p>
      </div>
    );
  }

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
                {order.provider.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-[var(--theme-text)]">{order.provider}</h2>
                <p className="text-xs text-[var(--theme-text-secondary)]">⭐ {order.providerRating} · {order.providerReviews} yorum</p>
              </div>
              <a href={`tel:${order.providerPhone}`} className="ml-auto text-xs font-semibold text-bright-green bg-bright-green/10 px-3 py-1.5 rounded-full hover:bg-bright-green/20 transition-colors">
                Ara
              </a>
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
                {order.timeline.map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        s.done ? 'bg-bright-green text-white' : 'bg-[var(--theme-border)] text-[var(--theme-text-muted)]'
                      }`}>
                        {s.done ? <CheckCircle size={16} /> : i + 1}
                      </div>
                      {i < order.timeline.length - 1 && (
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
                  <span className="font-semibold text-[var(--theme-text)]">{order.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--theme-text-secondary)]">Tarih</span>
                  <span className="font-semibold text-[var(--theme-text)]">{order.date} · {order.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--theme-text-secondary)]">Adres</span>
                  <span className="font-semibold text-[var(--theme-text)] text-right max-w-[200px]">{order.address}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--theme-border)]">
                  <span className="font-bold text-[var(--theme-text)]">Toplam</span>
                  <span className="font-extrabold text-lg text-[var(--theme-text)]">₺{order.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="nature-card p-4 flex flex-col items-center justify-center h-[200px]">
              <h3 className="font-bold text-sm text-[var(--theme-text)] mb-2">Sohbet</h3>
              <p className="text-xs text-[var(--theme-text-muted)] text-center">Sohbet özelliği yakında gelecek</p>
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
