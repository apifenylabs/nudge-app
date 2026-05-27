import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import { RANKING_CATEGORIES } from '@/lib/ranking-categories';
import { BookOpen, ChevronRight, TrendingUp, Zap, Sparkles } from 'lucide-react';
import ToolDetail from '@/components/ToolDetail';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ToolRelatedBlogPosts from '@/components/ToolRelatedBlogPosts';
import { getAffiliateForTool } from '@/lib/affiliate-links';

const BASE_URL = 'https://apifeny-ai.vercel.app';

interface ToolPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return toolsData
    .filter((t) => t.is_published)
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = toolsData.find((t) => t.slug === params.slug);
  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: tool.name,
    description: tool.tagline || tool.description,
    openGraph: {
      title: `${tool.name} — Apifeny AI`,
      description: tool.tagline || tool.description,
      type: 'article',
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = toolsData.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.tagline || tool.description,
    url: `${BASE_URL}/tools/${tool.slug}`,
    applicationCategory: tool.category,
    operatingSystem: 'Web, iOS, Android',
    aggregateRating: tool.avg_rating > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: tool.avg_rating,
      ratingCount: tool.total_ratings,
      bestRating: 5,
    } : undefined,
    potentialAction: tool.website_url ? {
      '@type': 'ViewAction',
      target: tool.website_url,
    } : undefined,
    author: {
      '@type': 'Organization',
      name: 'Apifeny AI',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: tool.pricing_min_usd || 0,
      highPrice: tool.pricing_max_usd || 0,
      offerCount: 1,
    },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools', item: '/tools' },
          { name: tool.name, item: `/tools/${tool.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ToolDetail tool={tool} />

        {/* Affiliate Best Deal CTA — appears right after hero for paid affiliate tools */}
        {(() => {
          const aff = getAffiliateForTool(tool.slug);
          if (!aff || !aff.is_direct) return null;
          return (
            <section className="mt-6 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900/30 via-tech-700/60 to-tech-800/50 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      Best Deal: Try {tool.name}
                      {aff.badge && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <Sparkles className="w-2.5 h-2.5" />
                          {aff.badge}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-tech-200 mt-1">
                      {aff.commission_note}
                    </p>
                    <p className="text-[10px] text-emerald-400/80 mt-1 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Affiliate link — we may earn a commission at no extra cost to you
                    </p>
                  </div>
                </div>
                <a
                  href={aff.referral_url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition whitespace-nowrap shrink-0"
                >
                  <Zap className="w-4 h-4" />
                  {aff.cta_label}
                </a>
              </div>
            </section>
          );
        })()}

        {/* Ranking Position Badge */}
        {(() => {
          const rankedCategories = RANKING_CATEGORIES
            .map((rc) => {
              const filterResult = rc.toolFilter(tool as any);
              return filterResult ? rc : null;
            })
            .filter(Boolean) as typeof RANKING_CATEGORIES;

          if (rankedCategories.length === 0) return null;

          return (
            <section className="mt-8 rounded-xl border border-tech-500/30 bg-tech-700/60 p-6">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-neon-light" />
                Ranking Position
              </h2>
              <div className="flex flex-wrap gap-3">
                {rankedCategories.slice(0, 4).map((rc) => (
                  <Link
                    key={rc.slug}
                    href={`/rankings/${rc.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tech-600 border border-tech-500/30 hover:border-neon/30 hover:bg-tech-500 transition group"
                  >
                    <span className="text-sm">{rc.icon}</span>
                    <span className="text-xs text-tech-200 group-hover:text-white transition">
                      {rc.title}
                    </span>
                    <ChevronRight className="w-3 h-3 text-tech-300" />
                  </Link>
                ))}
              </div>
              <p className="text-[10px] text-tech-300 mt-3">
                Featured in {Math.min(rankedCategories.length, 4)} of {rankedCategories.length} ranking{rankedCategories.length !== 1 ? 's' : ''}
              </p>
            </section>
          );
        })()}

        {/* Related Playbooks */}
        {(() => {
          const relatedPlaybooks = playbooks.filter(
            (p) => p.related_tool_slugs.includes(tool.slug)
          );
          if (relatedPlaybooks.length === 0) return null;

          return (
            <section className="mt-6 rounded-xl border border-tech-500/30 bg-tech-700/60 p-6">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-neon-light" />
                Related Playbooks
              </h2>
              <p className="text-xs text-tech-200 mb-4">
                This tool is used in {relatedPlaybooks.length} playbook{relatedPlaybooks.length !== 1 ? 's' : ''}.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedPlaybooks.slice(0, 6).map((pb) => (
                  <Link
                    key={pb.slug}
                    href={`/playbook/${pb.slug}`}
                    className="group rounded-xl border border-tech-500/30 bg-tech-700/80 p-3 hover:border-neon/40 hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{pb.icon}</span>
                      <h3 className="text-xs font-semibold text-white group-hover:text-neon-light transition-colors">
                        {pb.title}
                      </h3>
                    </div>
                    <p className="text-[10px] text-tech-200 line-clamp-2">{pb.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-[9px] text-neon-light opacity-0 group-hover:opacity-100 transition-opacity">
                      View playbook
                      <ChevronRight className="w-2.5 h-2.5" />
                    </div>
                  </Link>
                ))}
              </div>
              {relatedPlaybooks.length > 6 && (
                <div className="mt-3 text-center">
                  <Link
                    href="/playbook"
                    className="inline-flex items-center gap-1 text-[10px] text-neon-light hover:text-neon transition"
                  >
                    View all {relatedPlaybooks.length} playbooks
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </section>
          );
        })()}

        {/* Related Blog Posts */}
        <ToolRelatedBlogPosts
          toolName={tool.name}
          toolSlug={tool.slug}
          toolUseCases={tool.use_cases}
          toolCategory={tool.category}
          limit={4}
        />
      </div>
    </>
  );
}
