# SEO Audit Report — Asia Family Travel Directory

**Date:** 2026-04-23
**Auditor:** SEO/Meta Agent (subagent)

---

## 1. `layout.tsx` — Title & Description ✅ (Good, with minor gaps)

**Title:**
```
default: "Asia Family Travel Directory | Kid-Safe Destinations Curated by Parents"
template: "%s | Asia Family Travel Directory"
```
✅ Well-structured. Uses Next.js template pattern for page-specific titles.
✅ Contains "Asia Family Travel Directory" — strong branded keyword.
✅ Mentions "kid-safe" and "parents" — matches target audience.

**Description:**
```
"The most beautiful directory of family-friendly travel destinations across Asia.
Every place is safety-rated, kid-tested, and curated by parents who've been there."
```
✅ Mentions key value props: safety-rated, kid-tested, curated by parents.
✅ 160 chars — perfect length for SERP snippets.
✅ "Across Asia" is good but vague.

**OpenGraph:**
✅ `siteName: "Asia Family Travel Directory"` — consistent branding.
✅ OG image included (1200×630, proper dimensions).
✅ Twitter card with `summary_large_image`.

**Issues:**
| # | Issue | Severity |
|---|-------|----------|
| 1 | **No canonical URL** set in metadata. Should add `alternates: { canonical: BASE_URL }`. | Medium |
| 2 | **No individual city descriptions** in layout — this is fine (per-page metadata should override via template), but check that `/city/tokyo` etc. actually set their own title/description. Currently there are **no city page files** in the router — all logic is in a single `page.tsx` SPA (client-side). So city-specific metadata won't be injected server-side. | **High** |
| 3 | **Google Search Console verification is empty:** `google: ""`. Need to add the verification string. | Medium |
| 4 | No `theme-color` meta tag. Nice-to-have for mobile browsers. | Low |

---

## 2. `sitemap.ts` — Coverage Analysis 🔴 (Missing dynamic content)

**Current city slugs in sitemap:**
- tokyo, osaka, singapore, bangkok, nara, hong-kong, bali

**Actual cities in `destinations.json`:**
- Tokyo, Bangkok, Singapore — only 3 of 7 listed cities have data.

**Problems:**

| # | Issue | Severity |
|---|-------|----------|
| 1 | **Destination detail pages not in sitemap.** There's no per-destination URL in the sitemap (e.g., `/destination/tokyo-disneyland` or `/city/tokyo/tokyo-disneyland`). The 10 individual attraction listings are invisible to crawlers as distinct URLs. | **Critical** |
| 2 | **4 phantom city entries:** osaka, nara, hong-kong, bali are hardcoded in sitemap but have zero destinations in `destinations.json`. These will 404 or show empty pages — wasting crawl budget and looking unfinished to Google. | **High** |
| 3 | **No dynamic/auto-generated sitemap.** Cities are hardcoded. When new cities get added to `destinations.json`, they won't appear in sitemap unless the TS source is manually updated. Should read from `destinations.json` dynamically. | **High** |
| 4 | **No category detail pages exist.** Sitemap declares `/category/theme-parks`, `/category/zoos`, etc., but there are no route handlers for those paths. These will all 404. | **High** |
| 5 | **Missing `/destination/` or `/attraction/` layer.** The 10 destinations have individual pages accessed via client-side filtering only (single-page app). No server-rendered detail pages means no indexed attraction pages. | **Critical** |
| 6 | Sitemap uses `'weekly'` / `'daily'` which is reasonable. No `lastModified` on individual entries beyond `new Date()` — acceptable. | Low |

**Recommendation:** Either add dynamic routes (`app/city/[slug]/page.tsx` and `app/destination/[id]/page.tsx`) or make the sitemap read from `destinations.json` at build time and generate per-destination entries. Without this, **only the homepage will be indexed**.

---

## 3. `robots.ts` — Correct for Production ✅

