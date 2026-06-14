'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Layers, Star, Zap, BookOpen, Globe, Wallet, ShieldCheck, MapPin,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import CountryBlogPosts from '@/components/CountryBlogPosts';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';
import BrowseByCountry from '@/components/BrowseByCountry';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';
import CountryPageTemplate from '@/components/CountryPageTemplate';

const META = {
  title: 'Best AI Tools in Laos (2026) — 85+ Tools for Lao Startups & SMEs',
  description: 'Discover the best AI tools for Laos. 85+ ranked tools with LAK pricing, local compliance, and emerging digital ecosystem support. Updated daily for Lao solopreneurs, SMEs, and enterprises in Vientiane and beyond.',
  ogTitle: 'Best AI Tools in Laos (2026) — Apifeny AI',
  ogDescription: '85+ AI tools ranked for the Lao market. 🇱🇦 LAK pricing, data-compliant, Lao language support — Southeast Asia\'s emerging digital economy.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsLaosPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Laos', item: '/ai-tools-laos' }]} />
      <GeoSeoSchema
        countryName="Laos"
        countryCode="laos"
        capital="Vientiane"
        currency="LAK"
        language="English"
        languageCode="en"
        marketSize={"an emerging digital economy in Southeast Asia, with growing tech adoption in Vientiane and connectivity via the Laos-China railway corridor"}
        slug="ai-tools-laos"
        faqs={[
 { question: "What are the best AI tools for Laos in 2026?", answer: "The best AI tools for Laos include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Jasper for marketing. Laos is an emerging digital economy in Southeast Asia, with growing tech adoption driven by the Laos-China railway corridor and increasing internet connectivity in urban centres like Vientiane and Luang Prabang." },
 { question: "Are AI tools accessible for Lao businesses?", answer: "Yes. Mobile internet penetration is growing rapidly, especially in Vientiane and major towns. Digital payment services like Unitel Money and BCEL One are expanding. The Lao government's digital transformation agenda promotes ICT adoption, and the Laos-China railway has boosted digital infrastructure investment." },
 { question: "What AI tools are best for Laos's key industries?", answer: "Tourism (a major GDP contributor) benefits from AI booking systems and multilingual customer support. Agriculture uses AI for crop monitoring and market price analysis. The energy sector (hydropower) leverages AI for grid management and maintenance prediction." },
 { question: "What data regulations apply in Laos?", answer: "Laos's Law on Electronic Transactions (amended 2021) and the Law on Cybercrime Prevention govern digital activities. The Ministry of Technology and Communications oversees ICT regulation. Cross-border data transfers are subject to local compliance requirements for sensitive sectors." },
 { question: "Is Lao language supported by AI tools?", answer: "Support is limited but improving. Google Translate supports Lao with basic translation. ChatGPT has rudimentary Lao understanding. Local initiatives and the growing developer community in Vientiane are working on Lao-language NLP tools and applications." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-laos',
          countryName: 'Laos',
          countryCode: 'laos',
          capital: 'Vientiane',
          currency: 'LAK',
          languages: 'English',
          heroGradient: 'from-red-600 via-blue-600 to-blue-800',
          heroTitle: 'Best AI Tools for Laos in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-blue-600 to-blue-800 bg-clip-text text-transparent">Laos</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Laos operates in english and lao for business. We flag every tool for local language support — critical for serving customers across Laos\'s diverse regions including Vientiane, Luang Prabang, and Savannakhet.' },
          { icon: ShieldCheck, title: 'LAK Pricing & Local Compliance', description: 'Lao businesses need tools that work in LAK, offer local payment methods like BCEL One and Unitel Money, and comply with local data protection regulations. We rank every tool on real-world usability for Lao teams.' },
          { icon: Star, title: 'English Support', description: 'Laos\'s emerging digital economy demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Laos market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Laos', item: '/ai-tools-laos' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Laos Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Laos&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-laos" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Laos"
        countrySlug="laos"
      />

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
