görmek # Peyzart Platform — Tasarım Spesifikasyonu

**Tarih:** 14 Haziran 2026
**Versiyon:** 1.2
**Durum:** Taslak

---

## 1. Proje Vizyonu

Peyzart, müşteriler ve peyzaj uzmanlarını buluşturan, premium bir hizmet platformudur.
Türkiye'de peyzaj-specific marketplace + mobil uygulama boşluğunu doldurmayı hedefler.

**Ton:** Genç, dinamik, premium, doğa dostu
**Hedef Kitle:**
- Müşteriler: Villa sahipleri, site yöneticileri, işletmeler (30-55 yaş)
- Peyzajcılar: Profesyonel bahçıvanlar, peyzaj firmaları (25-50 yaş)

---

## 2. Brand Identity

### 2.1 Logo & Yazı Tipi

| Element | Değer |
|---------|-------|
| **Logo Font** | Billabong (el yazısı script) |
| **Body Font** | Sora (sans-serif) |
| **Mono Font** | JetBrains Mono |
| **Logo Stili** | Gradient + faux-bold (font-weight: 700) |

### 2.2 Logo Gradient

```
Koyu Yeşil → Orman Yeşili → Parlak Yeşil → Lime → Sarı Uç
 #0A2E1A  →   #1B5E20   →   #4CAF50   → #CDDC39 → #FBC02D
```

### 2.3 Renk Paleti

| Renk | Kod | Kullanım |
|------|-----|----------|
| Dark Forest | `#0A2E1A` | Koyu zeminler, footer |
| Peyzart Green | `#1B5E20` | Birincil marka rengi |
| Medium Green | `#2E7D32` | Butonlar, vurgular |
| Bright Green | `#4CAF50` | İkincil butonlar, linkler |
| Lime | `#CDDC39` | Birincil aksiyon, kayıt butonu |
| Nature Bg | `#F5F7F0` | Sayfa arka planı |
| Clean White | `#FFFFFF` | Kartlar, modaller |
| Warning Yellow | `#FBC02D` | Uyarılar, badge'ler |

### 2.4 CSS Sınıfları

```css
.logo-gradient {
  font-family: 'Billabong', cursive;
  font-weight: 700;
  background: linear-gradient(135deg, #0a2e1a, #1b5e20, #4caf50, #cddc39, #fbc02d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 3. Tasarım Sistemi

### 3.1 Bileşen Stilleri

| Bileşen | Stil |
|---------|------|
| **Birincil Buton** | Lime gradient (`#CDDC39 → #4CAF50`), 50px radius, koyu yazı |
| **İkincil Buton** | Green gradient (`#2E7D32 → #4CAF50`), 50px radius, beyaz yazı |
| **Kartlar** | Beyaz zemin, 24px radius, soft shadow, 1px `#E8EDE0` border |
| **Input'lar** | Beyaz zemin, 1.5px `#E0E6D8` border, 14px radius, focus: green border |
| **Badge'ler** | 50px radius, renk kodlu (yeşil/sarı/kırmızı) |
| **Switcher** | `#F5F7F0` zemin, aktif seçenek beyaz kart + shadow |
| **Loading** | Skeleton loading (kartlar için shimmer animasyonu) |
| **Empty State** | İllüstrasyon + "Henüz hizmet bulunamadı" mesajı + filtre sıfırla butonu |
| **Error State** | Kırmızı alert banner + "Tekrar dene" butonu |

### 3.2 Tipografi Hiyerarşisi

```
H1: Sora Black 48px, -0.04em letter-spacing
H2: Sora Bold 32px
H3: Sora Semibold 24px
Body: Sora Regular 15px
Label: Sora Bold 12px, uppercase
Small: Sora Medium 11px
```

### 3.3 Aralıklar

```
Kart padding: 32px
Sayfa padding: 24px
Stack spacing: 16px
Grid gap: 24px
Border radius (genel): 14-24px
```

