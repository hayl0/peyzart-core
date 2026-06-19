'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Compass, Star, MapPin } from 'lucide-react'

interface CategoryItem {
  id: string
  name: string
  slug: string
  icon: string | null
}

interface PlaceItem {
  id: string
  name: string
  service: string
  rating: number
  price: number
  distance: number
}

const ICONS = ['🌿', '🎨', '💡', '💧', '🌸', '🏡', '🏛️', '🌊', '🧹', '🌳', '☀️', '🔧']

function KesfetContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [activeCat, setActiveCat] = useState('')
  const [places, setPlaces] = useState<PlaceItem[]>([])

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
    const params = new URLSearchParams()
    if (query) params.set('search', query)
    if (activeCat) params.set('category', activeCat)
    params.set('limit', '50')

    fetch(`/api/services?${params}`)
      .then(r => r.json())
      .then(d => setPlaces(d?.services || []))
      .catch(() => setPlaces([]))
  }, [query, activeCat])

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <Compass size={22} className="text-bright-green" />
          <h1 className="text-2xl font-bold text-[var(--theme-text)]">Keşfet</h1>
        </div>

        <div className="relative mb-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Peyzajcı veya hizmet ara..."
            className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] pl-10 pr-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {categories.map((cat, i) => (
            <button key={cat.id} onClick={() => setActiveCat(activeCat === cat.name ? '' : cat.name)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-[50px] text-xs font-semibold whitespace-nowrap transition-all border ${
                activeCat === cat.name
                  ? 'bg-bright-green text-white border-bright-green'
                  : 'bg-[var(--theme-card)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-bright-green/40'
              }`}>
              <span>{ICONS[i % ICONS.length]}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {places.length === 0 ? (
            <div className="nature-card p-10 text-center">
              <Compass size={40} className="mx-auto mb-3 text-[var(--theme-text-muted)]" />
              <p className="text-sm text-[var(--theme-text-secondary)]">Sonuç bulunamadı</p>
            </div>
          ) : places.map(p => (
            <Link key={p.id} href={`/service/${p.id}`}
              className="nature-card p-4 flex items-center gap-4 block hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-bright-green to-lime flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {p.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[var(--theme-text)] truncate">{p.name}</h3>
                <p className="text-xs text-[var(--theme-text-secondary)]">{p.service}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-[var(--theme-text-muted)]">
                  <span className="flex items-center gap-0.5"><Star size={11} className="text-yellow-500 fill-yellow-500" /> {p.rating}</span>
                  <span className="flex items-center gap-0.5"><MapPin size={11} /> {p.distance} km</span>
                </div>
              </div>
              <span className="font-extrabold text-sm text-[var(--theme-text)]">₺{p.price}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function KesfetPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center">
        <p className="text-sm text-[var(--theme-text-secondary)]">Yükleniyor...</p>
      </div>
    }>
      <KesfetContent />
    </Suspense>
  )
}
