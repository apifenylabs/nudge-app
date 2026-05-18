# OmniMind Distribution Strategy v1

## Situation

Product ready. GitHub live. Release tagged. Content drafted.

**Assets ($):**
- v0.3.0 with 24/24 tests passing, running in production
- MIT license — anyone can install, fork, embed
- Fully local (privacy angle is strong for 2026 market)
- 3-store architecture is differentiated (nobody else does this in OpenClaw ecosystem)

**Constraints:**
- Zero existing audience — no Twitter following, no blog traffic, no newsletter
- No budget for ads, sponsorships, or paid influencer outreach
- No team — single person doing all the work
- No distribution history — cold start on every platform

**Competitive landscape:**
- Supermemory (cloud API, paid) — the incumbent in OpenClaw memory space
- Mem0 (cloud API, $50/mo) — the broader alternative people will compare against
- Everyone else's AGENTS.md + MEMORY.md — the "free but doesn't scale" default

## Strategy: Indirection First, Direct Second

Most launch strategies fail because they try to go viral on day 1. With zero audience, you can't.

Instead: **build distribution foundations first, then launch into an audience that already knows the problem exists.**

### Phase 0: Foundation (This Week)
Goal: Create the conditions where a launch can succeed.

| Action | Why |
|--------|-----|
| Write and publish a comparison blog post: "Why I Replaced Supermemory with My Own Plugin" | SEO bait for "opencalw memory" search. Direct comparison = traffic from competitor searchers. |
| Publish on dev.to + Medium repost | Syndicates content, builds backlinks, captures long-tail discovery |
| Create OmniMind Twitter/X account | Start building a following BEFORE the launch thread goes out. Post 2-3x/week about agent memory problems. |
| Join r/selfhosted community and contribute | Build reputation before posting. Comment on 10 posts this week. |
| Submit to OpenClaw community plugins directory | Capture existing OpenClaw users looking for plugins (highest conversion potential) |

### Phase 1: Community Launch (Week 2)
Goal: Distributed launch across multiple Reddit communities, not a single PH spike.

**Reddit rollout (staggered, 3 days between each):**
1. **r/selfhosted** (Day 1) — "Self-hosted memory for AI agents? Built one that runs entirely on my server." Selfhosted audience LOVES local-first + privacy arguments. Highest engagement potential.
2. **r/openclaw** (Day 4) — Direct community. But less growth potential (smaller sub). Post as "I dogfooded this for 2 weeks and here's what I learned."
3. **r/AI_Agents** (Day 7) — Broader audience. Technical. Focus on architecture (3 stores, Memify).
4. **r/SideProject** (Day 10) — Build story angle. Less technical, more "how I built it."

**Rationale for staggered:** Reddit algorithm rewards posts from accounts with history. Spacing out posts builds profile depth. Also lets us adjust based on what worked in earlier posts.

### Phase 2: Social Amplification (Week 2-3)
Goal: Traffic from Phase 1 feeds into Twitter/X growth.

1. **Twitter/X launch thread** goes out WHEN Reddit posts start gaining traction (not before)
2. **Thread content** uses the winning angle from Reddit (whichever post performed best) as the hook
3. **Cross-post thread** to LinkedIn (longer form, less technical)
4. **Targeted engagement** — reply to relevant threads in #OpenClaw, #AI, #buildinpublic spaces. Don't self-promo, just add value with OmniMind link in bio

### Phase 3: Product Hunt (Week 3-4)
Goal: Launch PH AFTER community traction, not before.

PH launches fail when there's no warm audience. By week 3-4:
- Reddit posts have driven 500-2000 visits
- GitHub has 15-30 stars (from Reddit traffic)
- A few real users have installed and provided feedback
- Twitter account has 50-100 followers

**Then PH launch:**
- Self-hunt (no hunter needed for a free MIT tool)
- Launch on Tuesday or Wednesday
- Pre-warm maker followers on the account (~3 tweets this week)
- Maker comments prepared (we have 10 ready)
- Post-launch: update README with PH badge, write "What I Learned" blog post

### Phase 4: Long-term SEO (Week 4+)
Goal: Build distribution that compounds.

| Content | Search | Traffic Potential |
|---------|--------|-------------------|
| "OpenClaw memory plugin" blog post | High intent, low competition | 50-100 visitors/month |
| "Mem0 alternative" comparison | Medium competition, high intent | 100-200 visitors/month |
| "Self-hosted agent memory" | Niche search, strong conversion | 30-50 visitors/month |
| "LanceDB vs Qdrant for agents" | Tech search, low conversion | 20-30 visitors/month |

**SEO tactic:** The dev.to + Medium syndication gives backlinks. The GitHub README indexed ranks surprisingly well for "[tool name] [technology]." Also submit sitemap to Google.

## Key Decisions

### NOT launching on Product Hunt first
PH with zero audience = wasted opportunity. The window matters. Use it when there's already signal.

### NOT paying for ads or promoting
$0 budget. Rely on content distribution + organic reach. If Phase 1-2 show traction, consider it.

### NOT publishing all Reddit posts at once
Reddit detects coordinated promotion. Staggered posts from the same account look authentic. Different angles for different subs.

### YES to comparison content
"Supermemory alternative," "Mem0 but local" — these search phrases have intent. People are actively looking for these. Comparison posts rank and convert.

## Metrics to Track

| Metric | Phase 0 Target | Phase 1-2 Target | Phase 3 Target |
|--------|-------|---------|---------|
| GitHub stars | 0 | 15-30 | 50-100 |
| Reddit upvotes (total) | — | 200-400 | — |
| Twitter followers | 30 | 80 | — |
| PH upvotes | — | — | 100-200 |
| npm downloads | — | 50 | 200 |
| Active installations (unique) | 2 (me + Chris) | 5-10 | 15-30 |

## Risk Assessment

**Biggest risk:** Zero audience means everything depends on distribution quality. If post #1 (r/selfhosted) gets 0 engagement, the whole plan needs rethinking.

**Mitigation:** First post goes to r/selfhosted because that community has the strongest overlap with OmniMind's value prop (local-first, privacy-conscious, DIY audience). If that doesn't work, pivot to a more technical angle for r/AI_Agents.

**Second risk:** GitHub repo gets cloned but nobody installs. People browse, don't commit.

**Mitigation:** README needs a 30-second install test (`openclaw plugins install`) prominently. No lengthy docs, no "read 5 pages first." Give them the one-liner.

## Go/No-Go Gates

Phase 0 → Phase 1: Blog post published, dev.to account set up, GitHub README polished, Twitter account created with 3 posts.

Phase 1 → Phase 2: At least 2 Reddit posts with 50+ upvotes combined. If first post fails, analyze and rewrite before posting #2.

Phase 2 → Phase 3: 15+ GitHub stars, 5+ real installs confirmed. If no real users after Phase 1-2, PH will fail.

Phase 3 → Phase 4: PH top 10 OR GitHub stars > 50 OR 10+ real installs. Otherwise skip PH and go straight to SEO compounding.
