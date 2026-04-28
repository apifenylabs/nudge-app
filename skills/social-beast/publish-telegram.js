/**
 * publish-telegram.js
 * Publish content items to Telegram channel via Bot API.
 * Supports MarkdownV2 parsing, inline keyboards, rate limiting, and graceful fallback to mock.
 *
 * Credentials file: ../credentials.json (or passed via options)
 * Bot API: https://core.telegram.org/bots/api#sendMessage
 */

const https = require('https');
const path = require('path');
const fs = require('fs');
const lib = require('./lib');

const CREDENTIALS_PATH = path.resolve(__dirname, 'credentials.json');

// ─── Rate Limiter ──────────────────────────────────────────────
// Telegram allows ~30 messages/second per chat per bot.
// We keep it safe: 1 msg/sec per chat.

const chatTimestamps = new Map();

async function rateLimit(chatId) {
  const now = Date.now();
  const last = chatTimestamps.get(chatId) || 0;
  const elapsed = now - last;
  const needed = 1050 - elapsed; // a little margin (1s + 50ms)
  if (needed > 0) {
    await new Promise(r => setTimeout(r, needed));
  }
  chatTimestamps.set(chatId, Date.now());
}

// ─── Bot API Helper ────────────────────────────────────────────

/**
 * Make a POST request to the Telegram Bot API.
 * Always resolves (never throws) for graceful error handling.
 */
function telegramApi(botToken, method, payload) {
  return new Promise((resolve) => {
    const body = JSON.stringify(payload);
    const url = new URL(`/bot${botToken}/${method}`, 'https://api.telegram.org');

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 15000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (_) {
          resolve({ ok: false, error_code: 500, description: 'Invalid JSON response' });
        }
      });
    });

    req.on('error', (err) => resolve({ ok: false, error_code: 0, description: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, error_code: 0, description: 'Request timeout' }); });
    req.write(body);
    req.end();
  });
}

// ─── Load Credentials ──────────────────────────────────────────

/** Check if value is an unset placeholder */
function isPlaceholder(val) {
  return !val || val === '' || val.startsWith('PLACEHOLDER');
}

function loadCredentials(opts = {}) {
  // Priority 1: direct opts (from daily-pipeline.js: credentials.telegram = { botToken, chatId })
  if (opts.botToken && !isPlaceholder(opts.botToken)) {
    return {
      botToken: opts.botToken,
      chatId: opts.chatId || opts.channelId || '',
      channelId: opts.chatId || opts.channelId || '',
    };
  }

  // Priority 2: credentials file
  try {
    if (fs.existsSync(CREDENTIALS_PATH)) {
      const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
      if (creds.telegram &&
          creds.telegram.botToken &&
          !isPlaceholder(creds.telegram.botToken) &&
          creds.telegram.chatId &&
          !isPlaceholder(creds.telegram.chatId)) {
        return {
          botToken: creds.telegram.botToken,
          chatId: creds.telegram.chatId,
          channelId: creds.telegram.chatId,
        };
      }
    }
  } catch (_) {}

  return null;
}

// ─── MarkdownV2 Escaping ───────────────────────────────────────
// Telegram's MarkdownV2 requires escaping: _ * [ ] ( ) ~ ` > # + - = | { } . !

