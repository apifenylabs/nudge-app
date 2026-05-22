<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:scope-before-code -->
# 🔭 Scope Before Code — Titan Coding Discipline

Adapted from vibe-coding-science principles. This rule applies to **every** coding session.

## Golden Rule: Plan first, code second

**Before touching any file**, write a one-paragraph scope plan:
- What am I trying to accomplish? (1 sentence)
- Which files need to change? (list them)
- What could go wrong? (risks, broken deps, regressions)
- What env/API/credentials must exist? (explicitly state)

## The 5-Step Flow

1. **SKILL.md check** — Am I following a skill? Read it first.
2. **Read before write** — Read the target file(s) before editing. Never edit blind.
3. **State assumptions** — List what you expect to be true. If the file doesn't match, stop and reassess.
4. **Minimum viable change** — Change only what's needed. No refactors, no scope creep, no reorganizing unrelated code in the same edit.
5. **Build & verify** — Always run `npm run build` after changes. If it fails, fix the build error immediately before declaring done.

## When Things Go Wrong

- Build fails → read the actual error output, don't guess
- Schema/type mismatch → read the type definition, don't cast blindly
- Edge case found → stop, write the edge case in the scope plan, then handle it
- Multi-step work → complete one step fully before starting the next (no parallel incomplete changes)

## What This Replaces

The old pattern of "jump in, edit, discover it broke, fix, discover new break" is dead. Scope-first means:
- Fewer debug cycles
- Cleaner git diffs
- Faster time-to-deploy

---
_This file is loaded as project context on every session. Follow it._
