/**
 * daily-pipeline.js
 * Main orchestrator: source → transform → approval → publish.
 * Runs daily at 09:00 HKT schedule.
 */

const path = require('path');
const lib = require('./lib');

// Import all skills
const sourceDirectoryBeast = require('./source-directory-beast');
const sourceBuildInPublic = require('./source-build-in-public');
const sourceNudge = require('./source-nudge');

const transforms = {
  'short-hook': require('./transform-short-hook'),
  'story-thread': require('./transform-story-thread'),
  'telegram-deep-dive': require('./transform-telegram-deep-dive'),
  'linkedin-insight': require('./transform-linkedin-insight'),
  'carousel-card': require('./transform-carousel-card'),
  'tiktok-script': require('./transform-tiktok-script'),
  'build-in-public': require('./transform-build-in-public'),
  'newsletter-blurb': require('./transform-newsletter-blurb'),
  'nudge-features': require('./transform-nudge-features'),
};

const publishTwitter = require('./publish-twitter');
const publishTelegram = require('./publish-telegram');
const publishLinkedin = require('./publish-linkedin');

const approvalTelegram = require('./approval-telegram');

const LOGS_DIR = path.resolve(__dirname, '../../social-beast-logs');

/**
 * Run the full daily pipeline
 * @param {object} config
 * @param {string} [config.date] - Date string (YYYY-MM-DD)
 * @param {number} [config.maxItemsPerSource] - Max items per source
 * @param {string[]} [config.publishPlatforms] - Which platforms to publish to
 * @param {object} [config.credentials] - Platform credentials
 * @returns {object} Pipeline summary
 */
