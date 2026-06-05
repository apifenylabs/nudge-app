// ═══════════════════════════════════════════════════════════════════════════════
// APIFENY.AI — Category to Blog Post Cross-Linking
// ═══════════════════════════════════════════════════════════════════════════════
// Maps tool categories to their best-matching blog posts based on tag overlap
// and keyword matching. Used by /categories/[slug]/page.tsx to show related
// blog content, improving internal linking and SEO.
// ═══════════════════════════════════════════════════════════════════════════════

import { CategoryInfo } from './category-data';
import { getAllPosts, BlogPost } from './blog-data';

interface ScoredPost {
  post: BlogPost;
  score: number;
}

/**
 * Map each tool category to search terms that find relevant blog posts.
 * The terms are matched against blog post titles, tags, and excerpts.
 */
const CATEGORY_BLOG_KEYWORDS: Record<string, string[]> = {
  'chatbots-assistants': ['chatbot', 'chatgpt', 'claude', 'gemini', 'assistant', 'deepseek', 'ai-chat', 'AI-assistants'],
  'code-development': ['coding', 'cursor', 'copilot', 'developer', 'programming', 'development', 'app-building', 'no-code', 'AI-coding', 'mvp'],
  'writing-content': ['writing', 'content-creation', 'ai-writing-tools', 'blogging', 'content', 'copywriting', 'canva'],
  'image-generation': ['image-generation', 'midjourney', 'dall-e', 'dalle', 'adobe-firefly', 'ai-art', 'design', 'AI-design', 'product-photography', 'ai-content'],
  'video-animation': ['video', 'video-creation', 'video-editing', 'video-marketing'],
  'marketing-seo': ['marketing', 'seo', 'social-media', 'email-marketing', 'digital-marketing', 'content-strategy', 'growth'],
  'design-creative': ['design', 'AI-design', 'canva', 'adobe-firefly', 'midjourney', 'website-design', 'product-photography', 'content-creation'],
  'data-analytics': ['data', 'analytics', 'business-intelligence', 'finance'],
  'ai-agents': ['AI agents', 'agent', 'autonomous', 'cursor', 'agentic'],
  'productivity': ['productivity', 'automation', 'workflow', 'time-management', 'scheduling', 'n8n', 'zapier'],
  'audio-voice': ['audio', 'voice', 'music', 'elevenlabs', 'suno', 'speech', 'text-to-speech'],
  'no-code-automation': ['no-code', 'automation', 'workflow', 'zapier', 'n8n', 'app-building', 'mvp'],
  'research-analysis': ['research', 'analysis', 'perplexity', 'competitive', 'market-research', 'intelligence'],
};

/**
 * Find blog posts related to a tool category by matching the category's
 * blog keywords against all published posts.
 */
export function getBlogPostsForCategory(
  category: CategoryInfo,
  limit: number = 4
): BlogPost[] {
  const keywords = CATEGORY_BLOG_KEYWORDS[category.slug] || [];

  if (keywords.length === 0) {
    // Fallback: use category name words + description keywords
    const fallbackTerms = [
      category.name.toLowerCase(),
      ...category.keywords.map(k => k.toLowerCase()),
    ];
    return findMatchingPosts(fallbackTerms, limit);
  }

  return findMatchingPosts(keywords, limit);
}

function findMatchingPosts(terms: string[], limit: number): BlogPost[] {
  const allPosts = getAllPosts();
  const scored: ScoredPost[] = allPosts.map(post => {
    let score = 0;
    const titleLow = post.title.toLowerCase();
    const excerptLow = post.excerpt.toLowerCase();
    const tagsLow = post.tags.map(t => t.toLowerCase());

    for (const term of terms) {
      const termLow = term.toLowerCase();

      // Title match = strongest signal
      if (titleLow.includes(termLow)) {
        score += 4;
        // Exact word match bonus
        const titleWords = titleLow.split(/\s+/);
        if (titleWords.some(w => w === termLow)) score += 2;
      }

      // Tag match = good signal
      if (tagsLow.some(t => t.includes(termLow) || t === termLow)) {
        score += 3;
      }

      // Excerpt match = weaker signal
      if (excerptLow.includes(termLow)) {
        score += 1;
      }
    }

    // Recency bonus: newer posts rank higher
    const postDate = new Date(post.date).getTime();
    const now = Date.now();
    const daysOld = (now - postDate) / (1000 * 60 * 60 * 24);
    if (daysOld < 30) score += 3;   // Last month
    else if (daysOld < 90) score += 1.5; // Last quarter
    else if (daysOld < 180) score += 0.5; // Last 6 months

    return { post, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.post);
}
