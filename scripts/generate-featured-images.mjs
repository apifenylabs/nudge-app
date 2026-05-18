#!/usr/bin/env node
/**
 * Generate featuredImage paths for all blog posts.
 *
 * Creates a deterministic gradient image based on the post slug.
 * The image is stored as an SVG in public/images/blog/.
 *
 * Usage: node scripts/generate-featured-images.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const BLOG_DIR = join(PROJECT_DIR, 'data', 'blog');
const OUTPUT_DIR = join(PROJECT_DIR, 'public', 'images', 'blog');

// Deterministic gradient palette — pairs of colors
const GRADIENTS = [
  ['#06b6d4', '#3b82f6'],   // cyan→blue
  ['#8b5cf6', '#ec4899'],   // purple→pink
  ['#f59e0b', '#ef4444'],   // amber→red
  ['#10b981', '#059669'],   // emerald→green
  ['#f97316', '#dc2626'],   // orange→red
  ['#6366f1', '#a855f7'],   // indigo→purple
  ['#14b8a6', '#0ea5e9'],   // teal→sky
  ['#e11d48', '#f43f5e'],   // rose→red
  ['#7c3aed', '#2563eb'],   // violet→blue
  ['#d946ef', '#f43f5e'],   // fuchsia→rose
  ['#0ea5e9', '#06b6d4'],   // sky→cyan
  ['#84cc16', '#10b981'],   // lime→emerald
  ['#a855f7', '#d946ef'],   // purple→fuchsia
  ['#f43f5e', '#f97316'],   // rose→orange
  ['#2563eb', '#7c3aed'],   // blue→violet
  ['#059669', '#0ea5e9'],   // emerald→sky
  ['#c026d3', '#e11d48'],   // fuchsia→rose
  ['#0891b2', '#6366f1'],   // cyan→indigo
  ['#d97706', '#7c3aed'],   // amber→violet
  ['#15803d', '#0284c7'],   // green→sky
];

// Deterministic overlay patterns (SVG path data for subtle shapes)
const PATTERNS = [
  // Circles
  `<circle cx="200" cy="150" r="180" fill="white" opacity="0.04" />
   <circle cx="600" cy="400" r="120" fill="white" opacity="0.03" />
   <circle cx="50" cy="350" r="80" fill="white" opacity="0.05" />`,
  // Waves
  `<path d="M0,300 C150,250 350,350 500,280 C650,210 800,310 900,250 L900,0 L0,0 Z" fill="white" opacity="0.04" />
   <path d="M0,400 C200,350 300,420 500,380 C700,340 800,400 900,360 L900,0 L0,0 Z" fill="white" opacity="0.03" />`,
  // Dots
  `<circle cx="100" cy="100" r="4" fill="white" opacity="0.06" />
   <circle cx="300" cy="80" r="3" fill="white" opacity="0.05" />
   <circle cx="500" cy="120" r="5" fill="white" opacity="0.04" />
   <circle cx="700" cy="90" r="3" fill="white" opacity="0.06" />
   <circle cx="200" cy="250" r="4" fill="white" opacity="0.05" />
   <circle cx="600" cy="300" r="3" fill="white" opacity="0.04" />
   <circle cx="400" cy="380" r="5" fill="white" opacity="0.05" />
   <circle cx="800" cy="350" r="3" fill="white" opacity="0.06" />`,
  // Diagonal stripes
  `<path d="M-50,50 L200,300" stroke="white" stroke-width="2" opacity="0.03" />
   <path d="M50,150 L400,450" stroke="white" stroke-width="1.5" opacity="0.03" />
   <path d="M300,0 L600,300" stroke="white" stroke-width="2" opacity="0.02" />
   <path d="M500,50 L800,350" stroke="white" stroke-width="1.5" opacity="0.03" />`,
  // Triangles
  `<polygon points="100,50 200,200 0,200" fill="white" opacity="0.04" />
   <polygon points="700,100 850,300 550,300" fill="white" opacity="0.03" />
   <polygon points="400,250 500,450 300,450" fill="white" opacity="0.04" />`,
];

/**
 * Deterministically pick gradient & pattern for a slug.
 */
function pickGradient(slug) {
  const hash = createHash('md5').update(slug).digest();
  const gIdx = hash[0] % GRADIENTS.length;
  const pIdx = hash[1] % PATTERNS.length;
  const rotate = (hash[2] % 4) * 45; // rotation angle 0, 45, 90, 135
  return { colors: GRADIENTS[gIdx], pattern: PATTERNS[pIdx], rotate };
}

function generateSvg(slug, title) {
  const { colors, pattern, rotate } = pickGradient(slug);
  const [color1, color2] = colors;

  // Clean title for display (shorten if needed)
  const displayTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${rotate})">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(0,0,0,0.15)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.05)" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#overlay)" />
  ${pattern}
  <g filter="url(#glow)">
    <text x="80" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="800" fill="white" opacity="0.98">
      <tspan x="80" dy="0">${displayTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</tspan>
    </text>
  </g>
  <rect x="80" y="360" width="80" height="4" rx="2" fill="white" opacity="0.6" />
  <text x="80" y="520" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500" fill="white" opacity="0.7">
    Asia Family Travel Directory
  </text>
  <circle cx="1120" cy="100" r="60" fill="white" opacity="0.06" />
  <circle cx="1080" cy="60" r="30" fill="white" opacity="0.04" />
</svg>`;
}

// Main
if (!existsSync(BLOG_DIR)) {
  console.error(`Blog directory not found: ${BLOG_DIR}`);
  process.exit(1);
}

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.json')).sort();

let generated = 0;
for (const file of files) {
  const filePath = join(BLOG_DIR, file);
  const post = JSON.parse(readFileSync(filePath, 'utf-8'));
  const slug = post.slug;
  const title = post.title;

  if (!slug) {
    console.warn(`⚠ Skipping ${file}: no slug`);
    continue;
  }

  // Generate SVG image
  const svg = generateSvg(slug, title);
  const outputFile = join(OUTPUT_DIR, `${slug}.svg`);
  writeFileSync(outputFile, svg, 'utf-8');

  // Update the JSON file with featuredImage if not already set
  if (!post.featuredImage) {
    post.featuredImage = `/images/blog/${slug}.svg`;
    writeFileSync(filePath, JSON.stringify(post, null, 2) + '\n', 'utf-8');
    generated++;
  }
}

console.log(`✓ Generated ${generated} featured images → ${OUTPUT_DIR}`);
console.log(`  Total posts processed: ${files.length}`);
