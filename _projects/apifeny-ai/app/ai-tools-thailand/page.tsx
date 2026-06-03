'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Layers, Star, Zap, BookOpen, Globe, Wallet, ShieldCheck, MapPin,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';
import BrowseByCountry from '@/components/BrowseByCountry';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';
import CountryPageTemplate from '@/components/CountryPageTemplate';

const META = {
  title: 'Best AI Tools in Thailand (2026) — 85+ Tools for Thai Startups & Enterprises',
  description: 'Discover the best AI tools for Thailand. 85+ ranked tools with THB pricing, PDPA compliance, and local ecosystem support. Updated daily for Thai solopreneurs, SMEs, and enterprises.',
  ogTitle: 'Best AI Tools in Thailand (2026) — Apifeny AI',
  ogDescription: '85+ AI tools ranked for the Thai market. 🇹🇭 THB pricing, PDPA-compliant, Thai-language supported.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsThailandPage() {
  const top12 = useMemo(() => topByTrending(12), []);
  const categorySections = useMemo(() =>
    CATEGORY_NAMES.map((name) => ({
      name,
      tools: topByCategory(name, 6),
      count: toolsData.filter((t) => t.is_published && t.category === name).length,
    })),
  []);
  const totalCount = useMemo(() => toolsData.filter((t) => t.is_published).length, []);

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Thailand', item: '/ai-tools-thailand' }]} />
      <GeoSeoSchema
        countryName="Thailand"
        countryCode="thailand"
        capital="Thailand"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Thailand"}
        slug="ai-tools-thailand"
        faqs={[
 { question: "What are the best AI tools in Thailand?", answer: "The best AI tools in Thailand include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Jasper for marketing. Thailand's rapidly digitising economy and strong government support through Thailand 4.0 make it a growing AI market." },
 { question: "Are AI tools accessible for Thai businesses?", answer: "Yes. Most global AI tools work well in Thailand. The Board of Investment (BOI) offers tax incentives for tech adoption. The Digital Economy Promotion Agency (DEPA) provides grants and certification. Thailand's high smartphone penetration (80%+) and strong 5G rollout support cloud-based AI tools." },
 { question: "What AI tools are best for Thailand's tourism industry?", answer: "Tourism (12% of GDP) benefits from AI chatbots for customer service, TripAdvisor AI for personalised recommendations, and local tools like Ricult for tourism analytics. The Tourism Authority of Thailand (TAT) promotes digital transformation through its Amazing Thailand Digital Tourism initiative." },
 { question: "What AI regulations apply in Thailand?", answer: "Thailand's Personal Data Protection Act (PDPA), effective June 2022, is one of Asia's strongest data privacy laws — similar to GDPR. Cross-border data transfers have strict requirements. The Electronic Transactions Development Agency (ETDA) governs digital platform regulations." },
 { question: "Is Thai language supported by AI tools?", answer: "Support is improving. ChatGPT handles Thai moderately well. Google Translate supports Thai. Local providers like NECTEC (National Electronics and Computer Technology Center) develop Thai-language NLP. The Thai government's AI Roadmap (2022-2027) prioritises Thai language AI development." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-thailand',
          countryName: 'Thailand',
          countryCode: 'thailand',
          capital: 'Thailand',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for Thailand in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-600 via-white to-red-600 bg-clip-text text-transparent">Thailand</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Thailand operates in english for business. We flag every tool for local language support — critical for serving customers across Thailand\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Thailand businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Thailand teams.' },
          { icon: Star, title: 'English Support', description: 'Thailand\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Thailand market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Thailand', item: '/ai-tools-thailand' },
        ]}
      />

      {/* FEATURED PLAYBOOKS */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-violet-600" />
              <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">Playbooks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Thailand Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Thailand&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-thailand" />
      </section>

      <BrowseByCountry />

      {/* BLOG LINKS */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>

      {/* FOMO BAR */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs text-gray-500">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-violet-500" /> Updated Daily</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-violet-500" /> {totalCount}+ tools</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" /> Expert ranked</span>
          </div>
        </div>
      </div>
    </>
  );
}
