// ══════════════════════════════════════════════════════════
// ToolRelatedBlogPosts — Cross-links from tool detail pages
// to relevant blog posts. Improves internal linking for SEO
// and helps users discover in-depth guides.
// ══════════════════════════════════════════════════════════
// Server-safe — no `use client`, no hooks.

import Link from 'next/link';
import { Calendar, Clock, ChevronRight, BookOpen } from 'lucide-react';
import { getBlogPostsForTool } from '@/lib/blog-data';

interface Props {
  toolName: string;
  toolSlug: string;
  toolUseCases: string[];
  toolCategory: string;
  limit?: number;
}

export default function ToolRelatedBlogPosts({
  toolName,
  toolSlug,
  toolUseCases,
  toolCategory,
  limit = 4,
}: Props) {
  const posts = getBlogPostsForTool(toolName, toolSlug, toolUseCases, toolCategory, limit);

  if (posts.length === 0) return null;

  return (
    <section className="mt-6 rounded-xl border border-tech-500/30 bg-tech-700/60 p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-neon-light" />
        Related Guides & Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-tech-500/20 bg-tech-800/50 p-3.5 hover:border-neon/30 hover:bg-tech-700/80 transition-all"
          >
            <h3 className="text-xs font-semibold text-white group-hover:text-neon-light transition-colors line-clamp-2 mb-1.5">
              {post.title}
            </h3>
            <p className="text-[10px] text-tech-400 line-clamp-2 leading-relaxed mb-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-[9px] text-tech-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {post.readingTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-3 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-[10px] text-neon-light hover:text-neon transition group"
        >
          Browse all guides
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
