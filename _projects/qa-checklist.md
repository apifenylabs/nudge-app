# Deployment QA Checklist — MUST PASS BEFORE DEPLOY

## CEO Sign-Off Required

**All sites** must pass before any deploy. Run through every item.

### 1. Text Contrast Scan (High Priority)
For each page type (home, search, destination/[slug], blog, blog/[slug]):

- [ ] **White text (`text-white`/`text-gray-100`/`text-gray-200`/`text-gray-300`)**
  - Is it on a **dark** background? (gradient, navy, black, hero overlay)
  - If on white/cream/light-grey → FAIL
- [ ] **Light gray text (`text-gray-400`/`text-gray-500`/`text-gray-600`)**
  - Is it on white/cream/light-grey? → likely FAIL (< 4.5:1 contrast)
  - Acceptable only as secondary labels if background is truly not white
- [ ] **Dark text (`text-gray-900`/`text-black`)**
  - Is it on a dark background? → FAIL (invisible in dark mode)

### 2. Dark Mode Scan
- [ ] Pages with dark mode toggle: all component text rendered with CSS variables, not hardcoded Tailwind colors
- [ ] No `text-gray-XXX` without `dark:` variant on dark-mode-enabled sites
- [ ] Hero images have gradient overlay in both modes

### 3. Affiliate Links
- [ ] All Klook links use direct `aid=119991` (not Travelpayouts proxy on Klook)
- [ ] Booking.com links use `aid=2875669`
- [ ] Travelpayouts pixel script present on all pages
- [ ] Travelpayouts pixel uses `dangerouslySetInnerHTML` (not JSX)

### 4. General UX
- [ ] No hardcoded `text-gray-XXX` on `bg-white`/`bg-gray-50`/`bg-gray-100` without dark: variant
- [ ] Cross-site links use purple theme color, not green
- [ ] Brand colors match site identity (purple for Family Travel, gold for Luxury, teal for EV)

---

## Builder Instructions

### Fix Pattern for Invisible Text

**Problem:** `text-gray-500` on `bg-white` = invisible
**Fix:** Add `dark:` variant or use CSS variable:

```tsx
// BAD:
<span className="text-xs text-gray-500">Price Range</span>

// GOOD — readable everywhere:
<span className="text-xs text-gray-500 dark:text-gray-400">Price Range</span>

// BEST — CSS variables:
<span className="text-xs text-muted">Price Range</span>
```

**Problem:** `text-white` on light section of hero
**Fix:** Ensure text is only placed inside the dark gradient overlay area, or use `text-white drop-shadow-lg` with sufficiently dark overlay.
