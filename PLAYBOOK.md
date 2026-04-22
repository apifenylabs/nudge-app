# PLAYBOOK.md - Full Strategy & Processes (Master Document)

**Core Mission**
- Build autonomous agent orchestras that generate revenue with minimal human input.
- Short-term: Get first revenue from app creation / prototyping.
- Medium-term: Run multiple orchestras (Social Beast, App Factory, Trading).
- Long-term: Package and sell the entire orchestra setup as a product/platform.

**Priority Order**
1. App creation / prototyping (higher monetization potential)
2. Social content automation (easier to test and validate)
3. Trading signals / automation (later)

**LLM Tiered Strategy (Cost Control)**
- Default / Routine / Worker tasks → DeepSeek-chat (cheapest)
- Coding / technical tasks → DeepSeek or Kimi
- Review / reasoning / quality → Claude Sonnet (your $20 plan)
- High-stakes CEO decisions → Opus (only with explicit user approval)

**Token & Cost Rules**
- Always report exact token usage and estimated cost in every report.
- Flag any action estimated >$10 as "needs approval".
- Daily budget target: <$1 until we have consistent revenue.
- Compact memory aggressively every 4k tokens.

**Validation First (Solopreneur AI SaaS Playbook)**
- Never build before validating demand (Reddit mining, interviews, pre-sell).
- Use 72-hour validation method before any major development.

**Daily Heartbeat Rules**
- Every 30 minutes: Check tasks, run low-cost actions, compact memory.
- Daily at 20:00 HK time: Send revenue/progress report with cost, time spent, and tiered approval section.

**Orchestra Structure (Target)**
- CEO (Captain) – Strategy, cost control, high-level decisions
- Product Owner – Validation, requirements, prioritization
- Coder – Implementation using DeepSeek/Kimi
- Reviewer / QA – Quality check using Sonnet
- Researcher – App Factory Researcher (micro-SaaS analysis)
- Tester – Quality assurance and testing
- Worker Agents – Routine tasks (content, research, posting)

**App Factory Researcher Integration**
- **Role:** App Factory Researcher (micro-SaaS analysis)
- **Mission:** Identify, analyze, and extract blueprints from successful niche apps
- **Weekly Budget:** $0.10 (DeepSeek-chat)
- **Output:** YAML analyses in `/home/captain/.openclaw/workspace/app-factory/research/`
- **Cadence:** Monday-Sunday research schedule
- **Escalation:** Apps scoring 9+ replicability AND 8+ synergy become "kill app" candidates

This playbook is the single source of truth. Always reference it before making decisions.

## PART 5: APPLE‑LEVEL UI/UX PRINCIPLES (Non‑negotiable)

**Philosophy:** Design is how it works. Beauty is not cosmetic – it builds trust, reduces friction, and creates emotional loyalty.

### Mandatory Design Rules for All Generated Interfaces

#### 1. **Clarity over cleverness**
- Every screen has a single, obvious primary action
- No hidden gestures; standard patterns only (bottom nav, swipe back)
- Typography: SF Pro, Inter, or system fonts only – no decorative fonts

#### 2. **Delight in details**
- Micro‑interactions: buttons scale slightly on tap (0.95 transform)
- Smooth transitions: 200‑300ms ease‑out for all state changes
- Haptic feedback on critical actions (payment, delete, confirm)

#### 3. **Whitespace is a material**
- Minimum 16px padding on all sides
- Line height: 1.5 for body text, 1.2 for headings
- Maximum content width: 800px (centered)

#### 4. **Accessibility as default**
- Contrast ratio ≥ 4.5:1 for all text
- Touch targets ≥ 44x44pt
- Support dynamic type (system font scaling)

#### 5. **Consistent visual language**
- Rounded corners: 12px for cards, 24px for modals
- Shadows: subtle (0 2px 8px rgba(0,0,0,0.05))
- Icons: SF Symbols or Feather – consistent stroke width

#### 6. **Performance is part of UX**
- First paint < 1.5 seconds
- No layout shift (CLS < 0.1)
- Images lazy‑loaded with blur‑up preview

### Implementation for OpenClaw

- **Landing pages:** Must pass a “design audit” checklist before deployment
- **Apps:** Must use a proven component library (shadcn/ui, Radix, or similar) with custom styling to match brand
- **Agents:** When generating CSS/HTML, they must include comments referencing these principles

### Design Review (Human Touch)

You will review all major UI milestones:
- Landing page draft (10 min)
- Core app screens (30 min per major screen)
- Any deviation from principles must be documented in GitHub issue with justification.
