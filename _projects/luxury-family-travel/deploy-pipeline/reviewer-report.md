# Reviewer Report — Family Travel Directory

**Reviewer:** Subagent REVIEWER  
**Date:** 2026-04-24  
**Scope:** Security, Code Quality, Accessibility, Mobile responsiveness

---

## Summary

| Category | CRITICAL | WARNING | INFO |
|----------|----------|---------|------|
| Security | 1        | 1       | 0    |
| Code Quality | 0   | 5       | 2    |
| Accessibility | 0   | 1       | 1    |
| Mobile | 0         | 0       | 1    |

---

## ❌ SECURITY

### CRITICAL: Hardcoded Supabase Anon Key in source code

**File:** `lib/supabase.ts` (lines 14-17)  
**Issue:** The Supabase URL and anon key are hardcoded as fallback values in the source code. While these are anon/public keys (protected by RLS), embedding them in the client bundle is a leak vector — they should only come from env vars.

**Fix:** Remove the hardcoded fallback values entirely:

```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}
```

Then ensure `env.local` is properly deployed via Vercel env vars (not hardcoded in code).

**Severity:** CRITICAL — Anon keys are public by design but bundling them as literal fallback strings means they're always present in the client bundle even if env vars are set correctly elsewhere.

---

### WARNING: fallback credentials in `.env.local` committed to history

**File:** `.env.local`  
**Issue:** The `.env.local` file contains real Supabase credentials. The `.gitignore` excludes `.env*` files, but this file exists in the workspace and could be leaked via misconfigured deployment or backup.

**Fix:** Verify `.env.local` is in `.gitignore` (it is — `!.env.example` excludes it). Ensure no CI/CD pipeline or build script reads `.env.local` before deploying. The Vercel project should use its own environment variables instead.

**Severity:** WARNING — Gitignore protects version control, but review deployment pipeline to confirm env vars are set in Vercel dashboard.

---

## ❌ CODE QUALITY

### WARNING: Unused imports in `app/page.tsx`

**File:** `app/page.tsx` (lines 3-8)  
**Issue:** The following Lucide icons are imported but never used in the JSX:
- `Filter`
- `TrendingUp`
- `SlidersHorizontal`

**Fix:** Remove them from the import statement:

```typescript
import {
  Search, MapPin, Sparkles, Shield, Globe, Users, Star,
  ChevronDown, ChevronRight, Clock, Compass,
  Lightbulb, Heart, Clock3, Sun, Moon,
} from 'lucide-react';
```

**Severity:** WARNING — Adds ~3KB to the bundle unnecessarily. No runtime impact.

---

### WARNING: Unused import in `app/destination/[slug]/page.tsx`

**File:** `app/destination/[slug]/page.tsx` (line 9)  
**Issue:** `Share2` is imported but never used in the destination page component.

**Fix:** Remove `Share2` from the import:

```typescript
import {
  ArrowLeft, Clock3, Calendar, Users,
  ChevronLeft, ChevronRight
} from 'lucide-react';
```

**Severity:** WARNING — Unnecessary bundle weight.

---

### WARNING: Orphaned/unused page files in app directory

**Files:** `app/page-complex.tsx`, `app/page-fixed.tsx`, `app/page-simple.tsx`  
**Issue:** These are legacy/alternative versions of the homepage that are not referenced anywhere in the routing. They import from `@/components/` (Header, SearchBar, FilterSidebar, BusinessListingCard, SimpleMapContainer) and contain dead code.

**Fix:** These should be moved to a `_archive/` folder or deleted entirely to prevent confusion:

```bash
mkdir -p app/_archive
mv app/page-complex.tsx app/_archive/page-complex.tsx
mv app/page-fixed.tsx app/_archive/page-fixed.tsx
mv app/page-simple.tsx app/_archive/page-simple.tsx
```

**Severity:** WARNING — Dead code increases cognitive load and could mislead future developers.

---

### WARNING: `console.log` debugging calls in components

**Files:**
- `components/SearchBar.tsx:11` — `console.log('Searching for:', searchQuery)`
- `components/FilterSidebar.tsx:163` — `console.log('Applying filters:', filters)`

**Issue:** Debugging `console.log` calls left in production code. These will output to browser console in production builds.

**Fix:** Remove the `console.log` statements. If debugging is needed temporarily, wrap in:

```typescript
if (process.env.NODE_ENV !== 'production') {
  console.log('...');
}
```

**Severity:** WARNING — Information leak to client console. Minor in severity but unprofessional.

---

### WARNING: `innerHTML` usage in `components/MapContainer.tsx`

**File:** `components/MapContainer.tsx` (line 68)  
**Issue:** Uses `.innerHTML` to set marker content. This is an XSS vector if any business content includes user-supplied data. However, this component appears to be legacy/unused by the active page.

**Fix:** Use `textContent` for static text or `document.createElement()` with `appendChild()` for structured HTML. If this component is unused, delete it.

