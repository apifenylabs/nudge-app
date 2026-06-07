# Titan — Solo Leveling Visual Agent Builder

> **Build agents like you're hunting in a gate. Level up. Evolve. Conquer.**

Titan is a gamified AI agent builder where progression mirrors Solo Leveling — your agents grow stronger through hunts, dungeons, and shadow extraction. Built on Next.js with Supabase persistence.

## 🚀 Stack

- **Next.js 14** (App Router) — Framework
- **Supabase** — Auth + persistence
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety
- **Three.js / R3F** — 3D dungeon rendering
- **Vercel** — Deployment

## 🎮 Core Game Loop

```
Select a Gate → Deploy Agents → Hunt Monsters → Gain EXP
     ↑                                        |
     └────── Level Up → Evolve → Unlock ──────┘
```

- **Hunt**: Deploy AI agents into procedurally generated dungeons
- **Level Up**: Each hunt grants EXP — track progress visually
- **Evolve**: Hit rank thresholds — Common → Uncommon → Rare → Epic → Legendary
- **Shadow Extraction**: Defeated monsters become your shadow army

## 📂 Project Structure

```
src/
├── app/             # App Router pages
│   ├── page.tsx     # Landing / hub
│   ├── hunt/        # Active hunt interface
│   ├── agents/      # Agent roster & management
│   └── dungeon/     # Dungeon exploration
├── components/      # Reusable UI components
├── lib/             # Utility functions & game logic
├── hooks/           # Custom React hooks
└── styles/          # Global styles
supabase/
├── migrations/      # Database schema migrations
└── seed.sql         # Seed data
```

## 🧩 Core Systems

| System | Status | Description |
|--------|--------|-------------|
| Agent Ranks | ✅ | Common → Legendary tier system |
| EXP/Leveling | ✅ | Full level-up pipeline |
| Hunt Engine | ✅ | Deploy agents into gates |
| Dungeon Gen | 🏗️ | Procedural room generation |
| Shadow Army | 📝 | Collect & rank shadows |
| PvP Arena | 📝 | Agent-vs-agent battles |
| Guild System | 📝 | Multiplayer guilds & raids |

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🔗 Live

- **Production**: [titan-app-puce.vercel.app](https://titan-app-puce.vercel.app)
- **Main alias**: [titan-app.vercel.app](https://titan-app.vercel.app) *(requires deploy protection toggle)*

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests (Playwright)
npx playwright test
```

## 🏔️ Roadmap

1. **Phase 1** (done) — Agent ranks, leveling, basic hunt engine
2. **Phase 2** (in progress) — Supabase persistence, dungeon generation
3. **Phase 3** — Shadow army, ranking leaderboard
4. **Phase 4** — PvP arena, guilds, raids

---

*"Arise."*
