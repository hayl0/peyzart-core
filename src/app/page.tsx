"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Sparkles, Sprout, 
  ShieldCheck, Star, ChevronRight, 
  ArrowRight, Heart, Droplets, Camera,
  CheckCircle2, Play
} from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { GardenScene } from '@/components/visuals/GardenScene';
import { GardenAnalyzer } from '@/components/ai/GardenAnalyzer';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Entrance
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", { y: -20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
      
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out"
      });

      gsap.from(".hero-desc", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
      gsap.from(".hero-cta", { scale: 0.8, opacity: 0, duration: 1, delay: 0.8, ease: "back.out(1.7)" });

      // Scroll Reveal Animations
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".feature-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".ai-section-content", {
        scrollTrigger: {
          trigger: ".ai-section",
          start: "top 70%",
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col min-h-screen bg-nature-mesh font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* Premium Glass Nav */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-16 backdrop-blur-2xl sticky top-0 z-50 bg-white/40 border-b border-white/20">
        <div className="flex items-center gap-3 group cursor-pointer nav-item">
          <div className="bg-primary p-3 rounded-2xl shadow-2xl shadow-primary/20 group-hover:rotate-[15deg] transition-all duration-500 ring-4 ring-white">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-primary-dark tracking-tighter uppercase italic">Peyzart</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-primary-dark/50">
          {['Hizmetler', 'Yapay Zeka', 'Nasıl Çalışır?', 'Peyzajcılar'].map((item) => (
            <Link key={item} href={`#${item}`} className="nav-item hover:text-primary transition-all relative group py-2">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <Link href="/login" className="nav-item text-xs font-black uppercase tracking-widest text-primary-dark/70 hover:text-primary">Giriş</Link>
          <Link href="/register" className="nav-item relative group bg-primary text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 overflow-hidden ring-4 ring-white">
            <span className="relative z-10">Hemen Başla</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        
        {/* Immersive Hero Section */}
        <section className="relative px-6 pt-16 pb-32 md:px-16 md:pt-24 min-h-[90vh] flex items-center">
          <div className="max-w-8xl mx-auto w-full flex flex-col lg:flex-row items-center gap-20">
            
            <div className="flex-1 space-y-12 z-10">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-2.5 rounded-full border border-primary/20 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Landscaping Evolution 2026</span>
              </div>
              
              <h1 className="hero-title text-7xl md:text-9xl font-black text-primary-dark leading-[0.85] tracking-tighter italic">
                <span>BAHÇENİZ</span> <br/> 
                <span className="text-gradient">YENİDEN</span> <br/>
                <span>DOĞUYOR.</span>
              </h1>
              
              <p className="hero-desc text-xl md:text-2xl text-primary-dark/40 max-w-xl font-bold leading-relaxed">
                Modern mimari, doğanın ruhuyla buluşuyor. 3D analiz ve AI desteğiyle hayalinizdeki peyzaja saniyeler içinde kavuşun.
              </p>

              <div className="hero-cta flex flex-col sm:flex-row gap-6">
                <div className="relative max-w-xl p-3 bg-white/80 backdrop-blur-3xl rounded-3xl shadow-[0_40px_80px_-15px_rgba(46,125,50,0.2)] border border-white flex flex-col md:flex-row gap-3">
                  <div className="flex-1 flex items-center px-6 gap-4 py-4">
                    <MapPin className="w-6 h-6 text-primary/60" />
                    <input 
                      type="text" 
                      placeholder="Bahçe konumu..." 
                      className="w-full bg-transparent border-0 focus:ring-0 text-primary-dark font-black placeholder:text-gray-300 text-lg"
                    />
                  </div>
                  <button className="bg-primary text-white px-10 py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-primary-dark transition-all active:scale-95 group">
                    Keşfet
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive 3D Garden Canvas */}
            <div className="flex-1 relative w-full h-[600px] lg:h-[800px]">
              <div className="absolute inset-0 bg-primary/5 rounded-[5rem] -rotate-6 scale-90 blur-3xl animate-pulse" />
              <div className="absolute inset-0 glass-card rounded-[5rem] overflow-hidden flex items-center justify-center">
                <GardenScene />
              </div>
              
              {/* Floating High-Tech UI Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 -right-8 bg-white/90 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-primary/10 flex items-center gap-5 z-20"
              >
                <div className="bg-primary/10 p-4 rounded-2xl ring-2 ring-primary/5">
                    <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest">3D Real-time</p>
                    <p className="text-lg font-black text-primary-dark italic">Simülasyon</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-8 bg-white/90 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-primary/10 flex items-center gap-5 z-20"
              >
                <div className="bg-accent/10 p-4 rounded-2xl ring-2 ring-accent/5">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <div>
                    <p className="text-[10px] text-accent/60 font-black uppercase tracking-widest">Verified</p>
                    <p className="text-lg font-black text-primary-dark italic">Profesyoneller</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Grid: The Aesthetic Services */}
        <section id="Hizmetler" className="py-32 px-6 md:px-16 bg-white/30 backdrop-blur-sm">
          <div className="max-w-8xl mx-auto space-y-20">
            <div className="text-center space-y-4">
              <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Hizmet Yelpazemiz</h2>
              <h3 className="text-5xl md:text-7xl font-black text-primary-dark tracking-tighter italic">Bahçeniz İçin Tam Kapsamlı Sanat</h3>
            </div>

            <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Çim Sanatı', desc: 'Sadece biçmiyoruz, halı gibi işliyoruz.', icon: Sprout, color: 'bg-green-500' },
                { title: 'Akıllı Sulama', desc: 'Su tasarrufu ve maksimum verim.', icon: Droplets, color: 'bg-blue-500' },
                { title: '3D Tasarım', desc: 'Uygulamadan önce bahçenizi görün.', icon: Play, color: 'bg-purple-500' },
                { title: 'Bitki Bakımı', desc: 'Bilimsel yöntemlerle bitki sağlığı.', icon: Heart, color: 'bg-red-500' },
              ].map((f, i) => (
                <div key={i} className="feature-card glass-card p-10 rounded-[3rem] group hover:bg-primary transition-all duration-700 cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl ${f.color} text-white flex items-center justify-center mb-8 shadow-xl group-hover:bg-white group-hover:text-primary transition-colors duration-500`}>
                    <f.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-primary-dark group-hover:text-white transition-colors mb-4 italic uppercase">{f.title}</h4>
                  <p className="text-primary-dark/40 group-hover:text-white/60 transition-colors font-bold text-sm leading-relaxed">{f.desc}</p>
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">Hemen Başla <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Section: Visionary Analysis */}
        <section id="Yapay Zeka" className="ai-section py-32 px-6 md:px-16 overflow-hidden">
          <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
            <div className="ai-section-content flex-1 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-accent/10 px-6 py-2.5 rounded-full border border-accent/20 backdrop-blur-md">
                <Camera className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">AI Computer Vision</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-primary-dark leading-none tracking-tighter italic">
                BİR FOTOĞRAF <br/>
                <span className="text-accent italic">BİN ÖNERİ.</span>
              </h2>
              <p className="text-xl text-primary-dark/40 font-bold max-w-xl">
                Bahçenizin fotoğrafını çekin, yapay zekamız bitki türlerini, toprak kalitesini ve gerekli bakım listesini size özel çıkarsın.
              </p>
              <ul className="space-y-4 text-sm font-black text-primary-dark/60 uppercase tracking-widest">
                <li className="flex items-center justify-center lg:justify-start gap-4"><CheckCircle2 className="text-accent" /> Bitki Hastalığı Teşhisi</li>
                <li className="flex items-center justify-center lg:justify-start gap-4"><CheckCircle2 className="text-accent" /> Toprak Besin Analizi</li>
                <li className="flex items-center justify-center lg:justify-start gap-4"><CheckCircle2 className="text-accent" /> Tasarım Optimizasyonu</li>
              </ul>
            </div>
            <div className="flex-1 w-full">
              <GardenAnalyzer />
            </div>
          </div>
        </section>

      </main>

      <footer className="py-24 px-16 border-t border-primary/5 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mb-64 -mr-64" />
        <div className="max-w-8xl mx-auto relative z-10 space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-xl text-primary-dark">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black tracking-tighter uppercase italic">Peyzart</span>
              </div>
              <p className="text-white/40 max-w-sm font-bold text-sm leading-relaxed">
                Dünyayı daha yeşil, bahçeleri daha modern hale getiriyoruz. 2026 Peyzaj Devrimi.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-xs font-black uppercase tracking-[0.3em] text-white/60">
              <div className="space-y-6">
                <p className="text-white">Şirket</p>
                <p className="hover:text-primary transition-colors cursor-pointer">Hakkımızda</p>
                <p className="hover:text-primary transition-colors cursor-pointer">Kariyer</p>
              </div>
              <div className="space-y-6">
                <p className="text-white">Yasal</p>
                <p className="hover:text-primary transition-colors cursor-pointer">KVKK</p>
                <p className="hover:text-primary transition-colors cursor-pointer">Sözleşme</p>
              </div>
              <div className="space-y-6 hidden md:block">
                <p className="text-white">Sosyal</p>
                <p className="hover:text-primary transition-colors cursor-pointer">Instagram</p>
                <p className="hover:text-primary transition-colors cursor-pointer">Dribbble</p>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            <span>&copy; 2026 PEYZART INC. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:block italic">DESIGNED BY HACKER CEO & OBSIDIAN MEMORY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