```
rules: {
  userAgent: '*',
  allow: '/',
  disallow: ['/api/', '/_next/'],
},
sitemap: 'https://family-travel-directory.vercel.app/sitemap.xml',
```

✅ Allows all crawlers everywhere except internal API and Next.js build assets.
✅ Points to correct sitemap URL.
✅ Blocks `/_next/` (static chunks, unnecessary to index).
✅ Blocks `/api/` (no reason to expose API endpoints).
✅ `robots` tag in layout also confirms `index: true, follow: true`.

**Minor note:** Blocking `/_next/` is standard. No issues here.

---

## 4. `vercel.json` — Region Settings for Asia 🌏✅

```
"regions": ["hkg1"],
```

✅ **hkg1** (Hong Kong) is the optimal single region for Asia-Pacific serving:
- Hong Kong, Singapore, Southeast Asia → ~5-15ms latency
- Japan, Korea → ~40-60ms latency
- Australia, India → ~80-120ms latency
- Europe/US → ~150-250ms (acceptable for SEO; Googlebot doesn't penalize)

**Alternative if budget allows:** `["hkg1", "sin1"]` (Hong Kong + Singapore) for redundancy and sub-50ms latency across all of SEA. But for minimal cost, hkg1 alone is excellent.

✅ `framework: "nextjs"` — correct auto-detection.
✅ `buildCommand`, `devCommand`, `installCommand` — reasonable.
⚠️ No `headers` or `redirects` configured for caching or SEO redirects (e.g., trailing slash, www → non-www).

---

## 5. Structural SEO Issues (Summary)

### Critical / Must Fix
| Issue | Why |
|-------|-----|
| **Single-page app architecture** | All 10 destinations load via client-side filtering. No server-rendered `/city/` or `/destination/` routes. Google can index the homepage but **cannot reach individual attraction pages** without JavaScript rendering — and Google's JS indexing is unreliable. |
| **No dynamic route files** | `app/city/[slug]/page.tsx` and `app/destination/[slug]/page.tsx` do not exist. The sitemap points to URLs that don't exist as server routes. |
| **Sitemap has phantom cities & categories** | 4 of 7 cities + all 6 categories will 404 — wasting crawl budget and hurting domain authority. |

### High Priority
| Issue | Why |
|-------|-----|
| Add dynamic sitemap generation from `destinations.json` | Avoids manual updates when cities/attractions grow. |
| Add canonical URL to layout metadata | Prevents duplicate content issues. |
| Fill in Google Search Console verification | Required for SEO monitoring. |

### Medium / Nice-to-Have
| Issue | Why |
|-------|-----|
| Add `theme-color` meta tag | Mobile browser chrome branding. |
| Add `alternates: { canonical }` | Proper canonicalization. |

---

## 6. Quick Wins (💡 Can Implement in < 1 Hour)

1. **Remove phantom cities** (osaka, nara, hong-kong, bali) from sitemap.ts until they have actual data.
2. **Remove ALL category entries** from sitemap.ts until `/category/` routes exist.
3. **Add Google Search Console verification** string to layout.tsx.
4. **Add canonical URL** to layout.tsx metadata.
5. **Add `theme-color` meta tag** via a `<Head>` or metadata `other` field.

---

## 7. Recommended Priority Roadmap

```
P0 (This week):    Add dynamic route files — app/city/[slug]/page.tsx + app/destination/[slug]/page.tsx
                   → This unlocks individual indexable pages for every attraction

P1 (This week):    Rewrite sitemap.ts to read from destinations.json dynamically
                   → Auto-generates entries for every city + every destination

P2 (Next week):    Add per-page metadata (title, description, OG) to city + destination pages
                   → Each page gets unique <title> and <meta> tags for SERP ranking

P3 (Backlog):      Add canonical URL, Google Search Console verification, headers in vercel.json
```

---

*Report prepared by SEO/Meta Agent. No files were modified.*
