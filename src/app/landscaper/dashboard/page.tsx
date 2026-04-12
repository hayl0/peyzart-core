"use client";

import { 
  TrendingUp, Clock, CheckCircle2, XCircle, 
  MapPin, Calendar, Wallet, Settings, 
  ToggleRight, ToggleLeft, MoreVertical, 
  ShoppingBag, Bell, MessageCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';
import { useState } from 'react';

const REVENUE_DATA = [
  { day: 'Pzt', amount: 1200 },
  { day: 'Sal', amount: 950 },
  { day: 'Çar', amount: 2100 },
  { day: 'Per', amount: 1400 },
  { day: 'Cum', amount: 3200 },
  { day: 'Cmt', amount: 4500 },
  { day: 'Paz', amount: 3800 },
];

const JOB_REQUESTS = [
  { id: '1', customer: 'Ayşe Yılmaz', service: 'Çim Biçme & Budama', location: 'Zekeriyaköy', price: 450, date: 'Bugün // 14:00' },
  { id: '2', customer: 'Burak Demir', service: 'Otomatik Sulama Kurulumu', location: 'Tarabya', price: 1200, date: 'Yarın // 10:00' },
  { id: '3', customer: 'Caner Kaya', service: 'Ağaç İlaçlama', location: 'Beykoz', price: 350, date: '15 Nisan // 11:30' },
];

export default function LandscaperDashboard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-nature-mesh font-sans flex overflow-hidden">
      
      {/* Side Navigation: Landscaper Pro */}
      <div className="w-24 md:w-72 bg-white/80 backdrop-blur-3xl border-r border-white/20 p-6 md:p-10 flex flex-col justify-between z-30">
        <div className="space-y-12">
           <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
                 <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="hidden md:inline text-xl font-black text-primary-dark tracking-tighter uppercase italic">Peyzart Pro</span>
           </div>

           <div className="space-y-4">
              {[
                { id: 'home', label: 'Panel', icon: TrendingUp },
                { id: 'jobs', label: 'Talepler', icon: ShoppingBag, count: 3 },
                { id: 'messages', label: 'Mesajlar', icon: MessageCircle },
                { id: 'settings', label: 'Ayarlar', icon: Settings },
              ].map((item) => (
                <button key={item.id} className="w-full flex items-center gap-4 p-4 rounded-2xl font-black text-sm text-primary-dark/40 hover:bg-primary/5 hover:text-primary transition-all group">
                   <div className="relative">
                      <item.icon className="w-6 h-6" />
                      {item.count && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full border-2 border-white">{item.count}</span>}
                   </div>
                   <span className="hidden md:inline">{item.label}</span>
                </button>
              ))}
           </div>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
           {isOpen ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
           <span className="hidden md:inline text-xs font-black uppercase tracking-widest">{isOpen ? 'Açık' : 'Kapalı'}</span>
        </button>
      </div>

      {/* Main Experience Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-16">
        <div className="max-w-6xl mx-auto space-y-12">
           
           {/* Dynamic Greeting */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                 <h1 className="text-5xl font-black text-primary-dark tracking-tighter uppercase italic">Hoş Geldin, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Zeytin Peyzaj</span></h1>
                 <p className="text-primary-dark/40 font-bold">Bugün 12 Nisan 2026. Bekleyen 3 yeni iş talebiniz var.</p>
              </div>
              <div className="flex items-center gap-4 bg-white/40 p-4 rounded-3xl border border-white">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-primary/60 uppercase">Haftalık Kazanç</p>
                    <p className="text-2xl font-black text-primary-dark">₺16,950</p>
                 </div>
                 <div className="h-10 w-px bg-primary/10 mx-2" />
                 <Bell className="w-6 h-6 text-primary-dark/30 cursor-pointer hover:text-primary transition-colors" />
              </div>
           </div>

           {/* Revenue Deep Dive (Obsidian Vizyonuna Göre) */}
           <div className="p-10 bg-white/60 backdrop-blur-md rounded-[3rem] border border-white shadow-2xl shadow-primary/5">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-lg font-black text-primary-dark uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Performans Analitiği
                 </h3>
                 <div className="flex gap-2">
                    {['Hafta', 'Ay', 'Yıl'].map(t => (
                      <button key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${t === 'Hafta' ? 'bg-primary text-white' : 'bg-primary/5 text-primary'}`}>{t}</button>
                    ))}
                 </div>
              </div>
              <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA}>
                       <defs>
                          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8F5E9" />
                       <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#2E7D32', fontWeight: 'bold', fontSize: 12}} />
                       <YAxis hide />
                       <Tooltip 
                          contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold'}}
                       />
                       <Area type="monotone" dataKey="amount" stroke="#2E7D32" strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Job Requests: The Marketplace Engine */}
           <div className="space-y-6">
              <h3 className="text-xl font-black text-primary-dark uppercase italic tracking-tighter px-4">Yeni Hizmet Talepleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {JOB_REQUESTS.map((job) => (
                    <motion.div 
                      key={job.id} 
                      whileHover={{ y: -10 }}
                      className="p-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl shadow-primary/5 space-y-6 relative overflow-hidden group"
                    >
                       <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                       
                       <div className="space-y-2 relative z-10">
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">{job.service}</p>
                          <h4 className="text-2xl font-black text-primary-dark">{job.customer}</h4>
                       </div>

                       <div className="space-y-3 relative z-10">
                          <div className="flex items-center gap-3 text-xs font-bold text-primary-dark/60">
                             <MapPin className="w-4 h-4 text-primary" />
                             {job.location}
                          </div>
                          <div className="flex items-center gap-3 text-xs font-bold text-primary-dark/60">
                             <Clock className="w-4 h-4 text-primary" />
                             {job.date}
                          </div>
                       </div>

                       <div className="pt-6 border-t border-primary/5 flex items-center justify-between relative z-10">
                          <div>
                             <p className="text-[10px] font-black text-primary-dark/30 uppercase">Teklif</p>
                             <p className="text-xl font-black text-primary-dark">₺{job.price}</p>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"><XCircle className="w-5 h-5" /></button>
                             <button className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors shadow-lg shadow-green-500/20"><CheckCircle2 className="w-5 h-5" /></button>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* Active Work Progress (Obsidian VibeKanban Preview) */}
           <div className="p-10 bg-primary text-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(46,125,50,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-20 -mr-20" />
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
                       <Clock className="w-4 h-4 animate-spin-slow" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Şu Anki İş</span>
                    </div>
                    <h3 className="text-3xl font-black">Mesa Villaları Peyzaj Bakımı</h3>
                    <p className="text-primary-light font-bold">Tamamlanma: %65 // Kalan Süre: 45 dk</p>
                 </div>
                 <button className="px-10 py-5 bg-white text-primary rounded-3xl font-black text-sm shadow-xl hover:scale-105 transition-transform uppercase italic tracking-widest">Giriş Yap / Bitir</button>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
}
