# Müşteri Ana Sayfası & Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build dark mode infrastructure, app navigation shell, and customer home page with map + service cards.

**Architecture:**
- Dark mode via CSS custom properties on `:root` and `[data-theme="dark"]`, Tailwind `dark:` variant for utility classes
- App shell responsive: Bottom Tab Bar on mobile, Sidebar on desktop
- Home page: full-width map top, filter chips row, 2-column service card grid, all states defined

**Tech Stack:** Tailwind CSS v4 (`@custom-variant dark`), lucide-react icons, Google Maps SDK, CSS custom properties

---

## Chunk 1: Dark Mode Altyapısı

### Task 1.1: Add dark mode CSS variables to globals.css

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Add dark mode custom properties**

```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

:root {
  /* Light theme (default) */
  --color-bg-primary: #EDF0E6;
  --color-bg-card: #FAFBF8;
  --color-bg-input: #F5F7F0;
  --color-border: #DDE4D5;
  --color-text-primary: #0A2E1A;
  --color-text-secondary: #888;
  --color-text-muted: #999;
  --color-icon: #1B5E20;
  --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.04);
}

[data-theme="dark"] {
  --color-bg-primary: #0A2E1A;
  --color-bg-card: #14281A;
  --color-bg-input: rgba(255, 255, 255, 0.05);
  --color-border: rgba(255, 255, 255, 0.06);
  --color-text-primary: #F0F0F0;
  --color-text-secondary: #999;
  --color-text-muted: #666;
  --color-icon: #ccc;
  --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.2);
}
```

Place these after existing `:root` variables, before utility classes.

- [ ] **Add theme transition to body**

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

- [ ] **Add theme transition to nature-card**

```css
.nature-card {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease, border-color 0.3s ease;
}
```

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: Only pre-existing errors, if any.

---

### Task 1.2: Create ThemeProvider

**Files:**
- Create: `src/lib/theme/ThemeContext.tsx`

- [ ] **Write ThemeContext**

```tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('peyzart_theme') as Theme | null;
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('peyzart_theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: Clean (no errors).

---

### Task 1.3: Wrap ThemeProvider in root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Add ThemeProvider import and wrap**

```tsx
import { ThemeProvider } from '@/lib/theme/ThemeContext';

// Inside body, outside AuthProvider or nested:
<body className="...">
  <ThemeProvider>
    <AuthProvider>
      <!-- existing content -->
    </AuthProvider>
  </ThemeProvider>
</body>
```

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

---

## Chunk 2: App Shell (Navigasyon)

### Task 2.1: Create Bottom Tab Bar

**Files:**
- Create: `src/components/layout/BottomTabBar.tsx`

- [ ] **Write BottomTabBar component**

5 tabs with lucide-react icons:
- Ana Sayfa (`<Home />`)
- Keşfet (`<Compass />`)
- Favoriler (`<Heart />`)
- Siparişler (`<Package />`)
- Profil (`<User />`)

Active tab uses `#4CAF50` (bright-green), inactive uses `#999`.

On mobile: fixed bottom, flex row, 5 equal items.
On desktop: hidden (sidebar takes over).

```tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Compass, Heart, Package, User } from 'lucide-react';

const TABS = [
  { href: '/home', label: 'Ana Sayfa', icon: Home },
  { href: '/kesfet', label: 'Keşfet', icon: Compass },
  { href: '/favorites', label: 'Favoriler', icon: Heart },
  { href: '/orders', label: 'Siparişler', icon: Package },
  { href: '/profile', label: 'Profil', icon: User },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg-card)] border-t border-[var(--color-border)] lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {TABS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 min-w-0 px-2"
            >
              <Icon
                size={22}
                className={isActive ? 'text-bright-green' : 'text-[var(--color-text-muted)]'}
              />
              <span
                className={`text-[10px] font-semibold ${
                  isActive ? 'text-bright-green' : 'text-[var(--color-text-muted)]'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

---

### Task 2.2: Create Desktop Sidebar

**Files:**
- Create: `src/components/layout/Sidebar.tsx`

- [ ] **Write Sidebar component**

Desktop-only (hidden on mobile). Fixed left sidebar with:
- Peyzart logo (Billabong gradient) at top
- 5 nav items (same as tabs) with icon + label
- Theme toggle button (sun/moon icon) at bottom
- User avatar + name at very bottom

```tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Compass, Heart, Package, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme/ThemeContext';

const NAV_ITEMS = [
  { href: '/home', label: 'Ana Sayfa', icon: Home },
  { href: '/kesfet', label: 'Keşfet', icon: Compass },
  { href: '/favorites', label: 'Favoriler', icon: Heart },
  { href: '/orders', label: 'Siparişler', icon: Package },
  { href: '/profile', label: 'Profil', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-[var(--color-bg-card)] border-r border-[var(--color-border)] z-50 p-6">
      {/* Logo */}
      <div className="logo-gradient text-[28px] mb-10 mt-2">Peyzart</div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-bright-green/10 text-bright-green'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)]'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] transition-all mb-2"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        {theme === 'light' ? 'Karanlık Mod' : 'Aydınlık Mod'}
      </button>

      {/* User */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-[var(--color-border)] pt-4">
        <div className="w-10 h-10 rounded-full bg-bright-green/20 flex items-center justify-center text-bright-green font-bold">
          <User size={18} />
        </div>
        <div className="text-sm">
          <div className="font-semibold text-[var(--color-text-primary)]">Kullanıcı</div>
          <div className="text-xs text-[var(--color-text-muted)]">Müşteri</div>
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

---

### Task 2.3: Create AppLayout wrapper

**Files:**
- Create: `src/components/layout/AppLayout.tsx`

- [ ] **Write AppLayout component**

Wraps child pages with Sidebar (desktop) + BottomTabBar (mobile). Adds top padding for mobile (to avoid tab bar overlap).

```tsx
'use client';

import { ReactNode } from 'react';
import BottomTabBar from './BottomTabBar';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <Sidebar />
      <main className="lg:ml-64 pb-16 lg:pb-0">
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
```

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

---

## Chunk 3: Customer Home Page

### Task 3.1: Create ServiceCard component

**Files:**
- Create: `src/components/home/ServiceCard.tsx`

- [ ] **Write ServiceCard component**

```tsx
'use client';

import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  name: string;
  service: string;
  price: number;
  rating: number;
  reviewCount: number;
  distance: number;
  image?: string;
  gradient?: string;
}

