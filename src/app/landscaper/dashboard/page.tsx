'use client';

import { useState, useEffect } from 'react';
import { Users, Layers, DollarSign, Clock } from 'lucide-react';
import KpiCard from '../_components/KpiCard';
import NotificationItem from '../_components/NotificationItem';
import ShimmerSkeleton from '../_components/ShimmerSkeleton';
import EmptyState from '../_components/EmptyState';
import ErrorBanner from '../_components/ErrorBanner';
import TabFilter from '../_components/TabFilter';
import { api } from '@/lib/api-client';

const TIME_FILTERS = ['Bugün', 'Bu Hafta', 'Bu Ay'];

const TYPE_STYLES: Record<string, { dotColor: string; bgClass: string }> = {
  warning: { dotColor: 'bg-yellow-400', bgClass: 'bg-yellow-500/5' },
  success: { dotColor: 'bg-bright-green', bgClass: 'bg-bright-green/5' },
  info: { dotColor: 'bg-blue-400', bgClass: 'bg-blue-400/5' },
};

interface DashboardData {
  kpis: { activeCustomers: number; activeProjects: number; monthlyEarnings: number; responseTime: number };
  weeklyActivity: { day: string; value: number }[];
  notifications: { title: string; desc: string; time: string; type: 'success' | 'warning' | 'info' }[];
}

export default function LandscaperDashboard() {
  const [status, setStatus] = useState<'loading' | 'error' | 'empty' | 'success'>('loading');
  const [timeFilter, setTimeFilter] = useState('Bu Hafta');
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchData = () => {
    setStatus('loading');
    api.get<DashboardData>('/api/landscaper/dashboard')
      .then((res) => {
        const hasData = res.kpis.activeCustomers > 0 || res.kpis.activeProjects > 0 || res.kpis.monthlyEarnings > 0 || res.kpis.responseTime > 0 || res.weeklyActivity.length > 0 || res.notifications.length > 0;
        if (hasData) {
          setData(res);
          setStatus('success');
        } else {
          setStatus('empty');
        }
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    queueMicrotask(() => fetchData());
  }, []);

  const kpiCards = data ? [
    { icon: Users, label: 'Aktif Müşteri', value: String(data.kpis.activeCustomers), change: `▲ ${data.kpis.activeCustomers} müşteri`, iconBg: 'bg-lime-500/15', iconColor: 'text-lime-400' },
    { icon: Layers, label: 'Devam Eden', value: String(data.kpis.activeProjects), change: `▲ ${data.kpis.activeProjects} proje`, iconBg: 'bg-green-500/15', iconColor: 'text-green-400' },
    { icon: DollarSign, label: 'Bu Ay Gelir', value: `₺${data.kpis.monthlyEarnings.toLocaleString('tr-TR')}`, change: `₺${data.kpis.monthlyEarnings.toLocaleString('tr-TR')}`, iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-400', changeColor: 'text-lime-400' },
    { icon: Clock, label: 'Tepki Süresi', value: `${data.kpis.responseTime}s`, change: `${data.kpis.responseTime}sn`, iconBg: 'bg-purple-500/15', iconColor: 'text-purple-400', changeColor: 'text-white/40' },
  ] : [];

  const maxValue = data ? Math.max(...data.weeklyActivity.map(d => d.value), 1) : 0;

  return (
    <div className="space-y-6">
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
        <ErrorBanner message="Veriler yüklenirken bir hata oluştu" onRetry={fetchData} />
      )}

      {status === 'empty' && (
        <EmptyState message="Henüz hiçbir veri bulunmuyor" actionLabel="Yenile" onAction={fetchData} />
      )}

      {status === 'success' && data && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {kpiCards.map((kpi, i) => (
              <KpiCard key={i} {...kpi} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
              <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase mb-4">Haftalık Aktivite</h2>
              <div className="flex gap-[6px] items-end h-[64px]">
                {data.weeklyActivity.map((d, i) => {
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

            <div className="space-y-2">
              <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase">Son Bildirimler</h2>
              {data.notifications.map((n, i) => (
                <NotificationItem key={i} title={n.title} desc={n.desc} time={n.time} {...(TYPE_STYLES[n.type] || TYPE_STYLES.info)} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
