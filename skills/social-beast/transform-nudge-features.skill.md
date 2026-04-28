# Skill: transform-nudge-features

**Goal:** Convert Nudge DataSource items (feature, tip, insight) into lifehack-style social posts with 3 variants.

**Input:**
- `source` (DataSource): A Nudge item with `type` = `feature`, `tip`, or `insight`
- `opts.dateStr` (string): Date string for content hashing
- `opts.variant` (string, optional): Force a specific variant:
  - `tip` — Short productivity advice (Twitter + Telegram)
  - `highlight` — Feature capability showcase (Twitter + Telegram + LinkedIn)
  - `story` — Relatable "day in the life" narrative (Telegram + LinkedIn)

**Variant Selection (auto):**
- `feature` type → `highlight` variant
- `tip` type → `tip` variant
- `insight` type → `story` variant

**Steps:**
1. Validate source (requires title)
2. Determine variant (auto or forced)
3. Build post content based on variant template
4. Return ContentItem with appropriate platform targets

**Output:**
- `content` (ContentItem): Formatted social post with platform targeting

**Dependencies:**
- schemas.md (ContentItem interface)
