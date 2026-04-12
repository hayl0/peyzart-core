"use client";

import { useEffect, useRef } from 'react';
import { 
  Sprout, Sparkles, ChevronRight, 
  Globe, ShieldCheck, Database, Zap,
  Layers, MousePointer2, Share2, Info
} from 'lucide-react';
import { gsap } from 'gsap';
import { Sam3DViewer } from '@/components/visuals/Sam3DViewer';

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text > *", { 
        y: 100, 
        opacity: 0, 
        stagger: 0.2, 
        duration: 1.5, 
        ease: "power4.out" 
      });
      
      gsap.from(".viewer-container", {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        delay: 0.5,
        ease: "expo.out"
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary/20 overflow-hidden">
      
      {/* Ultra Minimalist Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-10 md:px-16 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="w-12 h-12 flex items-center justify-center liquid-glass-dark border border-primary/30">
            <Sprout className="w-6 h-6 text-primary drop-shadow-[0_0_10px_#00FF41]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase tracking-tighter italic leading-none">Peyzart</span>
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mt-1">SAM-3D Engine</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-12 bg-black/40 backdrop-blur-3xl px-10 py-4 rounded-full border border-white/5 pointer-events-auto shadow-2xl">
          {['Research', 'Documentation', 'API', 'Github'].map((item) => (
            <button key={item} className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-all">
              {item}
            </button>
          ))}
        </div>

        <div className="pointer-events-auto">
           <button className="liquid-glass-dark px-8 py-4 text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:neon-glow transition-all">
              Launch Console
           </button>
        </div>
      </nav>

      <main className="relative flex flex-col items-center justify-center min-h-screen pt-20">
        
        {/* Hero Section with Integrated 3D Viewer */}
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
           
           <div className="lg:col-span-5 hero-text space-y-10 z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-2 rounded-full border border-primary/20 backdrop-blur-md">
                <Database className="w-4 h-4 text-primary" />
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Neural Segmentation 2026</span>
              </div>
              
              <h1 className="text-6xl md:text-[100px] font-black leading-[0.85] tracking-tighter italic">
                SEGMENT <br/>
                <span className="text-gradient-neon">ANYTHING</span> <br/>
                IN 3D.
              </h1>

              <p className="text-lg md:text-xl text-white/40 font-bold max-w-xl leading-relaxed">
                Peyzart engine powered by Facebook Research SAM-3D. Neural network based real-time object segmentation for modern landscaping and architecture.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                 <button className="liquid-glass-dark bg-primary text-black px-12 py-6 text-sm font-black uppercase italic tracking-widest hover:scale-105 transition-transform border-none">
                    Start Scanning
                 </button>
                 <button className="liquid-glass-dark px-12 py-6 text-sm font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all">
                    View Paper
                 </button>
              </div>

              {/* Tech Specs */}
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5 max-w-md mx-auto lg:mx-0">
                 <div>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">Accuracy</p>
                    <p className="text-xl font-black italic text-primary tracking-tighter">99.4%</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">Latency</p>
                    <p className="text-xl font-black italic text-primary tracking-tighter">&lt;40ms</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">Models</p>
                    <p className="text-xl font-black italic text-primary tracking-tighter">XL-v2</p>
                 </div>
              </div>
           </div>

           {/* 3D Immersive Viewer Container */}
           <div className="lg:col-span-7 viewer-container relative h-[600px] md:h-[800px] w-full">
              <div className="absolute inset-0 bg-primary/5 rounded-[5rem] blur-[120px] opacity-30 animate-pulse" />
              <div className="absolute inset-0 liquid-glass-dark border border-white/5 overflow-hidden">
                 <Sam3DViewer />
              </div>
              
              {/* Floating UI HUD elements */}
              <div className="absolute -top-10 -right-10 bg-black/80 backdrop-blur-3xl p-8 border border-white/5 rounded-[3rem] shadow-2xl space-y-6 z-20">
                 <div className="flex items-center gap-4">
                    <Zap className="w-6 h-6 text-primary" />
                    <div>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">Process</p>
                       <p className="text-sm font-black italic tracking-tighter">Real-time Inference</p>
                    </div>
                 </div>
                 <div className="h-px w-full bg-white/5" />
                 <div className="flex items-center gap-4">
                    <Layers className="w-6 h-6 text-primary" />
                    <div>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">Layering</p>
                       <p className="text-sm font-black italic tracking-tighter">Point Cloud Mesh</p>
                    </div>
                 </div>
              </div>

              <div className="absolute bottom-10 -left-10 liquid-glass-dark px-10 py-6 border border-white/5 z-20">
                 <div className="flex items-center gap-6">
                    <MousePointer2 className="w-8 h-8 text-primary animate-bounce" />
                    <div>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Interactive</p>
                       <p className="text-sm font-black italic uppercase">Point-and-Segment</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* Global Footer (Minimal) */}
        <footer className="absolute bottom-10 left-0 right-0 px-16 flex justify-between items-center text-[9px] font-black text-white/20 uppercase tracking-[0.5em] pointer-events-none">
           <div className="flex gap-10 pointer-events-auto">
              <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
           </div>
           <span>&copy; 2026 PEYZART X META SAM-3D</span>
           <div className="flex gap-10 pointer-events-auto">
              <Share2 className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
              <Info className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
           </div>
        </footer>

      </main>

      {/* Decorative Matrix Rain Simulation (Optional - purely visual) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
}
