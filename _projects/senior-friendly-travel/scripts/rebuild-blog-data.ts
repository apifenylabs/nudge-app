// Standalone script to regenerate generated-blog-data.ts from data/blog/*.json
// Usage: npx tsx scripts/rebuild-blog-data.ts

import * as fs from 'fs';
import * as path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'data', 'blog');
const OUTPUT = path.join(process.cwd(), 'lib', 'generated-blog-data.ts');

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  content: string;
  relatedDestinations: string[];
}

const ALLOWED_KEYS = new Set([
  'slug', 'title', 'excerpt', 'date', 'author',
  'tags', 'readingTime', 'content', 'relatedDestinations'
]);

const files = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const posts: BlogPost[] = files.map(f => {
  const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8');
  const data = JSON.parse(raw);
  // Strip extra fields that don't belong in the interface
  const post: any = {};
  for (const key of ALLOWED_KEYS) {
    if (key in data) {
      post[key] = data[key];
    } else {
      // Set defaults for missing fields
      if (key === 'relatedDestinations') post[key] = [];
      else if (key === 'tags') post[key] = ['family-travel'];
      else if (key === 'readingTime') post[key] = '5 min read';
      else if (key === 'author') post[key] = 'Family Travel Asia Team';
      else if (key === 'excerpt') post[key] = '';
      else if (key === 'date') post[key] = '2026-01-01';
    }
  }
  return post as BlogPost;
});

// Validate no duplicate slugs
const slugs = new Set<string>();
for (const p of posts) {
  if (slugs.has(p.slug)) {
    console.error(`DUPLICATE SLUG: ${p.slug}`);
    process.exit(1);
  }
  slugs.add(p.slug);
}

// Build TypeScript output
const lines: string[] = [];
lines.push('// Auto-generated from data/blog/*.json — DO NOT EDIT DIRECTLY');
lines.push('// Run: npm run generate-blog-data');
lines.push('');
lines.push('export interface BlogPost {');
lines.push('  slug: string;');
lines.push('  title: string;');
lines.push('  excerpt: string;');
lines.push('  date: string;');
lines.push('  author: string;');
lines.push('  tags: string[];');
lines.push('  readingTime: string;');
lines.push('  content: string;');
lines.push('  relatedDestinations: string[];');
lines.push('}');
lines.push('');
lines.push('const allPosts: BlogPost[] = [');
for (const p of posts) {
  lines.push('  ' + JSON.stringify(p).split('\n').join('\n  ') + ',');
}
lines.push('];');
lines.push('');
lines.push('export default allPosts;');

const output = lines.join('\n');
fs.writeFileSync(OUTPUT, output);
console.log(`Generated: ${OUTPUT}`);
console.log(`Posts: ${posts.length}`);
