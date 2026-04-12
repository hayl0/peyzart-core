"use client";

import { useEffect, useRef } from 'react';
import { Search, MapPin, Sparkles, Sprout, ShieldCheck, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { GardenScene } from '@/components/visuals/GardenScene';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.2 }
    )
    .fromTo(descRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=0.6"
    )
    .fromTo(searchRef.current, 
      { opacity: 0, scale: 0.9, y: 20 }, 
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)" }, 
      "-=0.4"
    );
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-nature-mesh font-sans overflow-x-hidden">
      {/* Modern Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-xl sticky top-0 z-50 bg-white/40 border-b border-white/20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-primary-dark tracking-tighter uppercase">Peyzart</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-bold text-primary-dark/70">
          {['Hizmetler', 'Nasıl Çalışır?', 'Uzmanlar'].map((item) => (
            <Link key={item} href={`#${item}`} className="hover:text-primary transition-all relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-bold text-primary-dark/80 hover:text-primary">Giriş Yap</Link>
          <Link href="/register" className="relative group bg-primary text-white px-7 py-3 rounded-2xl text-sm font-black shadow-xl shadow-primary/30 overflow-hidden">
            <span className="relative z-10">Ücretsiz Başla</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="relative px-6 pt-20 pb-32 md:px-12 md:pt-32">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content */}
            <div className="flex-1 space-y-10 z-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-full border border-primary/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Sektörün Yeni Lideri</span>
              </div>
              
              <h1 ref={titleRef} className="text-6xl md:text-8xl font-black text-primary-dark leading-[0.9] tracking-tighter">
                Hayalinizdeki <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-accent">Bahçeye</span> <br/>
                Bir Tık Uzakta.
              </h1>
              
              <p ref={descRef} className="text-xl md:text-2xl text-primary-dark/50 max-w-xl font-medium leading-relaxed">
                Modern teknoloji, uzman ellerle buluşuyor. Konumunuzdaki en yetkin peyzajcıları saniyeler içinde keşfedin.
              </p>

              {/* Advanced Search Bar */}
              <div ref={searchRef} className="relative max-w-2xl p-3 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(46,125,50,0.15)] border border-white flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center px-6 gap-4 border-b md:border-b-0 md:border-r border-gray-100 py-4">
                  <MapPin className="w-6 h-6 text-primary/60" />
                  <input 
                    type="text" 
                    placeholder="Bahçenizin konumu..." 
                    className="w-full bg-transparent border-0 focus:ring-0 text-primary-dark font-bold placeholder:text-gray-300 text-lg"
                  />
                </div>
                <button className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-lg shadow-primary/40 active:scale-95 group">
                  <Search className="w-5 h-5 group-hover:scale-125 transition-transform" />
                  Peyzajcı Bul
                </button>
              </div>

              <div className="flex flex-wrap gap-8 pt-6">
                {[
                  { icon: ShieldCheck, text: 'Güvenli Ödeme', color: 'text-blue-500' },
                  { icon: Star, text: 'Onaylı Portfolyolar', color: 'text-yellow-500' },
                  { icon: Sprout, text: 'Hızlı Servis', color: 'text-green-500' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-primary-dark/40">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Interactive 3D Scene */}
            <div className="flex-1 relative w-full h-[500px] lg:h-[700px] cursor-grab active:cursor-grabbing">
              <div className="absolute inset-0 bg-primary/5 rounded-[4rem] -rotate-3 scale-95" />
              <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl rounded-[4rem] border border-white/50 shadow-2xl overflow-hidden flex items-center justify-center">
                <GardenScene />
              </div>
              
              {/* Floating Tech Badges */}
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-primary/10 flex items-center gap-4 animate-float">
                <div className="bg-primary/10 p-3 rounded-2xl">
                    <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                    <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest">AI Destekli</p>
                    <p className="text-base font-black text-primary-dark">Bahçe Analizi</p>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-primary/10 flex items-center gap-4 animate-float [animation-delay:1s]">
                <div className="bg-accent/10 p-3 rounded-2xl">
                    <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div className="text-left">
                    <p className="text-[10px] text-accent font-black uppercase tracking-widest">Canlı Takip</p>
                    <p className="text-base font-black text-primary-dark">Anlık Konum</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 px-12 border-t border-white/20 bg-white/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-primary-dark/40 text-sm font-bold uppercase tracking-widest">
          <span>&copy; 2026 Peyzart // Tasarım ve Teknoloji</span>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary">Instagram</Link>
            <Link href="#" className="hover:text-primary">LinkedIn</Link>
            <Link href="#" className="hover:text-primary">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
