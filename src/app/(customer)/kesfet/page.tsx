'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Search, Star, MapPin, Compass, X, Wrench, Droplets, Paintbrush, Zap, PenTool, Wind, Trees, Home } from 'lucide-react'

interface CategoryItem {
  id: string
  name: string
  slug: string
  icon: string | null
}

interface ServiceItem {
  id: string
  name: string
  description: string | null
  price: number
  unit: string
  providerName: string | null
  companyName: string | null
  rating: number
  reviewCount: number
  image: string | null
}

const CATEGORY_TILES = [
  { emoji: '🌿', name: 'Bahçe & Peyzaj', slug: 'bahce-peyzaj', desc: 'Peyzaj tasarımı, çim, bitki', gradient: 'from-emerald-600 to-green-500', icon: Trees },
  { emoji: '🧹', name: 'Temizlik', slug: 'temizlik', desc: 'Ev, ofis, halı, klima', gradient: 'from-cyan-500 to-blue-400', icon: Wind },
  { emoji: '🔧', name: 'Tadilat', slug: 'tadilat', desc: 'İç mekan, banyo, mutfak', gradient: 'from-amber-600 to-orange-500', icon: Wrench },
  { emoji: '🎨', name: 'Boya & Badana', slug: 'boya-badana', desc: 'İç cephe, dış cephe, dekoratif', gradient: 'from-rose-500 to-pink-500', icon: Paintbrush },
  { emoji: '⚡', name: 'Elektrik', slug: 'elektrik', desc: 'Tesisat, arıza, montaj', gradient: 'from-yellow-500 to-amber-400', icon: Zap },
  { emoji: '🔩', name: 'Tesisat', slug: 'tesisat', desc: 'Su, doğalgaz, tamirat', gradient: 'from-sky-600 to-blue-500', icon: Droplets },
  { emoji: '🏊', name: 'Havuz', slug: 'havuz', desc: 'Bakım, onarım, ekipman', gradient: 'from-teal-500 to-cyan-400', icon: PenTool },
  { emoji: '🏗️', name: 'Dış Cephe', slug: 'dis-cephe', desc: 'Kaplama, izolasyon, cephe', gradient: 'from-stone-600 to-stone-500', icon: Home },
]

const GRADIENTS = [
  'from-emerald-500 to-green-400', 'from-cyan-500 to-blue-400', 'from-amber-500 to-orange-400',
  'from-rose-500 to-pink-400', 'from-yellow-500 to-amber-300', 'from-sky-500 to-blue-400',
  'from-teal-500 to-cyan-300', 'from-stone-500 to-stone-400',
]

function ServiceCard({ service }: { service: ServiceItem }) {
  const gradient = GRADIENTS[Math.abs(service.name.charCodeAt(0) || 0) % GRADIENTS.length]

  return (
    <Link href={`/service/${service.id}`}
      className="group bg-white rounded-xl border border-nature-border overflow-hidden hover:shadow-lg hover:border-bright-green/30 transition-all duration-300">
      <div className="relative h-40 md:h-48 bg-stone-100 overflow-hidden">
        {service.image ? (
          <Image src={service.image} alt={service.name} fill
            className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-4xl">{service.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
          <p className="font-extrabold text-sm text-dark-forest">₺{service.price}</p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-dark-forest text-sm leading-snug mb-1 group-hover:text-bright-green transition-colors">
          {service.name}
        </h3>

        {service.providerName && (
          <p className="text-xs text-dark-forest/50 mb-2">{service.providerName}</p>
        )}

        {service.description && (
          <p className="text-xs text-dark-forest/60 line-clamp-2 mb-3 leading-relaxed">{service.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-yellow-500">
              <Star size={12} className="fill-yellow-500" />
              <span className="text-xs font-bold text-dark-forest">{service.rating.toFixed(1)}</span>
            </div>
            <span className="text-[10px] text-dark-forest/40">({service.reviewCount})</span>
          </div>
          <span className="text-[10px] text-dark-forest/40">{service.unit}</span>
        </div>
      </div>
    </Link>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-nature-border overflow-hidden animate-pulse">
      <div className="h-40 md:h-48 bg-stone-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-200 rounded w-1/2" />
        <div className="h-3 bg-stone-200 rounded w-full" />
        <div className="flex justify-between">
          <div className="h-3 bg-stone-200 rounded w-16" />
          <div className="h-3 bg-stone-200 rounded w-12" />
        </div>
      </div>
    </div>
  )
}

function KesfetContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [activeCat, setActiveCat] = useState('')
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(d => {
        if (d?.categories) {
          setCategories(d.categories)
          const slug = searchParams.get('kategori')
          if (slug) {
            const match = d.categories.find((c: CategoryItem) => c.slug === slug)
            if (match) setActiveCat(match.name)
          }
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (query) params.set('search', query)
    if (activeCat) params.set('category', activeCat)
    params.set('limit', '50')

    fetch(`/api/services?${params}`)
      .then(r => r.json())
      .then(d => setServices(d?.services || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [query, activeCat])

  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bright-green to-lime flex items-center justify-center">
            <Compass size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-dark-forest">Hizmetleri Keşfet</h1>
            <p className="text-xs text-dark-forest/50">
              {loading ? 'Yükleniyor...' : `${services.length} hizmet bulundu`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {CATEGORY_TILES.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCat === cat.name
            return (
              <button key={cat.slug} onClick={() => setActiveCat(isActive ? '' : cat.name)}
                className={`group relative overflow-hidden rounded-xl bg-white border text-left transition-all duration-200 ${
                  isActive
                    ? 'border-dark-forest shadow-md ring-2 ring-dark-forest/10'
                    : 'border-nature-border hover:shadow-md hover:border-dark-forest/30'
                }`}>
                <div className={`h-16 md:h-20 bg-gradient-to-br ${cat.gradient} flex items-center justify-center relative`}>
                  <Icon size={24} className="text-white/90 drop-shadow" />
                </div>
                <div className="p-2.5 md:p-3">
                  <h3 className="font-bold text-dark-forest text-xs md:text-sm">{cat.name}</h3>
                  <p className="text-[10px] text-dark-forest/50 hidden md:block">{cat.desc}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-forest/40" />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Hizmet veya profesyonel ara..."
              className="w-full bg-white border border-nature-border rounded-xl pl-10 pr-4 py-3 text-sm text-dark-forest outline-none focus:border-bright-green/50 focus:shadow-md transition-all placeholder:text-dark-forest/30" />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-forest/30 hover:text-dark-forest/60">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : services.length === 0 ? (
          <div className="bg-white rounded-2xl border border-nature-border p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <Compass size={28} className="text-stone-400" />
            </div>
            <h3 className="text-lg font-bold text-dark-forest mb-1">Sonuç Bulunamadı</h3>
            <p className="text-sm text-dark-forest/50 max-w-xs mx-auto">
              Aramanızla eşleşen hizmet bulamadık. Farklı bir kelime deneyin veya kategori seçin.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-dark-forest/50">
                <span className="font-semibold text-dark-forest">{services.length}</span> hizmet listeleniyor
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function KesfetPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-nature-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-bright-green border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-dark-forest/50">Yükleniyor...</p>
        </div>
      </div>
    }>
      <KesfetContent />
    </Suspense>
  )
}
