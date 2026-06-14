'use client';

import { useState, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
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
    <section className="relative w-full overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1400&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2E1A]/80 via-[#0A2E1A]/60 to-[#0A2E1A]/90" />
      <AnimateOnScroll>
        <div className="relative z-10 px-4 py-16 md:py-24 lg:py-32 max-w-4xl mx-auto text-center w-full">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
            Profesyonel Peyzajcılar
          </h1>
          <p className="text-sm md:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Bahçeniz için en iyi uzmanı bulun, yeşil hayalinizi gerçeğe dönüştürün
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused('search')}
                onBlur={() => setFocused(null)}
                placeholder="Ne hizmeti arıyorsunuz?"
                className={`w-full h-12 md:h-14 pl-11 pr-4 rounded-[14px] bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 text-sm md:text-base outline-none transition-all duration-300 ${
                  focused === 'search' ? 'scale-[1.02] shadow-[0_0_24px_rgba(76,175,80,0.5)] bg-white/25' : ''
                }`}
              />
            </div>
            <div className="relative sm:w-44">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setFocused('location')}
                onBlur={() => setFocused(null)}
                placeholder="Konum"
                className={`w-full h-12 md:h-14 pl-11 pr-4 rounded-[14px] bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 text-sm md:text-base outline-none transition-all duration-300 ${
                  focused === 'location' ? 'scale-[1.02] shadow-[0_0_24px_rgba(76,175,80,0.5)] bg-white/25' : ''
                }`}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white/85 text-xs font-medium hover:bg-white/30 hover:text-white transition-all backdrop-blur-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
