# Skill: transform-story-thread

**Goal:** Convert a DataSource item into a 3-5 tweet thread (Twitter/X Story Thread).

**Input:**
- `source` (DataSource): Source item to transform

**Steps:**
1. Extract title, description, url, tags, type, metadata from source
2. Create 3-5 tweets in sequence:
   - Tweet 1: Hook — compelling opening with the core insight
   - Tweet 2: Details — expand on the story/experience
   - Tweet 3: Practical takeaway — tips, numbers, or actionable advice
   - Tweet 4 (optional): Personal angle or parent story excerpt
   - Tweet 5 (optional): CTA with URL
3. Each tweet under 280 characters
4. Number each tweet (1/N, 2/N, etc.)

**Output:**
- `item` (ContentItem): ContentItem with format `story-thread`, platforms `['twitter']`, thread array

**Dependencies:**
- schemas.md (DataSource, ContentItem interfaces)
