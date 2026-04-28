# Telegram Approval Handler

## How It Works

The Telegram approval system uses inline button callbacks on Telegram bot messages. Chris interacts directly with the bot (e.g., `@wosobu`).

## Message Flow

### 1. Daily Summary Message

```
📋 **April 27 — 7 posts ready for your approval**

Tap each post below to review and approve. Deadline: 08:30 HKT.
```

### 2. Each Post Preview

Each post gets its own message with:
- **Format badge** (e.g., `🐦 Short Hook`, `🧵 Story Thread`)
- **Source item** (e.g., `← Tokyo Disneyland`)
- **Preview text** (truncated to 200 chars for long content)
- **Inline buttons:**

```
[ ✅ Approve ] [ ✏️ Edit ] [ ❌ Skip ]
```

### 3. Button Actions

#### ✅ Approve
- Bot edits the message: add `✅ *Approved*` at the top
- Item moves to publish queue
- Pipeline records `approved` status

#### ✏️ Edit
- Bot prompts: "✏️ Send your edit instructions for this post:"
- Chris types his edits (e.g., "Make the hook stronger" or "Change URL to x.com/...")
- Bot edits the item content (AI-assisted re-transformation)
- Resends preview with updated text and same buttons
- Original approval deadline is extended by 5 minutes

#### ❌ Skip
- Bot edits the message: add `❌ *Skipped*`
- Item goes back to rotation for next batch
- Pipeline records `skipped` status

### 4. Timeout Handling

- **08:30 HKT** — All unhandled items auto-approve (configurable)
- Chris gets a final summary: "⏰ Deadline reached. 3 items auto-approved. 2 skipped."
- Pipeline proceeds with whatever is approved

## Telegram Inline Button Implementation

```javascript
// Send message with inline buttons
const { Markup } = require('telegraf');

// Example: Send approval message
const keyboard = Markup.inlineKeyboard([
  Markup.button.callback('✅ Approve', `approve:${itemId}`),
  Markup.button.callback('✏️ Edit', `edit:${itemId}`),
  Markup.button.callback('❌ Skip', `skip:${itemId}`),
]);

await bot.telegram.sendMessage(chatId, preview, {
  parse_mode: 'Markdown',
  ...keyboard,
});
```

## State Management

Approval state is stored in JSON files:

```json
// workspace/social-beast-approvals/pending-2026-04-27.json
{
  "date": "2026-04-27",
  "status": "awaiting-approval",
  "items": [
    {
      "id": "sha1:abc123",
      "contentId": "sha1:abc123",
      "preview": "🐦 Tokyo Disneyland is the most...",
      "status": "pending",
      "position": 1
    }
  ]
}
```

## Error Handling

- **Bot offline:** Pipeline waits and retries (3 attempts, 30s apart). If still offline, auto-approve all items.
- **Invalid response:** Ignore callback data that doesn't match known items.
- **Duplicate response:** If Chris taps twice, ignore second tap (already processed).
