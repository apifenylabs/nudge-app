# Skill: publish-linkedin

**Goal:** Publish content items to LinkedIn via REST API.

**Input:**
- `item` (ContentItem): Content item to publish
- `credentials` (object): LinkedIn API credentials
  - `accessToken` (string): LinkedIn OAuth access token
  - `authorId` (string): LinkedIn author URN (e.g., `urn:li:person:{id}`)

**Steps:**
1. Check if item.platforms includes 'linkedin'. If not, skip.
2. Create LinkedIn article/post payload:
   - `commentary`: item.content
   - `visibility`: PUBLIC
3. Post to LinkedIn API `rest/posts` endpoint
4. Log result with post URL

**Output:**
- `result` (PublishLogEntry): Publish log entry with status and URL

**Dependencies:**
- schemas.md (ContentItem, PublishLogEntry interfaces)
