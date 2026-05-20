# Affiliate Setup Guide — Apifeny AI

> **Goal**: activate affiliate commissions on 60+ AI tool pages.  
> **Status**: all affiliate link entries exist but use plain (non-tracked) URLs. Setting one env var immediately starts earning commissions for that tool.  
> **To enable**: join any program below and set the matching `NEXT_PUBLIC_AFFILIATE_*` env variable.

---

## Quick Start

```bash
# 1. Copy the template
cp .env.example .env.local

# 2. Fill in your affiliate IDs (see sections below for each program)
# 3. For production: set vars in Vercel Project Settings → Environment Variables
```

Then restart the dev server:
```bash
next dev
```

---

## How It Works

The site uses a two-tier affiliate system:

1. **Server-side redirect** (`/api/redirect?tool={slug}`): checks env vars, builds the correct affiliate URL, then 302-redirects the user. The env var contains your personal affiliate ID.

2. **Static `referral_url`** (in `lib/affiliate-links.ts`): fallback plain URLs used when no env var is set. These are the default deep links you see now.

**Until you set a `NEXT_PUBLIC_AFFILIATE_*` var**, the button links go to the tool's homepage (no commission). Once you set it, the same buttons automatically start sending users through your affiliate link.

---

## AI Tool Affiliate Programs (Commission-Based)

