# Skill: transform-tiktok-script

**Goal:** Convert a DataSource item into a 30-60 second TikTok script outline.

**Input:**
- `source` (DataSource): Source item to transform

**Steps:**
1. Extract title, description, url, tags, images from source
2. Structure a 30-60 second video script:
   - Hook (0-3s): Grab attention in first 3 seconds
   - Setup (3-15s): What/where this is
   - Content (15-45s): Key details, visuals to show
   - CTA (45-60s): Call to action (link in bio, comment, follow)
3. Note visual cues for each segment
4. Keep under 600 characters total (script length, not caption)

**Output:**
- `item` (ContentItem): ContentItem with format `tiktok-script`, platforms `['tiktok']`

**Dependencies:**
- schemas.md (DataSource, ContentItem interfaces)
