'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Edit2, Save } from 'lucide-react';
import KpiCard from '../_components/KpiCard';
import StatusBadge from '../_components/StatusBadge';
import Pagination from '../_components/Pagination';
import ShimmerSkeleton from '../_components/ShimmerSkeleton';
import EmptyState from '../_components/EmptyState';
import ErrorBanner from '../_components/ErrorBanner';
import { api } from '@/lib/api-client';

const PERIODS = ['Bu Hafta', 'Bu Ay', 'Bu Yıl'];

const STATUS_LABELS: Record<string, string> = {
  completed: 'Tamamlandı',
  pending: 'Bekliyor',
  cancelled: 'İptal Edildi',
};

interface Summary {
  total: number;
  currentPeriod: number;
  previousPeriod: number;
  growth: number;
}

interface ChartDataPoint {
  month: string;
  value: number;
}

interface Transaction {
  id: string;
  date: string;
  customer: string;
  service: string;
  amount: number;
  status: string;
}

interface PaginationInfo {
  page: number;
  totalPages: number;
  total: number;
}

interface EarningsResponse {
  summary: Summary;
  chart: ChartDataPoint[];
  transactions: Transaction[];
  pagination: PaginationInfo;
}

export default function LandscaperEarningsPage() {
  const [status, setStatus] = useState<'loading' | 'error' | 'empty' | 'success'>('loading');
  const [period, setPeriod] = useState('Bu Yıl');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, totalPages: 1, total: 0 });
  const [ibanEditing, setIbanEditing] = useState(false);
  const [iban, setIban] = useState('TR12 3456 7890 1234 5678 9000 12');
  const [bankName, setBankName] = useState('Türkiye İş Bankası');

  const fetchEarnings = async (pageNum: number) => {
    setStatus('loading');
    try {
      const data = await api.get<EarningsResponse>(`/api/landscaper/earnings?page=${pageNum}&limit=20`);
      setSummary(data.summary);
      setChartData(data.chart);
      setTransactions(data.transactions);
      setPagination(data.pagination);
      setStatus(data.transactions.length === 0 ? 'empty' : 'success');
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchEarnings(1);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    fetchEarnings(newPage);
  };

  const fmt = (value: number) => new Intl.NumberFormat('tr-TR').format(value);

  const kpiCards = summary ? [
    { icon: TrendingUp, label: 'Toplam Kazanç', value: `₺${fmt(summary.total)}`, change: `▲ %${summary.growth} tüm zamanlar`, iconBg: 'bg-lime-500/15', iconColor: 'text-lime-400' },
    { icon: ArrowUp, label: 'Bu Dönem', value: `₺${fmt(summary.currentPeriod)}`, change: '', iconBg: 'bg-green-500/15', iconColor: 'text-green-400' },
    { icon: ArrowDown, label: 'Geçen Dönem', value: `₺${fmt(summary.previousPeriod)}`, change: '', iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-400', changeColor: 'text-white/40' },
  ] : [];

  const maxValue = chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) : 1;
  const chartWidth = 100;
  const chartHeight = 40;
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * chartWidth;
    const y = chartHeight - (d.value / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');
  const areaPoints = chartData.length > 0 ? `0,${chartHeight} ${points} ${chartWidth},${chartHeight}` : '';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Kazançlar</h1>
          <p className="text-[11px] text-white/35 mt-1">Gelir geçmişinizi görüntüleyin</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2.5 rounded-[50px] text-xs font-semibold whitespace-nowrap border transition-all ${
                period === p
                  ? 'bg-bright-green text-white border-bright-green'
                  : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20'
              }`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {status === 'loading' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <ShimmerSkeleton variant="card" count={3} />
          </div>
          <ShimmerSkeleton variant="chart" />
          <ShimmerSkeleton variant="card" />
        </>
      )}

      {status === 'error' && (
        <ErrorBanner message="Kazanç verileri yüklenirken bir hata oluştu" onRetry={() => fetchEarnings(pagination.page)} />
      )}

      {status === 'empty' && (
        <EmptyState message="Henüz hiçbir kazanç verisi bulunmuyor" actionLabel="Yenile" onAction={() => fetchEarnings(1)} />
      )}

      {status === 'success' && summary && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {kpiCards.map((kpi, i) => (
              <KpiCard key={i} {...kpi} />
            ))}
          </div>

          {/* Gelir Grafiği */}
          {chartData.length > 0 && (
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
              <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase mb-4">Gelir Grafiği</h2>
              <div className="relative">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="earningGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#84cc16" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#84cc16" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <polygon points={areaPoints} fill="url(#earningGradient)" />
                  <polyline points={points} fill="none" stroke="#84cc16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  {chartData.map((d, i) => {
                    const x = (i / (chartData.length - 1)) * chartWidth;
                    const y = chartHeight - (d.value / maxValue) * chartHeight;
                    return <circle key={i} cx={x} cy={y} r="1.8" fill="#84cc16" />;
                  })}
                </svg>
                <div className="flex justify-between mt-2">
                  {chartData.map((d, i) => (
                    <span key={i} className="text-[8px] font-semibold text-white/25">{d.month}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* İşlem Geçmişi Tablosu */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase mb-4">İşlem Geçmişi</h2>
            <div className="overflow-x-auto -mx-[18px]">
              <table className="w-full min-w-[420px] border-collapse mx-[18px]">
                <thead>
                  <tr className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px]">
                    <th className="text-left pb-3 pr-3">Tarih</th>
                    <th className="text-left pb-3 pr-3">Müşteri</th>
                    <th className="text-left pb-3 pr-3">Hizmet</th>
                    <th className="text-right pb-3 pr-3">Tutar</th>
                    <th className="text-right pb-3">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(tx => (
                    <tr key={tx.id} className="border-t border-white/[0.05]">
                      <td className="py-3 pr-3 text-xs text-white/60 whitespace-nowrap">{tx.date}</td>
                      <td className="py-3 pr-3 text-xs text-white font-semibold whitespace-nowrap">{tx.customer}</td>
                      <td className="py-3 pr-3 text-xs text-white/50 whitespace-nowrap">{tx.service}</td>
                      <td className="py-3 pr-3 text-xs text-white font-bold text-right whitespace-nowrap">₺{fmt(tx.amount)}</td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <StatusBadge status={tx.status} label={STATUS_LABELS[tx.status] || tx.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={handlePageChange} />
          </div>

          {/* IBAN Bilgileri */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase">Hesap Bilgileri</h2>
              <button onClick={() => setIbanEditing(!ibanEditing)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[10px] font-semibold transition-all bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10">
                <Edit2 size={12} />
                Düzenle
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px] block mb-1.5">IBAN</label>
                <input value={iban} onChange={e => setIban(e.target.value)} readOnly={!ibanEditing}
                  className={`w-full bg-white/5 border rounded-[14px] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 ${
                    ibanEditing
                      ? 'border-bright-green/40 focus:border-bright-green'
                      : 'border-white/10 text-white/40'
                  }`} />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px] block mb-1.5">Banka Adı</label>
                <input value={bankName} onChange={e => setBankName(e.target.value)} readOnly={!ibanEditing}
                  className={`w-full bg-white/5 border rounded-[14px] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 ${
                    ibanEditing
                      ? 'border-bright-green/40 focus:border-bright-green'
                      : 'border-white/10 text-white/40'
                  }`} />
              </div>
              {ibanEditing && (
                <button onClick={() => setIbanEditing(false)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
                  <Save size={14} />
                  Kaydet
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
