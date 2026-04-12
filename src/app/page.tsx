"use client";

import { useEffect, useRef } from 'react';
import { 
  Search, MapPin, Sparkles, Sprout, 
  ShieldCheck, Star, ChevronRight, 
  ArrowRight, Heart, Droplets, Camera,
  CheckCircle2, Play, Globe
} from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { GardenScene } from '@/components/visuals/GardenScene';
import { GardenAnalyzer } from '@/components/ai/GardenAnalyzer';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Liquid Glass Base for Logo */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl rounded-2xl border-t border-white/60 shadow-2xl" />
      <div className="absolute inset-1 bg-primary rounded-xl opacity-20 group-hover:opacity-40 transition-opacity" />
      <Sprout className="w-8 h-8 text-primary relative z-10 drop-shadow-[0_0_8px_rgba(46,125,50,0.5)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-black text-primary-dark tracking-tighter uppercase leading-none italic">Peyzart</span>
      <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mt-1 opacity-60">Liquid Nature</span>
    </div>
  </div>
);

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", { 
        y: 50, 
        opacity: 0, 
        stagger: 0.2, 
        duration: 1.2, 
        ease: "power4.out" 
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col min-h-screen bg-[#f8fafc] font-sans selection:bg-primary/20">
      
      {/* Top Header Section */}
      <header className="px-6 py-8 md:px-16 flex items-center justify-between">
        <Logo />
        <div className="hidden lg:flex items-center gap-12 bg-white/40 backdrop-blur-xl px-10 py-4 rounded-full border border-white/60 shadow-xl text-[10px] font-black uppercase tracking-[0.2em] text-primary-dark/40">
          {['Discover', 'AI Labs', 'Portfolio', 'Pricing'].map((item) => (
            <Link key={item} href={`#${item}`} className="hover:text-primary transition-all relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
           <button className="w-12 h-12 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-lg text-primary-dark/40 hover:text-primary transition-colors">
              <Globe className="w-5 h-5" />
           </button>
           <Link href="/register" className="liquid-glass-button liquid-glass-black px-8 py-4 rounded-2xl text-[10px] font-black">
              Sign In
           </Link>
        </div>
      </header>

      <main className="flex-1 px-6 md:px-16">
        
        {/* Main Hero Hero Board */}
        <section className="relative py-12 md:py-20 flex flex-col items-center text-center space-y-12">
           <div className="hero-content space-y-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full border border-white shadow-lg">
                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-primary-dark uppercase tracking-widest">v2.0 Liquid Glass Edition</span>
              </div>
              
              <h1 className="text-7xl md:text-[120px] font-black text-primary-dark leading-[0.8] tracking-tighter italic">
                CREATING <br/>
                <span className="text-gradient drop-shadow-2xl">LIVING</span> <br/>
                SPACES.
              </h1>

              <div className="flex justify-center gap-6 pt-8">
                 <Link href="/kesfet" className="liquid-glass-button liquid-glass-red px-12 py-6 rounded-[2rem] text-sm font-black shadow-2xl">
                    Start Project
                 </Link>
                 <button className="liquid-glass-button liquid-glass-black px-12 py-6 rounded-[2rem] text-sm font-black">
                    Secondary
                 </button>
              </div>
           </div>

           {/* Search Box (As seen in the image) */}
           <div className="w-full max-w-2xl group">
              <div className="liquid-glass-input p-2 flex flex-col md:flex-row gap-2 relative group-hover:scale-[1.02] transition-transform duration-500 prismatic-border">
                 <div className="flex-1 flex flex-col items-start px-8 py-4">
                    <span className="text-[10px] font-black text-primary-dark/40 uppercase tracking-widest mb-1">Text</span>
                    <div className="w-full flex items-center gap-4">
                       <input 
                          type="text" 
                          placeholder="Search suggestions" 
                          className="w-full bg-transparent border-0 focus:ring-0 text-primary-dark font-bold placeholder:text-primary-dark/20 text-lg"
                       />
                       <Search className="w-6 h-6 text-primary-dark/40" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 3D Visual Section */}
        <section className="py-20 relative">
           <div className="absolute inset-0 bg-primary/5 rounded-[5rem] blur-3xl opacity-50" />
           <div className="relative h-[600px] md:h-[800px] w-full glass-card rounded-[4rem] overflow-hidden p-1 flex flex-col">
              <div className="flex items-center justify-between p-8 border-b border-white/20">
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                 </div>
                 <div className="text-[10px] font-black text-primary-dark/40 uppercase tracking-widest">3D Real-time Render</div>
              </div>
              <div className="flex-1">
                 <GardenScene />
              </div>
           </div>
        </section>

        {/* Aesthetic Tabs (As seen in the image) */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="liquid-glass-black p-12 rounded-[3rem] space-y-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className="flex items-center justify-between">
                 <h3 className="text-3xl font-black italic uppercase tracking-tighter">Tabs</h3>
                 <span className="text-xs font-bold opacity-40">Card</span>
              </div>
              <div className="space-y-6">
                 <p className="text-sm font-bold opacity-60 italic">Find files...</p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                       <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
                       <span className="text-sm font-bold uppercase tracking-widest">Add collaborator</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 opacity-40">
                       <div className="w-3 h-3 border-2 border-white rounded-full" />
                       <span className="text-sm font-bold uppercase tracking-widest">Pro plan</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-8 flex flex-col justify-center items-center">
              <div className="flex gap-8">
                 {[1, 2].map(i => (
                    <div key={i} className="w-24 h-24 glass-card rounded-[2rem] flex items-center justify-center relative prismatic-border">
                       <div className="w-12 h-12 rounded-full border-4 border-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                       </div>
                       {/* Rainbow Ring Simulation */}
                       <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-20" />
                    </div>
                 ))}
              </div>
              <div className="w-32 h-16 glass-card rounded-full p-2 flex items-center transition-all relative overflow-hidden">
                 <div className="w-12 h-12 bg-white rounded-full shadow-xl shadow-black/10 flex items-center justify-center translate-x-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full" />
                 </div>
                 <div className="absolute inset-0 bg-primary/10 -z-10" />
              </div>
           </div>
        </section>

      </main>

      <footer className="py-20 px-16 border-t border-white/20 bg-white/40 backdrop-blur-xl">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <Logo />
           <p className="text-[10px] font-black text-primary-dark/20 uppercase tracking-[0.5em]">Liquid Nature // Created by Hacker CEO</p>
           <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-primary-dark/40">
              <Link href="#" className="hover:text-primary">Instagram</Link>
              <Link href="#" className="hover:text-primary">Dribbble</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
