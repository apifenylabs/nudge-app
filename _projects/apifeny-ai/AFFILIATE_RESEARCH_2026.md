# AI Tool Affiliate Research — June 2026

> **Pre-work for CEO**: Commission rates, networks, and strategy recommendations for AI Directory monetization.
> No env vars needed — this is reference material for when CEO unblocks.

---

## Market Overview

AI tool affiliate marketing in 2026 offers **20-40% recurring commissions** as the standard range.
Top programs pay **30-50% recurring for 12+ months**. The AI tools space is the fastest-growing 
affiliate vertical, with monthly subscription revenue generating compounding returns.

---

## Top 6 Priority Programs (by Revenue Potential)

| Rank | Tool | Commission | Network | Env Var | Why Priority |
|------|------|-----------|---------|---------|-------------|
| 1 | **Notion** | 50% recurring × 12mo | PartnerStack | `NEXT_PUBLIC_AFFILIATE_NOTION` | Highest volume potential + brand sells itself |
| 2 | **Semrush** | $200-450 flat per sale | Direct | `NEXT_PUBLIC_AFFILIATE_SEMRUSH` | Highest per-conversion value, 120-day cookie |
| 3 | **Writesonic** | 30% lifetime recurring | Direct | `NEXT_PUBLIC_AFFILIATE_WRITESONIC` | No time cap = compound growth |
| 4 | **Synthesia** | Up to 30% recurring | Direct | `NEXT_PUBLIC_AFFILIATE_SYNTHESIA` | 90-day cookie (longest), growing market |
| 5 | **Copy.ai** | 45% first year | Impact | `NEXT_PUBLIC_AFFILIATE_COPYAI` | Highest first-year rate |
| 6 | **Jasper** | 25-30% recurring | PartnerStack | `NEXT_PUBLIC_AFFILIATE_JASPER` | Strong audience overlap with SEO content |

## AI Directory — Ready Affiliate Slots

The AI Directory has **18 tools already wired** with `is_direct: true` in `lib/affiliate-links.ts`.
Once CEO sets the corresponding env vars, all 18 immediately start earning commissions.

Estimated placements across 189 blog posts + 80 country pages + category pages:
- ~4 affiliate link slots per page (sidebar, in-content CTA, comparison table, footer)
- Most pages mention ChatGPT, Claude, Gemini, DeepSeek as references (these have no affiliate programs)
- Paid tools with affiliate programs (Notion, Jasper, Writesonic, Synthesia, etc.) appear on ~30-40% of pages
- Total potential placements: ~300-400 affiliate links across the site

## Batch Insert Strategy (Script Ready)

A script to batch-insert affiliate CTAs into existing posts can be written once CEO:
1. Chooses which networks to join
2. Gets affiliate IDs and sets env vars
3. Picks launch priority (start with Notion + Semrush for fastest revenue)

**Script approach**: Parse existing blog posts by category → match affiliate tool slugs → insert disclosure-compliant CTA buttons + contextual links.

## New Networks Worth Joining (2026 Update)

1. **Dub.co** — Modern affiliate platform. Powers Perplexity, Framer, Vercel programs. 
   Has its own affiliate program at 30% recurring × 12mo.
   If CEO wants to promote AI tools outside the top 16, check Dub's partner marketplace.

2. **PartnerStack** — Already in use for Notion + Jasper. Additional programs available:
   Freshbooks, HubSpot, many B2B SaaS tools at 20-40% recurring.

3. **Impact** — Already listed for Copy.ai. Additional high-quality SaaS programs available.

## Quick-Start Recommendation

If CEO sets **just 2 env vars** for maximum ROI:
1. `NEXT_PUBLIC_AFFILIATE_NOTION` → 50% recurring × 12mo (highest volume)
2. `NEXT_PUBLIC_AFFILIATE_SEMRUSH` → $200-450 flat per sale (highest per-conversion)

Estimated MRR at launch: $50-200/month passively, scaling to $500-2,000/month within 3 months 
as content ages and search traffic compounds.

---

*Prepared: 2026-06-10 17:53 HKT — Captain Alpha research*
