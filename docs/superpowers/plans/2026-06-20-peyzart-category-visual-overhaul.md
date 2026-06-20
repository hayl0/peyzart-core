# Peyzart Kategori & Görsel Yenileme — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand from 12 to 8 ana kategori + alt kategoriler, Pinterest görselleriyle görsel kaliteyi artır, Yelp benzeri hero slider ekle.

**Architecture:** Category model'ine `isHeroSlide` eklenir, seed verisi yeniden yazılır, tüm görseller `/public/images/` altında local'e alınır, `ImageWithFallback` component'i ile fallback yönetimi yapılır, hero slider API'den beslenir.

**Tech Stack:** Next.js 16 App Router, Prisma v7, Framer Motion 12 (AnimatePresence), pinterest-dl (Python)

---

## File Structure

**New files:**
- `src/components/ui/ImageWithFallback.tsx` — image + gradient fallback component
- `src/app/api/hero-slides/route.ts` — hero slider API endpoint
- `public/images/categories/` — kategori görselleri (8+ dosya)
- `public/images/services/` — alt kategori görselleri

**Modified files:**
- `prisma/schema.prisma` — +`isHeroSlide` field
- `prisma/seed.ts` — 8 ana kategori + alt kategoriler + yeni görseller
- `prisma/seed-categories.ts` — (aynı güncelleme)
- `src/components/home/CategoryTiles.tsx` — API'den dinamik çekim
- `src/components/home/HeroSection.tsx` — hero slider
- `src/components/home/ServiceCard.tsx` — local image + onError
- `src/components/home/PlaceCard.tsx` — +image prop
- `src/components/home/FeaturedSection.tsx` — local images
- `src/components/home/NearbySection.tsx` — local images
- `src/app/page.tsx` (landing) — hero slider entegrasyonu
- `src/app/kesfet/page.tsx` — kategori görsel güncelleme
- `src/app/odeme/page.tsx` — görsel güncelleme

---

## Chunk 1: Pinterest Görsel İndirme

### Task 1.1: pinterest-dl kurulumu

**Files:** N/A

- [ ] Python 3.12 kontrol et: `python3 --version`
- [ ] `pip3 install pinterest-dl` çalıştır
- [ ] `pinterest-dl --help` ile doğrula

### Task 1.2: Görsel indirme

**Files:** N/A (dosyalar `public/images/` altına inecek)

Dizinleri oluştur:

- [ ] `mkdir -p public/images/categories public/images/services`

Her kategori için Pinterest'te arama yap ve ilk görseli indir (`-n 1` = en iyi 1 sonuç):

**Ana kategoriler (hero + kategori kartları için):**

```
pinterest-dl search "profesyonel bahçe peyzaj tasarımı" -o public/images/categories -n 1
pinterest-dl search "ev temizlik hizmeti profesyonel" -o public/images/categories -n 1
pinterest-dl search "boya badana profesyonel" -o public/images/categories -n 1
pinterest-dl search "ev tadilat onarım" -o public/images/categories -n 1
pinterest-dl search "elektrik tesisat profesyonel" -o public/images/categories -n 1
pinterest-dl search "su tesisat profesyonel" -o public/images/categories -n 1
pinterest-dl search "mobilya dekorasyon iç dizayn" -o public/images/categories -n 1
pinterest-dl search "dış cephe kaplama profesyonel" -o public/images/categories -n 1
```

