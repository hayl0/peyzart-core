# Peyzart Landscaper Panel — Tasarım Spesifikasyonu

**Tarih:** 18 Haziran 2026
**Versiyon:** 1.0
**Durum:** Taslak

---

## 1. Genel Bakış

Peyzart Landscaper Panel, peyzaj profesyonellerinin işlerini yönettiği operasyon merkezidir. 8 modülden oluşur: Kontrol Paneli, Siparişler, Hizmetler, Kazançlar, Takvim, Portföy, Yorumlar, Profil & Ayarlar.

---

## 2. Navigasyon Yapısı (Hybrid)

### 2.1 Desktop
- **Üst Bar:** Peyzart logosu (Billabong gradient `logo-gradient` class) | "PEYZAJCI PANELİ" etiketi | Bildirim zili | Kullanıcı avatarı
- **Sol Mini İkon Bar:** 56px genişlik, dikey ikon listesi. Aktif sayfa lime vurgulu (`rgba(205,220,57,0.1)` background). Her ikon altında 6px label
- **İçerik Alanı:** Geri kalan tüm alan

### 2.2 Mobile
- **Bottom Tab Bar:** 5 ikonlu mobil tab bar, aktif tab lime vurgulu
- **Header:** Sadece logo + bildirim + avatar (sidebar gizlenir)

### 2.3 Sidebar İkonları (sıralama)
| # | İkon | Modül |
|---|------|-------|
| 1 | LayoutDashboard | Kontrol Paneli |
| 2 | ClipboardList | Siparişler |
| 3 | Briefcase | Hizmetler |
| 4 | DollarSign | Kazançlar |
| 5 | Calendar | Takvim |
| 6 | Images | Portföy |
| 7 | Star | Yorumlar |
| 8 | Settings (en altta) | Profil & Ayarlar |

---

## 3. Görsel Tasarım Dili: Neo Nature

### 3.1 Renk Paleti
| Token | Değer | Kullanım |
|-------|-------|----------|
| `--panel-bg` | `#0D2E1A` | Ana zemin |
| `--panel-bg-secondary` | `#1A3A20` | Gradient ikincil |
| `--panel-card` | `rgba(255,255,255,0.03)` | Kart zemini |
| `--panel-card-border` | `rgba(76,175,80,0.08)` | Kart border |
| `--panel-accent-lime` | `#CDDC39` | Birincil vurgu |
| `--panel-accent-green` | `#4CAF50` | İkincil vurgu |
| `--panel-accent-emerald` | `#00C853` | Gelir vurgusu |
| `--panel-accent-purple` | `#CE93D8` | Tepki süresi |
| `--panel-text-primary` | `#FFFFFF` | Ana metin |
| `--panel-text-secondary` | `rgba(255,255,255,0.3)` | İkincil metin |
| `--panel-text-tertiary` | `rgba(255,255,255,0.2)` | Üçüncül metin |
| `--panel-divider` | `rgba(76,175,80,0.06)` | Ayırıcı |

### 3.2 Kart Stilleri
- **Radius:** 18px (KPI kartlar), 20px (büyük paneller)
- **Zemin:** `rgba(255,255,255,0.03)` koyu cam efekti
- **Border:** 1px `rgba(76,175,80,0.08)`
- **Hover:** `rgba(255,255,255,0.05)` zemin
- **İkon Container:** 7px padding, 9px radius, renk kodlu arka plan

### 3.3 Tipografi
- **Başlıklar:** Sora, 18px font-weight 700, white
- **Alt başlık:** 11px, `rgba(255,255,255,0.3)`
- **KPI değer:** 22px font-weight 700, white
- **KPI label:** 9px font-weight 600, `rgba(255,255,255,0.30)`, uppercase, letter-spacing 0.3px
- **Kart içi başlık:** 11px font-weight 600
- **Kart içi metin:** 10px, tertiary

### 3.4 Bar Grafik Stili
- Bar genişliği: flex-1 (ince, eşit aralıklı)
- Bar height: veri yüzdesine göre
- Renk: `linear-gradient(to top, rgba(76,175,80,0.3), rgba(76,175,80,0.08))`
- Border: 1px `rgba(76,175,80,0.12)`
- Aktif gün (Cuma): lime gradient + lime border
- Border radius: 4px 4px 0 0
- Her bar altında: gün etiketi (7px, tertiary, Cuma: `#CDDC39` font-weight 600)

### 3.5 Bildirim Elemanı
- Solda: 6px renkli dot (lime/yeşil/emerald) + glow shadow
- Sağda: Başlık (11px, `rgba(255,255,255,0.65)`, font-weight 600) + açıklama (10px, tertiary)
- Arka plan: `rgba(renk,0.03)` tonlu
- Border-radius: 10px

---

## 4. Modül Detayları

