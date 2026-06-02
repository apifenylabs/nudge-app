# Luke Builds AI — J.A.R.V.I.S. System Reverse Engineering

**Source:** @lukebuildsai (Instagram/YouTube)
**Date saved:** 2026-06-02
**Saved by:** Wosobu — for Apifeny direction

## Core Architecture

### 1. Jarvis = Orchestrator Manager
- User only talks to Jarvis
- Understands *outcome*, routes to specialist agents
- Follows up, unblocks, escalates, returns results
- Acts as CEO of the AI team

### 2. Specialized Agent Team
- **Bobby** — Business/growth
- **Tom** — Engineering/developer (reads code, fixes bugs, opens PRs)
- **Sarah** — Customer support
- **Eva** — Content operations
- **Scout** — Research & monitoring

Each agent: clear role + personality + specific tools + memory/context + comms rules.

### 3. Slack = Operating System / Runtime
- Dedicated channels per domain (#dev, #content, #growth, #support)
- Agents post updates, @mention each other, hand off tasks, create threads
- Persistent memory + natural collaboration + easy human oversight
- Support issue → auto becomes engineering task

### 4. Agentic Harness Components
- Tools: GitHub, search, email, calendar, code execution
- Memory: shared context
- Instructions: role + rules
- Communication: Slack channels
- Approval gates: human sign-off on important actions

## Monetization Path to $30k MRR
1. Internal leverage → 10x output
2. Productize setup guide + email course
3. High-ticket CEO deployments via Azaris.ai (7-9 figure CEOs)
4. Content flywheel → authority + leads

## Replication Blueprint

### Phase 1: Personal Jarvis
1. Define team (start 3-5 specialists)
2. Slack as OS
3. Hybrid memory: structured files + vector store + Slack context
4. Tech stack: Claude + LangGraph/CrewAI, Slack Bolt SDK, GitHub + web tools

### Key Insight
"Product doesn't exist until someone downloads it. The README is the product (for open-source). The wow must happen in 30 seconds. Sell the harness (memory), not the model."
