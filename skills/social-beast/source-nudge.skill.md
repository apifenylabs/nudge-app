# Skill: source-nudge

**Goal:** Pull feature/tip/insight content from the Nudge family task management project and output standardized DataSource items. Falls back to rich built-in feature content if Nudge source files aren't available.

**Input:**
- `maxItems` (number, optional): Max items to return. Default: 6
- `projectDir` (string, optional): Path to Nudge project directory. Default: `workspace/nudge/`

**Steps:**
1. Load built-in feature/tip/insight items (always available)
2. If Nudge project README.md exists, extract roadmap items and feature comparison table rows
3. Merge extracted data into the feature pool
4. Shuffle and pick up to `maxItems` items
5. Map each to the DataSource interface
6. Return DataSource array

**Output:**
- `items` (DataSource[]): Standardized data source items (types: feature, tip, insight)

**Content Types:**
- `feature`: Concrete Nudge capabilities (Voice, Telegram Bot, NLP, Dashboard, etc.)
- `tip`: Lifehack-style advice for busy parents (2-minute standup, gamification, etc.)
- `insight`: Deeper observations (family overhead costs, UX philosophy, upcoming roadmap)

**Dependencies:**
- schemas.md (DataSource interface)
- Nudge project at `workspace/nudge/` (optional — reads README.md for enrichment)
