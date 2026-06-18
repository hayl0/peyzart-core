'use client';

import { useState, useEffect } from 'react';
import { Users, Layers, DollarSign, Clock } from 'lucide-react';
import KpiCard from '../_components/KpiCard';
import NotificationItem from '../_components/NotificationItem';
import ShimmerSkeleton from '../_components/ShimmerSkeleton';
import EmptyState from '../_components/EmptyState';
import ErrorBanner from '../_components/ErrorBanner';
import TabFilter from '../_components/TabFilter';

const TIME_FILTERS = ['Bugün', 'Bu Hafta', 'Bu Ay'];

const KPI_DATA = [
  { icon: Users, label: 'Aktif Müşteri', value: '24', change: '▲ %12 bu ay', iconBg: 'bg-lime-500/15', iconColor: 'text-lime-400' },
  { icon: Layers, label: 'Devam Eden', value: '8', change: '▲ %4 bu ay', iconBg: 'bg-green-500/15', iconColor: 'text-green-400' },
  { icon: DollarSign, label: 'Bu Ay Gelir', value: '₺12.450', change: '▲ %18 hedef', iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-400', changeColor: 'text-lime-400' },
  { icon: Clock, label: 'Tepki Süresi', value: '2.3s', change: '▼ %15 iyileşme', iconBg: 'bg-purple-500/15', iconColor: 'text-purple-400', changeColor: 'text-white/40' },
];

const CHART_DATA = [
  { day: 'Pzt', value: 65 },
  { day: 'Sal', value: 72 },
  { day: 'Çar', value: 58 },
  { day: 'Per', value: 84 },
  { day: 'Cum', value: 91 },
  { day: 'Cmt', value: 45 },
  { day: 'Paz', value: 38 },
];

const NOTIFICATIONS = [
  { title: 'Yeni müşteri talebi', desc: 'Çim Bakımı için Acil Talep', time: '2 dk önce', dotColor: 'bg-yellow-400', bgClass: 'bg-yellow-500/5' },
  { title: 'Proje tamamlandı', desc: 'Zeynep K. — Bahçe Düzenleme', time: '1 saat önce', dotColor: 'bg-bright-green', bgClass: 'bg-bright-green/5' },
  { title: 'Ödeme alındı', desc: '₺1.200 — Sulama Sistemi', time: '3 saat önce', dotColor: 'bg-blue-400', bgClass: 'bg-blue-400/5' },
];

export default function LandscaperDashboard() {
  const [status, setStatus] = useState<'loading' | 'error' | 'empty' | 'success'>('loading');
  const [timeFilter, setTimeFilter] = useState('Bu Hafta');

  useEffect(() => {
    const timer = setTimeout(() => setStatus('success'), 1000);
    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(...CHART_DATA.map(d => d.value));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Kontrol Paneli</h1>
          <p className="text-[11px] text-white/35 mt-1">Hoş geldin, Ahmet — bugün 4 yeni talep var</p>
        </div>
        <TabFilter tabs={TIME_FILTERS} active={timeFilter} onChange={setTimeFilter} />
      </div>

      {status === 'loading' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <ShimmerSkeleton variant="card" count={4} />
          </div>
          <ShimmerSkeleton variant="chart" />
        </>
      )}

      {status === 'error' && (
        <ErrorBanner message="Veriler yüklenirken bir hata oluştu" onRetry={() => setStatus('loading')} />
      )}

      {status === 'empty' && (
        <EmptyState message="Henüz hiçbir veri bulunmuyor" actionLabel="Yenile" onAction={() => setStatus('loading')} />
      )}

      {status === 'success' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {KPI_DATA.map((kpi, i) => (
              <KpiCard key={i} {...kpi} />
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            {/* Left: Weekly Activity Chart */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
              <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase mb-4">Haftalık Aktivite</h2>
              <div className="flex gap-[6px] items-end h-[64px]">
                {CHART_DATA.map((d, i) => {
                  const isFriday = d.day === 'Cum';
                  const heightPercent = (d.value / maxValue) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <div
                        className="w-full rounded-t-[4px] transition-all min-h-[4px]"
                        style={{
                          height: `${heightPercent}%`,
                          background: isFriday
                            ? 'linear-gradient(to top, rgba(132,204,22,0.7), rgba(132,204,22,0.15))'
                            : 'linear-gradient(to top, rgba(34,197,94,0.6), rgba(34,197,94,0.1))',
                        }}
                      />
                      <span className={`text-[8px] font-semibold ${isFriday ? 'text-lime-400' : 'text-white/25'}`}>
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Recent Notifications */}
            <div className="space-y-2">
              <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase">Son Bildirimler</h2>
              {NOTIFICATIONS.map((n, i) => (
                <NotificationItem key={i} {...n} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
