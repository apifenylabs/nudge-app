// ══════════════════════════════════════════════════════════
// BlogPostCrossLinks — In-content contextual cross-links
// between related blog posts. Placed within the article body
// to improve internal link equity and topical authority.
//
// Matches current post's tags against all other posts to find
// the most relevant 2-3 entries. Excludes the current post
// and respects a similarity threshold.
//
// This directly addresses the SEO_AUDIT finding:
//   "Internal linking between playbooks ↔ blog ↔ tools is weak"
// ══════════════════════════════════════════════════════════

import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data';

interface BlogPostCrossLinksProps {
  currentSlug: string;
  currentTags: string[];
  maxLinks?: number;
}

/**
 * Score posts by tag overlap, excluding the current post.
 * Returns top-scoring posts with a minimum threshold of 1 overlapping tag.
 */
function getTopRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  maxLinks: number
): BlogPost[] {
  const all = getAllPosts();
  const tagSet = new Set(currentTags.map(t => t.toLowerCase()));

  const scored = all
    .filter(p => p.slug !== currentSlug)
    .map(p => {
      const overlap = p.tags.filter(t => tagSet.has(t.toLowerCase())).length;
      return { post: p, score: overlap };
    })
    .filter(p => p.score >= 1) // at least 1 overlapping tag
    .sort((a, b) => b.score - a.score);

  // Deduplicate: avoid showing near-identical slugs (same topic, different angle)
  const seen = new Set<string>();
  const unique: BlogPost[] = [];
  for (const { post } of scored) {
    // Extract base topic from slug (first 2-3 words)
    const base = post.slug.split('-').slice(0, 3).join('-');
    if (!seen.has(base)) {
      seen.add(base);
      unique.push(post);
    }
    if (unique.length >= maxLinks) break;
  }

  return unique;
}

export default function BlogPostCrossLinks({
  currentSlug,
  currentTags,
  maxLinks = 3,
}: BlogPostCrossLinksProps) {
  const related = getTopRelatedPosts(currentSlug, currentTags, maxLinks);
  if (related.length === 0) return null;

  return (
    <div className="mt-10 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-semibold text-blue-800">
          You might also find these helpful
        </span>
      </div>
      <ul className="space-y-3">
        {related.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-white/70 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition line-clamp-2">
                  {post.title}
                </span>
                <span className="text-xs text-gray-500 mt-0.5 block">
                  {post.readingTime} · {post.excerpt.substring(0, 80)}{post.excerpt.length > 80 ? '...' : ''}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-blue-600 shrink-0 mt-0.5 transition" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-blue-100">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition"
        >
          Browse all guides
          <Sparkles className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
