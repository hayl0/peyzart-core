'use client';

import { useState } from 'react';
import { Users, Store, ClipboardList, Flag, Bell, Search, Check, X, TrendingUp, DollarSign, Leaf, UserCheck, Ban } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Genel Bakış', icon: TrendingUp },
  { id: 'users', label: 'Kullanıcılar', icon: Users },
  { id: 'landscapers', label: 'Peyzajcılar', icon: Store },
  { id: 'orders', label: 'Siparişler', icon: ClipboardList },
  { id: 'complaints', label: 'Şikayetler', icon: Flag },
];

const METRICS = [
  { icon: Users, label: 'Toplam Kullanıcı', value: '1.247', change: '+12%' },
  { icon: Store, label: 'Peyzajcı Sayısı', value: '86', change: '+4' },
  { icon: ClipboardList, label: 'Toplam Sipariş', value: '3.892', change: '+18%' },
  { icon: DollarSign, label: 'Toplam Gelir', value: '₺425.000', change: '+22%' },
];

const USERS = [
  { name: 'Ahmet Yılmaz', email: 'ahmet@email.com', role: 'Müşteri', date: '12 Mar 2026', status: 'active' },
  { name: 'Zeynep Kaya', email: 'zeynep@email.com', role: 'Müşteri', date: '8 Mar 2026', status: 'active' },
  { name: 'Ali Çimen', email: 'ali@email.com', role: 'Peyzajcı', date: '1 Mar 2026', status: 'active' },
  { name: 'Can Demir', email: 'can@email.com', role: 'Müşteri', date: '25 Şub 2026', status: 'banned' },
  { name: 'Elif Yıldız', email: 'elif@email.com', role: 'Peyzajcı', date: '20 Şub 2026', status: 'active' },
];

const LANDSCAPERS = [
  { name: 'Bahçe Sanatı', owner: 'Ali Çimen', email: 'ali@email.com', services: 4, rating: 4.8, status: 'approved' },
  { name: 'Yeşil Dünya', owner: 'Mehmet Gül', email: 'mehmet@email.com', services: 6, rating: 4.5, status: 'pending' },
  { name: 'Doğa Bahçe', owner: 'Ayşe Yaprak', email: 'ayse@email.com', services: 3, rating: 4.9, status: 'approved' },
  { name: 'Zeytin Peyzaj', owner: 'Can Toprak', email: 'can@email.com', services: 5, rating: 4.2, status: 'pending' },
];

const COMPLAINTS = [
  { id: 1, from: 'Mehmet K.', about: 'Bahçe Sanatı', reason: 'İş zamanında teslim edilmedi', date: '2 gün önce', status: 'open' },
  { id: 2, from: 'Zeynep A.', about: 'Yeşil Dünya', reason: 'Fiyat teklif edilenden yüksek çıktı', date: '5 gün önce', status: 'open' },
  { id: 3, from: 'Can D.', about: 'Doğa Bahçe', reason: 'Çözüldü, iletişim sorunu giderildi', date: '1 hafta önce', status: 'resolved' },
];

const ALL_ORDERS = [
  { id: '#1001', customer: 'Ahmet Y.', service: 'Çim Bakımı', provider: 'Bahçe Sanatı', amount: 350, status: 'completed', date: '15 Nis' },
  { id: '#1002', customer: 'Zeynep K.', service: 'Peyzaj Tasarım', provider: 'Yeşil Dünya', amount: 750, status: 'in-progress', date: '14 Nis' },
  { id: '#1003', customer: 'Mehmet Ş.', service: 'Sulama', provider: 'Zeytin Peyzaj', amount: 1200, status: 'pending', date: '13 Nis' },
  { id: '#1004', customer: 'Elif D.', service: 'Budama', provider: 'Doğa Bahçe', amount: 250, status: 'completed', date: '12 Nis' },
  { id: '#1005', customer: 'Can D.', service: 'Çim Bakımı', provider: 'Bahçe Sanatı', amount: 350, status: 'cancelled', date: '11 Nis' },
];

