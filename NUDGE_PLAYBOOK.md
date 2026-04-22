# NUDGE - Complete Strategy & Multi-Agent Build Plan

## 🎯 Executive Summary

**Product:** Nudge - A family task management app where you message a Telegram bot naturally, and it organizes tasks, assigns family members, and sends smart reminders until things get done.

**Tagline:** "Say it once. Nudge handles the rest."

**Target Users:** Anyone managing household tasks - busy parents, families with kids, roommates sharing responsibilities.

**Business Model:** Freemium SaaS
- Free: 1 user, 10 tasks/week
- Pro ($5/mo): Unlimited tasks, family sharing (5 members)
- Family ($9/mo): Unlimited members, analytics, priority support

**Timeline:** 4-6 weeks to v1 launch

**Your Role:** Product owner + QA tester (1-2 hrs/day)

**AI Agents Role:** Build everything, review each other's code

---

## 📱 Product Specification

### Core User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         NUDGE USER FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Mom opens Telegram                                          │
│     │                                                           │
│     ▼                                                           │
│  2. Messages @NudgeBot:                                         │
│     "Remind Jake to take out trash tonight"                     │
│     "Dad needs to call plumber tomorrow"                        │
│     "Buy milk"                                                  │
│     │                                                           │
│     ▼                                                           │
│  3. Bot parses & responds:                                      │
│     ✓ "Take out trash" → Jake → Tonight 8pm                     │
│     ✓ "Call plumber" → Dad → Tomorrow 9am                       │
│     ? "Buy milk" → "Is this for you or household?"              │
│     │                                                           │
│     ▼                                                           │
│  4. Tasks appear in Nudge dashboard (PWA)                       │
│     - Mom sees all tasks                                        │
│     - Jake sees his tasks                                       │
│     - Dad sees his tasks                                        │
│     │                                                           │
│     ▼                                                           │
│  5. Reminder sequence for Jake:                                 │
│     → 8pm: "Hey Jake! Time to take out the trash 🗑️"            │
│     → 9pm (not done): "Friendly nudge - trash still waiting!"   │
│     → 10pm (not done): "Last reminder tonight..."               │
│     → Next day: Notifies Mom "Jake didn't complete: trash"      │
│     │                                                           │
│     ▼                                                           │
│  6. Jake taps "Done ✓" in Telegram or Dashboard                 │
│     → Mom gets notified "Jake completed: Take out trash ✓"      │
│     → Jake's completion rate updates (gamification)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Feature List - v1 (MVP)

| Feature | Priority | Description |
|---------|----------|-------------|
| Telegram bot | P0 | Natural language task capture |
| Task parsing AI | P0 | Extract: task, assignee, due date from message |
| Clarification flow | P0 | Bot asks when info is missing |
| Web dashboard (PWA) | P0 | View/manage all tasks |
| User accounts | P0 | Sign up, login, family creation |
| Family invites | P0 | Invite members via link |
| Smart reminders | P0 | Escalating notifications via Telegram |
| Task completion | P0 | Mark done in Telegram or dashboard |
| Completion notifications | P0 | Notify task creator when done |
| Gamification | P1 | Show completion % per family member |
| Household tasks | P1 | Unassigned tasks anyone can grab |

### Feature List - v2 (Post-Launch)

| Feature | Description |
|---------|-------------|
| WhatsApp integration | Business API setup |
| Native iOS app | App Store submission |
| Native Android app | Google Play submission |
| Photo proof | Optional verification for tasks |
| Recurring tasks | "Every Monday take out trash" |
| Analytics dashboard | Task patterns, busy days, etc. |
| Slack integration | For roommates/work use case |

---

## 🏗️ Technical Architecture

### Tech Stack (Budget Optimized)

| Layer | Technology | Cost | Why |
|-------|------------|------|-----|
| Frontend | React 18 + TypeScript | Free | Industry standard, huge ecosystem |
| UI Framework | Tailwind CSS + shadcn/ui | Free | Fast styling, beautiful components |
| Mobile Wrapper | Capacitor | Free | Same code → PWA + iOS + Android |
| Backend | Supabase | Free tier | Database + Auth + Realtime + Edge Functions |
| AI (task parsing) | Claude 3.5 Haiku | ~$0.25/1M tokens | Cheap, fast, accurate |
| Bot Framework | grammY (Telegram) | Free | Best TypeScript Telegram library |
| Hosting | Vercel | Free tier | Auto-deploy, great DX |
| Domain | Any registrar | ~$12/year | nudge.app or similar |

