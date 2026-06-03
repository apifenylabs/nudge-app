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
  title: 'Best AI Tools in Japan (2026) — Curated for Japanese Teams & Startups',
  description: 'Discover the best AI tools for Japanese businesses and founders. Curated directory of 85+ tools ranked by trending score, Japan-market readiness, and local relevance. Updated daily. Built for Tokyo, Osaka, Kyoto, and Japan',
  ogTitle: 'Best AI Tools in Japan (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Japan: RIKEN AIP research, Tokyo University ecosystem, JPY pricing, Japanese (JA) support, and APAC data compliance. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsJapanPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Japan', item: '/ai-tools-japan' }]} />
      <GeoSeoSchema
        countryName="Japan"
        countryCode="japan"
        capital="Japan"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Japan"}
        slug="ai-tools-japan"
        faqs={[
 { question: "What are the best AI tools in Japan?", answer: "The best AI tools in Japan include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning in both English and Japanese, Canva AI for design, and Jasper for marketing. Japan is a global AI powerhouse — home to RIKEN's Center for Advanced Intelligence Project (AIP) in Tokyo, the University of Tokyo's Matsuo Lab, and Kyoto University's machine learning research groups. The country's Society 5.0 strategy and ¥1T+ AI investment make it one of the world's most dynamic AI markets." },
 { question: "How does Japanese privacy law (APPI) affect AI tool selection?", answer: "Japan's Act on the Protection of Personal Information (APPI) and its 2020 amendments impose strict requirements on how AI tools collect, process, and transfer personal data. The Personal Information Protection Commission (PPC) oversees enforcement with specific guidance for AI systems. Key considerations include cross-border data transfer restrictions (especially relevant for cloud AI tools), consent management for training data, and transparency requirements for automated decision-making. The proposed AI governance framework will add further obligations for high-risk AI systems." },
 { question: "What AI tools are best for Japan's key industries?", answer: "Japan's economy has distinct AI priorities: manufacturing robotics and industrial AI for automotive and electronics, NLP tools for Japanese language processing in finance and media, healthcare AI for Japan's ageing population, FinTech AI for payments and wealth management (PayPay, Rakuten), retail AI for convenience store and e-commerce optimisation, and construction AI for infrastructure management. Japanese companies also lead in semiconductor AI and materials informatics." },
 { question: "How can Japanese startups access AI funding and support?", answer: "Japan offers extensive AI innovation support. METI's AI Strategy 2025 provides ¥1T+ in compute infrastructure and talent development. JST CREST funds AI research projects. NEDO provides technology development grants for deep-tech AI. The J-Startup programme accelerates high-potential startups. The Startup Visa initiative makes it easier for international AI talent to launch in Japan. JSPS KAKENHI grants support academic AI research. METI's subsidies for SMEs adopting AI provide up to 50% cost coverage." },
 { question: "What AI regulations exist in Japan?", answer: "Japan's AI regulatory framework is evolving rapidly. The Social Principles of Human-Centric AI (2019) set foundational ethics. The AI Strategy 2025 establishes a comprehensive governance framework. APPI (2020 amendments) governs data used in AI training. Sector-specific regulations apply: MHLW for medical AI devices, FSA/BoJ for financial AI, METI for industrial AI, and MLIT for autonomous vehicles and drones." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-japan',
          countryName: 'Japan',
          countryCode: 'japan',
          capital: 'Japan',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-white via-red-600 to-white',
          heroTitle: 'Best AI Tools for Japan in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-white via-red-600 to-white bg-clip-text text-transparent">Japan</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Japan operates in english for business. We flag every tool for local language support — critical for serving customers across Japan\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Japan businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Japan teams.' },
          { icon: Star, title: 'English Support', description: 'Japan\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Japan market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Japan', item: '/ai-tools-japan' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Japan Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Japan&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-japan" />
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
