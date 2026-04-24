# Social Beast — Directory Publisher

Automated social media posting for the Family Travel Directory (29 destinations).

Pulls a random destination from the directory and posts to Twitter/X + Telegram.

## Quick Start

```bash
# Dry run — one random destination (preview only)
node publish-directory.js --dry-run

# Dry run — all 29 destinations (writes preview file)
node publish-directory.js --dry-run --all

# Live — one random destination (actually posts)
node publish-directory.js

# Live — all 29 destinations (posts all)
node publish-directory.js --all
```

## Output

| Flag | Behavior |
|------|----------|
| (none) | Posts 1 random destination to Twitter + Telegram |
| `--dry-run` | Shows what would be posted without sending anything |
| `--all` | Processes all 29 destinations |
| `--dry-run --all` | Writes full preview to `publish-all-preview.txt` |

## Post Format

### Twitter/X (plain text)
```
🏖️ Tokyo Disneyland — Tokyo, Japan
The ultimate family destination with classic Disney magic.
🧒 Best for ages: 3-12
⭐ Safety: 4.9/5
💰 Price: $$$
Read the full parent review ➡️ family-travel-directory.vercel.app/destination/tokyo-001
```

### Telegram (HTML)
Same content with `<b>`, `<a>` tags for rich formatting.

## Logging

Every run appends to `publish-log.txt` with timestamps, platform, status, and destination info.

## TODO: Real API Integration

The `postToTwitter()` and `postToTelegram()` functions in `publish-directory.js` are placeholders that `console.log()`. Replace them with real API calls.

### Twitter/X API v2

```js
const { TwitterApi } = require("twitter-api-v2");
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});
await client.v2.tweet(content);
```

### Telegram Bot API

```js
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: TELEGRAM_CHANNEL_ID,
    text: content,
    parse_mode: "HTML",
    disable_web_page_preview: false,
  }),
});
```

### Image posting

For Twitter, you can attach the destination image:

```js
const mediaId = await client.v1.uploadMedia(dest.imageUrl);
await client.v2.tweet({ text: content, media: { media_ids: [mediaId] } });
```

## Scheduling (Cron)

Add to crontab to post daily:

```cron
# Post one random destination every day at 09:00 HKT
0 1 * * * cd /home/captain/.openclaw/workspace/social-beast && /usr/bin/node publish-directory.js >> publish-log.txt 2>&1
```

## Structure

```
social-beast/
├── publish-directory.js   # Main script
├── publish-log.txt        # Run log (gitignored)
├── publish-all-preview.txt # Full preview output (gitignored)
├── README.md              # This file
└── docs/                  # Documentation (future)
```
