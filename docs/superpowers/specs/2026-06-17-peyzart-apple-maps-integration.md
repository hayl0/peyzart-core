# Peyzart Apple Maps Estetiğinde Mapbox Entegrasyonu

**Tarih:** 17 Haziran 2026
**Versiyon:** 1.0
**Durum:** Onaylandı

---

## 1. Amaç

Müşteri ana sayfasındaki NearbySection haritasını, Apple Maps aesthetic'ine birebir benzeyen, premium hissettiren, kompakt ve işlevsel bir Mapbox haritasına dönüştürmek.

**Referans:** Apple Maps (iOS/macOS) — minimal, sade, muted renk paleti, ince detaylar, cam efekti overlays.

---

## 2. Teknoloji

| Karar | Seçim |
|-------|-------|
| **Harita Motoru** | Mapbox GL JS |
| **React Wrapper** | react-map-gl |
| **API Token** | `NEXT_PUBLIC_MAPBOX_TOKEN` (.env.local) |
| **Map Style (Light)** | `mapbox://styles/mapbox/light-v11` (customize edilecek) |
| **Map Style (Dark)** | `mapbox://styles/mapbox/dark-v11` (customize edilecek) |

---

## 3. Bileşen Mimarisi

```
NearbySection (ana container)
├── MapSection (compact map wrapper)
│   ├── MapboxMap (react-map-gl instance)
│   │   ├── Custom Marker × N (Peyzart yeşil gradient noktalar)
│   │   └── Popup (tıklandığında: isim, hizmet, puan, fiyat)
│   ├── GlassSearchOverlay (cam efektli arama çubuğu)
│   ├── FilterChips (inline pill'ler)
│   └── MapControls (zoom +/−, locate 📍, expand ⛶)
└── PlaceCardsRow (yatay kaydırmalı kartlar)
    └── PlaceCard × N (Apple Maps place card stili)
```

---

## 4. Tasarım Detayları

### 4.1 Harita Boyutları

| Ekran | Yükseklik | Genişlik |
|-------|-----------|----------|
| Mobile (<768px) | 200px | full width |
| Desktop (≥768px) | 260px | full width |
| Expanded (fullscreen) | 100vh | 100vw |

### 4.2 Apple Maps Renk Paleti (Mapbox Custom)

Apple Maps muted, sofistike renkler:

```
Yollar:  #F5F5F5 (light) / #333333 (dark)
Parklar: #E8F0E0 (light) / #1A3A1A (dark)
Water:   #D4E7F7 (light) / #1A2A3A (dark)
Binalar: #EDEDED (light) / #2A2A2A (dark)
Etiket:  #666666 (light) / #AAAAAA (dark)
```

Mapbox üzerinden bu renkler custom style ile veya runtime styling ile uygulanacak.

### 4.3 Marker Tasarımı

Apple Maps minimal pin'lerinden ilham alan Peyzart marker'ları:

```
         ●
      ╱  ▲  ╲          ← 12px çapında daire
     │  🟢  │         ← Peyzart gradient (#4CAF50 → #2E7D32)
      ╲     ╱          ← İnce beyaz border (1px)
         ◆             ← Hafif gölge (drop-shadow)
```

SVG olarak implemente edilecek, `currentColor` ile tema desteği.

**Boyutlar:**
- Normal: 12px daire
- Seçili (active): 16px daire + pulse animasyonu

### 4.4 Glass Overlay

Apple Maps'in kamera efekti — haritanın üst kısmında gradient + blur:

