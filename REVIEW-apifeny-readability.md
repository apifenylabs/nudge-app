# Apifeny AI Directory — Readability Audit

**Date:** 2026-05-27  
**Source:** Live site https://apifeny-ai.vercel.app + local repo `/home/captain/.openclaw/workspace/apifeny-ai/`

---

## Summary

The site has systemic readability issues across **three main categories**:

1. **Low text contrast** — several text color combinations fail WCAG AA (minimum 4.5:1 for normal text)
2. **Excessively small font sizes** — many elements use 8px–11px font sizes that are hard to read, especially on mobile
3. **Potential mobile layout issues** — horizontal overflow on trending scroll, no content-width clamping on wide elements

---

## Issue 1: Low-Contrast Text (WCAG AA Failures)

### Tailwind `text-gray-400` on white backgrounds

**Color:** `#9CA3AF` on `#FFFFFF` — contrast ratio ~2.8:1 (FAILS AA 4.5:1)

Used extensively throughout the codebase for secondary/tertiary text that is still meant to be read:

| File | Line | Usage |
|------|------|-------|
| `app/_HomeClient.tsx` | 395 | Testimonial role: `text-[10px] text-gray-400` |
| `app/_HomeClient.tsx` | 437 | FOMO bar items: `text-[10px] sm:text-xs text-gray-500` (ok at sm) |
| `components/Footer.tsx` | 23 | Tagline: `text-gray-400 text-xs` |
| `components/Footer.tsx` | 165, 173, 176 | Affiliate disclosure, copyright, bottom nav |
| `components/Footer.tsx` | 178, 180 | Separator "·" dots: `text-gray-300` — ~1.7:1 ratio |
| `components/FeaturedPlaybooks.tsx` | 58 | Read time badge: `text-[9px] text-gray-400` |
| `components/FeaturedPlaybooks.tsx` | 79 | Metric label: `text-[9px] text-gray-400 truncate` |
| `components/FeaturedPlaybooks.tsx` | 103 | "Read playbook" link: `text-[10px] text-gray-400` |
| `components/FeaturedCollections.tsx` | 41 | "View collection" link: `text-[10px] text-gray-400` |
| `components/SuccessStories.tsx` | 191 | Author name: `text-[10px] text-gray-400` |
| `components/SuccessStories.tsx` | 193 | Likes/shares: `text-[10px] text-gray-400` |
| `components/SponsoredToolSpot.tsx` | 57 | Star rating label: `text-gray-400` |
| `components/SponsoredToolSpot.tsx` | 69 | "Sponsored" badge: `text-[10px] text-gray-400` |
| `components/affiliate/PriceComparison.tsx` | 69, 137, 140 | Various price labels |
| `components/TrendingTools.tsx` | (inline) | Rank scores |
| `components/Header.tsx` | 65, 197 | Search icon: `text-gray-400` |
| `components/Header.tsx` | 234 | "Sister Sites" heading: `text-[10px] text-gray-400` |
| `components/NewsletterSignup.tsx` | 55, 62, 87 | Placeholder, unsubscribe text |

### Tailwind `text-gray-300` on white

**Color:** `#D1D5DB` on `#FFFFFF` — contrast ratio ~1.7:1 (FAILS WCAG AA for ALL text sizes)

| File | Line | Usage |
|------|------|-------|
| `components/Footer.tsx` | 178, 180 | Separator dots between privacy/terms/status |
| `app/_HomeClient.tsx` | 301 | "❌" in the comparison table (not-available indicator) |
| `components/ToolCard.tsx` | 142 | Empty star icon: `fill-none text-gray-300` |

### `tech-200` (#8888AA) on dark backgrounds

**Color:** `#8888AA` — used on `text-tech-200`  

When rendered on very dark backgrounds (`tech-900: #050510`, `tech-800: #0A0A1A`, `tech-700: #111125`), the contrast ratio is:

- `#8888AA` on `#111125` (tech-200 on tech-700): **~2.7:1** — FAILS AA
- `#8888AA` on `#050510` (tech-200 on tech-900): **~4.3:1** — borderline

Problem spots in comment/playbook dark UI components:

| File | Line | Usage |
|------|------|-------|
| `components/PlaybookComments.tsx` | 286 | Empty state: `text-xs text-tech-200` on dark bg |
| `components/ToolComments.tsx` | 145 | Comment metadata: `text-xs text-tech-200` |
| `components/ToolComments.tsx` | 171, 182 | Like/reply buttons (inactive state): `text-tech-200` |
| `components/ToolComments.tsx` | 264 | Empty state: `text-xs text-tech-200` |
| `components/FreeTemplateBanner.tsx` | 19 | Description: `text-xs text-tech-200` on tech-900 bg |
| `components/ToolCommunityPlaybooks.tsx` | 73 | Community playbook description: `text-xs text-tech-200 line-clamp-2` |
| `components/AffiliateCTABar.tsx` | 74 | Description: `text-xs sm:text-sm text-tech-200` |
| `components/FreeTemplateSection.tsx` | 33 | Prompt preview: `text-[11px] text-tech-200` on dark bg |

