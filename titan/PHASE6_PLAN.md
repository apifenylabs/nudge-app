# Phase 6 — God-Tier & Robotics Hooks

**Status:** PLANNED  
**Owner:** God-Tier Engine Agent  
**Target:** P4 Strategic — Low cost, minimal package installs, existing deps only  

---

## 1. God-Tier Mode

### Visual Prestige Unlocks (at Level 30+)

| Level Threshold | Unlock | Description |
|---|---|---|
| **Level 30** | God-Tier Aura | Agent body gains a persistent golden aura (radial gradient pulse `#F59E0B` → `#14B8A6` halo) |
| **Level 30** | Crown Badge | Level badge transforms into crown icon (`👑`) with golden particle sparkle |
| **Level 30** | Premium Orbital Ring | Outer orbit ring upgrades to solid golden line with shimmer animation |
| **Level 40** | Double Halo | Two concentric glowing rings (teal outer, golden inner) |
| **Level 40** | God-Tier Emoji | Agent emoji replaced with unique god-tier variant (e.g., `🌀` → `🌌`) |
| **Level 50** | Ascended Form | Agent size scales up 15%, extra particle burst on idle, unique animation curve |

### Special Abilities

- **God-Tier Command** — issue a single voice/text command and up to 5 orbiting agents execute it simultaneously
- **Soulbound Skill** — one skill becomes bound to the agent; it can never be lost or overwritten
- **Aura Pressure** — nearby agents in the swarm get +10% XP gain bonus
- **Timelord** — agent can run cron/BAU schedules (requires Phase 3 BAU engine, already live)

### God-Tier UI Components Needed

| Component | File | Status |
|---|---|---|
| `GodTierAura` overlay (golden radial gradient) | `src/components/molecules/GodTierAura.tsx` | ✅ **BUILT** |
| God-Tier unlock modal/celebration screen | `src/components/organisms/GodTierModal.tsx` | ✅ **BUILT** |
| Level 30+ crown badge on `Badge` component | `src/components/ui/badge.tsx` | ✅ **BUILT** — golden gradient, crown glow animation |
| God-Tier toggle in `MascotDisplay` | `src/components/molecules/MascotDisplay.tsx` | ✅ **BUILT** — aura + modal both integrated |

### Existing Assets That Support God-Tier

- `src/components/molecules/AnimatedStatCounter.tsx` — can show God level stats
- `src/components/Agent3D.tsx` — already supports `tier` prop (1/2/3), tier 3 = god tier
- `src/lib/persistence.ts` — XP/level already persisted
- Progression system (`page.tsx` lines ~200-350) — level-up toast and achievement system already exists

---

## 2. Robotics Hooks

### Vision
"Deploy Your Agent to Any Robot" — Titan agents should be deployable to physical hardware platforms:
- **ROS2** — Robot Operating System: deploy agents as ROS2 nodes
- **Arduino** — Microcontroller: flash skill logic to ESP32/Arduino boards
- **Raspberry Pi** — Deploy agent as a systemd service on RPi
- **Custom Hardware** — Generic webhook/gRPC bridge for any robot

### API Endpoints Needed

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/robotics/deploy` | POST | Deploy an agent to a target hardware platform |
| `/api/robotics/status` | GET | Get deployment status / hardware health |
| `/api/robotics/logs` | GET | Stream logs from deployed robot agent |
| `/api/robotics/command` | POST | Send ad-hoc command to deployed robot agent |

### UI Pages Needed

| Page | File | Status |
|---|---|---|
| Robotics Landing ("Deploy Your Agent") | `src/app/robotics/page.tsx` | **BUILD FIRST** — hero, feature cards, CTA |
| Robotics Dashboard (manage deployments) | `src/app/robotics/dashboard/page.tsx` | ✅ **BUILT** (May 27) — deploy/remove/status/refresh, modal, empty state, stats row |
| Platform Detail (per-platform setup guide) | `src/app/robotics/[platform]/page.tsx` | **NEEDS BUILD** |

### Robotics Data Model

```typescript
interface RobotDeployment {
  id: string;
  platform: 'ros2' | 'arduino' | 'raspberry-pi' | 'custom';
  agentId: string;
  agentName: string;
  status: 'pending' | 'active' | 'error' | 'disconnected';
  endpoint?: string;  // hardware URL or serial port
  deployedAt: string;
  lastHeartbeat: string;
  config: Record<string, any>;
}
```

---

## 3. Current Project Analysis

### What Already Exists ✓

| Area | Details |
|---|---|
| **UI Framework** | Next.js 16, React 19, Framer Motion, shadcn/ui, Tailwind v4 |
| **Design System** | `globals.css` with full Titan token set (teal `#14B8A6`, golden `#F59E0B`, navy `#0F172A`, card `#1E2937`) |
| **Dashboard** | Game view with orbiting agents, level badges, XP bar, moltbook feed |
| **Agent System** | `MascotDisplay` with 3D support (`Agent3D.tsx`), tier levels, level-up toasts, color-tinted auras |
| **Skill Forge** | Code editor, skill templates, save/run skills, mock audits |
| **BYO Page** | `src/app/byo/page.tsx` — enterprise manifest upload flow with progress scanning |
| **Swarm** | Orbit visualization, orchestration configurator, swarm save/load |
| **LifeOS** | `LifeOSTab.tsx`, `LifeOSAnalytics.tsx`, plugins/analytics libs |
| **Persistence** | `src/lib/persistence.ts` — localStorage save/load for XP, skills, feed, audits, orchestrations |
| **God-Tier Engine** | `src/lib/swarm/god-tier-engine.ts` — exists but needs content |
| **3D Agents** | `Agent3D.tsx` with `tier` prop (supports god-tier visual variants) |

