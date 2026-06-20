'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import AnimateOnScroll from './AnimateOnScroll'

interface Slide {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
}

const SUGGESTIONS = ['Çim Bakımı', 'Peyzaj Tasarımı', 'Sulama', 'Ağaç Budama']

export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('İstanbul')
  const [focused, setFocused] = useState<'search' | 'location' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchSlides = () => {
    setLoading(true)
    setError(false)
    fetch('/api/hero-slides')
      .then(r => r.json())
      .then(data => {
        setSlides(data.slides || [])
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => { fetchSlides() }, [])

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const handleSuggestion = (s: string) => {
    setQuery(s)
    inputRef.current?.focus()
  }

  if (loading) {
    return (
      <div className="relative w-full min-h-[420px] md:min-h-[520px] bg-gradient-to-br from-dark-forest via-green-900 to-emerald-900 animate-pulse flex items-center justify-center">
        <div className="relative z-10 text-center">
          <div className="w-20 h-3 bg-white/10 rounded-full mx-auto mb-4" />
          <div className="w-64 h-8 bg-white/10 rounded-full mx-auto mb-3" />
          <div className="w-48 h-4 bg-white/10 rounded-full mx-auto" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative w-full min-h-[420px] md:min-h-[520px] bg-gradient-to-br from-dark-forest via-green-900 to-emerald-900 flex flex-col items-center justify-center gap-4">
        <p className="text-white/70 text-lg">Görseller yüklenemedi</p>
        <button onClick={fetchSlides} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition">
          Tekrar Dene
        </button>
      </div>
    )
  }

  return (
    <section className="relative w-full min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden">
      {slides.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={slides[current].image || ''}
              alt={slides[current].name}
              className="absolute inset-0 w-full h-full scale-105"
              fallback="linear-gradient(135deg, #0A2E1A, #1B5E20, #4CAF50)"
            />
          </motion.div>
        </AnimatePresence>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2E1A]/70 via-[#0A2E1A]/40 to-[#0A2E1A]/90" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-bright-green/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-lime/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Slider controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 rounded-full p-2 backdrop-blur-sm transition z-20"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 rounded-full p-2 backdrop-blur-sm transition z-20"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all rounded-full ${
                  i === current ? 'bg-white w-6 h-2' : 'bg-white/40 w-2 h-2'
                }`}
                aria-label={`Slayt ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <AnimateOnScroll>
        <div className="relative z-10 px-4 py-16 md:py-24 lg:py-32 max-w-4xl mx-auto text-center w-full">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={12} className="text-lime" />
            <span className="text-[10px] font-semibold text-white/80 uppercase tracking-widest">Türkiye&apos;nin Hizmet Platformu</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 leading-[1.1] tracking-tight">
            Profesyonel<br />
            <span className="bg-gradient-to-r from-lime to-bright-green bg-clip-text text-transparent">Hizmet Ustaları</span>
          </h1>

          {slides.length > 0 && (
            <p key={slides[current].name} className="text-sm md:text-lg text-white/60 mb-2 max-w-xl mx-auto leading-relaxed">
              {slides[current].description || 'Hizmet hayalinizi gerçeğe dönüştürün'}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-4 mt-4">
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
  )
}
