# LifeOS — Product Requirements Document (PRD)
**Version**: 1.0  
**Status**: DRAFT  
**Owner**: Alpha (AI Agent)  
**Project**: Strategic Priority #1 (Protected 30% Bucket)  
**Supersedes**: aicofounder (LifeOS replaces and generalizes it)

---

## 1. Vision

LifeOS is a **personality-aware copilot** that guides users through structured phases for every area of life. It replicates aicofounder's guided-phase approach (research → canvas → build → ship → maintain), but generalizes it as a plugin-based system for **every life category** — not just business/founder use cases.

The goal: **one dashboard to orchestrate your entire life** — travel, family, finance, health, career, fitness, learning, and more — with the same AI-guided rigor that aicofounder applies to startups.

---

## 2. Core Architecture

### 2.1 Plugin System

LifeOS is a plugin registry. Each plugin = one life category. Each plugin has:

- **Identity**: ID, name, emoji, description, color
- **5 guided phases**: Research → Canvas → Build → Ship → Maintain
- **Tasks per phase**: 5-15 tasks each (incremental, actionable, distinct)
- **Progress tracking**: Per-phase bar + overall % complete
- **State persistence**: localStorage instant + Supabase async (dual-write)

### 2.2 Phase Definitions

| Phase | Purpose | Example (Travel) |
|-------|---------|-----------------|
| **Research** 🔍 | Learn, assess, scout | Map destinations, read reviews, set budget |
| **Canvas** 🎨 | Design, plan, organize | Build itinerary, mark must-see spots |
| **Build** 🔧 | Execute, book, create | Book flights, create offline guide |
| **Ship** 🚀 | Launch, deploy, share | Share plan with group, final checks |
| **Maintain** 🔄 | Review, iterate, sustain | Post-trip review, update saved spots |

### 2.3 Category Inventory (v1.0)

| # | Category | Name | Status |
|---|----------|------|--------|
| 1 | Travel | Travel OS | ✅ Built |
| 2 | Family | Family OS | ✅ Built |
| 3 | Luxury Travel | Luxury OS | ✅ Built |
| 4 | EV | EV OS | ✅ Built |
| 5 | Senior | Senior OS | ✅ Built |
| 6 | Kids | Kids OS | ✅ Built |
| 7 | Social | Social OS | ✅ Built |
| 8 | Finance | Finance OS | ✅ Built |
| 9 | Health | Health OS | ✅ Built |
| 10 | Career | Career OS | ✅ Built |
| 11 | Learning | Learning OS | ✅ Built |
| 12 | Fitness | Fitness OS | ✅ Built |
| 13 | Business | Business OS | 🔜 v1.1 |
| 14 | Home | Home OS | 🔜 v1.1 |
| 15 | Relationships | Relationships OS | 🔜 v1.1 |

---

## 3. Feature Specifications

### 3.1 Guided Phase Flow (MVP — ✅ SHIPPED v0.59)

Each plugin displays its 5 phases as expandable cards. Each card shows:
- Phase name + emoji + progress %
- Progress bar (animated fill)
- Task list (each = clickable checkbox)
- "Continue Phase" button (auto-selects next incomplete task)

Clicking a task = mark complete → recalculate phase progress → recalculate overall plugin progress → add entry to Titan BAU feed.

### 3.2 Plugin Catalog

Grid of available plugins at the top of the LifeOS tab. Each card shows:
- Emoji + name
- Active/badge state
- Description
- "5 phases" indicator
- Click to activate and open

### 3.3 XP Integration (v0.60+)

Every LifeOS action must feed the Titan progression system:
- Complete a task → +10 XP (small, frequent)
- Complete a phase → +50 XP bonus
- Complete a plugin → +200 XP + achievement unlock "Life Master"

The XP integration requires:
- LifeOS state to be shared with Titan's progression system (same localStorage key or React context)
- `grantXp()` / `grantTask()` callbacks from the parent dashboard

### 3.4 ROI Integration (v1.1)

Each task completion estimates time/money saved:
- Travel task saved: ~$value based on affiliate data
- Finance task saved: ~$value based on expense data
- Health task saved: ~$value based on prevented costs