**Total monthly cost until paying users: $0-5**
**After 1000 users: ~$20-50/month**

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      NUDGE ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   USERS                                                         │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐               │
│   │ Telegram │     │   PWA    │     │ iOS/And  │               │
│   │   Bot    │     │Dashboard │     │  (v2)    │               │
│   └────┬─────┘     └────┬─────┘     └────┬─────┘               │
│        │                │                │                      │
│        ▼                ▼                ▼                      │
│   ┌─────────────────────────────────────────────────┐          │
│   │              VERCEL EDGE FUNCTIONS              │          │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │          │
│   │  │ Telegram    │  │   API       │  │ Cron    │ │          │
│   │  │ Webhook     │  │  Routes     │  │ Jobs    │ │          │
│   │  └──────┬──────┘  └──────┬──────┘  └────┬────┘ │          │
│   └─────────┼────────────────┼──────────────┼──────┘          │
│             │                │              │                   │
│             ▼                ▼              ▼                   │
│   ┌─────────────────────────────────────────────────┐          │
│   │                 SUPABASE                        │          │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │          │
│   │  │PostgreSQL│  │   Auth   │  │   Realtime   │  │          │
│   │  │ Database │  │  (users) │  │ (live sync)  │  │          │
│   │  └──────────┘  └──────────┘  └──────────────┘  │          │
│   └─────────────────────────────────────────────────┘          │
│                         │                                       │
│                         ▼                                       │
│   ┌─────────────────────────────────────────────────┐          │
│   │              CLAUDE HAIKU API                   │          │
│   │         (Task parsing from natural language)    │          │
│   └─────────────────────────────────────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  display_name TEXT NOT NULL,
  telegram_chat_id BIGINT UNIQUE,
  telegram_username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Families/Households
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family membership
CREATE TABLE family_members (
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'admin' or 'member'
  nickname TEXT, -- "Dad", "Jake", etc.
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (family_id, user_id)
);

-- Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES profiles(id),
  assigned_to UUID REFERENCES profiles(id), -- NULL = household task
  due_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'overdue'
  reminder_count INT DEFAULT 0,
  last_reminder_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Task completion stats (for gamification)
CREATE TABLE completion_stats (
  user_id UUID REFERENCES profiles(id),
  family_id UUID REFERENCES families(id),
  total_assigned INT DEFAULT 0,
  total_completed INT DEFAULT 0,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  PRIMARY KEY (user_id, family_id)
);
```

---

## 🤖 Multi-Agent Architecture

### The Agent Team

```
┌─────────────────────────────────────────────────────────────────┐
│                    NUDGE AGENT TEAM                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌─────────────────┐                          │
│                    │   ORCHESTRATOR  │                          │
│                    │   (Claude Opus) │                          │
│                    │                 │                          │
│                    │ • Breaks down   │                          │
│                    │   requirements  │                          │
│                    │ • Assigns tasks │                          │
│                    │ • Final approval│                          │
│                    └────────┬────────┘                          │
│                             │                                   │
│           ┌─────────────────┼─────────────────┐                 │
│           │                 │                 │                 │
│           ▼                 ▼                 ▼                 │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│   │   FRONTEND   │ │   BACKEND    │ │   DATABASE   │           │
│   │    AGENT     │ │    AGENT     │ │    AGENT     │           │
│   │  (Gemini)    │ │  (Gemini)    │ │  (Gemini)    │           │
│   │              │ │              │ │              │           │
│   │ • React UI   │ │ • API routes │ │ • Schema     │           │
│   │ • Components │ │ • Telegram   │ │ • Migrations │           │
│   │ • Styling    │ │ • AI parsing │ │ • RLS rules  │           │
│   └──────┬───────┘ └──────┬───────┘ └──────┬───────┘           │
│          │                │                │                    │
│          └────────────────┼────────────────┘                    │
│                           │                                     │
│                           ▼                                     │
│                  ┌──────────────────┐                           │
│                  │  REVIEW AGENTS   │                           │
│                  ├──────────────────┤                           │
│                  │                  │                           │
│                  │ ┌──────────────┐ │                           │
│                  │ │   SECURITY   │ │                           │
│                  │ │   REVIEWER   │ │                           │
│                  │ │ (Claude Son) │ │                           │
│                  │ └──────────────┘ │                           │
│                  │                  │                           │
│                  │ ┌──────────────┐ │                           │
│                  │ │     QA       │ │                           │
│                  │ │   TESTER     │ │                           │
│                  │ │ (Claude Son) │ │                           │
│                  │ └──────────────┘ │                           │
│                  │                  │                           │
│                  │ ┌──────────────┐ │                           │
│                  │ │  CODE STYLE  │ │                           │
│                  │ │   REVIEWER   │ │                           │
│                  │ │ (Claude Hai) │ │                           │
│                  │ └──────────────┘ │                           │
│                  │                  │                           │
│                  └────────┬─────────┘                           │
│                           │                                     │
│                           ▼                                     │
│                  ┌──────────────────┐                           │
│                  │      YOU         │                           │
│                  │  (Final Review)  │                           │
│                  │                  │                           │
│                  │ • Test the app   │                           │
│                  │ • Approve/reject │                           │
│                  │ • Request changes│                           │
│                  └──────────────────┘                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Agent Cost Optimization

