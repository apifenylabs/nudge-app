'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search, Sparkles, TrendingUp, Layers, BookOpen, ArrowRight, Zap, ChevronRight, CheckCircle, Star, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FeaturedCategories from '@/components/FeaturedCategories';
import TrendingTools from '@/components/TrendingTools';
import SponsoredToolSpot from '@/components/SponsoredToolSpot';
import MustUseThisMonth from '@/components/MustUseThisMonth';
import FeaturedCollections from '@/components/FeaturedCollections';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import FeaturedRankings from '@/components/FeaturedRankings';
import SuccessStories from '@/components/SuccessStories';

// ─── Data ──────────────────────────────────────────────────

interface ToolItem {
  name: string;
  slug: string;
  tagline?: string;
}

interface UseCaseSection {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  tools: ToolItem[];
  playbookSlug: string;
  categorySlug: string;
}

const useCaseSections: UseCaseSection[] = [
  {
    id: 'content-creation',
    icon: '\u270d\ufe0f',
    title: 'Content Creation',
    subtitle: 'Blog posts \u00b7 Social media \u00b7 Email \u00b7 Scripts',
    description: 'Staring at a blank page? Hours of editing? Our playbook shows you how to use ChatGPT for outlines, Claude for drafts, Perplexity for research \u2014 publish 3x faster.',
    tools: [
      { name: 'ChatGPT', slug: 'chatgpt', tagline: 'Versatile writing assistant' },
      { name: 'Claude', slug: 'claude', tagline: 'Long-form specialist' },
      { name: 'Perplexity', slug: 'perplexity', tagline: 'Research engine' },
      { name: 'Canva AI', slug: 'canva-ai', tagline: 'Visual content' },
      { name: 'Jasper', slug: 'jasper', tagline: 'Marketing copy' },
    ],
    playbookSlug: 'content-creation-with-chatgpt',
    categorySlug: 'content-creation',
  },
  {
    id: 'code-dev',
    icon: '\u26a1',
    title: 'Code & Development',
    subtitle: 'Ship apps \u00b7 Automate workflows \u00b7 Better code',
    description: 'Slow dev cycles? Debugging hell? Pair Cursor + Claude for AI-native coding, Copilot for autocomplete, Devin for autonomous PRs. Idea to MVP in hours.',
    tools: [
      { name: 'Cursor', slug: 'cursor', tagline: 'AI-native IDE' },
      { name: 'Claude', slug: 'claude', tagline: 'Complex reasoning' },
      { name: 'GitHub Copilot', slug: 'copilot', tagline: 'Code autocomplete' },
      { name: 'Devin', slug: 'devin', tagline: 'Autonomous engineer' },
      { name: 'Gemini', slug: 'gemini', tagline: 'Multi-language code' },
    ],
    playbookSlug: 'build-an-app-with-cursor',
    categorySlug: 'code-development',
  },
  {
    id: 'research',
    icon: '\ud83d\udd0d',
    title: 'Research & Analysis',
    subtitle: 'Deep research \u00b7 Data analysis \u00b7 Intelligence',
    description: 'Information overload? Let Perplexity do real-time research, Claude analyze 200K-token documents, Gemini search Google, and ChatGPT synthesize. Answers in minutes.',
    tools: [
      { name: 'Perplexity', slug: 'perplexity', tagline: 'Web research engine' },
      { name: 'Claude', slug: 'claude', tagline: 'Document analysis' },
      { name: 'Gemini', slug: 'gemini', tagline: 'Google integration' },
      { name: 'ChatGPT', slug: 'chatgpt', tagline: 'Synthesis' },
      { name: 'Notion AI', slug: 'notion-ai', tagline: 'Notes & knowledge' },
    ],
    playbookSlug: 'ai-for-data-analysis',
    categorySlug: 'research-analysis',
  },
  {
    id: 'design',
    icon: '\ud83c\udfa8',
    title: 'Design & Creative',
    subtitle: 'Visuals \u00b7 Videos \u00b7 Presentations \u00b7 Brand',
    description: 'Expensive designers? Slow iterations? Canva AI for instant designs, Midjourney for custom imagery, Runway for video, Suno for music. Professional assets instantly.',
    tools: [
      { name: 'Canva AI', slug: 'canva-ai', tagline: 'All-in-one design' },
      { name: 'Midjourney', slug: 'midjourney', tagline: 'AI image generation' },
      { name: 'Runway', slug: 'runway', tagline: 'Video editing AI' },
      { name: 'Descript', slug: 'descript', tagline: 'Audio & video' },
      { name: 'Suno', slug: 'suno', tagline: 'Music generation' },
    ],
    playbookSlug: 'ai-video-production',
    categorySlug: 'design',
  },
  {
    id: 'marketing',
    icon: '\ud83d\udcc8',
    title: 'Marketing & Growth',
    subtitle: 'SEO \u00b7 Email \u00b7 Social \u00b7 Ads',
    description: 'Scattered campaigns, low conversion? ChatGPT for strategy, Perplexity for keywords, Synthesia for video, Intercom AI for chatbots. Data-driven marketing that converts.',
    tools: [
      { name: 'ChatGPT', slug: 'chatgpt', tagline: 'Strategy & copy' },
      { name: 'Perplexity', slug: 'perplexity', tagline: 'SEO research' },
      { name: 'Synthesia', slug: 'synthesia', tagline: 'AI video marketing' },
      { name: 'Intercom AI', slug: 'intercom-ai', tagline: 'Chatbot automation' },
      { name: 'Canva AI', slug: 'canva-ai', tagline: 'Campaign visuals' },
    ],
    playbookSlug: 'ai-marketing-for-asia',
    categorySlug: 'marketing',
  },
];

