---
title: "Why I Built a Sovereign Memory Control Plane for OpenClaw"
published: true
description: "How I replaced cloud memory APIs with a 100% local, three-database memory layer for AI agents — using LanceDB, Kuzu, SQLite, and a nightly self-evolution worker."
tags: openclaw, ai, memory, selfhosted, opensource
date: 2026-05-29
canonical_url: https://github.com/apifenylabs/omni-mind
series: OmniMind
---

# Why I Built a Sovereign Memory Control Plane for OpenClaw

**Or: The day I realized my AI agent had a 20-minute memory and I couldn't fix it with a cloud API.**

---

Every OpenClaw agent starts a new session with a blank slate.

It remembers what's in `MEMORY.md` — but that's static. A configuration file. It doesn't remember what we talked about yesterday. It doesn't know that we already solved the database latency problem three weeks ago. It doesn't connect the dots across conversations.

I ran OpenClaw for months before I admitted this was a problem. The framework is excellent — but the memory situation was stuck between two bad options.

## The Existing Options (Both Bad)

### Option 1: Static files (free, doesn't scale)

`MEMORY.md` + `AGENTS.md` + a folder of daily notes. This is the default. It's fine for configuration. It's useless for recall.

There's no vector search. No temporal awareness. No relationship tracking. Every time you need to know "did we already figure this out?" you're grepping markdown files manually.

### Option 2: Cloud memory APIs (works, costs money, gives away privacy)

Supermemory. Mem0. They're good products. But they send your agent's conversations to someone else's server, vectorize them, and charge $30-50/month for the privilege. Your private work, your architectural decisions, your half-baked ideas — all on someone else's infrastructure.

I'm building a business on my agent's work. I don't want my competitive advantage living in a cloud database I don't control.

## What I Wanted

A memory layer that was:

- **100% local** — no data ever leaves my machine
- **Zero cost** — no monthly bill
- **Persistent** — survives sessions, survives restarts, survives time
- **Evolving** — raw logs are useless at scale. I wanted my agent to *learn* over time
- **OpenClaw-native** — install as a plugin, not bolt on an external service

So I built OmniMind.

## The Architecture: Three Databases, One Pipeline

Most memory solutions pick one storage layer and call it done. Vectors for search. Or a graph for relationships. Or SQL for audit.

I wanted all three.

### 1. LanceDB — Vector Search

Every memory gets embedded (using local Ollama, no cloud API calls) and stored in LanceDB. Columnar, embedded, fast.

**What it's good for:** "What did we say about database latency back in April?" — semantic search across everything the agent has ever discussed.

### 2. Kuzu — Knowledge Graph

Memories aren't isolated facts. They're connected. A decision about pricing relates to a competitor analysis relates to a feature prioritization thread.

Kuzu (embedded, columnar, no server) stores entities and their weighted relationships. When the agent recalls a decision about pricing, the graph surfaces the related context automatically.

**What it's good for:** "Why did we choose this approach?" — the graph shows the reasoning tree, not just the final decision.

### 3. SQLite — Provenance

Who stored this memory? When? Who accessed it last? Is it still relevant?

SQLite keeps the audit trail. No guesses about where a memory came from or whether it's stale.

**What it's good for:** Accountability. Knowing whether a memory is from yesterday's session or three months ago changes how much you trust it.

### The ECL Pipeline (Extract → Cognify → Load)

Raw markdown → chunked → embedded → stored across all three layers. Every time a memory is added, the pipeline:
1. **Extracts** structured entities from the text
2. **Cognifies** — embeds the text for vector search, creates graph nodes and edges
3. **Loads** — writes to all three stores atomically

### The Memify Worker (Nightly Evolution)

Raw conversation logs are noisy. A single session might generate hundreds of memory entries. Many are trivial: "tried approach X, it failed." But over time, patterns emerge.

Every night, the Memify worker scans the raw episodic logs, identifies patterns, and compresses them into higher-level semantic knowledge. It prunes stale edges. It strengthens relationships that appear repeatedly. It derives preferences and habits from repeated behavior.

Your agent gets smarter while you sleep.

## How It Compares

| Feature | OmniMind | Supermemory | Mem0 | Static files |
|---------|----------|-------------|------|-------------|
| Local-first | ✅ 100% local | ❌ Cloud API | ❌ Cloud API | ✅ |
| Free | ✅ | ❌ $30/mo | ❌ $50/mo | ✅ |
| Vector search | ✅ LanceDB | ✅ | ✅ | ❌ |
| Knowledge graph | ✅ Kuzu | ❌ | ❌ | ❌ |
| Provenance tracking | ✅ SQLite | ❌ | ❌ | ❌ |
| Self-evolution | ✅ Memify | ❌ | ❌ | ❌ |
| OpenClaw native | ✅ Plugin | ❌ (manual) | ❌ (manual) | ✅ (static) |
| Privacy | ✅ No data leaves | ❌ | ❌ | ✅ |

## The One-Liner Install

```bash
openclaw plugins install @openclaw/omni-mind
```

That's it. No signup. No API key. No cloud.

## What I Haven't Solved Yet (Being Honest)

1. **Multi-agent shared memory** — v0.4. Right now, each OmniMind instance is single-agent. Shared context across agents is coming.
2. **Proactive file watcher** — You trigger the ECL pipeline manually or via cron. I want auto-watch on file changes.
3. **Scale testing** — It works great on my setup. I need more dogfood data before calling it production-ready.
4. **npm publish** — The package installs from local source today. ClawHub listing is in review.

## Why "Sovereign"?

Because your agent's memory *is* your intellectual property. Every decision, every experiment, every failed approach — that's knowledge. It shouldn't be locked in a SaaS database. It shouldn't vanish when a session ends. It shouldn't be a configuration file you manually edit.

Sovereign means you own it. All of it. Locally. Permanently.

## What's Next

- **v0.3.0** — Current release. ECL pipeline, all three stores, Memify worker. Running in production on my own agents.
- **v0.4** — Multi-agent shared memory, file watcher, inspection dashboard.
- **v1.0** — Memory-as-Asset: export, share, and selectively publish memory snapshots.

---

**[GitHub: apifenylabs/omni-mind](https://github.com/apifenylabs/omni-mind)** — MIT licensed, contributions welcome.

**Install:** `openclaw plugins install @openclaw/omni-mind`

*I'm building this openly. Feedback, criticism, and PRs all appreciated.*
