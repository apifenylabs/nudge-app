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
  title: 'Best AI Tools in Cameroon (2026) — 85+ Tools for Cameroonian Startups & Enterprises',
  description: 'Discover the best AI tools for Cameroon. 85+ ranked tools with XAF pricing, local compliance, and bilingual ecosystem support. Updated daily for Cameroonian solopreneurs, SMEs, and enterprises from Douala to Yaoundé.',
  ogTitle: 'Best AI Tools in Cameroon (2026) — Apifeny AI',
  ogDescription: '85+ AI tools ranked for the Cameroonian market. 🇨🇲 XAF pricing, data-compliant, French & English bilingual support.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsCameroonPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Cameroon', item: '/ai-tools-cameroon' }]} />
      <GeoSeoSchema
        countryName="Cameroon"
        countryCode="cameroon"
        capital="Yaoundé"
        currency="XAF"
        language="English"
        languageCode="en"
        marketSize={"a bilingual Central African market with a growing digital economy driven by tech hubs in Douala and Yaoundé"}
        slug="ai-tools-cameroon"
        faqs={[
 { question: "What are the best AI tools for Cameroon in 2026?", answer: "The best AI tools for Cameroon include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Jasper for marketing. Cameroon's bilingual (French/English) population and growing tech scene in Douala and Yaoundé make it a promising market for AI adoption across fintech, agritech, and edtech." },
 { question: "Are AI tools accessible for Cameroonian businesses?", answer: "Yes. Mobile money services like MTN Mobile Money and Orange Money are widely used for digital payments. Internet penetration is growing, especially in urban centres. The Cameroonian government's National Development Strategy 2020-2030 prioritises digital transformation and technology infrastructure." },
 { question: "What AI tools are best for Cameroon's key industries?", answer: "Agriculture (15% of GDP) benefits from AI for crop yield prediction and supply chain optimisation. Fintech is expanding with mobile banking and micro-insurance platforms. Edtech startups use AI for bilingual education and remote learning in rural areas." },
 { question: "What data regulations apply in Cameroon?", answer: "Cameroon's Law No. 2019/022 on Data Protection governs personal data processing. The National Commission for the Protection of Data (CNPD) is the regulatory authority. The country is also influenced by the CEMAC (Central African Economic and Monetary Community) regional framework for digital regulation." },
 { question: "Is French and English supported by AI tools?", answer: "Yes. Most global AI tools support both French and English. ChatGPT, Google Translate, and Microsoft Copilot handle French well and have improving English support. Local tech communities in Douala and Yaoundé actively develop bilingual AI applications." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-cameroon',
          countryName: 'Cameroon',
          countryCode: 'cameroon',
          capital: 'Yaoundé',
          currency: 'XAF',
          languages: 'English',
          heroGradient: 'from-green-600 via-red-600 to-yellow-500',
          heroTitle: 'Best AI Tools for Cameroon in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-green-600 via-red-600 to-yellow-500 bg-clip-text text-transparent">Cameroon</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Cameroon operates in english and french for business. We flag every tool for local language support — critical for serving customers across Cameroon\'s bilingual regions.' },
          { icon: ShieldCheck, title: 'XAF Pricing & Local Compliance', description: 'Cameroonian businesses need tools that work in XAF, offer local payment methods like MTN Mobile Money and Orange Money, and comply with local data protection regulations. We rank every tool on real-world usability for Cameroonian teams.' },
          { icon: Star, title: 'English Support', description: 'Cameroon\'s bilingual business environment demands tools with english and french support, local customer service, and integration with locally-used platforms. We evaluate every tool for Cameroon market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Cameroon', item: '/ai-tools-cameroon' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Cameroon Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Cameroon&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-cameroon" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Cameroon"
        countrySlug="cameroon"
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
