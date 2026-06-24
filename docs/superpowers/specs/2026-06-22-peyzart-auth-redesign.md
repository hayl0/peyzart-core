# Auth Pages Redesign — Premium Split Layout

## Overview
Redesign the login and register pages with a premium split-screen layout featuring distinct themes for Customer and Expert roles. The branding is elevated to match the landing page quality.

## Terminology Change
- "Peyzajcı" (landscaper) → **"Uzman"** (expert) — across all pages and components

## Layout
- **Left panel (55%)** — Brand value proposition, headline, description, stats, decorative geometric elements
- **Right panel (45%)** — Auth form (login or register)

On mobile: stacked vertically, form below brand panel.

## Themes

### Customer Theme 🟢
| Element | Style |
|---------|-------|
| Brand panel bg | `linear-gradient(160deg, #0A2E1A, #1B5E20, #2E7D32)` |
| Headline | "Hayalinizdeki Yaşam Alanı" — white, Sora 800, 34px |
| Description | Premium hizmet vurgusu, white/60, 14px |
| Stats values | Lime (#CDDC39), 26px |
| Accent line | Green-to-transparent gradient |
| Form bg | #FAFBFA |
| Logo | Billabong font, multi-stop gradient (same as landing page) |
| Role switch | Pill toggle, active = white card, inactive = muted |
| Inputs | White, green focus ring |
| CTA | Lime-to-green gradient button, dark green text |
| Decorations | Gradient orbs + geometric circle outlines (4% opacity) |

### Expert Theme 🟡
| Element | Style |
|---------|-------|
| Brand panel bg | `linear-gradient(160deg, #0d0d1a, #1a1a2e, #16213e)` |
| Headline | "İşinizi Büyütün" — white, Sora 800, 34px |
| Description | Profesyonel büyüme vurgusu, white/50, 14px |
| Stats values | Gold (#FBC02D), 26px |
| Accent line | Gold-to-transparent gradient |
| Form bg | #0d0d1a |
| Logo | Billabong font, gold gradient |
| Role switch | Dark pill, gold-tinted active |
| Inputs | Dark background, subtle border, gold focus ring |
| CTA | Gold gradient button, dark text |
| Decorations | Gold gradient orbs + geometric circle outlines |

## Logo
Exact same implementation as landing page:
```css
font-family: 'Billabong', cursive;
font-weight: 800;
background: linear-gradient(135deg, #0a2e1a 0%, #1b5e20 25%, #4caf50 50%, #cddc39 75%, #fbc02d 100%);
background-clip: text;
-webkit-text-fill-color: transparent;
filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
```

## Components to Update
1. `src/app/(auth)/login/page.tsx` — full redesign
2. `src/app/(auth)/register/page.tsx` — full redesign (same layout, different form fields)
3. All 19 instances of "Peyzajcı" → "Uzman" across the codebase

## Implementation Order
1. Bulk rename "Peyzajcı" → "Uzman" (text only, no functional changes)
2. Implement new login page
3. Implement new register page
