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
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#4CAF50]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      <AnimateOnScroll>
        <div className="relative z-10 px-4 py-14 md:py-20 lg:py-24 max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
            Profesyonel Peyzajcılar
          </h1>
          <p className="text-sm md:text-base text-white/80 mb-8">
            Bahçeniz için en iyi uzmanı bulun
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
                className={`w-full h-12 md:h-14 pl-11 pr-4 rounded-[14px] bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder-white/50 text-sm md:text-base outline-none transition-all duration-300 ${
                  focused === 'search' ? 'scale-[1.02] shadow-[0_0_24px_rgba(76,175,80,0.5)]' : ''
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
                className={`w-full h-12 md:h-14 pl-11 pr-4 rounded-[14px] bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder-white/50 text-sm md:text-base outline-none transition-all duration-300 ${
                  focused === 'location' ? 'scale-[1.02] shadow-[0_0_24px_rgba(76,175,80,0.5)]' : ''
                }`}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium hover:bg-white/20 transition-all"
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
