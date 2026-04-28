/**
 * approval-telegram.js
 * Send daily batch to Telegram for approval and collect responses via inline keyboards.
 *
 * Uses Telegram Bot API directly (no telegraf dependency) with:
 * - sendMessage for approval messages with inline keyboards
 * - getUpdates long-polling for callback query collection
 * - File-based state for persistence
 *
 * Falls back to auto-approval when no real credentials are available.
 */

const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const lib = require('./lib');
const publishTelegram = require('./publish-telegram');

const APPROVALS_DIR = path.resolve(__dirname, '../../social-beast-approvals');
const CREDENTIALS_PATH = path.resolve(__dirname, 'credentials.json');

// ─── Telegram Bot API Helper ──────────────────────────────────

const TG_API = 'https://api.telegram.org';

function telegramApi(botToken, method, payload) {
  return new Promise((resolve) => {
    const body = JSON.stringify(payload || {});
    const url = new URL(`/bot${botToken}/${method}`, TG_API);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 30000,
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
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, error_code: 0, description: 'Timeout' }); });
    req.write(body);
    req.end();
  });
}

/**
 * Long-poll getUpdates with a timeout.
 * This is used by collectApprovals to pick up callback_query updates.
 */
function getUpdates(botToken, offset, timeoutSec = 30) {
  return telegramApi(botToken, 'getUpdates', {
    offset,
    timeout: timeoutSec,
    allowed_updates: ['callback_query'],
  });
}

function answerCallbackQuery(botToken, callbackQueryId, text) {
  return telegramApi(botToken, 'answerCallbackQuery', {
    callback_query_id: callbackQueryId,
    text: text || '✅ Done',
    show_alert: false,
  });
}

function editMessageReplyMarkup(botToken, chatId, messageId, replyMarkup) {
  return telegramApi(botToken, 'editMessageReplyMarkup', {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: replyMarkup || { inline_keyboard: [] },
  });
}

function editMessageText(botToken, chatId, messageId, text, parseMode) {
  return telegramApi(botToken, 'editMessageText', {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: parseMode || 'MarkdownV2',
  });
}

// ─── Format Labels ────────────────────────────────────────────

const FORMAT_LABELS = {
  'short-hook': '🐦 Short Hook',
  'story-thread': '🧵 Story Thread',
  'telegram-deep-dive': '📢 Telegram Deep Dive',
  'linkedin-insight': '💼 LinkedIn Insight',
  'carousel-card': '📷 Carousel Card',
  'tiktok-script': '🎬 TikTok Script',
  'build-in-public': '🔧 Build In Public',
  'newsletter-blurb': '📧 Newsletter Blurb',
};

function getFormatLabel(format) {
  return FORMAT_LABELS[format] || format || '📄 Unknown';
}

// ─── Load Credentials ─────────────────────────────────────────

function loadApprovalCredentials(opts = {}) {
  // Priority 1: direct opts
  if (opts.botToken && opts.botToken !== 'PLACEHOLDER_REPLACE_ME') {
    return { botToken: opts.botToken, chatId: opts.chatId || '' };
  }

  // Priority 2: credentials file
  try {
    if (fs.existsSync(CREDENTIALS_PATH)) {
      const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
      if (creds.telegram &&
          creds.telegram.botToken &&
          creds.telegram.botToken !== 'PLACEHOLDER_REPLACE_ME' &&
          creds.telegram.chatId &&
          creds.telegram.chatId !== 'PLACEHOLDER_REPLACE_ME') {
        return { botToken: creds.telegram.botToken, chatId: creds.telegram.chatId };
      }
    }
  } catch (_) {}

  return null;
}

// ─── MarkdownV2 Escape ────────────────────────────────────────

