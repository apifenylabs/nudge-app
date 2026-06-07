// ══════════════════════════════════════════════════════════
// CountryBlogPosts — Links from country pages to matching
// blog posts (e.g., /ai-tools-singapore → /blog/best-ai-tools-singapore-...)
//
// Uses country keywords to find matching blog posts.
// Shows 2-4 most relevant posts in a compact card layout.
// ══════════════════════════════════════════════════════════
// Server-safe — no `use client`, no hooks.

import Link from 'next/link';
import { BookOpen, ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data';

interface CountryBlogPostsProps {
  /** Country name (e.g., "Singapore", "Indonesia") */
  countryName: string;
  /** Country slug for the URL path (e.g., "singapore") */
  countrySlug: string;
  /** Max blog posts to show */
  limit?: number;
  /** Section heading override */
  heading?: string;
}

/**
 * Maps a country name/slug to a set of keywords used to match blog posts.
 * Matches by slug containment (e.g., "best-ai-tools-singapore-...") and tags.
 */
function getCountryKeywords(countryName: string, countrySlug: string): string[] {
  const base = new Set<string>();
  
  // Add the country slug fragment
  base.add(countrySlug.toLowerCase().replace(/-/g, ' '));
  base.add(countrySlug.toLowerCase());
  
  // Add known variants
  const variants: Record<string, string[]> = {
    singapore: ['singapore', 's'],
    indonesia: ['indonesia', 'id', 'indo'],
    vietnam: ['vietnam', 'vn'],
    thailand: ['thailand', 'thai', 'th'],
    malaysia: ['malaysia', 'malay', 'my'],
    philippines: ['philippines', 'ph', 'filipino'],
    'hong-kong': ['hong kong', 'hongkong', 'hk'],
    'south-korea': ['south korea', 'korea', 'korean', 'kr'],
    bangladesh: ['bangladesh', 'bd'],
    cambodia: ['cambodia', 'kh'],
    laos: ['laos', 'laotian'],
    myanmar: ['myanmar', 'burma', 'mm'],
    nepal: ['nepal', 'np'],
    pakistan: ['pakistan', 'pk'],
    'sri-lanka': ['sri lanka', 'lk'],
    taiwan: ['taiwan', 'tw'],
  };
  
  if (variants[countrySlug]) {
    variants[countrySlug].forEach(v => base.add(v));
  }
  
  return Array.from(base);
}

function getMatchingPosts(
  countryName: string,
  countrySlug: string,
  limit: number
): BlogPost[] {
  const allPosts = getAllPosts();
  const keywords = getCountryKeywords(countryName, countrySlug);
  
  // Score each post by how well it matches the country
  const scored = allPosts
    .map(post => {
      const slugLower = post.slug.toLowerCase();
      const titleLower = post.title.toLowerCase();
      const tagLower = post.tags.map(t => t.toLowerCase());
      
      let score = 0;
      
      // Check slug for country keyword
      for (const kw of keywords) {
        if (slugLower.includes(kw.replace(/[\s-]/g, ''))) {
          score += 10;
        }
        if (titleLower.includes(kw)) {
          score += 5;
        }
        if (tagLower.some(t => t.includes(kw))) {
          score += 3;
        }
      }
      
      // Bonus for direct country match in slug
      if (slugLower.includes(`ai-tools-${countrySlug}`)) {
        score += 15;
      }
      if (slugLower.includes(`best-ai-tools-${countrySlug}`)) {
        score += 20;
      }
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  return scored.map(item => item.post);
}

export default function CountryBlogPosts({
  countryName,
  countrySlug,
  limit = 4,
  heading,
}: CountryBlogPostsProps) {
  const posts = getMatchingPosts(countryName, countrySlug, limit);
  if (posts.length === 0) return null;
  
  return (
    <section className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-violet-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {heading || `In-Depth Guides for ${countryName}`}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mb-8">
          Read our detailed guides on AI tools, strategies, and best practices for {countryName} businesses and professionals.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/30 transition-all"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-violet-700 transition mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTime}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-violet-600 font-medium group-hover:gap-1.5 transition-all">
                    Read guide
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-6 text-center sm:text-left">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-violet-700 hover:underline group"
          >
            Browse all guides
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
