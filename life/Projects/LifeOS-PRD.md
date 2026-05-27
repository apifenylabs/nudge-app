# LifeOS — Product Requirements Document v2
**Version**: 2.0  
**Status**: DRAFT  
**Owner**: Alpha (AI Agent)  
**Project**: Strategic Priority #1 (Protected 30% Bucket)  
**Inspiration**: aicofounder.com (structured AI conversation that leads, not follows)

---

## 1. Vision

**One-liner:** LifeOS is a personality-aware AI copilot that actively leads structured conversations across every area of life — the aicofounder model, generalized beyond startups to your entire existence.

**Long version:** Most life-tracking apps are passive dashboards. You enter data, they show charts. LifeOS is the opposite. It's an AI that **leads the conversation**. It asks you focused questions. It challenges your assumptions. It tells you when an idea needs more evidence. It pushes you to think about details you'd overlook. It builds a persistent visual canvas of everything — your travel plans, financial roadmap, health goals, career strategy, family initiatives — and guides you through structured phases, per category, on a canvas that persists across sessions.

Just as aicofounder turns "I want to build a product" into a guided, rigorous process with research, planning, and execution — LifeOS turns "I want to get my finances in order" or "I want to plan a family trip" into the same kind of structured, AI-led conversation.

The goal: **one AI conversation layer over your entire life**, where the AI doesn't wait for you to figure out what to do. It drives.

---

## 2. Why the aicofounder Model Fits Life Coaching

aicofounder's magic isn't the phases. It's the conversational dynamic:

| aicofounder quality | Applied to LifeOS |
|---|---|
| AI **leads** the conversation, not follows | Every plugin opens with the AI asking questions, not waiting for input |
| Challenges assumptions ("sell hats for ducks? why?") | "Why do you want to visit Japan in August? Have you researched the typhoon season?" |
| Grounds research in real sources (Reddit, communities) | For Travel: scrapes trip reports. For Finance: pulls from r/personalfinance. For Health: cites studies |
| Persistent visual canvas — everything in one place | Your financial projection, family budget, fitness plan — all on one infinite canvas per plugin |
| Ultraplan finds your single biggest blocker | "The thing blocking your fitness goal isn't motivation. It's that you haven't scheduled workouts into your calendar." |
| Structured phases that make you think deeper | Not "check these boxes," but "let's explore this together, here's what I found" |
| No yes-man AI — honest feedback | "Your career plan needs more evidence. Let's research the market before you commit." |

**Why this works for life categories:**
- Humans are bad at self-directed life improvement. We need a coach who asks hard questions.
- ChatGPT is a blank page — you have to know what to ask. LifeOS removes that friction.
- Most life apps assume you know what you're doing. LifeOS assumes you need guidance, and provides it.

---

## 3. Core Architecture

### 3.1 Overview

```
LifeOS
├── Personality Engine (global, cross-category)
├── Plugin Registry (one plugin per life category)
│   ├── Travel OS (aicofounder-style AI agent)
│   ├── Finance OS (aicofounder-style AI agent)
│   ├── Health OS (aicofounder-style AI agent)
│   ├── Career OS (aicofounder-style AI agent)
│   ├── Family OS (aicofounder-style AI agent)
│   ├── Fitness OS (aicofounder-style AI agent)
│   ├── Learning OS (aicofounder-style AI agent)
│   ├── Home OS (aicofounder-style AI agent)
│   ├── Social OS (aicofounder-style AI agent)
│   ├── Relationships OS (aicofounder-style AI agent)
│   └── ... (extensible)
├── Persistent Canvas (per-plugin infinite workspace)
├── Conversation Engine (LLM + phase router)
└── Data Layer (Supabase + local fallback)
```

### 3.2 Each Plugin = an aicofounder-style AI Agent

Every plugin is **not** a checklist. Every plugin is a full AI conversation agent that:

