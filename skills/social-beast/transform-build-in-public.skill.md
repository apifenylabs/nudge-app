# Skill: transform-build-in-public

**Goal:** Convert a milestone DataSource item into a behind-the-scenes personal brand narrative.

**Input:**
- `source` (DataSource): DataSource item of type `milestone`

**Steps:**
1. Extract milestone type, title, details from source
2. Determine narrative angle based on type:
   - `revenue`: Numbers breakdown, what worked, what didn't
   - `launch`: Launch story, challenges, timeline
   - `users`: Growth story, retention tips
   - `lesson`: Failure/lesson narrative, how you pivoted
   - `tech`: Technical deep dive, why this stack
3. Write 3-5 paragraph narrative with:
   - Emotional hook (the struggle)
   - The decision/action
   - The outcome
   - The lesson learned
4. End with a forward-looking statement
5. Include 2-3 relevant hashtags

**Output:**
- `item` (ContentItem): ContentItem with format `build-in-public`, platforms `['twitter', 'telegram']`

**Dependencies:**
- schemas.md (DataSource, ContentItem interfaces)