### 4.1 Kontrol Paneli (Dashboard)
**Bileşenler:**
1. **Sayfa Başlığı:** "Kontrol Paneli" + karşılama mesajı
2. **Zaman Filtreleri:** "Bugün" / "Bu Hafta" / "Bu Ay" pill butonları, aktif olan lime vurgulu
3. **KPI Kartları (4'lü grid):**
   - Aktif Müşteri (Users ikonu, lime) — değer + ▲ %12
   - Devam Eden Proje (Layers ikonu, yeşil) — değer + ▲ %4
   - Bu Ay Gelir (DollarSign ikonu, emerald) — değer + ▲ %18 hedef
   - Tepki Süresi (Clock ikonu, mor) — değer + ▼ %15 iyileşme
4. **Haftalık Aktivite Grafiği:** 7 günlük bar chart
5. **Son Bildirimler:** 3 bildirim kartı

**State'ler:**
- **Loading:** Shimmer skeleton (4 KPI placeholder + chart placeholder + 3 notification placeholder)
- **Empty:** "Henüz veri bulunmuyor" mesajı + illustrasyon
- **Error:** Alert banner "Veriler yüklenemedi" + "Tekrar Dene" butonu

### 4.2 Siparişler (Orders)
**Bileşenler:**
1. **Sayfa Başlığı:** "Siparişler"
2. **Tab Filtreler:** Tümü / Bekleyen / Kabul Edilen / Devam Eden / Tamamlanan / İptal
3. **Sipariş Kartları:** Her kart:
   - Müşteri adı + durum badge'i
   - Hizmet adı (yeşil renk)
   - Tarih, saat, adres (inline ikonlu)
   - Müşteri notu (italik)
   - Fiyat (sağ üst)
   - **Pending:** Onay/Red buton çifti (lime/red)
   - **Accepted:** "Başlat" butonu (lime)
   - **In Progress:** "Tamamla" butonu
   - **Completed:** "Detay" linki

**State'ler:**
- **Loading:** 4 shimmer kart skeleton
- **Empty (tab bazlı):** "Bu kategoride talep bulunmuyor" mesajı
- **Error:** Alert banner
- **Cancelled:** Kırmızı badge + iptal zamanı

### 4.3 Hizmetler (Services)
**Bileşenler:**
1. **Sayfa Başlığı + "Hizmet Ekle" butonu**
2. **Hizmet Kartları:**
   - Hizmet adı + rating (yıldız)
   - Açıklama
   - Süre + birim
   - Fiyat
   - Aktif/Pasif toggle (Power ikonu)
   - Düzenle butonu (Edit2 ikonu)
3. **Yeni Hizmet Formu (show/hide):**
   - Hizmet adı input
   - Fiyat input
   - Açıklama textarea
   - Birim select (seans/m²/adet/proje)
   - Süre input
   - Kaydet / İptal butonları
4. **Çalışma Saatleri** (collapsible panel):
   - Gün bazlı açılış/kapanış saat seçici

**State'ler:**
- **Loading:** 3 shimmer kart skeleton
- **Empty:** "Henüz hizmet eklemediniz" + CTA buton
- **Saving:** "Kaydediliyor..." spinner
- **Validation:** Input altı kırmızı border + hata mesajı

### 4.4 Kazançlar (Earnings)
**Bileşenler:**
1. **Sayfa Başlığı + dönem filtresi (Bu Hafta/Bu Ay/Bu Yıl)**
2. **Özet Kartları (3'lü):** Toplam Kazanç, Bu Dönem, Geçen Dönem
3. **Gelir Grafiği:** Çizgi/alan grafiği (Recharts ile)
4. **İşlem Geçmişi Tablosu:**
   - Tarih, Müşteri, Hizmet, Tutar, Durum (Ödendi/Bekliyor)
5. **Hesap Bilgileri:** IBAN + Banka Adı (düzenlenebilir)

**State'ler:**
- **Loading:** Skeleton kartlar + grafik placeholder
- **Empty:** "Henüz kazanç kaydı bulunmuyor"
- **Error:** Alert banner

### 4.5 Takvim (Calendar)
**Bileşenler:**
1. **Sayfa Başlığı + navigasyon (Önceki/Sonraki ay)**
2. **Aylık Takvim Gridi:** Hafta bazlı, gün hücreleri
3. **Randevu İşaretçileri:** Yeşil dot'lu günler
4. **Gün Seçimi:** Tıklanan günün randevu listesi sağ panelde
5. **Müsaitlik Yönetimi:** Çalışma günleri toggle + tatil ekleme

**State'ler:**
- **Loading:** Takvim skeleton
- **Empty (gün):** "Bu günde randevu bulunmuyor"
- **Error:** Alert banner

### 4.6 Portföy (Portfolio)
**Bileşenler:**
1. **Sayfa Başlığı + "Fotoğraf Ekle" butonu**
2. **Grid Galeri:** 3 kolonlu masonry grid
3. **Kategori Filtreleri:** Tümü / Bahçe Düzenleme / Çim Bakımı / Sulama / vb
4. **Fotoğraf Upload Modal:**
   - Drag & drop zone
   - Kategori seçici
   - Açıklama alanı
5. **Detay Modal:** Büyük fotoğraf + bilgiler

**State'ler:**
- **Loading:** Grid skeleton (9 kutu)
- **Empty:** "Henüz fotoğraf eklemediniz" + upload CTA
- **Uploading:** Progress bar
- **Error:** Upload failed toast

### 4.7 Yorumlar (Reviews)
**Bileşenler:**
1. **Sayfa Başlığı + ortalama puan özeti**
2. **Yorum Kartları:**
   - Müşteri adı + avatar
   - Puan (yıldız)
   - Yorum metni
   - Tarih
   - "Yanıtla" butonu
3. **Yanıtlama:** Inline textarea + "Gönder" butonu
4. **Sıralama:** En yeni / En yüksek puan / En düşük puan

**State'ler:**
- **Loading:** 3 shimmer kart
- **Empty:** "Henüz yorum bulunmuyor"
- **Error:** Alert banner

### 4.8 Profil & Ayarlar (Settings)
**Bileşenler:**
1. **Profil Bilgileri:** İsim, e-posta, telefon, adres (düzenlenebilir input'lar)
2. **Profil Fotoğrafı:** Değiştirilebilir avatar
3. **Bildirim Tercihleri:** Toggle list (yeni sipariş, ödeme, yorum, vs)
4. **Şifre Değiştir:** Modal (eski şifre + yeni şifre + onay)
5. **Hesap Bağlantıları:** "Çıkış Yap", "Hesabı Sil" (kırmızı)

**State'ler:**
- **Loading:** Form skeleton
- **Saving:** "Kaydediliyor..." toast
- **Success:** "Profil güncellendi" toast (yeşil)
- **Error:** "Kaydedilemedi" toast (kırmızı)

---

## 5. Paylaşılan Bileşen Katmanı (_components/)

Tekrar eden UI parçaları `src/app/landscaper/_components/` altında toplanır:

| Bileşen | Kullanıldığı Modüller | Props |
|---------|----------------------|-------|
| `KpiCard` | Dashboard, Earnings | icon, label, value, change, changeType, accent |
| `NotificationItem` | Dashboard | title, desc, time, type (warning/success/info) |
| `ShimmerSkeleton` | Tümü | variant (card/row/table/chart) |
| `StatusBadge` | Orders, Services, Earnings | status, label |
| `EmptyState` | Tümü | icon, message, actionLabel, onAction |
| `ErrorBanner` | Tümü | message, onRetry |
| `TabFilter` | Orders, Portfolio, Reviews, Earnings | tabs: string[], active, onChange |
| `Pagination` | Orders, Earnings, Reviews | page, totalPages, onChange |
| `ConfirmModal` | Orders, Settings | title, message, onConfirm, variant |
| `Toast` | Services, Settings, Portfolio | message, type (success/error) |

---

## 6. Sayfalama (Pagination)

Tüm liste modülleri (Siparişler, Kazançlar, Yorumlar) 20'lik sayfalarla gelir:

- **Loading (sayfa):** Sayfa başına shimmer skeleton
- **Empty (sayfa):** "Bu sayfada kayıt bulunmuyor"
- **Error (sayfa bazlı):** Sadece o sayfanın alert banner'ı
- **Scroll:** Desktop'da sayfa numarası, mobil'de "Daha Fazla Yükle" butonu
- **Tab filtresi + sayfa:** Filtre değişince sayfa 1'e döner

---

## 7. Responsive Davranış

| Bileşen | Mobile (<768px) | Desktop (≥768px) |
|---------|----------------|-------------------|
| Navigasyon | Bottom Tab Bar (5 ikon) | Üst bar + Sol mini ikon bar |
| KPI Kartlar | 2 kolon grid | 4 kolon grid |
| Grafik+Bildirim | Stack (üst üste) | 2fr 1fr grid |
| Sipariş Kartları | Dikey stack, flex-column | Flex-row, geniş |
| Hizmet Formu | Single column | 2 kolon |
| Galeri | 2 kolon | 3 kolon |
| Takvim | Tam genişlik | Sol takvim + sağ detay |

---

## 8. Animasyon İlkeleri

- **Kart hover:** `transition-all 0.2s`, background `rgba(255,255,255,0.03) → rgba(255,255,255,0.07)`
- **Sayfa geçişi:** Fade in 0.2s
- **Loading:** Shimmer animation (Tailwind animate-pulse)
- **Toggle/switch:** Scale + opacity transition 0.2s
- **Bildirim dot:** Pulsing glow animation
- **Tab geçişi:** Slide + fade

---

## 9. Çalışma Saatleri & Müsaitlik — Tek Kaynak

**Kural:** "Çalışma Saatleri" (Hizmetler modülü) ve "Müsaitlik Yönetimi" (Takvim modülü) aynı veri kaynağına yazılır. Kullanıcı nereden değiştirirse değiştirsin, tek `LandscaperAvailability` modeli güncellenir:
- `workingHours`: gün bazlı açılış/kapanış saatleri
- `blockedDates`: özel tatil/kapalı günler
- `isAvailable`: günlük toggle

---

## 10. API Route Yapısı

| Modül | Method | Path | Açıklama |
|-------|--------|------|----------|
| **Dashboard** | GET | `/api/landscaper/dashboard` | KPI metrikler + bildirimler + haftalık aktivite |
| **Orders** | GET | `/api/landscaper/orders?tab=&page=&limit=` | Filtrelenmiş sipariş listesi (20'li sayfa) |
| | PATCH | `/api/landscaper/orders/[id]/status` | Durum güncelle (accept/reject/start/complete) |
| | GET | `/api/landscaper/orders/[id]` | Sipariş detay |
| **Services** | GET | `/api/landscaper/services` | Hizmet listesi |
| | POST | `/api/landscaper/services` | Yeni hizmet ekle |
| | PATCH | `/api/landscaper/services/[id]` | Hizmet güncelle / toggle |
| | DELETE | `/api/landscaper/services/[id]` | Hizmet sil |
| | GET/PATCH | `/api/landscaper/availability` | Çalışma saatleri (tek kaynak) |
| **Earnings** | GET | `/api/landscaper/earnings?period=&page=&limit=` | Gelir verisi + grafik + işlem geçmişi |
| | PATCH | `/api/landscaper/account` | IBAN / banka bilgisi güncelle |
| **Calendar** | GET | `/api/landscaper/calendar?month=&year=` | Ay bazlı takvim + randevular |
| | POST | `/api/landscaper/calendar/block` | Tarih blokla (tatil) |
| | DELETE | `/api/landscaper/calendar/block/[id]` | Blokajı kaldır |
| **Portfolio** | GET | `/api/landscaper/portfolio?category=` | Portföy fotoğrafları |
| | POST | `/api/landscaper/portfolio/upload` | Fotoğraf yükle |
| | DELETE | `/api/landscaper/portfolio/[id]` | Fotoğraf sil |
| **Reviews** | GET | `/api/landscaper/reviews?sort=&page=&limit=` | Yorum listesi |
| | POST | `/api/landscaper/reviews/[id]/reply` | Yoruma yanıt ver |
| **Settings** | GET/PATCH | `/api/landscaper/profile` | Profil bilgileri + bildirim tercihleri |
| | PATCH | `/api/landscaper/password` | Şifre değiştir |
| | DELETE | `/api/landscaper/account` | Hesabı sil |

### Authorization
- Tüm endpoint'ler Firebase Auth token ile korunur
- `reviews/[id]/reply`: Peyzajcı yalnızca kendi hizmetine ait yorumlara yanıt verebilir
- `orders/[id]/status`: Yalnızca siparişin atandığı peyzajcı güncelleyebilir

### Response Format (tüm endpoint'ler)

```typescript
// Success
{ data: T, pagination?: { page: number, totalPages: number, total: number } }

// Error
{ error: true, message: string, code?: string }
```

---

## 11. Data Flow

```
Component → Server Action / API Route → Prisma → PostgreSQL
                    ↓
             Firebase Auth (token doğrulama)
                    ↓
          Client: loading/error/success/pagination states
```

Tüm veriler `use client` component'lerinde yönetilir. API route'lar `/api/landscaper/*` altında toplanır. Tab filtreleri URL query string ile yönetilir (`?tab=pending&page=1`) — böylece deep-link ve browser back/forward çalışır.

---

## 12. Component Dosya Yapısı

```
src/app/landscaper/
├── layout.tsx                    # Hybrid nav layout
├── page.tsx                      # Redirect to /landscaper/dashboard
├── dashboard/page.tsx            # KPI + grafik + bildirimler
├── orders/page.tsx               # Tab filtresi + sipariş kartları
├── services/page.tsx             # Hizmet listesi + form + çalışma saatleri
├── earnings/page.tsx             # Grafik + tablo + IBAN
├── calendar/page.tsx             # Takvim + randevular
├── portfolio/page.tsx            # Galeri + upload
├── reviews/page.tsx              # Yorumlar + yanıtlama
└── settings/page.tsx             # Profil + ayarlar + şifre
```

Her modül kendi `page.tsx` dosyasında state'leri (loading/empty/error/success) yönetir.
