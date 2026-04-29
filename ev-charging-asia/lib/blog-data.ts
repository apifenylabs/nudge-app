import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  content: string;
  relatedStations: string[];
}

export function getAllPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'data', 'blog');
  try {
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
    const posts: BlogPost[] = files.map(file => {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      return JSON.parse(raw);
    });
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
  } catch {
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug) || null;
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const posts = getAllPosts();
  const current = posts.find(p => p.slug === currentSlug);
  if (!current) return posts.filter(p => p.slug !== currentSlug).slice(0, limit);
  const currentTags = current.tags.map(t => t.toLowerCase());
  const scored = posts
    .filter(p => p.slug !== currentSlug)
    .map(p => {
      const overlap = p.tags.filter(t => currentTags.includes(t.toLowerCase())).length;
      return { post: p, score: overlap };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.post);
}