| Tool | Commission | Cookie | Payout | Env Var |
|---|---|---|---|---|
| [Notion AI](#1-notion-ai) | 50% recurring for 12 months | 30-180 days | NET30 via PartnerStack | `NEXT_PUBLIC_AFFILIATE_NOTION` |
| [Jasper AI](#2-jasper-ai) | 25-30% recurring | 45 days | NET30 via PartnerStack | `NEXT_PUBLIC_AFFILIATE_JASPER` |
| [Copy.ai](#3-copyai) | 45% first year | 30 days | NET30 via Impact | `NEXT_PUBLIC_AFFILIATE_COPYAI` |
| [Writesonic](#4-writesonic) | 30% lifetime recurring | Program-managed | Monthly via PayPal | `NEXT_PUBLIC_AFFILIATE_WRITESONIC` |
| [Canva](#5-canva) | Flat fee per conversion | 30 days | NET30 | `NEXT_PUBLIC_AFFILIATE_CANVA` |
| [Synthesia](#6-synthesia) | Up to 30% recurring | 90 days | NET30 | `NEXT_PUBLIC_AFFILIATE_SYNTHESIA` |
| [HeyGen](#7-heygen) | Flat or recurring | 30 days | Monthly | `NEXT_PUBLIC_AFFILIATE_HEYGEN` |
| [Runway](#8-runway) | 20% recurring | 30 days | Monthly | `NEXT_PUBLIC_AFFILIATE_RUNWAY` |
| [Descript](#9-descript) | 20% recurring | 30 days | Monthly | `NEXT_PUBLIC_AFFILIATE_DESCRIPT` |
| [ElevenLabs](#10-elevenlabs) | 20% recurring | 30 days | Monthly | `NEXT_PUBLIC_AFFILIATE_ELEVENLABS` |
| [Murf AI](#11-murf-ai) | 20% recurring for 24 months | 30 days | Monthly | `NEXT_PUBLIC_AFFILIATE_MURF` |
| [Make.com](#12-makecom) | 20% recurring | 30 days | NET30 | `NEXT_PUBLIC_AFFILIATE_MAKE` |
| [SurferSEO](#13-surferseo) | 25% recurring | 30 days | Monthly | `NEXT_PUBLIC_AFFILIATE_SURFERSEO` |
| [Semrush](#14-semrush) | $200-450 flat per sale | 120 days | NET30 | `NEXT_PUBLIC_AFFILIATE_SEMRUSH` |
| [Zapier](#15-zapier) | 20-25% recurring | 30 days | Monthly | `NEXT_PUBLIC_AFFILIATE_ZAPIER` |
| [Intercom](#16-intercom) | Varies (partner program) | N/A | NET60 | `NEXT_PUBLIC_AFFILIATE_INTERCOM` |

---

## Detailed Sign-Up Guides (16 AI Programs)

### 1. Notion AI

| Item | Detail |
|---|---|
| Program | [Notion Affiliate Program](https://www.notion.so/affiliates) |
| Sign-up | Apply on Notion's affiliate page → approved via PartnerStack |
| Approval | 1-3 business days (Notion is selective) |
| Commission | 50% recurring for the first 12 months of each referral's subscription |
| Cookie | 30 days (some networks: up to 180 days) |
| Payout | NET30, paid via PartnerStack |
| Env var | `NEXT_PUBLIC_AFFILIATE_NOTION` |
| Value | Your PartnerStack referral code (looks like a short alphanumeric string) |

**URL format**: `https://affiliate.notion.so/6m1l49i1a0ct` (get your personalized link from the dashboard)

---

### 2. Jasper AI

| Item | Detail |
|---|---|
| Program | [Jasper Affiliate Program](https://jasper.ai/affiliates) |
| Sign-up | Apply on Jasper's site → managed via PartnerStack |
| Approval | Usually 1-2 business days |
| Commission | 25% recurring standard; bumps to 30% at 100 leads + 100 customers in 12 months |
| Cookie | 45 days |
| Payout | NET30, paid via PartnerStack |
| Env var | `NEXT_PUBLIC_AFFILIATE_JASPER` |
| Value | Your PartnerStack `fpr` parameter value |

**URL format**: `https://jasper.ai/free-trial?fpr={your-code}`

---

### 3. Copy.ai

| Item | Detail |
|---|---|
| Program | [Copy.ai Affiliate Program](https://www.copy.ai/affiliates) |
| Sign-up | Apply on Copy.ai's site → managed via Impact |
| Approval | Usually instant |
| Commission | 45% on first year of subscription |
| Cookie | 30 days |
| Payout | NET30, paid via Impact |
| Env var | `NEXT_PUBLIC_AFFILIATE_COPYAI` |
| Value | Your Impact `via` parameter value |

**URL format**: `https://www.copy.ai?via={your-code}`

---

### 4. Writesonic

| Item | Detail |
|---|---|
| Program | [Writesonic Affiliate Program](https://writesonic.com/affiliates) |
| Sign-up | Apply on Writesonic's website |
| Approval | Usually instant |
| Commission | 30% lifetime recurring (no time cap) |
| Cookie | Program-managed |
| Payout | Monthly via PayPal |
| Env var | `NEXT_PUBLIC_AFFILIATE_WRITESONIC` |
| Value | Your referral `via` value |

**URL format**: `https://writesonic.com?via={your-code}`

---

### 5. Canva

| Item | Detail |
|---|---|
| Program | [Canva Affiliate Program](https://www.canva.com/affiliates) |
| Sign-up | Apply on Canva's website |
| Approval | Usually instant |
| Commission | Flat fee per converted free-to-paid signup |
| Cookie | 30 days |
| Payout | NET30 |
| Env var | `NEXT_PUBLIC_AFFILIATE_CANVA` |
| Value | Your Canva affiliate ID (the `ir` parameter value) |

**URL format**: `https://www.canva.com/join/{your-code}` or `...?ir={your-id}`

---

### 6. Synthesia

| Item | Detail |
|---|---|
| Program | [Synthesia Affiliate Program](https://www.synthesia.io/affiliates) |
| Sign-up | Apply via Synthesia's website |
| Approval | Usually 1-3 business days |
| Commission | Up to 30% recurring on subscription |
| Cookie | 90 days |
| Payout | NET30 |
| Env var | `NEXT_PUBLIC_AFFILIATE_SYNTHESIA` |
| Value | Your referral `via` code |

**URL format**: `https://www.synthesia.io/?via={your-code}`

---

### 7. HeyGen

| Item | Detail |
|---|---|
| Program | [HeyGen Affiliate Program](https://www.heygen.com/affiliates) |
| Sign-up | Apply on HeyGen's website |
| Approval | Usually within a week |
| Commission | Flat fee per signup OR recurring (agreement-based) |
| Cookie | 30 days |
| Payout | Monthly |
| Env var | `NEXT_PUBLIC_AFFILIATE_HEYGEN` |
| Value | Your `sid` parameter value |

**URL format**: `https://heygen.com/?sid={your-code}`

---

### 8. Runway

| Item | Detail |
|---|---|
| Program | [Runway Affiliate Program](https://runwayml.com/affiliates) |
| Sign-up | Apply on Runway's website |
| Approval | Usually within a week |
| Commission | 20% recurring on subscription |
| Cookie | 30 days |
| Payout | Monthly |
| Env var | `NEXT_PUBLIC_AFFILIATE_RUNWAY` |
| Value | Your referral `via` value |

**URL format**: `https://runwayml.com/?via={your-code}`

---

### 9. Descript

| Item | Detail |
|---|---|
| Program | [Descript Affiliate Program](https://www.descript.com/affiliates) |
| Sign-up | Apply on Descript's website |
| Approval | Usually within a week |
| Commission | 20% recurring on subscription |
| Cookie | 30 days |
| Payout | Monthly |
| Env var | `NEXT_PUBLIC_AFFILIATE_DESCRIPT` |
| Value | Your `lmref` parameter value |

**URL format**: `https://www.descript.com/?lmref={your-code}`

---

### 10. ElevenLabs

| Item | Detail |
|---|---|
| Program | [ElevenLabs Affiliate Program](https://elevenlabs.io/affiliates) |
| Sign-up | Apply on ElevenLabs' website |
| Approval | Usually within a week |
| Commission | 20% recurring on subscription |
| Cookie | 30 days |
| Payout | Monthly |
| Env var | `NEXT_PUBLIC_AFFILIATE_ELEVENLABS` |
| Value | Your referral `from` code |

**URL format**: `https://elevenlabs.io/?from={your-code}`

---

### 11. Murf AI

| Item | Detail |
|---|---|
| Program | [Murf AI Affiliate Program](https://murf.ai/affiliate-program) |
| Sign-up | Apply on Murf's website |
| Approval | Usually instant |
| Commission | 20% recurring for 24 months |
| Cookie | 30 days |
| Payout | Monthly |
| Env var | `NEXT_PUBLIC_AFFILIATE_MURF` |
| Value | Your referral `via` code |

**URL format**: `https://murf.ai/?via={your-code}`

---

### 12. Make.com

| Item | Detail |
|---|---|
| Program | [Make Affiliate Program](https://www.make.com/en/affiliates) |
| Sign-up | Apply on Make's website |
| Approval | Usually instant |
| Commission | 20% recurring on subscription |
| Cookie | 30 days |
| Payout | NET30 |
| Env var | `NEXT_PUBLIC_AFFILIATE_MAKE` |
| Value | Your `pc` (promo code) value |

**URL format**: `https://www.make.com/en/register?pc={your-code}`

---

### 13. SurferSEO

| Item | Detail |
|---|---|
| Program | [SurferSEO Affiliate Program](https://surferseo.com/affiliate-program) |
| Sign-up | Apply on Surfer's website |
| Approval | Usually instant |
| Commission | 25% recurring on subscription |
| Cookie | 30 days |
| Payout | Monthly |
| Env var | `NEXT_PUBLIC_AFFILIATE_SURFERSEO` |
| Value | Your referral `ref` value |

**URL format**: `https://surferseo.com/?ref={your-code}`

---

### 14. Semrush

| Item | Detail |
|---|---|
| Program | [Semrush Affiliate Program](https://www.semrush.com/affiliates/) |
| Sign-up | Apply on Semrush's website |
| Approval | 1-3 business days |
| Commission | $200 per sale (up to $450 at top tier), $10 per trial activation |
| Cookie | 120 days (longest on this list) |
| Payout | NET30 |
| Env var | `NEXT_PUBLIC_AFFILIATE_SEMRUSH` |
| Value | Your `ref` parameter value |

**URL format**: `https://www.semrush.com/sem/?ref={your-code}`

---

### 15. Zapier

| Item | Detail |
|---|---|
| Program | [Zapier Affiliate Program](https://zapier.com/affiliates) |
| Sign-up | Apply on Zapier's website |
| Approval | Usually within a week |
| Commission | 20-25% recurring on subscription |
| Cookie | 30 days |
| Payout | Monthly |
| Env var | `NEXT_PUBLIC_AFFILIATE_ZAPIER` |
| Value | Your `ref` value |

**URL format**: `https://zapier.com/?ref={your-code}`

---

### 16. Intercom

| Item | Detail |
|---|---|
| Program | [Intercom Partner Program](https://www.intercom.com/partners) |
| Sign-up | Apply on Intercom's website |
| Approval | 1-2 weeks (Intercom is selective) |
| Commission | Custom partner agreement (recurring on referrals) |
| Payout | NET60 |
| Env var | `NEXT_PUBLIC_AFFILIATE_INTERCOM` |
| Value | Your referral code |

**URL format**: `https://www.intercom.com/?ref={your-code}`

---

## Referral / Friend-Invite Programs (Bonus Tokens/Credits)

These don't pay commissions but offer referral bonuses (free credits, tokens) when a new user signs up via your link.

| Tool | Bonus | Env Var | How to Get Your Link |
|---|---|---|---|
| [Bolt.new](https://bolt.new) | 200K bonus tokens + 5M if friend upgrades | `NEXT_PUBLIC_REFERRAL_BOLT` | Bolt settings → Referrals |
| [Windsurf](https://windsurf.com) | 500 bonus flex credits per referral | `NEXT_PUBLIC_REFERRAL_WINDSURF` | Windsurf account → Referrals |
| [Replit](https://replit.com) | $10 per friend upgrade to Core | `NEXT_PUBLIC_REFERRAL_REPLIT` | Replit account → Referrals |

---

## Setting Vars in Vercel

1. Go to your project on [vercel.com](https://vercel.com)
2. **Settings** → **Environment Variables**
3. Add each `NEXT_PUBLIC_AFFILIATE_*` var
4. Set them for **Production**, **Preview**, and **Development**
5. Redeploy or push to your production branch

### Local development

```bash
# After filling in .env.local, run:
next dev
```

---

## How the Redirect Works

1. User clicks "Get Notion AI" button → goes to `/api/redirect?tool=notion-ai`
2. Server looks up the redirect config for `notion-ai`
3. Checks if `NEXT_PUBLIC_AFFILIATE_NOTION` is set
4. **If set**: builds the full affiliate URL with your ID → 302 redirect
5. **If not set**: redirects to the plain Notion signup page (no commission)

The affiliate-links registry (`lib/affiliate-links.ts`) uses `/api/redirect?tool={slug}` for all tools with affiliate programs. The plain homepage URLs you see now are the fallback — they become commission-earning links as soon as you set the env var.

---

## Top Commission Potential (Priority Order)

For maximum ROI on one afternoon of sign-ups:

1. **Notion** → 50% recurring for 12 months (highest volume, brand sells itself)
2. **Semrush** → $200-450 flat per sale (highest per-conversion value)
3. **Jasper** → 30% recurring (strong SEO content audience overlap)
4. **Writesonic** → 30% lifetime recurring (no time cap = compound growth)
5. **Synthesia** → Up to 30% with 90-day cookie
6. **Copy.ai** → 45% first year (highest first-year rate)

Tools with free tiers (ChatGPT, Claude, Gemini, DeepSeek, Grok) don't have affiliate programs — they're listed as free deep links. The real earning potential is in the paid SaaS tools above.

---

## Legal Compliance

✅ FTC affiliate disclosure is at the bottom of tool detail pages  
✅ `/api/redirect` route uses standard `302` redirect (no cloaking)  
✅ Affiliate buttons include `rel="sponsored"`  
✅ Commission disclosures are shown in tool detail CTA bars  

**Recommended**: add a dedicated `/affiliate-disclosure` page to link from footer.

---

## Monitoring & Optimization

- **Vercel Analytics**: logs redirect requests automatically  
- **Manual check**: set one env var, visit the tool page, click the CTA, and inspect the URL  
- **Priority**: start with the top 5 programs by commission potential above  

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| Links still go to plain URLs | Env var not set or misspelled | Check `NEXT_PUBLIC_` prefix and exact var name |
| Local dev not using new env | Need to restart dev server | Kill and re-run `next dev` |
| 404 on redirect route | Route not deployed | Push code, Vercel auto-deploys |
| Env vars not showing in preview build | Not set for Preview environment | Set in Vercel for both Production and Preview |
