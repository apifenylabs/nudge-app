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
  title: 'Best AI Tools in the UK (2026) — Curated for British Teams & Startups',
  description: 'Discover the best AI tools for UK businesses and founders. Curated directory of 85+ tools ranked by trending score, UK-market readiness, and local relevance. Updated daily. Optimised for London, Cambridge, Manchester, and fintech/enterprise teams.',
  ogTitle: 'Best AI Tools in the UK (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Britain: UK GDPR compliance, GBP pricing, AI Safety Institute alignment, and UK tech ecosystem fit. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsUkPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools UK', item: '/ai-tools-uk' }]} />
      <GeoSeoSchema
        countryName="UK"
        countryCode="uk"
        capital="UK"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in UK"}
        slug="ai-tools-uk"
        faqs={[
 { question: "What are the best AI tools in the UK?", answer: "The best AI tools in the UK include ChatGPT for content and productivity, GitHub Copilot for development, Claude for reasoning and analysis, Canva AI for design, and Jasper for marketing. London is Europe's AI capital, home to DeepMind (Google), Synthesia, and hundreds of AI startups. The UK's AI market is growing at over 35% CAGR and British businesses benefit from world-class research at Oxford, Cambridge, Imperial, and UCL." },
 { question: "How does UK GDPR affect AI tool selection?", answer: "UK GDPR (retained EU GDPR with amendments) is a critical consideration for British businesses. The UK's data protection regime demands lawful basis for processing, data minimisation, and international transfer safeguards (including adequacy decisions and SCCs). The ICO provides specific guidance on AI and data protection — including AI auditing frameworks. We flag every tool for UK GDPR compliance, data residency, and ICO alignment, which is especially important for fintech, healthcare, and government contractors in London and across the UK." },
 { question: "What AI tools are best for the UK's key industries?", answer: "The UK's economy has distinctive AI needs: fintech AI in London (algorithmic trading, fraud detection, open banking), life sciences and biotech in Cambridge and Oxford (drug discovery, genomics), creative industries in London and Manchester (media, advertising, content production), manufacturing AI in the Midlands (industrial automation, supply chain optimisation), and pioneering AI safety research driven by the UK AI Safety Institute (AISI)." },
 { question: "How can UK startups access AI funding and support?", answer: "The UK has one of Europe's most generous AI innovation support systems. Innovate UK offers Smart Grants and AI-focused funding competitions. The British Business Bank provides venture debt and growth capital. DeepTech-focused VC firms (LocalGlobe, Balderton, Atomico, Hoxton Ventures) actively invest in UK AI startups. The UK's R&D tax credits and Patent Box scheme provide significant financial incentives for AI development. Programs like the AI Council, Digital Catapult, and London Tech Week accelerator networks give founders critical ecosystem access." },
 { question: "What AI regulations exist in the UK?", answer: "The UK government published a pro-innovation AI regulatory framework in 2024, taking a sector-specific approach rather than a single AI law. The AI Safety Institute (AISI) in London leads international frontier AI testing. The Online Safety Act 2023 has implications for AI-generated content. Financial Conduct Authority (FCA) regulates AI in financial services under its Consumer Duty. The Medicines and Healthcare products Regulatory Agency (MHRA) is developing AI as a Medical Device (AIaMD) guidance. The Data Protection and Digital Information Bill continues to evolve the UK's data framework for AI training." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-uk',
          countryName: 'UK',
          countryCode: 'uk',
          capital: 'UK',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for UK in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-600 via-white to-red-600 bg-clip-text text-transparent">UK</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'UK operates in english for business. We flag every tool for local language support — critical for serving customers across UK\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'UK businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for UK teams.' },
          { icon: Star, title: 'English Support', description: 'UK\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for UK market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools UK', item: '/ai-tools-uk' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for UK Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for UK&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-uk" />
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
