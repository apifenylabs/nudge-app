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
  title: 'Best AI Tools in South Korea (2026) — 100+ Tools for Korean Startups & Chaebols',
  description: 'Discover the best AI tools for South Korea',
  ogTitle: 'Best AI Tools in South Korea (2026) — Apifeny AI',
  ogDescription: '100+ AI tools ranked for the South Korean market. 🇰🇷 Korean language support, KRW/USD pricing, PIPA compliant, curated for Korea',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsSouthKoreaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools South Korea', item: '/ai-tools-south-korea' }]} />
      <GeoSeoSchema
        countryName="South Korea"
        countryCode="south-korea"
        capital="South Korea"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in South Korea"}
        slug="ai-tools-south-korea"
        faqs={[
 { question: "What are the best AI tools in South Korea?", answer: "The best AI tools in South Korea include ChatGPT for productivity, GitHub Copilot for development, Canva AI for design, and local platforms like Naver's HyperCLOVA X for Korean-optimised AI. South Korea's world-leading digital infrastructure and government-driven AI push make it an advanced AI market." },
 { question: "Are AI tools accessible for Korean businesses?", answer: "South Korea has the world's fastest average internet speed and 97% smartphone penetration. The Digital New Deal supports AI adoption with ₩76T in funding. Government K-Cloud projects subsidise AI for SMEs. Most global AI tools offer Korean language support." },
 { question: "What AI tools are best for Korea's semiconductor industry?", answer: "Korea's semiconductor industry (led by Samsung and SK Hynix, 20% of global market) uses AI for chip design optimisation, defect detection, and yield prediction. Synopsys AI, Cadence AI, and Samsung's own AI Foundry Solutions are transforming semiconductor manufacturing." },
 { question: "What AI regulations apply in South Korea?", answer: "Korea's Personal Information Protection Act (PIPA) is one of Asia's strictest data privacy laws. The AI Act (2024) provides a comprehensive regulatory framework. The Korea Internet & Security Agency (KISA) enforces data protection compliance for AI systems." },
 { question: "Is Korean language well supported by AI tools?", answer: "Korean has excellent AI support. ChatGPT handles Korean well, but Naver's HyperCLOVA X and Kakao's KoGPT often outperform on Korean-language tasks. Major enterprise tools offer Korean localisation. The government's AI Hub provides Korean-language datasets and models." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-south-korea',
          countryName: 'South Korea',
          countryCode: 'south-korea',
          capital: 'South Korea',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-white via-blue-600 to-red-600',
          heroTitle: 'Best AI Tools for South Korea in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-white via-blue-600 to-red-600 bg-clip-text text-transparent">South Korea</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'South Korea operates in english for business. We flag every tool for local language support — critical for serving customers across South Korea\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'South Korea businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for South Korea teams.' },
          { icon: Star, title: 'English Support', description: 'South Korea\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for South Korea market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools South Korea', item: '/ai-tools-south-korea' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for South Korea Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for South Korea&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-south-korea" />
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