const STATUS_BADGES: Record<string, string> = {
  active: 'bg-bright-green/10 text-bright-green border-bright-green/20',
  banned: 'bg-red-500/10 text-red-400 border-red-500/20',
  approved: 'bg-bright-green/10 text-bright-green border-bright-green/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  completed: 'bg-bright-green/10 text-bright-green border-bright-green/20',
  'in-progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  open: 'bg-red-500/10 text-red-400 border-red-500/20',
  resolved: 'bg-bright-green/10 text-bright-green border-bright-green/20',
};

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#0a2e1a]">
      {/* Header */}
      <div className="bg-[#0a2e1a]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <h1 className="logo-gradient text-2xl md:text-3xl">Peyzart</h1>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Admin Panel</span>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex gap-1 overflow-x-auto pb-0">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                tab === t.id ? 'text-bright-green border-bright-green' : 'text-white/40 border-transparent hover:text-white/60'
              }`}>
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* OVERVIEW */}
        {tab === 'overview' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-[20px] p-4 md:p-5">
                  <div className="w-10 h-10 rounded-xl bg-bright-green/10 text-bright-green flex items-center justify-center mb-3"><m.icon size={20} /></div>
                  <p className="text-2xl font-bold text-white mb-0.5">{m.value}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{m.label}</span>
                    <span className="text-xs font-semibold text-bright-green">{m.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[20px] p-6">
              <h2 className="text-sm font-bold text-white mb-4">Son Siparişler</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-left">
                      {['ID', 'Müşteri', 'Hizmet', 'Peyzajcı', 'Tutar', 'Durum', 'Tarih'].map(h => (
                        <th key={h} className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-white/30">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ALL_ORDERS.map((o, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                        <td className="px-3 py-3 text-white font-semibold">{o.id}</td>
                        <td className="px-3 py-3 text-white/60">{o.customer}</td>
                        <td className="px-3 py-3 text-white">{o.service}</td>
                        <td className="px-3 py-3 text-white/60">{o.provider}</td>
                        <td className="px-3 py-3 text-white font-semibold">₺{o.amount}</td>
                        <td className="px-3 py-3"><span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${STATUS_BADGES[o.status]}`}>{o.status === 'in-progress' ? 'Devam Ediyor' : o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
                        <td className="px-3 py-3 text-white/50">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div className="bg-white/5 border border-white/10 rounded-[20px] overflow-hidden">
            <div className="p-4 md:p-5 border-b border-white/5 flex items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Kullanıcı ara..." className="w-full bg-white/5 border border-white/10 rounded-[12px] pl-9 pr-4 py-3 text-xs text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
              <span className="text-xs text-white/30">{USERS.length} kullanıcı</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left">
                    {['Ad Soyad', 'E-posta', 'Rol', 'Kayıt Tarihi', 'Durum', 'İşlem'].map(h => (
                      <th key={h} className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-wider text-white/30">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {USERS.map((u, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                      <td className="px-4 py-3.5 text-white font-semibold">{u.name}</td>
                      <td className="px-4 py-3.5 text-white/60">{u.email}</td>
                      <td className="px-4 py-3.5 text-white/60">{u.role}</td>
                      <td className="px-4 py-3.5 text-white/50">{u.date}</td>
                      <td className="px-4 py-3.5"><span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${STATUS_BADGES[u.status]}`}>{u.status === 'active' ? 'Aktif' : 'Banlı'}</span></td>
                      <td className="px-4 py-3.5">
                        <button className="text-white/40 hover:text-white transition-colors">
                          {u.status === 'active' ? <Ban size={14} /> : <Check size={14} className="text-bright-green" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LANDSCAPERS */}
        {tab === 'landscapers' && (
          <div className="space-y-3">
            {LANDSCAPERS.map((l, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[16px] p-4 md:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bright-green/20 flex items-center justify-center text-bright-green font-bold text-lg shrink-0">{l.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm">{l.name}</h3>
                  <p className="text-xs text-white/50">{l.owner} · {l.email}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                    <span>{l.services} hizmet</span>
                    <span className="flex items-center gap-0.5 text-yellow-400"><Leaf size={11} />{l.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_BADGES[l.status]}`}>{l.status === 'approved' ? 'Onaylı' : 'Bekliyor'}</span>
                  {l.status === 'pending' && (
                    <div className="flex gap-1">
                      <button className="w-8 h-8 rounded-xl bg-bright-green/20 text-bright-green flex items-center justify-center hover:bg-bright-green/30"><Check size={14} /></button>
                      <button className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30"><X size={14} /></button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div className="bg-white/5 border border-white/10 rounded-[20px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left">
                    {['ID', 'Müşteri', 'Hizmet', 'Peyzajcı', 'Tutar', 'Durum', 'Tarih'].map(h => (
                      <th key={h} className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-wider text-white/30">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ALL_ORDERS.map((o, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                      <td className="px-4 py-3.5 text-white font-semibold">{o.id}</td>
                      <td className="px-4 py-3.5 text-white/60">{o.customer}</td>
                      <td className="px-4 py-3.5 text-white">{o.service}</td>
                      <td className="px-4 py-3.5 text-white/60">{o.provider}</td>
                      <td className="px-4 py-3.5 text-white font-semibold">₺{o.amount}</td>
                      <td className="px-4 py-3.5"><span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${STATUS_BADGES[o.status]}`}>{o.status === 'in-progress' ? 'Devam Ediyor' : o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
                      <td className="px-4 py-3.5 text-white/50">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COMPLAINTS */}
        {tab === 'complaints' && (
          <div className="space-y-3">
            {COMPLAINTS.map((c, i) => (
              <div key={c.id} className="bg-white/5 border border-white/10 rounded-[16px] p-4 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm">Şikayet #{c.id}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_BADGES[c.status]}`}>{c.status === 'open' ? 'Açık' : 'Çözüldü'}</span>
                    </div>
                    <p className="text-xs text-white/60"><strong className="text-white/80">{c.from}</strong> → {c.about}</p>
                    <p className="text-xs text-white/50 mt-1">{c.reason}</p>
                    <p className="text-[10px] text-white/30 mt-1">{c.date}</p>
                  </div>
                  {c.status === 'open' && (
                    <button className="px-3.5 py-2 bg-bright-green/20 text-bright-green rounded-[10px] text-xs font-semibold hover:bg-bright-green/30 transition-all shrink-0">Çözüldü İşaretle</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