| Agent Role | Model | Cost | Usage |
|------------|-------|------|-------|
| Orchestrator | Claude Opus | $15/M tokens | Planning only (~5%) |
| Dev Agents | Gemini 2.5 Pro | FREE | Bulk coding (~70%) |
| Security Review | Claude Sonnet | $3/M tokens | Code review (~10%) |
| QA Tester | Claude Sonnet | $3/M tokens | Test generation (~10%) |
| Code Style | Claude Haiku | $0.25/M tokens | Linting (~5%) |

**Estimated build cost: $10-30 total** (mostly free via Gemini)

---

## 📋 Agent Prompts & Review Checklists

### ORCHESTRATOR AGENT PROMPT

```markdown
# Role: Nudge Project Orchestrator

You are the CTO/Tech Lead for building Nudge, a family task management app. Your job is to:

1. Break down the product requirements into specific technical tasks
2. Assign tasks to the appropriate dev agent (frontend, backend, database)
3. Review completed work from dev agents
4. Coordinate the review agents to check code quality
5. Make final go/no-go decisions

## Project Context
- Product: Nudge - Telegram bot + PWA for family task management
- Tech Stack: React + TypeScript, Supabase, Vercel, Telegram Bot (grammY)
- Timeline: 4-6 weeks
- Quality Bar: Production-ready, secure, performant

## Your Decision Framework

When assigning tasks:
- Frontend Agent: UI components, pages, styling, client-side logic
- Backend Agent: API routes, Telegram bot handlers, AI integration
- Database Agent: Schema design, migrations, RLS policies, queries

When reviewing work:
- Does it match the specification?
- Is the code clean and maintainable?
- Are there obvious bugs or security issues?
- Does it integrate properly with other components?

## Communication Style
- Be specific and technical
- Include file paths and function names
- Reference the product spec when clarifying requirements
- Escalate blockers to the human immediately

## Current Sprint
[ORCHESTRATOR: Update this section with current tasks]
```

### FRONTEND AGENT PROMPT

```markdown
# Role: Nudge Frontend Developer

You are a senior frontend developer building the Nudge PWA dashboard.

## Tech Stack
- React 18 with TypeScript (strict mode)
- Tailwind CSS for styling
- shadcn/ui component library
- Capacitor for PWA/native builds
- Supabase JS client for data fetching
- React Query for server state

## Code Standards

### File Structure
```
src/
├── components/
│   ├── ui/          # shadcn components
│   └── features/    # feature-specific components
├── pages/           # route pages
├── hooks/           # custom hooks
├── lib/             # utilities, supabase client
├── types/           # TypeScript interfaces
└── styles/          # global styles
```

### Component Pattern
```typescript
// Always use this pattern for components
import { FC } from 'react'

