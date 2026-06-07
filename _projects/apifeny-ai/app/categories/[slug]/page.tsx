import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Sparkles, BookOpen, TrendingUp, Star, DollarSign, Globe } from 'lucide-react';
import { CATEGORIES, getCategoryBySlug, getAllCategorySlugs } from '@/lib/category-data';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import { getBlogPostsForCategory } from '@/lib/category-blog-links';
import type { Tool } from '@/lib/types';
import { getPricingLabel, getPricingColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const BASE_URL = 'https://apifeny-ai.vercel.app';

// ── Static params ──────────────────────────────────────────────────────
export function generateStaticParams() {
 return getAllCategorySlugs().map((slug) => ({ slug }));
}

// ── Metadata ───────────────────────────────────────────────────────────
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
 const cat = getCategoryBySlug(params.slug);
 if (!cat) return {};

 return {
 title: cat.metaTitle,
 description: cat.metaDescription,
 keywords: cat.keywords.join(', '),
 alternates: { canonical: `${BASE_URL}/categories/${cat.slug}` },
 openGraph: {
 title: cat.metaTitle,
 description: cat.metaDescription,
 url: `${BASE_URL}/categories/${cat.slug}`,
 siteName: 'Apifeny AI',
 type: 'website',
 },
 };
}

// ── Helpers ────────────────────────────────────────────────────────────
function slugifyCategory(name: string): string {
 return name
 .toLowerCase()
 .replace(/[&]+/g, 'and')
 .replace(/[^a-z0-9]+/g, '-')
 .replace(/^-|-$/g, '');
}

function getCategoryToolCount(catName: string): number {
 return toolsData.filter(t => t.category === catName && t.is_published).length;
}

