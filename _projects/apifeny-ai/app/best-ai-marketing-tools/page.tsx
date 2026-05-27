'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Trophy,
  Star,
  TrendingUp,
  Megaphone,
  BarChart3,
  Target,
  BookOpen,
  CheckCircle,
  Layers,
  Zap,
  Quote,
  Eye,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import { cn } from '@/lib/utils';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';

const META = {
  title: 'Best AI Marketing Tools in 2026 — Top AI Software for Marketers',
  description:
    'Find the best AI marketing tools of 2026. Compare Canva AI, Jasper, Perplexity, Synthesia, OpusClip, and more for every stage of the marketing pipeline. Expert rankings and Asia-ready filters.',
  ogTitle: 'Best AI Marketing Tools 2026 — Apifeny AI',
  ogDescription:
    'AI marketing tools ranked for every stage: research, content creation, design, video, and analytics. Compare features, pricing, and Asia-readiness.',
  ogImage: '/og',
};

const MARKETING_TOOL_SLUGS = [
  'chatgpt', 'perplexity', 'canva-ai', 'jasper', 'copy-ai',
  'midjourney', 'synthesia', 'opusclip', 'heygen', 'elevenlabs',
  'gemini', 'claude', 'notion-ai', 'semrush', 'ahrefs',
];

function getMarketingTools() {
  return MARKETING_TOOL_SLUGS
    .map((slug) => toolsData.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined && t.is_published);
}

function findPlaybook(slug: string) {
  return playbooks.find((p) => p.slug === slug);
}

