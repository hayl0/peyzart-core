# Landscaper Panel Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development to implement this plan. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Transform the existing Landscaper Panel into a premium Neo Nature-designed 8-module operation center with Hybrid navigation.

**Architecture:** Refactor existing layout to Hybrid nav (top bar + left mini sidebar). Refactor existing pages (Dashboard, Orders, Services) to Neo Nature styling. Create 5 new pages (Earnings, Calendar, Portfolio, Reviews, Settings). Extract shared components into `_components/`.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4, Lucide React, Recharts, `use client` components.

---

## File Structure

```
src/app/landscaper/
├── layout.tsx                          # MODIFY: Hybrid nav
├── page.tsx                            # CREATE: redirect to dashboard
├── _components/
│   ├── KpiCard.tsx                     # CREATE
│   ├── NotificationItem.tsx            # CREATE
│   ├── ShimmerSkeleton.tsx             # CREATE
│   ├── StatusBadge.tsx                 # CREATE
│   ├── EmptyState.tsx                  # CREATE
│   ├── ErrorBanner.tsx                 # CREATE
│   ├── TabFilter.tsx                   # CREATE
│   ├── Pagination.tsx                  # CREATE
│   ├── ConfirmModal.tsx                # CREATE
│   └── Toast.tsx                       # CREATE
├── dashboard/page.tsx                  # MODIFY: Neo Nature KPI + chart + notifications
├── orders/page.tsx                     # MODIFY: Neo Nature styling + pagination
├── services/page.tsx                   # MODIFY: Neo Nature + working hours
├── earnings/page.tsx                   # CREATE
├── calendar/page.tsx                   # CREATE
├── portfolio/page.tsx                  # CREATE
├── reviews/page.tsx                    # CREATE
└── settings/page.tsx                   # CREATE
```

---

## Chunk 1: Shared Components & Layout

### Task 1.1: Create Shared Components

**Files:**
- Create: `src/app/landscaper/_components/KpiCard.tsx`
- Create: `src/app/landscaper/_components/NotificationItem.tsx`
- Create: `src/app/landscaper/_components/ShimmerSkeleton.tsx`
- Create: `src/app/landscaper/_components/StatusBadge.tsx`
- Create: `src/app/landscaper/_components/EmptyState.tsx`
- Create: `src/app/landscaper/_components/ErrorBanner.tsx`
- Create: `src/app/landscaper/_components/TabFilter.tsx`
- Create: `src/app/landscaper/_components/Pagination.tsx`

- [ ] **Step 1: Create `KpiCard.tsx`**

```tsx
'use client';
import { type LucideIcon } from 'lucide-react';

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  iconBg: string;
  iconColor: string;
  changeColor?: string;
}

export default function KpiCard({ icon: Icon, label, value, change, iconBg, iconColor, changeColor = 'text-bright-green' }: KpiCardProps) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-[18px] p-4 hover:bg-white/[0.05] transition-all">
      <div className="flex items-center gap-2.5 mb-2">
        <div className={`p-[7px] rounded-[9px] ${iconBg}`}>
          <Icon size={13} className={iconColor} />
        </div>
        <span className="text-[9px] font-semibold tracking-[0.3px] text-white/30 uppercase">{label}</span>
      </div>
      <div className="text-[22px] font-bold text-white">{value}</div>
      <div className={`text-[9px] mt-[3px] flex items-center gap-1 ${changeColor}`}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"/></svg>
        {change}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `NotificationItem.tsx`**

```tsx
'use client';

interface NotificationItemProps {
  title: string;
  desc: string;
  time: string;
  dotColor: string;
  bgClass: string;
}

