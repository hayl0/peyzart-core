# API Routes → Prisma Queries Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Convert all 19 mock API routes to real Prisma database queries, create missing settings endpoint, and connect frontend pages.

**Architecture:** Each route uses `verifyAuth` (with BYPASS_AUTH for now) → queries Prisma via `prisma` proxy → returns `successResponse`/`errorResponse`. The existing Prisma schema has all needed models.

**Tech Stack:** Next.js 16 App Router, Prisma v7, PostgreSQL (Neon), Firebase Auth

---

## File Structure

### API Routes to Modify (18 files):
- `src/app/api/landscaper/dashboard/route.ts` — GET
- `src/app/api/landscaper/profile/route.ts` — GET, PATCH
- `src/app/api/landscaper/services/route.ts` — GET, POST
- `src/app/api/landscaper/services/[id]/route.ts` — PATCH, DELETE
- `src/app/api/landscaper/orders/route.ts` — GET
- `src/app/api/landscaper/earnings/route.ts` — GET
- `src/app/api/landscaper/reviews/route.ts` — GET
- `src/app/api/landscaper/reviews/[id]/reply/route.ts` — POST
- `src/app/api/landscaper/notifications/route.ts` — GET, PATCH
- `src/app/api/landscaper/calendar/route.ts` — GET
- `src/app/api/landscaper/availability/route.ts` — GET, PATCH
- `src/app/api/landscaper/calendar/block/route.ts` — POST
- `src/app/api/landscaper/calendar/block/[id]/route.ts` — DELETE
- `src/app/api/landscaper/account/route.ts` — DELETE
- `src/app/api/landscaper/password/route.ts` — PATCH
- `src/app/api/landscaper/portfolio/route.ts` — GET
- `src/app/api/landscaper/portfolio/[id]/route.ts` — DELETE
- `src/app/api/landscaper/portfolio/upload/route.ts` — POST

### API Route to Create (1 file):
- `src/app/api/landscaper/settings/route.ts` — GET, PATCH

### Frontend Pages to Update (eventually):
- All 7 landscaper pages + all customer pages — replace inline mock data with API calls

---

## Chunk 1: Services + Portfolio

### Task 1.1: Services API (GET all, POST create)

**Files:**
- Modify: `src/app/api/landscaper/services/route.ts`

- [ ] Replace `INITIAL_SERVICES` hardcoded data with `prisma.landscaperService.findMany` for GET
- [ ] Replace POST handler to create via `prisma.landscaperService.create`
- [ ] Ensure `landscaperProfileId` is derived from authenticated user

### Task 1.2: Services API (PATCH update, DELETE)

**Files:**
- Modify: `src/app/api/landscaper/services/[id]/route.ts`

- [ ] Replace PATCH with `prisma.landscaperService.update`
- [ ] Replace DELETE with `prisma.landscaperService.delete`

### Task 1.3: Portfolio API (GET all, DELETE, POST upload)

**Files:**
- Modify: `src/app/api/landscaper/portfolio/route.ts` (GET)
- Modify: `src/app/api/landscaper/portfolio/[id]/route.ts` (DELETE)
- Modify: `src/app/api/landscaper/portfolio/upload/route.ts` (POST)

- [ ] Replace GET with `prisma.portfolioImage.findMany`
- [ ] Replace DELETE with `prisma.portfolioImage.delete`
- [ ] Replace POST to create via `prisma.portfolioImage.create` (store just a URL for now; real file upload later)

### Task 1.4: Verify Chunk 1

- [ ] Run `npx tsc --noEmit`
- [ ] Run `npm run build`
- [ ] Test each endpoint with `curl`

---

## Chunk 2: Orders + Dashboard

### Task 2.1: Orders API (GET all)

**Files:**
- Modify: `src/app/api/landscaper/orders/route.ts`

- [ ] Replace hardcoded data with `prisma.order.findMany` filtering by landscaper's profile
- [ ] Include related customer data

### Task 2.2: Dashboard API

**Files:**
- Modify: `src/app/api/landscaper/dashboard/route.ts`

