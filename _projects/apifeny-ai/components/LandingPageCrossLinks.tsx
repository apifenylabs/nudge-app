// ══════════════════════════════════════════════════════════
// LandingPageCrossLinks — Cross-link grid connecting the 4
// /best-ai-* landing pages. Boosts topical authority by
// showing search engines that these pages are a cluster.
// Also cross-links to matching blog topic categories.
// ══════════════════════════════════════════════════════════
// Server-safe — no `use client`, no hooks.

import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, PenTool, Code, Megaphone, Sparkles, MapPin } from 'lucide-react';

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
  {
    slug: 'ai-tools-singapore',
    title: 'Best AI Tools in Singapore (2026)',
    shortTitle: 'Singapore AI Tools',
    description: 'Curated AI tools for Singapore founders and teams — rated for multilingual support, SGD pricing, and PDPA compliance.',
    icon: MapPin,
    color: 'from-red-400 to-red-500',
  },
  {
    slug: 'ai-tools-malaysia',
    title: 'Best AI Tools in Malaysia (2026)',
    shortTitle: 'Malaysia AI Tools',
    description: 'Curated AI tools for Malaysian founders and teams — rated for BM/中文/தமிழ்/English support, MYR pricing, and PDPA compliance.',
    icon: MapPin,
    color: 'from-blue-400 to-yellow-400',
  },
  {
    slug: 'ai-tools-hong-kong',
    title: 'Best AI Tools in Hong Kong (2026)',
    shortTitle: 'Hong Kong AI Tools',
    description: 'Curated AI tools for Hong Kong teams — rated for Traditional Chinese support, HKD pricing, PDPO compliance, and enterprise readiness.',
    icon: MapPin,
    color: 'from-red-400 to-rose-500',
  },
  {
    slug: 'ai-tools-vietnam',
    title: 'Best AI Tools in Vietnam (2026)',
    shortTitle: 'Vietnam AI Tools',
    description: 'Curated AI tools for Vietnam teams — rated for tiếng Việt support, VND pricing, PDPA compliance, and local ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-yellow-400',
  },
  {
    slug: 'ai-tools-philippines',
    title: 'Best AI Tools in the Philippines (2026)',
    shortTitle: 'Philippines AI Tools',
    description: 'Curated AI tools for the Philippines — rated for PHP pricing, NPC compliance, mobile-first access, and BPO/freelancer ecosystem support.',
    icon: MapPin,
    color: 'from-blue-500 to-red-500',
  },
  {
    slug: 'ai-tools-indonesia',
    title: 'Best AI Tools in Indonesia (2026)',
    shortTitle: 'Indonesia AI Tools',
    description: 'Curated AI tools for Indonesia teams — rated for Bahasa Indonesia support, IDR pricing, UU PDP compliance, and local ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-white',
  },
  {
    slug: 'ai-tools-thailand',
    title: 'Best AI Tools in Thailand (2026)',
    shortTitle: 'Thailand AI Tools',
    description: 'Curated AI tools for Thailand teams — rated for Thai language support, THB pricing, PDPA compliance, and local ecosystem readiness.',
    icon: MapPin,
    color: 'from-purple-600 to-red-500',
  },
  {
    slug: 'ai-tools-cambodia',
    title: 'Best AI Tools in Cambodia (2026)',
    shortTitle: 'Cambodia AI Tools',
    description: 'Curated AI tools for Cambodia teams — rated for Khmer (ភាសាខ្មែរ) support, USD/KHR pricing, privacy compliance, and local ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-600 to-red-500',
  },
  {
    slug: 'ai-tools-japan',
    title: 'Best AI Tools in Japan (2026)',
    shortTitle: 'Japan AI Tools',
    description: 'Curated AI tools for Japan teams — rated for Japanese (日本語) support, JPY pricing, APPI compliance, and enterprise ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-600 to-rose-900',
  },
  {
    slug: 'ai-tools-south-korea',
    title: 'Best AI Tools in South Korea (2026)',
    shortTitle: 'South Korea AI Tools',
    description: 'Curated AI tools for South Korea teams — rated for Korean (한국어) support, KRW pricing, PIPA compliance, and chaebol/startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-500 to-red-600',
  },
  {
    slug: 'ai-tools-taiwan',
    title: 'Best AI Tools in Taiwan (2026)',
    shortTitle: 'Taiwan AI Tools',
    description: 'Curated AI tools for Taiwan teams — rated for 繁體中文 support, TWD pricing, PDPA compliance, and semiconductor/tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-700 to-red-600',
  },
  {
    slug: 'ai-tools-india',
    title: 'Best AI Tools in India (2026)',
    shortTitle: 'India AI Tools',
    description: 'Curated AI tools for India teams — rated for multilingual support (हिन्दी/English/regional), INR pricing, DPDP Act compliance, and India startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-orange-500 to-green-600',
  },
  {
    slug: 'ai-tools-myanmar',
    title: 'Best AI Tools in Myanmar (2026)',
    shortTitle: 'Myanmar AI Tools',
    description: 'Curated AI tools for Myanmar teams — rated for Burmese (ျမန္မာဘာသာ) support, MMK/USD pricing, and emerging digital ecosystem readiness.',
    icon: MapPin,
    color: 'from-yellow-400 to-green-600',
  },
  {
    slug: 'ai-tools-bangladesh',
    title: 'Best AI Tools in Bangladesh (2026)',
    shortTitle: 'Bangladesh AI Tools',
    description: 'Curated AI tools for Bangladesh teams — rated for Bengali (বাংলা) support, BDT pricing, and Dhaka startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-red-500',
  },
  {
    slug: 'ai-tools-sri-lanka',
    title: 'Best AI Tools in Sri Lanka (2026)',
    shortTitle: 'Sri Lanka AI Tools',
    description: 'Curated AI tools for Sri Lanka teams — rated for Sinhala (සිංහල)/Tamil (தமிழ்) support, LKR pricing, and Colombo tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-400 to-yellow-300',
  },
  {
    slug: 'ai-tools-nepal',
    title: 'Best AI Tools in Nepal (2026)',
    shortTitle: 'Nepal AI Tools',
    description: 'Curated AI tools for Nepal teams — rated for Nepali (नेपाली) support, NPR pricing, and Kathmandu developer ecosystem readiness.',
    icon: MapPin,
    color: 'from-blue-600 to-red-400',
  },
  {
    slug: 'ai-tools-pakistan',
    title: 'Best AI Tools in Pakistan (2026)',
    shortTitle: 'Pakistan AI Tools',
    description: 'Curated AI tools for Pakistan teams — rated for Urdu (اردو)/English support, PKR pricing, and Karachi/Islamabad startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-white',
  },
  {
    slug: 'ai-tools-uae',
    title: 'Best AI Tools in UAE (2026)',
    shortTitle: 'UAE AI Tools',
    description: 'Curated AI tools for UAE teams — rated for Arabic (العربية)/English support, AED pricing, and Dubai/Abu Dhabi tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-green-400',
  },
  {
    slug: 'ai-tools-saudi-arabia',
    title: 'Best AI Tools in Saudi Arabia (2026)',
    shortTitle: 'KSA AI Tools',
    description: 'Curated AI tools for Saudi Arabia teams — rated for Arabic (العربية) support, SAR pricing, and Vision 2030 ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-700 to-white',
  },
  {
    slug: 'ai-tools-china',
    title: 'Best AI Tools in China (2026)',
    shortTitle: 'China AI Tools',
    description: 'Curated AI tools for China teams — rated for 中文 (Chinese) support, ¥ RMB pricing, PIPL/DSL/CSL compliance, and Beijing/Shanghai/Shenzhen ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-600 to-yellow-400',
  },
  {
    slug: 'ai-tools-nigeria',
    title: 'Best AI Tools in Nigeria (2026)',
    shortTitle: 'Nigeria AI Tools',
    description: 'Curated AI tools for Nigeria teams — rated for multilingual support (English/Hausa/Yoruba/Igbo), NGN pricing, NDPR compliance, and Lagos startup ecosystem readiness.',
    icon: MapPin,
    color: 'from-green-500 to-white',
  },
  {
    slug: 'ai-tools-turkey',
    title: 'Best AI Tools in Turkey (2026)',
    shortTitle: 'Turkey AI Tools',
    description: 'Curated AI tools for Turkey teams — rated for Turkish (Türkçe) support, TRY pricing, KVKK compliance, and Istanbul/Ankara tech ecosystem readiness.',
    icon: MapPin,
    color: 'from-red-500 to-white',
  },
  {
    slug: 'ai-tools-for-startups',
    title: 'Best AI Tools for Startups (2026)',
    shortTitle: 'AI Tools for Startups',
    description: 'Curated AI tools built for early-stage startups — rated for budget-friendliness, free tiers, scalability, and lean team workflow fit.',
    icon: MapPin,
    color: 'from-violet-500 to-purple-600',
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