interface TaskCardProps {
  task: Task
  onComplete: (id: string) => void
}

export const TaskCard: FC<TaskCardProps> = ({ task, onComplete }) => {
  // Component logic
}
```

### Rules
1. NEVER use `any` type - always define proper interfaces
2. All components must be responsive (mobile-first)
3. Use React Query for all data fetching
4. Handle loading and error states for every async operation
5. All user-facing text must be clear and friendly
6. Accessibility: proper ARIA labels, keyboard navigation

## Current Task
[ORCHESTRATOR: Insert specific task here]

## Definition of Done
- [ ] Component renders without errors
- [ ] TypeScript compiles with no errors
- [ ] Responsive on mobile (375px) and desktop (1280px)
- [ ] Loading and error states handled
- [ ] Passes accessibility check
```

### BACKEND AGENT PROMPT

```markdown
# Role: Nudge Backend Developer

You are a senior backend developer building the Nudge API and Telegram bot.

## Tech Stack
- Vercel Edge Functions (serverless)
- Supabase (PostgreSQL + Auth + Realtime)
- grammY (Telegram Bot framework)
- Claude Haiku API (task parsing)
- TypeScript (strict mode)

## Code Standards

### File Structure
```
api/
├── telegram/
│   └── webhook.ts       # Telegram webhook handler
├── tasks/
│   ├── create.ts        # Create task
│   ├── complete.ts      # Mark complete
│   └── list.ts          # List tasks
├── families/
│   ├── create.ts        # Create family
│   └── invite.ts        # Generate invite
└── lib/
    ├── supabase.ts      # Supabase client
    ├── telegram.ts      # Telegram bot setup
    └── ai.ts            # Claude API wrapper
```

### API Pattern
```typescript
// All API routes follow this pattern
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const body = await req.json()
    
    // Validate input
    // Process request
    // Return response
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Telegram Bot Pattern
```typescript
// Task parsing with Claude
async function parseTaskMessage(message: string): Promise<ParsedTask> {
  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 500,
    system: `You parse task messages and extract structured data.
    Return JSON only: { task, assignee, dueDate, needsClarification, clarificationQuestion }`,
    messages: [{ role: 'user', content: message }]
  })
  
  return JSON.parse(response.content[0].text)
}
```

### Rules
1. NEVER expose API keys in client-side code
2. ALWAYS validate and sanitize user input
3. Use Supabase RLS - never trust client-side auth alone
4. Rate limit all endpoints (especially AI calls)
5. Log errors with context for debugging
6. Handle Telegram webhook failures gracefully

## Current Task
[ORCHESTRATOR: Insert specific task here]
```

### DATABASE AGENT PROMPT

```markdown
# Role: Nudge Database Engineer

You are a senior database engineer designing and maintaining the Nudge database.

## Tech Stack
- Supabase (PostgreSQL 15)
- Row Level Security (RLS) required for ALL tables
- TypeScript types auto-generated from schema

## Standards

### Schema Rules
1. All tables need `created_at` timestamp with default
2. Use UUID for all primary keys
3. Foreign keys must have ON DELETE behavior defined
4. Add indexes for frequently queried columns
5. Use ENUM types sparingly - prefer TEXT with check constraints

### RLS Pattern
```sql
-- EVERY table needs RLS enabled
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Users can only see tasks in their family
CREATE POLICY "Users see own family tasks" ON tasks
  FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members 
      WHERE user_id = auth.uid()
    )
  );

-- Users can only create tasks in their family
CREATE POLICY "Users create in own family" ON tasks
  FOR INSERT
  WITH CHECK (
    family_id IN (
      SELECT family_id FROM family_members 
      WHERE user_id = auth.uid()
    )
  );
```

### Migration Pattern
```sql
-- migrations/001_initial_schema.sql
-- Always include rollback comments

-- UP
CREATE TABLE families (...);

-- DOWN (for reference)
-- DROP TABLE families;
```

## Security Checklist
- [ ] RLS enabled on ALL tables
- [ ] No public SELECT without policy
- [ ] Service role key NEVER exposed to client
- [ ] Sensitive columns excluded from public API
- [ ] Indexes on foreign keys

