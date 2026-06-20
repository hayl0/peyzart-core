# Peyzart — UI Profesyonelleştirme & Performans İyileştirme

**Tarih:** 20 Haziran 2026
**Versiyon:** 1.0
**Durum:** Taslak

---

## 1. Amaç

- Tüm sayfaları profesyonel görünüme kavuşturmak
- Performansı iyileştirmek (sayfa yüklenme süreleri, geçişler)
- Haritaları uygun boyutlandırıp renklendirmek
- Tüm tıklanabilir alanların çalıştığından emin olmak
- Placeholder'ları şık tutmak

---

## 2. Harita Düzenlemesi

### 2.1 MapboxMap (`src/components/map/MapboxMap.tsx`)

- Container'a sabit `aspect-[16/9]` + `max-h-[400px]` + `rounded-[16px]` ekle
- `scrollZoom` → `true` yap
- Marker boyutunu büyüt (w-4 h-4 → w-5 h-5, selected'da w-6 h-6)
- Marker'a border + shadow + scale animasyonu ekle
- Popup'ı daha şık yap: padding, border-radius, gradient başlık
- Yüklenirken skeleton shimmer göster
- Hata durumunda gradient fallback + retry butonu

### 2.2 NearbySection haritası

- Eğer varsa aynı container düzenini uygula
- Yoksa ve kart listesiyse, harita entegrasyonu yakında placeholder'ını kaldır

---

## 3. Performans

### 3.1 Lazy Loading

- `MapboxMap` → `next/dynamic` ile `{ ssr: false }` lazy import
- `HeroSection` → `ImageWithFallback`'e `priority` prop'u ekle (ilk görünen slide)

### 3.2 Görsel Optimizasyonu

- `<img>` etiketlerini `next/image`'a çevir (mümkün olan yerlerde)
- `loading="lazy"` attribute'u ekle

### 3.3 Sayfa Geçişleri

- Her route grubuna `loading.tsx` ekle (spinner + shimmer skeleton)

---

## 4. Link/Buton Düzeltmeleri

### 4.1 Kırık Linkler

| Dosya | Hata | Düzeltme |
|-------|------|----------|
| `CategoryTiles.tsx` | `href="/kesfet?category=${cat.slug}"` → parametre adı uyuşmazlığı | `?kategori=${cat.slug}` olarak düzelt |
| `OdemePage` | `/booking` link'i `/(customer)/booking` route'u çalışıyor mu kontrol | Doğru path'e yönlendir |
| `BookingForm` | `serviceId` + `price` query parametreleri doğru mu kontrol | Doğru parametreleri kullan |

### 4.2 Tüm Aktif Linkler

- `LandingPage` → login, register, /kesfet, /register/landscaper ✅
- `CustomerHomePage` → HeroSection (search), CategoryTiles, FeaturedSection, NearbySection, StatsSection
- `KesfetPage` → kategori filtreleme, servis detay linkleri
- `MarketplacePage` → kategori filtreleme, servis detay linkleri, featured
- `ServiceDetailPage` → "Hemen Rezervasyon Yap" → /booking
- `BookingForm` → 3 adım + /orders yönlendirme
- `OrdersPage` → /order/[id] detay
- `ProfilePage` → /settings
- `FavoritesPage` → silme, servis detay linki

---

## 5. UI Polisajı

### 5.1 Ortak Stil Standartları

| Element | Kural |
|---------|-------|
| Cards (`nature-card`) | `hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200` |
| Tabs/Pills | Aktif: `bg-bright-green text-white`, Pasif: `bg-[var(--theme-card)] text-[var(--theme-text-secondary)] border-[var(--theme-border)]` |
| Loading State | Merkezde `animate-spinner` + arkaplan blur |
| Error State | Kırmızı borderlı alert + "Tekrar Dene" butonu |
| Empty State | İkon + başlık + açıklama + CTA butonu (tutarlı) |
| Alt navbar | `pb-24` standardize, lg'de `pb-0` |

### 5.2 Sayfa Bazında İyileştirmeler

**Servis Detay Sayfası (`/service/[id]`):**
- Galeri boşken gradient placeholder → ImageWithFallback
- Sabit alt buton "Hemen Rezervasyon Yap" → `/booking?serviceId=${id}&price=${price}`

**Siparişler (`/orders`):**
- Empty state: "Henüz sipariş vermemişsin" → "Hizmet Keşfet" butonu
- Tamamlanmış siparişlerde "Puanla" butonu → yönlendirme yap

**Profil (`/profile`):**
- Bilgi düzenleme kaydetme + şifre değiştirme çalışıyor
- Adresler sekmesi içerik kontrol

**Ödeme (`/odeme`):**
- Kart form validasyonu zaten var
- Sipariş özeti sticky, mobilde overflow kontrol

**Favoriler (`/favorites`):**
- Silme butonu çalışıyor
- Boş liste → "Keşfet'e Git"

**Booking:**
- 3 adımlı form: Tarih/Adres → Ödeme → Onay
- Hata mesajları kullanıcı dostu
- Yükleme overlay'i

### 5.3 Placeholder'lar

- "Sohbet yakında gelecek" → şık bir card, gradient ikon + mesaj
- "Harita entegrasyonu yakında" → aynı şekilde

---

## 6. İmplementasyon Sırası

1. Link/buton düzeltmeleri + `CategoryTiles` href fix
2. MapboxMap container + boyutlandırma + marker/popup iyileştirme
3. NearbySection harita düzenlemesi
4. Performans: dynamic import, loading.tsx, lazy loading
5. UI polisajı tüm sayfalara
6. Placeholder iyileştirme
7. Gerçek veri kontrolü (tüm API'ler çalışıyor)
8. Build kontrolü

---

## 7. Yapılmayacaklar

- Yeni sayfa ekleme
- Tema/Karanlık mod değişikliği
- Test yazımı
- Auth/Login akışı değişikliği
