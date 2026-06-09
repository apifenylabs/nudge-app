# AI Directory SEO Audit & Editorial Gap Analysis

**Date:** 2026-06-09 10:45 HKT  
**Project:** Apifeny AI Directory (apifeny-ai.vercel.app)  
**Auditor:** Subagent (strategic audit)

---

## SEO Audit Results

### Meta Description Health

| Metric | Value |
|--------|-------|
| **Total blog posts** | 174 (excl. index.json) |
| **Posts with meta descriptions** | 174 (100%) |
| **Posts with weak meta (<120 chars)** | **0** |
| **Average meta length** | ~220-280 chars |

**Finding: All 174 posts have valid meta descriptions ≥120 characters.**

The site uses a **dynamic [slug] route** (`app/blog/[slug]/page.tsx`) that reads post data from `data/blog/*.json` and generates `Metadata` with `description: post.excerpt`. All JSON files contain a substantial excerpt field. No immediate SEO meta description fixes needed.

### How Meta Descriptions Render

- **Dynamic route** (`app/blog/[slug]/page.tsx`): ~154 posts — reads from JSON, generates Next.js `Metadata` with `description: post.excerpt`. Out-of-box correct.
- **Static page.tsx files**: ~20 posts have hardcoded `page.tsx` with `POST.excerpt` used as description — spot-checked all are ≥120 chars.
- **Full coverage**: OpenGraph and Twitter card descriptions also inherit the same excerpt.

### Checked Page Types

| Route Type | Count | Meta Source | Status |
|------------|-------|-------------|--------|
| `app/blog/[slug]/page.tsx` | ~154 | JSON `excerpt` field | ✅ |
| `app/blog/{slug}/page.tsx` (static) | ~20 | Hardcoded `POST.excerpt` | ✅ |

### Recommendations (not critical, but optimizable)

1. **Add `/blog` listing page meta** — the blog index (`app/blog/page.tsx`) should have a strong H1/meta description targeting "AI tools Asia blog" keywords
2. **Consider excerpt length cap** — some excerpts at 280+ chars are beyond Google's display length (~160 chars); trim to 150-160 chars for optimal SERP display
3. **Consolidate duplicate-style posts** — e.g., `ai-website-builders-small-business-2026` (May) and (Aug update) may compete for same keywords

---

## Next Editorial Gap

### Current Calendar: Last Scheduled Post

| Date | Post | Slug |
|------|------|------|
| **2026-08-18** | AI-Powered Data Analytics for Asian Businesses 2026: Tools, Dashboards, and Insights | `ai-data-analytics-asia-2026` |

### Gap After Aug 18

| Date Slot | Status |
|-----------|--------|
| 2026-08-19 | 🟢 **OPEN** — first slot after Aug 18 |
| 2026-08-20 | 🟢 OPEN |
| 2026-08-21 | 🟢 OPEN |
| ... | All open through rest of 2026 |

**First available slot: 2026-08-19** (Wednesday)

### Recent Calendar Pattern (Jul-Aug)

Dates have been spaced roughly every 2-5 days with single posts:
- Jul 23 → Aug 04 (12-day gap) → Aug 06 (2-day) → Aug 11 (5-day) → Aug 13 (2-day) → Aug 18 (5-day)

**Recommended cadence:** Maintain every 2-5 day schedule, starting **Aug 19**.

---

## Recommended Topics (Post-Aug 18 Gap)

### Uncovered Tool Categories

Based on trending AI tools in Asia that lack standalone coverage:

| Tool | Covered? | Existing posts |
|------|----------|----------------|
| Cursor | ✅ Yes | 3 posts (guide + comparisons) |
| Perplexity | ✅ Yes | 1 post (complete guide) |
| Claude Code | ⚠️ Partial | Covered in comparisons only |
| DeepSeek | ✅ Yes | 3 posts |
| **Bolt.new** | ❌ **No** | None whatsoever |
| **Windsurf** | ❌ **No** | None whatsoever |
| **Lovable** | ❌ **No** | None whatsoever |
| **Replit Agent** | ❌ **No** | None whatsoever |

### Top 3 Recommended Topics

#### 1. 🥇 **"Bolt.new vs Lovable vs Replit Agent: Best AI App Builder for Asian Startups 2026"**

**Rationale:**
- All three are major viral tools in 2026 — Bolt.new hit $100M+ ARR, Lovable grew even faster, Replit jumped from $10M to $100M ARR in 9 months
- Zero existing coverage on the site — total blue ocean
- Asian developers are disproportionately adopting no-code/vibecode tools due to cost sensitivity and the unfilled developer shortage
- High search volume for "bolt.new vs lovable" per the search data
- Angle: "Which tool actually works for Asian startup founders who can't code?"

**Target date:** Aug 19 (first slot)  
**Tags:** bolt-new, lovable, replit, ai-app-builder, vibe-coding, asian-startups, no-code  
**Suggested slug:** `bolt-new-vs-lovable-vs-replit-agent-asia-2026`

#### 2. 🥈 **"Windsurf IDE Complete Guide 2026: The AI Code Editor Challenging Cursor in Asia"**

**Rationale:**
- Windsurf (by Codeium) is the #2 AI IDE after Cursor globally, and actively investing in Asian language support
- Cursor has 3 posts already; Windsurf has zero — unbalanced coverage
- Asian developers face specific challenges (mixed CJK-English codebases, multiple encoding issues) that differ from Western developer experience
- Strong organic search opportunity: "windsurf vs cursor asian developers"

**Target date:** Aug 21  
**Tags:** windsurf, cursor-alternative, ai-code-editor, asian-developers, codeium  
**Suggested slug:** `windsurf-ide-complete-guide-asia-2026`

#### 3. 🥉 **"Replit Agent: Build Production Apps in Minutes Without Leaving Your Browser (2026 Asia Guide)"**

**Rationale:**
- Replit's Agent launch was transformative — $100M ARR in 9 months starting 2025
- Replit has strong adoption in Asia (India, Philippines, Indonesia, Vietnam) among self-taught devs and students
- Existing site has no content on Replit despite being one of the top 5 AI coding tools globally
- Complementary to topic #1 — could be a standalone deep-dive

**Target date:** Aug 24 (if topic #1 is Aug 19, #2 Aug 21)  
**Tags:** replit, replit-agent, ai-coding, asian-developers, in-browser-ide  
**Suggested slug:** `replit-agent-complete-guide-asia-2026`

---

## Summary of Actions

| Priority | Action | Timeline |
|----------|--------|----------|
| 🔴 High | Write **Bolt.new vs Lovable vs Replit Agent** comparison | Aug 19 |
| 🟡 Medium | Write **Windsurf IDE Complete Guide** | Aug 21 |
| 🟢 Normal | Write **Replit Agent standalone guide** | Aug 24 |
| 🟢 Normal | Consider re-trimming excerpts to 150-160 chars for SERP | Any time |
| 🔵 Info | Blog list page meta description | Low priority |