---

## 4. Sayfa Tasarımları & State'ler

### 4.1 Auth (Giriş/Kayıt)

**Flow:**
1. Müşteri/Peyzajcı switcher
2. E-posta + şifre ile giriş
3. "veya" divider → Google / E-posta ile devam
4. Kayıt: Ad, Soyad, E-posta, Telefon, Şifre
5. Şifre gücü göstergesi (badge'ler)

**State'ler:**
- **Loading:** Butonda spinner + "Giriş yapılıyor..." metni, inputlar disabled
- **Error:** Input altında kırmızı hata mesajı ("E-posta veya şifre hatalı"), 3 başarısız denemeden sonra "Şifremi Unuttum" linki vurgulanır
- **Success:** Token localStorage'e kaydedilir, yönlendirme (role göre customer/landscaper dashboard)
- **Validation:** E-posta formatı, şifre minimum 8 karakter, telefon formatı kontrolü anlık yapılır

### 4.2 Ana Sayfa (Müşteri Home Page)

**Layout:** Mobil-öncelikli, full-width harita üstte + altında kart grid
- Harita: ~30vh yükseklik, Google Maps embed, konum marker'ları
- Arama çubuğu: Haritanın üstünde floating, "Hizmet veya peyzajcı ara..."
- Filtre chip'leri: Harita altında yatay scroll, SVG ikonlu (Hizmet, Fiyat, Puan, Mesafe)
- Kart grid: 2 kolon, 10px gap

**Service Kartı:**
- Beyaz/off-white zemin (#FAFBF8), 20px border-radius, soft shadow
- Üst: gradient kapak fotoğrafı (hizmet kategorisine göre renk)
- Uzman adı (15px, bold, #0A2E1A)
- Hizmet adı (12px, #888)
- Yıldız puanı (SVG star, #f59e0b) + puan + yorum sayısı
- Fiyat (18px, extrabold, #2E7D32) + mesafe (12px, #999)

**State'ler:**
- **Loading:** Harita skeleton (30vh gradient placeholder) + 4 shimmer kart skeleton
- **Empty:** İllüstrasyon + "Bu kriterlere uygun peyzajcı bulunamadı" + "Filtreleri Sıfırla" butonu
- **Error:** Kırmızı alert banner + "Tekrar Dene" butonu
- **Success:** Marker'lı harita + kart grid

**Navigasyon (App Shell):**
- Mobil: Bottom Tab Bar (5 tab — Ana Sayfa, Keşfet, Favoriler, Siparişler, Profil)
- Desktop: Sidebar (logo + 5 nav item + kullanıcı avatarı)
- Gece/Gündüz modu toggle'ı: Header sağ üst köşede (ay/güneş ikonu)

### 4.3 Hizmet Detay

- Peyzajcı profili: fotoğraf, isim, puan, yorum sayısı, sertifika badge'i
- Galeri: geçmiş iş resimleri (grid/swipe)
- Yorumlar: avatar, isim, puan, tarih, metin
- Müsaitlik: 7 günlük takvim (yeşil/boş gri)
- CTA: "Teklif Al" modal'ı açar, "Hemen Rezervasyon" /odeme'ye yönlendirir

**State'ler:**
- **Loading:** Profil skeleton + galeri placeholder + yorum skeleton
- **Error:** "Peyzajcı bilgileri yüklenemedi" + geri dön butonu
- **Empty fields:** "Henüz yorum bulunmuyor" mesajı

### 4.4 Booking (Rezervasyon)

3 adımlı flow:
1. Adres + tarih + saat seçimi + not alanı
2. Ödeme bilgileri (kart formu)
3. Onay ekranı (checkmark animasyonu + sipariş özeti)

Progress stepper üstte (1-2-3), geri/altta iptal butonu

**State'ler:**
- **Loading:** Adım geçişinde spinner, "Kaydediliyor..."
- **Validation:** Tarih geçmişse uyarı, adres boşsa kırmızı border
- **Error (step 1):** "Adres doğrulanamadı, lütfen kontrol edin"
- **Error (step 2):** "Ödeme başarısız oldu" + kart bilgilerini koru
- **Error (step 3):** "Sipariş oluşturulamadı" + "Tekrar Dene"
- **Success:** Animasyon + yönlendirme /orders'a

### 4.5 Ödeme Sayfası

- Kart/wallet seçici (2 seçenek: kart veya Peyzart Wallet)
- Kart formu: isim, kart no (masked), SKT (AA/YY), CVC
- Sipariş özeti: sağ sticky panel (hizmet adı, peyzajcı, tarih, adres, tutar)
- İndirim kodu alanı + "UYGULA" butonu
- Iyzico 3D Secure yönlendirmesi

**State'ler:**
- **Loading:** Butonda "İşleniyor..." spinner
- **Validation:** Kart no 16 hane değilse hata, SKT geçmişse hata, CVC 3 hane değilse hata
- **Error:** "Ödeme başarısız, lütfen tekrar deneyin" + kart bilgileri korunur
- **3D Secure:** Banka yönlendirme sayfası (iframe/popup)
- **Success:** Onay ekranına yönlendir

### 4.6 Sipariş Takip

- Timeline: Bekliyor (🟡) → Kabul (🔵) → Yolda (🟣) → Tamamlandı (✅)
- Her adımda tarih/saat bilgisi
- Harita (peyzajcı konumu, canlı değil)
- Peyzajcı bilgisi + iletişim butonu

**State'ler:**
- **Loading:** Timeline skeleton
- **Empty:** "Henüz siparişiniz bulunmuyor" + "Hizmet Keşfet" butonu
- **Error:** "Sipariş bilgileri yüklenemedi"
- **Cancelled:** Kırmızı badge + "İptal Edildi" + iade bilgisi

### 4.7 Profil & Geçmiş

- Kullanıcı bilgileri: isim, e-posta, telefon, adres (düzenlenebilir)
- Geçmiş siparişler: kart listesi (hizmet adı, tarih, tutar, durum badge'i)
- Puanlama: henüz puanlanmamış siparişler için "Puanla" butonu
- Destek: "Canlı Destek" (e-posta formu)
- Bildirim ayarları: toggle list
- Şifre değiştir: modal (eski şifre + yeni şifre + onay)

**State'ler:**
- **Saving:** "Kaydediliyor..." toast
- **Error:** "Bilgiler güncellenemedi"
- **Success:** "Profil güncellendi" toast (yeşil)
- **Password Error:** "Eski şifre hatalı"

---

## 5. Peyzajcı Paneli

### 5.1 Dashboard
- **Metrik kartları (4):** Aktif müşteriler, devam eden projeler, bu ay gelir, ortalama tepki süresi
- **Uyarılar:** Bildirim kartları (severity: warning/info/success), tıklanabilir
- **Haftalık grafik:** Bar chart (günlük aktivite %'si)
- **Proje tablosu:** Proje adı, müşteri, durum badge'i, ilerleme barı, bütçe, tarih

**State'ler:** Loading (skeleton), Error (alert banner), Empty (henüz veri yok)

### 5.2 Sipariş Yönetimi
- **Gelen Talepler:** Liste (müşteri, hizmet, tarih, tutar), onay/red butonları, fiyat teklifi input'u
- **Onaylananlar:** Takvim görünümü (günlük/haftalık)
- **Geçmiş:** Tamamlanan siparişler, filtre (tarih aralığı)

**State'ler:** Loading skeleton, Empty ("Henüz talep yok"), Error

### 5.3 Hizmet Yönetimi
- Hizmet listesi: isim, fiyat, birim (m2/saat/sabit), durum (açık/kapalı) toggle
- Hizmet ekleme formu: isim, açıklama, fiyat, birim
- Çalışma saatleri: gün bazlı açılış/kapanış

**State'ler:** Loading, Saving toast, Error, Validation

### 5.4 Kazançlar & Yorumlar
- **Kazanç özeti:** Günlük/haftalık/aylık grafik (recharts)
- **Yorumlar:** Müşteri adı, puan (star), yorum metni, tarih
- **Hesap:** IBAN, banka adı (düzenlenebilir)

---

## 6. Admin Paneli (Web)

- **Kullanıcı Yönetimi:** Tablo (isim, e-posta, rol, kayıt tarihi), ban/aktif et
- **Peyzajcı Yönetimi:** Onay/red (belge kontrolü), sertifika durumu
- **Sipariş Akışı:** Tüm siparişler, filtre (durum/tarih/peyzajcı)
- **Şikayetler:** Liste (şikayet eden, şikayet edilen, açıklama), çözüldü olarak işaretle
- **İstatistikler:** Kayıtlı kullanıcı sayısı, toplam sipariş, gelir, popüler hizmetler (recharts)
- **Bildirim:** Tüm kullanıcılara push notification gönderme formu

**State'ler:** Loading table skeleton, Empty ("Kayıtlı kullanıcı yok"), Error

---

## 7. Veri Modelleri (Core Entities)

Referans: `prisma/schema.prisma` — mevcut şema aşağıdaki entity'leri tanımlar:

| Entity | Temel Alanlar |
|--------|--------------|
| **User** | id, name, email (unique), password, role (CUSTOMER/LANDSCAPER/ADMIN), phone, address, lat, lng |
| **LandscaperProfile** | id, userId, companyName, bio, experience, rating, reviewCount, isVerified, isOpen |
| **LandscaperService** | id, name, description, price, unit (m2/hour/fixed), profileId |
| **Order** | id, status (PENDING/ACCEPTED/IN_PROGRESS/COMPLETED/CANCELLED), totalPrice, serviceName, serviceDate, address, lat, lng, customerId, landscaperId |
| **Review** | id, rating (1-5), comment, customerId, landscaperId |
| **Payment** | id, orderId, amount, currency, status, provider (IYZICO/STRIPE), transactionId |
| **Wallet** | id, balance, currency, userId |
| **PortfolioImage** | id, url, landscaperProfileId |

---

## 8. Mimari Kararlar

### 8.1 Teknoloji Stack

| Karar | Seçim |
|-------|-------|
| **Framework** | Next.js 16 (React 19) |
| **Styling** | Tailwind CSS v4 + CSS custom properties |
| **State Management** | React Context (auth) + Zustand (global UI state) |
| **Auth** | Firebase Authentication (email + Google OAuth) |
| **Database** | PostgreSQL + Prisma ORM |
| **API Layer** | Next.js API Routes (`/api/*`), server actions |
| **Payments** | Iyzico + Stripe (webhook handlers) |
| **Maps** | Google Maps API (@react-google-maps/api) |
| **Animations** | Framer Motion + GSAP (landing page) |
| **Mobile** | Capacitor (iOS/Android) |
| **Deploy** | Vercel |
| **Font** | Billabong (brand) + Sora (body) |

### 8.2 API Routes Structure

```
/api/auth/register   → POST (Firebaes + Prisma user create)
/api/auth/login      → POST (Firebase auth)
/api/auth/me         → GET (mevcut kullanıcı)

/api/services        → GET (filtreleme: tip, fiyat, puan, mesafe)
/api/services/[id]   → GET (detay + yorumlar)

/api/orders          → GET (kullanıcının siparişleri), POST (yeni sipariş)
/api/orders/[id]     → GET, PATCH (durum güncelle)

/api/landscaper/profile      → GET, PATCH
/api/landscaper/services     → GET, POST, DELETE
/api/landscaper/earnings     → GET (tarih aralığı ile)
/api/landscaper/orders       → GET (gelen talepler)

/api/payments/create         → POST (Iyzico/Stripe ödeme oluştur)
/api/payments/webhook        → POST (Iyzico/Stripe callback)

/api/admin/users      → GET, PATCH (ban/aktif)
/api/admin/stats      → GET (dashboard istatistikleri)
```

### 8.3 Error Handling Strategy

- **API:** Tüm endpoint'lerde try/catch, `{ error: true, message: string }` formatı
- **Client:** `react-query` (veya built-in fetch) ile loading/error/data pattern'i
- **Global:** ErrorBoundary (Next.js error.tsx), her route group için ayrı
- **Validation:** Zod ile request body validation (server-side), client-side form validation

### 8.4 Data Flow

```
Kullanıcı → Next.js Page → Client Component → API Route → Prisma → PostgreSQL
                                                              ↓
                                                        Firebase Auth (token doğrulama)
```

---

## 9. Tema Geçiş Stratejisi

### Tema Dağılımı
- **Landing page (koyu tema):** Korunacak, sadece logo Billabong gradient
- **App içi sayfalar:** Kullanıcı tercihine göre açık/koyu tema
- **Auth sayfaları:** Açık tema (beyaz zemin, ortalanmış kart)
- **Peyzajcı/Admin panelleri:** Koyu tema (dashboard zaten koyu, profesyonel his)

### Dark Mode Detayı
- **Yöntem:** CSS custom properties + Tailwind `dark:` variant (`@custom-variant dark`)
- **Toggle:** App shell header'da ay/güneş ikonu, localStorage ile kalıcı
- **Sistem uyumu:** `prefers-color-scheme: dark` medya sorgusu ile otomatik geçiş
- **Geçiş animasyonu:** Tüm renk değişimlerinde `transition: background-color 0.3s, color 0.3s`

### Dark Mode Renk Paleti
| Token | Açık Mod | Koyu Mod |
|-------|----------|----------|
| `--color-nature-bg` | #EDF0E6 | #0A2E1A |
| `--color-nature-card` | #FAFBF8 | #14281A |
| `--color-nature-border` | #DDE4D5 | rgba(255,255,255,0.06) |
| `--color-nature-input-bg` | #F5F7F0 | rgba(255,255,255,0.05) |
| Primary text | #0A2E1A | #F0F0F0 |
| Secondary text | #888 | #999 |

---

## 10. Geliştirme Yol Haritası

### Faz 1: Tasarım Sistemi & Auth
- [x] Tema değişkenleri ve globals.css güncellemesi
- [x] Auth sayfalarının Nature-First temaya geçirilmesi
- [x] Firebase Auth entegrasyonu (register/login/logout)
- [x] AuthContext provider
- [x] Dark mode altyapısı

### Faz 2: Müşteri Ana Sayfası & Navigasyon
- [ ] Müşteri Ana Sayfası (harita + hizmet kart grid)
- [ ] Dark mode toggle implementasyonu
- [ ] Bottom Tab Bar (mobil navigasyon)
- [ ] Sidebar (desktop navigasyon)
- [ ] Hizmet detay sayfası
- [ ] Booking flow

### Faz 3: Sipariş & Profil
- [ ] Sipariş takip sayfası
- [ ] Profil + geçmiş siparişler
- [ ] Puanlama sistemi

### Faz 4: Peyzajcı Paneli
- [ ] Dashboard (gerçek metrikler)
- [ ] Sipariş yönetimi
- [ ] Kazanç takibi
- [ ] Hizmet yönetimi CRUD

### Faz 5: Admin & Premium
- [ ] Admin paneli (kullanıcı/sipariş yönetimi)
- [ ] İstatistikler
- [ ] Push notification
- [ ] Landing page güncelleme

---

*Bu doküman brainstorming süreci sonunda oluşturulmuştur ve sonraki planlama adımı için temel teşkil eder.*
