# Skill: publish-telegram

**Goal:** Publish content items to a Telegram channel via Bot API.

**Input:**
- `item` (ContentItem): Content item to publish
- `credentials` (object): Telegram bot credentials
  - `botToken` (string): Telegram bot token
  - `channelId` (string): Target channel ID (e.g., `@yourchannel` or numeric ID)
- `parseMode` (string, optional): `MarkdownV2` or `HTML`. Default: `MarkdownV2`

**Steps:**
1. Check if item.platforms includes 'telegram'. If not, skip.
2. Format content with Telegram-compatible markdown/HTML
3. If content exceeds 4096 characters, split into multiple messages
4. Send via Bot API `sendMessage` endpoint
5. Log result

**Output:**
- `result` (PublishLogEntry): Publish log entry with status

**Dependencies:**
- schemas.md (ContentItem, PublishLogEntry interfaces)