**Severity:** WARNING — Legacy code path. If MapContainer is never imported in active routes, severity is lower.

---

### INFO: `console.warn` in `lib/supabase.ts` for missing env vars

**File:** `lib/supabase.ts` (line 8-12)  
**Issue:** Uses `console.warn` for missing env vars. In a production build this should either throw or provide a more structured fallback (e.g., `process.env.NODE_ENV === 'production'` check).

**Fix:** Optional — replace with a structured error that doesn't silently proceed with a fallback that may behave unexpectedly:

```typescript
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Supabase env vars not configured');
  }
  console.warn('Supabase env vars not set — running without backend');
}
```

**Severity:** INFO — Functional, just not production-robust.

---

### INFO: No error boundaries wrapping async data components

**Files:** `app/page.tsx`, `app/destination/[slug]/page.tsx`  
**Issue:** Both pages fetch JSON data from `/data/destinations.json` with `try/catch` but only log errors and set `loading = false`. If the JSON is malformed or missing entirely, the page will render with empty/undefined state.

**Fix:** Consider adding a React Error Boundary wrapper around the main content area:

```typescript
// components/ErrorBoundary.tsx
'use client';
import { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

**Severity:** INFO — Current try/catch handles fetch errors, but render-time errors could still crash the page.

---

## ❌ ACCESSIBILITY

### WARNING: Category grid buttons lack accessible labels

**File:** `app/page.tsx` (lines 198-215)  
**Issue:** The category buttons and city filter buttons have no `aria-label` or `aria-pressed` attributes. Screen readers would announce "button" without clear context of what the button filters or its current active state.

**Fix:** Add `aria-pressed` to filter buttons:

```tsx
<button
  key={cat.name}
  onClick={() => setSelectedCategory(cat.name === selectedCategory ? "All" : cat.name)}
  aria-pressed={selectedCategory === cat.name}
  aria-label={`Filter by ${cat.name}`}
  className="..."
>
```

**Severity:** WARNING — Filter/toggle buttons need accessible active-state communication.

---

### INFO: Image Gallery buttons in destination page have aria-labels (good), but ExpandableSection buttons could be more descriptive

**File:** `app/destination/[slug]/page.tsx` (ExpandableSection component)  
**Issue:** The accordion toggle buttons have no `aria-expanded` attribute and only the visible text "Tips & Tricks from Parents" etc. as the accessible name. Adding `aria-expanded` would improve screen reader experience.

**Fix:** Add `aria-expanded={open}` to the accordion button:

```tsx
<button
  onClick={() => setOpen(!open)}
  aria-expanded={open}
  className="..."
>
```

**Severity:** INFO — Already has clear text content, but `aria-expanded` is a best practice for accordions.

---

## ❌ MOBILE

### INFO: Touch targets appear adequate but some edge cases

**File:** `app/page.tsx`  
**Issue:** 
- City filter buttons: `px-4 py-2` with text-sm — approximately 32px height, below the 44px minimum touch target guideline. 
- Category grid buttons: `p-4` — these are fine at ~48px+.
- Search button: `px-5 py-3.5` — ~44px, adequate.

**Suggestion:** Increase city filter button padding:

```tsx
className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ...`}
```

Or add `min-h-[44px]` to city filter buttons.

**Severity:** INFO — Close to 44px but could be tighter on small screens.

---

## ✅ What's Done Well

- **Loading states** — Both pages show a spinner while data loads (`loading && <div className="animate-spin">`)
- **Empty states** — `page.tsx` has a clear empty state ("No destinations match your filters") with a reset button
- **404 handling** — `destination/[slug]/page.tsx` has a proper 404 UI with navigation
- **Alt text** — All `<img>` tags have descriptive `alt` attributes
- **Responsive layout** — Uses Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) consistently
- **Gallery a11y** — Arrow buttons and dot indicators have `aria-label` attributes
- **SEO metadata** — Dynamic OG/Twitter card injection in destination page
- **Semantic HTML** — Uses `<header>`, `<main>`, `<section>`, `<footer>` elements

---

## Priority Actions (in order)

1. **🔥 CRITICAL** — Remove hardcoded Supabase anon key fallback from `lib/supabase.ts`
2. **⚠️ Remove unused imports** — `Filter`, `TrendingUp`, `SlidersHorizontal` from `page.tsx`; `Share2` from `[slug]/page.tsx`
3. **⚠️ Clean up dead files** — Delete or archive `page-complex.tsx`, `page-fixed.tsx`, `page-simple.tsx`
4. **⚠️ Remove debug console.logs** — In `components/SearchBar.tsx` and `components/FilterSidebar.tsx`
5. **⚠️ Add aria-pressed to filter buttons** — City and category filter buttons
6. **ℹ️ Add aria-expanded to accordion buttons** — ExpandableSection component
7. **ℹ️ Touch target** — Increase city button padding for mobile
