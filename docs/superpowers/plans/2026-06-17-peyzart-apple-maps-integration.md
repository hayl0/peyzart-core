# Apple Maps Estetiğinde Mapbox Entegrasyonu — Implementation Plan

> **For agentic workers:** Use direct implementation in current session. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace gradient placeholder map with Apple Maps aesthetic Mapbox integration in NearbySection.

**Architecture:** react-map-gl wrapper with custom Apple-inspired styling, compact map bar with glass overlay, inline filters, custom markers, and horizontal place cards.

**Tech Stack:** Mapbox GL JS, react-map-gl, Tailwind CSS v4, Next.js 16

---

### Task 1: Install Dependencies & Configure

**Files:**
- Modify: `package.json`
- Create: `.env.local` (add token placeholder)

- [ ] **Install Mapbox packages**
  ```bash
  npm install mapbox-gl react-map-gl
  npm install -D @types/mapbox-gl
  ```

- [ ] **Add Mapbox CSS to globals.css**
  Add `@import "mapbox-gl/dist/mapbox-gl.css"` at top

- [ ] **Ensure Mapbox token in .env.local**
  Add `NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx` placeholder line

### Task 2: Create MapboxMap Component

**Files:**
- Create: `src/components/map/MapboxMap.tsx`
- Create: `src/components/map/index.ts`

- [ ] **Create MapboxMap component with:**
  - react-map-gl Map + Marker + Popup
  - Custom marker SVG (green circle, Apple minimal style)
  - Viewport state (lat, lng, zoom)
  - Selected marker popup
  - Light/dark style switching via data-theme
  - Geolocation button handler
  - Fullscreen toggle
  - Responsive sizing (parent container controls height)

### Task 3: Create PlaceCard Horizontal Component

**Files:**
- Create: `src/components/home/PlaceCard.tsx`

- [ ] **Create PlaceCard with:**
  - Horizontal layout (Apple Maps place card)
  - Gradient cap, name, service, rating, price, distance
  - Snap scroll friendly width (~200px)
  - Hover scale + shadow transition
  - Link to `/service/[id]`

### Task 4: Redesign NearbySection

**Files:**
- Modify: `src/components/home/NearbySection.tsx`

- [ ] **Restructure NearbySection:**
  - Remove gradient placeholder (old map)
  - Add MapboxMap component (compact height)
  - Glass overlay with search + filter chips inline
  - Map controls (zoom ±, locate, expand)
  - Horizontal PlaceCard row below map
  - Fullscreen map toggle
  - Error/loading states for map
  - Theme-aware dark/light

### Task 5: Cleanup & Polish

- [ ] Verify lint: `npm run lint`
- [ ] Verify typecheck: `npm run typecheck`
- [ ] Verify build: `npm run build`
