# Peyzart UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix maps, performance, links, and UI polish across all pages

**Architecture:** Incremental changes to existing components — no new pages. Fix MapboxMap container/markers/popup, add dynamic imports for heavy components, fix broken links, add consistent card/states across all pages.

**Tech Stack:** Next.js 16, Mapbox GL (react-map-gl/mapbox), Framer Motion, Tailwind CSS, Lucide Icons

---

## Chunk 1: MapboxMap — Container, Markers, Popup

### Task 1: Fix MapboxMap sizing, container, and interactivity

**Files:**
- Modify: `src/components/map/MapboxMap.tsx`

- [ ] **Step 1: Replace the outer wrapper with sized container**

Add `aspect-[16/9] max-h-[400px] rounded-[16px] overflow-hidden` to the map container. The fullscreen mode stays untouched.

Replace the error/empty states to use a consistent container.

Current empty state uses `min-h-[160px]`:
```tsx
<div className="w-full h-full min-h-[160px] ...">
```

Change to:
```tsx
<div className="w-full h-full min-h-[200px] rounded-[16px] ...">
```

- [ ] **Step 2: Enable scrollZoom**

Change `scrollZoom={false}` to `scrollZoom={true}`

- [ ] **Step 3: Enlarge and animate markers**

Current marker inner div:
```tsx
<div className={`rounded-full border-2 border-white shadow-md transition-all duration-200 ${
  selectedId === l.id
    ? 'w-4 h-4 ring-2 ring-lime/60 scale-125'
    : 'w-3 h-3'
} bg-gradient-to-br from-bright-green to-medium-green`} />
```

Change to:
```tsx
<div className={`rounded-full border-[3px] border-white shadow-lg transition-all duration-300 ${
  selectedId === l.id
    ? 'w-6 h-6 ring-4 ring-lime/50 scale-125'
    : 'w-5 h-5 hover:scale-110'
} bg-gradient-to-br from-bright-green to-medium-green cursor-pointer`} />
```

- [ ] **Step 4: Style the popup**

Current popup content uses inline text. Add a styled wrapper:

Replace popup content with:
```tsx
<div className="px-3 py-2.5 min-w-[180px]">
  <div className="flex items-center gap-2 mb-2">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bright-green to-lime flex items-center justify-center text-white text-xs font-bold">
      {popupInfo.name.charAt(0)}
    </div>
    <div>
      <p className="font-bold text-sm text-dark-forest leading-tight">{popupInfo.name}</p>
      <p className="text-[11px] text-gray-500">{popupInfo.service}</p>
    </div>
  </div>
  <div className="flex items-center justify-between bg-gray-50 rounded-[10px] px-3 py-2">
    <span className="text-sm font-extrabold text-medium-green">₺{popupInfo.price}</span>
    <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
      <Star size={12} className="fill-amber-400 text-amber-400" /> {(popupInfo.rating ?? 0).toFixed(1)}
    </span>
  </div>
</div>
```

Import `Star` from `lucide-react` at the top.

- [ ] **Step 5: Verify with build**

Run: `npx tsc --noEmit` — no errors expected

---

## Chunk 2: Dynamic Import for MapboxMap

### Task 2: Lazy-load heavy map component

**Files:**
- Modify: `src/components/home/NearbySection.tsx`
- Create: check if map index exists

- [ ] **Step 1: Check map index exports**

Read `src/components/map/index.ts` to verify export pattern.

- [ ] **Step 2: Replace direct import with dynamic import in NearbySection**

Current:
```tsx
import { MapboxMap } from '@/components/map';
```

Change to dynamic import at component level:
```tsx
import dynamic from 'next/dynamic';

const MapboxMap = dynamic(
  () => import('@/components/map').then(mod => mod.MapboxMap),
  { ssr: false }
);
```

- [ ] **Step 3: Build check**

Run: `npx tsc --noEmit` — ensure no errors

---

## Chunk 3: Link/Button Fixes

### Task 3: Fix CategoryTiles href

**Files:**
- Modify: `src/components/home/CategoryTiles.tsx`

- [ ] **Step 1: Fix query parameter name**

Current:
```tsx
href={`/kesfet?category=${cat.slug}`}
```

Change to (matching `KesfetPage` which reads `kategori`):
```tsx
href={`/kesfet?kategori=${cat.slug}`}
```

- [ ] **Step 2: Verify all other links work**

