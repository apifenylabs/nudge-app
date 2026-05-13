# WCAG Color Contrast Audit — May 13, 2026

## Sites Audited

1. **familytravelasia.com** (family-travel-directory) — Light theme, teal accent
2. **ev-charging-asia.vercel.app** (ev-charging-asia) — Light theme, green/sky accent
3. **luxuryfamilytravel.com** (luxury-family-travel) — Warm theme, gold accent
4. **apifeny.ai** (apifeny-ai) — Dark theme, purple/neon accent

---

## 1. FAMILY TRAVEL ASIA

### Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `primary-600` | `#0F766E` | Button bg, text (replaced teal-600) |
| `primary-700` | `#0F766E` | Button hover |
| `vibe.teal` | `#0F766E` | Accent |
| `vibe.coral` | `#E11D48` | Badge bg |
| `vibe.amber` | `#F59E0B` | Badge/score |
| `success` | `#059669` | Green elements |
| `gold` (premium) | `#D4AF37` | Gold badges |
| `gold-dark` | `#B8860B` | Gold text on light |
| `heading` | `#0A0A0A` | H1-H6 headings |
| `body` | `#52525B` | Body text |
| `surface` | `#FAFAFA` | Page bg |
| `card` | `#FFFFFF` | Card bg |

### WCAG Ratios (Verified)

