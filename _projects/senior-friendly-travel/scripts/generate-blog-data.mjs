#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const BLOG_DIR = join(PROJECT_DIR, 'data', 'blog');
const OUTPUT_FILE = join(PROJECT_DIR, 'lib', 'generated-blog-data.ts');

const ALLOWED_FIELDS = new Set(['slug', 'title', 'excerpt', 'date', 'author', 'tags', 'readingTime', 'content', 'relatedDestinations', 'relatedStations', 'featuredImage']);

if (!existsSync(BLOG_DIR)) {
  console.error(`Blog directory not found: ${BLOG_DIR}`);
  process.exit(1);
}

const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.json')).sort();
const posts = files.map(f => {
  const raw = JSON.parse(readFileSync(join(BLOG_DIR, f), 'utf-8'));
  const clean = {};
  for (const [k, v] of Object.entries(raw)) {
    if (ALLOWED_FIELDS.has(k)) clean[k] = v;
  }
  return clean;
});

posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

const allHaveDestinations = posts.every(p => 'relatedDestinations' in p);
const allHaveStations = posts.every(p => 'relatedStations' in p);
const anyHasDestinations = posts.some(p => 'relatedDestinations' in p);
const relatedField = allHaveStations ? 'relatedStations' : (anyHasDestinations ? 'relatedDestinations' : 'relatedDestinations');

const ts = `// Auto-generated from data/blog/*.json — DO NOT EDIT DIRECTLY
// Run: npm run generate-blog-data

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  content: string;
  ${relatedField}: string[];
  featuredImage?: string;
}

const allPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export default allPosts;
`;

writeFileSync(OUTPUT_FILE, ts);
console.log(`✓ Generated ${posts.length} posts → lib/generated-blog-data.ts`);