Checklist:
- `LandingPage`: /login, /register, /kesfet, /register/landscaper — all use Link/next/link ✅
- `CategoryTiles`: /kesfet?kategori={slug} — fixed
- `FeaturedSection`: `/service/${item.id}` — OK
- `ServiceCard`: `/service/${id}` — OK
- `PlaceCard`: `/service/${id}` — OK
- `KesfetPage`: `/service/${p.id}` — OK
- `MarketplacePage`: `/service/${s.id}` — OK
- `ServiceDetailPage`: `/booking?serviceId=${service.id}&price=${service.price}` — OK
- `OrdersPage`: `/order/${order.id}` — OK
- `FavoritesPage`: `/service/${f.id}` — OK

- [ ] **Step 3: Build check**

Run: `npx tsc --noEmit`

---

## Chunk 4: Performance — Loading States & Image Optimization

### Task 4: Add loading.tsx to route groups

**Files:**
- Create: `src/app/(customer)/loading.tsx`

- [ ] **Step 1: Create loading.tsx**

```tsx
export default function CustomerLoading() {
  return (
    <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-bright-green/30 border-t-bright-green rounded-full animate-spin" />
        <p className="text-sm text-[var(--theme-text-muted)]">Yükleniyor...</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add priority prop to HeroSection first slide**

In `HeroSection.tsx`, pass `priority` to the first slide `ImageWithFallback`:
```tsx
<ImageWithFallback
  src={slides[current].image || ''}
  alt={slides[current].name}
  className="absolute inset-0 w-full h-full scale-105"
  fallback="linear-gradient(135deg, #0A2E1A, #1B5E20, #4CAF50)"
  priority
/>
```

- [ ] **Step 3: Add priority prop to ImageWithFallback interface**

Read `ImageWithFallback.tsx` and add `priority?: boolean` prop, pass it to the underlying `img` tag.

- [ ] **Step 4: Build check**

Run: `npx tsc --noEmit`

---

## Chunk 5: UI Polish — All Pages

### Task 5: Add hover effects to nature-card elements

**Files:**
- Modify: many page files

Check each page for `nature-card` class usage:
- `src/app/(customer)/home/page.tsx` — already has cards
- `src/app/kesfet/page.tsx` — cards use `hover:shadow-md`
- `src/app/marketplace/page.tsx` — cards use `hover:shadow-md hover:-translate-y-0.5` ✅
- `src/app/odeme/page.tsx` — no nature-card used, uses buttons
- `src/app/(customer)/orders/page.tsx` — card hover:shadow-md ✅
- `src/app/(customer)/service/[id]/page.tsx` — cards need hover effect
- `src/app/(customer)/favorites/page.tsx` — cards need hover effect
- `src/app/(customer)/profile/page.tsx` — no nature-card used for main card

- [ ] **Step 1: Add hover effect to service detail page cards**

In `src/app/(customer)/service/[id]/page.tsx`, add `hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200` to nature-card divs.

- [ ] **Step 2: Add hover effect to favorites page cards**

In `src/app/(customer)/favorites/page.tsx`, ensure cards have hover effect (they do via `nature-card`).

- [ ] **Step 3: Make placeholder sections stylish**

In `src/app/(customer)/order/[id]/page.tsx`, the sidebar has a "Sohbet" section with placeholder. Update it:
```tsx
<div className="nature-card p-5 flex flex-col items-center justify-center min-h-[180px] bg-gradient-to-br from-bright-green/5 to-lime/5">
  <div className="w-12 h-12 rounded-full bg-bright-green/10 flex items-center justify-center mb-3">
    <MessageCircle size={22} className="text-bright-green/60" />
  </div>
  <h3 className="font-bold text-sm text-[var(--theme-text)] mb-1">Sohbet</h3>
  <p className="text-xs text-[var(--theme-text-muted)] text-center">Sohbet özelliği çok yakında</p>
</div>
```

Import `MessageCircle` from `lucide-react`.

- [ ] **Step 4: Build check**

Run: `npx tsc --noEmit`

---

## Chunk 6: Final Build & Verify

### Task 6: Full build verification

- [ ] **Step 1: TypeScript check**

Run: `npx tsc --noEmit` — expected: no errors

- [ ] **Step 2: Full build**

Run: `npm run build` — expected: success, all 30+ pages compiled

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: ui overhaul - maps, performance, links, polish

- MapboxMap: container sizing, larger markers, popup styling
- Dynamic import for MapboxMap (reduces bundle)
- Fixed CategoryTiles href param name
- Added loading.tsx for route groups
- Added priority prop to hero images
- UI polish: hover effects, placeholder styling"
```
