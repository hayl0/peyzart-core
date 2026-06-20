# Peyzart — Kategori Genişletme & Görsel Yenileme

**Tarih:** 20 Haziran 2026
**Versiyon:** 1.0
**Durum:** Taslak

---

## 1. Amaç

- Mevcut 12 bahçe kategorisini koruyarak 8 yeni ana kategori eklemek
- Tüm görselleri Pinterest'ten toplanan yüksek kaliteli local imajlarla değiştirmek
- Ana sayfaya Yelp benzeri dönen hero slider eklemek
- Görsel tekrarını ortadan kaldırmak

---

## 2. Kategori Yapısı

### 2.1 Ana Kategoriler (8 adet)

| # | Kategori | Slug | Alt Kategoriler |
|---|----------|------|-----------------|
| 1 | 🌿 Bahçe & Peyzaj | `bahce-peyzaj` | Mevcut 12 kategori korunur + Çardak & Pergola, Havuz Bakımı, Sulama Sistemleri, Dış Mekan Mobilyası, Yapay Çim & Zemin eklenir (toplam 17 alt kategori) |
| 2 | 🧹 Temizlik | `temizlik` | Ev Temizliği, Ofis Temizliği, Halı & Koltuk Yıkama, İnşaat Sonrası Temizlik, Dış Cephe Temizliği |
| 3 | 🎨 Boya & Badana | `boya-badana` | İç Cephe Boya, Dış Cephe Boya, Duvar Kağıdı, Alçı & Sıva, Devekuşu & Dekoratif |
| 4 | 🔧 Tadilat & Onarım | `tadilat-onarim` | Genel Tadilat, Mutfak Tadilatı, Banyo Tadilatı, Kapı & Pencere, Alçıpan & Bölme |
| 5 | ⚡ Elektrik | `elektrik` | Tesisat & Kablo, Arıza Onarım, Panel & Sigorta, Akıllı Ev Sistemleri |
| 6 | 🔩 Tesisat | `tesisat` | Su Tesisatı, Doğalgaz Tesisatı, Kombi Bakımı, Petek & Radyatör, Klozet & Lavabo |
| 7 | 🛋️ Mobilya & Dekorasyon | `mobilya-dekorasyon` | Mobilya Montajı, Dekorasyon & Styling, Perde & Stor, Yer Döşeme, Duvar Kaplama |
| 8 | 🏗️ Dış Cephe | `dis-cephe` | Çatı & Yalıtım, Cephe & Pencere, Bahçe Kapısı & Çit, Veranda & Sundurma |

### 2.2 Veritabanı Değişikliği

- Mevcut `Category` modeli korunur, iki yeni alan eklenir:
  - `isHeroSlide` (Boolean, default false) — hero slider'da gösterilecek kategorileri işaretler
- Seed verisine 8 ana kategori (parentId=null) + alt kategoriler eklenir
- Mevcut 12 bahçe kategorisi Bahçe & Peyzaj ana kategorisinin altında toplanır, üzerine 5 yeni alt kategori eklenir
- Sıralama: `order` alanı 1-8 arası ana kategoriler için, alt kategorilerde 1-20 arası
- Ana kategori sırası: Bahçe & Peyzaj(1), Temizlik(2), Boya & Badana(3), Tadilat & Onarım(4), Elektrik(5), Tesisat(6), Mobilya & Dekorasyon(7), Dış Cephe(8)

---

## 3. Görsel Altyapısı

### 3.1 Dizin Yapısı

```
public/images/
├── categories/          # Kategori kapak görselleri (her kategori için 1)
│   ├── bahce-peyzaj.jpg
│   ├── temizlik.jpg
│   ├── boya-badana.jpg
│   └── ...
├── services/            # Servis alt kategori görselleri (her alt kategori için)
│   ├── peyzaj-tasarimi.jpg
│   ├── cardak-pergola.jpg
│   ├── ev-temizligi.jpg
│   └── ...
```

### 3.2 Görsel Kaynağı

