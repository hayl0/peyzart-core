'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Star } from 'lucide-react';

const ORDERS = [
  { id: '1', service: 'Çim Bakımı', provider: 'Bahçe Sanatı', date: '12 Haziran 2026', price: 350, status: 'completed', label: 'Tamamlandı' },
  { id: '2', service: 'Peyzaj Tasarım', provider: 'Yeşil Dünya', date: '8 Haziran 2026', price: 750, status: 'in-progress', label: 'Devam Ediyor' },
  { id: '3', service: 'Budama & Bakım', provider: 'Doğa Bahçe', date: '1 Haziran 2026', price: 250, status: 'pending', label: 'Bekliyor' },
  { id: '4', service: 'Sulama Sistemi', provider: 'Zeytin Peyzaj', date: '28 Mayıs 2026', price: 1200, status: 'completed', label: 'Tamamlandı' },
];

const STATUS_COLORS: Record<string, string> = {
  'completed': 'bg-green-100 text-green-700 border-green-200',
  'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
  'pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

const TABS = ['Tümü', 'Bekliyor', 'Devam Eden', 'Tamamlanan'];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('Tümü');

  const filtered = activeTab === 'Tümü' ? ORDERS
    : activeTab === 'Bekliyor' ? ORDERS.filter(o => o.status === 'pending')
    : activeTab === 'Devam Eden' ? ORDERS.filter(o => o.status === 'in-progress')
    : ORDERS.filter(o => o.status === 'completed');

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--theme-text)]">Siparişlerim</h1>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">Tüm sipariş ve rezervasyonların</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-[50px] text-xs font-semibold whitespace-nowrap transition-all border ${
                activeTab === tab
                  ? 'bg-bright-green text-white border-bright-green'
                  : 'bg-[var(--theme-card)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-bright-green/40'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="nature-card p-10 text-center">
            <Package size={40} className="mx-auto mb-4 text-[var(--theme-text-muted)]" />
            <h3 className="font-bold text-[var(--theme-text)] mb-1">Sipariş bulunamadı</h3>
            <p className="text-sm text-[var(--theme-text-secondary)] mb-4">Henüz sipariş vermemişsin</p>
            <Link href="/home" className="btn-primary text-xs inline-block">Hizmet Keşfet</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(order => (
              <Link key={order.id} href={`/order/${order.id}`}
                className="nature-card p-4 block hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--theme-text)]">{order.service}</h3>
                    <p className="text-xs text-[var(--theme-text-secondary)]">{order.provider}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>
                    {order.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--theme-text-muted)]">
                  <span>{order.date}</span>
                  <span className="font-bold text-[var(--theme-text)]">₺{order.price}</span>
                </div>
                {order.status === 'completed' && (
                  <div className="mt-3 pt-3 border-t border-[var(--theme-border)] flex items-center justify-between">
                    <span className="text-xs text-[var(--theme-text-secondary)]">Bu hizmeti puanla</span>
                    <button className="flex items-center gap-1 text-xs font-semibold text-yellow-600 hover:text-yellow-700 transition-colors">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      Puanla
                    </button>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
