'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import AnimateOnScroll from './AnimateOnScroll'

interface Category {
  id: string
  name: string
  slug: string
  image: string | null
}

export default function CategoryTiles() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchCategories = () => {
    setLoading(true)
    setError(false)
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => {
        const cats = Array.isArray(data)
          ? data.filter((c: any) => !c.parentId)
          : Array.isArray(data.categories)
            ? data.categories.filter((c: any) => !c.parentId)
            : []
        setCategories(cats)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => { fetchCategories() }, [])

  if (loading) {
    return (
      <section className="py-8 md:py-10 bg-[var(--theme-bg)]">
        <div className="px-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 bg-bright-green rounded-full" />
            <h2 className="text-sm font-bold text-[var(--theme-text)]">Kategoriler</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full mt-2 w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-8 md:py-10 bg-[var(--theme-bg)]">
        <div className="px-4 max-w-5xl mx-auto text-center">
          <p className="text-sm text-red-500 mb-2">Kategoriler yüklenemedi</p>
          <button onClick={fetchCategories} className="text-xs text-bright-green hover:underline">
            Tekrar Dene
          </button>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-8 md:py-10 bg-[var(--theme-bg)]">
      <AnimateOnScroll delay={100}>
        <div className="px-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 bg-bright-green rounded-full" />
            <h2 className="text-sm font-bold text-[var(--theme-text)]">Kategoriler</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.a
                key={cat.id}
                href={`/kesfet?kategori=${cat.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={cat.image || ''}
                    alt={cat.name}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    fallback={`linear-gradient(135deg, hsl(${i * 45}, 60%, 35%), hsl(${i * 45 + 30}, 50%, 25%))`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 text-white text-xs md:text-sm font-bold text-center leading-tight drop-shadow-lg">
                    {cat.name}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  )
}
