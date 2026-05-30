// ══════════════════════════════════════════════════════════
// BlogCategoryLinks — Cross-links from landing pages to blog
// topic cluster category pages. Improves topical authority
// signals and internal linking for SEO.
// ══════════════════════════════════════════════════════════
// Server-safe — no `use client`, no hooks.

import Link from 'next/link';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { getAllCategories } from '@/lib/blog-categories';
import { getAllPosts } from '@/lib/blog-data';

interface BlogCategoryLink {
 slug: string;
 title: string;
 description: string;
 count: number;
}

function getCategories(): BlogCategoryLink[] {
 const cats = getAllCategories();
 const posts = getAllPosts();
 return cats.map(c => ({
 slug: c.slug,
 title: c.title,
 description: c.description,
 count: posts.filter(p =>
 p.tags.some(t => c.tags.map(ct => ct.toLowerCase()).includes(t.toLowerCase()))
 ).length,
 }));
}

interface Props {
 /** Show only categories matching these slugs. Omit to show all. */
 slugs?: string[];
 /** Max categories to display */
 limit?: number;
 /** Section heading override */
 heading?: string;
}

export default function BlogCategoryLinks({ slugs, limit = 4, heading }: Props) {
 let cats = getCategories();
 if (slugs && slugs.length > 0) {
 cats = cats.filter(c => slugs.includes(c.slug));
 }
 if (cats.length === 0) return null;

 const display = cats.slice(0, limit);

 return (
 <section className="border-t border-gray-200 bg-gray-50/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
 <div className="flex items-center gap-2 mb-6">
 <BookOpen className="w-5 h-5 text-blue-600" />
 <h2 className="text-xl font-bold text-gray-900">
 {heading || 'Read In-Depth Guides'}
 </h2>
 </div>

 <p className="text-gray-600 max-w-2xl mb-8 text-sm sm:text-base">
 Browse our latest articles for practical tips, comparisons, and strategies to get the most out of AI.
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {display.map(cat => (
 <Link
 key={cat.slug}
 href={`/blog/category/${cat.slug}`}
 className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
 >
 <div className="flex items-start justify-between">
 <div className="flex-1 min-w-0">
 <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition mb-1">
 {cat.title}
 </h3>
 <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">
 {cat.description}
 </p>
 <span className="text-xs text-gray-400">{cat.count} guides</span>
 </div>
 <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 shrink-0 mt-1 transition-colors" />
 </div>
 </Link>
 ))}
 </div>

 <div className="mt-6">
 <Link
 href="/blog"
 className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:underline group"
 >
 Browse all guides
 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
 </Link>
 </div>
 </div>
 </section>
 );
}
