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
  title: 'Best AI Tools in Tanzania (2026) — 85+ Tools for Tanzanian Startups & Enterprises',
  description: 'Discover the best AI tools for Tanzania. 85+ ranked tools with TZS pricing, local compliance, and growing ecosystem support. Updated daily for Tanzanian solopreneurs, SMEs, and enterprises in Dar es Salaam and beyond.',
  ogTitle: 'Best AI Tools in Tanzania (2026) — Apifeny AI',
  ogDescription: '85+ AI tools ranked for the Tanzanian market. 🇹🇿 TZS pricing, data-compliant, Swahili & English language support.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsTanzaniaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Tanzania', item: '/ai-tools-tanzania' }]} />
      <GeoSeoSchema
        countryName="Tanzania"
        countryCode="tanzania"
        capital="Dodoma"
        currency="TZS"
        language="English"
        languageCode="en"
        marketSize={"an East African economy with a rapidly growing tech scene in Dar es Salaam and expanding digital adoption across the country"}
        slug="ai-tools-tanzania"
        faqs={[
 { question: "What are the best AI tools for Tanzania in 2026?", answer: "The best AI tools for Tanzania include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Jasper for marketing. Tanzania's growing tech ecosystem, centred in Dar es Salaam, is driving AI adoption in fintech, agritech, and tourism." },
 { question: "Are AI tools accessible for Tanzanian businesses?", answer: "Yes. Mobile money services like M-Pesa and Tigo Pesa are deeply integrated into the economy. The government's National ICT Policy and Tanzania's Five-Year Development Plan promote digital transformation. Internet penetration is rising, especially in Dar es Salaam, Arusha, and Mwanza." },
 { question: "What AI tools are best for Tanzania's key industries?", answer: "Tourism (17% of GDP) benefits from AI-powered booking systems and wildlife conservation analytics. Agriculture (24% of GDP) uses AI for crop monitoring and weather prediction. Fintech is growing rapidly with mobile lending and digital savings platforms serving unbanked populations." },
 { question: "What data regulations apply in Tanzania?", answer: "Tanzania's Personal Data Protection Act (2022) governs data processing. The Tanzania Communications Regulatory Authority (TCRA) oversees digital services. Cross-border data transfers require compliance with localisation requirements for certain sectors." },
 { question: "Is Swahili language supported by AI tools?", answer: "Support is expanding. ChatGPT and Google Translate have basic Swahili support. Local tech initiatives in Dar es Salaam work on Swahili NLP models. Google's Swahili speech recognition has improved significantly, and AI translation accuracy for Swahili is steadily getting better." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-tanzania',
          countryName: 'Tanzania',
          countryCode: 'tanzania',
          capital: 'Dodoma',
          currency: 'TZS',
          languages: 'English',
          heroGradient: 'from-green-600 via-yellow-400 to-blue-600',
          heroTitle: 'Best AI Tools for Tanzania in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-green-600 via-yellow-400 to-blue-600 bg-clip-text text-transparent">Tanzania</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Tanzania operates in english and swahili for business. We flag every tool for local language support — critical for serving customers across Tanzania\'s diverse regions including Dar es Salaam, Arusha, Mwanza, and Zanzibar.' },
          { icon: ShieldCheck, title: 'TZS Pricing & Local Compliance', description: 'Tanzanian businesses need tools that work in TZS, offer local payment methods like M-Pesa and Tigo Pesa, and comply with local data protection regulations. We rank every tool on real-world usability for Tanzanian teams.' },
          { icon: Star, title: 'English Support', description: 'Tanzania\'s growing digital economy demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Tanzania market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Tanzania', item: '/ai-tools-tanzania' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Tanzania Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Tanzania&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-tanzania" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Tanzania"
        countrySlug="tanzania"
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