const stats = [
  { icon: BookOpen, value: '71', label: 'AI Playbooks', desc: 'Step-by-step guides that work' },
  { icon: Layers, value: '90+', label: 'AI Tools', desc: 'Curated, reviewed & ranked' },
  { icon: Users, value: '5', label: 'Pipeline Stages', desc: 'Idea \u2192 Research \u2192 Build \u2192 Market \u2192 Scale' },
  { icon: TrendingUp, value: 'Asia', label: 'Ranked', desc: 'Editorial scores for Asia' },
];

// ─── Page Component ───────────────────────────────────────

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }]} />

      {/* HERO — Clean, Value-Driven */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-8 sm:pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-white to-cyan-50/50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs sm:text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-violet-500" />
              71 Playbooks \u00b7 90+ Curated Tools \u00b7 Asia-Ready
            </div>
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-5 tracking-tight">
              Stop collecting AI tools.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500">
                Start shipping results.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              71 step-by-step playbooks. 90+ curated tools.{' '}
              <strong className="text-gray-900">Pick what you want to do \u2014 we show you exactly how.</strong>
              No endless directories. No hype. Just workflows that ship.
            </p>
            {/* Search */}
            <div className="max-w-lg mx-auto mb-6">
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-xl opacity-20 group-focus-within:opacity-40 blur-sm transition-opacity" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to build or automate?"
                  className="relative w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 shadow-sm transition-all"
                />
              </form>
            </div>
            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <Link
                href="/playbooks"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5"
              >
                Browse All Playbooks
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold hover:border-violet-300 hover:text-violet-700 shadow-sm transition-all hover:-translate-y-0.5"
              >
                Explore Tools
              </Link>
            </div>
            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span><strong className="text-gray-900">71</strong> step-by-step playbooks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span><strong className="text-gray-900">90+</strong> curated AI tools</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Asia-fit <strong className="text-gray-900">editorial rankings</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASE SECTIONS — Problem-First Cards */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs sm:text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Problem \u2192 Playbook \u2192 Tools
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              What do you want to accomplish?
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Every workflow starts with a real problem. Pick yours \u2014 we give you the
              playbook and the tools. Just what works.
            </p>
          </div>

          <div className="space-y-6">
            {useCaseSections.map((section) => (
              <div
                key={section.id}
                className="group relative rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{section.icon}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-violet-700 transition-colors">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">
                      {section.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-3xl">
                      {section.description}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                      {section.tools.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition group/tool"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                            {tool.name[0]}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-gray-900 truncate">{tool.name}</div>
                            {tool.tagline && (
                              <div className="text-[9px] text-gray-500 truncate">{tool.tagline}</div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/playbook/${section.playbookSlug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium shadow-sm transition"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        View playbook
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link
                        href={`/categories/${section.categorySlug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-200 hover:text-gray-900 transition"
                      >
                        Browse all tools
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4" />
              Browse all 71 playbooks
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm font-medium hover:border-violet-300 hover:text-violet-700 transition hover:-translate-y-0.5"
            >
              <Layers className="w-4 h-4" />
              All 90+ tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 sm:py-16 border-y border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-violet-100 mb-3">
                    <Icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{stat.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PLAYBOOKS */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* MUST-USE THIS MONTH */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MustUseThisMonth />
        </div>
      </section>

      {/* TRENDING TOOLS */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingTools />
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedCategories />
        </div>
      </section>

      {/* RANKINGS */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedRankings />
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SuccessStories />
        </div>
      </section>

      {/* SPONSORED */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SponsoredToolSpot />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <NewsletterSignup source="homepage-cta" />
        </div>
      </section>
    </>
  );
}