Wired into Titan's ROI tab for a unified earnings view.

---

## 4. Persistence Strategy

### 4.1 Current State (v0.59-v0.60)

- **localStorage only** — all plugin state saves locally
- Key: `titan-lifeos-state`
- Structure: `{ plugins: LifeOSPlugin[], totalActions: number, unlockedCategories: string[] }`

### 4.2 Target State (v1.0)

Dual-write architecture:
1. **On load**: Try Supabase first → fall back to localStorage
2. **On write**: Write to localStorage (instant) → queue Supabase write (async)
3. **Sync callback**: UI can subscribe to Supabase sync status
4. **Migration**: Existing localStorage data is imported on first Supabase connect

### 4.3 Supabase Schema

```sql
CREATE TABLE IF NOT EXISTS lifeos_plugins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  category TEXT NOT NULL,
  state JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lifeos_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plugin_id UUID REFERENCES lifeos_plugins(id) ON DELETE CASCADE,
  phase TEXT NOT NULL,
  task_id TEXT NOT NULL,
  label TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS lifeos_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  plugin_category TEXT NOT NULL,
  action_type TEXT NOT NULL,
  phase TEXT NOT NULL,
  xp_granted INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. UI/UX Requirements

### 5.1 Plugin Detail View

Each active plugin opens in a detailed view showing:
- Header: Emoji + name + description + overall progress %
- Large overall progress bar (animated gradient fill)
- 5 phase cards, each containing:
  - Phase label + emoji + progress bar
  - Task list with checkable items
  - Description text for each task
  - "Continue Phase" CTA button

### 5.2 Plugin Grid (Active)

Display all active plugins in a compact grid (2-5 columns depending on screen):
- Emoji + name
- 5-dot phase progress indicator (green = done, gradient = partial, dim = not started)
- Overall progress % text
- Click to set as active detail view

### 5.3 Plugin Catalog (Available)

Full grid of all available plugins (not yet activated):
- Emoji + name + description
- "Active" badge if already activated
- Click to activate (starts at Research phase, first task)

### 5.4 Empty State

When no plugins are active: centered empty state with:
- Puzzle icon (large, dimmed)
- "No plugins active" heading
- "Activate a LifeOS plugin to get started with guided phases" subtext
- "Browse Plugin Catalog" CTA button

---

## 6. Integration Points

### 6.1 With Titan Dashboard

- LifeOS is a **tab** in the Titan dashboard (LifeOS tab, between Swarm and Audit)
- LifeOS actions feed the **BAU feed** (each task completion adds an entry)
- LifeOS actions grant **XP** to the progression system
- LifeOS ROI estimates feed the **ROI tab**
- Agent evolution tier notification: "Complete a plugin to evolve your agent!"

### 6.2 With AI Directory (apifeny-ai)

- Each LifeOS category links to the corresponding Apifeny AI directory
- Tasks can reference external tools/services in the Apifeny ecosystem
- Cross-promotion: "Need more on this? Visit Apifeny AI for {category} guides"

### 6.3 With Revenue Systems

- Travel OS tasks → affiliate links to booking sites
- Finance OS tasks → referral links to financial products
- Health OS tasks → sponsored content opportunities
- EV OS tasks → charging station affiliate partnerships

---

## 7. Roadmap

### v0.59 (✅ SHIPPED)
- Plugin catalog with 12 categories
- Phase-based guided cycles (5 phases per plugin)
- Task completion (click to mark done)
- Per-plugin progress tracking
- localStorage persistence

### v0.60 (✅ SHIPPED)
- XP integration scaffold (action counter feeds BAU)
- Agent evolution tier awareness
- View-switch pill coexistence

### v0.61 — Polish & Depth (🔜 THIS SESSION)
- "Keep basic look" evolution toggle
- 5 orbiting agents on landing page
- Hover particle burst animation
- 20+ tasks per plugin (deeper phases)

### v0.62 — Supabase Persistence
- Dual-write architecture (localStorage + Supabase)
- Migration SQL for LifeOS tables
- Sync status indicator
- Import from localStorage → Supabase on first connect

### v0.63 — Task Depth Expansion
- Expand all 12 plugins to 8-12 tasks per phase (from current 3-5)
- Add task dependency chains (must complete phase 1 to unlock phase 2)
- Task difficulty levels (easy/medium/hard, different XP rewards)

### v0.64 — Phase Scoring & Analytics
- Score per phase based on completion + depth
- Time tracking per task (how long since activated)
- Plugin-level analytics: completed %, tasks done, time active
- Heat map showing most active categories

### v0.65 — Shared Context / Personality Awareness
- LifeOS remembers user preferences across categories
- "You tend to spend more time in Research — here's a shortcut"
- Suggests next plugin based on usage patterns
- Cross-category insights: "You're planning travel AND budgeting — here's a combined plan"

### v1.0 — Full Think / Launch
- Personality-aware copilot that suggests next actions without being asked
- Integration with all 12 Apifeny AI directory sites
- Email/Telegram push notifications for task reminders
- Public profile: share your LifeOS progress as a portfolio
- Multi-user: family plans, shared categories

---

## 8. Technical Architecture

### 8.1 File Structure
```
titan-app/
  src/
    lib/
      lifeos/
        plugins.ts        -- Plugin engine (categories, phases, tasks, persistence)
        supabase-sync.ts   -- Supabase dual-write integration (v0.62)
        analytics.ts       -- Phase scoring and usage tracking (v0.64)
    components/
      LifeOSTab.tsx        -- Main LifeOS tab component (current)
