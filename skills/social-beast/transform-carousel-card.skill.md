# Skill: transform-carousel-card

**Goal:** Convert a DataSource item into Instagram carousel text (text-only, image gen is Phase 2).

**Input:**
- `source` (DataSource): Source item to transform

**Steps:**
1. Extract title, description, url, tags, images from source
2. Create 3-5 carousel slides:
   - Slide 1: Title slide — name + enticing subtitle
   - Slide 2: Key details — what makes it special (3 bullet points)
   - Slide 3: Practical tips — actionable advice
   - Slide 4 (optional): Parent take or personal story
   - Slide 5 (optional): Call to action + swipe up prompt
3. Each slide is text-only (images to be generated in Phase 2)
4. Format as "Slide 1/5: ...", "Slide 2/5: ..." etc.
5. Include 1 relevant hashtag per slide

**Output:**
- `item` (ContentItem): ContentItem with format `carousel-card`, platforms `['instagram']`

**Dependencies:**
- schemas.md (DataSource, ContentItem interfaces)
