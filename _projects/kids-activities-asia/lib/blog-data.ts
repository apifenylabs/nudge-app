import allPosts, { BlogPost } from './generated-blog-data';

export type { BlogPost };

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, maxCount: number = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const related = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const sharedTags = post.tags.filter(tag => current.tags.includes(tag));
      return { post, relevance: sharedTags.length };
    })
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxCount)
    .map(item => item.post);

  return related;
}