```css
glass-overlay {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 100px;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.95) 0%,
    rgba(255,255,255,0.6) 60%,
    transparent 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

Dark mode'da:
```css
[data-theme="dark"] .glass-overlay {
  background: linear-gradient(
    to bottom,
    rgba(10,46,26,0.95) 0%,
    rgba(10,46,26,0.6) 60%,
    transparent 100%
  );
}
```

### 4.5 Filter Chips

Apple Maps kategori filtrelerine benzer — inline pill'ler, doğrudan glass overlay içinde:

- Yatay scroll (overflow-x auto)
- Seçili: dolgu yeşil (#4CAF50) + beyaz yazı
- Seçili değil: saydam arka plan + ince border
- Her chip: ikon (SVG) + etiket

### 4.6 Place Cards (Yatay Scroll)

Apple Maps'in alt kısmındaki place kartları:

```
┌─────────────────┬─────────────────┬─────────────────┐
│  🌿 Çim Bakımı  │  🎨 Peyzaj     │  💧 Sulama      │
│  Bahçe Sanatı   │  Yeşil Dünya   │  Zeytin Peyzaj  │
│  ★4.2 (124)     │  ★5.0 (89)     │  ★4.8 (210)     │
│  ₺350 · 2.3km   │  ₺750 · 5.1km  │  ₺1200 · 3.5km  │
└─────────────────┴─────────────────┴─────────────────┘
```

**Teknik detay:**
- Yatay kaydırma (overflow-x + scroll-snap)
- Her kart: ~200px genişlik, gradient kapak, bilgiler
- Snap scroll ile sayfalama
- Scrollbar gizli (scrollbar-hide)

### 4.7 Kontroller

Apple Maps'teki gibi minimal, saydam kontroller:

| Kontrol | Pozisyon | Davranış |
|---------|----------|----------|
| Zoom + | Sağ alt, glass buton | Map zoom in |
| Zoom − | Sağ alt, zoom+ altı | Map zoom out |
| Konum 📍 | Sağ alt, en altta | Fly to user location |
| Genişlet ⛶ | Sol alt | Fullscreen toggle |

Her kontrol: 36×36px, round, glassmorphism arka plan, hover'da scale(1.05).

---

## 5. State Yönetimi

| State | Tip | Başlangıç | Açıklama |
|-------|-----|-----------|----------|
| `viewport` | `{lat, lng, zoom}` | İstanbul (41.0082, 28.9784, zoom: 11) | Harita merkezi |
| `selectedMarker` | `string \| null` | `null` | Seçili peyzajcı ID'si |
| `isFullscreen` | `boolean` | `false` | Genişletilmiş harita |
| `userLocation` | `[number, number] \| null` | `null` | Kullanıcı konumu |
| `activeFilter` | `string` | `'all'` | Aktif filtre |
| `searchQuery` | `string` | `''` | Arama metni |

---

## 6. Mapbox Token Yönetimi

- `.env.local` -> `NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx`
- Kullanıcı [mapbox.com](https://www.mapbox.com)'dan ücretsiz token alacak
- Development'da public token kullanılabilir
- Production'da domain-restricted token önerilir

---

## 7. Tema Desteği

| Tema | Mapbox Style | Overlay Bg | Marker |
|------|-------------|------------|--------|
| Açık (light) | `mapbox://styles/mapbox/light-v11` | Beyaz gradient | Yeşil gradient |
| Koyu (dark) | `mapbox://styles/mapbox/dark-v11` | Dark forest gradient | Lime gradient |

Tema değişimi `data-theme` attribute'una göre dinamik olarak Mapbox style değiştirir.

---

## 8. Responsive Davranış

| Breakpoint | Map Height | Kart Layout | Filtreler |
|------------|-----------|-------------|-----------|
| <640px | 180px | Horizontal scroll (220px width) | Inline scroll |
| 640-1024px | 220px | Horizontal scroll (260px width) | Inline scroll |
| >1024px | 260px | Horizontal scroll (300px width) | Inline wrap |

---

## 9. Uygulama Adımları

### Adım 1: Paketleri Yükle
```bash
npm install mapbox-gl react-map-gl @types/mapbox-gl
```

### Adım 2: .env.local'e Token Ekle
```
NEXT_PUBLIC_MAPBOX_TOKEN=<token>
```

### Adım 3: Mapbox CSS import (globals.css)
```css
@import "mapbox-gl/dist/mapbox-gl.css";
```

### Adım 4: MapboxMap Bileşeni
- Mapbox GL JS instance
- Custom marker renderer
- Popup component
- Viewport state management

### Adım 5: NearbySection Redesign
- Glass overlay
- Filter chips
- Map controls
- Place cards row

### Adım 6: ServiceCard Horizontal Variant
- Apple Maps place card stili
- Yatay layout
- Kompakt bilgiler

---

*Bu doküman brainstorming süreci sonunda oluşturulmuştur ve Apple Maps aesthetic'ini Peyzart markasına uyarlar.*
