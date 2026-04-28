# Skill: transform-telegram-deep-dive

**Goal:** Convert a DataSource item into rich text deep dive for a Telegram channel.

**Input:**
- `source` (DataSource): Source item to transform

**Steps:**
1. Extract title, description, url, tags, metadata from source
2. Build rich Telegram-formatted message:
   - Bold title with emoji
   - Short intro paragraph
   - Bullet points with key features/tips
   - Optional: parent story excerpt (if available)
   - Divider and CTA with link
3. Use Telegram-compatible formatting (MarkdownV2 or HTML)
4. Keep under 4096 characters (Telegram message limit)

**Output:**
- `item` (ContentItem): ContentItem with format `telegram-deep-dive`, platforms `['telegram']`

**Dependencies:**
- schemas.md (DataSource, ContentItem interfaces)
