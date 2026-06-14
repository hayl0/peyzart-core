# Customer Home Page — Yelp-Inspired Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development to implement this plan.

**Goal:** Transform the basic customer home page into a rich, Yelp-inspired experience with hero search, category tiles, featured section, nearby grid, stats, and scroll animations.

**Architecture:** 5 new focused components + 1 reusable AnimateOnScroll wrapper assembled in the existing home page layout. Zero new dependencies — all animations via native Intersection Observer + CSS transitions.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, Lucide icons, Firebase auth (unchanged)

---

## File Structure

```
src/components/home/
├── AnimateOnScroll.tsx          # [NEW] Reusable Intersection Observer wrapper
├── HeroSection.tsx              # [NEW] Hero gradient + search + location + suggestions
├── CategoryTiles.tsx            # [NEW] 8 horizontal scrollable category tiles
├── FeaturedSection.tsx          # [NEW] Featured landscapers horizontal scroll
├── NearbySection.tsx            # [NEW] Map + filter chips + card grid (extracted from page)
├── StatsSection.tsx             # [NEW] Trust signals with animated counters
├── ServiceCard.tsx              # [MODIFY] Add image support, "Öne Çıkan" badge
├── ServiceCardSkeleton.tsx      # (unchanged)

src/app/(customer)/home/page.tsx # [MODIFY] Wire all sections, simplify to orchestrator
```

---

## Chunk 1: HeroSection + AnimateOnScroll

### Task 1.1: Create AnimateOnScroll wrapper

**Files:**
- Create: `src/components/home/AnimateOnScroll.tsx`

**Details:**
- Client component (`'use client'`)
- Uses `IntersectionObserver` with `threshold: 0.1`
- On first intersection, adds a CSS class `animate-in` to trigger fade-in + slide-up
- Props: `children`, `className?`, `delay?` (0-500ms)
- Default animation: `opacity: 0` → `opacity: 1`, `translateY(24px)` → `translateY(0)`
- Cleanup: disconnect observer on unmount

### Task 1.2: Create HeroSection

**Files:**
- Create: `src/components/home/HeroSection.tsx`

**Details:**
- Client component
- Full-width background gradient (dark green → bright green tones)
- **Search input:** Large, rounded, with Search icon, placeholder "Ne hizmeti arıyorsunuz?"
- **Location input:** Smaller second input with MapPin icon, placeholder "Konum" (default: İstanbul)
- **Quick suggestions:** Row of clickable pills: "Çim Bakımı", "Peyzaj Tasarımı", "Sulama", "Ağaç Budama"
- Focus animation: on focus, input gets `scale(1.02)` + green `box-shadow` glow
- Input tracking via `useState`, clicking a suggestion sets the value
- Submit triggers `console.log` for now (real search later)
- Responsive: mobile stack, desktop side-by-side for inputs
- Wrapped in `<AnimateOnScroll>`

---

## Chunk 2: CategoryTiles

### Task 2.1: Create CategoryTiles

**Files:**
- Create: `src/components/home/CategoryTiles.tsx`

**Details:**
- Client component
- 8 categories in an array, each with: label, emoji, slug
- **Mobile:** Horizontal scroll (`overflow-x-auto`, `scroll-snap-x`, snap-center per tile)
- **Desktop:** Grid (grid-cols-8 or 4x2)
- **Each tile:** `w-20 h-20` (mobile) / `w-24 h-24` (desktop) rounded-full with emoji + label below
- Background: nature-card style (white/green tint)
- Hover: `scale(1.08)` + shadow increase
- Active/selected state: green border highlight
- Click: sets active category, console.log for now
- Wrapped in `<AnimateOnScroll delay={100}>`

---

## Chunk 3: FeaturedSection + NearbySection

### Task 3.1: Create FeaturedSection

**Files:**
- Create: `src/components/home/FeaturedSection.tsx`

**Details:**
- Client component
- Section header: "Öne Çıkan Peyzajcılar" (left) + "Tümünü Gör →" link (right)
- Mock data: 3-4 featured landscapers (extended from existing mock data with image placeholders)
- **Mobile:** Horizontal scroll with large cards (w-72), snap-scroll
- **Desktop:** Grid (grid-cols-3 or 4)
- Each card: Unsplash placeholder image (300x200), name, service type, star rating (⭐), price, "Öne Çıkan" badge (lime bg)
- Hover: `scale(1.02)` + shadow
- Wrapped in `<AnimateOnScroll delay={200}>`

### Task 3.2: Create NearbySection

**Files:**
- Create: `src/components/home/NearbySection.tsx`

**Details:**
- Client component
- Extracts the map + filter chips + card grid logic from current page.tsx
- Reuses existing `ServiceCard` and `ServiceCardSkeleton` components
- Props: `landscapers`, `state`, `onRetry`
- **Map:** Gradient placeholder (same as current), with inline style for dark mode
- **Filter chips:** Same 4 filters (Tüm Hizmetler, Fiyat, Puan, Mesafe), active state with animation
- **Card grid:** 2-column grid (same as current)
- **Loading/Empty/Error states:** Same as current
- Wrapped in `<AnimateOnScroll delay={300}>`

---

## Chunk 4: StatsSection + Page Wiring

### Task 4.1: Create StatsSection

**Files:**
- Create: `src/components/home/StatsSection.tsx`

**Details:**
- Client component
- 3 stats: "1.000+ Mutlu Müşteri", "%98 Memnuniyet", "250+ Uzman Peyzajcı"
- Animated counter: on first intersection, counts from 0 to target number over 1.5s
- Uses IntersectionObserver + setInterval
- Style: 3 columns (grid-cols-3), clean typography, centered
- Wrapped in `<AnimateOnScroll delay={400}>`

### Task 4.2: Modify home/page.tsx

**Files:**
- Modify: `src/app/(customer)/home/page.tsx`

**Details:**
- Remove inline map/filter/card logic (moved to NearbySection)
- Keep state management (`pageState`, `landscapers`, mock data)
- Replace content with section orchestration:
  1. `<HeroSection />`
  2. `<CategoryTiles />`
  3. `<FeaturedSection />`
  4. `<NearbySection landscapers={landscapers} state={pageState} onRetry={...} />`
  5. `<StatsSection />`
- Wrap the entire page in a `<main>` container

### Task 4.3: Modify ServiceCard (optional upgrade)

**Files:**
- Modify: `src/components/home/ServiceCard.tsx`

**Details:**
- Add optional `featured` prop → shows "Öne Çıkan" badge (lime pill)
- Add proper `image` rendering if `image` prop provided (img with object-cover)
- Keep existing gradient fallback

---

## Execution Order

1. AnimateOnScroll → HeroSection
2. CategoryTiles
3. ServiceCard upgrade → FeaturedSection → NearbySection
4. StatsSection
5. page.tsx orchestration
6. `npm run build` verification

## Verification

- `npm run dev` — home page loads without errors
- All 5 sections visible with correct spacing
- Scroll animations trigger on scroll
- Search input animates on focus
- Category tiles scroll horizontally on mobile
- Featured section scrolls
- Mock data renders in NearbySection grid
- Stats counter animates on scroll
- Toggle theme → everything adapts
- `npm run build` — 0 errors