export default function NotificationItem({ title, desc, time, dotColor, bgClass }: NotificationItemProps) {
  return (
    <div className={`flex gap-2.5 p-2 rounded-[10px] ${bgClass}`}>
      <div className={`w-[6px] h-[6px] rounded-full mt-1 ${dotColor}`} />
      <div>
        <div className="text-[11px] font-semibold text-white/65">{title}</div>
        <div className="text-[10px] text-white/25 mt-[1px]">{desc} · {time}</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `StatusBadge.tsx`**

```tsx
'use client';

interface StatusBadgeProps {
  status: string;
  label: string;
}

const STYLES: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  accepted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'in-progress': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  completed: 'bg-bright-green/10 text-bright-green border-bright-green/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  active: 'bg-bright-green/10 text-bright-green border-bright-green/20',
  inactive: 'bg-white/5 text-white/30 border-white/10',
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STYLES[status] || STYLES.inactive}`}>
      {label}
    </span>
  );
}
```

- [ ] **Step 4: Create `ShimmerSkeleton.tsx`** — variant prop (card/row/table/chart), Tailwind animate-pulse with green-tinted shimmer

- [ ] **Step 5: Create `EmptyState.tsx`** — icon, message, actionLabel, onAction props, centered layout

- [ ] **Step 6: Create `ErrorBanner.tsx`** — message, onRetry props, red-tinted banner with "Tekrar Dene" button

- [ ] **Step 7: Create `TabFilter.tsx`** — tabs (string[]), active, onChange props, pill buttons with lime active state

- [ ] **Step 8: Create `Pagination.tsx`** — page, totalPages, onChange props, numbered buttons

- [ ] **Step 9: Create `ConfirmModal.tsx`** — title, message, onConfirm, variant (danger/default) props, overlay + centered modal

- [ ] **Step 10: Create `Toast.tsx`** — message, type (success/error) props, auto-dismiss with green/red styling

### Task 1.2: Refactor Layout to Hybrid Nav

**Files:**
- Modify: `src/app/landscaper/layout.tsx`

- [ ] **Step 1: Rewrite `layout.tsx`** with:
  - **Top bar:** `logo-gradient` Peyzart | "PEYZAJCI PANELİ" | bildirim zili + avatar
  - **Left mini sidebar (desktop):** 56px, 8 ikon, active state lime vurgulu
  - **Mobil:** Bottom tab bar (5 ikon)
  - **8 modül için nav items:** Dashboard, Siparişler, Hizmetler, Kazançlar, Takvim, Portföy, Yorumlar, Ayarlar

- [ ] **Step 2: Create `src/app/landscaper/page.tsx`** that redirects to `/landscaper/dashboard`

---

## Chunk 2: Dashboard Refactor

**Files:**
- Modify: `src/app/landscaper/dashboard/page.tsx`

- [ ] **Step 1: Rewrite Dashboard** using shared components:
  - KpiCard (4 tane) — Aktif Müşteri, Devam Eden, Bu Ay Gelir, Tepki Süresi
  - Haftalık Aktivite bar chart (inline SVG, spec section 3.4)
  - NotificationItem (3 tane)
  - Zaman filtresi pill butonları (Bugün/Bu Hafta/Bu Ay)
  - **Loading:** ShimmerSkeleton (variant="card" x4 + variant="chart")
  - **Empty:** EmptyState ("Henüz veri bulunmuyor")
  - **Error:** ErrorBanner ("Veriler yüklenemedi")

---

## Chunk 3: Orders Refactor

**Files:**
- Modify: `src/app/landscaper/orders/page.tsx`

- [ ] **Step 1: Rewrite Orders page** with:
  - TabFilter bileşeni (Tümü/Bekleyen/Kabul/Devam/Tamamlandı)
  - StatusBadge bileşeni
  - Pagination bileşeni (URL query: `?tab=pending&page=1`)
  - Neo Nature styling (koyu kartlar, lime vurgular)
  - **Loading:** ShimmerSkeleton (variant="card" x4)
  - **Empty (tab bazlı):** EmptyState ("Bu kategoride talep bulunmuyor")
  - **Error:** ErrorBanner

---

## Chunk 4: Services Refactor

**Files:**
- Modify: `src/app/landscaper/services/page.tsx`

- [ ] **Step 1: Rewrite Services page** with:
  - Neo Nature kart stilleri
  - Collapsible "Çalışma Saatleri" paneli
  - StatusBadge (aktif/pasif)
  - Hizmet Ekle formu ile aynı stil
  - **Loading:** ShimmerSkeleton (variant="card" x3)
  - **Empty:** EmptyState ("Henüz hizmet eklemediniz") + CTA
  - **Saving:** Toast ("Kaydedildi") / Toast ("Kaydedilemedi")

---

## Chunk 5: Earnings Page (Yeni)

**Files:**
- Create: `src/app/landscaper/earnings/page.tsx`

- [ ] **Step 1: Create Earnings page** with:
  - 3 KPI özet kartı (Toplam/Bu Dönem/Geçen Dönem)
  - Recharts alan/çizgi grafiği
  - İşlem geçmişi tablosu (tarih, müşteri, hizmet, tutar, durum)
  - IBAN düzenleme formu
  - Tüm state'ler: loading/empty/error

---

## Chunk 6: Calendar Page (Yeni)

**Files:**
- Create: `src/app/landscaper/calendar/page.tsx`

- [ ] **Step 1: Create Calendar page** with:
  - Aylık takvim grid (el ile yapılmış, kütüphane yok)
  - Yeşil dot ile randevu işaretleme
  - Gün seçince sağ panelde randevu listesi
  - Müsaitlik toggle (çalışıyor/kapalı)
  - Tüm state'ler

---

## Chunk 7: Portfolio Page (Yeni)

**Files:**
- Create: `src/app/landscaper/portfolio/page.tsx`

- [ ] **Step 1: Create Portfolio page** with:
  - 3 kolonlu grid galeri
  - Kategori filtreleri
  - Fotoğraf ekleme modalı (drag & drop simülasyonu)
  - Tüm state'ler

---

## Chunk 8: Reviews Page (Yeni)

**Files:**
- Create: `src/app/landscaper/reviews/page.tsx`

- [ ] **Step 1: Create Reviews page** with:
  - Ortalama puan özeti
  - Yorum kartları (avatar, isim, puan, metin, tarih)
  - "Yanıtla" inline textarea
  - Sıralama filtresi
  - Tüm state'ler

---

## Chunk 9: Settings Page (Yeni)

**Files:**
- Create: `src/app/landscaper/settings/page.tsx`

- [ ] **Step 1: Create Settings page** with:
  - Profil bilgileri formu (isim, e-posta, telefon, adres)
  - Profil fotoğrafı değiştirme
  - Bildirim tercihleri toggle list
  - Şifre değiştirme modalı
  - Çıkış yap / hesabı sil butonları
  - Tüm state'ler

---

## Chunk 10: Build & Verify

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 2: Fix any TypeScript errors**

- [ ] **Step 3: Run build**

```bash
npm run build
```

- [ ] **Step 4: Fix any build errors**

- [ ] **Step 5: Verify all 8 module links work in the Hybrid nav**
  - Dashboard, Siparişler, Hizmetler, Kazançlar, Takvim, Portföy, Yorumlar, Ayarlar
  - Desktop: top bar + left sidebar
  - Mobile: bottom tab bar

- [ ] **Step 6: Verify responsive behavior**
  - KPI cards: 2-col mobile, 4-col desktop
  - Galeri: 2-col mobile, 3-col desktop
  - Charts + notifications: stack mobile, side-by-side desktop
