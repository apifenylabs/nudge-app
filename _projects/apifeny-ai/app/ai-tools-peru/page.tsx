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
  title: 'Best AI Tools in Peru (2026) — Curated for Peruvian Startups & Developers',
  description: 'Discover the best AI tools for Peruvian businesses and developers. Curated directory of 85+ tools ranked by trending score, Peru-market readiness, and local relevance. Updated daily. Built for Lima',
  ogTitle: 'Best AI Tools in Peru (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Peru: Spanish-first, PEN/pricing, bilingual support, and LATAM data protection compliance. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsPeruPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Peru', item: '/ai-tools-peru' }]} />
      <GeoSeoSchema
        countryName="Peru"
        countryCode="peru"
        capital="Peru"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Peru"}
        slug="ai-tools-peru"
        faqs={[
 { question: "What are the best AI tools for Peruvian startups in 2026?", answer: "Top AI tools for Peruvian startups include ChatGPT for bilingual ES/EN workflows, Jasper for Spanish content marketing, GitHub Copilot for development, and Notion AI for project management. For LATAM expansion, HubSpot AI, Salesforce Einstein, and TensorFlow-based custom models are widely adopted." },
 { question: "How can Peruvian developers access paid AI tools with PEN pricing?", answer: "Most major AI platforms accept PEN credit cards through local issuing banks (BCP, Interbank, BBVA). Some tools offer LATAM-specific pricing tiers. Open-source alternatives are popular in universities, and free tiers from Google AI, Microsoft AI, and OpenAI provide robust entry points." },
 { question: "Do AI tools support Peruvian Spanish (with local dialects)?", answer: "Major AI platforms including ChatGPT, Claude, and Google AI support Peruvian Spanish variants. Natural language tools have improved significantly for LATAM dialects. For speech recognition, Peruvian-accented training data is increasingly available through regional AI research initiatives." },
 { question: "What AI tools are best for Peru's mining and agritech sectors?", answer: "For mining: computer vision platforms (DroneDeploy, Pix4D), predictive maintenance AI (Uptake, C3 AI), and geological ML tools. For agritech: satellite imagery AI (Cropio, Descartes Labs), soil analysis ML, and climate prediction models. Several local startups offer customized solutions." },
 { question: "Are there free AI learning resources for Peruvian students?", answer: "Yes — Microsoft Learn AI, Google AI Education, and AWS Educate offer free tiers. UTEC and PUCP provide subsidized AI certificates. The 'Peru AI' community on Discord/WhatsApp offers mentorship. Google's 'Crece con Google' program includes free AI workshops in Spanish." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-peru',
          countryName: 'Peru',
          countryCode: 'peru',
          capital: 'Peru',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for Peru in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">Peru</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Peru operates in english for business. We flag every tool for local language support — critical for serving customers across Peru\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Peru businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Peru teams.' },
          { icon: Star, title: 'English Support', description: 'Peru\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Peru market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Peru', item: '/ai-tools-peru' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Peru Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Peru&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-peru" />
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
