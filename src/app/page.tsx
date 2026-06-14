/**
 * Peyzart High-End Landing Page
 * Meticulously crafted with GSAP, Bento Grid, and Premium Interaction Design.
 * 
 * @module LandingPage
 */

"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, Briefcase, Zap, Shield, Star, 
  ArrowRight, CheckCircle, Sparkles, MoveRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { revealBento, createMagnetic, revealText } from '@/lib/animations';

const FEATURES = [
  {
    icon: Zap,
    title: 'Precision Insights',
    description: 'Saniyeler içinde AI destekli peyzaj analizleri ve uzman önerileri.',
    span: 'col-span-12 md:col-span-8',
    color: 'bg-greenish-lime/10'
  },
  {
    icon: Shield,
    title: 'Trusted Network',
    description: 'Doğrulanmış uzmanlar.',
    span: 'col-span-12 md:col-span-4',
    color: 'bg-white/5'
  },
  {
    icon: Star,
    title: 'Elite Quality',
    description: 'A++ segment işçilik ve malzeme.',
    span: 'col-span-12 md:col-span-4',
    color: 'bg-white/5'
  },
  {
    icon: Sparkles,
    title: 'Visual Magic',
    description: '3D ve VR destekli tasarım önizlemeleri.',
    span: 'col-span-12 md:col-span-8',
    color: 'bg-greenish-bright/10'
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Initial reveals
    gsap.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      delay: 0.2
    });

    gsap.from(".hero-desc", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5
    });

    // Staggered reveal for Bento Grid
    revealBento(".bento-card");

    // Magnetic effect for main CTA
    if (magneticRef.current) {
      createMagnetic(magneticRef.current);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0e14] overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-greenish-bright/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-greenish-lime/5 rounded-full blur-[100px] -z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center max-w-7xl mx-auto mix-blend-difference">
        <Link href="/" className="logo-gradient text-2xl">Peyzart</Link>
        <div className="flex items-center gap-10">
          <Link href="/home" className="text-sm font-bold tracking-widest text-white/60 hover:text-white transition-colors uppercase">Enter App</Link>
          <div className="w-12 h-0.5 bg-white/20" />
          <Link href="/landscaper/dashboard" className="text-sm font-bold tracking-widest text-white uppercase border border-white/20 px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all">Join as Expert</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-48 pb-32 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-greenish-lime">Premium Landscape Platform</span>
        </motion.div>
        
        <h1 className="hero-title text-balance mb-8">
          Architecting <span className="text-white/20 italic">Nature's</span> <br />
          Ultimate <span className="text-gradient">Potential</span>
        </h1>
        
        <p className="hero-desc text-white/40 text-xl md:text-2xl max-w-3xl mb-16 font-medium leading-relaxed">
          Müşteriler ve peyzaj uzmanlarını buluşturan, AI destekli ve yüksek etkileşimli gelecek nesil bahçe tasarım platformu.
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Link 
            ref={magneticRef}
            href="/home" 
            className="btn-liquid btn-liquid-primary group"
          >
            Müşteri Olarak Başla
            <MoveRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link href="/landscaper/dashboard" className="text-sm font-bold tracking-widest text-white/60 hover:text-white transition-colors uppercase py-4 px-8">
            Expert Dashboard
          </Link>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-8 pb-48 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 bento-grid">
          {FEATURES.map((feature, i) => (
            <div 
              key={i} 
              className={cn(
                "bento-card group flex flex-col justify-between min-h-[320px]",
                feature.span,
                feature.color
              )}
            >
              <div className="flex justify-between items-start">
                <div className="p-4 rounded-2xl bg-white/5 text-greenish-lime group-hover:bg-greenish-lime group-hover:text-black transition-all duration-500">
                  <feature.icon className="w-8 h-8" />
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <ArrowRight className="w-4 h-4 text-white/20" />
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <h3 className="text-3xl font-bold tracking-tighter text-white group-hover:text-greenish-lime transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/40 font-medium leading-snug group-hover:text-white/60 transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Section */}
      <section className="px-8 py-48 bg-white text-black rounded-[4rem] mx-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="flex flex-col gap-10">
            <h2 className="text-7xl font-black tracking-tighter leading-[0.9] reveal-text">
              Crafting <br />
              Beyond <br />
              Limits
            </h2>
            <p className="text-black/60 text-xl font-medium max-w-md">
              Her bahçe bir hikayedir. Biz bu hikayeyi modern teknoloji ve uzman dokunuşuyla gerçeğe dönüştürüyoruz.
            </p>
            <Link href="/about" className="flex items-center gap-4 text-sm font-black uppercase tracking-widest group">
              Our Philosophy 
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-2 transition-all">
                <MoveRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-neutral-200 rounded-[3rem] overflow-hidden">
                {/* Visual placeholder for high-end image/3D */}
                <div className="w-full h-full bg-gradient-to-br from-greenish-lime/20 to-transparent" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 glass-panel border-black/5 p-8 flex flex-col justify-end gap-2 animate-float">
                <div className="text-4xl font-black tracking-tighter">98%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-24 text-center">
        <div className="text-[14vw] font-black tracking-tighter text-white/5 select-none mb-24">PEYZART</div>
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8 border-t border-white/5 pt-12">
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">© 2026 Peyzart - All Rights Reserved</p>
          <div className="flex gap-12">
            {['Instagram', 'Twitter', 'LinkedIn'].map((link) => (
              <Link key={link} href="#" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">{link}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