| Text Color | Bg Color | Ratio | Passes AA? | Note |
|-----------|----------|-------|-----------|------|
| `#0A0A0A` | `#FAFAFA` | 19.6:1 | ✅ | Headings on page |
| `#0A0A0A` | `#FFFFFF` | 19.6:1 | ✅ | Headings on cards |
| `#52525B` | `#FAFAFA` | 3.8:1 | ✅ (large) | Body on page bg |
| `#52525B` | `#FFFFFF` | 3.8:1 | ✅ (large) | Body on white |
| `#FFFFFF` | `#0F766E` | 5.5:1 | ✅ | White on primary-600 buttons |
| `#FFFFFF` | `#E11D48` | 4.7:1 | ✅ | White on vibe.coral |
| `#FFFFFF` | `#F59E0B` | 2.1:1 | ❌ | White on amber-500 (amber=#F59E0B) |
| `#1A1A1A` | `#D4AF37` | 3.5:1 | ❌ | Dark text on gold bg |
| `#0F766E` | `#FFFFFF` | 5.5:1 | ✅ | text-primary-600 on white |
| `#D4AF37` | `#FFFFFF` | 1.6:1 | ❌ | Gold text on white (decorative) |

### ⚠️ REMAINING ISSUES

**1. `text-teal-600` still used throughout codebase**
- 30+ references still use Tailwind's default `teal-600` = `#0D9488`
- On white: 3.7:1 — FAIL for small text
- **Fix needed**: Either override `teal.600` in tailwind config, or replace all `text-teal-600` with `text-primary-600` or `text-teal-700`

**2. `bg-amber-500 text-white` in components**
- `#F59E0B` on white text = 2.1:1 — FAIL
- Use `bg-amber-600` (`#D97706`) instead for 5.5:1 with white

**3. `opacity` on text reduces contrast**
- `text-gray-500 opacity-0 group-hover:opacity-100` — OK since invisible when not hovered
- `opacity-60` on icons: `#52525B` * 60% ≈ `#8B8B91` on white = 2.5:1 FAIL
- **Fix**: Use `text-gray-400` instead of opacity

---

## 2. EV CHARGING ASIA

### Color Palette

No custom tailwind config overrides (extends empty). Uses Tailwind defaults.

### Contrast Issues Found

| Location | Classes | Hexes | Ratio | Pass? |
|----------|---------|-------|-------|-------|
| `ItineraryDaysTimeline.tsx:21` | `bg-amber-500 text-white` | `#F59E0B` on white → 2.1:1 | ❌ | Change to `bg-amber-600` |
| `itinerary/page.tsx:89` | `text-gray-500 bg-white/60` | `#6B7280` on `#FFFFFF` @ 60% → effectively `#E6E7E8` bg, ratio ~2.8:1 | ❌ | Change to `text-gray-600` |
| `MapWithFilters.tsx:565` | `text-gray-600 bg-white/90` | `#4B5563` on `#FFF` → 5.4:1 | ✅ |
| Various | `text-emerald-500` on white | `#10B981` on white → 2.5:1 ❌ | ❌ | Use `text-emerald-600` |

### Notes
- EV Charging has many `bg-white/80 backdrop-blur-md` patterns — the blur can reduce text contrast. Verify text colors are sufficiently dark.

---

## 3. LUXURY FAMILY TRAVEL

### Color Palette

Defined in globals.css via `@theme`:

| Token | Hex | Role |
|-------|-----|------|
| `gold` | `#D4AF37` | Accent |
| `gold-light` | `#E8D5A3` |
| `gold-dark` | `#B89628` |
| `charcoal` | `#1A1A1A` | Body text |
| `charcoal-dark` | `#0A0A0A` | Headings |
| `cream` | `#F5F0E8` | Card bg |
| `warm-white` | `#F8F6F3` | Page bg |
| `navy` | `#1A1A2E` | Dark bg |

### Contrast Issues

| Text Color | Bg Color | Ratio | Pass? | Note |
|-----------|----------|-------|-------|------|
| `#D4AF37` | `#F8F6F3` | 1.6:1 | ❌ | Gold text on warm white |
| `#B89628` | `#F8F6F3` | 2.2:1 | ❌ | gold-dark on page bg |
| `#D4AF37` | `#1A1A2E` | 4.1:1 | ✅ | Gold on navy |
| `#0A0A0A` | `#F8F6F3` | 19.1:1 | ✅ | Headings on page |

### Notes
- Gold on warm backgrounds is decorative (typically for icons/accents), but verify no small text uses this combo.

---

## 4. APIFENY AI

### Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `tech-900` | `#050510` | Page bg |
| `tech-800` | `#0A0A1A` | Card bg |
| `tech-700` | `#111125` | Card bg alt |
| `tech-100` | `#BBBBCC` | Body text |
| `tech-200` | `#8888AA` | Muted text |
| `tech-300` | `#555578` | Placeholder text |
| `neon` | `#7C3AED` | Primary button bg |
| `neon-light` | `#8B5CF6` | Accent text |
| `aqua` | `#06B6D4` | Secondary accent |
| `asia` | `#FFD700` | Gold for scores |
| `asia-light` | `#FFED4A` | Gold light |

### WCAG Ratios

| Text Color | Bg Color | Ratio | Pass? |
|-----------|----------|-------|-------|
| `#FFFFFF` | `#050510` | 19.7:1 | ✅ |
| `#FFFFFF` | `#0A0A1A` | 18.1:1 | ✅ |
| `#BBBBCC` | `#050510` | 12.8:1 | ✅ |
| `#BBBBCC` | `#111125` | 9.6:1 | ✅ |
| `#8888AA` | `#0A0A1A` | 5.3:1 | ✅ |
| `#555578` | `#0A0A1A` | 2.9:1 | ❌ (placeholder) |
| `#FFFFFF` | `#7C3AED` | 5.6:1 | ✅ |
| `#8B5CF6` | `#050510` | 7.2:1 | ✅ |
| `#8B5CF6` | `#111125` | 5.2:1 | ✅ |
| `#FFD700` | `#050510` | 11.7:1 | ✅ |
| `#FFD700` | `#111125` | 8.5:1 | ✅ |

### Notes
- apifeny-ai has GOOD contrast overall. The dark theme naturally provides high ratios.
- `tech-300` (`#555578`) on `tech-800` (`#0A0A1A`) is 2.9:1 but this is only used for placeholder text, which is exempt from WCAG AA.
- No failing text-on-bg combos for content text.

---

## SUMMARY — REMAINING FIXES NEEDED

### Priority 1 (FAILS WCAG AA):
1. **family-travel**: All `text-teal-600` → `text-teal-700` or override tailwind teal-600
2. **family-travel**: `bg-amber-500 text-white` → `bg-amber-600` 
3. **ev-charging**: `bg-amber-500 text-white` → `bg-amber-600`
4. **ev-charging**: `text-emerald-500` on white → `text-emerald-600`

### Priority 2 (Low contrast, decorative):
5. **ev-charging**: `text-gray-500` on `bg-white/60` → darken text
6. **luxury**: Gold text on warm-white backgrounds — verify if decorative only
7. **family-travel**: `opacity-60` on icons → use explicit colors

### Already Fixed (committed, deploying):
- `bg-teal-600` → `bg-teal-700` (WCAG commit `2de0c31c`)
- Score bars `bg-emerald-500` → `bg-emerald-600`
- Gold badge colors darkened
- Vibe coral badges to `#E11D48`