```

### 8.2 State Flow
```
User clicks task → completeTask() [plugins.ts]
  → Update localStorage (instant)
  → Queue Supabase write (async)
  → Return updated plugin state
  → UI re-renders with new progress bars
  → BAU feed updated (parent callback onFeedAdd)
  → XP granted (parent callback grantXp)
```

### 8.3 Error Handling
- If Supabase write fails → log error, keep local state (eventual consistency)
- If localStorage is corrupted → reset to defaults
- If plugin state is missing → fall back to catalog definition for fresh start

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Plugins activated per user | 3+ | LifeOS state count |
| Tasks completed per session | 5+ | Action counter |
| Time spent in LifeOS | 2+ min/session | Session tracking |
| Phase completions | 1+ per week | Phase state |
| Plugin completion rate | 25% of activated | Overall progress = 100% |
| Cross-category usage | 2+ categories | Unique categories used |
| XP contributed to Titan | 20%+ of total | XP ratio |

---

## 10. Open Questions

1. **User identity**: Should LifeOS require login, or stay anonymous via localStorage?
   - Answer (v0.59-v0.60): anonymous via localStorage. Auth comes in v1.0.
2. **Plugin depth**: Should phases auto-expand when previous completes?
   - Answer (v0.59): No — manual progression. Auto-unlock comes in v0.63.
3. **Cross-plugin dependencies**: Should completing Finance OS tasks affect Travel OS budget?
   - Answer: v1.1 feature — personality awareness.
4. **Mobile support**: Should LifeOS have a standalone mobile view?
   - Answer: Mobile-responsive within Titan dashboard. Standalone = v1.0.

---

## Appendix A: Plugin Definitions (Current)

Each plugin has 5 phases × currently 3-5 tasks. Phase definitions:

```
Research  → "Learn the lay of the land"
Canvas    → "Design your approach"
Build     → "Make it real"
Ship      → "Launch and share"
Maintain  → "Keep it running"
```

See `src/lib/lifeos/plugins.ts` for full task definitions per plugin.

## Appendix B: aicofounder Parity Checklist

- [x] Guided phases per category
- [x] Task-level interactivity (click to complete)
- [x] Progress tracking with visual bars
- [x] Multi-category support
- [ ] Market research integration (link to real data)
- [ ] Canvas visualization (drag-and-drop org)
- [ ] Execution tracking with deadlines
- [ ] Privacy mode (local-only vault)
- [ ] Cross-category recommendations
- [ ] AI suggestion engine (personality-aware)

Items without checkbox = v1.0+ features.
