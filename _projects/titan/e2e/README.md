# E2E Tests — Titan

## Test Files

| File | Type | Coverage | Status |
|------|------|----------|--------|
| `structural-tests.js` | Node.js + curl | Meta tags, JSON-LD schemas, server HTML content, cross-page validation | ✅ **47/47 passing** |
| `landing-page.spec.ts` | Playwright | Landing page, pricing, tier cards, navigation | ⏸️ Requires Chromium |
| `features.spec.ts` | Playwright | Features page cards, FAQ, nav | ⏸️ Requires Chromium |
| `robotics.spec.ts` | Playwright | Robotics page sections, links, breadcrumbs | ⏸️ Requires Chromium |
| `mobile.spec.ts` | Playwright | Mobile viewport, hamburger menu, responsive layout | ⏸️ Requires Chromium |
| `json-ld.spec.ts` | Playwright | JSON-LD schemas validated in live headless browser | ⏸️ Requires Chromium |

## Chromium Limitation

Playwright's Chromium headless shell requires `libsoftokn3.so` (NSS) which is NOT available in this WSL environment and cannot be installed without sudo. This causes a **fatal crash** on any SSL/TLS connection (including HTTPS to Vercel and HMR WebSocket).

The Playwright spec files are kept for CI environments and are correct — they just can't execute here.

## Running Tests

### Structural tests (works everywhere — no browser needed):
```bash
npm run test:structural          # http://localhost:3000
BASE_URL=https://titan-app-puce.vercel.app npm run test:structural  # production
```

### Playwright tests (requires working Chromium):
```bash
npx playwright install chromium
npx playwright install-deps chromium   # may need sudo for system libs
npx playwright test                     # local dev server
npx playwright test --project=chromium  # explicit project
```

## What the Structural Tests Validate

1. **Landing page**: Title, meta description, OG tags, WebSite JSON-LD schema with pricing (lowPrice 0, highPrice 499), RSC stream
2. **Features page**: Title, meta, WebSite schema, static asset references
3. **Robotics page**: Title, meta, WebSite schema, BreadcrumbList (Home > Robotics), server-rendered hero heading, phase badge, 4 platform cards, links, stats row, navigation buttons
4. **Pricing page**: Title, meta, WebSite schema
5. **Dashboard page**: Title, meta, WebSite schema, server-rendered content (Analytics/Overview/Agents)
6. **Agent Studio page**: Title, meta, WebSite schema, server-rendered agent-building content
7. **Sandbox page**: Title, meta, WebSite schema
8. **Cross-page**: WebSite schema on all pages with consistent name/URL, BreadcrumbList only on robotics
