#!/usr/bin/env node
/**
 * IMAGE SOURCING CHECKLIST
 * ========================
 * Run this to see which destinations still need real images.
 * 
 * HOW TO USE:
 * 1. For each destination, find the hotel's official website gallery
 * 2. Right-click any image → "Open image in new tab" → copy the URL
 * 3. Add it to public/data/image-map.json under the destination ID
 * 4. Re-run this script to see updated status
 * 
 * SOURCING PRIORITY (start here):
 *   Phase 1 - Top 10 (hottest properties, most traffic)
 *   Phase 2 - Remaining 41
 * 
 * ACCEPTABLE IMAGE SOURCES (in order of trust):
 *   ✅ Official hotel website (best — immediate trust)
 *   ✅ Hotel press/media kit (editorial use allowed)
 *   ✅ Hotel's official Instagram (verified account)
 *   ✅ User-generated content tagged by hotel
 *   ❌ Generic stock photos (Unsplash, Shutterstock — NOT real)
 *   ❌ AI-generated images (fake — never)
 * 
 * PHOTO CREDIT RULES:
 * - Every image MUST have: url, source (hotel name), sourceUrl (link back)
 * - Credit shown as overlay: "📷 Official · © Hotel Name"
 * - Links are nofollow sponsored for SEO safety
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'public', 'data');
const destinations = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'destinations.json'), 'utf-8'));
const imageMap = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'image-map.json'), 'utf-8'));
const photos = imageMap.photos || {};

console.log('\n📸 LUXURY FAMILY TRAVEL ASIA — IMAGE SOURCING STATUS\n');
console.log('='.repeat(70));

let sourcedCount = 0;
let unsourcedCount = 0;

destinations.forEach((d, i) => {
  const hasPhotos = photos[d.id];
  const heroDone = hasPhotos?.hero?.url && !hasPhotos.hero.url.includes('PLACEHOLDER');
  const galleryCount = hasPhotos?.gallery?.filter(g => g.url && !g.url.includes('PLACEHOLDER')).length || 0;
  
  if (heroDone && galleryCount >= 3) {
    sourcedCount++;
    console.log(`✅ ${d.id.padEnd(20)} ${d.name.padEnd(30)} hero ✓ gallery(${galleryCount})`);
  } else if (heroDone) {
    console.log(`🟡 ${d.id.padEnd(20)} ${d.name.padEnd(30)} hero ✓ gallery(${galleryCount}/3)`);
  } else {
    unsourcedCount++;
    console.log(`🔴 ${d.id.padEnd(20)} ${d.name.padEnd(30)} NEEDS IMAGES`);
  }
});

console.log('\n' + '='.repeat(70));
console.log(`\n📊 STATUS: ${sourcedCount} sourced · ${unsourcedCount} needing images · ${destinations.length} total`);
console.log(`\n📋 NEXT STEP: Edit public/data/image-map.json with real image URLs`);
console.log('📖 REFERENCE: lib/imageUtils.ts — shows photo credits on the frontend\n');
