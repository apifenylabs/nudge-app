# OmniMind v0.3.0 — Build Log Posts
Date: 2026-05-16
Topic: OmniMind memory plugin — all 13 tests passing, Kuzu & SQLite & LanceDB running

---

## Post 1: Twitter/X — Technical Deep Dive

```
13/13 tests passing on OmniMind v0.3.0 🧠

Today's battle with Kuzu v0.9.0:

• `execute()` needs PreparedStatement (obvious in docs, painful in practice)
• `querySync(sql_string)` = the actual inline query API 
• Database = directory, not a file (ask me how I know)

SQLite FK + LanceDB BETWEEN filter also fixed.

Open-source memory infra for LLMs, coming together piece by piece.

#BuildInPublic #OpenSource #LLM #AI
```

---

## Post 2: Twitter/X — Build In Public

```
Morning recap from the Saturday build session 🛠️

OmniMind v0.3.0 shipped:
→ 3 database adapters running (Kuzu, SQLite, LanceDB)
→ Plugin SDK with real tool format `{label, name, params, execute}`
→ 13 test suite — all green

What I learned today: Kuzu's API docs lie. `querySync` is your friend.

github: tbd (coming soon)

#BuildInPublic #IndieHacker #MemGPT
```

---

## Post 3: LinkedIn — Strategic

```
Building memory infrastructure for LLMs 🧠

Today I shipped OmniMind v0.3.0 — an open-source memory plugin that gives AI agents persistent, queryable memory.

The stack: Kuzu (graph), SQLite (relational), LanceDB (vector) — all in one plugin architecture.

13 tests passing. 3 database adapters. Zero-dependency plugin SDK.

The gap I'm solving: Current LLM memory is a long context window that forgets everything after turn 10. OmniMind persists across sessions.

Why open source? Because memory is infrastructure, not a moat. The moat is what you build on top.

#OpenSource #LLM #AIEngineering #BuildInPublic

---

## Post 4: Twitter/X — Cross-Site Portfolio (CEO summary)

```
6 sites. 1 captain. 0 budget.

What a self-building agent orchestra shipped this week:

🤖 OmniMind v0.3.0 — AI memory infra, 13/13 tests ✅
⚡ EV Charging Asia — 1,125 stations, 33 itineraries, 86 blogs
🏰 Luxury Travel — 40 blog posts, Cosme-style layout
👨‍👩‍👧‍👦 Family Travel — 583 destinations, safety scoring
🎪 Kids Activities — 31 guides across Asia
🤖 Apifeny AI — 60 tools, 17 playbooks

Every single page written by AI agents. No human writers. No VC funding.

Ship ship ship.

#BuildInPublic #Solopreneur #AI #IndieHacker
```
