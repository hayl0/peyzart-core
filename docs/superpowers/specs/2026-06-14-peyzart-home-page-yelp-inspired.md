# Peyzart Customer Home Page — Yelp-Inspired Redesign

**Tarih:** 14 Haziran 2026
**Versiyon:** 1.0
**Durum:** Onaylandı

---

## 1. Amaç

Mevcut customer home sayfasını Yelp.com ana sayfası seviyesinde modern, fonksiyonel ve görsel olarak zengin bir deneyime dönüştürmek.

**Referans:** Yelp.com ana ekranı — büyük arama çubuğu, kategori tiles, scroll animasyonları, öne çıkan kartlar, harita entegrasyonu.

---

## 2. Sayfa Yapısı (Üstten Aşağıya)

### 2.1 Hero Section (Tam Genişlik)

| Öğe | Açıklama |
|-----|----------|
| **Arka Plan** | Doğa temalı gradient (koyu yeşil → açık yeşil), üstüne ince desen/doku |
| **Ana Arama** | Büyük input: "Ne hizmeti arıyorsunuz?" placeholder; focus'ta genişleme + yeşil glow |
| **Konum Arama** | İkinci input: "📍 Konum" (varsayılan: İstanbul, Türkiye) |
| **Hızlı Öneriler** | Popüler arama etiketleri: "Çim Bakımı • Peyzaj Tasarımı • Sulama • Ağaç Budama" |
| **Animasyon** | Input focus: scale(1.02) + box-shadow glow (yeşil tonları) |

### 2.2 Kategori Tiles (Yatay Kaydırmalı)

8 kategori, her biri yuvarlak ikon + etiket:

| # | Kategori | İkon |
|---|----------|------|
| 1 | Çim Bakımı | 🌿 |
| 2 | Peyzaj Tasarımı | 🎨 |
| 3 | Sulama Sistemleri | 💧 |
| 4 | Ağaç Budama | 🌳 |
| 5 | Çit & Duvar | 🪴 |
| 6 | Bahçe Temizliği | 🧹 |
| 7 | İlaçlama | 🧪 |
| 8 | Çiçek Dikimi | 🌸 |

**Davranış:**
- Mobil: yatay scroll (overflow-x auto, scroll-snap)
- Desktop: 8'li grid (4x2 veya 8 kolon)
- Hover: scale(1.08) + shadow artışı
- Seçili: aktif görsel ipucu (vurgulu çerçeve)

### 2.3 Öne Çıkan Peyzajcılar (Featured)

- **Başlık:** "Öne Çıkan Peyzajcılar" + "Tümünü Gör →"
- **İçerik:** 3-4 büyük kart, yatay scroll (mobile) / grid (desktop)
- **Her Kart:** Büyük fotoğraf (Unsplash), isim, hizmet türü, puan (⭐ yıldız), fiyat, "Öne Çıkan" rozeti, mesafe
- **Animasyon:** Scroll'da fade-in + slide-up (Intersection Observer)

### 2.4 Yakınındaki Uzmanlar + Harita

- **Harita:** Gradient placeholder (gerçek harita sonra eklenecek)
- **Filter Chips:** Tüm Hizmetler, Fiyat, Puan, Mesafe (active state animasyonlu)
- **Kart Grid:** 2 kolon, mevcut ServiceCard bileşeni kullanılır
- **Loading:** Shimmer skeleton (mevcut ServiceCardSkeleton)
- **Empty/Error:** Mevcut state'ler korunur

### 2.5 İstatistikler (Trust Signals)

- 3 sayı: "1.000+ Mutlu Müşteri · %98 Memnuniyet · 250+ Uzman Peyzajcı"
- Sayılar scroll'da animasyonlu sayaç ile artar (Intersection Observer tetikler)

---

## 3. Animasyon Sistemi

| Animasyon | Teknik | Hedef |
|-----------|--------|-------|
| Scroll fade-in + slide-up | Intersection Observer + CSS transition | Her section |
| Kart hover (scale + shadow) | CSS `transition: all 0.2s` | Tüm kartlar |
| Search focus glow | CSS `box-shadow` transition | Hero input |
| Filter chip active | CSS class toggle + transition | Filter chips |
| Loading → success geçişi | CSS opacity transition | State değişimi |
| Sayaç animasyonu | Intersection Observer + useState interval | Stats |

**Teknik:** Hiç ek kütüphane yok. Native Intersection Observer API + CSS transitions.

---

## 4. Bileşen Ağacı

```
CustomerHomePage
├── HeroSection
│   ├── SearchInput (ana arama)
│   ├── LocationInput (konum)
│   └── QuickSuggestions (popüler etiketler)
├── CategoryTiles
│   └── CategoryTile × 8
├── FeaturedSection
│   ├── SectionHeader ("Öne Çıkan Peyzajcılar")
│   └── FeaturedCard × 3-4
├── NearbySection
│   ├── MapPlaceholder
│   ├── FilterChips
│   └── ServiceCardGrid
│       ├── ServiceCard × N
│       └── ServiceCardSkeleton × 4
└── StatsSection (trust signals)
```

---

## 5. State Yönetimi

| State | Tip | Açıklama |
|-------|-----|----------|
| `pageState` | `'loading' \| 'success' \| 'empty' \| 'error'` | Sayfa genel durumu |
| `landscapers` | `Landscaper[]` | Kart verileri |
| `activeFilter` | `string` | Seçili filtre |
| `searchQuery` | `string` | Arama metni |
| `visibleSections` | `Set<string>` | Görünür section'lar (IO) |

---

## 6. Mock Veri

Mevcut 4 mock landscaper korunur, featured section için 2-3 ek mock eklenir.

---

## 7. Görsel Kaynaklar

- **Hero bg:** Unsplash doğa/peyzaj fotoğrafları (production'da Pinterest'ten değiştirilecek)
- **Kart görselleri:** Unsplash (production'da değiştirilecek)
- **Kategori ikonları:** Emoji (geçici, sonra özel ikon seti)

---

## 8. Tema Desteği

- Light mode: Mevcut `--theme-*` değişkenleri kullanılır
- Dark mode: `[data-theme="dark"]` kuralları ile otomatik
- Hero section: Dark mode'da daha koyu gradient