## Current Task
[ORCHESTRATOR: Insert specific task here]
```

### SECURITY REVIEWER AGENT PROMPT

```markdown
# Role: Nudge Security Reviewer

You review all code for security vulnerabilities before it goes to production.

## Your Checklist

### Authentication & Authorization
- [ ] All API routes check authentication
- [ ] RLS policies are correctly implemented
- [ ] No privilege escalation possible
- [ ] Session handling is secure
- [ ] Password requirements enforced (if applicable)

### Input Validation
- [ ] All user input is validated
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (proper escaping)
- [ ] File upload restrictions (if applicable)
- [ ] Rate limiting on sensitive endpoints

### Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] HTTPS enforced
- [ ] API keys not exposed in client code
- [ ] No sensitive data in logs
- [ ] PII handled according to GDPR basics

### Telegram-Specific
- [ ] Webhook validates Telegram signature
- [ ] Bot token not exposed
- [ ] User IDs validated before actions
- [ ] No sensitive data in bot messages to wrong users

### Third-Party
- [ ] Dependencies are up to date
- [ ] No known vulnerabilities in packages
- [ ] API keys rotated and stored securely

## Review Output Format
```
## Security Review: [Component Name]

### Critical Issues (MUST FIX)
- [Issue description + file:line + fix recommendation]

### High Priority
- [Issue description + file:line + fix recommendation]

### Medium Priority
- [Issue description + file:line + fix recommendation]

### Low Priority / Suggestions
- [Issue description + file:line + fix recommendation]

### Passed Checks
- [List of security checks that passed]
```

## Current Code to Review
[ORCHESTRATOR: Insert code here]
```

### QA TESTER AGENT PROMPT

```markdown
# Role: Nudge QA Tester

You write and run tests, and manually verify features work correctly.

## Testing Strategy

### Unit Tests (Vitest)
- All utility functions
- React hooks
- Data transformations
- AI response parsing

### Integration Tests
- API endpoints
- Database operations
- Supabase RLS policies

### E2E Tests (Playwright)
- Critical user flows
- Authentication
- Task creation → completion cycle

## Test File Pattern
```typescript
// __tests__/parseTask.test.ts
import { describe, it, expect } from 'vitest'
import { parseTaskMessage } from '@/lib/ai'

describe('parseTaskMessage', () => {
  it('extracts task, assignee, and due date', async () => {
    const result = await parseTaskMessage(
      "Remind Jake to take out trash tonight"
    )
    
    expect(result.task).toBe('Take out trash')
    expect(result.assignee).toBe('Jake')
    expect(result.dueDate).toContain('tonight')
  })
  
  it('asks for clarification when assignee missing', async () => {
    const result = await parseTaskMessage("Buy milk")
    
    expect(result.needsClarification).toBe(true)
    expect(result.clarificationQuestion).toContain('who')
  })
})
```

## Manual Test Checklist for Nudge v1

### Telegram Bot
- [ ] Bot responds to /start command
- [ ] Bot parses simple task: "Remind me to call mom"
- [ ] Bot parses task with assignee: "Jake needs to do homework"
- [ ] Bot asks clarification for ambiguous tasks
- [ ] Bot confirms task creation
- [ ] Bot sends reminders at correct times
- [ ] Bot handles "done" replies
- [ ] Bot works with multiple users in same family

### Dashboard (PWA)
- [ ] Sign up flow works
- [ ] Login flow works
- [ ] Create family works
- [ ] Invite link generation works
- [ ] Joining via invite works
- [ ] Task list displays correctly
- [ ] Can mark task complete from dashboard
- [ ] Completion stats update
- [ ] Responsive on mobile
- [ ] Can install as PWA

### Edge Cases
- [ ] Empty task message handled
- [ ] Very long task message handled
- [ ] Special characters in task
- [ ] Past due date handled
- [ ] User not in any family handled
- [ ] Network error during task creation
- [ ] Concurrent task updates

