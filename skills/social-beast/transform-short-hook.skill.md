# Skill: transform-short-hook

**Goal:** Convert a DataSource item into a 1-2 sentence tweet with link (Twitter/X Short Hook).

**Input:**
- `source` (DataSource): Source item to transform

**Steps:**
1. Extract title, description, url, tags, type from source
2. Craft a 1-2 sentence hook that grabs attention
3. For `destination` type: lead with the name + emotional benefit
4. For `feature` type: lead with "we just shipped" or "now live"
5. For `milestone` type: lead with the number/achievement
6. Append URL at the end
7. Add 1 relevant hashtag
8. Keep under 280 characters (Twitter limit)

**Output:**
- `item` (ContentItem): ContentItem with format `short-hook`, platforms `['twitter']`

**Dependencies:**
- schemas.md (DataSource, ContentItem interfaces)