**Hero slider (hero görselleri doğrudan Category model'inin `image` alanından gelir — ayrı indirme gerekmez):**

- 

**Alt kategori görselleri (services):**

```
pinterest-dl search "çardak pergola bahçe" -o public/images/services -n 1
pinterest-dl search "havuz bakım temizlik" -o public/images/services -n 1
pinterest-dl search "sulama sistemi bahçe" -o public/images/services -n 1
pinterest-dl search "outdoor bahçe mobilyası" -o public/images/services -n 1
pinterest-dl search "yapay çim bahçe" -o public/images/services -n 1
pinterest-dl search "profesyonel ev temizliği" -o public/images/services -n 1
pinterest-dl search "ofis temizlik hizmeti" -o public/images/services -n 1
pinterest-dl search "halı yıkama profesyonel" -o public/images/services -n 1
pinterest-dl search "iç cephe boya badana" -o public/images/services -n 1
pinterest-dl search "mutfak tadilatı modern" -o public/images/services -n 1
pinterest-dl search "banyo tadilat yenileme" -o public/images/services -n 1
pinterest-dl search "elektrik tesisat onarım" -o public/images/services -n 1
pinterest-dl search "su tesisatı tamir" -o public/images/services -n 1
pinterest-dl search "mobilya montaj hizmeti" -o public/images/services -n 1
pinterest-dl search "perde stor dekorasyon" -o public/images/services -n 1
pinterest-dl search "çatı onarım yalıtım" -o public/images/services -n 1
```

- [ ] **Dosya adlandırma:** `pinterest-dl` dosyaları rastgele isimlerle indirir. İndirilen her dosyayı `{slug}.jpg` yap:
  ```bash
  # Ana kategoriler (public/images/categories/)
  for f in public/images/categories/*.jpg; do
    case "$f" in
      *peyzaj*)    mv "$f" public/images/categories/bahce-peyzaj.jpg ;;
      *temizlik*)  mv "$f" public/images/categories/temizlik.jpg ;;
      *boya*)      mv "$f" public/images/categories/boya-badana.jpg ;;
      *tadilat*)   mv "$f" public/images/categories/tadilat-onarim.jpg ;;
      *elektrik*)  mv "$f" public/images/categories/elektrik.jpg ;;
      *tesisat*)   mv "$f" public/images/categories/tesisat.jpg ;;
      *mobilya*)   mv "$f" public/images/categories/mobilya-dekorasyon.jpg ;;
      *cephe*)     mv "$f" public/images/categories/dis-cephe.jpg ;;
    esac
  done
  
  # Alt kategoriler (public/images/services/) — aynı pattern
  for f in public/images/services/*.jpg; do
    case "$f" in
      *cardak*)    mv "$f" public/images/services/cardak-pergola.jpg ;;
      *havuz*)     mv "$f" public/images/services/havuz-bakimi.jpg ;;
      *sulama*)    mv "$f" public/images/services/sulama-sistemi.jpg ;;
      *mobilya*)   mv "$f" public/images/services/dis-mekan-mobilya.jpg ;;
      *cim*)       mv "$f" public/images/services/yapay-cim.jpg ;;
      *temizlik*)  mv "$f" public/images/services/ev-temizligi.jpg ;;
      *ofis*)      mv "$f" public/images/services/ofis-temizligi.jpg ;;
      *hali*)      mv "$f" public/images/services/hali-yikama.jpg ;;
      *badana*)    mv "$f" public/images/services/ic-cephe-boya.jpg ;;
      *mutfak*)    mv "$f" public/images/services/mutfak-tadilati.jpg ;;
      *banyo*)     mv "$f" public/images/services/banyo-tadilati.jpg ;;
      *elektrik*)  mv "$f" public/images/services/elektrik-tesisat.jpg ;;
      *tesisat*)   mv "$f" public/images/services/su-tesisati.jpg ;;
      *montaj*)    mv "$f" public/images/services/mobilya-montaj.jpg ;;
      *perde*)     mv "$f" public/images/services/perde-stor.jpg ;;
      *cati*)      mv "$f" public/images/services/cati-yalitim.jpg ;;
    esac
  done
  ```
  İndirilen dosya sayısı beklenenden azsa, eksik kategoriler manuel olarak tekrar indirilir.
- [ ] **Her kategoride minimum 1 görsel olduğunu doğrula:** `ls -la public/images/categories/` (8 dosya), `ls -la public/images/services/` (~16 dosya)

---

## Chunk 2: Prisma Schema + Seed Güncelleme

### Task 2.1: Schema'ya isHeroSlide ekle

- [ ] `prisma/schema.prisma`'da `Category` modeline `isHeroSlide Boolean @default(false)` ekle

### Task 2.2: Migration

- [ ] `npx prisma migrate dev --name add_is_hero_slide` çalıştır

### Task 2.3: Seed verisini yeniden yaz

**Files:**
- Modify: `prisma/seed.ts`
- Modify: `prisma/seed-categories.ts`

- [ ] **Mevcut 12 kategoriyi koru**, `parentId`'lerini `bahce-peyzaj` ana kategorisine bağla
- [ ] **8 ana kategori ekle** (parentId=null):
  - Bahçe & Peyzaj (order:1, image: `/images/categories/bahce-peyzaj.jpg`, isHeroSlide: true)
  - Temizlik (order:2, image: `/images/categories/temizlik.jpg`, isHeroSlide: true)
  - Boya & Badana (order:3, image: `/images/categories/boya-badana.jpg`, isHeroSlide: true)
  - Tadilat & Onarım (order:4, image: `/images/categories/tadilat-onarim.jpg`, isHeroSlide: true)
  - Elektrik (order:5, image: `/images/categories/elektrik.jpg`, isHeroSlide: false)
  - Tesisat (order:6, image: `/images/categories/tesisat.jpg`, isHeroSlide: true)
  - Mobilya & Dekorasyon (order:7, image: `/images/categories/mobilya-dekorasyon.jpg`, isHeroSlide: false)
  - Dış Cephe (order:8, image: `/images/categories/dis-cephe.jpg`, isHeroSlide: false)

- [ ] **Alt kategorileri ekle** (parentId ana kategoriye bağlı):
  - Bahçe & Peyzaj altında: mevcut 12 + Çardak & Pergola, Havuz Bakımı, Sulama Sistemleri, Dış Mekan Mobilyası, Yapay Çim & Zemin (17 alt kategori)
  - Temizlik altında: Ev Temizliği, Ofis Temizliği, Halı & Koltuk Yıkama, İnşaat Sonrası Temizlik, Dış Cephe Temizliği
  - Boya & Badana altında: İç Cephe Boya, Dış Cephe Boya, Duvar Kağıdı, Alçı & Sıva, Dekoratif Boya
  - Tadilat & Onarım altında: Genel Tadilat, Mutfak Tadilatı, Banyo Tadilatı, Kapı & Pencere, Alçıpan & Bölme
  - Elektrik altında: Tesisat & Kablo, Arıza Onarım, Panel & Sigorta, Akıllı Ev Sistemleri
  - Tesisat altında: Su Tesisatı, Doğalgaz Tesisatı, Kombi Bakımı, Petek & Radyatör, Klozet & Lavabo
  - Mobilya & Dekorasyon altında: Mobilya Montajı, Dekorasyon & Styling, Perde & Stor, Yer Döşeme, Duvar Kaplama
  - Dış Cephe altında: Çatı & Yalıtım, Cephe & Pencere, Bahçe Kapısı & Çit, Veranda & Sundurma

- [ ] **Her alt kategori için image path ekle:** `image: "/images/services/{slug}.jpg"`
- [ ] **Seed'i çalıştır:** `npx prisma db push && npx prisma db seed`

### Task 2.4: Verify

- [ ] `npx tsc --noEmit` (hata yok)
- [ ] `npm run build` (başarılı)

---

## Chunk 3: ImageWithFallback Component

### Task 3.1: ImageWithFallback yaz

**Files:**
- Create: `src/components/ui/ImageWithFallback.tsx`

- [ ] `src/components/ui/ImageWithFallback.tsx` dosyasını oluştur (içerik: `'use client'` + `useState` + `ImageWithFallback` function component, yukarıdaki kod bloğundaki gibi):
  src: string
  alt: string
  fallback?: string
  className?: string
  width?: number
  height?: number
}