function escapeMarkdownV2(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

/**
 * Format content for Telegram.
 */
function formatForTelegram(content, useMarkdownV2 = true) {
  if (!content) return { text: '', parseMode: null };
  if (!useMarkdownV2) return { text: content, parseMode: null };
  return { text: escapeMarkdownV2(content), parseMode: 'MarkdownV2' };
}

/**
 * Build inline keyboard markup for a message.
 */
function buildInlineKeyboard(buttons) {
  return {
    inline_keyboard: buttons.map(row =>
      row.map(btn => ({
        text: btn.text,
        callback_data: btn.callback_data,
      }))
    ),
  };
}

/**
 * Split content into chunks of maxLen chars.
 */
function splitContent(content, maxLen = 4096) {
  if (!content || content.length <= maxLen) return [content];
  const parts = [];
  for (let i = 0; i < content.length; i += maxLen) {
    parts.push(content.substring(i, i + maxLen));
  }
  return parts;
}

// ─── Main Publish Function ────────────────────────────────────

/**
 * Publish a content item to Telegram.
 *
 * @param {object} item - ContentItem to publish
 * @param {object} credentials - Telegram bot credentials (optional, falls back to file → mock)
 * @param {object} [opts]
 * @param {string} [opts.parseMode] - 'MarkdownV2' (default) or null for plain text
 * @param {Array<Array<{text:string, callback_data:string}>>} [opts.inlineKeyboard] - Inline keyboard
 * @returns {Promise<object|null>} PublishLogEntry or null if skipped
 */
async function publish(item, credentials = {}, opts = {}) {
  if (!item || !item.content) {
    throw new Error('[publish-telegram] Invalid item: content required');
  }
  if (!item.platforms || !item.platforms.includes('telegram')) {
    console.log('[publish-telegram] Skipped: telegram not in item.platforms');
    return null;
  }

  const mergedCreds = loadCredentials(credentials);

  if (!mergedCreds) {
    console.log('[publish-telegram] No valid credentials found. Falling back to mock.');
    return mockPublish(item);
  }

  const { botToken, chatId } = mergedCreds;

  console.log(`[publish-telegram] Publishing to chat ${chatId}...`);

  // Format content
  const useMarkdownV2 = opts.parseMode !== 'none' && opts.parseMode !== 'HTML';
  const { text: formattedContent, parseMode: actualParseMode } = formatForTelegram(
    item.content,
    useMarkdownV2
  );

  // Build inline keyboard if provided
  const replyMarkup = opts.inlineKeyboard
    ? buildInlineKeyboard(opts.inlineKeyboard)
    : undefined;

  // Split long content
  const parts = splitContent(formattedContent, 4096);
  let firstMessageId = null;

  for (let i = 0; i < parts.length; i++) {
    await rateLimit(chatId);

    const payload = {
      chat_id: chatId,
      text: parts[i],
    };

    if (actualParseMode) {
      payload.parse_mode = actualParseMode;
    }

    // Only attach keyboard to last message
    if (replyMarkup && i === parts.length - 1) {
      payload.reply_markup = replyMarkup;
    }

    const result = await telegramApi(botToken, 'sendMessage', payload);

    if (result.ok && result.result) {
      const msgId = result.result.message_id;
      if (i === 0) firstMessageId = msgId;
      console.log(`[publish-telegram] Part ${i + 1}/${parts.length} sent (message_id: ${msgId})`);
    } else {
      console.error(`[publish-telegram] Part ${i + 1}/${parts.length} failed: ${result.description || 'Unknown error'}`);
      if (i === 0) {
        return failedPublish(item, result.description || 'sendMessage failed on first part');
      }
    }

    if (i < parts.length - 1) await new Promise(r => setTimeout(r, 250));
  }

  if (firstMessageId === null) {
    return failedPublish(item, 'All message parts failed');
  }

  const entry = {
    id: lib.uuid(),
    contentId: item.id,
    platform: 'telegram',
    format: item.format,
    sourceId: item.sourceId,
    sourceProject: item.sourceProject,
    publishedAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    url: `https://t.me/c/${chatId.replace('@', '')}/${firstMessageId}`,
    status: 'success',
  };

  console.log(`[publish-telegram] ✅ Published (${parts.length} message(s))`);
  return entry;
}

// ─── Mock Fallback ────────────────────────────────────────────

async function mockPublish(item) {
  console.log(`[publish-telegram] MOCK: Publishing to Telegram...`);
  console.log(`  Content: ${lib.truncate(item.content, 80)}`);

  if (item.content.length > 4096) {
    const parts = Math.ceil(item.content.length / 4096);
    console.log(`  Split into ${parts} messages (${item.content.length} chars)`);
  }

  await new Promise(r => setTimeout(r, 100));

  const entry = {
    id: lib.uuid(),
    contentId: item.id,
    platform: 'telegram',
    format: item.format,
    sourceId: item.sourceId,
    sourceProject: item.sourceProject,
    publishedAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    url: `https://t.me/c/123456789/${Math.floor(Math.random() * 10000)}`,
    status: 'success',
  };

  console.log(`[publish-telegram] ✅ Published (mock)`);
  return entry;
}

function failedPublish(item, errorMsg) {
  console.error(`[publish-telegram] ❌ Failed: ${errorMsg}`);
  return {
    id: lib.uuid(),
    contentId: item.id,
    platform: 'telegram',
    format: item.format,
    sourceId: item.sourceId,
    sourceProject: item.sourceProject,
    publishedAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    url: null,
    status: 'failed',
    error: errorMsg,
  };
}

// ─── Exports ──────────────────────────────────────────────────

module.exports = { publish, telegramApi, formatForTelegram, escapeMarkdownV2, buildInlineKeyboard, loadCredentials };
