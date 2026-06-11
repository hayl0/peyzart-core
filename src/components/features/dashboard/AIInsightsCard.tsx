"use client";

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Camera, RefreshCw, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import * as animeModule from 'animejs';
const anime = (animeModule as any).default || animeModule;

export const AIInsightsCard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const scanLineRef = useRef<HTMLDivElement>(null);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setHasResult(false);
    
    // Anime.js Scan Line Animation
    anime({
      targets: scanLineRef.current,
      top: ['0%', '100%'],
      easing: 'easeInOutQuad',
      duration: 1500,
      direction: 'alternate',
      loop: 3,
      complete: () => {
        setIsAnalyzing(false);
        setHasResult(true);
      }
    });
  };

  return (
    <div className="greenish-glass-white p-8 flex flex-col gap-6 h-full min-h-[400px] relative overflow-hidden group">
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-greenish-bright animate-pulse" />
            <h3 className="text-xl font-black text-greenish-dark italic">AI Consultant</h3>
        </div>
        <span className="text-[10px] font-black text-greenish-dark/30 uppercase tracking-widest">v2.0 Beta</span>
      </div>

      {!hasResult ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
          <div className="w-full aspect-video rounded-[2.5rem] bg-greenish-bg/50 border-2 border-dashed border-greenish-dark/10 flex items-center justify-center relative overflow-hidden group-hover:border-greenish-bright/30 transition-colors">
            {isAnalyzing && (
                <div ref={scanLineRef} className="absolute left-0 right-0 h-1 bg-greenish-bright shadow-[0_0_15px_rgba(76,175,80,0.8)] z-20" />
            )}
            
            <div className="text-center space-y-4 px-8">
                <div className="bg-white p-4 rounded-3xl shadow-sm inline-block group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 text-greenish-dark" />
                </div>
                <p className="text-xs font-bold text-greenish-dark/40 uppercase tracking-widest leading-relaxed">Upload garden photo for instant AI diagnosis</p>
            </div>
          </div>

          <button 
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="w-full py-4 bg-greenish-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-greenish-dark/20 hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isAnalyzing ? "Analyzing..." : "Start Analysis"}
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 bg-greenish-bright/10 p-4 rounded-3xl border border-greenish-bright/20">
                <div className="bg-greenish-bright p-2 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black text-greenish-bright uppercase tracking-widest">Health Score</p>
                    <p className="text-lg font-black text-greenish-dark">Excellent (92%)</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white/40 rounded-2xl border border-white">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-greenish-dark/40 uppercase tracking-widest">Recommendation</p>
                        <p className="text-xs font-bold text-greenish-dark leading-relaxed">Nitrogen levels are slightly low in Zone B. Add organic fertilizer within 48h.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/40 rounded-2xl border border-white">
                    <RefreshCw className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-greenish-dark/40 uppercase tracking-widest">Forecast Insight</p>
                        <p className="text-xs font-bold text-greenish-dark leading-relaxed">Rain expected tomorrow. Auto-irrigation paused to save 120L water.</p>
                    </div>
                </div>
            </div>

            <button 
                onClick={() => setHasResult(false)}
                className="mt-auto flex items-center justify-center gap-2 text-[10px] font-black text-greenish-dark/30 uppercase tracking-[0.2em] hover:text-greenish-dark transition-colors group"
            >
                New Scan <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      )}
    </div>
  );
};