export function ImageWithFallback({
  src,
  alt,
  fallback = 'linear-gradient(135deg, #4CAF50, #2E7D32)',
  className,
  width,
  height,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className={cn('w-full h-full', className)}
        style={{ background: fallback }}
        aria-label={alt}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setHasError(true)}
      className={cn('object-cover', className)}
    />
  )
}
```

### Task 3.2: ImageWithFallback export ekle

- [ ] **ImageWithFallback doğrudan import kullan:** `import { ImageWithFallback } from '@/components/ui/ImageWithFallback'` — export işlemi component'in kendisinde `export function` ile yapılır, ayrı index.ts gerekmez
- [ ] Verify: `npx tsc --noEmit`

---

## Chunk 4: Hero Slider API

### Task 4.1: GET /api/hero-slides endpoint

**Files:**
- Create: `src/app/api/hero-slides/route.ts`

```tsx
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const slides = await prisma.category.findMany({
      where: { isHeroSlide: true, parentId: null },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        order: true,
      },
    })

    return NextResponse.json({ slides })
  } catch {
    return NextResponse.json(
      { error: true, message: 'Failed to fetch slides' },
      { status: 500 }
    )
  }
}
```

### Task 4.2: Verify

- [ ] `npx tsc --noEmit`
- [ ] `curl http://localhost:3000/api/hero-slides | jq .` → slides dizisi dönmeli

---

## Chunk 5: HeroSection → Hero Slider

### Task 5.1: Hero slider component'ini yaz

**Files:**
- Read: `src/components/home/HeroSection.tsx` (mevcut yapıyı anla)
- Modify: `src/components/home/HeroSection.tsx`

Hero slider'ı yeniden yaz:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

interface Slide {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
}

