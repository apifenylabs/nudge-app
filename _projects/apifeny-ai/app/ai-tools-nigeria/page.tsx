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
  title: 'Best AI Tools in Nigeria (2026) — Curated for NG Startups & Teams',
  description: 'Discover the best AI tools for Nigeria businesses and founders. Curated directory of 85+ tools ranked by trending score, Africa-readiness, and local relevance. Updated daily. Supports English and regional languages.',
  ogTitle: 'Best AI Tools in Nigeria (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Nigeria: local NGN pricing, NDPR data compliance, and Africa market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsNigeriaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Nigeria', item: '/ai-tools-nigeria' }]} />
      <GeoSeoSchema
        countryName="Nigeria"
        countryCode="nigeria"
        capital="Nigeria"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Nigeria"}
        slug="ai-tools-nigeria"
        faqs={[
 { question: "What are the best AI tools in Nigeria?", answer: "The best AI tools in Nigeria include ChatGPT for content creation and productivity, GitHub Copilot for software development, Canva AI for design, and Google AI tools for business automation. Nigeria's thriving tech ecosystem — home to unicorns like Flutterwave and Africa's largest startup scene in Lagos — makes AI adoption a key priority for businesses, fintechs, and startups across Lagos, Abuja, and Port Harcourt." },
 { question: "Are AI tools Nigeria-ready for local businesses?", answer: "Yes, Nigeria's digital infrastructure is expanding rapidly with growing mobile penetration, expanding cloud adoption, and a thriving fintech ecosystem supporting digital payments (Flutterwave, Paystack, Interswitch). Nigerian businesses benefit from strong mobile money infrastructure, and the government's Nigeria AI Strategy and NITDA digital transformation initiatives. Many tools now offer NGN-friendly pricing and Africa-focused features." },
 { question: "What AI tools are best for Nigeria's key industries?", answer: "Nigeria's key sectors benefiting from AI include: fintech AI for digital payments and lending platforms (Flutterwave, Paystack, Carbon, FairMoney); e-commerce AI for Jumia and regional marketplaces; agricultural AI for crop monitoring and supply chain optimization; edtech AI for platforms like uLesson and AltSchool; and healthtech AI for telemedicine and diagnostics." },
 { question: "How can Nigerian startups adopt AI cost-effectively?", answer: "Nigerian startups can leverage NITDA innovation grants, Lagos State tech fund initiatives, and incubator programs like Co-Creation Hub (CcHub), Ventures Park, and the Lagos Tech Hub accelerator. Most AI tools offer free tiers (ChatGPT Free, Google Colab, GitHub Copilot free for students via GitHub Education, TensorFlow/PyTorch open source) — ideal for MVP development before fundraising from VCs like TLcom Capital and EchoVC." },
 { question: "What AI regulations exist in Nigeria?", answer: "Nigeria's AI governance is guided by the National AI Strategy and NITDA (National Information Technology Development Agency) digital transformation framework. The Nigeria Data Protection Regulation (NDPR) governs data handling for AI tools, overseen by the Nigeria Data Protection Commission (NDPC). The NCC (Nigerian Communications Commission) regulates AI in telecom and digital services, while the CBN (Central Bank of Nigeria) oversees fintech AI tools. Tools handling sensitive data should consider local cloud infrastructure options." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-nigeria',
          countryName: 'Nigeria',
          countryCode: 'nigeria',
          capital: 'Nigeria',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-green-600 via-white to-green-600',
          heroTitle: 'Best AI Tools for Nigeria in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-green-600 via-white to-green-600 bg-clip-text text-transparent">Nigeria</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Nigeria operates in english for business. We flag every tool for local language support — critical for serving customers across Nigeria\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Nigeria businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Nigeria teams.' },
          { icon: Star, title: 'English Support', description: 'Nigeria\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Nigeria market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Nigeria', item: '/ai-tools-nigeria' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Nigeria Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Nigeria&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-nigeria" />
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
