# OmniMind — Strategic Position

## What It Is
Zero-knowledge AI memory API. Store and retrieve memories with vector search. Phase 1 (plaintext) complete. Phase 2 (AES-256-GCM + JWT) next.

## Why It Matters to the Portfolio

**Internal:** OmniMind is the data backbone for every directory and every agent squad. It holds:
- User preferences across all 6+ sites (cross-sell signals)
- Agent squad shared context (multi-agent coordination)
- Ranking signals data (trending, saves, editor scores)
- Content generation memory (what's been written, what's pending)

**External:** Memory-as-a-Service — sell to developers building AI agents that need persistent context. TAM grows with every new LLM agent framework.

## Current Status
- Phase 1 MVP fully built ✅
- 24/24 tests passing ✅
- Repo: github.com/apifenylabs/omnimind
- **BLOCKED:** Supabase schema not run (need DB password or PAT from Supabase Dashboard)
- Ready for production deployment once schema is active

## Next Steps
1. Run SQL migration in Supabase Dashboard or provide PAT for auto-deploy
2. Deploy backend (Fly.io / Railway)
3. Deploy frontend (Vercel)
4. Open beta — build-in-public on X/Twitter

## Venture Positioning
OmniMind the product → our internal tool → our data backbone → our platform. The $1B thesis depends on this being the engine behind every other product.