## Bug Report Format
```
## Bug: [Short description]

**Severity:** Critical / High / Medium / Low
**Steps to Reproduce:**
1. 
2. 
3. 

**Expected:** 
**Actual:** 
**Screenshot/Log:** [if applicable]
**Suggested Fix:** [if known]
```
```

### CODE STYLE REVIEWER AGENT PROMPT

```markdown
# Role: Nudge Code Style Reviewer

You ensure code is clean, consistent, and maintainable.

## Standards

### TypeScript
- No `any` types
- Explicit return types on functions
- Interfaces over types for objects
- Consistent naming: camelCase for variables, PascalCase for components

### React
- Functional components only
- Custom hooks for reusable logic
- Props interfaces defined above component
- No inline styles - use Tailwind classes

### File Organization
- One component per file
- Files named same as default export
- Related files grouped in folders
- Index files for clean imports

### Code Quality
- Functions under 50 lines
- No commented-out code
- Meaningful variable names
- Comments explain "why" not "what"

## Review Output Format
```
## Code Style Review: [Component Name]

### Must Fix
- [Issue + file:line + example fix]

### Should Fix
- [Issue + file:line + example fix]

### Nitpicks (Optional)
- [Issue + file:line + suggestion]

### Good Patterns Observed
- [List of good practices found]
```
```

---

## 🗓️ Build Sequence (Sprint Plan)

### Week 1: Foundation

| Day | Agent | Task | Your Review |
|-----|-------|------|-------------|
| 1 | Database | Create Supabase project, initial schema | Check tables exist |
| 1 | Backend | Set up Vercel project, environment vars | Check deployment works |
| 2 | Database | RLS policies for all tables | Security review |
| 2 | Frontend | Project setup, routing, auth pages | Check pages load |
| 3 | Backend | Supabase auth integration | Test signup/login |
| 3 | Frontend | Login/signup UI | Test flows work |
| 4 | Backend | Telegram bot basic setup | Send test message |
| 4 | Backend | Webhook endpoint | Bot responds to /start |
| 5 | All | Integration testing | Full auth flow works |

### Week 2: Core Features

| Day | Agent | Task | Your Review |
|-----|-------|------|-------------|
| 1 | Database | Tasks table, family tables | Check schema |
| 1 | Backend | Claude Haiku integration | Test parsing |
| 2 | Backend | Task parsing from Telegram | Test various messages |
| 2 | Backend | Clarification flow | Test ambiguous tasks |
| 3 | Frontend | Dashboard layout | Visual check |
| 3 | Frontend | Task list component | Shows test data |
| 4 | Backend | Create task API | Tasks save to DB |
| 4 | Frontend | Connect to real API | Tasks appear |
| 5 | All | Integration | Create task via Telegram → see in dashboard |

### Week 3: Family & Reminders

| Day | Agent | Task | Your Review |
|-----|-------|------|-------------|
| 1 | Backend | Family creation API | Test create |
| 1 | Frontend | Family creation UI | Flow works |
| 2 | Backend | Invite link generation | Links work |
| 2 | Frontend | Join family flow | Can join |
| 3 | Backend | Reminder cron job | Test reminders send |
| 3 | Backend | Escalating reminder logic | Timing correct |
| 4 | Backend | Completion notifications | Creator notified |
| 4 | Frontend | Mark complete UI | Button works |
| 5 | All | Full flow test | Complete user journey |

### Week 4: Polish & Gamification

| Day | Agent | Task | Your Review |
|-----|-------|------|-------------|
| 1 | Database | Completion stats table | Schema correct |
| 1 | Backend | Stats calculation | Numbers accurate |
| 2 | Frontend | Stats display | Shows percentages |
| 2 | Frontend | Household tasks UI | Can claim tasks |
| 3 | Frontend | Mobile responsive fixes | Test on phone |
| 3 | Frontend | PWA manifest, icons | Can install |
| 4 | All | Security review | Run full checklist |
| 4 | All | QA test all flows | Bug fixes |
| 5 | All | Performance check | Load times acceptable |

### Week 5: Launch Prep

| Day | Agent | Task | Your Review |
|-----|-------|------|-------------|
| 1 | Backend | Error handling polish | No ugly errors |
| 1 | Frontend | Empty states, loading | Looks good |
| 2 | Frontend | Onboarding flow | Clear for new users |
| 2 | Backend | Rate limiting | Abuse prevention |
| 3 | All | Final QA round | Bug hunt |
| 4 | - | Apple Developer Account | You sign up |
| 4 | Frontend | App Store assets | Icons, screenshots |
| 5 | - | Submit to App Store | You submit |

### Week 6: Buffer & Android

| Day | Agent | Task | Your Review |
|-----|-------|------|-------------|
| 1-2 | - | Address App Store feedback | If rejected |
| 3 | Frontend | Android build | Test on Android |
| 4 | - | Submit to Google Play | You submit |
| 5 | - | LAUNCH 🚀 | Celebrate |

---

## 👤 Your Daily Workflow

### Morning (30 min)
1. Check agent overnight work in Claude Squad
2. Review any completed PRs
3. Run the app, test new features
4. Note bugs or issues

### Evening (30-60 min)
1. Review agent code summaries
2. Approve/reject completed work
3. Answer any agent questions
4. Set next tasks for overnight

### Your Commands Cheat Sheet
```bash
# Start your agent squad
cs

