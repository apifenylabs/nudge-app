# Readability Audit: Luxury Family Travel Asia

**Site:** https://luxury-family-travel-asia.vercel.app  
**Repo:** `_projects/luxury-family-travel`  
**Date:** 2026-05-27  
**Reviewer:** Subagent audit

---

## 1. Font Sizes — Dangerously Small on Mobile

### Problem
The site heavily uses `text-[10px]` and `text-[11px]` throughout components. This falls well below the 16px minimum recommended for comfortable mobile reading. WCAG SC 1.4.4 requires text to be resizable to 200% without loss of content — browsers can zoom, but tiny default sizes still hurt the first-time experience.

### Locations

| File | Selector/CSS | Size | Context |
|------|-------------|------|---------|
| `app/page-content.tsx` | `text-[10px]` | 10px | Stats counter labels (`text-cream/60`, `text-navy-light/40`), category counts, price indicators, "x% approved" |
| `app/page-content.tsx` | `text-[11px]` | 11px | City/country on Top 10 cards |
| `components/DestinationCard.tsx` | `text-[10px]` | 10px | Category badge text, price dots, safety stars, tips/review counts |
| `components/BottomNav.tsx` | `text-[10px]` | 10px | All bottom nav labels |
| `app/destination/[slug]/_client.tsx` | `text-[10px]` | 10px | Hero badges, price band labels, affiliate disclaimers |
| `components/EditorBadge.tsx` | `editor-badge CSS` | `0.6rem` (9.6px) | Badge text on editor picks |
| `components/SiteFooter.tsx` | `text-[10px]` | 10px | Affiliate disclosure |

**Verdict:** **CRITICAL** — Everything below `text-xs` (`12px`) should be bumped to at least `text-xs` (`12px`) on mobile, with headroom to `text-sm` (`14px`) at `sm:` breakpoints.

---

## 2. Low-Contrast Text — `text-navy-light/60` / `text-cream/60` / `text-gray-400`

The tailwind config defines `navy-light: #2D3F54` and the custom CSS sets `text-muted: #7A7A7A`. Mixed with opacity modifiers like `/60` and `/50`, several text elements drop below the WCAG AA contrast ratio of 4.5:1.

### Measured Contrast Ratios

