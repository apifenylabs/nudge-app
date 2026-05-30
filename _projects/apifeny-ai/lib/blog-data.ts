// Blog data loaded from generated-blog-data.ts
import allPosts, { BlogPost } from './generated-blog-data';
import { toolsData } from './data';
import { getAllCategories } from './blog-categories';
import type { Tool } from './types';

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

/**
 * Find the best-matching blog category for a post by comparing its tags
 * against each category's tag list. Returns the category with the most overlap.
 */
export function getCategoryForPost(post: BlogPost): { slug: string; title: string } | null {
  const postTagsLower = post.tags.map(t => t.toLowerCase());
  let bestMatch: { slug: string; title: string } | null = null;
  let bestScore = 0;

  for (const cat of getAllCategories()) {
    const catTagsLower = cat.tags.map(t => t.toLowerCase());
    const overlap = postTagsLower.filter(t => catTagsLower.includes(t)).length;
    // Bonus: if post title mentions category keywords
    const titleLower = post.title.toLowerCase();
    const keywordBonus = cat.keywords.some(kw => titleLower.includes(kw.toLowerCase())) ? 2 : 0;
    const score = overlap + keywordBonus;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = { slug: cat.slug, title: cat.title };
    }
  }

  return bestMatch;
}

/**
 * Get related posts that belong to the same blog category as the current post.
 * Falls back to tag-based related posts if no category match is found.
 */
export function getRelatedPostsByCategory(currentSlug: string, limit: number = 4): { post: BlogPost; category: { slug: string; title: string } | null }[] {
  const current = allPosts.find(p => p.slug === currentSlug);
  if (!current) return [];

  const category = getCategoryForPost(current);
  if (!category) {
    // Fallback: use tag-based related posts with no category label
    return getRelatedPosts(currentSlug, limit).map(p => ({ post: p, category: null }));
  }

  // Find all posts in the same category (excluding current)
  const catTagsLower = getAllCategories().find(c => c.slug === category.slug)?.tags.map(t => t.toLowerCase()) || [];
  const sameCategoryPosts = allPosts
    .filter(p => p.slug !== currentSlug)
    .filter(p => p.tags.some(t => catTagsLower.includes(t.toLowerCase())))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sameCategoryPosts.length === 0) {
    return getRelatedPosts(currentSlug, limit).map(p => ({ post: p, category: null }));
  }

  return sameCategoryPosts.slice(0, limit).map(p => ({ post: p, category }));
}

/**
 * Find blog posts related to a tool by matching:
 * - Tool name in blog post title/excerpt/tags (highest score)
 * - Tool slug in blog tags
 * - Tool use_cases/category in blog tags (lower score)
 * Returns scored + ranked results, deduplicated.
 */
export function getBlogPostsForTool(
  toolName: string,
  toolSlug: string,
  toolUseCases: string[],
  toolCategory: string,
  limit: number = 6
): BlogPost[] {
  const keywords = [
    toolName.toLowerCase(),
    toolSlug.toLowerCase(),
    toolCategory.toLowerCase(),
    ...toolUseCases.map(u => u.toLowerCase()),
  ];

  const scored = allPosts.map(p => {
    let score = 0;
    const titleLow = p.title.toLowerCase();
    const excerptLow = p.excerpt.toLowerCase();
    const tagLow = p.tags.map(t => t.toLowerCase());

    // Direct name mention in title = strongest signal
    if (titleLow.includes(toolName.toLowerCase())) score += 5;
    if (titleLow.includes(toolSlug.toLowerCase())) score += 3;
    if (excerptLow.includes(toolName.toLowerCase())) score += 2;

    // Tag overlap
    const nameTags = tagLow.filter(t => t.includes(toolName.toLowerCase()) || t.includes(toolSlug.toLowerCase()));
    score += nameTags.length * 3;

    // Use-case / category overlap with tags
    const useCaseOverlap = tagLow.filter(t =>
      toolUseCases.some(uc => t.includes(uc.toLowerCase()))
    );
    score += useCaseOverlap.length * 1;

    // Category overlap
    if (tagLow.some(t => t.includes(toolCategory.toLowerCase()))) score += 1;

    return { post: p, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.post);
}

/**
 * Find tools related to a blog post by matching:
 * - Blog post title words against tool names (highest score)
 * - Blog post tags against tool slugs, category, use_cases
 * Returns scored + ranked results, deduplicated.
 */
export function getToolsForBlogPost(
  postTitle: string,
  postTags: string[],
  limit: number = 4
): Tool[] {
  const titleWords = postTitle.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const tagSet = postTags.map(t => t.toLowerCase());

  const scored = toolsData.map(tool => {
    let score = 0;
    const nameLow = tool.name.toLowerCase();
    const slugLow = tool.slug.toLowerCase();
    const catLow = tool.category.toLowerCase();

    // Direct name/slug in title = strongest
    if (postTitle.toLowerCase().includes(nameLow)) score += 5;
    if (postTitle.toLowerCase().includes(slugLow)) score += 3;

    // Title word overlap with tool name
    const nameWords = nameLow.split(/\s+/);
    titleWords.forEach(w => {
      if (nameWords.some(nw => nw.includes(w) || w.includes(nw))) score += 2;
    });

    // Tag matches
    tagSet.forEach(tag => {
      if (tag.includes(slugLow)) score += 3;
      if (tag.includes(catLow)) score += 1;
      if (tool.use_cases?.some(uc => tag.includes(uc.toLowerCase()))) score += 1;
    });

    return { tool, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.tool);
}