### `tech-300` (#555578) on dark backgrounds

**Color:** `#555578` on dark bg (`#0A0A1A` or `#050510`) — contrast ratio ~2.0:1 (FAILS AA)

| File | Line | Usage |
|------|------|-------|
| `components/PlaybookComments.tsx` | 122 | Badge on dark: `text-xs text-tech-300 bg-tech-800` |
| `components/PlaybookComments.tsx` | 148 | Legal text: `text-[9px] text-tech-300` |
| `components/PlaybookComments.tsx` | 177 | Reply author: `text-[10px] text-tech-300` |
| `components/PlaybookComments.tsx` | 192, 221, 248 | Reply/like links: `text-[10px] text-tech-300` |
| `components/PlaybookComments.tsx` | 269 | Reply name: `text-[10px] text-tech-300` |
| `components/PlaybookComments.tsx` | 208, 216 | Placeholder text: `placeholder:text-tech-300` |
| `components/ToolComments.tsx` | 195, 209 | Placeholder: `placeholder:text-tech-300` |
| `components/ToolComments.tsx` | 213 | Legal text: `text-[9px] text-tech-300` |
| `components/ToolComments.tsx` | 245 | Reply author: `text-[10px] text-tech-300` |
| `components/ToolComments.tsx` | 251 | Reply link: `text-[10px] text-tech-300` |

### `text-gray-500` on white — borderline

**Color:** `#6B7280` on `#FFFFFF` — contrast ratio ~4.6:1 (barely passes AA for normal text at 4.5:1)

This is the **most common** text color for body/description text. It passes WCAG AA by 0.1:1, which is fragile:
- On low-quality displays or in bright ambient light, readability degrades
- At small sizes (11px, 12px), the effective perceived contrast is lower