# View all running agents
# (Use keyboard shortcuts in Claude Squad UI)

# Check agent status
# Press 's' in Claude Squad

# View diff of changes
# Press 'd' in Claude Squad

# Approve and merge
# Press 'm' in Claude Squad
```

### What to Look For (Non-Technical Review)

Since you're vibe-coding, here's what you CAN evaluate:

**Does it work?**
- Click every button - does something happen?
- Fill every form - does it submit?
- Does the right data appear in the right place?

**Does it feel right?**
- Is the app fast or sluggish?
- Are error messages helpful?
- Is it obvious what to do next?

**Does it look right?**
- Is text readable?
- Do buttons look clickable?
- Does it work on your phone?

**If something feels wrong, tell the agent:**
> "When I click X, nothing happens. Expected Y to happen."
> "This page takes 5 seconds to load. That's too slow."
> "I don't understand what this button does."

The agents will debug. You just report what you see.

---

## 💰 Cost Breakdown

### One-Time Costs
| Item | Cost |
|------|------|
| Domain name (nudge.app or similar) | ~$12-50 |
| Apple Developer Account | $99/year |
| Google Play Developer Account | $25 one-time |
| **Total one-time** | **~$136-175** |

### Monthly Costs (Pre-Revenue)
| Item | Cost |
|------|------|
| Vercel | Free tier |
| Supabase | Free tier |
| Claude API (building) | ~$10-30 total |
| Claude Pro subscription (for you) | $20/month |
| **Total monthly** | **~$20-30** |

### Monthly Costs (With Users)
| Users | Supabase | Claude API | Vercel | Total |
|-------|----------|------------|--------|-------|
| 100 | Free | ~$5 | Free | ~$5 |
| 1,000 | Free | ~$20 | Free | ~$20 |
| 10,000 | $25 | ~$100 | $20 | ~$145 |

### Revenue Projections
| Users | Free | Pro ($5) | Family ($9) | Monthly Revenue |
|-------|------|----------|-------------|-----------------|
| 100 | 70 | 20 | 10 | $190 |
| 500 | 350 | 100 | 50 | $950 |
| 1,000 | 700 | 200 | 100 | $1,900 |

**Break-even: ~50 paying users**

---

## ✅ Launch Checklist

### Before Public Launch
- [ ] All critical bugs fixed
- [ ] Security review passed
- [ ] Privacy policy page added
- [ ] Terms of service page added
- [ ] Error tracking set up (Sentry free tier)
- [ ] Basic analytics added (Vercel Analytics free)
- [ ] Tested with 3+ real family members
- [ ] Payment integration (Stripe) - if launching paid

### App Store Submission
- [ ] App icons (1024x1024)
- [ ] Screenshots (iPhone, iPad)
- [ ] App description written
- [ ] Keywords chosen
- [ ] Privacy policy URL
- [ ] Support URL (can be your email)
- [ ] Age rating questionnaire
- [ ] Pricing set (free with IAP)

### Google Play Submission
- [ ] Feature graphic (1024x500)
- [ ] Screenshots (phone, tablet)
- [ ] Short description (80 chars)
- [ ] Full description (4000 chars)
- [ ] Content rating questionnaire
- [ ] Data safety questionnaire

---

## 🆘 Troubleshooting Guide

### "Agent is stuck in a loop"
Tell it: "Stop. Summarize what you've tried. What's blocking you?"
Then either: Give it a hint, or skip to different task.

### "App won't start"
1. Check Vercel deployment logs
2. Check Supabase is running
3. Check environment variables set
4. Ask agent to check error logs

### "Bot doesn't respond"
1. Check Telegram webhook is set
2. Check Vercel function logs
3. Verify bot token is correct
4. Ask agent to add debug logging

### "Database error"
1. Check Supabase dashboard for errors
2. Verify RLS policies aren't blocking
3. Check if tables exist
4. Ask database agent to verify schema

### "I'm confused by the code"
That's okay! Ask the agent:
> "Explain what this file does in simple terms"
> "Why did you make this decision?"
> "What would break if we changed X?"

---

## 🔗 Cross-Orchestra Synergy Rules

**Every orchestra must check the shared knowledge base and other orchestras' progress every time it works. Actively look for synergy opportunities and share useful outputs (content, listings, data, features) with the relevant other orchestras automatically.**

### Nudge's Specific Connections:
- **→ Directory Beast:** Creates task templates from directory maintenance and updates
- **→ KidScan Beast:** Creates safety-related task reminders and child activity tracking
- **→ Social Beast:** Creates content scheduling and promotion tasks
- **→ Affiliate Beast:** Creates affiliate link tracking and revenue monitoring tasks
- **→ AppFactory Beast:** Creates development and deployment task templates

### Integration Opportunities:
1. **Task Templates:** Create reusable task templates from other orchestras' workflows
2. **Reminder Systems:** Implement smart reminders for directory updates, social posts, etc.
3. **Family Coordination:** Use Directory Beast data for family activity planning
4. **Safety Checklists:** Integrate KidScan safety guidelines into task requirements
5. **Revenue Tracking:** Monitor affiliate performance through task completion tracking

## 🚀 Next Steps

1. **Today:** Set up your development environment
   - Install Node.js
   - Install Claude Squad
   - Create Supabase account
   - Create Vercel account
   - Create Telegram bot via @BotFather

2. **Tomorrow:** Start Week 1, Day 1
   - Give this document to your Orchestrator agent
   - Begin database setup
   - Check other orchestras for task template ideas

3. **This week:** Complete foundation sprint
   - Auth working
   - Bot responding
   - Basic UI loading
   - Implement cross-orchestra task sharing

---

## 📎 Appendix: Environment Setup Commands

### Windows (Your Machine)

```powershell
# Install Node.js (download from nodejs.org)
# Then open PowerShell:

# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Install Gemini CLI
npm install -g @google/gemini-cli

# Authenticate
claude auth login
gemini auth login

# Install Claude Squad (Windows)
# Option 1: WSL (recommended)
wsl --install
# Then in WSL:
curl -fsSL https://raw.githubusercontent.com/smtg-ai/claude-squad/main/install.sh | bash

# Option 2: Direct Windows (if available)
# Check https://github.com/smtg-ai/claude-squad for Windows release
```

### Create Telegram Bot

1. Open Telegram, search for @BotFather
2. Send: `/newbot`
3. Choose name: `Nudge`
4. Choose username: `YourNudgeBot` (must end in 'bot')
5. Save the token (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Create Supabase Project

1. Go to supabase.com
2. Sign up / Log in
3. "New Project"
4. Name: `nudge`
5. Generate password (save it!)
6. Region: closest to you
7. Save the URL and anon key from Settings → API

### Create Vercel Project

1. Go to vercel.com
2. Sign up with GitHub
3. "New Project"
4. Import from GitHub (we'll create repo first)
5. Environment variables (add later):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `ANTHROPIC_API_KEY`

---

**Document Version:** 1.0
**Last Updated:** Based on interview completed today
**Status:** Ready for execution

---

*This plan was designed for a vibe-coder building their first real product. The multi-agent system handles the technical complexity while you focus on testing and product decisions. Trust the review agents, test everything yourself, and ship when it feels right.*

*Good luck with Nudge! 🚀*
