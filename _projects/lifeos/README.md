# LifeOS — Your AI Copilot for Everything in Life

> **"I don't wait for you to tell me what to do — I ask. I challenge. I guide."**

LifeOS is a personality-aware AI copilot that leads conversations, not follows them. Unlike chatbots that wait for questions, LifeOS probes, researches, and guides you through every area of your life — from travel planning and financial coaching to career strategy and mindfulness.

Built with Next.js 14, TypeScript, and inspired by [aicofounder.com](https://aicofounder.com) conversation patterns.

---

## ✨ Features

- **AI-Led Conversations** — Plugins start the conversation, not you. Each plugin has a system prompt that drives the interaction.
- **11 Specialised Plugins** — Travel, Finance, Health, Career, Learning, Family, Home, Social, Relationships, Productivity, Nutrition, and Mindfulness.
- **Phase-Based Guidance** — Each plugin guides you through structured phases (e.g., Discover → Plan → Execute → Review) with AI that adapts to your responses.
- **Canvas Integration** — Excalidraw-powered whiteboard for visual planning alongside conversations.
- **Usage Analytics** — Track sessions, messages, time spent, and plugin rankings.
- **Quick Actions** — Preset combinations that launch multiple plugins at once.
- **Onboarding Wizard** — Personalised plugin recommendations based on your interests.
- **SEO-Optimised** — Static HTML prerendering for all plugin pages with Open Graph metadata.
- **API-First Architecture** — Chat API with session persistence, history, and phase tracking.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

Requires Node.js v18+ and a Next.js-compatible environment.

### Environment Variables

Create a `.env.local` file:

```env
# Required for the chat API to work
OPENAI_API_KEY=sk-...

# Optional: Supabase for analytics persistence
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 🧩 Plugin Architecture

Each plugin in LifeOS follows a consistent architecture:

```
app/
├── plugins/                    # Plugin index and detail pages
│   ├── page.tsx                # Plugin grid with search, filter, status chips
│   └── [id]/page.tsx           # Individual plugin detail pages (SSG)
├── lib/
│   ├── plugin-registry.ts      # All plugin definitions, phases, system prompts
│   ├── plugin-manifest-schema.ts # Category taxonomy
│   ├── chat-persistence.ts     # Session persistence (localStorage + Supabase)
│   └── usage-analytics.ts      # Analytics tracking
├── api/
│   ├── chat/route.ts           # Chat API endpoint
│   └── plugins/route.ts        # Plugin data API
├── components/
│   ├── OnboardingWizard.tsx     # First-time user onboarding
│   ├── ExcalidrawCanvas.tsx     # Visual planning canvas
│   └── UsageDashboard.tsx       # Per-plugin analytics
└── data/
    └── sessions/               # Persistent session storage (JSON)
```

### Plugin Definition Structure

```typescript
type PluginDefinition = {
  id: string;           // Unique identifier (e.g., 'travel', 'finance')
  name: string;         // Display name (e.g., 'Travel OS')
  emoji: string;        // Emoji icon
  description: string;  // Short tagline
  color: string;        // Tailwind gradient class
  gradient: string;     // CSS linear-gradient
  badge: string;        // Feature badge text
  phases: PluginPhase[]; // Guided conversation phases
  systemPrompt: string; // AI system prompt
  features: string[];   // Feature list for card display
  status: 'active' | 'beta' | 'coming-soon';
};
```

### Phase Structure

Each plugin has 4-6 phases that guide the conversation:

```typescript
type PluginPhase = {
  id: string;           // Phase identifier
  name: string;         // Display name (e.g., 'Discover')
  description: string;  // What this phase accomplishes
  leadPrompt: string;   // How the AI opens this phase
  objectives: string[]; // Measurable objectives for this phase
};
```

## 🧭 Plugin Overview

### Active Plugins

| Plugin | Category | Phases | Status |
|--------|----------|--------|--------|
| ✈️ Travel OS | Lifestyle | 6 (Discover → Intent → Plan → Prepare → On Trip → Reflect) | ✅ Active |
| 💰 Finance OS | Finance | 5 (Assess → Diagnose → Plan → Execute → Review) | ✅ Active |
| 💪 Health OS | Health | 5 (Baseline → Research → Plan → Habit → Review) | ✅ Active |
| 💼 Career OS | Career | 5 (Where You Are → Market Research → Strategy → Execute → Grow) | ✅ Active |
| 📚 Learning OS | Learning | 5 (Focus → Structure → Study → Apply → Reflect) | ✅ Active |
| ❤️ Family OS | Lifestyle | 5 (Map → Connect → Plan → Execute → Bond) | ✅ Active |
| 🏠 Home OS | Home | 5 (Inventory → Priority → Plan → Execute → Maintain) | ✅ Active |
| 🎉 Social OS | Lifestyle | 4 (Network → Plan → Execute → Nurture) | ✅ Active |
| 💑 Relationships OS | Relationships | 4 (Reflect → Connect → Grow → Check-in) | ✅ Active |
| ⚡ Productivity OS | Productivity | 5 (Audit → Design → System → Optimize → Review) | ✅ Active |
| 🥗 Nutrition OS | Nutrition | 5 (Profile → Audit → Plan → Habits → Review) | ✅ Active |
| 🧘 Mindfulness OS | Mindfulness | 5 (Baseline → Awareness → Practice → Focus → Review) | ✅ Active |

## 🗺️ Architecture

```
┌─────────────────────────────────────────────┐
│                  Browser                     │
├─────────────────────────────────────────────┤
│  Next.js App (Static + Client Components)   │
│                                              │
│  ┌────────────────┐  ┌──────────────────┐   │
│  │  Plugin Grid   │  │  Chat Interface  │   │
│  │  (SSG/Static)  │  │  (Client-side)   │   │
│  └────────────────┘  └──────────────────┘   │
│         │                    │               │
│         ▼                    ▼               │
│  ┌──────────────────────────────────────┐   │
│  │         Next.js API Routes           │   │
│  │  /api/chat   /api/plugins            │   │
│  └──────────────────────────────────────┘   │
│         │                    │               │
│         ▼                    ▼               │
│  ┌──────────┐    ┌──────────────────────┐   │
│  │ OpenAI   │    │ localStorage +       │   │
│  │ Chat API │    │ Supabase (optional)  │   │
│  └──────────┘    └──────────────────────┘   │
└─────────────────────────────────────────────┘
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run Playwright e2e tests (requires Playwright browsers)
npm run test:e2e

# Run structural tests
npm run test:structural
```

**Note:** E2E tests require the `libnspr4` system library. On Ubuntu/Debian:
```bash
sudo apt-get install -y libnspr4
```

## 📄 License

Proprietary — Apifeny Labs. All rights reserved.

---

*Built by Apifeny Labs. Wosobu, CEO.*
