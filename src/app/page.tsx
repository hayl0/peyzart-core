"use client";

import { useEffect, useRef } from 'react';
import { 
  Search, Sprout, CheckCircle2, Globe, 
  ArrowRight, Sparkles, Layers, MousePointer2 
} from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Sam3DViewer } from '@/components/visuals/Sam3DViewer';

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", { 
        y: 50, 
        opacity: 0, 
        stagger: 0.2, 
        duration: 1.5, 
        ease: "power4.out" 
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col min-h-screen bg-nature-mesh font-sans selection:bg-primary/20 overflow-x-hidden">
      
      {/* Premium Glass Nav */}
      <nav className="flex items-center justify-between px-6 py-8 md:px-16 backdrop-blur-2xl sticky top-0 z-50 bg-white/30 border-b border-white/20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20 group-hover:rotate-[15deg] transition-all duration-500 border-t border-white/40 backdrop-blur-md">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-primary-dark tracking-tighter uppercase leading-none italic">Peyzart</span>
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mt-1 opacity-60">Neural Design</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-12 bg-white/40 backdrop-blur-xl px-10 py-4 rounded-full border border-white/60 shadow-xl text-[10px] font-black uppercase tracking-[0.2em] text-primary-dark/40">
          {['Discover', 'Neural SAM', 'Research', 'Marketplace'].map((item) => (
            <button key={item} className="hover:text-primary transition-all relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button className="text-xs font-black uppercase tracking-widest text-primary-dark/70 hover:text-primary transition-colors">Sign In</button>
          <button className="jelly-button-black !px-8 !py-3 !text-[10px]">Launch App</button>
        </div>
      </nav>

      <main className="flex-1 px-6 md:px-16">
        
        {/* Hero Section - The Board */}
        <section className="relative py-12 md:py-24 flex flex-col items-center text-center space-y-16">
           <div className="hero-content space-y-10 max-w-5xl">
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-white shadow-lg">
                 <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                 <span className="text-[10px] font-black text-primary-dark uppercase tracking-widest italic">Peyzart v3.0 x SAM-3D Objects</span>
              </div>
              
              <h1 className="text-7xl md:text-[130px] font-black text-primary-dark leading-[0.8] tracking-tighter italic">
                NATURE <br/>
                <span className="text-gradient drop-shadow-2xl">SEGMENTED</span> <br/>
                IN 3D.
              </h1>

              <p className="text-xl md:text-2xl text-primary-dark/40 max-w-2xl mx-auto font-bold leading-relaxed italic">
                Modern peyzaj tasarımı, Meta SAM-3D zekasıyla buluşuyor. Bahçenizi 3D dünyada bölütleyin, tek tıkla sanatı tasarlayın.
              </p>

              {/* Exact Buttons from Photo */}
              <div className="flex justify-center gap-8 pt-4">
                 <Link href="/kesfet" className="jelly-button-red min-w-[220px]">
                    Start project
                 </Link>
                 <button className="jelly-button-black min-w-[220px]">
                    Secondary
                 </button>
              </div>
           </div>

           {/* Exact Search Box from Photo */}
           <div className="w-full max-w-2xl group pt-10">
              <div className="liquid-search-container prismatic-border">
                 <div className="flex flex-col items-start px-8 py-5">
                    <span className="text-[10px] font-black text-primary-dark/40 uppercase tracking-[0.3em] mb-2">Text</span>
                    <div className="w-full flex items-center justify-between gap-4 bg-black/5 rounded-2xl px-6 py-4 backdrop-blur-inner shadow-inner">
                       <input 
                          type="text" 
                          placeholder="Search suggestions" 
                          className="w-full bg-transparent border-0 focus:ring-0 text-primary-dark font-black placeholder:text-primary-dark/20 text-lg outline-none"
                       />
                       <Search className="w-6 h-6 text-primary-dark/40" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Neural 3D Experience (Three.js + SAM-3D) */}
        <section className="py-20 relative">
           <div className="absolute inset-0 bg-primary/5 rounded-[5rem] blur-[120px] opacity-30" />
           <div className="relative h-[700px] md:h-[900px] w-full glass-card-light overflow-hidden p-1 flex flex-col group">
              <div className="flex items-center justify-between p-8 border-b border-black/5 bg-white/20 backdrop-blur-md">
                 <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 bg-red-400 rounded-full" />
                       <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                       <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div className="h-4 w-px bg-black/10 mx-2" />
                    <div className="text-[10px] font-black text-primary-dark/40 uppercase tracking-[0.3em] flex items-center gap-2">
                       <Layers className="w-3 h-3" />
                       Neural Segmenter Active
                    </div>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="text-right">
                       <p className="text-[9px] font-black text-primary uppercase">Engine Status</p>
                       <p className="text-xs font-bold text-primary-dark italic">Stable // 60 FPS</p>
                    </div>
                    <button className="jelly-button-black !px-6 !py-3 !text-[9px]">Export 3D</button>
                 </div>
              </div>
              <div className="flex-1 bg-white/10 relative">
                 <Sam3DViewer />
                 
                 {/* Floating HUD elements for SAM-3D feel */}
                 <div className="absolute bottom-12 left-12 space-y-4 pointer-events-none">
                    <div className="glass-card-light !p-6 !rounded-3xl border-white/80 shadow-2xl flex items-center gap-5">
                       <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <MousePointer2 className="w-6 h-6 text-primary animate-pulse" />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-primary uppercase tracking-widest">Interaction</p>
                          <p className="text-sm font-black text-primary-dark italic tracking-tighter">Point to Segment Object</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Aesthetic Tabs Section (From Photo) */}
        <section className="py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-5 jelly-button-black !rounded-[3rem] !p-12 space-y-8 flex flex-col justify-center items-start text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="flex items-center justify-between w-full relative z-10">
                 <h3 className="text-4xl font-black italic uppercase tracking-tighter">Project <br/>Layers</h3>
                 <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em]">v3.0 Card</span>
              </div>
              <div className="space-y-8 w-full relative z-10">
                 <p className="text-base font-bold opacity-60 italic tracking-tight leading-relaxed">
                    SAM-3D algorithm automatically detects every tree, shrub, and architectural element in your scene.
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/item">
                       <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] group-hover/item:scale-125 transition-transform" />
                          <span className="text-xs font-black uppercase tracking-widest opacity-80">Add collaborator</span>
                       </div>
                       <ArrowRight className="w-4 h-4 opacity-20 group-hover/item:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/10 opacity-40 hover:opacity-100 transition-all cursor-pointer group/item">
                       <div className="flex items-center gap-4">
                          <div className="w-3 h-3 border-2 border-white rounded-full" />
                          <span className="text-xs font-black uppercase tracking-widest">Professional plan</span>
                       </div>
                       <ChevronRight className="w-4 h-4" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-7 flex flex-col justify-center gap-12 text-center lg:text-left">
              <div className="space-y-6">
                 <h2 className="text-5xl md:text-7xl font-black text-primary-dark tracking-tighter italic leading-[0.9]">
                    SMART DESIGN <br/>
                    <span className="text-gradient underline decoration-primary/20 underline-offset-8">Neural Feedback.</span>
                 </h2>
                 <p className="text-xl text-primary-dark/40 font-bold max-w-xl italic">
                    Geleneksel peyzaj araçlarını unutun. SAM-3D ve Three.js ile bahçeniz bir bilgisayar oyunu kadar akışkan ve akıllı.
                 </p>
              </div>
              <div className="flex flex-wrap gap-10">
                 {[
                   { label: 'Neural Core', value: 'SAM-3D' },
                   { label: 'Visual Engine', value: 'Three.js' },
                   { label: 'Interface', value: 'Liquid Glass' }
                 ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                       <p className="text-[10px] font-black text-primary-dark/30 uppercase tracking-widest">{stat.label}</p>
                       <p className="text-2xl font-black text-primary-dark italic tracking-tighter">{stat.value}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

      </main>

      <footer className="py-20 px-16 border-t border-black/5 bg-white/40 backdrop-blur-xl">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                 <Sprout className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest italic text-primary-dark/40">Peyzart Inc. 2026</span>
           </div>
           <p className="text-[9px] font-black text-primary-dark/20 uppercase tracking-[0.6em]">Powered by Facebook Research & Hacker CEO</p>
           <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-primary-dark/40">
              <button className="hover:text-primary transition-colors cursor-pointer">Terms</button>
              <button className="hover:text-primary transition-colors cursor-pointer">Privacy</button>
           </div>
        </div>
      </footer>
    </div>
  );
}
