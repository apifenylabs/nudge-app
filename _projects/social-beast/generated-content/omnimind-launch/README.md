# OmniMind Launch Content Package

## Strategy Notes (Not AI fluff — researched formats)

### What Actually Works for Dev Tool Launches in 2026:
1. **Problem-first framing** — don't start with "I built X." Start with "Agents forget everything after 20 minutes. I got tired of it."
2. **Specific before generic** — "3 memory stores (vector + graph + SQLite)" > "advanced multi-modal architecture"
3. **Build-in-public honesty** — show numbers, constraints, what's NOT solved yet
4. **Short-form first** — PH listing fits in 10 sec skim. Threads 8-12 tweets max.
5. **No AI-sounding language** — never say "revolutionary," "game-changing," "cutting-edge"
6. **Comparison frames drive clicks** — "Mem0 but local" / "Mem0 alternative that runs on a Pi"

### Key Insight from PH Research (2026):
- PH algorithm now penalizes upvote-chasing. Real comments > upvotes.
- Tuesday-Thursday launch window, midnight PT reset.
- Top 5 needs 200-350 upvotes. Conversion from visit→signup should be 15-25%.
- Post-launch 30-day sprint matters more than launch day.

### Reddit (r/openclaw, r/AI_Agents, r/SideProject):
- Self-promotion = downvoted unless you bring value first
- "I built X" posts need: problem → approach → honest tradeoffs → code link
- Include: GitHub stars target, tech stack, what you'd do differently
- No "upvote if you agree" — will get roasted

### X/Twitter Threads:
- Hook must stop scroll in 1 tweet
- Clean thread anatomy: hook (1) → problem (2) → approach (2-3) → results (2) → CTA (1)
- 8-12 tweets max. Wasting tweets = losing followers.
- Bookmark rate > likes as engagement signal

### LinkedIn:
- Less technical, more "why this matters"
- Single post not thread — LinkedIn carousels OK as PDF upload
- Focus on: the pain of agents forgetting, the solution, open source
- Tag relevant communities and people who amplify

## Organization

```
omnimind-launch/
├── product-hunt/           # PH listing + maker comments
│   ├── listing.txt         # Title, tagline, description, assets
│   └── comment-threads.txt # Pre-written maker responses
├── reddit/                 # Reddit posts
│   ├── r-openclaw.txt      # For r/openclaw
│   ├── r-ai-agents.txt     # For r/AI_Agents
│   └── r-sideproject.txt   # For r/SideProject
├── twitter/                # X/Twitter threads
│   ├── launch-thread.txt   # Main launch thread (10 tweets)
│   └── follow-up.txt       # What I learned thread (1 week post)
├── linkedin/              # LinkedIn posts
│   └── launch-post.txt
└── research/              # Research backup
    └── taskade-benchmark.txt  # Taskade competitive breakdown
```