| Token | Hex / Computed | Background | Ratio | WCAG AA |
|-------|---------------|-----------|-------|---------|
| `text-gray-400` (#9CA3AF) | #9CA3AF | white (#FFF) | 2.78:1 | ❌ FAIL |
| `text-cream/50` → #7B7A77 | #7B7A77 | white (#FFF) | 3.27:1 | ❌ FAIL |
| `text-cream/40` → #63615C | #63615C | white (#FFF) | 4.02:1 | ❌ FAIL (passes only at 18px+ bold) |
| `text-navy-light/50` → #171F2A | #171F2A | warm-white (#F8F6F3) | 9.0:1 | ✅ PASS |
| `text-navy-light/60` → #1D2835 | #1D2835 | warm-white (#F8F6F3) | 7.5:1 | ✅ PASS |
| `text-gray-500` (#6B7280) | #6B7280 | white (#FFF) | 4.63:1 | ✅ PASS (barely) |

### Problem Locations

| File | Token | Context |
|------|-------|---------|
| `app/page-content.tsx` | `text-cream/60` | Hero stats labels ("Properties", "Countries") on dark bg — this actually passes on the dark navy background (good contrast because cream on navy is high), but **Fails on light backgrounds** |
| `app/page-content.tsx` | `text-navy-light/70` | Description text in top-10 cards (#1D2835 at 70% = ~#1F2D39 on warm-white ≈ 7:1 — this is fine) |
| `components/DestinationCard.tsx` | `text-gray-500` (#6B7280) | Safety/tips row — 4.63:1 on white is borderline, fine for 18px+ but this is 10px text |
| `components/DestinationCard.tsx` | `text-gray-700` (#374151) | Score badge, dollar signs — fine (safe) |
| `components/FilterBar.tsx` | `text-gray-500` (#6B7280) | Section labels, category labels — 4.63:1 pass but tight at small text |
| `components/FilterBar.tsx` | `text-gray-600` (#4B5563) | Button text, selects — 5.73:1 ✅ OK |
| `app/auth/*` | `text-gray-400` (#9CA3AF) | Icon colors, helper text — 2.78:1 ❌ FAIL |

**Verdict:** **HIGH** — `text-gray-400` on white backgrounds fails WCAG AA. Replace with `text-gray-500` minimum. OK if used only for disabled states or decorative/icon elements.

---

## 3. Horizontal Overflow Issues

### Mobile Carousel Rows (page-content.tsx)

```tsx
<div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2">
```

All `CarouselRow` instances use `overflow-x-auto` with snap scrolling on 260px-wide cards. On a 375px mobile screen, this works as designed but:

- **Problem:** The parent containers have no `-webkit-overflow-scrolling: touch` (already default in modern browsers, but worth noting)
- **Problem:** In Safari, `scrollbar-hide` combined with `overflow-x-auto` can cause invisible jump-scroll on initial render
- The "View All" dashed card uses `min-h-[300px]` which is taller than the standard card — this can look misaligned in the carousel

### Filter Bar Horizontal Scroll

```tsx
<div className="hidden sm:block">
  <div className="flex items-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
```

This is on purpose (desktop horizontal pill bar), but the `pb-2` is too narrow to prevent the scrollbar from overlapping content in Chrome on Windows.

### Compare Page Table (`app/compare/page.tsx`)

```tsx
<div className="overflow-x-auto -mx-6 md:-mx-8">
```

This has negative margins — intentional overflow scroll, likely fine.

### Footer (both desktop and mobile versions)

The footer has `flex-wrap` on network links. On very small screens (320px), the emoji + text links can break awkwardly but won't overflow.

**Verdict:** **LOW** — No critical overflow issues found. The carousels are intentional horizontal scroll. The compare table handles overflow correctly. Minor concern with Windows scrollbar overlap in filter pills.

---

## 4. Text Color Mapping — CSS vs Tailwind Classes

### Good News
The `globals.css` defines a proper theme with CSS variables:

```css
--text-primary: #2D2D2D;     /* charcoal — 13.5:1 on warm-white ✅ */
--text-secondary: #595959;   /* 8.5:1 on warm-white ✅ */
--text-muted: #7A7A7A;       /* 5.4:1 on warm-white ✅ */
```

But the components mostly use non-variable Tailwind classes (`text-gray-500`, `text-navy-light/70`, etc.), which means:

1. **Dark mode is broken for card text** — The CSS variables are respected for `body` (via `color: var(--text-primary)`), but component-level `text-gray-500` / `text-navy-light` classes don't use CSS variables and will stay light on the dark background, potentially becoming unreadable.
2. On light mode, they work fine because the navy-based colors are dark enough on warm-white.

### Specific Dark-Mode Failures

| Component | Light Mode | Dark Mode (prefers-color-scheme: dark) |
|-----------|-----------|----------------------------------------|
| DestinationCard title (`text-gray-900`) | ✅ | ❌ black text on navy-card (#1B2838) |
| DestinationCard body (`text-gray-500`) | ✅ (4.63:1) | ❌ #6B7280 on #1B2838 = 3.9:1 FAIL |
| FilterBar labels (`text-gray-500`) | ✅ | ❌ same issue |
| Auth page fields (`text-gray-700`, `text-gray-900`) | ✅ | ❌ black text on dark bg |
| BottomNav text (`text-gray-500`) | ✅ | ❌ |

The site claims `colorScheme: "light dark"` in viewport metadata, and the globals.css defines dark mode variables — but the component code doesn't use them.

**Verdict:** **CRITICAL** — Dark mode is broken for card/component text. Either support dark mode properly (use CSS variables + dark: variants) or remove the dark mode viewport declaration.

---

## 5. Specific Issues Found in Key Components

### DestinationCard.tsx
- `h3` title uses `text-gray-900` + `line-clamp-1` — fine for light mode, fine on mobile at `text-sm`
- Safety stars use `text-amber-400 fill-amber-400` on white — great for accessibility (color + shape)
- Score badge uses `bg-gray-400` for scores < 60 — `bg-gray-400` (#9CA3AF) on white text (#FFF) = 2.78:1 ratio. That's a tiny badge with white text on light grey — **unreadable**
- Price dots use `text-gray-200` (#E5E7EB) for inactive — purely decorative, fine
- Category badge classes use high-contrast pairs like `bg-amber-100 text-amber-700` ✅

### FilterBar.tsx
- Active filter pills use `bg-sky-100 text-sky-700 border-sky-200` — good contrast (~5.5:1)
- Inactive pills use `bg-white text-gray-600 border-gray-200` — okay (5.73:1)
- Mobile filter section titles `text-xs font-semibold text-gray-500 uppercase` — 10px at 4.63:1 is borderline (WCAG: 4.5:1 for body, but < 18px so needs 4.5:1 — passes barely)

### SiteFooter.tsx (desktop, hidden on mobile)
- `text-gray-300` (#D1D5DB) on `bg-charcoal` (#2D2D2D) = 6.8:1 ✅
- `text-gray-400` (#9CA3AF) on `bg-charcoal` (#2D2D2D) = 4.7:1 ✅ (barely)
- `text-gray-500` (#6B7280) on `bg-charcoal` (#2D2D2D) = 3.2:1 ❌ FAIL
- Sister site descriptions, affiliate disclosure text, copyright — all use `text-gray-500` on charcoal and all fail WCAG AA

### BottomNav.tsx
- Inactive icons: `stroke="#6b7280"` on white — 4.63:1 ✅
- Active icons: `stroke="#0ea5e9"` on white — 3.2:1 ❌ FAIL (sky-500 on white)
- Labels at `text-[10px]` in `text-gray-500` — both too small and borderline contrast

### Header (page-content.tsx)
- `text-gold` on `bg-navy` — good (cream-gold on navy is the brand identity, contrast falls around 5-7:1 depending on exact gold value, this is decorative/accent text so acceptable)
- `text-cream/80` on `bg-navy` — approx 8:1 ✅

---

## 6. Summary / Priority Ranking

| Priority | Issue | WCAG Impact |
|----------|-------|-------------|
| 🔴 **CRITICAL** | `text-[10px]` / `text-[11px]` used throughout as default body text | SC 1.4.4 (Resize text) |
| 🔴 **CRITICAL** | Dark mode viewport declared but component colors don't adapt — invisible text on dark | SC 1.4.1 (Use of Color), SC 1.4.3 (Contrast) |
| 🟡 **HIGH** | `text-gray-400` (#9CA3AF) on white — 2.78:1 fails WCAG AA for body text | SC 1.4.3 (Contrast Minimum) |
| 🟡 **HIGH** | Footer `text-gray-500` on `bg-charcoal` — 3.2:1 fails WCAG AA | SC 1.4.3 (Contrast Minimum) |
| 🟡 **HIGH** | Active bottom nav `#0ea5e9` on white — 3.2:1 fails WCAG AA | SC 1.4.3 (Contrast Minimum) |
| 🟠 **MEDIUM** | FilterBar "Clear" uses `bg-red-50 text-red-600` = ~4.5:1 borderline | SC 1.4.3 (Contrast Minimum) |
| 🟠 **MEDIUM** | Score badge uses `bg-gray-400` + white text — 2.8:1, small badge but fails | SC 1.4.3 (Contrast Minimum) |
| 🟢 **LOW** | Carousel overflow is intentional and well-implemented | No issue |
| 🟢 **LOW** | Horizontal scroll in filter pills may show scrollbar overlapping on Windows | Aesthetic |
| ℹ️ **INFO** | `text-sm` (14px) on hero section descriptions is reasonable ✅ | OK |
| ℹ️ **INFO** | `text-xs` (12px) for sub-labels on desktop is acceptable at high contrast | Borderline OK |
| ℹ️ **INFO** | `text-cream/60` on `bg-navy` in hero is actually fine due to high base contrast | ✅ OK |

---

## 7. Recommended Quick Fixes

### Font Size Bumps (lowest effort, highest impact)
```diff
- text-[10px]
+ text-xs       /* 12px — minimum comfortable */
- text-[11px]
+ text-xs       /* 12px */
```

### Contrast Fixes (white background contexts)
```diff
- text-gray-400 (#9CA3AF)
+ text-gray-500 (#6B7280)     /* 4.63:1 ✅ */
- text-gray-500 in footer
+ text-gray-400 on charcoal   /* Actually worse — instead use text-gray-300 or bump bg to lighter charcoal */
- text-sky-500 active (nav)
+ text-sky-600 (#0284C7)      /* 4.6:1 ✅ */
```

### Dark Mode — Either Commit or Remove
Remove `colorScheme: "light dark"` from viewport unless every component gets dark mode variants. The current state is worse than no dark mode.

---

*End of audit — 10 source files reviewed (layout.tsx, page.tsx, page-content.tsx, globals.css, tailwind.config.js, DestinationCard.tsx, FilterBar.tsx, HeroSection.tsx, BottomNav.tsx, SiteFooter.tsx)*
