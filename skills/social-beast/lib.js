/**
 * Social Beast — Core Library
 * Shared utilities for all skills.
 */

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

/** Generate deterministic content hash */
function contentHash(sourceId, format, dateStr) {
  const str = `${sourceId}:${format}:${dateStr}`;
  return crypto.createHash('sha1').update(str).digest('hex').substring(0, 12);
}

/** Get today's date string in YYYY-MM-DD */
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

/** Safe JSON read with error handling */
function readJSON(filePath) {
  try {
    const absPath = path.resolve(filePath);
    if (!fs.existsSync(absPath)) return null;
    const raw = fs.readFileSync(absPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[lib] JSON read error for ${filePath}: ${err.message}`);
    return null;
  }
}

/** Safe JSON write with directory creation */
function writeJSON(filePath, data) {
  try {
    const absPath = path.resolve(filePath);
    const dir = path.dirname(absPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(absPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`[lib] JSON write error for ${filePath}: ${err.message}`);
    return false;
  }
}

/** Truncate text to max chars */
function truncate(text, max = 200) {
  if (!text) return '';
  return text.length > max ? text.substring(0, max - 3) + '...' : text;
}

/** Generate UUID v4 */
function uuid() {
  return crypto.randomUUID();
}

/** Pick N random items from array */
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

module.exports = {
  contentHash,
  todayStr,
  readJSON,
  writeJSON,
  truncate,
  uuid,
  pickRandom,
};