export default function BestAIMarketingToolsPage() {
  const allMarketingTools = useMemo(() => getMarketingTools(), []);
  const top6 = useMemo(() => [...allMarketingTools].sort((a, b) => b.trending_score - a.trending_score).slice(0, 6), [allMarketingTools]);

  const pipelineStages = useMemo(() => {
    return [
      {
        name: 'Market Research & Strategy',
        description: 'Research markets, analyse competitors, and validate strategies with AI.',
        tools: ['perplexity', 'gemini', 'claude'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
        icon: Eye,
        color: 'text-sky-400',
        gradient: 'from-sky-500/20',
      },
      {
        name: 'Content & Copywriting',
        description: 'Generate ad copy, landing pages, email sequences, and blog posts at scale.',
        tools: ['chatgpt', 'jasper', 'copy-ai', 'notion-ai'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
        icon: Megaphone,
        color: 'text-rose-400',
        gradient: 'from-rose-500/20',
      },
      {
        name: 'Design & Visual Assets',
        description: 'Create brand visuals, social media graphics, and ad creatives with AI.',
        tools: ['canva-ai', 'midjourney', 'heygen'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
        icon: Layers,
        color: 'text-violet-400',
        gradient: 'from-violet-500/20',
      },
      {
        name: 'Video & Audio Production',
        description: 'Produce marketing videos, voiceovers, and social clips at scale.',
        tools: ['synthesia', 'opusclip', 'heygen', 'elevenlabs'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
        icon: Target,
        color: 'text-emerald-400',
        gradient: 'from-emerald-500/20',
      },
    ].filter((s) => s.tools.length > 0);
  }, []);

  const marketingPlaybook = useMemo(() => findPlaybook('ai-content-creation-busy-founders'), []);

  // Inject JSON-LD
  useEffect(() => {
    const toolItems = top6.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: t.name,
        url: `https://apifeny.ai/tools/${t.slug}`,
        description: t.tagline || t.description.slice(0, 150),
        applicationCategory: 'BusinessApplication',
      },
    }));

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'best-ai-marketing-tools-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Best AI Marketing Tools in 2026',
      description: 'Top AI marketing tools for every stage of the marketing pipeline — research, content, design, video, and analytics.',
      url: 'https://apifeny.ai/best-ai-marketing-tools',
      numberOfItems: allMarketingTools.length,
      itemListElement: toolItems,
    });

    const existing = document.getElementById('best-ai-marketing-tools-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [top6, allMarketingTools.length]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Best AI Marketing Tools', item: '/best-ai-marketing-tools' },
        ]}
      />
      <SeoMetadata
        title={META.title}
        description={META.description}
        ogTitle={META.ogTitle}
        ogDescription={META.ogDescription}
        ogImage={META.ogImage}
      />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden border-b border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {allMarketingTools.length} AI Marketing Tools · Updated 2026
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Best AI Marketing Tools in{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                2026
              </span>
              <br />
              <span className="text-tech-100">Research, Content, Design &amp; Video</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              The complete AI marketing stack. From <strong className="text-white">market research</strong> with Perplexity to{' '}
              <strong className="text-white">content creation</strong> with Jasper, <strong className="text-white">video production</strong> with
              Synthesia, and <strong className="text-white">analytics</strong> — all ranked and compared.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/categories/marketing-seo"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
              >
                <span>Browse All Marketing Tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-emerald-400/30 hover:text-white text-sm sm:text-base font-medium transition-all"
              >
                <Zap className="w-4 h-4" />
                View All AI Tools
              </Link>
            </div>

            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>15 Marketing Tools Ranked</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-asia" />
                <span>Full Pipeline Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-aqua" />
                <span>Asia-Ready Filters</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TOP 6 MARKETING TOOLS ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-asia/20 to-amber-500/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-asia" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Top AI Marketing Tools in 2026
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">
              Ranked by trending score, real user ratings, and marketing effectiveness
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {top6.map((tool, i) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className={cn(
                'group relative block rounded-xl border border-tech-500/30 bg-tech-700 p-5 transition-all duration-300',
                'hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1',
              )}
            >
              <div
                className={cn(
                  'absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10',
                  i === 0 ? 'bg-gradient-to-br from-asia to-amber-400 text-black'
                    : i === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-black'
                    : i === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
                    : 'bg-tech-500 text-tech-100 border border-tech-400/30'
                )}
              >
                #{i + 1}
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/30 group-hover:border-emerald-400/30 transition">
                  <span className="text-white font-bold text-sm">
                    {tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">{tool.name}</h3>
                  <p className="text-xs text-tech-200 line-clamp-2 mt-0.5 leading-relaxed">{tool.tagline}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600/60 text-tech-100 border border-tech-500/30">{tool.category}</span>
                <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border', tool.pricing_tier === 'Free' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : tool.pricing_tier === 'Freemium' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : 'bg-neon/20 text-neon-light border-neon/30')}>
                  {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  {(() => {
                    const stars: ('full' | 'half' | 'empty')[] = [];
                    for (let i = 1; i <= 5; i++) {
                      if (tool.avg_rating >= i) stars.push('full');
                      else if (tool.avg_rating >= i - 0.5) stars.push('half');
                      else stars.push('empty');
                    }
                    return stars.map((s, si) => (
                      <Star key={si} className={cn('w-3 h-3', s === 'full' ? 'fill-asia text-asia' : s === 'half' ? 'fill-asia/50 text-asia' : 'fill-none text-tech-400')} />
                    ));
                  })()}
                </div>
                <span className="text-xs text-tech-200">{tool.avg_rating.toFixed(1)}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-tech-600 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style={{ width: `${tool.trending_score}%` }} />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-medium text-emerald-400">{tool.trending_score}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/categories/marketing-seo"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            <span>View All Marketing Tools →</span>
          </Link>
        </div>
      </section>

      {/* ───── PIPELINE STAGES ───── */}
      {pipelineStages.map((stage) => {
        const Icon = stage.icon;
        return (
          <section key={stage.name} className="border-t border-tech-500/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-tech-600/60 flex items-center justify-center shrink-0 border border-tech-500/20 mt-1">
                <Icon className={`w-5 h-5 ${stage.color}`} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{stage.name}</h2>
                <p className="text-sm text-tech-200 mt-1 max-w-xl">{stage.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stage.tools.map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.slug}`}
                  className="group block rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 transition-all duration-300 hover:border-emerald-400/30 hover:bg-tech-700 hover:-translate-y-0.5">
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/20">
                      <span className="text-white font-bold text-xs">{tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-300 transition">{tool.name}</h3>
                      <p className="text-[11px] text-tech-200 line-clamp-2 mt-0.5">{tool.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border', tool.pricing_tier === 'Free' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : tool.pricing_tier === 'Freemium' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : 'bg-neon/20 text-neon-light border-neon/30')}>
                      {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
                    </span>
                    <div className="flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-asia text-asia" /><span className="text-[10px] text-tech-200">{tool.avg_rating.toFixed(1)}</span></div>
                    <div className="flex items-center gap-0.5 ml-auto"><TrendingUp className="w-2.5 h-2.5 text-emerald-400" /><span className="text-[9px] text-emerald-400 font-medium">{tool.trending_score}</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* ───── COMPARISON TABLE ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Quick Comparison: Top Marketing AI Tools</h2>
            <p className="text-sm sm:text-base text-tech-200 mt-2 max-w-xl mx-auto">
              Find the best AI tool for each marketing stage.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-tech-500/30">
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Tool</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Stage</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Pricing</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Trending</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Asia</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Agentic</th>
                </tr>
              </thead>
              <tbody>
                {[...allMarketingTools].sort((a, b) => b.trending_score - a.trending_score).slice(0, 8).map((tool) => (
                  <tr key={tool.id} className="border-b border-tech-500/10 hover:bg-tech-700/30 transition">
                    <td className="px-4 py-3">
                      <Link href={`/tools/${tool.slug}`} className="text-sm font-semibold text-white hover:text-emerald-300 transition">{tool.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-xs text-tech-200">{tool.category}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className={cn('px-1.5 py-0.5 rounded', tool.pricing_tier === 'Free' ? 'bg-emerald-500/20 text-emerald-400' : tool.pricing_tier === 'Freemium' ? 'bg-sky-500/20 text-sky-400' : 'bg-neon/20 text-neon-light')}>
                        {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-tech-100">
                      <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-asia text-asia" />{tool.avg_rating.toFixed(1)}</div>
                    </td>
                    <td className="px-4 py-3 text-xs"><span className="text-emerald-400 font-medium">{tool.trending_score}</span></td>
                    <td className="px-4 py-3 text-xs">{tool.asia_ready ? <span className="text-emerald-400">✓</span> : <span className="text-tech-400">—</span>}</td>
                    <td className="px-4 py-3 text-xs">{tool.is_agentic ? <span className="text-sky-400">✓</span> : <span className="text-tech-400">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <Link href="/tools?category=Marketing+%26+SEO" className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition">
              Compare all marketing tools <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── MARKETING PLAYBOOK ───── */}
      {marketingPlaybook && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Marketing Playbook</h2>
              <p className="text-xs sm:text-sm text-tech-200">Follow this guide to build your AI-powered marketing workflow.</p>
            </div>
          </div>

          <Link
            href={`/playbook/${marketingPlaybook.slug}`}
            className="block rounded-xl border border-tech-500/30 bg-tech-700 p-6 hover:border-emerald-400/30 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{marketingPlaybook.title}</h3>
                <p className="text-sm text-tech-200 mt-1">{typeof marketingPlaybook.description === 'string' ? marketingPlaybook.description : ''}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 shrink-0">
                Read the playbook <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <div className="mt-6">
            <FeaturedPlaybooks />
          </div>
        </section>
      )}

      {/* ───── BLOG CROSS-LINKS ───── */}
      <BlogCategoryLinks
        slugs={['marketing', 'content-creation', 'ai-tools', 'solopreneur']}
        heading="Read Marketing & Content Guides"
      />

      {/* ───── LANDING PAGE CROSS-LINKS ───── */}
      <LandingPageCrossLinks currentSlug="best-ai-marketing-tools" />

      {/* ───── FINAL CTA ───── */}
      <section className="relative overflow-hidden border-t border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Ready to Supercharge Your Marketing with AI?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            From research to video production — {allMarketingTools.length} AI marketing tools ranked and ready. Find your perfect marketing stack.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/categories/marketing-seo"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              <span>Browse All Marketing Tools →</span>
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-emerald-400/30 hover:text-white text-sm sm:text-base font-medium transition-all"
            >
              Explore All AI Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
