# EV Charging Asia — Human-Readability Audit

**Audited:** 2026-05-27  
**Site:** https://ev-charging-asia.vercel.app  
**Repo:** `/home/captain/.openclaw/workspace/ev-charging-asia`

---

## 1. Base Typography (layout.tsx)

**Status: Good.** The layout sets `text-gray-900 dark:text-gray-100` on `<body>` and uses the Inter font with `antialiased`. This gives a solid default contrast of **~15.5:1** on `bg-gray-50` (#F9FAFB) and **~19:1** on white. No base-sizing issue — inter `display: swap` is present.

However, **no base `font-size` or `line-height` is declared on `body`** — meaning it inherits the browser default of `16px`. That's fine in practice but leaving it implicit means theme-aware scaling is not guaranteed if the Tailwind base reset is absent.

**Verdict:** Acceptable, but adding an explicit `@layer base { body { font-size: 16px; line-height: 1.6; } }` in globals.css would lock in predictable rendering.

---

## 2. Globals.css

**Status: Good overall.** Dark mode definitions are thorough. CSS is well-structured with layers.

**Concern:** No `@tailwind base` overrides for body font-size or line-height were found — this is common and works but isn't explicit.

---

## 3. Tailwind Config (tailwind.config.ts)

- Custom colors defined (`vibe-teal`, `vibe-coral`, etc.) — no custom text color palette that overrides defaults.
- No custom `fontSize` extensions — meaning all `text-xs` etc. use Tailwind defaults.
- `text-[9px]`, `text-[10px]` are arbitrary values used throughout, not config-managed. These bypass any theme control.

---

## 4. ⚠️ Critical Readability Problems Found

### 4a. Pervasive `text-gray-400` on White / Near-White Backgrounds

`text-gray-400` is **#9CA3AF** (light grey). On white (#FFFFFF) this has a contrast ratio of **~3.0:1** — below the WCAG AA minimum of **4.5:1** for normal text. This fails accessibility for body text.

**Locations where `text-gray-400` is used for user-facing text (not just decorative/loading states):**

| File | Usage | Context |
|------|-------|---------|
| `app/page-content.tsx:82` | `text-[10px] text-gray-400` on `bg-gray-100` | Station/city count badge in header — **3.0:1** |
| `app/page-content.tsx:209` | `text-xs text-gray-400` on white | Connector type labels in the stats bar |
| `app/page-content.tsx:270` | `text-[10px] text-gray-400` on white | Route card distance labels |
| `app/page-content.tsx:278` | `text-[10px] text-gray-400` on white | "Compare routes" link area |
| `app/page-content.tsx:380` | `text-[10px] text-gray-400` on white | Blog post date/reading-time meta |
| `app/page-content.tsx:450` | `text-[10px] text-gray-400` | Affiliate disclosure text |
| `app/page-content.tsx:503` | `text-[10px] text-gray-400` | Copyright footer line |
| `components/SiteFooter.tsx:95` | `text-xs text-gray-400` on white | Brand description text in footer |
| `components/SiteFooter.tsx:105-114` | `text-sm text-gray-400` on white | All 4 quick-links in footer — **these are links users should be able to read** |
| `components/SiteFooter.tsx:128-198` | `text-sm text-gray-400` on white | All 7 sister-site link names — main navigation content |
| `components/SiteFooter.tsx:206` | `text-[10px] text-gray-400` on white | Affiliate disclosure |
| `components/SiteFooter.tsx:213` | `text-xs text-gray-400` on white | Copyright + footer links |
| `components/AffiliateCTABar.tsx:26` | `text-[10px] text-gray-400` | "Affiliate links" label |
| `components/AffiliateCTABar.tsx:62` | `text-[10px] text-gray-400` | CTA disclosure |
| `components/RoutePopularity.tsx:123` | `text-xs text-gray-400` on `bg-white` | "You rated..." text |
| `components/RoutePopularity.tsx:165` | `text-xs text-gray-400` | Center text message |
| `components/SafeMapSection.tsx:44,93` | `text-gray-400 text-sm` | Loading state — acceptable (transient) |
| `components/FilterBar.tsx:102` | `text-[10px] text-gray-400` | Filter description text |
| `components/TipForm.tsx:200` | `text-gray-400` | Button border states |
| `app/affiliate/page.tsx` | Multiple `text-[9px] text-gray-400`, `text-[10px] text-gray-400` | Widespread — labels, descriptions, metadata |

### 4b. `text-gray-500` on White Backgrounds — Borderline

`text-gray-500` (#6B7280) on white gives **~4.6:1** — technically WCAG AA pass but barely. At small sizes (`text-xs`, `text-[10px]`) this is uncomfortable to read.

**Marginal cases found:**
- `app/page-content.tsx:344-356` — itinerary card descriptions at `text-xs text-gray-500` (10.5px, contrast ~4.6:1)
- `app/page-content.tsx:391` — tag pills at `text-[9px] text-gray-500` — 9px at 4.6:1 is hard to read
- `components/SiteFooter.tsx` — section headers `text-xs font-semibold text-gray-500 uppercase` — also `h4` headings with `text-xs` (0.75rem)
- `app/page-content.tsx:429` — `text-[10px] text-gray-500` hotel badge text
- Various `app/affiliate/page.tsx` lines with `text-[9px] text-gray-500`

### 4c. Micro Font Sizes (`text-[9px]`, `text-[10px]`)

The site makes extensive use of hard-coded 9px and 10px font sizes. Small text at these sizes **significantly reduces readability** for anyone with visual impairment, elderly users, or on high-DPI mobile screens.

**Approximate count of text-[9px] occurrences:** 12+ (mostly in affiliate dashboard)  
**Approximate count of text-[10px] occurrences:** 20+ across homepage, footer, and components

While some uses are legitimate for legal disclaimers and metadata, many are used for:
- Navigation links (`text-sm text-gray-400` in footer — actually 14px, but paired with grey that makes it hard)
- Descriptive text that users need to read (itinerary descriptions, route difficulty, timestamps)
- Affiliate link labels (borderline decorative text, but still content)

### 4d. Line-Heights on Body Text

The hero has `leading-relaxed` on the subtitle. But paragraph-style text in sections uses Tailwind default `leading-5` (for `text-sm`) or no explicit leading — which can feel cramped for extended reading.

**No `leading-relaxed` or `leading-6` on:**
- Seasonal explorer content text (`text-sm text-gray-600`, line 299)
- Itinerary section description (`text-sm text-gray-700`, line 344)
- Most card body text

---

## 5. Summary of Findings

| Severity | Issue | Count | WCAG Fail? |
|----------|-------|-------|------------|
| 🔴 **Critical** | `text-gray-400` text on white/near-white that users need to read | 20+ instances | **Yes** (~3.0:1 ratio) |
| 🟡 **Moderate** | `text-gray-500` at small sizes (9-12px) | 10+ instances | Borderline (~4.6:1) |
| 🟡 **Moderate** | Hardcoded `text-[9px]` and `text-[10px]` for content text | 30+ instances | Affects legibility |
| 🟢 **Low** | No explicit body `font-size`/`line-height` in layout | — | Minor polish |
| 🟢 **Low** | Missing `line-height` on section description text | Multiple | Minor |

### Quick Wins (Priority Order)

1. **Bump `text-gray-400` → `text-gray-500` on footer links** — the SiteFooter quick-links and sister-site names use `text-sm text-gray-400`. Changing to `text-gray-500` keeps it subtle but brings contrast from ~3.0:1 → ~4.6:1.

2. **Bump `text-gray-400` → `text-gray-600` for content that users actually read** — date/timestamps on blog cards, route card distance labels, connector stat labels. `text-gray-600` (#4B5563) gives ~5.7:1 on white.

3. **Increase `text-[9px]` tags to at least `text-[10px]` or `text-xs`** — the smallest sizes are used for tag pills, blog post metadata, and affiliate dashboard labels. Users squinting at 9px text will abandon the page.

4. **Set explicit body defaults** — add to `globals.css`:
   ```css
   @layer base {
     body {
       font-size: 16px;
       line-height: 1.6;
     }
   }
   ```

5. **Add `leading-relaxed` or `leading-6`** to section description paragraphs that contain multiple sentences (itineraries, seasonal explorer, hotels).

---

## 6. Good Things Worth Preserving

- Hero section contrast is excellent (white text on dark green background)
- The `vibe-text-gradient` is used sparingly and on large text only
- Dark mode definitions are comprehensive and correctly remap text colors
- The cross-site link styles (`cross-site-link`) have good contrast (#166534 on green-tinted bg)
- Structured data is present