- Pinterest panolarından `pinterest-dl` ile indirilen görseller
- Her kategori için minimum 3 farklı görsel
- Çözünürlük: minimum 1200x800, tercihen 1920x1080+
- Format: JPEG, kalite 85, RGB renk uzayı (max geniş uyumluluk için, WebP'ye dönüşüm ileride değerlendirilir)

### 3.3 Fallback Stratejisi

- `ImageWithFallback` client component: img yüklenemezse gradient göster (useState + onError)
- Hero slider'da 5+ görsel, her 5 saniyede bir geçiş (Framer Motion AnimatePresence)
- Kategori görseli: seed'den gelen tek bir resim, rastgele seçim yok (SSR uyumu)

---

## 4. Bileşen Değişiklikleri

### 4.1 Yeni: `ImageWithFallback`

```tsx
<ImageWithFallback
  src="/images/categories/bahce-peyzaj.jpg"
  alt="Bahçe & Peyzaj"
  fallback="linear-gradient(135deg, #4CAF50, #2E7D32)"
  className="..."
/>
```

Props: src, alt, fallback (gradient string), className, width, height

### 4.2 Güncelleme: `HeroSection` → Hero Slider

- Statik background → 5-8 görsel slider (API'den `isHeroSlide=true` kategoriler)
- Yumuşak crossfade geçişi (Framer Motion AnimatePresence)
- Her slaytta kategori adı overlay + `description` metni (seed'deki Category.description alanı)
- Image mapping: Category.image alanı `/images/categories/{slug}.jpg` formatında
- 5sn aralık, manuel ok/indicator desteği
- State'ler: Loading (shimmer placeholder), Error (gradient fallback + retry), Success (slider)

### 4.3 Güncelleme: `CategoryTiles`

- Hardcoded 8 kategori → `/api/categories`'den dinamik çekim
- Lucide icon yerine kategori görseli + başlık
- 2 satır, 4 kolon grid (mobile: 2 kolon)
- State'ler: Loading (shimmer skeleton, 8 kart), Error (alert banner + "Tekrar Dene" butonu), Empty (mesaj), Success (kart grid)

### 4.4 Güncelleme: `ServiceCard` & `PlaceCard`

- `PlaceCard`'a image prop ekle
- `ServiceCard`'daki eski Unsplash URL'leri local path'lerle değiştir
- onError handler: gradient fallback

### 4.5 Güncelleme: `next.config.ts`

- Tüm görseller local olduğu için `remotePatterns` gerekmez — mevcut `unoptimized: true` korunur

---

## 5. API Değişiklikleri

### 5.1 Kategori API'leri (mevcut)

- `GET /api/categories` zaten çalışıyor, parent/children ilişkisini döndürüyor
- Seed güncellendiğinde otomatik yeni kategoriler gelir

### 5.2 Yeni endpoint: Hero Slider için

- `GET /api/hero-slides` → slider'da gösterilecek kategori slide'larını döndürür (dinamik endpoint, cache yok — seed verisi nadiren değişir)
- **Veri kaynağı:** Category model'indeki mevcut `image` alanı + yeni `isHeroSlide` boolean
- Seed'de 5-8 ana kategori `isHeroSlide: true` olarak işaretlenir
- `image` formatı: `/images/categories/{slug}.jpg` (mevcut Category.image alanı, slug bazlı deterministic path)
- Yanıt formatı: `{ slides: [{ id, name, slug, description, image }] }`
- Sıralama: Category.order alanına göre artan
- Filtre: `WHERE isHeroSlide = true`

---

## 6. Seed Verisi

- `prisma/seed.ts` güncellenecek (geliştirme aşaması, mevcut DB verisi silinip yeniden tohumlanır — migration script gerekmez)
- 8 ana kategori + alt kategoriler
- Her kategori için local image path (`/images/categories/{slug}.jpg`)
- Mevcut 12 kategori Bahçe & Peyzaj altında toplanır, 5 yeni alt kategoriyle genişletilir
- `prisma db push && npx prisma db seed` ile uygulanır

---

## 7. Yapılmayacaklar (Out of Scope)

- Gerçek AI tabanlı görsel işleme
- Kullanıcı yükleme sistemi değişikliği (portfolio upload zaten var)
- Admin paneli (ayrı spec'te)
- Test yazımı (ayrı spec'te)

---

## 8. İmplementasyon Sırası

1. Pinterest görsel indirme (`pinterest-dl`)
2. `ImageWithFallback` component
3. Seed verisi güncelleme (Prisma schema'ya `isHeroSlide` ekle + migrate)
4. `CategoryTiles` dinamiğe çevirme
5. Hero slider
6. `ServiceCard` & `PlaceCard` güncelleme
7. Eski Unsplash referanslarını temizleme