export default function ServiceCard({
  id,
  name,
  service,
  price,
  rating,
  reviewCount,
  distance,
  image,
  gradient = 'linear-gradient(135deg, #4CAF50, #2E7D32)',
}: ServiceCardProps) {
  const stars = Math.floor(rating);
  const hasHalfStar = rating - stars >= 0.5;

  return (
    <Link href={`/service/${id}`}>
      <div
        className="bg-[var(--color-bg-card)] rounded-[20px] border border-[var(--color-border)] overflow-hidden transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        {/* Cover Image */}
        <div
          className="h-[76px] flex items-center justify-center"
          style={{ background: gradient }}
        >
          {image && (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="p-3">
          {/* Name */}
          <h3 className="font-bold text-[15px] text-[var(--color-text-primary)] leading-tight mb-0.5">
            {name}
          </h3>

          {/* Service */}
          <p className="text-xs text-[var(--color-text-secondary)] mb-1.5">
            {service}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                className={star <= stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs font-semibold text-[var(--color-text-primary)] ml-1">
              {rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-[var(--color-text-muted)] ml-0.5">
              ({reviewCount})
            </span>
          </div>

          {/* Price + Distance */}
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[18px] text-[var(--color-text-primary)]">
              ₺{price}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1">
              <MapPin size={10} />
              {distance.toFixed(1)} km
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

---

### Task 3.2: Create ServiceCardSkeleton (loading state)

**Files:**
- Create: `src/components/home/ServiceCardSkeleton.tsx`

- [ ] **Write skeleton component**

```tsx
export default function ServiceCardSkeleton() {
  return (
    <div className="bg-[var(--color-bg-card)] rounded-[20px] border border-[var(--color-border)] overflow-hidden animate-pulse">
      <div className="h-[76px] bg-gray-200 dark:bg-white/5" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2" />
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 dark:bg-white/10 rounded" />
          ))}
        </div>
        <div className="flex justify-between">
          <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-16" />
          <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-12" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

---

### Task 3.3: Create CustomerHomePage

**Files:**
- Create: `src/app/home/page.tsx`

- [ ] **Write home page component**

Full page with:
- Search bar (floating over map)
- Google Maps section (placeholder for now — uses gradient background)
- Filter chips row (horizontal scroll, SVG icons from lucide)
- Section title "Yakınındaki Uzmanlar"
- 2-column service card grid (mock data for now)
- Loading / Empty / Error states

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, DollarSign, Star, MapPin } from 'lucide-react';
import ServiceCard from '@/components/home/ServiceCard';
import ServiceCardSkeleton from '@/components/home/ServiceCardSkeleton';

interface Landscaper {
  id: string;
  name: string;
  service: string;
  price: number;
  rating: number;
  reviewCount: number;
  distance: number;
  gradient: string;
}

type PageState = 'loading' | 'success' | 'empty' | 'error';

const FILTERS = [
  { label: 'Tüm Hizmetler', icon: SlidersHorizontal },
  { label: 'Fiyat', icon: DollarSign },
  { label: 'Puan', icon: Star },
  { label: 'Mesafe', icon: MapPin },
];

export default function CustomerHomePage() {
  const [state, setState] = useState<PageState>('loading');
  const [landscapers, setLandscapers] = useState<Landscaper[]>([]);

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => {
      const data: Landscaper[] = [
        { id: '1', name: 'Bahçe Sanatı', service: 'Çim Bakımı', price: 350, rating: 4.2, reviewCount: 124, distance: 2.3, gradient: 'linear-gradient(135deg, #4CAF50, #2E7D32)' },
        { id: '2', name: 'Yeşil Dünya', service: 'Peyzaj Tasarım', price: 750, rating: 5.0, reviewCount: 89, distance: 5.1, gradient: 'linear-gradient(135deg, #CDDC39, #FBC02D)' },
        { id: '3', name: 'Doğa Bahçe', service: 'Budama & Bakım', price: 250, rating: 4.5, reviewCount: 56, distance: 1.8, gradient: 'linear-gradient(135deg, #66BB6A, #43A047)' },
        { id: '4', name: 'Zeytin Peyzaj', service: 'Sulama Sistemi', price: 1200, rating: 4.8, reviewCount: 210, distance: 3.5, gradient: 'linear-gradient(135deg, #26A69A, #00897B)' },
      ];
      setLandscapers(data);
      setState(data.length > 0 ? 'success' : 'empty');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Map Section */}
      <div className="relative h-[30vh] min-h-[200px] bg-gradient-to-br from-[#a8d5a2] via-[#81c784] to-[#66bb6a] dark:from-[#1a3a1a] dark:via-[#1a3a1a] dark:to-[#2a5a2a]">
        {/* Search Bar */}
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] px-4 py-3 flex items-center gap-3 shadow-lg">
            <Search size={18} className="text-[var(--color-text-muted)]" />
            <span className="text-sm text-[var(--color-text-muted)]">Hizmet veya peyzajcı ara...</span>
          </div>
        </div>

        {/* Location Button */}
        <div className="absolute bottom-4 right-4">
          <button className="w-10 h-10 bg-[var(--color-bg-card)] rounded-full flex items-center justify-center shadow-lg border border-[var(--color-border)]">
            <MapPin size={18} className="text-bright-green" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-3 relative z-10">
        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
          {FILTERS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] px-4 py-2.5 rounded-[50px] text-xs font-semibold text-[var(--color-text-primary)] whitespace-nowrap shadow-sm hover:shadow transition-all"
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-bold text-[var(--color-text-primary)]">
            {state === 'loading' ? 'Uzmanlar yükleniyor...' : 'Yakınındaki Uzmanlar'}
          </h2>
          {state === 'success' && (
            <button className="text-xs font-semibold text-bright-green">Tümünü Gör →</button>
          )}
        </div>

        {/* States */}
        {state === 'error' && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-[14px] p-4 mb-4">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Hizmetler yüklenirken bir hata oluştu
            </p>
            <button
              onClick={() => { setState('loading'); /* re-fetch logic */ }}
              className="text-sm font-semibold text-red-600 dark:text-red-400 mt-2 underline"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {state === 'empty' && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
              Bu kriterlere uygun peyzajcı bulunamadı
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mb-4">
              Filtreleri değiştirerek tekrar deneyin
            </p>
            <button
              onClick={() => { setState('loading'); }}
              className="text-sm font-semibold text-bright-green underline"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        )}

        {/* Card Grid */}
        {state === 'loading' && (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        )}

        {state === 'success' && (
          <div className="grid grid-cols-2 gap-3 pb-4">
            {landscapers.map((l) => (
              <ServiceCard
                key={l.id}
                id={l.id}
                name={l.name}
                service={l.service}
                price={l.price}
                rating={l.rating}
                reviewCount={l.reviewCount}
                distance={l.distance}
                gradient={l.gradient}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

---

### Task 3.4: Create /home route and wrap with AppLayout

**Files:**
- Modify: `src/app/home/page.tsx` (already exists — replace content)
- Modify: `/Users/halil/Desktop/peyzart-core/src/app/(customer)/layout.tsx` (create if not exists)

- [ ] **Create customer layout with AppLayout wrapper**

```tsx
// src/app/(customer)/layout.tsx
import AppLayout from '@/components/layout/AppLayout';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
```

Move existing home page tsx into the new file content from Task 3.3.

- [ ] **Run typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

---

## Chunk 4: Build & Verify

### Task 4.1: Build test

- [ ] **Run full build**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds (only pre-existing warnings).

### Task 4.2: Visual verification

- [ ] **Open the app in VS Code**

```bash
code src/app/home/page.tsx
code src/components/home/ServiceCard.tsx
code src/components/layout/BottomTabBar.tsx
code src/components/layout/Sidebar.tsx
code src/lib/theme/ThemeContext.tsx
```

---
