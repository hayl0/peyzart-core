"use client";

import { motion } from 'framer-motion';
import { 
  Sprout, MapPin, Clock, Calendar, 
  CheckCircle2, Package, Truck, Star, 
  MessageSquare, Phone, ChevronLeft, ShoppingBag
} from 'lucide-react';
import Link from 'next/link';

const ORDER_STEPS = [
  { id: 'pending', label: 'Sipariş Verildi', desc: 'Talebiniz peyzajcıya iletildi.', icon: Package, status: 'completed' },
  { id: 'accepted', label: 'Onaylandı', desc: 'Peyzajcı işi kabul etti.', icon: CheckCircle2, status: 'current' },
  { id: 'on-way', label: 'Yolda', desc: 'Uzman yola çıktı.', icon: Truck, status: 'upcoming' },
  { id: 'completed', label: 'Tamamlandı', desc: 'Hizmet başarıyla bitti.', icon: Star, status: 'upcoming' },
];

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-nature-mesh font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
           <Link href="/kesfet" className="flex items-center gap-2 text-primary-dark/40 hover:text-primary font-black uppercase text-[10px] tracking-widest transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Keşfe Dön
           </Link>
           <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl">
                 <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-primary-dark tracking-tighter uppercase">Peyzart</span>
           </div>
        </div>

        {/* Order Info Card */}
        <div className="bg-white/60 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white shadow-2xl shadow-primary/5 flex flex-col md:flex-row gap-12">
           
           {/* Left: Status Timeline */}
           <div className="flex-1 space-y-12">
              <div className="space-y-2">
                 <h1 className="text-4xl font-black text-primary-dark tracking-tight uppercase italic">Sipariş Takibi</h1>
                 <p className="text-primary-dark/40 font-bold">Takip No: #PRT-84291</p>
              </div>

              <div className="relative space-y-12 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-primary before:via-primary/20 before:to-transparent">
                 {ORDER_STEPS.map((step, i) => (
                    <div key={step.id} className="relative flex items-start gap-10 group">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 ${step.status === 'completed' ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : step.status === 'current' ? 'bg-white border-4 border-primary text-primary scale-125 shadow-xl' : 'bg-white border-2 border-primary/10 text-primary/20'}`}>
                          <step.icon className="w-5 h-5" />
                       </div>
                       <div className={`flex-1 pt-1 ${step.status === 'upcoming' ? 'opacity-40' : 'opacity-100'}`}>
                          <h3 className={`text-lg font-black ${step.status === 'current' ? 'text-primary' : 'text-primary-dark'}`}>{step.label}</h3>
                          <p className="text-sm font-bold text-primary-dark/40">{step.desc}</p>
                          {step.status === 'current' && (
                             <motion.div 
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               className="mt-4 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                             >
                               <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                               </span>
                               Canlı Güncelleme
                             </motion.div>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Right: Landscaper & Service Details */}
           <div className="w-full md:w-[350px] space-y-8">
              
              {/* Landscaper Card */}
              <div className="p-8 bg-primary text-white rounded-[2.5rem] shadow-xl shadow-primary/20 space-y-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mt-10 -mr-10" />
                 <h3 className="text-xs font-black uppercase tracking-widest relative z-10">Atanan Uzman</h3>
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="text-xl font-black">Mehmet Yeşil</p>
                       <div className="flex items-center text-white/60">
                          <Star className="w-3 h-3 fill-white/60 mr-1" />
                          <span className="text-xs font-bold">4.9 // 124 İş</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex gap-2 relative z-10">
                    <button className="flex-1 py-3 bg-white text-primary rounded-xl font-black text-[10px] uppercase hover:scale-105 transition-transform">Mesaj Gönder</button>
                    <button className="p-3 bg-white/20 rounded-xl hover:bg-white/40"><Phone className="w-4 h-4" /></button>
                 </div>
              </div>

              {/* Service Details Card */}
              <div className="p-8 bg-white rounded-[2.5rem] border border-primary/5 shadow-lg space-y-6">
                 <h3 className="text-xs font-black text-primary-dark/40 uppercase tracking-widest">Hizmet Detayları</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-primary/10 rounded-lg text-primary"><Calendar className="w-4 h-4" /></div>
                       <p className="text-sm font-bold text-primary-dark">12 Nisan 2026 // 14:00</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-primary/10 rounded-lg text-primary"><MapPin className="w-4 h-4" /></div>
                       <p className="text-sm font-bold text-primary-dark">Zekeriyaköy, Villa Cad. No:42</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-primary/10 rounded-lg text-primary"><ShoppingBag className="w-4 h-4" /></div>
                       <p className="text-sm font-bold text-primary-dark">Çim Biçme & Budama (150m2)</p>
                    </div>
                 </div>
                 <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-xs font-bold text-primary-dark/40 uppercase">Toplam Tutar</p>
                    <p className="text-xl font-black text-primary-dark">₺450.00</p>
                 </div>
              </div>

              {/* Support Button */}
              <button className="w-full py-5 border-2 border-dashed border-primary/20 rounded-2xl text-[10px] font-black text-primary-dark/40 uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all">
                 Yardım Lazım mı?
              </button>
           </div>

        </div>

        {/* Live Map Preview (Simulation) */}
        <div className="h-[400px] w-full bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white shadow-xl overflow-hidden relative group">
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                 <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <Truck className="w-12 h-12 text-primary relative z-10 animate-float" />
                 </div>
                 <p className="text-sm font-black text-primary-dark uppercase tracking-widest">Canlı Takip Hazırlanıyor...</p>
                 <p className="text-xs font-bold text-primary-dark/40">Mehmet Bey'in anlık konumu 5 dakika içinde görünecek.</p>
              </div>
           </div>
           {/* Mock Map Background Overlay */}
           <div className="absolute inset-0 bg-nature-mesh opacity-20 pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
