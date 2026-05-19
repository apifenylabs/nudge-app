# Deployment Sign-Off Matrix

## Why

Every deploy to production must pass mandatory checks before CEO sign-off. No exceptions.

## Gate 1: UI/UX QA Agent

_Runs automated + visual checks before any deploy_

| Check | What it tests | Fail if |
|-------|--------------|---------|
| **Contrast** | Text-color vs background-color contrast ratio | < 4.5:1 for normal text, < 3:1 for large text |
| **Invisible text** | `text-gray-400/500` on white/light bg, `text-white` on light bg | Any occurrence without dark gradient/overlay |
| **Font size** | `text-[10px]` or smaller | Any text under 11px that's also low-contrast |
| **Overlapping text** | White text on hero images without dark overlay | Missing `bg-gradient-to-t from-gray-900/XX` on hero sections |
| **Broken layout** | Overflow, clipped text, z-index collisions | Detectable in 1024px+ viewports |
| **Mobile tap targets** | Links/buttons < 44px | Missing min-h-[44px] on interactive elements |

**Output**: QA report with PASS/FAIL per check, screenshot references if available.

## Gate 2: Content QA Agent

| Check | What it tests | Fail if |
|-------|--------------|---------|
| **Empty states** | "No results", "Coming soon" placeholders | White text on white background |
| **Broken links** | Internal links resolve | 404 or redirect loop |
| **Affiliate labels** | Sponsored/affiliate tags visible | Missing or invisible |
| **Missing images** | Broken image src | Image loads as broken |
| **Form validation** | Input error states | Error text invisible or misaligned |

## Gate 3: Technical QA Agent

| Check | What it tests | Fail if |
|-------|--------------|---------|
| **Build passes** | `next build` exits 0 | Build error or warning in prod mode |
| **Bundle size** | JS/CSS size per page | > 300KB uncompressed |
| **Console errors** | Browser console on page load | Any error (not warnings) |
| **SEO meta** | Title, description, canonical | Missing or duplicate |
| **Status codes** | All pages return 200 | 404/500 on expected routes |

## Gate 4: CEO Sign-Off

_Required each time before merging to production_

☐ QA report reviewed (Gates 1-3 all green)
☐ Visual smoke test done on live preview URL
☐ No new UI bugs introduced by this change
☐ Change description logged

**Sign-off**: `Signed: [CEO name] — [date]`

---

## Automation

The QA check script runs across all 6 sites before deploy:

```bash
# Run full QA on a project
bash _projects/qa-check.sh _projects/family-travel-directory

# Only proceed to deploy if exit code is 0
```

Current checks implemented in `_projects/qa-check.sh`:
1. `text-white` on light backgrounds (missing dark overlay)
2. `text-gray-400/500` (too light on white bg)
3. Brand-specific color correctness (e.g., no green on purple sites)
4. Cross-site link color consistency
5. Affiliate pixel presence

---

## Site Owners & Color Schemes

| Site | Primary Color | Hex | Text Contrast Baseline |
|------|--------------|-----|----------------------|
| Apifeny AI | Sky blue | #0284C7 | text-gray-700 min |
| Family Travel Asia | Purple | #7C3AED | text-gray-700 min |
| Luxury Travel Asia | Gold | #D4AF37 | text-gray-700 min |
| EV Charging Asia | Teal | #0F766E | text-gray-700 min |
| Senior Friendly Travel | Soft blue | #3B82F6 | text-gray-700 min |
| Kids Activities Asia | Coral | #F97316 | text-gray-700 min |
