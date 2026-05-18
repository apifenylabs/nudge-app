import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const blogDir = join(__dirname, 'data', 'blog');
const outputPath = join(__dirname, 'lib', 'generated-blog-data.ts');

if (!existsSync(blogDir)) {
  console.error('data/blog/ directory not found');
  process.exit(1);
}

const files = readdirSync(blogDir).filter(f => f.endsWith('.json'));
const posts = [];

for (const file of files) {
  try {
    const raw = readFileSync(join(blogDir, file), 'utf-8');
    const post = JSON.parse(raw);
    posts.push(post);
  } catch (e) {
    console.error(`Failed to parse ${file}:`, e.message);
  }
}

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const code = `// Auto-generated from data/blog/*.json — DO NOT EDIT DIRECTLY
// Run: node generate-blog.mjs

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  author?: string;
  readingTime?: number | string;
}

const allPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export default allPosts;
`;

writeFileSync(outputPath, code, 'utf-8');
console.log(`Generated ${posts.length} blog posts -> lib/generated-blog-data.ts`);
