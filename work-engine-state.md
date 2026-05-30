# Work Engine State

Last updated: 2026-05-30 11:28 HKT

## Cursor
✅ **P5 AI Directory — Canonical URL domain sweep COMPLETE** (DONE)
   - Swept all 13 geo-page layouts + root layout + ~65 page files: replaced dead `apifeny.ai` with `https://apifeny-ai.vercel.app`
   - Fixed root `app/layout.tsx`: BASE_URL, metadataBase, JSON-LD Organization url, WebSite url, SearchAction urlTemplate
   - Fixed all non-root layouts: `app/collections/layout.tsx`, `app/ai-tools-{taiwan,bangladesh,singapore,nepal,india,sri-lanka}/layout.tsx`, `app/playbooks/layout.tsx`, `app/best-ai-{coding,marketing,writing,tools}/layout.tsx`, `app/tools/layout.tsx`
   - Fixed ~60 page files with `BASE_URL = 'https://apifeny.ai'` → corrected to `.vercel.app`
   - Left intentional: `privacy@apifeny.ai` / `legal@apifeny.ai` emails (brand, not URLs)
   - Built ✅ → Deployed to production ✅
   - Verified: sitemap.xml now uses correct working domain; JSON-LD present on root page

## Confirmed Completed (Previous Sessions)
- FAQ JSON-LD on 88/95 playbook pages — done
- BlogLandingLinks component — cross-links from 32 blog posts — done
- Dashboard loading skeleton — done
- Changelog page with 7 version entries — done
- Agent Activity Feed — done
- BreadcrumbList JSON-LD — done
- /features page — done
- /changelog page — done
- Onboarding wizard integrated into /dashboard — done
- XP bar with level-up toast animation on dashboard header — done
- Progression page with milestones, XP breakdown, God-Tier preview, achievements grid — done
- XPBar component with shimmer, sparkle, and level-up detection — done
- All 18 LifeOS categories (incl. Spirituality OS, Hobbies OS) — done
- LifeOS analytics + recommendations engine — done
- LifeOS cross-plugin synergies (18 pairs, 6 clusters, XP multipliers) — done
- LifeOS cross-plugin suggestion cards in plugin detail view — done
- AI Directory canonical link auto-injection (SeoMetadata extension) — done
- AI Directory blog internal linking — 100% coverage — done
- Blog detail pages (`/blog/[slug]`) with full article rendering, engagement features, related articles — done
- BlogLandingLinks component — cross-links from all 32 blog posts to strategic landing pages — done
- P4 Titan dead imports, loading/error boundaries, middleware demo bypass — done
- AI Directory homepage "Explore More AI Resources" section with 8 internal links — done
- P4 Titan sitemap + SoftwareApplication JSON-LD — done
- P4 Titan Blog RSS feed + OpenGraph metadata — done
- AI Directory canonical URL domain sweep (all layouts + pages) — DONE

## Backlog (Ready When CEO Unblocks)

### P0 REVENUE — Affiliate Infrastructure
When CEO provides API keys (Booking.com, Klook, Viator, Expedia):
- Integrate Skyscanner/Booking.com affiliate API for EV Charging Asia + Luxury Travel
- Build commission tracking dashboard in affiliate-tracking project
- Implement deep-link redirect middleware
- Add affiliate product feeds to travel sites

### P1 REVENUE — Stripe & Monetization
When CEO provides Supabase SQL / Stripe keys:
- Port Stripe checkout from Nudge to Titan
- Create Supabase `checkout_sessions` table + webhook handler
- Add paid-tier verification middleware to Titan /dashboard
- Implement coupon/subscription management UI
- Add Stripe checkout to Apifeny AI playbooks

### P3 STRATEGIC — LifeOS Supabase Migration
When CEO runs migration SQL in Supabase dashboard:
- Guide at `titan-app/supabase/_SETUP.md` — SQL is ready
- Connect `chat-persistence.ts` to Supabase instead of localStorage
- Implement RLS policies for user data isolation
- Enable `plugin_sessions` table for cross-device chat history
- Activate remaining 5 beta plugins (Learning, Family, Home, Social, Relationships + Mindfulness)
- User auth: connect AuthModal to real Supabase auth

### P5 STRATEGIC — AI Directory SEO (Next Actions)
- SEO audit item: Add `lastmod` dates to all sitemap entries (partially done — blog posts now have dates)
- When DNS fixed + custom domain restored: revert BASE_URL back to custom domain
- Next AI Directory task: content gap analysis for missing countries/categories

## Blocked Items (CEO Action Needed)
1. **P0: Affiliate partner API keys** (Booking.com, Klook, Viator, Expedia) — blocks all revenue work
2. **P1: Stripe checkout SQL for Supabase** — blocks Titan payment integration
3. **P3: Run LifeOS migration SQL** in Supabase dashboard — SQL script ready at `titan-app/supabase/_SETUP.md`
4. **Git PAT token** (expired) for ev-charging-asia push
5. **🔴 NEW: Domain renewal needed** — both `apifeny.ai` and `apifeny-ai.com` are NXDOMAIN. CEO needs to check registrar.
