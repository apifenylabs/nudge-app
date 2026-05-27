// ══════════════════════════════════════════════════════════
// LandingPageCrossLinks — Cross-link grid connecting the 4
// /best-ai-* landing pages. Boosts topical authority by
// showing search engines that these pages are a cluster.
// Also cross-links to matching blog topic categories.
// ══════════════════════════════════════════════════════════
// Server-safe — no `use client`, no hooks.

import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, PenTool, Code, Megaphone, Sparkles } from 'lucide-react';

interface LandingPageEntry {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof PenTool;
  color: string;
}

const ALL_LANDING_PAGES: LandingPageEntry[] = [
  {
    slug: 'best-ai-tools',
    title: 'Best AI Tools in 2026 — Full Directory',
    shortTitle: 'All AI Tools',
    description: 'The complete curated directory of 85+ top-rated AI tools across every category.',
    icon: Layers,
    color: 'from-neon to-neon-dark',
  },
  {
    slug: 'best-ai-writing-tools',
    title: 'Best AI Writing Tools in 2026',
    shortTitle: 'Writing Tools',
    description: 'Find the perfect AI writing assistant for content, copy, and creative writing.',
    icon: PenTool,
    color: 'from-rose-500 to-pink-600',
  },
  {
    slug: 'best-ai-coding-tools',
    title: 'Best AI Coding Tools in 2026',
    shortTitle: 'Coding Tools',
    description: 'Ship faster with top-rated AI code assistants, from Copilot to Cursor.',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    slug: 'best-ai-marketing-tools',
    title: 'Best AI Marketing Tools in 2026',
    shortTitle: 'Marketing Tools',
    description: 'Automate campaigns, optimize SEO, and scale content with AI marketing tools.',
    icon: Megaphone,
    color: 'from-emerald-500 to-teal-600',
  },
];

const BLOG_CATEGORY_LINKS = [
  { slug: 'ai-tools', title: 'AI Tools Overview', count: 68 },
  { slug: 'comparisons', title: 'Tool Comparisons', count: 7 },
  { slug: 'productivity', title: 'Productivity & Automation', count: 18 },
];

interface Props {
  /** Current page slug — will exclude this from cross-links */
  currentSlug: string;
}

export default function LandingPageCrossLinks({ currentSlug }: Props) {
  const otherLandingPages = ALL_LANDING_PAGES.filter(p => p.slug !== currentSlug);

  return (
    <section className="border-t border-tech-500/20 bg-tech-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Landing page cross-links */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon/20 to-neon-dark/10 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-neon-light" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Best AI Tools by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {otherLandingPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="group bg-tech-800/50 border border-tech-500/20 rounded-xl p-4 sm:p-5 hover:border-neon/30 hover:bg-tech-800/70 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition mb-1">
                        {page.shortTitle}
                      </h3>
                      <p className="text-xs text-tech-400 line-clamp-2 leading-relaxed">
                        {page.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-neon-light/60 group-hover:text-neon-light transition mt-2">
                        View page <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Related blog topics */}
        <div className="pt-6 border-t border-tech-500/10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-neon" />
            <h3 className="text-sm font-semibold text-tech-200">
              Read related guides
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORY_LINKS.map(cat => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-tech-800 border border-tech-500/30 text-xs text-tech-300 hover:border-neon/30 hover:text-neon-light transition"
              >
                <Sparkles className="w-3 h-3" />
                <span>{cat.title}</span>
                <span className="text-tech-500">({cat.count})</span>
              </Link>
            ))}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-tech-800 border border-tech-500/30 text-xs text-tech-300 hover:border-neon/30 hover:text-neon-light transition"
            >
              All guides <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
