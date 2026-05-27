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
  PenTool,
  FileText,
  Globe,
  BookOpen,
  CheckCircle,
  Layers,
  Zap,
  Quote,
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
  title: 'Best AI Writing Tools in 2026 — Top AI Content & Copywriting Assistants',
  description:
    'Find the best AI writing tools of 2026. Compare ChatGPT, Claude, Jasper, Copy.ai, DeepL, Grammarly, and more. Expert rankings for content creation, copywriting, and translation.',
  ogTitle: 'Best AI Writing Tools 2026 — Apifeny AI',
  ogDescription:
    'Compare the top AI writing assistants. ChatGPT vs Claude vs Jasper vs Copy.ai — ranked by real user ratings, features, and Asia-readiness for content creation.',
  ogImage: '/og',
};

const WRITING_TOOL_SLUGS = [
  'chatgpt', 'claude', 'gemini', 'jasper', 'copy-ai',
  'deepl', 'notion-ai', 'perplexity', 'grammarly',
  'deepseek', 'qwen', 'kimi', 'doubao', 'ernie-bot',
];

function getWritingTools() {
  return WRITING_TOOL_SLUGS
    .map((slug) => toolsData.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined && t.is_published);
}

function findPlaybook(slug: string) {
  return playbooks.find((p) => p.slug === slug);
}

