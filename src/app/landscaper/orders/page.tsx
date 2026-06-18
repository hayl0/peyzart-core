'use client';

import { useState, useEffect, useCallback } from 'react';
import { MapPin, Calendar, Check, X } from 'lucide-react';
import TabFilter from '@/app/landscaper/_components/TabFilter';
import StatusBadge from '@/app/landscaper/_components/StatusBadge';
import ShimmerSkeleton from '@/app/landscaper/_components/ShimmerSkeleton';
import EmptyState from '@/app/landscaper/_components/EmptyState';
import ErrorBanner from '@/app/landscaper/_components/ErrorBanner';
import Pagination from '@/app/landscaper/_components/Pagination';
import { api } from '@/lib/api-client';

const TABS = ['Tümü', 'Bekleyen', 'Kabul Edilen', 'Devam Eden', 'Tamamlanan'];

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Bekliyor',
  ACCEPTED: 'Kabul Edildi',
  IN_PROGRESS: 'Devam Ediyor',
  COMPLETED: 'Tamamlandı',
  CANCELLED: 'İptal Edildi',
};

const STATUS_TO_LOWERCASE: Record<string, string> = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

const TAB_STATUS_MAP: Record<string, string> = {
  'Bekleyen': 'PENDING',
  'Kabul Edilen': 'ACCEPTED',
  'Devam Eden': 'IN_PROGRESS',
  'Tamamlanan': 'COMPLETED',
};

const MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

function formatDate(iso: string) {
  const parts = iso.split('T')[0]?.split('-');
  if (!parts || parts.length < 3) return iso;
  return `${parseInt(parts[2])} ${MONTHS[parseInt(parts[1]) - 1]} ${parts[0]}`;
}

function formatTime(iso: string) {
  const parts = iso.split('T')[1]?.split(':');
  return parts ? `${parts[0]}:${parts[1]}` : '';
}

interface Order {
  id: string;
  customer: string;
  service: string;
  phone: string;
  address: string;
  serviceDate: string;
  totalPrice: number;
  status: string;
  notes: string;
}

interface OrdersResponse {
  orders: Order[];
  pagination: { page: number; totalPages: number; total: number };
}

export default function LandscaperOrdersPage() {
  const [tab, setTab] = useState('Tümü');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = useCallback(() => {
    setLoading(true);
    setError(false);
    const statusParam = TAB_STATUS_MAP[tab] || '';
    api.get<OrdersResponse>(`/api/landscaper/orders?status=${statusParam}&page=${page}&limit=20`)
      .then((res) => {
        setOrders(res.orders);
        setTotalPages(res.pagination.totalPages);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [tab, page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    setPage(1);
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/api/landscaper/orders/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch {
      // silently fail, user can retry
    }
  };

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-6">Siparişler</h1>

      <TabFilter tabs={TABS} active={tab} onChange={handleTabChange} />

      {error ? (
        <div className="mt-6">
          <ErrorBanner message="Siparişler yüklenirken bir hata oluştu." onRetry={fetchOrders} />
        </div>
      ) : loading ? (
        <div className="space-y-3 mt-6">
          <ShimmerSkeleton variant="row" count={4} />
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-6">
          <EmptyState message="Bu kategoride talep bulunmuyor" />
        </div>
      ) : (
        <>
          <div className="space-y-3 mt-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white/5 border border-white/10 rounded-[16px] p-4 md:p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm">{order.customer}</h3>
                      <StatusBadge status={STATUS_TO_LOWERCASE[order.status]} label={STATUS_LABELS[order.status]} />
                    </div>
                    <p className="text-sm text-bright-green font-semibold mb-1">{order.service}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50">
                      <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(order.serviceDate)} {formatTime(order.serviceDate)}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} className="shrink-0" />{order.address}</span>
                    </div>
                    {order.notes && <p className="text-xs text-white/30 italic mt-2">"{order.notes}"</p>}
                  </div>
                  <div className="flex items-center gap-3 md:flex-col md:items-end">
                    <span className="text-lg font-extrabold text-white">₺{order.totalPrice}</span>
                    {order.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button onClick={() => handleStatusUpdate(order.id, 'ACCEPTED')} className="w-10 h-10 rounded-xl bg-bright-green/20 text-bright-green flex items-center justify-center hover:bg-bright-green/30 transition-all"><Check size={16} /></button>
                        <button onClick={() => handleStatusUpdate(order.id, 'CANCELLED')} className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-all"><X size={16} /></button>
                      </div>
                    )}
                    {order.status === 'ACCEPTED' && (
                      <button onClick={() => handleStatusUpdate(order.id, 'IN_PROGRESS')} className="text-xs font-semibold text-bright-green bg-bright-green/10 px-3 py-1.5 rounded-full hover:bg-bright-green/20 transition-all">Başlat</button>
                    )}
                    {order.status === 'IN_PROGRESS' && (
                      <button onClick={() => handleStatusUpdate(order.id, 'COMPLETED')} className="text-xs font-semibold text-bright-green bg-bright-green/10 px-3 py-1.5 rounded-full hover:bg-bright-green/20 transition-all">Tamamla</button>
                    )}
                    {order.status === 'COMPLETED' && (
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