- [ ] Replace hardcoded KPIs with real aggregations from Prisma
- [ ] Count active customers (distinct customers with orders)
- [ ] Count active projects (orders with status IN_PROGRESS or ACCEPTED)
- [ ] Sum monthly earnings from orders with status COMPLETED
- [ ] Query recent notifications
- [ ] Generate weekly activity from order data

### Task 2.3: Verify Chunk 2

- [ ] Run `npx tsc --noEmit`
- [ ] Run `npm run build`
- [ ] Test each endpoint

---

## Chunk 3: Profile + Settings + Account + Password

### Task 3.1: Profile API

**Files:**
- Modify: `src/app/api/landscaper/profile/route.ts`

- [ ] GET: Query `prisma.user` + `prisma.landscaperProfile` for authenticated user
- [ ] PATCH: Update user and profile data

### Task 3.2: Settings API (NEW)

**Files:**
- Create: `src/app/api/landscaper/settings/route.ts`

- [ ] GET: Return notification preferences and profile settings
- [ ] PATCH: Update settings

### Task 3.3: Account + Password

**Files:**
- Modify: `src/app/api/landscaper/account/route.ts`
- Modify: `src/app/api/landscaper/password/route.ts`

- [ ] DELETE account: cascade delete user and related data
- [ ] PATCH password: hash and update (note: bcryptjs not installed yet)

### Task 3.4: Verify Chunk 3

- [ ] Run `npx tsc --noEmit`
- [ ] Run `npm run build`
- [ ] Test each endpoint

---

## Chunk 4: Calendar + Availability

### Task 4.1: Calendar API

**Files:**
- Modify: `src/app/api/landscaper/calendar/route.ts`

- [ ] Query appointments/orders grouped by date
- [ ] Return calendar data structure

### Task 4.2: Availability API

**Files:**
- Modify: `src/app/api/landscaper/availability/route.ts`

- [ ] GET: Return landscaper working hours (store in profile or new model)
- [ ] PATCH: Update availability

### Task 4.3: Block dates

**Files:**
- Modify: `src/app/api/landscaper/calendar/block/route.ts`
- Modify: `src/app/api/landscaper/calendar/block/[id]/route.ts`

- [ ] POST: Create blocked date entry
- [ ] DELETE: Remove blocked date

### Task 4.4: Verify Chunk 4

- [ ] Run `npx tsc --noEmit`
- [ ] Run `npm run build`
- [ ] Test each endpoint

---

## Chunk 5: Earnings + Reviews + Notifications

### Task 5.1: Earnings API

**Files:**
- Modify: `src/app/api/landscaper/earnings/route.ts`

- [ ] Query completed orders for total earnings
- [ ] Aggregate monthly/weekly data for chart
- [ ] Return recent transactions

### Task 5.2: Reviews API

**Files:**
- Modify: `src/app/api/landscaper/reviews/route.ts`
- Modify: `src/app/api/landscaper/reviews/[id]/reply/route.ts`

- [ ] GET: Query reviews with customer info, compute distribution
- [ ] POST reply: Update review with reply (add reply field to schema or store separately)

### Task 5.3: Notifications API

**Files:**
- Modify: `src/app/api/landscaper/notifications/route.ts`

- [ ] Query order-based notifications (new orders, status changes)
- [ ] Return notification list

### Task 5.4: Verify Chunk 5

- [ ] Run `npx tsc --noEmit`
- [ ] Run `npm run build`
- [ ] Test each endpoint

---

## Chunk 6: Frontend Connection (Optional / Future)

### Task 6.1: Connect Dashboard page to API

### Task 6.2: Connect Services page to API

### Task 6.3: Connect Orders page to API

### Task 6.4: Connect remaining pages to API

---

## Schema Gaps

The current Prisma schema is mostly adequate, but these additions may be needed:

```prisma
// Add to LandscaperProfile
workingHours    Json?       // Store availability schedule
notificationPrefs Json?    // Store notification preferences

// New model for blocked dates
model BlockedDate {
  id              String   @id @default(cuid())
  date            DateTime
  reason          String?
  landscaperProfileId String
  landscaperProfile   LandscaperProfile @relation(fields: [landscaperProfileId], references: [id], onDelete: Cascade)
}

// Add reply field to Review
model Review {
  // ... existing fields
  reply           String?
  repliedAt       DateTime?
}
```