export default function BestAIWritingToolsPage() {
  const allWritingTools = useMemo(() => getWritingTools(), []);
  const top6 = useMemo(() => [...allWritingTools].sort((a, b) => b.trending_score - a.trending_score).slice(0, 6), [allWritingTools]);

  const categories = useMemo(() => {
    return [
      {
        name: 'General Writing Assistants',
        description: 'Versatile AI assistants for all types of writing — blogs, emails, social, and more.',
        tools: ['chatgpt', 'claude', 'gemini', 'deepseek'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
      },
      {
        name: 'Marketing & Copywriting',
        description: 'Specialised tools for ad copy, landing pages, email sequences, and brand content.',
        tools: ['jasper', 'copy-ai', 'notion-ai'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
      },
      {
        name: 'Research & Translation',
        description: 'AI writing tools with strong research, summarisation, and multilingual translation.',
        tools: ['perplexity', 'deepl', 'grammarly'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
      },
      {
        name: 'Asian-Language Writing Tools',
        description: 'Best AI writing tools for Chinese, Japanese, Korean, and other Asian languages.',
        tools: ['qwen', 'kimi', 'doubao', 'ernie-bot'].map((s) => toolsData.find((t) => t.slug === s)).filter(Boolean) as typeof toolsData,
      },
    ].filter((c) => c.tools.length > 0);
  }, []);

  const contentPlaybook = useMemo(() => findPlaybook('ai-content-creation-busy-founders'), []);

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
        applicationCategory: 'Multimedia',
      },
    }));

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'best-ai-writing-tools-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Best AI Writing Tools in 2026',
      description: 'Top AI writing assistants and content creation tools ranked by real user ratings and features.',
      url: 'https://apifeny.ai/best-ai-writing-tools',
      numberOfItems: allWritingTools.length,
      itemListElement: toolItems,
    });

    const existing = document.getElementById('best-ai-writing-tools-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [top6, allWritingTools.length]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Best AI Writing Tools', item: '/best-ai-writing-tools' },
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
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {allWritingTools.length} AI Writing Tools · Updated 2026
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Best AI Writing Tools in{' '}
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                2026
              </span>
              <br />
              <span className="text-tech-100">Content Creation, Copy &amp; Translation</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              From versatile assistants like <strong className="text-white">ChatGPT</strong> and <strong className="text-white">Claude</strong>
              &nbsp;to specialised copywriting tools like <strong className="text-white">Jasper</strong> and <strong className="text-white">Copy.ai</strong> —
              find the perfect AI writing companion for every type of content.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/categories/writing-content"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5"
              >
                <span>Browse All Writing Tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-rose-400/30 hover:text-white text-sm sm:text-base font-medium transition-all"
              >
                <Zap className="w-4 h-4" />
                View All AI Tools
              </Link>
            </div>

            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-400" />
                <span>14 Writing Tools Ranked</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-asia" />
                <span>Asian-Language Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Translation &amp; Localisation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TOP 6 WRITING TOOLS ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-asia/20 to-amber-500/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-asia" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Top AI Writing Tools in 2026
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">
              Ranked by trending score, real user ratings, and writing quality
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
                'hover:border-rose-400/40 hover:shadow-lg hover:shadow-rose-500/5 hover:-translate-y-1',
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
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/30 group-hover:border-rose-400/30 transition">
                  <span className="text-white font-bold text-sm">
                    {tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-white truncate group-hover:text-rose-300 transition-colors">{tool.name}</h3>
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
                  <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-500" style={{ width: `${tool.trending_score}%` }} />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <TrendingUp className="w-3 h-3 text-rose-400" />
                  <span className="text-[10px] font-medium text-rose-400">{tool.trending_score}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/categories/writing-content"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5"
          >
            <span>View All {allWritingTools.length} Writing Tools →</span>
          </Link>
        </div>
      </section>

      {/* ───── CATEGORY BREAKDOWN ───── */}
      {categories.map((cat) => (
        <section key={cat.name} className="border-t border-tech-500/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-tech-600/60 flex items-center justify-center shrink-0 border border-tech-500/20 mt-1">
              <Layers className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{cat.name}</h2>
              <p className="text-sm text-tech-200 mt-1 max-w-xl">{cat.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cat.tools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.slug}`}
                className="group block rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 transition-all duration-300 hover:border-rose-400/30 hover:bg-tech-700 hover:-translate-y-0.5">
                <div className="flex items-start gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/20">
                    <span className="text-white font-bold text-xs">{tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-rose-300 transition">{tool.name}</h3>
                    <p className="text-[11px] text-tech-200 line-clamp-2 mt-0.5">{tool.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border', tool.pricing_tier === 'Free' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : tool.pricing_tier === 'Freemium' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : 'bg-neon/20 text-neon-light border-neon/30')}>
                    {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
                  </span>
                  <div className="flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-asia text-asia" /><span className="text-[10px] text-tech-200">{tool.avg_rating.toFixed(1)}</span></div>
                  <div className="flex items-center gap-0.5 ml-auto"><TrendingUp className="w-2.5 h-2.5 text-rose-400" /><span className="text-[9px] text-rose-400 font-medium">{tool.trending_score}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* ───── COMPARISON TABLE ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Quick Comparison: Top 6 AI Writing Tools</h2>
            <p className="text-sm sm:text-base text-tech-200 mt-2 max-w-xl mx-auto">
              Compare the leading AI writing assistants across key dimensions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-tech-500/30">
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Tool</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Pricing</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Trending</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">Asian Langs</th>
                  <th className="px-4 py-3 text-xs font-semibold text-tech-200 uppercase tracking-wider">API</th>
                </tr>
              </thead>
              <tbody>
                {[...allWritingTools].sort((a, b) => b.trending_score - a.trending_score).slice(0, 6).map((tool) => (
                  <tr key={tool.id} className="border-b border-tech-500/10 hover:bg-tech-700/30 transition">
                    <td className="px-4 py-3">
                      <Link href={`/tools/${tool.slug}`} className="text-sm font-semibold text-white hover:text-rose-300 transition">{tool.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-xs text-tech-200">{tool.category}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className={cn('px-1.5 py-0.5 rounded', tool.pricing_tier === 'Free' ? 'bg-emerald-500/20 text-emerald-400' : tool.pricing_tier === 'Freemium' ? 'bg-sky-500/20 text-sky-400' : 'bg-neon/20 text-neon-light')}>
                        {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-tech-100">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-asia text-asia" />
                        {tool.avg_rating.toFixed(1)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs"><span className="text-rose-400 font-medium">{tool.trending_score}</span></td>
                    <td className="px-4 py-3 text-xs">{tool.asia_ready ? <span className="text-emerald-400">✓ {tool.supports_languages?.slice(0, 3).join(', ') || 'Multi'}</span> : <span className="text-tech-400">—</span>}</td>
                    <td className="px-4 py-3 text-xs">{tool.has_api ? <span className="text-sky-400">✓ API</span> : <span className="text-tech-400">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <Link href="/tools?category=Writing+%26+Content" className="inline-flex items-center gap-1.5 text-sm text-rose-400 hover:text-rose-300 transition">
              Compare all writing tools <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── CONTENT PLAYBOOK ───── */}
      {contentPlaybook && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Content Creation Playbook</h2>
              <p className="text-xs sm:text-sm text-tech-200">Follow this step-by-step guide to create content with AI.</p>
            </div>
          </div>

          <Link
            href={`/playbook/${contentPlaybook.slug}`}
            className="block rounded-xl border border-tech-500/30 bg-tech-700 p-6 hover:border-rose-400/30 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{contentPlaybook.title}</h3>
                <p className="text-sm text-tech-200 mt-1">{typeof contentPlaybook.description === 'string' ? contentPlaybook.description : ''}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-400 shrink-0">
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
        slugs={['content-creation', 'ai-tools', 'comparisons', 'translation-language']}
        heading="Read Content Creation Guides"
      />

      {/* ───── LANDING PAGE CROSS-LINKS ───── */}
      <LandingPageCrossLinks currentSlug="best-ai-writing-tools" />

      {/* ───── FINAL CTA ───── */}
      <section className="relative overflow-hidden border-t border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-rose-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Ready to Create Better Content with AI?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            Stop staring at a blank page. {allWritingTools.length} AI writing tools ranked and compared — find the one that matches your voice.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/categories/writing-content"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5"
            >
              <span>Browse All Writing Tools →</span>
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-rose-400/30 hover:text-white text-sm sm:text-base font-medium transition-all"
            >
              Explore All AI Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