function esc(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

// ─── Build Approval Message ───────────────────────────────────

/**
 * Build a Telegram message for an approval batch.
 * Returns { text, replyMarkup }.
 */
function buildApprovalMessage(batch) {
  const dateStr = batch.date;
  const items = batch.items;
  const pending = items.filter(i => i.status === 'pending');
  const total = items.length;
  const pendingCount = pending.length;

  // Header
  let text = `📋 *Daily Queue \\-\\- ${esc(dateStr)}*\n`;
  text += `${esc(`${pendingCount}/${total}`)} items awaiting approval\n\n`;

  // Item list
  items.forEach((item, idx) => {
    const statusIcon = item.status === 'approved' ? '✅' :
      item.status === 'skipped' ? '❌' :
      item.status === 'edited' ? '✏️' : '⏳';
    const label = getFormatLabel(item.content?.format);
    const source = item.content?.sourceProject || 'unknown';
    const preview = lib.truncate(item.content?.content || '', 100);
    text += `${esc(`${statusIcon} ${idx + 1}. ${label} ← ${source}`)}\n`;
    text += `${esc(`   ${preview}`)}\n`;
    // Don't show prompt for approved/skipped items
    if (item.status === 'pending') {
      text += `${esc(`   /approve_${item.id} \\- ✅ /skip_${item.id} \\- ❌`)}\n`;
    }
    text += '\n';
  });

  // Footer
  text += `${esc('Reply with /approve\\_all or /skip\\_all, or use per\\-item commands above.')}\n`;
  text += `${esc(`Deadline: auto\\-approve after timeout\\.`)}`;

  // Build inline keyboard
  // Row 1: Approve All | Skip All
  const keyboard = [
    [
      { text: '✅ Approve All', callback_data: `approve_all:${dateStr}` },
      { text: '❌ Skip All', callback_data: `skip_all:${dateStr}` },
    ],
  ];

  // Row 2-N: Per-item actions (only for pending items, in groups of 3)
  const pendingIds = items.filter(i => i.status === 'pending').map(i => i.id);
  for (let i = 0; i < pendingIds.length; i += 3) {
    const row = pendingIds.slice(i, i + 3).map(id => ({
      text: `#${items.findIndex(it => it.id === id) + 1}`,
      callback_data: `approve:${id}`,
    }));
    keyboard.push(row);
  }

  // We need to be mindful of Telegram's 64-char limit on callback_data
  // Our callbacks: approve_all:YYYY-MM-DD (max ~20 chars) ✓
  //               skip_all:YYYY-MM-DD (max ~18 chars) ✓
  //               approve:{id} - id is typically 12-20 chars ✓

  return { text, replyMarkup: { inline_keyboard: keyboard } };
}

// ─── Send For Approval ────────────────────────────────────────

/**
 * Send a batch of items for approval via Telegram.
 *
 * @param {Array} items - ContentItem[] to send for approval
 * @param {object} opts
 * @param {string} opts.dateStr - Date string (YYYY-MM-DD)
 * @param {string} opts.botToken - Telegram bot token (optional)
 * @param {string} opts.chatId - Target chat ID (optional)
 * @returns {Promise<object>} ApprovalBatch
 */
async function sendForApproval(items, opts = {}) {
  const dateStr = opts.dateStr || lib.todayStr();

  if (!items || items.length === 0) {
    console.warn('[approval-telegram] No items to send for approval');
    return {
      date: dateStr,
      items: [],
      status: 'approved',
    };
  }

  // Build queue items
  const queueItems = items.map((item, i) => ({
    id: item.id,
    contentId: item.id,
    preview: generatePreview(item),
    content: item,
    status: 'pending',
    editedContent: null,
    editNotes: null,
    position: i + 1,
  }));

  const batch = {
    date: dateStr,
    items: queueItems,
    status: 'awaiting-approval',
    createdAt: new Date().toISOString(),
  };

  // Store to file
  const filePath = path.join(APPROVALS_DIR, `pending-${dateStr}.json`);
  lib.writeJSON(filePath, batch);

  // Check for real credentials
  const creds = loadApprovalCredentials(opts);

  if (creds) {
    await sendToTelegram(batch, creds.botToken, creds.chatId);
  } else {
    console.log(`[approval-telegram] No bot credentials. Queue saved to ${filePath}`);
    console.log(`[approval-telegram] ${queueItems.length} items awaiting manual approval.`);
    queueItems.forEach(item => {
      console.log(`  [${item.position}/${queueItems.length}] ${item.preview}`);
    });
  }

  return batch;
}

/**
 * Send the approval batch message to Telegram.
 * Handles MarkdownV2 escaping and inline keyboard attachment.
 */
async function sendToTelegram(batch, botToken, chatId) {
  const { text, replyMarkup } = buildApprovalMessage(batch);

  console.log(`[approval-telegram] Sending ${batch.items.length} items to Telegram...`);

  const result = await telegramApi(botToken, 'sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'MarkdownV2',
    reply_markup: replyMarkup,
  });

  if (result.ok && result.result) {
    console.log(`[approval-telegram] ✅ Approval message sent (message_id: ${result.result.message_id})`);
    // Store message ID in batch for later use
    batch._telegramMessageId = result.result.message_id;
    batch._telegramChatId = chatId;
    batch._botToken = botToken;

    // Update persisted file with message info
    const filePath = path.join(APPROVALS_DIR, `pending-${batch.date}.json`);
    lib.writeJSON(filePath, { ...batch, _telegramMessageId: result.result.message_id, _telegramChatId: chatId });
  } else {
    console.error(`[approval-telegram] Failed to send: ${result.description || 'Unknown error'}`);
  }
}

// ─── Collect Approvals ────────────────────────────────────────

