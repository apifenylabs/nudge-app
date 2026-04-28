# Skill: publish-twitter

**Goal:** Publish content items to Twitter/X via API v2.

**Input:**
- `item` (ContentItem): Content item to publish
- `credentials` (object): Twitter API credentials
  - `apiKey` (string): Twitter API key
  - `apiSecretKey` (string): Twitter API secret key
  - `accessToken` (string): Twitter access token
  - `accessTokenSecret` (string): Twitter access token secret

**Steps:**
1. Check if item.platforms includes 'twitter'. If not, skip.
2. If item has `thread` array, publish as a thread:
   - Post tweet 1, capture its ID
   - Post each subsequent tweet as a reply to the previous
3. Else, post as single tweet (item.content)
4. Log result with URL
5. Handle rate limiting (3 tweets per 15 min window)

**Output:**
- `result` (PublishLogEntry): Publish log entry with status and URL

**Dependencies:**
- schemas.md (ContentItem, PublishLogEntry interfaces)
