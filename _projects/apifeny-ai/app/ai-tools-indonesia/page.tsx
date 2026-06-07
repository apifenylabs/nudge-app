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
  title: 'Alat AI Terbaik di Indonesia (2026) — 85+ Tools untuk Startup & Enterprise',
  description: 'Temukan alat AI terbaik untuk bisnis di Indonesia. 85+ alat AI yang di-curate dengan dukungan Bahasa Indonesia, harga IDR, kepatuhan UU PDP, dan ekosistem lokal. Diperbarui setiap hari.',
  ogTitle: 'Alat AI Terbaik di Indonesia (2026) — Apifeny AI',
  ogDescription: '85+ alat AI terbaik untuk pasar Indonesia. Dukungan Bahasa Indonesia, harga IDR, kepatuhan UU PDP, dan ramah ekosistem startup lokal.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsIndonesiaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Indonesia', item: '/ai-tools-indonesia' }]} />
      <GeoSeoSchema
        countryName="Indonesia"
        countryCode="indonesia"
        capital="Indonesia"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Indonesia"}
        slug="ai-tools-indonesia"
        faqs={[
 { question: "What are the best AI tools in Indonesia?", answer: "The best AI tools in Indonesia include ChatGPT for general productivity, GitHub Copilot for development, Canva AI for design, and Midjourney for creative work. Indonesia's massive digital economy — the largest in SE Asia — makes it a prime market for AI adoption across all sectors." },
 { question: "Are AI tools accessible for Indonesian SMEs?", answer: "Yes. Indonesia has 65M+ SMEs forming 61% of GDP. Many global AI tools offer free tiers. Local alternatives include Kata.ai for Indonesian-language chatbots, Nodeflux for computer vision, and Prosa.ai for NLP. Government initiatives like Making Indonesia 4.0 support SME digitalisation." },
 { question: "What AI tools suit Indonesia's key sectors?", answer: "E-commerce and fintech lead AI adoption, with Gojek, Tokopedia, and Bukalapak using AI for recommendations and logistics. Agritech benefits from AI crop monitoring tools. The government's Digital Transformation Agenda targets AI integration across healthcare, education, and public services." },
 { question: "What AI regulations apply in Indonesia?", answer: "Indonesia's PDP Law (UU No. 27/2022) governs personal data protection, effective 2024. Cross-border data transfer rules require registration. The Ministry of Communication and Informatics (Kominfo) regulates digital services and has issued circulars on ethical AI use." },
 { question: "Is Indonesian language supported by AI tools?", answer: "Major AI platforms increasingly support Bahasa Indonesia. ChatGPT offers solid Indonesian-language performance. Local providers like Kata.ai and Prosa.ai offer Indonesian-first NLP. Google's Indonesian language support has improved significantly through its AI for Indonesia initiative." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-indonesia',
          countryName: 'Indonesia',
          countryCode: 'indonesia',
          capital: 'Indonesia',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for Indonesia in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">Indonesia</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Indonesia operates in english for business. We flag every tool for local language support — critical for serving customers across Indonesia\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Indonesia businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Indonesia teams.' },
          { icon: Star, title: 'English Support', description: 'Indonesia\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Indonesia market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Indonesia', item: '/ai-tools-indonesia' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Indonesia Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Indonesia&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-indonesia" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Indonesia"
        countrySlug="indonesia"
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
