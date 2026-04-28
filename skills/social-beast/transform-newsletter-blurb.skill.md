# Skill: transform-newsletter-blurb

**Goal:** Convert a DataSource item into a 100-word newsletter excerpt.

**Input:**
- `source` (DataSource): Source item to transform

**Steps:**
1. Extract title, description, url, tags from source
2. Write 80-120 word excerpt:
   - Opening: Hook with the title/name
   - Middle: Key insight or reason it matters (2-3 sentences)
   - Closing: Teaser + link
3. Keep under 120 words

**Output:**
- `item` (ContentItem): ContentItem with format `newsletter-blurb`, platforms `['email']`

**Dependencies:**
- schemas.md (DataSource, ContentItem interfaces)
