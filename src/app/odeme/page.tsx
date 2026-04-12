"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, CreditCard, Lock, ChevronRight, 
  MapPin, Calendar, Sprout, Star, CheckCircle2,
  AlertCircle, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [paymentMethod, setActiveMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call to Iyzico/Stripe
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-nature-mesh flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/40 backdrop-blur-3xl p-12 rounded-[3rem] border border-white text-center space-y-8 shadow-2xl"
        >
          <div className="inline-flex p-6 bg-primary/20 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-black text-primary-dark uppercase italic tracking-tighter">Ödeme Başarılı!</h1>
            <p className="text-primary-dark/60 font-bold leading-relaxed">
              Bahçeniz için ilk adım atıldı. Peyzajcınız talebinizi onayladığında size haber vereceğiz.
            </p>
          </div>
          <Link href="/siparis-takip" className="block w-full py-5 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/30 uppercase italic tracking-widest hover:scale-105 transition-transform">
            Siparişi Takip Et
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-mesh font-sans p-6 md:p-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left: Payment Form */}
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
             <Link href="/kesfet" className="inline-flex items-center gap-2 text-primary-dark/40 hover:text-primary font-black uppercase text-[10px] tracking-widest transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" />
                Geri Dön
             </Link>
             <h1 className="text-5xl font-black text-primary-dark tracking-tighter uppercase italic">Güvenli Ödeme</h1>
             <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 w-fit">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">256-Bit SSL Sertifikalı Koruma</span>
             </div>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 gap-4">
             <button 
               onClick={() => setActiveMethod('card')}
               className={`p-6 rounded-[2rem] border transition-all flex flex-col gap-4 text-left ${paymentMethod === 'card' ? 'bg-primary border-primary shadow-xl shadow-primary/20 text-white' : 'bg-white/60 border-white hover:border-primary/20 text-primary-dark'}`}
             >
                <CreditCard className="w-8 h-8" />
                <div>
                   <p className="text-xs font-black uppercase tracking-widest opacity-60">Seçenek 1</p>
                   <p className="text-base font-black">Kredi / Banka Kartı</p>
                </div>
             </button>
             <button 
               onClick={() => setActiveMethod('wallet')}
               className={`p-6 rounded-[2rem] border transition-all flex flex-col gap-4 text-left ${paymentMethod === 'wallet' ? 'bg-primary border-primary shadow-xl shadow-primary/20 text-white' : 'bg-white/60 border-white hover:border-primary/20 text-primary-dark'}`}
             >
                <div className="w-8 h-8 flex items-center justify-center font-black italic text-xl">P</div>
                <div>
                   <p className="text-xs font-black uppercase tracking-widest opacity-60">Seçenek 2</p>
                   <p className="text-base font-black">Peyzart Cüzdan</p>
                </div>
             </button>
          </div>

          {/* Card Details Form */}
          <div className="bg-white/60 backdrop-blur-3xl p-10 rounded-[3rem] border border-white shadow-2xl shadow-primary/5 space-y-8">
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-primary-dark/40 uppercase tracking-[0.2em] ml-2">Kart Üzerindeki İsim</label>
                   <input className="w-full p-5 bg-white border border-primary/5 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all" placeholder="AD SOYAD" />
                </div>
                <div className="space-y-2 relative">
                   <label className="text-[10px] font-black text-primary-dark/40 uppercase tracking-[0.2em] ml-2">Kart Numarası</label>
                   <input className="w-full p-5 bg-white border border-primary/5 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all" placeholder="0000 0000 0000 0000" />
                   <div className="absolute right-5 bottom-5 flex gap-2">
                      <div className="w-8 h-5 bg-gray-100 rounded" />
                      <div className="w-8 h-5 bg-gray-100 rounded" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-dark/40 uppercase tracking-[0.2em] ml-2">Son Kullanma</label>
                      <input className="w-full p-5 bg-white border border-primary/5 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all" placeholder="AA / YY" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-dark/40 uppercase tracking-[0.2em] ml-2">CVC / CVV</label>
                      <div className="relative">
                         <input className="w-full p-5 bg-white border border-primary/5 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all" placeholder="000" />
                         <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-dark/20" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-100 rounded-2xl">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                <p className="text-[10px] font-bold text-yellow-700 leading-tight">Kart bilgileriniz sistemlerimizde asla saklanmaz. Ödemeniz Iyzico güvencesiyle 3D Secure katmanında gerçekleşir.</p>
             </div>

             <button 
               onClick={handlePayment}
               disabled={isProcessing}
               className="w-full py-6 bg-primary text-white rounded-[2rem] font-black shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
             >
                {isProcessing ? (
                   <>
                      <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                      İŞLENİYOR...
                   </>
                ) : (
                   <>
                      ÖDEMEYİ TAMAMLA (₺450.00)
                      <ChevronRight className="w-5 h-5" />
                   </>
                )}
             </button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-[400px] space-y-8">
           <div className="sticky top-12 space-y-8">
              <div className="p-10 bg-white/60 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl shadow-primary/5 space-y-8">
                 <h3 className="text-xl font-black text-primary-dark uppercase italic tracking-tighter border-b border-primary/5 pb-6">Sipariş Özeti</h3>
                 
                 {/* Landscaper Preview */}
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 overflow-hidden shadow-inner">
                       <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="text-base font-black text-primary-dark">Bahçe Sanatı Peyzaj</p>
                       <div className="flex items-center text-yellow-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[10px] font-black ml-1">4.8 // 124 Yorum</span>
                       </div>
                    </div>
                 </div>

                 {/* Service Details */}
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 text-primary-dark/60">
                       <div className="p-2 bg-primary/10 rounded-lg text-primary"><Sprout className="w-4 h-4" /></div>
                       <p className="text-xs font-bold uppercase tracking-widest">Çim Biçme & Budama</p>
                    </div>
                    <div className="flex items-center gap-4 text-primary-dark/60">
                       <div className="p-2 bg-primary/10 rounded-lg text-primary"><MapPin className="w-4 h-4" /></div>
                       <p className="text-xs font-bold uppercase tracking-widest">Zekeriyaköy, Villa Cad.</p>
                    </div>
                    <div className="flex items-center gap-4 text-primary-dark/60">
                       <div className="p-2 bg-primary/10 rounded-lg text-primary"><Calendar className="w-4 h-4" /></div>
                       <p className="text-xs font-bold uppercase tracking-widest">12 Nisan // 14:00</p>
                    </div>
                 </div>

                 {/* Totals */}
                 <div className="space-y-3 pt-8 border-t border-primary/5">
                    <div className="flex justify-between items-center text-sm font-bold text-primary-dark/40 uppercase">
                       <span>Hizmet Bedeli</span>
                       <span>₺420.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-primary-dark/40 uppercase">
                       <span>İşlem Ücreti</span>
                       <span>₺30.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                       <span className="text-lg font-black text-primary-dark uppercase italic">Toplam</span>
                       <span className="text-3xl font-black text-primary">₺450.00</span>
                    </div>
                 </div>
              </div>

              {/* Discount Code */}
              <div className="p-6 bg-white/40 rounded-3xl border border-white flex gap-3">
                 <input className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold placeholder:text-primary-dark/20" placeholder="İNDİRİM KODU" />
                 <button className="px-6 py-2 bg-primary-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">UYGULA</button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
