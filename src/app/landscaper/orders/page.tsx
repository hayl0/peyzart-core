'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Check, X } from 'lucide-react';
import TabFilter from '@/app/landscaper/_components/TabFilter';
import StatusBadge from '@/app/landscaper/_components/StatusBadge';
import ShimmerSkeleton from '@/app/landscaper/_components/ShimmerSkeleton';
import EmptyState from '@/app/landscaper/_components/EmptyState';
import ErrorBanner from '@/app/landscaper/_components/ErrorBanner';
import Pagination from '@/app/landscaper/_components/Pagination';

const ORDERS = [
  { id: 1, customer: 'Ahmet Yılmaz', service: 'Çim Biçme', phone: '+90 555 123 4567', address: 'Gümüşsuyu Mah. Çevre Yolu No:45', date: '18 Nis 2026', time: '14:00', price: 350, status: 'pending', notes: 'Arka bahçeye dikkat et' },
  { id: 2, customer: 'Zeynep Kaya', service: 'Bitki Dikimi', phone: '+90 555 456 7890', address: 'Ataköy Mah. Londra Asfaltı No:12', date: '18 Nis 2026', time: '16:30', price: 450, status: 'accepted', notes: '' },
  { id: 3, customer: 'Can Demir', service: 'Sulama Sistemi', phone: '+90 555 789 0123', address: 'Tarabya Mah. Sahil Yolu No:8', date: '19 Nis 2026', time: '10:00', price: 1200, status: 'in-progress', notes: 'Sistem planı eklendi' },
  { id: 4, customer: 'Mehmet Şahin', service: 'Çim Biçme', phone: '+90 555 234 5678', address: 'Taksim Mah. İstiklal Cad. No:22', date: '20 Nis 2026', time: '09:00', price: 350, status: 'pending', notes: '' },
  { id: 5, customer: 'Elif Demirtaş', service: 'Peyzaj Tasarım', phone: '+90 555 876 5432', address: 'Bebek Mah. Cevdet Paşa Cad. No:5', date: '17 Nis 2026', time: '11:00', price: 750, status: 'completed', notes: '' },
];

const TABS = ['Tümü', 'Bekleyen', 'Kabul Edilen', 'Devam Eden', 'Tamamlanan'];

const STATUS_LABELS: Record<string, string> = {
  pending: 'Bekliyor',
  accepted: 'Kabul Edildi',
  'in-progress': 'Devam Ediyor',
  completed: 'Tamamlandı',
};

const PAGE_SIZE = 4;

export default function LandscaperOrdersPage() {
  const [tab, setTab] = useState('Tümü');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setPage(1);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [tab]);

  const filtered = tab === 'Tümü' ? ORDERS
    : tab === 'Bekleyen' ? ORDERS.filter(o => o.status === 'pending')
    : tab === 'Kabul Edilen' ? ORDERS.filter(o => o.status === 'accepted')
    : tab === 'Devam Eden' ? ORDERS.filter(o => o.status === 'in-progress')
    : ORDERS.filter(o => o.status === 'completed');

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-6">Siparişler</h1>

      <TabFilter tabs={TABS} active={tab} onChange={setTab} />

      {error ? (
        <div className="mt-6">
          <ErrorBanner message="Siparişler yüklenirken bir hata oluştu." onRetry={() => setError(false)} />
        </div>
      ) : loading ? (
        <div className="space-y-3 mt-6">
          <ShimmerSkeleton variant="row" count={4} />
        </div>
      ) : paginated.length === 0 ? (
        <div className="mt-6">
          <EmptyState message="Bu kategoride talep bulunmuyor" />
        </div>
      ) : (
        <>
          <div className="space-y-3 mt-6">
            {paginated.map(order => (
              <div key={order.id} className="bg-white/5 border border-white/10 rounded-[16px] p-4 md:p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm">{order.customer}</h3>
                      <StatusBadge status={order.status} label={STATUS_LABELS[order.status]} />
                    </div>
                    <p className="text-sm text-bright-green font-semibold mb-1">{order.service}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50">
                      <span className="flex items-center gap-1"><Calendar size={12} />{order.date} {order.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} className="shrink-0" />{order.address}</span>
                    </div>
                    {order.notes && <p className="text-xs text-white/30 italic mt-2">"{order.notes}"</p>}
                  </div>
                  <div className="flex items-center gap-3 md:flex-col md:items-end">
                    <span className="text-lg font-extrabold text-white">₺{order.price}</span>
                    {order.status === 'pending' && (
                      <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-xl bg-bright-green/20 text-bright-green flex items-center justify-center hover:bg-bright-green/30 transition-all"><Check size={16} /></button>
                        <button className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-all"><X size={16} /></button>
                      </div>
                    )}
                    {order.status === 'accepted' && (
                      <button className="text-xs font-semibold text-bright-green bg-bright-green/10 px-3 py-1.5 rounded-full hover:bg-bright-green/20 transition-all">Başlat</button>
                    )}
                    {order.status === 'in-progress' && (
                      <button className="text-xs font-semibold text-bright-green bg-bright-green/10 px-3 py-1.5 rounded-full hover:bg-bright-green/20 transition-all">Tamamla</button>
                    )}
                    {order.status === 'completed' && (
                      <button className="text-xs font-semibold text-white/40 px-3 py-1.5">Detay</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