While technically passing, the pervasiveness of this color for _body text_ is a concern. Consider `text-gray-600` (#4B5563, ~5.7:1) for better readability.

---

## Issue 2: Excessively Small Font Sizes

The codebase uses many `text-[8px]`, `text-[9px]`, `text-[10px]`, and `text-[11px]` classes. On desktop these can be fine, but on mobile devices (especially with higher DPI), these become genuinely hard to read.

### `text-[8px]` — nearly illegible

| File | Line | Content |
|------|------|---------|
| `components/FeaturedPlaybooks.tsx` | 96 | Pipeline stage badge: `text-[8px]` |

### `text-[9px]` — hard to read, especially on mobile

| Location | Count of uses |
|----------|--------------|
| `components/FeaturedPlaybooks.tsx` | 3 (difficulty badges, read time, metric labels) |
| `components/MustUseThisMonth.tsx` | 2 (badge labels, score badge) |
| `components/SponsoredToolSpot.tsx` | 1 (Featured badge) |
| `components/PlaybookComments.tsx` | 2 (helper text, reply names) |
| `components/ToolComments.tsx` | 2 (helper text, reply names) |
| `components/ToolCommunityPlaybooks.tsx` | 2 (difficulty badges, results badge) |
| `components/SuccessStories.tsx` | 1 (metric labels) |
| `components/PriceComparisonTable.tsx` | 2 (badges) |

### `text-[10px]` — common, borderline on mobile

| Location | Count of uses |
|----------|--------------|
| `app/_HomeClient.tsx` | 4+ (testimonial roles, FOMO bar, footer items) |
| `components/Footer.tsx` | Multiple (link text, legal) |
| `components/Header.tsx` | 2 (Beta badge, Sister Sites heading) |
| `components/FeaturedPlaybooks.tsx` | 4 (metric values, description) |
| `components/FeaturedCollections.tsx` | 1 (link text) |
| `components/SuccessStories.tsx` | 8+ (stat labels, tags, likes, shares) |
| `components/ToolCard.tsx` | Multiple (category, pricing, score badges) |
| `components/TrendingTools.tsx` | Score numbers |
| `components/NewsletterSignup.tsx` | 1 (unsubscribe text) |

### `text-[11px]` — small but acceptable

Used for free prompt previews and descriptions. Acceptable for supplementary content but should be the _minimum_ for body-adjacent text.

---

## Issue 3: Mobile Layout Concerns

### 3a. Horizontal overflow on Trending Tools scroll

**File:** `components/TrendingTools.tsx` line 96

```tsx
className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
```

The trending tools section uses horizontal scrolling with `snap-x`. Each card is `min-w-[280px] sm:min-w-[300px]`. On a 360px-wide phone screen, this works for the scroll, but if any card content exceeds its container width (unlikely but possible with long tool names), it will cause horizontal overflow.

**Recommendation:** Add `max-w-full` on the cards and `word-break` rules.

### 3b. No maximum width on hero heading

**File:** `app/_HomeClient.tsx` lines 105-108

```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-5 tracking-tight">
```

The heading container has `max-w-3xl` but the heading itself does not enforce word-break. The gradient text "Spend $70/mo on AI" includes a `/` character that could cause line-breaking issues at certain viewport widths.

### 3c. Table on mobile — comparison section

**File:** `app/_HomeClient.tsx` lines 296-307

The playbook difference comparison table uses a native `<table>` element. On small screens (< 640px), there's no horizontal scroll wrapper. With 3 columns and longer feature names, this could cause horizontal overflow.

**Recommendation:** Wrap the comparison table in an `overflow-x-auto` container.

### 3d. Grid layout for category icons — no overflow protection

**File:** `components/FeaturedCategories.tsx` lines 56-70

The grid uses `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3`. With 20 categories (sorted by tool count), this is fine — but if category names are long, the flex layout inside each card could push boundaries.

---

## Issue 4: Other Readability Issues

### 4a. No responsive font-size on prompt previews

**File:** `app/_HomeClient.tsx` line 169

```tsx
<p className="text-[11px] text-gray-500 leading-relaxed italic">
```

On mobile, `11px` text at `#6B7280` (gray-500, 4.6:1 ratio) in italic is particularly hard to read. **Italic reduces perceived readability** — at small sizes and low contrast, this is a triple penalty.

### 4b. Testimonial role text

**File:** `app/_HomeClient.tsx` line 395

```tsx
<p className="text-[10px] text-gray-400">{testimonial.role}</p>
```

This is `text-[10px]` at `text-gray-400` (#9CA3AF, 2.8:1 ratio) — **doubly problematic**. The role is secondary info but still meant to be read. Needs either larger size or darker color.

### 4c. Footer separator dots

**File:** `components/Footer.tsx` lines 178, 180

```tsx
<span className="text-gray-300">·</span>
```

`gray-300` (#D1D5DB) on white is 1.7:1 contrast. Separators are decorative, so contrast rules have exceptions, but this is visually poor.

---

## Quick-Fix Priority Matrix

| Priority | Issue | Fix | Effort |
|----------|-------|-----|--------|
| 🔴 High | `text-gray-400` on white in readable content (testimonial roles, stats, prices) | Change to `text-gray-600` | Low |
| 🔴 High | `text-[8px]` and `text-[9px]` badges | Bump to `text-[11px]` or use responsive `text-[10px] sm:text-xs` | Low |
| 🟡 Medium | `text-tech-300` (#555578) on dark backgrounds (comments, playbook pages) | Change to `text-tech-100` or `text-white/60` | Low |
| 🟡 Medium | Overflow on comparison table on mobile | Wrap table in `overflow-x-auto` | Low |
| 🟢 Low | `text-gray-300` separator dots | Use `text-gray-400` or a thin border instead | Low |
| 🟢 Low | Italic + small + gray prompt previews | Remove italic, increase size to `text-xs`, darken to `text-gray-600` | Low |
| 🟢 Low | Trending horizontal scroll on edge-case long names | Add `max-w-full` + `truncate` on card titles | Low |

---

## Key Files Requiring Changes

- **`app/_HomeClient.tsx`** — main homepage: contrast fixes on testimonials, FOMO bar, table, prompt previews
- **`components/Footer.tsx`** — footer: gray-400 text, gray-300 separators
- **`components/FeaturedPlaybooks.tsx`** — 8px/9px badges, gray-400 links
- **`components/FeaturedCollections.tsx`** — 10px gray-400 links
- **`components/SuccessStories.tsx`** — 9px/10px gray-400 labels throughout
- **`components/TrendingTools.tsx`** — scroll overflow protection (low risk now)
- **`components/PlaybookComments.tsx`** — tech-300 on dark: hard to read
- **`components/ToolComments.tsx`** — tech-300 on dark: hard to read
- **`components/ToolCard.tsx`** — gray-300 star icons, small badge text
- **`components/SponsoredToolSpot.tsx`** — gray-400 text for rating/sponsor labels
- **`components/AffiliateCTABar.tsx`** — tech-200 descriptions on dark
- **`components/ToolCommunityPlaybooks.tsx`** — tech-200 descriptions on dark

---

## Recommendations Summary

1. **Replace `text-gray-400` with `text-gray-600`** on all readable content across the site (~30+ instances)
2. **Replace `text-gray-300` with `text-gray-400`** (or `text-gray-500`) on separator dots
3. **Eliminate `text-[8px]` and `text-[9px]`** — bump to `text-[11px]` minimum; use responsive `text-[10px] sm:text-xs` where space is tight
4. **Fix dark-theme contrast** — change `text-tech-300` to `text-tech-100` and `text-tech-200` to `text-tech-100` on dark backgrounds
5. **Wrap the comparison table** in `overflow-x-auto` to prevent mobile horizontal overflow
6. **Remove italic** from small low-contrast text in prompt previews
7. **Add `max-w-full` / `truncate`** to ToolCard and card titles to guard against overflow
