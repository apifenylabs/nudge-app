# OmniMind Pilot Test — OmniMind vs Current Baseline

## Context

Current state:
- **OpenClaw native memory-core**: broken (Ollama embedding provider not configured, returns 401)
- **Felix/GPT memory**: ephemeral conversation context only, no persistence between sessions
- **OmniMind plugin**: v0.3.0 loaded but stores never initialized (lazy-init on tool call)
- **Consolidation cron**: writes to `knowledge/` files but not to OmniMind vector/graph stores

## The Test: 7-Day Dogfood

### Hypothesis
OmniMind's 3-store pipeline (LanceDB vector + Kuzu graph + SQLite provenance) provides better cross-session recall than the current "check memory/ files manually" approach.

### Test Protocol (Starting Now)

**Day 1-2: Onboard**
1. Every key decision/task result → call `memory_add` explicitly
2. At end of session, call `memory_recall` with relevant queries
3. Note: was recall helpful? Did it surface anything I'd forgotten?

**Day 3-4: Build habits**
4. Start querying OmniMind proactively before making decisions
5. "Did I already solve this problem?" → memory_recall first, then decide
6. Compare: how long does it take vs grepping memory/*.md files?

**Day 5-7: Measure**
7. Count: times OmniMind recall saved rework vs times it failed
8. Cost: tokens spent on memory_add + memory_recall calls vs value gained
9. Verdict: ship distribution or fix gaps first?

### Success Criteria
- ✅ Recall surfaces relevant past work without hallucination
- ✅ Cross-session continuity: what we did yesterday is accessible today
- ✅ Graph edges connect related decisions (not just keyword match)
- ❌ If recall is worse than grep + read memory/*.md → fix pipeline before shipping

### Baseline (Current)
- `memory/` + `HEARTBEAT.md` + `knowledge/semantic/` files
- Manual grep/read to find past decisions
- No vector search, no graph traversal, no cross-session linking
- Felix/GPT: forgets everything between sessions
