'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Star, MapPin, Trash2 } from 'lucide-react'
import { api } from '@/lib/api-client'

interface FavoriteItem {
  id: string
  name: string
  service: string
  price: number
  rating: number
  reviewCount: number
  distance: number
  image?: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<{ favorites: FavoriteItem[] }>('/api/favorites')
      .then(r => setFavorites(r.favorites))
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false))
  }, [])

  const removeFavorite = async (id: string) => {
    try {
      await api.delete(`/api/favorites/${id}`)
      setFavorites(prev => prev.filter(f => f.id !== id))
    } catch {}
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-bright-green/30 border-t-bright-green rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <Heart size={22} className="text-bright-green" />
          <h1 className="text-2xl font-bold text-[var(--theme-text)]">Favorilerim</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="nature-card p-10 text-center">
            <Heart size={40} className="mx-auto mb-3 text-[var(--theme-text-muted)]" />
            <p className="text-sm font-semibold text-[var(--theme-text)] mb-1">Henüz favoriniz yok</p>
            <p className="text-xs text-[var(--theme-text-secondary)] mb-4">
              Beğendiğiniz peyzajcıları favorilere ekleyin
            </p>
            <Link href="/kesfet" className="text-sm font-semibold text-bright-green underline">
              Keşfet&apos;e Git
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map(f => (
              <div key={f.id} className="nature-card p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-bright-green to-lime flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {f.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/service/${f.id}`} className="hover:underline">
                    <h3 className="font-bold text-sm text-[var(--theme-text)] truncate">{f.name}</h3>
                  </Link>
                  <p className="text-xs text-[var(--theme-text-secondary)]">{f.service}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[var(--theme-text-muted)]">
                    <span className="flex items-center gap-0.5"><Star size={11} className="text-yellow-500 fill-yellow-500" /> {(f.rating ?? 0).toFixed(1)}</span>
                    <span className="flex items-center gap-0.5"><MapPin size={11} /> {(f.distance ?? 0).toFixed(1)} km</span>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-[var(--theme-text)]">₺{f.price}</span>
                <button onClick={() => removeFavorite(f.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
