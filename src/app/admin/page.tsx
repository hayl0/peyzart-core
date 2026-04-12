"use client";

import { 
  Users, Briefcase, ShoppingBag, TrendingUp, 
  CheckCircle, XCircle, Clock, Search, 
  LayoutDashboard, Bell, Settings, Filter, MoreHorizontal
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { useState } from 'react';

// Mock Data (Real data from DB)
const STATS = [
  { label: 'Toplam Müşteri', value: '2,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Aktif Peyzajcı', value: '185', icon: Briefcase, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Bekleyen Sipariş', value: '42', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  { label: 'Aylık Ciro', value: '₺84,200', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const REVENUE_DATA = [
  { name: 'Ocak', total: 45000 },
  { name: 'Şubat', total: 52000 },
  { name: 'Mart', total: 68000 },
  { name: 'Nisan', total: 84200 },
];

const PENDING_APPLICATIONS = [
  { id: '1', name: 'Zeytin Peyzaj', city: 'İstanbul', status: 'Inceleniyor', date: '2 saat önce' },
  { id: '2', name: 'Yeşil Bahçem', city: 'İzmir', status: 'Evrak Bekliyor', date: '5 saat önce' },
  { id: '3', name: 'Elite Garden', city: 'Ankara', status: 'Yeni', date: '1 gün önce' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-nature-mesh font-sans flex overflow-hidden">
      {/* Sidebar: Command Center Navigation */}
      <div className="w-72 bg-white/80 backdrop-blur-3xl border-r border-white/20 p-8 flex flex-col justify-between z-30">
        <div className="space-y-12">
          <div className="flex items-center gap-3">
             <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
                <LayoutDashboard className="w-6 h-6 text-white" />
             </div>
             <span className="text-xl font-black text-primary-dark tracking-tighter uppercase">Peyzart Admin</span>
          </div>

          <div className="space-y-3">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: LayoutDashboard },
              { id: 'applications', label: 'Başvurular', icon: Briefcase },
              { id: 'orders', label: 'Siparişler', icon: ShoppingBag },
              { id: 'users', label: 'Kullanıcılar', icon: Users },
              { id: 'settings', label: 'Sistem Ayarları', icon: Settings },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105' : 'text-primary-dark/40 hover:bg-primary/5 hover:text-primary'}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
           <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Hesap</p>
           <p className="text-sm font-black text-primary-dark">Halil İbrahim</p>
           <p className="text-xs font-bold text-primary-dark/40">Sistem Yöneticisi</p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-primary-dark tracking-tight uppercase italic">Kontrol Merkezi</h1>
              <p className="text-primary-dark/40 font-bold">Peyzart ekosistemi parmaklarınızın ucunda.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Bell className="w-6 h-6 text-primary-dark/40 cursor-pointer hover:text-primary transition-colors" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
               </div>
               <div className="w-12 h-12 rounded-2xl bg-primary/10 border-2 border-white shadow-sm overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Halil+İbrahim&background=2E7D32&color=fff" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="p-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl shadow-primary/5 space-y-4 hover:scale-105 transition-transform cursor-pointer group">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-primary-dark/40 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-2xl font-black text-primary-dark">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-8">
               <div className="p-10 bg-white/60 backdrop-blur-md rounded-[3rem] border border-white shadow-xl shadow-primary/5">
                  <div className="flex items-center justify-between mb-10">
                     <h3 className="text-xl font-black text-primary-dark uppercase">Büyüme İstatistikleri</h3>
                     <select className="bg-primary/5 border-0 rounded-xl text-xs font-black text-primary px-4 py-2">
                        <option>Son 6 Ay</option>
                        <option>Son 1 Yıl</option>
                     </select>
                  </div>
                  <div className="h-[300px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={REVENUE_DATA}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8F5E9" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#2E7D32', fontWeight: 'bold', fontSize: 12}} />
                           <YAxis axisLine={false} tickLine={false} tick={{fill: '#2E7D32', fontWeight: 'bold', fontSize: 12}} />
                           <Tooltip 
                              cursor={{fill: '#F1F8E9'}}
                              contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold'}}
                           />
                           <Bar dataKey="total" fill="#2E7D32" radius={[10, 10, 0, 0]} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               {/* Recent Orders Overview */}
               <div className="p-10 bg-white/60 backdrop-blur-md rounded-[3rem] border border-white shadow-xl shadow-primary/5">
                  <h3 className="text-xl font-black text-primary-dark uppercase mb-10">Sistemdeki Siparişler</h3>
                  <div className="space-y-6">
                     {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white/40 rounded-3xl border border-white/50 hover:bg-white/80 transition-all cursor-pointer">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                                 <Clock className="w-6 h-6" />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-primary-dark">Sipariş #PRT-00{i}</p>
                                 <p className="text-xs font-bold text-primary-dark/40">Zeytin Peyzaj // İstanbul</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-10">
                              <div className="text-right">
                                 <p className="text-sm font-black text-primary-dark">₺450.00</p>
                                 <p className="text-[10px] font-bold text-primary-dark/40 uppercase">Kart Ödemesi</p>
                              </div>
                              <MoreHorizontal className="w-5 h-5 text-primary-dark/20" />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Application List Section */}
            <div className="space-y-8">
               <div className="p-8 bg-primary text-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(46,125,50,0.3)] space-y-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10" />
                  <div className="flex items-center justify-between relative z-10">
                     <h3 className="text-lg font-black uppercase tracking-widest">Yeni Başvurular</h3>
                     <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black">8 Toplam</span>
                  </div>
                  
                  <div className="space-y-4 relative z-10">
                     {PENDING_APPLICATIONS.map((app) => (
                        <div key={app.id} className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                           <div className="flex justify-between items-start mb-4">
                              <div>
                                 <p className="text-base font-black leading-tight">{app.name}</p>
                                 <p className="text-[10px] font-bold text-white/50">{app.city} // {app.date}</p>
                              </div>
                              <span className="text-[9px] font-black uppercase bg-white text-primary px-3 py-1 rounded-full">{app.status}</span>
                           </div>
                           <div className="flex gap-2">
                              <button className="flex-1 py-3 bg-white text-primary rounded-xl font-black text-[10px] uppercase shadow-lg shadow-black/10 hover:scale-105 transition-transform">İncele</button>
                              <button className="p-3 bg-white/20 rounded-xl hover:bg-white/40"><CheckCircle className="w-4 h-4 text-white" /></button>
                           </div>
                        </div>
                     ))}
                  </div>
                  <button className="w-full py-4 bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/20 rounded-2xl transition-all">Tümünü Gör</button>
               </div>

               {/* Notifications / Alerts */}
               <div className="p-8 bg-white/60 backdrop-blur-md rounded-[3rem] border border-white shadow-xl shadow-primary/5 space-y-6">
                  <h3 className="text-lg font-black text-primary-dark uppercase">Sistem Mesajları</h3>
                  <div className="space-y-4">
                     <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3">
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-xs font-bold text-red-700 leading-tight">Sunucu yedekleme işlemi hatası! Lütfen sistemi kontrol edin.</p>
                     </div>
                     <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                        <Bell className="w-5 h-5 text-blue-500 shrink-0" />
                        <p className="text-xs font-bold text-blue-700 leading-tight">Yeni sürüm (v1.2.4) güncellemeleri başarıyla yüklendi.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
