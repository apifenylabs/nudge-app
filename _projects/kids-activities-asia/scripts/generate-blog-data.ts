import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'data', 'blog');
const outputPath = path.join(process.cwd(), 'lib', 'generated-blog-data.ts');

if (!fs.existsSync(blogDir)) {
  console.error('data/blog/ directory not found');
  process.exit(1);
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
const posts: any[] = [];

for (const file of files) {
  try {
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const post = JSON.parse(raw);
    posts.push(post);
  } catch (e) {
    console.error(`Failed to parse ${file}:`, e);
  }
}

// Sort by date descending
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const code = `// Auto-generated from data/blog/*.json — DO NOT EDIT DIRECTLY
// Run: npx tsx scripts/generate-blog-data.ts

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  author?: string;
  readingTime?: number;
}

const allPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export default allPosts;
`;

fs.writeFileSync(outputPath, code, 'utf-8');
console.log(`Generated ${posts.length} blog posts → lib/generated-blog-data.ts`);