1. **Gathers context** — when you first open a plugin, the AI asks you questions to understand your situation, constraints, goals
2. **Creates a plan** — based on your answers, it proposes a structured approach (phases adapted to the category)
3. **Leads the conversation** — each phase, the AI asks probing questions, challenges assumptions, provides research
4. **Builds on the canvas** — everything (notes, research links, decisions, itineraries, budgets) lives on the persistent canvas
5. **Tracks decisions** — the AI remembers what you decided and adapts future conversation based on past choices
6. **Replans when needed** — at inflection points, the AI reassesses and replans (like aicofounder's Ultraplan)

### 3.3 Persistent Canvas

Each plugin gets its own infinite visual workspace. Inspired by aicofounder's canvas:

- **Documents**: longer-form plans, research reports, reflections
- **Notes**: quick thoughts, decisions captured mid-conversation
- **Links**: cited sources, external resources, bookmarks
- **Colored sections**: visual organization (e.g., "Budget," "Itinerary," "Backup Plans")
- **Searchable**: Cmd+K across everything in the plugin
- **Persistent across sessions**: nothing is lost when you close and reopen
- **Exportable**: canvas content as Markdown, PDF, or plain text

### 3.4 Personality Engine

The personality engine is what makes LifeOS different from a generic chatbot:

```
Personality Engine
├── Reads USER.md (or equivalent preference file)
├── Learns from cross-category behavior
│   ├── "You research deeply in Travel too — let's apply that depth to Fitness"
│   ├── "You tend to skip detail work in Finance. Let me help by breaking it down more."
│   └── "You respond well to competitive challenges — want me to gamify this?"
├── Adapts tone per user:
│   ├── Direct & critical ("This plan is weak. Here's why.")
│   ├── Encouraging ("Great start! Let me help you push further.")
│   └── Strategic ("Let me Ultraplan what's blocking you.")
├── Remembers preferences across categories:
│   ├── Budget level (luxury / balanced / frugal)
│   ├── Time availability (aggressive / moderate / relaxed timeline)
│   └── Risk tolerance (safe / balanced / experimental)
└── Suggests next actions proactively:
    ├── "You finished Travel OS's itinerary phase. Ready to look at Finance OS budgeting?"
    └── "Your Health OS research shows sleep is your biggest gap. Want to plan that?"
```

The personality engine is what makes LifeOS feel like a real coach. Not a bot that says "great question!" — but an AI that actually knows who you are and adapts.

### 3.5 Conversation Flow (Detailed)

```
User opens Travel OS
  ↓
AI: "Let's plan your travel. First — have you picked a destination or are you exploring?"
  ↓
User: "I'm thinking Japan, maybe September."
  ↓
AI: "September is typhoon season in Japan. Let me pull up some research."
  ↓
[AI runs parallel research — scrapes travel forums, weather data, flight trends]
  ↓
AI: "Here's what I found: September has 40% higher rain probability in Tokyo, but prices are 30% lower than October. Option A: Go September with flexible booking. Option B: Push to October for better weather."
  ↓
[Canvas auto-populates: weather comparison table, price trends, traveler tips]
  ↓
User: "Let me see the October option."
  ↓
AI: "Good choice. Now — what's your budget range? I'll find flights and accommodation that fit."
  ↓
... conversation continues, canvas fills with itinerary, budget, backup plans ...
```

This is completely different from the old "check these boxes" model. The AI leads. The user responds. The canvas captures.

---

## 4. Plugin Categories (v2.0 Inventory)

| # | Category | Plugin Name | Description | AI Specialization |
|---|----------|-------------|-------------|-------------------|
| 1 | Travel | Travel OS | Plan trips, build itineraries, discover destinations | Scrapes travel communities, weather APIs, flight data. Leads itinerary conversation. |
| 2 | Finance | Finance OS | Budget, invest, save, plan big purchases | Pulls financial research, tracks spending patterns. Challenges assumptions about risk. |
| 3 | Health | Health OS | Diet, sleep, checkups, mental health | Cites medical guidelines, tracks habits. Asks uncomfortable questions about consistency. |
| 4 | Career | Career OS | Job strategy, skills, networking, promotions | Researches industry trends, salary data. Ultraplan finds career blockers. |
| 5 | Family | Family OS | Family events, care plans, shared goals, traditions | Mediates shared decision-making. Builds family calendars and agreement docs. |
| 6 | Fitness | Fitness OS | Workout plans, progression, recovery, habits | Designs progressive overload, adjusts based on feedback. Pushes past plateaus. |
| 7 | Learning | Learning OS | Courses, skills, reading, certifications | Structures learning paths, tests understanding, recommends resources. |
| 8 | Home | Home OS | Home improvement, maintenance, organization | Creates maintenance schedules, researches contractors, plans renovations. |
| 9 | Social | Social OS | Social calendar, events, friendships, hosting | Manages social energy, plans gatherings, tracks friend check-ins. |
| 10 | Relationships | Relationships OS | Partner, communication, quality time, growth | Sensitive conversation guidance. Suggests activities. Tracks relationship health. |

**Note on depth:** Not all plugins need the same number or type of phases. The AI adapts the phase structure per category (see §6).

---

## 5. How It Works (End-to-End User Flow)

### 5.1 First-time user opens LifeOS

1. User sees a welcome screen: "LifeOS — your life AI copilot. What area of your life would you like to work on?"
2. User sees a grid of plugin categories (10 shown, more available)
3. User clicks "Travel OS"

### 5.2 Plugin opens — AI conversation begins

4. AI immediately starts conversation (not a blank page):
   - "I see you're interested in travel. Are you planning a specific trip, or are you in exploration mode?"
   - After response: "Great. Let me start researching. While I do that, tell me — what's your budget style? Luxury, balanced, or frugal?"
5. Canvas begins filling: a "Trip Profile" section appears with user's preferences
6. AI presents first phase: **Discovery** (adapted for Travel)

### 5.3 Phases unfold conversationally

The AI doesn't present a fixed checklist. Instead:
- Phase 1 (Discovery): AI asks about destinations, pulls research, challenges assumptions
- Phase 2 (Plan): AI builds itinerary together with user, asks about logistics, timing
- Phase 3 (Execute): AI helps book, prepare documents, pack
- Phase 4 (Experience): AI provides real-time tips during travel
- Phase 5 (Reflect): AI reviews the trip, captures learnings, updates preferences

At each phase transition, the AI asks: "You've completed the research phase. Here's what we found. Are you ready to move to planning, or do you want to dig deeper on something?"

### 5.4 Cross-category intelligence

- After planning Japan in Travel OS, if user opens Finance OS, the AI might say: "I see you're planning Japan. Want me to build a travel budget into your Finance OS plan?"
- If user starts Health OS after Travel OS, the AI might note: "Your trip to Japan means adjusting your sleep schedule. Want to plan that here?"

### 5.5 Session continuity

- Every conversation is remembered. Next session opening Travel OS: "Welcome back. Last time we were building your Japan itinerary. The typhoon concerns we discussed — I found more data. Want to revisit, or continue where you left off?"
- Nothing is lost. The canvas persists.

---

## 6. Phase Structures (Per Category)

Each plugin uses an aicofounder-style guided conversation with category-specific phases. These are NOT the old generic 5-phase checklist. They're adapted per category and the AI leads the conversation through them.

### Travel OS
| Phase | AI leads by... |
|-------|---------------|
| Discover | Asking about preferences → running parallel research on destinations → presenting options with data |
| Intent | Challenging timing/location choices with real data (weather, costs, crowds) → narrowing options |
| Plan | Building itinerary interactively → suggesting routes → finding gaps |
| Prepare | Ensuring documents, bookings, health prep, local tips |
| Experience | Real-time weather/event tips, backup plan suggestions |
| Reflect | Reviewing what worked → capturing memories → updating travel profile |

### Finance OS
| Phase | AI leads by... |
|-------|---------------|
| Assess | Asking about income, expenses, debt → building financial snapshot on canvas |
| Diagnose | Finding the biggest financial leak/risk → presenting with evidence |
| Plan | Building budget, savings targets, investment strategy interactively |
| Execute | Setting up systems (auto-save, bill pay, investment) step by step |
| Review | Monthly check-ins, adjusts based on spending data |

### Health OS
| Phase | AI leads by... |
|-------|---------------|
| Baseline | Asking about diet, sleep, exercise, stress → building health profile |
| Research | Citing guidelines, recommending checkups, flagging risks |
| Plan | Creating specific, measurable health goals and habit chains |
| Habit | Daily/weekly check-ins, adjusts based on compliance |
| Review | Monthly health score, updates profile |

### Career OS
| Phase | AI leads by... |
|-------|---------------|
| Where You Are | Current role, satisfaction, skills → builds career snapshot |
| Market Research | Scrapes job trends, salary data, skill demands → presents opportunities |
| Strategy | Identifies promotion path, pivot options, or entrepreneurial move |
| Execute | Resume/LinkedIn updates, networking plan, application tracking |
| Grow | Upskill roadmap, mentorship strategy, industry engagement |

### Family OS
| Phase | AI leads by... |
|-------|---------------|
| Map | Family structure, members, roles, key events |
| Connect | Shared goals, traditions, quality time planning |
| Plan | Events calendar, care schedules, shared budgets |
| Execute | Coordinating tasks, reminders, shared checklists |
| Bond | Relationship check-ins, suggests activities, growth areas |

### Fitness OS
| Phase | AI leads by... |
|-------|---------------|
| Baseline | Current fitness level, goals, constraints → builds profile |
| Design | Creates progressive plan (strength/cardio/flexibility) with AI adjustment |
| Execute | Session tracking, form tips, progressive overload |
| Push | Plateau detection → AI adjusts plan, pushes harder |
| Maintain | Recovery management, deload weeks, long-term consistency |

### Learning OS
| Phase | AI leads by... |
|-------|---------------|
| Focus | What to learn, why, time available → suggests optimal path |
| Structure | Builds curriculum, finds courses/books/projects |
| Study | Interactive learning sessions, tests understanding |
| Apply | Projects, real-world practice, portfolio building |
| Reflect | Reviews progress, adjusts learning speed and depth |

### Home OS
| Phase | AI leads by... |
|-------|---------------|
| Inventory | Current state, maintenance needs, improvement wishes |
| Priority | Urgency/cost/impact matrix → AI ranks projects |
| Plan | Step-by-step plan for each project (budget, timeline, contractors) |
| Execute | Task tracking, contractor management, material sourcing |
| Maintain | Scheduled maintenance calendar, seasonal checklists |

### Social OS
| Phase | AI leads by... |
|-------|---------------|
| Network | Current social landscape, close vs broad connections |
| Plan | Goals (host dinner, reconnect with old friend, expand network) |
| Execute | Event planning, outreach scheduling, conversation starters |
| Nurture | Regular check-ins, social energy management, deeper connections |

### Relationships OS
| Phase | AI leads by... |
|-------|---------------|
| Reflect | Current relationship state, satisfaction, communication patterns |
| Connect | Quality time suggestions, conversation guides, shared activities |
| Grow | Relationship goals, conflict resolution frameworks, appreciation habits |
| Check-in | Regular pulse checks, suggests adjustments, tracks growth |

---

## 7. Personality Engine — Detailed Spec

### 7.1 Data Sources

The personality engine builds a user profile from multiple signals:

| Signal | Source | Example |
|--------|--------|---------|
| Stated preferences | Direct conversation | "I prefer luxury travel" |
| Behavioral patterns | Cross-category actions | Skips detail phases, prefers depth in Finance |
| Response style | LLM analysis | User responds better to direct criticism vs. encouragement |
| Tone preference | Conversation history | User disengages when AI is too verbose |
| Values | Implicit answers | "I prioritize family time over career growth" |
| Constraints | Life context | "I have 2 hours/day for personal projects" |

### 7.2 Adaptation Dimensions

The personality engine adjusts on these axes:

| Dimension | Range | Effect |
|-----------|-------|--------|
| Depth | Shallow ↔ Deep | How much detail per phase |
| Pace | Aggressive ↔ Relaxed | How fast the AI moves through phases |
| Tone | Direct ↔ Encouraging | Critical feedback vs. supportive nudging |
| Structure | Rigid ↔ Flexible | Strict phase progression vs. freeform exploration |
| Research depth | Quick ↔ Exhaustive | Minutes of research vs. deep multi-agent dive |
| Formality | Casual ↔ Formal | "Hey let's plan this trip" vs. "Let us proceed with travel logistics" |
| Risk advice | Safe ↔ Aggressive | "Let's keep this conservative" vs. "Double down on this opportunity" |

### 7.3 Profile Storage

```typescript
interface PersonalityProfile {
  userId: string;
  // Global preferences
  global: {
    depth: 'shallow' | 'moderate' | 'deep';
    tone: 'direct' | 'balanced' | 'encouraging';
    pace: 'aggressive' | 'moderate' | 'relaxed';
    formality: 'casual' | 'balanced' | 'formal';
    researchDepth: 'quick' | 'balanced' | 'exhaustive';
  };
  // Per-category overrides
  perCategory: {
    [category: string]: Partial<PersonalityProfile['global']>;
  };
  // Learned patterns
  patterns: {
    completionRate: number; // 0-1
    phaseSkipFrequency: number;
    researchEngagement: number; // How often they drill into research
    challengeResponse: 'engaged' | 'resistant' | 'neutral';
  };
  updatedAt: string;
}
```

---

## 8. Monetization

### 8.1 Model — Freemium + Subscription

| Tier | Price | What you get |
|------|-------|-------------|
| **Free** | $0 | 2 plugins of choice, basic conversation, basic canvas |
| **LifeOS Pro** | $12/mo | All 10 plugins, full conversation depth, Ultraplan per plugin, deep research (parallel agents), full canvas, personality engine, export |
| **LifeOS Max** | $9/mo (annual $89/yr) | Everything Pro + unlimited plugins (custom categories), team sharing, priority AI speed, API access |

### 8.2 Rationale

- Free tier gives enough to hook users (aicofounder proved this: "first two phases alone convinced them")
- 2 plugins = they'll hit the ceiling and want more
- Pro at $12/mo is competitive with aicofounder ($25) but priced for broader life market
- Annual at $89/yr = $7.42/mo — easy upsell
- No per-project credits (aicofounder's model). Category-based usage is simpler for life use

### 8.3 Revenue Projection (Year 1)

| Metric | Conservative | Moderate | Aggressive |
|--------|-------------|----------|------------|
| Free users | 10,000 | 25,000 | 50,000 |
| Conversion to Pro | 3% | 5% | 8% |
| Pro subscribers | 300 | 1,250 | 4,000 |
| Annual revenue | $43,200 | $180,000 | $576,000 |
| Max subscribers | 30 (10%) | 187 (15%) | 800 (20%) |
| Max revenue | +$3,240/yr | +$20,000/yr | +$85,440/yr |

At moderate: ~$200K ARR in year 1. Doable with proper organic growth.

---

## 9. Roadmap

### v1.0 — AI Conversation Core (2 plugin MVP)

Timeline: 6-8 weeks

Deliverables:
- [ ] Conversation engine: AI that leads structured conversation (not checklist UI)
- [ ] 2 plugins with full aicofounder-style flow: **Travel OS** + **Finance OS**
- [ ] Phase structure per category (not generic)
- [ ] Basic canvas (documents + notes, Excalidraw or custom)
- [ ] Conversation memory (per-plugin and cross-plugin context window)
- [ ] Supabase persistence
- [ ] Free tier (2 plugins) + Pro tier (all 10)
- [ ] Stripe integration

**Success criteria:**
- User completes at least 3 phases in one plugin within first session
- User returns for second session within 48 hours
- NPS ≥ 40

### v1.1 — Personality Engine

Timeline: 4-6 weeks after v1.0

Deliverables:
- [ ] Personality engine (initial profile from conversation)
- [ ] Tone/depth adaptation per user
- [ ] Cross-category context awareness
- [ ] Ultraplan feature (identifies single biggest blocker)
- [ ] 5 more plugins (Health, Career, Fitness, Learning, Home)

### v1.2 — Canvas Expansion

Timeline: 4-6 weeks after v1.1

Deliverables:
- [ ] Full infinite canvas (colored sections, drag-and-drop, search)
- [ ] Canvas export (Markdown, PDF, plain text)
- [ ] Deep research (parallel AI agents, cited sources)
- [ ] 3 remaining plugins (Family, Social, Relationships)
- [ ] Team/collaboration (read-only sharing)

### v2.0 — Full Release

Timeline: 3-4 months from start

Deliverables:
- [ ] All 10 plugins with full AI conversation flows
- [ ] Personality engine fully operational across categories
- [ ] Cross-category intelligence (active recommendations)
- [ ] Mobile-responsive web app
- [ ] Public launch + marketing campaign
- [ ] Annual subscription ($89/yr)
- [ ] Admin dashboard + user analytics

---

## 10. Technical Architecture

### 10.1 Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js (React) | Same stack as Titan, shared components |
| Backend | Next.js API routes | Minimal initial backend, scales up |
| Database | Supabase (PostgreSQL) | Real-time sync, auth built-in |
| Auth | Supabase Auth | Email/password + OAuth (Google, Apple) |
| LLM | DeepSeek (primary) or Claude | Conversation engine, research agents |
| Canvas | Excalidraw (open source) or custom | Infinite visual workspace |
| Payments | Stripe | Subscriptions, free trial management |
| Hosting | Vercel | Same infra as Apifeny ecosystem |

### 10.2 Data Schema

```sql
-- Core tables
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id),
  personality JSONB DEFAULT '{}', -- PersonalityProfile type
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE plugin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  category TEXT NOT NULL,
  phase TEXT NOT NULL DEFAULT 'discover',
  state JSONB NOT NULL DEFAULT '{}', -- Full conversation state
  canvas JSONB DEFAULT '{}', -- Canvas content
  conversation_log JSONB[] DEFAULT '{}', -- Message history
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES plugin_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'ai', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}', -- Phase context, intent, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE canvas_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES plugin_sessions(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, -- 'document', 'note', 'link', 'section', 'decision'
  content JSONB NOT NULL,
  position JSONB DEFAULT '{}', -- x, y on canvas
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE personality_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  category TEXT,
  event_type TEXT NOT NULL, -- 'tone_preference', 'depth_change', 'phase_skip', 'challenge_response'
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 10.3 Conversation Engine Architecture

```
[User Message] → [Session Router] → [Phase Router]
                                         ↓
                              [Context Builder]
                              (personality profile + session history +
                               cross-category context)
                                         ↓
                              [LLM Call (DeepSeek/Claude)]
                              (system prompt = plugin phases + personality)
                                         ↓
                              [Response Parser]
                              (extracts actions: update canvas,
                               change phase, run research, store decision)
                                         ↓
                              [Action Executor]
                              (updates canvas, creates items,
                               triggers parallel research agents,
                               returns response to user)
```

### 10.4 Multi-Agent Research (Deep Research)

When a user asks about a topic (e.g., "Is Japan good in September?"):

```
[User Question] → [Research Orchestrator]
                      ↓
          ┌──────────┼──────────┐
     [Agent 1]   [Agent 2]   [Agent 3]
     Weather      Travel      Budget
     Data         Forums      Trends
          └──────────┼──────────┘
                      ↓
              [Synthesis Agent]
              (combines findings,
               cites sources,
               creates canvas section)
                      ↓
              [AI presents to user]
```

Each agent runs independently in parallel (like aicofounder's multi-agent research). Results are synthesized and presented with citations. All findings are added to the canvas as a "Research Report" section.

---

## 11. UI/UX — Key Screens

### 11.1 Home / Plugin Grid

Not a dashboard of checklists. A conversation launcher.

```
╔══════════════════════════════════════════════════════╗
║  🦊 LifeOS                       [Profile] [Settings] ║
║                                                       ║
║  "What area of your life would you like to work on?"   ║
║                                                       ║
║  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    ║
║  │ ✈️      │ │ 💰      │ │ 💪      │ │ 🏠      │    ║
║  │ Travel  │ │ Finance │ │ Fitness │ │ Home    │    ║
║  │ Active  │ │ Active  │ │         │ │         │    ║
║  └─────────┘ └─────────┘ └─────────┘ └─────────┘    ║
║  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    ║
║  │ 🩺      │ │ 💼      │ │ 📚      │ │ ❤️       │    ║
║  │ Health  │ │ Career  │ │ Learning│ │ Family  │    ║
║  └─────────┘ └─────────┘ └─────────┘ └─────────┘    ║
║  ┌─────────┐ ┌─────────┐                              ║
║  │ 🎉      │ │ 💑      │                              ║
║  │ Social  │ │ Relation│                              ║
║  └─────────┘ └─────────┘                              ║
╚══════════════════════════════════════════════════════╝
```

Active plugins show a status dot:
- 🟢 Actively in conversation / in-progress phase
- 🟡 Phase pending (user hasn't responded)
- ⚪ Not started / idle

### 11.2 Plugin View (Conversation + Canvas)

Split-screen layout:

```
╔══════════════════════════════════════════════════════════════════╗
║  ✈️ Travel OS  ─────────────────────────────────────────────────║
║  Phase: Plan  ●●●●○  (4/5 phases)                              ║
║  ┌─────────────────────────┐ ┌────────────────────────────────┐ ║
║  │ 💬 CHAT                  │ │ 📋 CANVAS                     │ ║
║  │                          │ │                                │ ║
║  │ AI: "Let's build your   │ │ ┌──────────────────┐           │ ║
║  │ itinerary. I found great │ │ │ 🎯 Trip Profile  │           │ ║
║  │ flight options for Oct  │ │ │ Destination: Japan│           │ ║
║  │ 12-24. Ready to review?" │ │ │ Budget: Medium   │           │ ║
║  │                          │ │ │ Duration: 12 days │           │ ║
║  │ You: "Show me the flights"│ │ └──────────────────┘           │ ║
║  │                          │ │ ┌──────────────────┐           │ ║
║  │ AI: [Presents 3 flight   │ │ │ 📊 Research Report│           │ ║
║  │ options with prices,     │ │ │ ───────────────│           │ ║
║  │ layovers, reviews]       │ │ │ Best months: Oct │           │ ║
║  │                          │ │ │ Avg temp: 20°C   │           │ ║
║  │ [Type your message...]   │ │ │ Budget: $3-5K    │           │ ║
║  └─────────────────────────┘ │ └──────────────────┘           │ ║
║                               │ ┌──────────────────┐           │ ║
║                               │ │ 📝 Notes         │           │ ║
║                               │ │ Must visit Kyoto │           │ ║
║                               │ │ Want to try sushi │           │ ║
║                               │ └──────────────────┘           │ ║
║                               │                                │ ║
║                               └────────────────────────────────┘ ║
╚══════════════════════════════════════════════════════════════════╝
```

### 11.3 Empty / First-Time State

```
╔══════════════════════════════════════════════════════╗
║  🦊 Welcome to LifeOS                                ║
║                                                       ║
║  "I'm your life copilot. I don't wait for you to      ║
║   tell me what to do — I ask. I challenge. I guide."  ║
║                                                       ║
║  "Let's start with a quick question:"                 ║
║                                                       ║
║  "What area of your life needs the most attention     ║
║   right now?"                                         ║
║                                                       ║
║  [Travel] [Finance] [Health] [Career] [I'll explore] ║
║                                                       ║
╚══════════════════════════════════════════════════════╝
```

---

## 12. Success Metrics

| Metric | Target | Why |
|--------|--------|-----|
| **DAU** | 20% of MAU | Engagement — users should want to talk daily |
| **Sessions per user per week** | 3+ | Return frequency — the AI should bring them back |
| **Average conversation length** | 8+ messages per session | Meaningful dialogue, not one-off questions |
| **Phase completion rate** | 40%+ of started phases | Indicators that the AI's guidance is useful |
| **Plugin completion rate** | 15%+ of activated plugins | Deep engagement across entire category |
| **Cross-category adoption** | 2+ categories per user | The platform value grows with breadth |
| **Time to first "aha"** | < 5 min | User should feel the AI-led magic quickly |
| **NPS** | 40+ | Users would recommend it (like aicofounder's 30k founders) |
| **Free → Pro conversion** | 5%+ | Monetization health |
| **Churn (monthly)** | < 8% | Long-term retention |

---

## 13. Open Questions (to resolve in v1.0 sprint)

1. **Canvas implementation**: Excalidraw (open source, battle-tested) vs. custom canvas (more control, more work)?
   - Gut: Excalidraw for v1.0. Custom for v2.0 if necessary.

2. **LLM choice**: DeepSeek (cheaper, faster) vs. Claude (better at structured conversation)?
   - Gut: DeepSeek for production, Claude for complex reasoning fallback.

3. **Mobile strategy**: Responsive web app vs. native mobile apps?
   - Gut: Responsive web app first. Reactive Native if traction warrants.

4. **Plugins beyond 10**: Should users be able to create custom plugins?
   - Gut: Not in v1.0. Plugin SDK for v2.0.

5. **Offline support**: Should the AI work without internet?
   - Gut: No. But canvas should cache locally for reading.

6. **Multi-user / shared plugins**: Family OS should allow multiple family members. How?
   - Gut: Shared project invites (like aicofounder's team collaboration). v1.2.

---

## 14. Comparison: Old LifeOS vs. New LifeOS

| Dimension | Old (v1 PRD) | New (v2 — THIS DOCUMENT) |
|-----------|--------------|--------------------------|
| Core mechanic | Checklist with 5 fixed phases per category | AI-led conversation with adaptive phases per category |
| AI role | Passive (user clicks checkboxes) | Active (AI leads, challenges, researches) |
| Canvas | Progress bars and task lists | Infinite visual workspace with documents, notes, links, sections |
| Phase structure | Same 5 phases for ALL categories (Research → Canvas → Build → Ship → Maintain) | Category-specific phases, adapted by AI based on what's needed |
| Cross-category | None | Personality engine connects categories intelligently |
| User experience | Check things off a list | Have a conversation with a coach |
| What users say | "I check boxes" | "It leads the conversation, not me" (aicofounder user quote) |
| Engagement loop | Optional, low-frequency | AI initiates, high-frequency return conversation |
| Monetization | Unclear | Clear freemium → Pro → Max model |

---

## Appendix A: aicofounder Features We're Directly Copying

| aicofounder Feature | LifeOS Equivalent |
|--------------------|-------------------|
| AI leads conversation | Core mechanic — every plugin conversation is AI-led |
| Persistent visual canvas | Per-plugin canvas with documents, notes, research, decisions |
| Structured phases | Category-adapted phases per plugin |
| Parallel research agents | Deep research mode within each plugin |
| Ultraplan (find single blocker) | Ultraplan feature — dedicated agent finding your life blocker |
| Challenges assumptions | Core AI behavior — not a yes-man |
| Sources everything with citations | Every claim links to real sources (Reddit, forums, studies)
| Content calendar | Future: cross-category action planning
| Team collaboration | Future: shared Family OS, shared goals
| Export (Markdown, PDF, ZIP) | Canvas export feature per plugin

---

## Summary: The Pivot in One Sentence

**Old LifeOS:** A checklist system where the user drives and the AI waits.

**New LifeOS:** An AI conversation system where the AI drives and the user responds.

This is the product Wosobu envisioned. This is the aicofounder model applied to life. This is what a personality-aware life copilot should be.

---

*Last updated: 2026-05-26 | v2.0 DRAFT*