# OmniMind Greenlight Manifesto — May 15, 2026

**Sovereign OpenClaw-Native Memory Control Plane**

Status: 🟢 Greenlit (research complete, no code action yet)
Source: Chris decision, shared 2026-05-15 23:22 HKT
Living document — append as strategy evolves.

---

## The Conviction

OpenClaw: 355k+ GitHub stars, 3.2M active users, 500k+ instances. Persistent memory is still the **#1 community pain point** across Reddit/X. Cognee has an official OpenClaw plugin, but it's generic. We own the *native* hybrid layer.

This is defensible infra that compounds into real revenue and exit potential while keeping costs near-zero during the negative-revenue build phase.

---

## Stack (Final Pivot Decision)

| Layer | Choice | Why |
|-------|--------|-----|
| Vector | **LanceDB** | Embedded, zero-deps, already loved in OpenClaw plugins |
| Graph | **Kuzu** | Lightweight, embedded, property-graph |
| Relational | **SQLite** | Zero-infra, good enough for single-instance |
| Embeddings | **bge-m3 / nomic via Ollama** | Local SOTA, fallback to all-MiniLM |
| LLM | **DeepSeek / Ollama** | Cost-effective for extraction |

---

## Pipeline Architecture (Cognee ECL Adapted)

**Extract** — OpenClaw-native sources (MEMORY.md, daily notes, workspace files)
**Cognify** — Graph + vector building (6-stage pipeline)
**Load** — Poly-store persistence
**Memify** — Nightly self-evolution worker (DeepSeek/Ollama)

---

## Three-Tier Monetization

| Tier | Price | Features |
|------|-------|----------|
| OSS | Free | Local plugin, all basic features |
| Cloud | $29–49/mo | Hosted multi-user, advanced Memify/compression |
| Enterprise | Custom | Self-evolving, memory-as-asset, custom hooks |

---

## Distribution (Mem0 playbook, adapted)

1. **Week 1**: Ship plugin → r/openclaw, Discord, X
2. **Week 2**: Product Hunt + Show HN
3. **Ongoing**: LangChain/LangGraph/CrewAI adapters, YouTube demos, Reddit threads
4. **Virality**: One-click install in OpenClaw plugin manager + auto-capture from MEMORY.md

---

## Top 5 Build Queue (Priority Order)

1. **Advanced Memify Self-Evolution Worker** — Nightly prune/strenthen/derive. Solves "memory bloat / junk facts" complaints. Highest Reddit/X signal.
2. **Shared Multi-Agent Memory** — One memory graph for agent teams. Top enterprise pain. Simple: dataset scoping + permission hooks.
3. **Memory Compression + Token Optimizer** — Hierarchical summaries + sparsity. Direct cost reduction.
4. **Memory-as-Asset Export/Share** — Portable "memory packs" (JSON + provenance). Early monetization seed.
5. **Robotics/Embodied Hooks (VLA-ready)** — Temporal + procedural for long-horizon task persistence.

---

## Cost Controls (Non-Negotiable While Negative Revenue)

- Local-first defaults everywhere (LanceDB/Kuzu/SQLite + Ollama/DeepSeek local)
- Only spin cloud (Fly.io/Supabase/Qdrant) for paid tiers or dogfood
- No heavy deps, no Neo4j, no paid APIs in OSS
- Track everything: extraction cost per memory, MRR runway

---

## Exit Realism

$20–100M in 18–24 months is achievable given OpenClaw's scale and AI infra M&A heat. Unicorn odds are low (infra play), but this is the asymmetric bet that has product-market fit *today*.

Cloud providers (AWS/Google), orchestration platforms (LangChain/CrewAI), vector DBs (Qdrant/LanceDB), or OpenClaw core will pay $20–100M+ to own the sovereign memory layer that works everywhere.

---

## Long-Term Vision: The Infrastructure Play

Not "just memory." We're building the neutral control plane for all agentic workflows:

- **Memory-as-Asset marketplace**: Users own, trade, monetize verified memory graphs
- **Cross-agent orchestration layer**: Shared memory across teams/multi-agent setups
- **Embodied AI / robotics bridge**: Long-horizon tasks, user preferences, learned skills. Embodied AI market: $3.8B (2026) → $7.24B (2030).

---

## Next Action (When Greenlit)

"Ship the plugin spec" → produce:
1. Exact 48h PR plan
2. First Tasks code skeleton
3. OpenClaw plugin wiring
