"use client";

import { motion } from 'framer-motion';
import { 
  Wallet, Plus, ArrowUpRight, ArrowDownLeft, 
  History, CreditCard, ShieldCheck, ChevronRight,
  TrendingUp, RefreshCw, Sprout
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const TRANSACTIONS = [
  { id: '1', title: 'Bakiye Yükleme', amount: '+ ₺1,000.00', type: 'DEPOSIT', date: 'Bugün, 14:20', status: 'SUCCESS' },
  { id: '2', title: 'Bahçe Bakım Ödemesi', amount: '- ₺450.00', type: 'PAYMENT', date: 'Dün, 09:15', status: 'SUCCESS' },
  { id: '3', title: 'Budama Hizmeti İadesi', amount: '+ ₺150.00', type: 'REFUND', date: '10 Nisan, 11:30', status: 'SUCCESS' },
];

export default function WalletPage() {
  const [balance, setBalance] = useState(700.00);

  return (
    <div className="min-h-screen bg-nature-mesh font-sans p-6 md:p-12 overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Wallet Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                 <ShieldCheck className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-black text-primary uppercase tracking-widest">Peyzart Güvenli Cüzdan</span>
              </div>
              <h1 className="text-5xl font-black text-primary-dark tracking-tighter uppercase italic">Cüzdanım</h1>
           </div>
           <div className="flex gap-3">
              <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/30 hover:scale-105 transition-transform group">
                 <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                 Bakiye Yükle
              </button>
           </div>
        </div>

        {/* Main Wallet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           
           {/* Left: The Card & Quick Stats */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* Apple-style Credit Card */}
              <motion.div 
                whileHover={{ rotateY: 5, rotateX: -5 }}
                style={{ perspective: 1000 }}
                className="relative h-64 md:h-80 w-full rounded-[3rem] bg-gradient-to-br from-primary-dark via-primary to-accent p-12 text-white shadow-2xl overflow-hidden group cursor-pointer"
              >
                 <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mt-20 -mr-20 animate-pulse" />
                 
                 <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                       <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20">
                             <Sprout className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xl font-black tracking-tighter uppercase">Peyzart</span>
                       </div>
                       <CreditCard className="w-10 h-10 text-white/40" />
                    </div>

                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">Mevcut Bakiye</p>
                       <div className="flex items-baseline gap-2">
                          <span className="text-5xl md:text-7xl font-black tracking-tighter">₺{balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                          <span className="text-xl font-bold opacity-60 italic">TRY</span>
                       </div>
                    </div>

                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Hesap Sahibi</p>
                          <p className="text-sm font-bold uppercase tracking-widest">HALIL IBRAHIM DEMIR</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Cüzdan ID</p>
                          <p className="text-sm font-mono opacity-60 tracking-widest">**** 8429</p>
                       </div>
                    </div>
                 </div>
              </motion.div>

              {/* Quick Actions Bar */}
              <div className="grid grid-cols-3 gap-6">
                 {[
                   { label: 'Gönder', icon: ArrowUpRight, color: 'text-blue-600', bg: 'bg-blue-100' },
                   { label: 'İade Al', icon: ArrowDownLeft, color: 'text-orange-600', bg: 'bg-orange-100' },
                   { label: 'Özet', icon: History, color: 'text-purple-600', bg: 'bg-purple-100' },
                 ].map((action, i) => (
                    <button key={i} className="p-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl hover:scale-105 transition-all flex flex-col items-center gap-4 group">
                       <div className={`w-14 h-14 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                          <action.icon className="w-6 h-6" />
                       </div>
                       <span className="text-[10px] font-black text-primary-dark/60 uppercase tracking-widest">{action.label}</span>
                    </button>
                 ))}
              </div>
           </div>

           {/* Right: Transaction History */}
           <div className="space-y-8">
              <div className="p-10 bg-white/60 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl shadow-primary/5 space-y-8 h-full">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-primary-dark uppercase italic tracking-tighter">Son İşlemler</h3>
                    <button className="p-2 hover:rotate-180 transition-transform duration-700">
                       <RefreshCw className="w-4 h-4 text-primary-dark/20" />
                    </button>
                 </div>

                 <div className="space-y-6">
                    {TRANSACTIONS.map((t) => (
                       <div key={t.id} className="flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-4">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${t.type === 'PAYMENT' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {t.type === 'PAYMENT' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                             </div>
                             <div>
                                <p className="text-sm font-black text-primary-dark group-hover:text-primary transition-colors">{t.title}</p>
                                <p className="text-[10px] font-bold text-primary-dark/40">{t.date}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className={`text-sm font-black ${t.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{t.amount}</p>
                             <p className="text-[8px] font-black text-primary-dark/20 uppercase tracking-widest">{t.status}</p>
                          </div>
                       </div>
                    ))}
                 </div>

                 <button className="w-full py-5 border-2 border-dashed border-primary/10 rounded-[2rem] text-[10px] font-black text-primary-dark/40 uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2">
                    Tüm Geçmişi Gör
                    <ChevronRight className="w-4 h-4" />
                 </button>

                 {/* Insights Preview */}
                 <div className="pt-8 border-t border-primary/5 space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-primary/10 rounded-lg text-primary"><TrendingUp className="w-4 h-4" /></div>
                       <p className="text-[10px] font-black text-primary-dark/60 uppercase tracking-widest">Harcama Analizi</p>
                    </div>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black text-primary-dark uppercase">
                             <span>Bahçe Bakımı</span>
                             <span>75%</span>
                          </div>
                          <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
                             <div className="h-full w-3/4 bg-primary rounded-full" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black text-primary-dark uppercase">
                             <span>Diğer</span>
                             <span>25%</span>
                          </div>
                          <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
                             <div className="h-full w-1/4 bg-accent rounded-full" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
