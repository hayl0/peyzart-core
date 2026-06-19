"use client";

import { ShieldCheck, BarChart3, TreeDeciduous, Award, ChevronRight, Info } from 'lucide-react';
import { useEffect, useRef } from 'react';
import * as animeModule from 'animejs'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anime = (animeModule as any).default ?? animeModule

export const AssetPassport = () => {
  const scoreRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Professional Financial Counting
    anime({
      targets: scoreRef.current,
      innerHTML: [0, 88],
      round: 1,
      easing: 'easeOutExpo',
      duration: 2500,
      delay: 800
    });

    anime({
      targets: valueRef.current,
      innerHTML: [0, 425000],
      round: 1,
      easing: 'easeOutExpo',
      duration: 3000,
      delay: 1000
    });
  }, []);

  return (
    <div className="greenish-glass-dark p-10 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden group">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-greenish-bright/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      
      {/* Certification Shield */}
      <div className="relative flex-shrink-0">
        <div className="w-40 h-40 rounded-full border-[8px] border-greenish-bright/20 flex items-center justify-center relative">
            <div className="absolute inset-0 animate-spin-slow">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="transparent" stroke="#4CAF50" strokeWidth="2" strokeDasharray="10 20" />
                </svg>
            </div>
            <div className="text-center">
                <span ref={scoreRef} className="text-5xl font-black text-white italic">0</span>
                <p className="text-[10px] font-black text-greenish-bright uppercase tracking-widest">Score</p>
            </div>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-greenish-bright p-3 rounded-2xl shadow-xl shadow-greenish-bright/20">
            <ShieldCheck className="w-6 h-6 text-greenish-dark" />
        </div>
      </div>

      {/* Financial & Botanical Data */}
      <div className="flex-1 space-y-8 relative z-10">
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-greenish-bright">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Peyzart Platinum Asset</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">Garden Passport</h2>
            <p className="text-white/40 text-sm font-bold max-w-lg leading-relaxed">Bahçeniz profesyonel standartlarda yönetiliyor. Bu durum gayrimenkulünüzün değerini korur ve artırır.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-4 h-4 text-greenish-yellow" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Estimated Value Impact</span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-white text-xs font-black">₺</span>
                    <span ref={valueRef} className="text-2xl font-black text-white italic">0</span>
                </div>
            </div>

            <div className="p-5 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-3">
                    <TreeDeciduous className="w-4 h-4 text-greenish-yellow" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Inventoried Assets</span>
                </div>
                <div className="text-2xl font-black text-white italic">42 <span className="text-xs text-white/40 not-italic">Species</span></div>
            </div>

            <div className="p-5 bg-greenish-bright/10 rounded-3xl border border-greenish-bright/20 flex flex-col justify-between group/btn cursor-pointer">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-greenish-bright uppercase tracking-widest">Compliance</span>
                    <Info className="w-4 h-4 text-greenish-bright/40" />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-black text-white">View Ledger</span>
                    <ChevronRight className="w-5 h-5 text-greenish-bright group-hover/btn:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