// ── Page Component ─────────────────────────────────────────────────────
export default function CategoryPage({ params }: { params: { slug: string } }) {
 const cat = getCategoryBySlug(params.slug);
 if (!cat) notFound();

 // Get tools in this category, sorted by trending_score
 const categoryTools = toolsData
 .filter(t => t.category === cat.name && t.is_published)
 .sort((a, b) => b.trending_score - a.trending_score);

 // Find related playbooks for this category
 const relatedPlaybooks = playbooks
 .filter(pb => {
 // Check if any tool in this category is referenced by the playbook
 return pb.related_tool_slugs?.some(slug =>
 categoryTools.some(t => t.slug === slug)
 );
 })
 .slice(0, 4);

 // Count free vs paid tools
 const freeCount = categoryTools.filter(t => t.pricing_tier === 'Free' || t.pricing_tier === 'Freemium' || t.pricing_tier === 'Open Source').length;
 const paidCount = categoryTools.filter(t => t.pricing_tier === 'Paid' || t.pricing_tier === 'Enterprise').length;
 const asiaReadyCount = categoryTools.filter(t => t.asia_ready).length;

 return (
 <div className="min-h-screen bg-white">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Categories', item: '/categories' },
 { name: cat.name, item: `/categories/${cat.slug}` },
 ]}
 />
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 <BreadcrumbNav
 className="mb-6"
 items={[
 { label: 'Categories', href: '/categories' },
 { label: cat.name },
 ]}
 />

 {/* Hero */}
 <section className="relative mb-10 sm:mb-12">
 <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full opacity-10 blur-[100px]"
 style={{ background: `linear-gradient(135deg, var(--neon, #6366f1), var(--aqua, #06b6d4))` }}
 />
 <div className="relative">
 <div className="flex items-center gap-3 mb-3">
 <span className="text-4xl">{cat.icon}</span>
 <div>
 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
 Best {cat.name} Tools
 </h1>
 <p className="text-gray-600 text-sm mt-1">
 {categoryTools.length} tools • {freeCount} free/freemium • {paidCount} paid • {asiaReadyCount} Asia-ready
 </p>
 </div>
 </div>
 <p className="text-sm sm:text-base text-gray-800/80 max-w-3xl mt-4 leading-relaxed">
 {cat.longDescription}
 </p>
 </div>
 </section>

 {/* Quick stats */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
 <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
 <div className="text-2xl font-bold text-gray-900">{categoryTools.length}</div>
 <div className="text-[11px] text-gray-600 mt-0.5">Tools Listed</div>
 </div>
 <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
 <div className="text-2xl font-bold text-emerald-400">{freeCount}</div>
 <div className="text-[11px] text-gray-600 mt-0.5">Free / Freemium</div>
 </div>
 <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
 <div className="text-2xl font-bold text-aqua-400">
 {categoryTools.reduce((max, t) => Math.max(max, t.avg_rating || 0), 0).toFixed(1)}
 </div>
 <div className="text-[11px] text-gray-600 mt-0.5">Top Rating</div>
 </div>
 <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
 <div className="text-2xl font-bold text-asia">
 {Math.round((asiaReadyCount / Math.max(categoryTools.length, 1)) * 100)}%
 </div>
 <div className="text-[11px] text-gray-600 mt-0.5">Asia-Ready</div>
 </div>
 </div>

 {/* Tool Comparison Table */}
 <section className="mb-12">
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
 Compare {cat.name} Tools
 </h2>
 <p className="text-gray-600 text-sm mb-6">
 Our curated rankings are based on Asia-readiness, pricing, community ratings, and real-world performance.
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
 {categoryTools.slice(0, 12).map((tool) => (
 <Link
 key={tool.slug}
 href={`/tools/${tool.slug}`}
 className="group relative rounded-xl border border-gray-200 bg-white p-5 hover:border-neon/40 transition-all hover:-translate-y-1 overflow-hidden"
 >
 <div className="absolute inset-0 bg-gray-50 opacity-10 pointer-events-none" />
 <div className="relative">
 {/* Header */}
 <div className="flex items-start justify-between mb-3">
 <div className="min-w-0 flex-1">
 <div className="flex items-center gap-2 mb-1">
 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-gray-200/30">
 <span className="text-gray-900 font-bold text-xs">
 {tool.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
 </span>
 </div>
 <h3 className="text-sm font-semibold text-gray-900 group-hover:text-neon-light transition-colors truncate">
 {tool.name}
 </h3>
 </div>
 <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
 {tool.tagline || tool.description?.split('.')[0]}
 </p>
 </div>
 {/* Rating badge */}
 <div className="flex items-center gap-1 text-xs text-amber-400 shrink-0 ml-2">
 <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
 <span className="font-semibold">{tool.avg_rating?.toFixed(1)}</span>
 </div>
 </div>

 {/* Tags row */}
 <div className="flex flex-wrap items-center gap-1.5 mb-3">
 <span className={cn(
 'inline-flex items-center px-2 py-0.5 rounded text-[9px] font-medium border',
 getPricingColor(tool.pricing_tier)
 )}>
 {getPricingLabel(tool.pricing_tier)}
 </span>
 {tool.asia_ready && (
 <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
 Asia-Ready
 </span>
 )}
 {tool.is_multimodal && (
 <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
 Multimodal
 </span>
 )}
 {tool.is_agentic && (
 <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-medium border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300">
 Agentic
 </span>
 )}
 </div>

 {/* Trending score bar */}
 <div className="flex items-center gap-2">
 <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
 <div
 className="h-full rounded-full bg-gradient-to-r from-neon/60 to-aqua/60 transition-all"
 style={{ width: `${Math.min((tool.trending_score || 0), 100)}%` }}
 />
 </div>
 <span className="text-[10px] text-gray-400 font-mono">{Math.round(tool.trending_score)}</span>
 <div className="flex items-center gap-1 text-[10px] text-neon-light opacity-0 group-hover:opacity-100 transition-opacity">
 <span>Details</span>
 <ChevronRight className="w-3 h-3" />
 </div>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </section>

 {/* FAQ Section ───────────────────────────────────── */}
 <section className="mb-12">
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
 {cat.h2Headings[0] || `Frequently Asked Questions About ${cat.name} Tools`}
 </h2>
 <div className="space-y-4">
 {/* Generated FAQs */}
 {cat.h2Headings.map((heading, i) => (
 <details
 key={i}
 className="group rounded-xl border border-gray-200 bg-gray-50 overflow-hidden"
 >
 <summary className="flex items-center justify-between px-5 py-4 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100/40 transition">
 <span className="flex items-center gap-2">
 <Sparkles className="w-4 h-4 text-neon-light shrink-0" />
 {heading}
 </span>
 <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90 shrink-0" />
 </summary>
 <div className="px-5 pb-4 text-sm text-gray-700 leading-relaxed">
 {i === 0 && (
 <p>
 The best {cat.name.toLocaleLowerCase()} tool depends on your specific needs.
 {' '}<strong className="text-gray-900">{categoryTools[0]?.name || 'the top tool'}</strong>
 {' '}leads our ranking with a trending score of {Math.round(categoryTools[0]?.trending_score || 0)}
 , but {categoryTools[1]?.name || 'alternatives'} offer unique advantages.
 Consider your budget, required features, and whether Asian language support matters.
 Our comparison table above breaks down pricing, ratings, and Asia-readiness for every tool.
 </p>
 )}
 {i === 1 && (
 <p>
 When choosing a {cat.name.toLocaleLowerCase()} tool, look for features like
 {cat.slug === 'writing-content' ? ' multi-language support, SEO templates, and tone customization' :
 cat.slug === 'code-development' ? ' multi-language code support, IDE integrations, and real-time suggestions' :
 cat.slug === 'image-generation' ? ' high-resolution output, style consistency, and Asian aesthetic training' :
 ' integrations, automation capabilities, and team collaboration features'}.
 Most tools offer free trials so you can test before committing.
 </p>
 )}
 {i === 2 && (
 <p>
 Of the {categoryTools.length} tools in our {cat.name} category,
 {freeCount > 0 ? ` ${freeCount} offer free tiers or freemium plans — perfect for getting started without financial commitment.` : ' most require a paid plan for full access.'}
 {' '}Paid plans typically range from ${Math.min(...categoryTools.map(t => t.pricing_min_usd || 999))} to ${Math.max(...categoryTools.filter(t => t.pricing_max_usd).map(t => t.pricing_max_usd || 200))} USD per month.
 We&apos;ve flagged Asia-ready tools throughout to help you find the best fit for your region.
 </p>
 )}
 {i === 3 && (
 <p>
 Comparing top tools side-by-side is the fastest way to find your fit. We score every tool on features, pricing, Asia-readiness, and community ratings. Our comparison table above ranks all {categoryTools.length} {cat.name.toLocaleLowerCase()} tools. Head-to-head comparisons like this help you see which tool handles your specific workflow — whether that&apos;s Asian language support, API access, or free tier generosity — before you commit.
 </p>
 )}
 {i === 4 && (
 <p>
 The best {cat.name.toLocaleLowerCase()} tool for you depends on your specific needs, but our data shows that <strong className="text-gray-900">{categoryTools[0]?.name || 'the top-ranked tool'}</strong> leads in overall community rating. We recommend trying the free tier of your top 2-3 candidates, then comparing based on real-world performance, not marketing claims. Bookmark this page and check back for updated scores — we refresh rankings monthly based on community votes.
 </p>
 )}
 </div>
 </details>
 ))}
 </div>
 </section>

 {/* Related Blog Posts — SEO Cross-Linking */}
 {(() => {
    const relatedPosts = getBlogPostsForCategory(cat, 3);
    if (relatedPosts.length === 0) return null;
    return (
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          <BookOpen className="w-5 h-5 inline-block text-neon-light mr-2" />
          Related Articles
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Read our latest deep-dives on {cat.name.toLocaleLowerCase()} tools and tactics
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative rounded-xl border border-gray-200 bg-gray-50 p-5 hover:border-neon/40 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-gray-600 font-mono px-1.5 py-0.5 rounded border border-gray-200">
                  {post.tags?.[0] || 'AI Tools'}
                </span>
                <span className="text-[10px] text-gray-400">{post.date}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-neon-light transition-colors mb-1 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    );
  })()}

  {/* Related Playbooks */}
  {relatedPlaybooks.length > 0 && (
 <section className="mb-12">
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
 <BookOpen className="w-5 h-5 inline-block text-neon-light mr-2" />
 Featured Playbooks
 </h2>
 <p className="text-gray-600 text-sm mb-6">
 Step-by-step guides using {cat.name.toLocaleLowerCase()} tools
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {relatedPlaybooks.map((pb) => (
 <Link
 key={pb.slug}
 href={`/playbook/${pb.slug}`}
 className="group relative rounded-xl overflow-hidden border border-gray-200 p-5 hover:border-neon/40 transition-all hover:-translate-y-1"
 style={{ backgroundImage: `linear-gradient(135deg, ${pb.gradient || 'from-tech-600/80 to-tech-700/80'}), linear-gradient(to bottom right, rgba(17,17,34,0.85), rgba(17,17,34,0.85))` }}
 >
 <div className="relative">
 <div className="flex items-center gap-2 mb-2">
 <span className="text-xl">{pb.icon || '📖'}</span>
 <span className="text-[10px] text-gray-600 font-mono px-1.5 py-0.5 rounded border border-gray-200">
 {pb.difficulty}
 </span>
 </div>
 <h3 className="text-sm font-semibold text-gray-900 group-hover:text-neon-light transition-colors mb-1">
 {pb.title}
 </h3>
 <p className="text-[11px] text-gray-600 line-clamp-2 mb-2">
 {pb.description}
 </p>
 <div className="flex items-center gap-2 text-[10px] text-gray-400">
 <span>{pb.steps?.length || 0} steps</span>
 <span>•</span>
 <span>{pb.read_time_minutes || 10} min read</span>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </section>
 )}

 {/* All Tools List (compact) */}
 {categoryTools.length > 12 && (
 <section>
 <h2 className="text-lg font-bold text-gray-900 mb-4">
 All {categoryTools.length} {cat.name} Tools
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {categoryTools.slice(12).map((tool) => (
 <Link
 key={tool.slug}
 href={`/tools/${tool.slug}`}
 className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 hover:bg-white hover:border-gray-200 transition text-sm"
 >
 <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200/20">
 <span className="text-gray-900 font-bold text-[9px]">
 {tool.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
 </span>
 </div>
 <span className="text-gray-900 flex-1 truncate">{tool.name}</span>
 <span className="text-xs text-amber-400">{tool.avg_rating?.toFixed(1)}</span>
 <span className={cn('text-[10px] px-1.5 py-0.5 rounded', getPricingColor(tool.pricing_tier))}>
 {getPricingLabel(tool.pricing_tier)}
 </span>
 <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
 </Link>
 ))}
 </div>
 </section>
 )}

 {/* JSON-LD structured data */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'CollectionPage',
 name: `Best ${cat.name} Tools 2026`,
 description: cat.metaDescription,
 url: `${BASE_URL}/categories/${cat.slug}`,
 about: {
 '@type': 'Thing',
 name: cat.name,
 description: cat.description,
 },
 numberOfItems: categoryTools.length,
 }),
 }}
 />
      {/* FAQPage structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: cat.h2Headings.map((heading, i) => ({
              '@type': 'Question',
              name: heading,
              acceptedAnswer: {
                '@type': 'Answer',
                text: i === 0
                  ? `The best ${cat.name.toLocaleLowerCase()} tool depends on your specific needs. ${categoryTools[0]?.name || 'the top tool'} leads our ranking with a trending score of ${Math.round(categoryTools[0]?.trending_score || 0)}. Consider your budget, required features, and whether Asian language support matters.`
                  : i === 1
                  ? `When choosing a ${cat.name.toLocaleLowerCase()} tool, look for features like integrations, automation capabilities, and team collaboration features. Most tools offer free trials so you can test before committing.`
                  : i === 2
                  ? `Of the ${categoryTools.length} tools in our ${cat.name} category, ${freeCount > 0 ? `${freeCount} offer free tiers or freemium plans.` : 'most require a paid plan for full access.'} We have flagged Asia-ready tools throughout to help you find the best fit.`
                  : i === 3
                  ? `Comparing top tools side-by-side is the fastest way to find your fit. We score every tool on features, pricing, Asia-readiness, and community ratings. Head-to-head comparisons help you see which tool handles your specific workflow.`
                  : `The best ${cat.name.toLocaleLowerCase()} tool for you depends on your specific needs, but our data shows that ${categoryTools[0]?.name || 'the top-ranked tool'} leads in overall community rating. We recommend trying the free tier of your top 2-3 candidates.`
              }
            })),
          }),
        }}
      />

 </div>
 </div>
 );
}
