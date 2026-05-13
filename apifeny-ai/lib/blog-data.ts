// Blog data loaded from generated-blog-data.ts
import allPosts, { BlogPost } from './generated-blog-data';

export type { BlogPost };

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return allPosts.find(p => p.slug === slug) || null;
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const current = allPosts.find(p => p.slug === currentSlug);
  if (!current) return allPosts.filter(p => p.slug !== currentSlug).slice(0, limit);
  const currentTags = current.tags.map(t => t.toLowerCase());
  const scored = allPosts
    .filter(p => p.slug !== currentSlug)
    .map(p => {
      const overlap = p.tags.filter(t => currentTags.includes(t.toLowerCase())).length;
      return { post: p, score: overlap };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.post);
}