/**
 * Collect approval responses via Telegram long-polling.
 * Polls getUpdates for callback_query data from the approval message.
 * Times out after a configurable duration and auto-approves remaining.
 *
 * @param {object} batch - ApprovalBatch
 * @param {object} opts
 * @param {number} [opts.pollDurationMs] - Max polling time (default: 120000 = 2 min)
 * @param {number} [opts.pollIntervalMs] - Poll interval (default: 2000)
 * @returns {Promise<object>} Updated ApprovalBatch
 */
async function collectApprovals(batch, opts = {}) {
  if (!batch) return null;

  const { _botToken, _telegramChatId, _telegramMessageId } = batch;
  const pollDurationMs = opts.pollDurationMs || 120000; // 2 min default
  const pollIntervalMs = opts.pollIntervalMs || 2000;
  const pending = batch.items.filter(i => i.status === 'pending');

  // No pending items — already done
  if (pending.length === 0) {
    batch.status = batch.items.some(i => i.status === 'approved' || i.status === 'edited')
      ? 'approved' : 'skipped';
    await archiveBatch(batch);
    return batch;
  }

  // No real credentials — auto-approve all
  if (!_botToken) {
    console.log(`[approval-telegram] Auto-approving ${pending.length} pending items (no bot token)`);
    pending.forEach(item => { item.status = 'approved'; });
    const nonSkipped = batch.items.filter(i => i.status === 'approved' || i.status === 'edited');
    batch.status = nonSkipped.length > 0 ? 'approved' : 'skipped';
    await archiveBatch(batch);
    return batch;
  }

  // Long-poll for callback responses
  console.log(`[approval-telegram] Polling for approval responses (${pollDurationMs / 1000}s max)...`);

  let updateOffset = 0;
  const startTime = Date.now();
  let changed = true;

  while (Date.now() - startTime < pollDurationMs) {
    // Check for updated batch file (e.g., manual edits via agent)
    try {
      const filePath = path.join(APPROVALS_DIR, `pending-${batch.date}.json`);
      if (fs.existsSync(filePath)) {
        const fileBatch = lib.readJSON(filePath);
        if (fileBatch) {
          // Merge file updates into our in-memory batch
          for (const fileItem of fileBatch.items) {
            const memItem = batch.items.find(i => i.id === fileItem.id);
            if (memItem && fileItem.status !== memItem.status) {
              memItem.status = fileItem.status;
              memItem.editNotes = fileItem.editNotes;
              memItem.editedContent = fileItem.editedContent;
              changed = true;
            }
          }
        }
      }
    } catch (_) {}

    // Poll Telegram for callback queries
    const updatesResult = await getUpdates(_botToken, updateOffset, 25);
    if (updatesResult.ok && updatesResult.result) {
      for (const update of updatesResult.result) {
        updateOffset = Math.max(updateOffset, update.update_id + 1);

        const cq = update.callback_query;
        if (!cq) continue;

        const data = cq.data || '';
        const fromUser = cq.from?.username || cq.from?.id || 'unknown';

        console.log(`[approval-telegram] Received callback: "${data}" from @${fromUser}`);

        // Answer the callback query to clear the loading state
        await answerCallbackQuery(_botToken, cq.id, '✅ Processing...');

        // Process the callback data
        changed = await processCallback(batch, data, _botToken, _telegramChatId, _telegramMessageId) || changed;

        // Update the persisted file
        const filePath = path.join(APPROVALS_DIR, `pending-${batch.date}.json`);
        lib.writeJSON(filePath, { ...batch, _telegramMessageId, _telegramChatId });

        // Check if all items processed
        const remainingPending = batch.items.filter(i => i.status === 'pending');
        if (remainingPending.length === 0) {
          console.log('[approval-telegram] All items processed!');
          break;
        }
      }
    }

    // If all items processed, exit loop early
    const remainingPending = batch.items.filter(i => i.status === 'pending');
    if (remainingPending.length === 0) break;

    await new Promise(r => setTimeout(r, pollIntervalMs));
  }

  // Auto-approve remaining pending items after timeout
  const stillPending = batch.items.filter(i => i.status === 'pending');
  if (stillPending.length > 0) {
    console.log(`[approval-telegram] ⏰ Poll timeout. Auto-approving ${stillPending.length} remaining items.`);
    stillPending.forEach(item => { item.status = 'approved'; });
    changed = true;
  }

  // If anything changed, update the Telegram message
  if (changed && batch.status !== 'approved') {
    const nonSkipped = batch.items.filter(i => i.status === 'approved' || i.status === 'edited');
    batch.status = nonSkipped.length > 0 ? 'approved' : 'skipped';
  }

  // Final update to Telegram message
  if (_botToken && _telegramChatId && _telegramMessageId && (changed || batch.status !== 'awaiting-approval')) {
    await updateApprovalMessage(batch, _botToken, _telegramChatId, _telegramMessageId);
  }

  // Archive
  await archiveBatch(batch);

  return batch;
}

