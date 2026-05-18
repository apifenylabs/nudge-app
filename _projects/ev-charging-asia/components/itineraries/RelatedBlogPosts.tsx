'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronRight, Calendar } from 'lucide-react';

interface BlogPostPreview {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

interface RelatedBlogPostsProps {
  /** Keywords from the itinerary — e.g. ['thailand', 'bangkok', 'phuket'] */
  keywords: string[];
  /** Country names from the itinerary */
  countries: string[];
  /** Limit of posts to show */
  limit?: number;
}

/**
 * Cross-links blog posts relevant to this itinerary route.
 * Matches by keyword intersection against blog tags.
 * Additive component — safe to drop into any page.
 */
export default function RelatedBlogPosts({ keywords, countries, limit = 3 }: RelatedBlogPostsProps) {
  const [posts, setPosts] = useState<BlogPostPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Build search terms from keywords + countries
    const terms = [
      ...keywords.slice(0, 5).map(k => k.toLowerCase()),
      ...countries.slice(0, 3).map(c => c.toLowerCase()),
    ];

    async function load() {
      try {
        // Try to load the blog index
        const res = await fetch('/api/blog/related', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ terms, limit }),
        });
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts || []);
        }
      } catch {
        // Silently fail — blog links are nice-to-have
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [keywords.join(','), countries.join(','), limit]);

  if (loading || posts.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-5 mb-8">
      <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
        <BookOpen size={18} className="text-emerald-500" />
        Related Guides & Articles
      </h3>
      <div className="divide-y divide-emerald-100">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 group"
          >
            <div className="shrink-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <BookOpen size={14} className="text-emerald-600" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={10} className="text-gray-400" />
                <span className="text-[10px] text-gray-400">{post.date}</span>
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ChevronRight size={14} className="text-emerald-400 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ))}
      </div>
      <Link
        href="/blog"
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        View all guides <ChevronRight size={12} />
      </Link>
    </div>
  );
}
