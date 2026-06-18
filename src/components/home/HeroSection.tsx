'use client';

import { useState, useRef } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

const SUGGESTIONS = ['Çim Bakımı', 'Peyzaj Tasarımı', 'Sulama', 'Ağaç Budama'];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('İstanbul');
  const [focused, setFocused] = useState<'search' | 'location' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestion = (s: string) => {
    setQuery(s);
    inputRef.current?.focus();
  };

  return (
    <section className="relative w-full overflow-hidden min-h-[420px] md:min-h-[520px] flex items-center">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1400&q=80')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2E1A]/85 via-[#0A2E1A]/60 to-[#0A2E1A]/95" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-bright-green/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-lime/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white/40 rounded-full shadow-[0_0_8px_4px_rgba(255,255,255,0.3)]" />
        <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-lime/60 rounded-full shadow-[0_0_12px_6px_rgba(205,220,57,0.3)]" />
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white/30 rounded-full shadow-[0_0_6px_3px_rgba(255,255,255,0.2)]" />
      </div>

      <AnimateOnScroll>
        <div className="relative z-10 px-4 py-16 md:py-24 lg:py-32 max-w-4xl mx-auto text-center w-full">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={12} className="text-lime" />
            <span className="text-[10px] font-semibold text-white/80 uppercase tracking-widest">Türkiye'nin Peyzaj Platformu</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 leading-[1.1] tracking-tight">
            Profesyonel<br />
            <span className="bg-gradient-to-r from-lime to-bright-green bg-clip-text text-transparent">Peyzajcılar</span>
          </h1>
          <p className="text-sm md:text-lg text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
            Bahçeniz için en iyi uzmanı bulun, yeşil hayalinizi gerçeğe dönüştürün
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-4">
            <div className="relative flex-1 group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none z-10" />
              <input ref={inputRef} type="text" value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused('search')}
                onBlur={() => setFocused(null)}
                placeholder="Ne hizmeti arıyorsunuz?"
                className={`w-full h-12 md:h-14 pl-11 pr-4 rounded-[16px] bg-white/15 backdrop-blur-xl border border-white/25 text-white placeholder-white/50 text-sm md:text-base outline-none transition-all duration-300 ${
                  focused === 'search' ? 'scale-[1.02] shadow-[0_0_40px_rgba(76,175,80,0.3)] bg-white/20 border-bright-green/50' : 'hover:bg-white/20'
                }`} />
            </div>
            <div className="relative sm:w-44">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none z-10" />
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setFocused('location')}
                onBlur={() => setFocused(null)}
                placeholder="Konum"
                className={`w-full h-12 md:h-14 pl-11 pr-4 rounded-[16px] bg-white/15 backdrop-blur-xl border border-white/25 text-white placeholder-white/50 text-sm md:text-base outline-none transition-all duration-300 ${
                  focused === 'location' ? 'scale-[1.02] shadow-[0_0_40px_rgba(76,175,80,0.3)] bg-white/20 border-bright-green/50' : 'hover:bg-white/20'
                }`} />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => handleSuggestion(s)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-medium hover:bg-white/25 hover:text-white hover:border-white/40 transition-all backdrop-blur-sm">
                {s}
              </button>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