/**
 * Process a single callback query data string.
 */
async function processCallback(batch, data, botToken, chatId, messageId) {
  let changed = false;

  if (data.startsWith('approve_all:')) {
    const pending = batch.items.filter(i => i.status === 'pending');
    pending.forEach(item => { item.status = 'approved'; changed = true; });
    console.log(`[approval-telegram] ✅ Approve ALL: ${pending.length} items`);
  }

  else if (data.startsWith('skip_all:')) {
    const pending = batch.items.filter(i => i.status === 'pending');
    pending.forEach(item => { item.status = 'skipped'; changed = true; });
    console.log(`[approval-telegram] ❌ Skip ALL: ${pending.length} items`);
  }

  else if (data.startsWith('approve:')) {
    const id = data.substring(8); // 'approve:'.length = 8
    const item = batch.items.find(i => i.id === id);
    if (item && item.status === 'pending') {
      item.status = 'approved';
      changed = true;
      console.log(`[approval-telegram] ✅ Approved item ${item.position}: ${item.id}`);
    } else if (item) {
      console.log(`[approval-telegram] Item ${id} already ${item.status}, ignoring duplicate`);
    }
  }

  else if (data.startsWith('skip:')) {
    const id = data.substring(5); // 'skip:'.length = 5
    const item = batch.items.find(i => i.id === id);
    if (item && item.status === 'pending') {
      item.status = 'skipped';
      changed = true;
      console.log(`[approval-telegram] ❌ Skipped item ${item.position}: ${item.id}`);
    } else if (item) {
      console.log(`[approval-telegram] Item ${id} already ${item.status}, ignoring duplicate`);
    }
  }

  else if (data.startsWith('edit:')) {
    const id = data.substring(5); // 'edit:'.length = 5
    const item = batch.items.find(i => i.id === id);
    if (item && item.status === 'pending') {
      // Mark as pending with edit flag — agent should handle edit instructions
      item.status = 'edited';
      item.editNotes = 'User requested edit via Telegram callback';
      changed = true;
      console.log(`[approval-telegram] ✏️ Edit requested for item ${item.position}: ${item.id}`);
    }
  }

  return changed;
}

/**
 * Update the approval Telegram message with current status.
 */
async function updateApprovalMessage(batch, botToken, chatId, messageId) {
  const approved = batch.items.filter(i => i.status === 'approved' || i.status === 'edited').length;
  const skipped = batch.items.filter(i => i.status === 'skipped').length;
  const pending = batch.items.filter(i => i.status === 'pending').length;
  const total = batch.items.length;

  // Build summary text
  let text = `📋 *Daily Queue \\-\\- ${esc(batch.date)}*\n`;
  text += `${esc('✅ ')}Approved: ${esc(String(approved))}  `;
  text += `${esc('❌ ')}Skipped: ${esc(String(skipped))}  `;
  text += `${esc('⏳ ')}Pending: ${esc(String(pending))}\n\n`;

  // Per-item status
  batch.items.forEach((item) => {
    const statusIcon = item.status === 'approved' ? '✅' :
      item.status === 'skipped' ? '❌' :
      item.status === 'edited' ? '✏️' : '⏳';
    const label = getFormatLabel(item.content?.format);
    text += `${esc(`${statusIcon} ${item.position}. ${label} — ${item.status}`)}\n`;
  });

  text += `\n${esc('Total: ')}${esc(String(total))} ${esc('items')}`;

  try {
    await editMessageText(botToken, chatId, messageId, text, 'MarkdownV2');
    console.log('[approval-telegram] ✅ Approval message updated');
  } catch (err) {
    console.error(`[approval-telegram] Failed to update message: ${err.message}`);
  }
}

/**
 * Archive the batch: move pending file to archive, update status.
 */
async function archiveBatch(batch) {
  const dateStr = batch.date;
  const pendingFile = path.join(APPROVALS_DIR, `pending-${dateStr}.json`);

  // Cleanup internal fields before archiving
  const archiveItem = { ...batch };
  delete archiveItem._botToken;

  const archiveDir = path.join(APPROVALS_DIR, 'archive');
  const archiveFile = path.join(archiveDir, `approved-${dateStr}.json`);
  lib.writeJSON(archiveFile, archiveItem);

  // Remove pending file
  try { fs.unlinkSync(pendingFile); } catch (_) {}
}

// ─── Preview Generation ───────────────────────────────────────

function generatePreview(item) {
  if (!item) return '';
  const label = getFormatLabel(item.format);
  const source = item.sourceProject || 'unknown';
  return `${label} ← ${source}/${item.sourceId}: ${lib.truncate(item.content, 120)}`;
}

// ─── Exports ──────────────────────────────────────────────────

module.exports = { sendForApproval, collectApprovals, generatePreview, processCallback, buildApprovalMessage };
