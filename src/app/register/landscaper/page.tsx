"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, ChevronRight, ChevronLeft, 
  User, Briefcase, FileText, Camera, 
  CheckCircle2, AlertCircle, Upload
} from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  { id: 1, title: 'Temel Bilgiler', icon: User },
  { id: 2, title: 'Mesleki Detaylar', icon: Briefcase },
  { id: 3, title: 'Evrak ve Onay', icon: FileText }
];

export default function LandscaperRegisterPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f5f7ee] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/40 backdrop-blur-3xl p-12 rounded-[3rem] border border-white text-center space-y-8 shadow-2xl"
        >
          <div className="inline-flex p-6 bg-[#4CAF50]/20 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-[#4CAF50]" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-black text-[#0A2E1A]">Başvurunuz Alındı!</h1>
            <p className="text-[#0A2E1A]/60 font-medium">
              Belgeleriniz incelenmek üzere admin ekibimize iletildi. Onaylandığında size e-posta ile bildireceğiz.
            </p>
          </div>
          <Link href="/" className="block w-full py-4 bg-[#4CAF50] text-white rounded-2xl font-black shadow-lg shadow-[#4CAF50]/20">
            Ana Sayfaya Dön
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7ee] flex flex-col md:flex-row font-sans">
      {/* Left Side: Branding & Progress */}
      <div className="w-full md:w-[450px] bg-[#0A2E1A] p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-20 -mr-20 animate-pulse" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className="logo-gradient text-2xl">Peyzart</span>
        </div>

        <div className="relative z-10 space-y-12 py-20">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-black leading-tight">Uzman Kadromuza Katılın</h2>
            <p className="text-white/70 font-medium text-lg">Profesyonelliğinizi belgelendirin, binlerce bahçe sahibine ulaşın.</p>
          </div>

          <div className="space-y-8">
            {STEPS.map((s) => (
              <div key={s.id} className="flex items-center gap-6 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${step >= s.id ? 'bg-white border-white text-primary' : 'bg-transparent border-white/30 text-white/30'}`}>
                   <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-white' : 'text-white/30'}`}>Adım {s.id}</p>
                  <p className={`text-base font-bold ${step >= s.id ? 'text-white' : 'text-white/30'}`}>{s.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs font-bold text-white/40 uppercase tracking-widest">
           &copy; 2026 Peyzart // Uzman Başvuru Paneli
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 p-6 md:p-20 flex items-center justify-center bg-[#f5f7ee]">
        <div className="max-w-xl w-full space-y-12">
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-4xl font-black text-[#0A2E1A] tracking-tight">Kişisel Bilgiler</h1>
                  <p className="text-[#0A2E1A]/60 font-bold">Profilinizde görünecek temel veriler.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-black text-[#0A2E1A]/70 uppercase tracking-widest ml-1">Ad Soyad / İşletme Adı</label>
                    <input className="w-full p-4 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl text-sm font-bold text-[#0A2E1A] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none placeholder:text-[#0A2E1A]/30" placeholder="Örn: Zeytin Peyzaj" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0A2E1A]/70 uppercase tracking-widest ml-1">E-posta</label>
                    <input className="w-full p-4 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl text-sm font-bold text-[#0A2E1A] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none placeholder:text-[#0A2E1A]/30" placeholder="info@zeytin.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0A2E1A]/70 uppercase tracking-widest ml-1">Telefon</label>
                    <input className="w-full p-4 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl text-sm font-bold text-[#0A2E1A] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none placeholder:text-[#0A2E1A]/30" placeholder="+90 5XX ..." />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-4xl font-black text-[#0A2E1A] tracking-tight">Uzmanlık Alanları</h1>
                  <p className="text-[#0A2E1A]/60 font-bold">Sunduğunuz hizmetleri ve fiyatlandırmayı belirleyin.</p>
                </div>

                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      {['Çim Biçme', 'Budama', 'Tasarım', 'Sulama', 'İlaçlama', 'Ağaç Dikimi'].map(s => (
                      <div key={s} className="flex items-center gap-4 p-4 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl hover:border-[#4CAF50]/40 cursor-pointer transition-colors group">
                      <div className="w-5 h-5 rounded border-2 border-[#4CAF50]/20 group-hover:bg-[#4CAF50] group-hover:border-[#4CAF50] transition-all" />
                      <span className="text-sm font-bold text-[#0A2E1A]/80">{s}</span>
                      </div>
                      ))}
                   </div>
                   <div className="space-y-2 pt-4">
                    <label className="text-xs font-black text-[#0A2E1A]/70 uppercase tracking-widest ml-1">Kısa Biyografi</label>
                    <textarea className="w-full p-4 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl text-sm font-bold text-[#0A2E1A] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none h-32 placeholder:text-[#0A2E1A]/30" placeholder="Tecrübenizden ve tarzınızdan bahsedin..." />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-4xl font-black text-[#0A2E1A] tracking-tight">Belge Yükleme</h1>
                  <p className="text-[#0A2E1A]/60 font-bold">Güvenlik ve doğrulama için gerekli evraklar.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Kimlik / Ehliyet', icon: User },
                    { label: 'Mesleki Sertifika', icon: FileText },
                    { label: 'İmza Sirküleri', icon: FileText },
                    { label: 'Referans Fotoğrafları', icon: Camera },
                  ].map((doc, i) => (
                    <div key={i} className="group relative p-8 bg-[#eef1e3] border-2 border-dashed border-[#d0d8bf] rounded-3xl hover:bg-[#e4e8d6] hover:border-[#4CAF50]/40 transition-all text-center space-y-4 cursor-pointer">
                        <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm text-[#4CAF50] group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-black text-[#0A2E1A]">{doc.label}</p>
                          <p className="text-[10px] font-bold text-[#0A2E1A]/40">PDF, JPG veya PNG</p>
                        </div>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                  <p className="text-xs font-bold text-yellow-700 leading-relaxed">
                    Yüklenen belgeler KVKK kapsamında şifrelenir ve sadece onay ekibimiz tarafından görüntülenir.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between pt-12 border-t border-[#d0d8bf]">
            <button 
              onClick={prevStep} 
              disabled={step === 1}
              className={`flex items-center gap-2 text-sm font-black text-[#0A2E1A]/40 hover:text-[#4CAF50] transition-colors ${step === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="w-5 h-5" />
              Geri
            </button>
            <button 
              onClick={step === 3 ? () => setIsSubmitted(true) : nextStep}
              className="flex items-center gap-3 px-10 py-5 bg-[#4CAF50] text-white rounded-[2rem] font-black shadow-xl shadow-[#4CAF50]/30 hover:scale-105 active:scale-95 transition-all"
            >
              {step === 3 ? 'Başvuruyu Gönder' : 'Sonraki Adım'}
              {step !== 3 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