### What Needs Building ✗

| Area | Details | Priority |
|---|---|---|
| **God-Tier Aura component** | `GodTierAura.tsx` — golden radial gradient with pulse animation | P4 |
| **God-Tier Modal** | Level 30+ celebration modal with particle burst | P4 |
| **Crown Badge** | Update badge component for level 30+ | P4 |
| **Robotics Landing Page** | `src/app/robotics/page.tsx` — hero + feature cards + CTA | **P4 (first)** |
| **Robotics Dashboard** | Deployment management UI | P4 |
| **Robotics API endpoints** | `/api/robotics/*` route handlers | P4 |
| **Robotics lib** | `src/lib/robotics/` — deploy, status, command primitives | P4 |
| **God-Tier Engine logic** | Fill in `src/lib/swarm/god-tier-engine.ts` with actual unlock logic | P4 |

---

## 4. Implementation Roadmap

### Phase 6a — Robotics Landing (NOW)

| # | File | Action |
|---|---|---|
| 1 | `PHASE6_PLAN.md` | **THIS DOCUMENT** — plan spec |
| 2 | `src/app/robotics/page.tsx` | **BUILD** — robotics landing page with hero, feature cards, CTA |

### Phase 6b — God-Tier Visuals

| # | File | Action |
|---|---|---|
| 3 | `src/components/molecules/GodTierAura.tsx` | **BUILD** — golden radial gradient overlay with framer-motion pulse |
| 4 | Update `MascotDisplay.tsx` | **EDIT** — integrate GodTierAura for level >= 30 |
| 5 | `src/components/organisms/GodTierModal.tsx` | **BUILD** — celebration modal with particles |

### Phase 6c — Robotics Backend

| # | File | Action |
|---|---|---|
| 6 | `src/lib/robotics/types.ts` | **BUILD** — TypeScript types for robotics |
| 7 | `src/lib/robotics/deploy.ts` | **BUILD** — deployment logic (mock + real) |
| 8 | `src/app/api/robotics/deploy/route.ts` | **BUILD** — POST endpoint |
| 9 | `src/app/api/robotics/status/route.ts` | **BUILD** — GET endpoint |

### Phase 6d — Robotics Full UI

| # | File | Action |
|---|---|---|
| 10 | `src/app/robotics/dashboard/page.tsx` | **BUILD** — deployment management |
| 11 | `src/app/robotics/[platform]/page.tsx` | **BUILD** — per-platform setup guide |

### Phase 6e — God-Tier Engine

| # | File | Action |
|---|---|---|
| 12 | Fill `src/lib/swarm/god-tier-engine.ts` | **EDIT** — actual god-tier unlock logic, ability checks |
| 13 | Link god-tier to progression system | **EDIT** — add god-tier check in page.tsx level-up listener |
| 14 | Update landing page with god-tier badge for returning players | **EDIT** |

---

## File-by-File Implementation Details

### File: `src/app/robotics/page.tsx`
- **Components**: Client component (`"use client"`), Framer Motion, Lucide icons
- **Sections**: 
  1. Hero section with gradient titan-text-gradient headline + subtitle
  2. Feature cards grid (2x2 desktop, 1x1 mobile) — ROS2, Arduino, Raspberry Pi, Custom
  3. Each card: icon + platform name + 2-line description + "Learn More" hover state
  4. A "Connect Hardware" CTA button with teal/golden gradient
  5. Animated stats row (devices online, agents deployed, commands issued)
  6. Particle background consistent with main page
- **Design tokens**: `bg-[#0F172A]`, `text-[#F1F5F9]`, `border-[#334155]`, teal `#14B8A6`, golden `#F59E0B`
- **Animations**: fade-in on scroll, card hover scale 1.03, staggered entrance

### File: `src/app/robotics/dashboard/page.tsx`
- Table/card list of active robot deployments
- Status badges (pending/active/error/disconnected)
- "Deploy New Agent" FAB button

### File: `src/app/api/robotics/deploy/route.ts`
- Accepts `POST` with `{ agentId, platform, endpoint? }`
- Returns `{ deploymentId, status, message }`
- Initially mock implementation

---

## Risk Register

| Risk | Mitigation |
|---|---|
| Robotics hardware integration is complex | Start with mock/UI-first approach; real hardware integration deferred |
| God-tier visual changes may feel gimmicky | Tie to real XP/achievement system; user must earn it |
| Package bloat | No new npm deps needed; framer-motion, lucide-react, and shadcn already installed |
| Robotics page may not match ecosystem aesthetic | Reuse exact same CSS classes and animation patterns from main page |
