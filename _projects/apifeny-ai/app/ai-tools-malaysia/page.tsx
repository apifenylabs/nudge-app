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
  title: 'Best AI Tools in Malaysia (2026) — Curated for MY Startups & Teams',
  description: 'Discover the best AI tools for Malaysia businesses and founders. Curated directory of 85+ tools ranked by trending score, Asia-readiness, and local relevance. Updated daily. Supports BM, Chinese, Tamil, and English.',
  ogTitle: 'Best AI Tools in Malaysia (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Malaysia: multilingual support, local MYR pricing, data residency, and Asian market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsMalaysiaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Malaysia', item: '/ai-tools-malaysia' }]} />
      <GeoSeoSchema
        countryName="Malaysia"
        countryCode="malaysia"
        capital="Malaysia"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Malaysia"}
        slug="ai-tools-malaysia"
        faqs={[
 { question: "What are the best AI tools in Malaysia?", answer: "The best AI tools in Malaysia include ChatGPT for productivity and content, GitHub Copilot for software development, Canva AI for design, and Salesforce Einstein for enterprise CRM. Malaysia's MyDigital and Malaysia Digital Economy Blueprint make it one of the fastest-growing AI markets in ASEAN with strong government support for digital transformation." },
 { question: "Are AI tools Malaysia-ready for local businesses?", answer: "Yes, Malaysia's rapidly expanding digital infrastructure (high internet penetration at 97%, growing cloud adoption) makes it well-suited for cloud-based AI tools. Malaysian businesses benefit from proximity to AWS and Azure data centres in the region, government grants under the Digital Economy Blueprint, and strong IP protection laws." },
 { question: "What AI tools are best for Malaysia's key industries?", answer: "Malaysia's top sectors benefit from specialised AI: palm oil and agriculture AI for plantation management, manufacturing AI under Industry4WRD for smart factories, fintech AI for Islamic banking and digital payments, and tourism AI for Malaysia's RM100B+ tourism sector. Tools like Petronas-backed AI initiatives support the energy sector." },
 { question: "How can Malaysian startups adopt AI cost-effectively?", answer: "Malaysian startups can leverage MDEC's Digitalisation Grant of up to RM5,000, SME Digitalisation Grant Scheme (SDG) covering 50% of technology costs, and Cradle Fund's CIP Spark programme. Most major AI platforms offer free tiers — ChatGPT Free, Google Colab, and open-source models on Hugging Face — ideal for MVP validation before scaling." },
 { question: "What AI regulations apply in Malaysia?", answer: "Malaysia's Personal Data Protection Act (PDPA) 2010 governs AI tool data handling, with amendments effective 2025 expanding compliance requirements. Bank Negara Malaysia mandates financial data residency, and MyDIGITAL's Rangka Tindakan (Blueprint) sets AI governance guidelines. Tools processing sensitive data should use regional cloud infrastructure (AWS Singapore, Azure Southeast Asia) for regulatory compliance." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-malaysia',
          countryName: 'Malaysia',
          countryCode: 'malaysia',
          capital: 'Malaysia',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-700 via-white to-red-600',
          heroTitle: 'Best AI Tools for Malaysia in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-700 via-white to-red-600 bg-clip-text text-transparent">Malaysia</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Malaysia operates in english for business. We flag every tool for local language support — critical for serving customers across Malaysia\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Malaysia businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Malaysia teams.' },
          { icon: Star, title: 'English Support', description: 'Malaysia\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Malaysia market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Malaysia', item: '/ai-tools-malaysia' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Malaysia Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Malaysia&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-malaysia" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Malaysia"
        countrySlug="malaysia"
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
