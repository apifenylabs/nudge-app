# Consolidation Procedure (Run nightly at 23:00 HKT)
# Backup runs at 23:30 HKT

## Purpose
Self-improvement loop: review today's sessions and make the system smarter so Chris never deals with the same issue twice.

---

## Procedure (run in order)

### Step 1: Read today's session data
- Read today's `memory/YYYY-MM-DD.md`
- Review recent cron outcomes: `openclaw cron runs ceo-consolidation-primary`

### Step 2: Identify improvements
For each day, identify:

a) **Bottlenecks** — anything that needed Chris. Add to bottleneck log.
b) **Patterns** — recurring requests, questions, or frustrations Chris expresses
c) **Prompt improvements** — instructions in RULES.yaml, SOUL.md, or AGENTS.md that were unclear or incomplete
d) **Knowledge gaps** — things the system didn't know that would have helped

### Step 3: Implement (additive only)
For each finding, make ONE minimal improvement:
- Update a file in `~/life/` (add new knowledge)
- Add a rule to RULES.yaml (only in the appropriate section)
- Update USER.md or SOUL.md (better context)

### Step 4: Log
Write to `~/life/consolidation-log.md`:

```
## YYYY-MM-DD Consolidation
Files modified: [list]
Improvements made: [list]
Bottlenecks logged: [list]
```

### Step 5: Verify (backup only)
Check if `consolidation-log.md` has today's entry from the primary run.
If yes, skip. If no, run full procedure.

---

## Initial consolidation-log.md (create if missing)

```
# Consolidation Log
First entry: 2026-05-16
```