async function run(config = {}) {
  const dateStr = config.date || lib.todayStr();
  const maxItems = config.maxItemsPerSource || 5;
  const credentials = config.credentials || {};
  const errors = [];

  console.log(`\n═══════════════════════════════════════════`);
  console.log(`  SOCIAL BEAST — Daily Pipeline`);
  console.log(`  Date: ${dateStr}`);
  console.log(`═══════════════════════════════════════════\n`);

  // ─── STEP 1: SOURCE ─────────────────────────────────
  console.log(`[${formatTime(0)}] 🔍 SOURCE PHASE`);
  let sourceItems = [];

  // Source from Directory Beast
  try {
    const destItems = sourceDirectoryBeast.source({ maxItems });
    sourceItems.push(...destItems);
    console.log(`  [source-directory-beast] → ${destItems.length} items`);
  } catch (err) {
    errors.push(`source-directory-beast: ${err.message}`);
    console.error(`  [ERROR] source-directory-beast: ${err.message}`);
  }

  // Source from Build in Public
  try {
    const bipItems = sourceBuildInPublic.source({});
    sourceItems.push(...bipItems);
    console.log(`  [source-build-in-public] → ${bipItems.length} items`);
  } catch (err) {
    errors.push(`source-build-in-public: ${err.message}`);
    console.error(`  [ERROR] source-build-in-public: ${err.message}`);
  }

  // Source from Nudge
  try {
    const nudgeItems = sourceNudge.source({ maxItems });
    sourceItems.push(...nudgeItems);
    console.log(`  [source-nudge] → ${nudgeItems.length} items`);
  } catch (err) {
    errors.push(`source-nudge: ${err.message}`);
    console.error(`  [ERROR] source-nudge: ${err.message}`);
  }

  console.log(`  Total source items: ${sourceItems.length}\n`);

  if (sourceItems.length === 0) {
    console.log('[pipeline] No source items, aborting');
    return { itemsProcessed: 0, itemsApproved: 0, itemsPublished: 0, errors };
  }

  // ─── STEP 2: TRANSFORM ──────────────────────────────
  console.log(`[${formatTime(0.5)}] 🔄 TRANSFORM PHASE`);
  const allTransformed = [];

  for (const source of sourceItems) {
    for (const [formatName, transformModule] of Object.entries(transforms)) {
      try {
        const item = transformModule.transform(source, { dateStr });
        allTransformed.push(item);
        console.log(`  ✓ ${source.sourceId} → ${formatName}`);
      } catch (err) {
        errors.push(`${source.sourceId} → ${formatName}: ${err.message}`);
        console.error(`  ✗ ${source.sourceId} → ${formatName}: ${err.message}`);
      }
    }
  }

  console.log(`  Total transformed items: ${allTransformed.length}\n`);

  if (allTransformed.length === 0) {
    console.log('[pipeline] No transformed items, aborting');
    return { itemsProcessed: sourceItems.length, itemsApproved: 0, itemsPublished: 0, errors };
  }

  // ─── STEP 3: APPROVAL ───────────────────────────────
  console.log(`[${formatTime(1)}] ✅ APPROVAL PHASE`);
  let batch;
  try {
    batch = await approvalTelegram.sendForApproval(allTransformed, {
      dateStr,
      botToken: credentials.telegram?.botToken,
      chatId: credentials.telegram?.chatId,
    });
    console.log(`  Approval batch created: ${batch.items.length} items\n`);
  } catch (err) {
    errors.push(`approval: ${err.message}`);
    console.error(`  [ERROR] approval: ${err.message}`);
    return { itemsProcessed: sourceItems.length, itemsApproved: 0, itemsPublished: 0, errors };
  }

  // ─── STEP 4: COLLECT APPROVALS ──────────────────────
  console.log(`[${formatTime(1.5)}] 📋 COLLECT APPROVALS PHASE`);
  try {
    batch = await approvalTelegram.collectApprovals(batch, {});
    const approved = batch.items.filter(i => i.status === 'approved' || i.status === 'edited');
    const skipped = batch.items.filter(i => i.status === 'skipped');
    console.log(`  Approved: ${approved.length}, Skipped: ${skipped.length}\n`);
  } catch (err) {
    errors.push(`collect-approvals: ${err.message}`);
    console.error(`  [ERROR] collect-approvals: ${err.message}`);
  }

  const approvedItems = batch.items.filter(i => i.status === 'approved');

  if (approvedItems.length === 0) {
    console.log('[pipeline] No approved items, skipping publish');
    return { itemsProcessed: sourceItems.length, itemsApproved: 0, itemsPublished: 0, errors };
  }

  // ─── STEP 5: PUBLISH ────────────────────────────────
  console.log(`[${formatTime(2)}] 🚀 PUBLISH PHASE`);
  const publishLogs = [];

  for (const item of approvedItems) {
    const content = item.content;

    // Publish to Twitter
    try {
      const twitterResult = await publishTwitter.publish(content, credentials.twitter);
      if (twitterResult) publishLogs.push(twitterResult);
    } catch (err) {
      errors.push(`publish-twitter [${content.id}]: ${err.message}`);
      console.error(`  [ERROR] publish-twitter: ${err.message}`);
    }

    // Publish to Telegram
    try {
      const tgResult = await publishTelegram.publish(content, credentials.telegram);
      if (tgResult) publishLogs.push(tgResult);
    } catch (err) {
      errors.push(`publish-telegram [${content.id}]: ${err.message}`);
      console.error(`  [ERROR] publish-telegram: ${err.message}`);
    }

    // Publish to LinkedIn
    try {
      const liResult = await publishLinkedin.publish(content, credentials.linkedin);
      if (liResult) publishLogs.push(liResult);
    } catch (err) {
      errors.push(`publish-linkedin [${content.id}]: ${err.message}`);
      console.error(`  [ERROR] publish-linkedin: ${err.message}`);
    }

    // Update content status
    content.status = 'published';
  }

  console.log(`\n  Total published: ${publishLogs.length} posts\n`);

  // ─── STEP 6: LOG ────────────────────────────────────
  const logEntry = {
    date: dateStr,
    sourceItems: sourceItems.length,
    transformedItems: allTransformed.length,
    approvedItems: approvedItems.length,
    publishedItems: publishLogs.length,
    publishLogs,
    errors,
    completedAt: new Date().toISOString(),
  };

  const logFile = path.join(LOGS_DIR, `log-${dateStr}.json`);
  lib.writeJSON(logFile, logEntry);
  console.log(`[pipeline] Log written to ${logFile}`);

  // Summary
  console.log(`\n═══════════════════════════════════════════`);
  console.log(`  PIPELINE SUMMARY`);
  console.log(`═══════════════════════════════════════════`);
  console.log(`  Items sourced:     ${sourceItems.length}`);
  console.log(`  Items transformed: ${allTransformed.length}`);
  console.log(`  Items approved:    ${approvedItems.length}`);
  console.log(`  Items published:   ${publishLogs.length}`);
  if (errors.length > 0) {
    console.log(`  Errors:`);
    errors.forEach(e => console.log(`    ⚠ ${e}`));
  }
  console.log(`═══════════════════════════════════════════\n`);

  return {
    date: dateStr,
    itemsProcessed: sourceItems.length,
    itemsTransformed: allTransformed.length,
    itemsApproved: approvedItems.length,
    itemsPublished: publishLogs.length,
    publishLogs,
    errors,
  };
}

/** Return a relative time offset string (HH:MM style) */
function formatTime(hoursOffset) {
  const base = 7; // 07:00 HKT start
  const h = base + Math.floor(hoursOffset);
  const m = Math.floor((hoursOffset % 1) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// If run directly, execute the pipeline
if (require.main === module) {
  run().catch(err => {
    console.error('[pipeline] Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { run };
