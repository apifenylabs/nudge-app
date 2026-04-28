# Skill: transform-linkedin-insight

**Goal:** Convert a DataSource item into a professional 2-3 paragraph LinkedIn post.

**Input:**
- `source` (DataSource): Source item to transform

**Steps:**
1. Extract title, description, url, tags, type, metadata from source
2. Craft a professional-angle post:
   - Paragraph 1: Insight hook — what makes this relevant/interesting professionally
   - Paragraph 2: Details — data points, research, or experience-backed insight
   - Paragraph 3: Call to action / reflection question
3. Add 3-5 relevant hashtags
4. No emoji in LinkedIn (keep it professional)

**Output:**
- `item` (ContentItem): ContentItem with format `linkedin-insight`, platforms `['linkedin']`

**Dependencies:**
- schemas.md (DataSource, ContentItem interfaces)