export function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchSlides = () => {
    setLoading(true)
    setError(false)
    fetch('/api/hero-slides')
      .then(r => r.json())
      .then(data => {
        setSlides(data.slides)
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

  if (loading) {
    return <div className="w-full h-[60vh] bg-gradient-to-br from-dark-forest to-green-900 animate-pulse" />
  }

  if (error) {
    return (
      <div className="w-full h-[60vh] bg-gradient-to-br from-dark-forest via-green-900 to-emerald-900 flex flex-col items-center justify-center gap-4">
        <p className="text-white/70 text-lg">Görseller yüklenemedi</p>
        <button onClick={fetchSlides} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition">
          Tekrar Dene
        </button>
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-[60vh] bg-gradient-to-br from-dark-forest via-green-900 to-emerald-900 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">Bahçeler Gerçekleşiyor</h1>
      </div>
    )
  }

  const slide = slides[current]

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={slide.image || ''}
            alt={slide.name}
            className="w-full h-full object-cover"
            fallback="linear-gradient(135deg, #0A2E1A, #1B5E20, #4CAF50)"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-8 md:left-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{slide.name}</h2>
            {slide.description && (
              <p className="text-lg md:text-xl text-white/80 max-w-xl">{slide.description}</p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 rounded-full p-2 backdrop-blur-sm transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 rounded-full p-2 backdrop-blur-sm transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
```

### Task 5.2: Landing page'de kullan

**Files:**
- Modify: `src/app/page.tsx`

- [ ] Mevcut hero bölümünü `HeroSection` component'i ile değiştir

### Task 5.3: Verify

- [ ] `npx tsc --noEmit`
- [ ] `npm run build` (başarılı)

---

## Chunk 6: CategoryTiles Dinamik

### Task 6.1: CategoryTiles'i yeniden yaz

**Files:**
- Read: `src/components/home/CategoryTiles.tsx`
- Modify: `src/components/home/CategoryTiles.tsx`

- [ ] Hardcoded 8 kategori + Lucide icon'ları kaldır → `/api/categories`'den dinamik çekim
- [ ] `useEffect` + `useState` ile loading/error/success state'leri
- [ ] Her kategori kartı: `ImageWithFallback` (image + gradient fallback)
- [ ] Loading: 8 shimmer skeleton
- [ ] Error: "Yüklenemedi" + "Tekrar Dene" butonu
- [ ] **Not:** API'den parent kategorileri filtrele: `parentId === null`

```tsx
// Örnek fetch:
useEffect(() => {
  fetch('/api/categories')
    .then(r => r.json())
    .then(data => {
      setCategories(data.filter((c: any) => !c.parentId))
      setLoading(false)
    })
    .catch(() => setError(true))
}, [])
```

### Task 6.2: Verify

- [ ] `npx tsc --noEmit`
- [ ] `npm run build`

---

## Chunk 7: ServiceCard & PlaceCard Güncelleme

### Task 7.1: ServiceCard'a local image + onError

**Files:**
- Read: `src/components/home/ServiceCard.tsx`
- Modify: `src/components/home/ServiceCard.tsx`

- [ ] `<img>` tag'lerini `ImageWithFallback` ile değiştir
- [ ] `image` prop'u gelmezse gradient fallback göster

### Task 7.2: PlaceCard'a image prop

**Files:**
- Read: `src/components/home/PlaceCard.tsx`
- Modify: `src/components/home/PlaceCard.tsx`

- [ ] `image?: string` prop ekle
- [ ] `fallback` gradient koru
- [ ] Eğer `image` varsa `ImageWithFallback` ile göster

### Task 7.3: FeaturedSection güncelle

**Files:**
- Read: `src/components/home/FeaturedSection.tsx`
- Modify: `src/components/home/FeaturedSection.tsx`

- [ ] Hardcoded Unsplash URL'lerini local path'lerle değiştir
- [ ] `ImageWithFallback` kullan

### Task 7.4: NearbySection güncelle

**Files:**
- Read: `src/components/home/NearbySection.tsx`
- Modify: `src/components/home/NearbySection.tsx`

- [ ] Unsplash referanslarını temizle
- [ ] `ImageWithFallback` kullan

### Task 7.5: Verify

- [ ] `npx tsc --noEmit`
- [ ] `npm run build`

---

## Chunk 8: Eski Unsplash Referanslarını Temizle

### Task 8.1: Tüm Unsplash URL'lerini kaldır

- [ ] `src/app/page.tsx` — landing page'deki tüm Unsplash URL'lerini kaldır
- [ ] `src/app/kesfet/page.tsx` — kategori görsellerini local path'lerle değiştir
- [ ] `src/app/odeme/page.tsx` — thumbnail URL'yi local path'le değiştir
- [ ] `src/components/home/FeaturedSection.tsx` — (Task 7.3'te yapıldı)
- [ ] `src/components/home/NearbySection.tsx` — (Task 7.4'te yapıldı)
- [ ] `prisma/seed.ts` — tüm image URL'lerini local path'lerle değiştir (Chunk 2'de yapıldı)
- [ ] `prisma/seed-categories.ts` — aynı güncelleme

### Task 8.2: Final verify

- [ ] `rg "images.unsplash.com" src/` — hiç sonuç dönmemeli (seed hariç)
- [ ] `rg "unsplash" src/` — hiç sonuç dönmemeli
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`

---

## Rollback Plan

Her chunk'tan önce git commit'i alınmış olmalı. Bir chunk başarısız olursa:

```bash
git checkout -- . && git clean -fd
```
