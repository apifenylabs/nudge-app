#!/usr/bin/env node

/**
 * publish-directory.js — Social Beast Directory Publisher
 *
 * Reads the Family Travel Directory destinations list, formats a social
 * media post for one (or all) destinations, and logs what would be posted.
 *
 * Usage:
 *   node publish-directory.js --dry-run       # One random destination (preview)
 *   node publish-directory.js --dry-run --all  # All 29 destinations (preview)
 *   node publish-directory.js                  # One random destination (live)
 *   node publish-directory.js --all             # All 29 destinations (live)
 *
 * Placeholder post() functions exist — swap them with real API calls when
 * credentials are configured.
 */

const fs = require("fs");
const path = require("path");

// ───── Config ──────────────────────────────────────────────────────────────

const DESTINATIONS_PATH = path.resolve(
  __dirname,
  "..",
  "family-travel-directory",
  "public",
  "data",
  "destinations.json"
);
const LOG_PATH = path.resolve(__dirname, "publish-log.txt");
const ALL_OUTPUT_PATH = path.resolve(__dirname, "publish-all-preview.txt");

const SITE_BASE = "https://family-travel-directory.vercel.app";

// ───── Helpers ─────────────────────────────────────────────────────────────

function shortDesc(desc) {
  // First sentence, or first 120 chars if no period found
  const dot = desc.indexOf(".");
  if (dot > 20 && dot < 300) return desc.slice(0, dot + 1);
  return desc.slice(0, 120) + (desc.length > 120 ? "..." : "");
}

function formatPost(dest) {
  const desc = shortDesc(dest.description);
  return [
    `🏖️ ${dest.name} — ${dest.city}, ${dest.country}`,
    ``,
    `${desc}`,
    ``,
    `🧒 Best for ages: ${dest.ageRange}`,
    `⭐ Safety: ${dest.safetyRating}/5`,
    `💰 Price: ${dest.priceRange}`,
    ``,
    `Read the full parent review ➡️ ${SITE_BASE}/destination/${dest.id}`,
  ].join("\n");
}

function formatTelegram(dest) {
  const desc = shortDesc(dest.description);
  return [
    `🏖️ <b>${dest.name}</b> — ${dest.city}, ${dest.country}`,
    ``,
    `${desc}`,
    ``,
    `🧒 <b>Ages:</b> ${dest.ageRange}`,
    `⭐ <b>Safety:</b> ${dest.safetyRating}/5`,
    `💰 <b>Price:</b> ${dest.priceRange}`,
    ``,
    `📖 <a href="${SITE_BASE}/destination/${dest.id}">Read the full parent review →</a>`,
  ].join("\n");
}

function logEntry(dest, platform, status) {
  const ts = new Date().toISOString();
  return `[${ts}] [${platform}] [${status}] ${dest.id} — ${dest.name} (${dest.city}, ${dest.country})`;
}

function appendLog(lines) {
  const stamp = `\n--- Run: ${new Date().toISOString()} ---\n`;
  fs.appendFileSync(LOG_PATH, stamp + lines.join("\n") + "\n", "utf-8");
}

// ───── Placeholder posters — swap these for real API calls ─────────────────

async function postToTwitter(content) {
  // TODO: Replace with real Twitter/X API v2 call
  // Requires: TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, etc.
  console.log("\n━━━ Twitter/X Post ━━━");
  console.log(content);
  console.log("━━━━━━━━━━━━━━━━━━━━\n");
  return { success: true, platform: "twitter", preview: true };
}

async function postToTelegram(content) {
  // TODO: Replace with real Telegram Bot API call
  // Requires: TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID
  console.log("\n━━━ Telegram Post (HTML) ━━━");
  console.log(content);
  console.log("━━━━━━━━━━━━━━━━━━━━━━\n");
  return { success: true, platform: "telegram", preview: true };
}

// ───── Main ────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const postAll = args.includes("--all");

  // 1. Load destinations
  if (!fs.existsSync(DESTINATIONS_PATH)) {
    console.error(`❌ Destinations file not found: ${DESTINATIONS_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(DESTINATIONS_PATH, "utf-8");
  let destinations;
  try {
    destinations = JSON.parse(raw);
  } catch (err) {
    console.error("❌ Failed to parse destinations.json:", err.message);
    process.exit(1);
  }

  if (!Array.isArray(destinations) || destinations.length === 0) {
    console.error("❌ destinations.json is empty or not an array.");
    process.exit(1);
  }

  console.log(`📦 Loaded ${destinations.length} destinations`);
  if (isDryRun) console.log("🏁 DRY RUN — no actual posting will occur\n");

  const logLines = [];

  // 2. Select destinations
  const selected = postAll ? destinations : [destinations[Math.floor(Math.random() * destinations.length)]];

  // 3. Post each destination
  for (const dest of selected) {
    const twitterContent = formatPost(dest);
    const telegramContent = formatTelegram(dest);

    let twitterResult, telegramResult;

    if (isDryRun) {
      twitterResult = { success: true, platform: "twitter", preview: true };
      telegramResult = { success: true, platform: "telegram", preview: true };
      console.log(`\n🎯 Destination: ${dest.name} (${dest.id})`);
      console.log(twitterContent);
      console.log(`\n📱 Telegram version:\n${telegramContent}\n`);
    } else {
      twitterResult = await postToTwitter(twitterContent);
      telegramResult = await postToTelegram(telegramContent);
    }

    logLines.push(logEntry(dest, "twitter", twitterResult.success ? "OK" : "FAIL"));
    logLines.push(logEntry(dest, "telegram", telegramResult.success ? "OK" : "FAIL"));
  }

  // 4. Log
  try {
    appendLog(logLines);
    console.log(`✅ Logged ${logLines.length} entries to ${LOG_PATH}`);
  } catch (err) {
    console.error("⚠️  Could not write log:", err.message);
  }

  // 5. If --all, also write a preview file
  if (postAll && isDryRun) {
    try {
      let preview = `# Social Beast — All 29 Destinations Preview\n`;
      preview += `# Generated: ${new Date().toISOString()}\n\n`;
      for (const dest of selected) {
        preview += `## ${dest.name} (${dest.id})\n\n`;
        preview += formatPost(dest);
        preview += "\n\n---\n\n";
      }
      fs.writeFileSync(ALL_OUTPUT_PATH, preview, "utf-8");
      console.log(`📄 Full preview written to ${ALL_OUTPUT_PATH}`);
    } catch (err) {
      console.error("⚠️  Could not write preview file:", err.message);
    }
  }

  if (isDryRun) {
    console.log("\n🏁 Dry run complete. Run without --dry-run to actually post.");
  } else {
    console.log("\n🚀 Publishing complete.");
  }
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
