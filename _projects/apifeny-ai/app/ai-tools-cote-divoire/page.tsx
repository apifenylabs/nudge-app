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
  title: 'Best AI Tools in Côte d\'Ivoire (2026) — 85+ Tools for Ivorian Startups & Enterprises',
  description: 'Discover the best AI tools for Côte d\'Ivoire. 85+ ranked tools with XOF pricing, local compliance, and ecosystem support. Updated daily for Ivorian solopreneurs, SMEs, and enterprises in Abidjan and beyond.',
  ogTitle: 'Best AI Tools in Côte d\'Ivoire (2026) — Apifeny AI',
  ogDescription: '85+ AI tools ranked for the Ivorian market. 🇨🇮 XOF pricing, data-compliant, French language support — West Africa\'s fastest growing economy.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsCoteDivoirePage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Côte d\'Ivoire', item: '/ai-tools-cote-divoire' }]} />
      <GeoSeoSchema
        countryName="Côte d'Ivoire"
        countryCode="cote-divoire"
        capital="Yamoussoukro"
        currency="XOF"
        language="English"
        languageCode="en"
        marketSize={"the fastest growing economy in West Africa, with Abidjan as a major regional tech and innovation hub"}
        slug="ai-tools-cote-divoire"
        faqs={[
 { question: "What are the best AI tools for Côte d'Ivoire in 2026?", answer: "The best AI tools for Côte d'Ivoire include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Jasper for marketing. Côte d'Ivoire is the fastest growing economy in West Africa, with Abidjan emerging as a major tech and innovation hub hosting incubators, co-working spaces, and a thriving fintech ecosystem." },
 { question: "Are AI tools accessible for Ivorian businesses?", answer: "Yes. Mobile money (Orange Money, MTN Mobile Money, Wave) is ubiquitous. The government's digital transformation strategy, Côte d'Ivoire's Plan National de Développement (PND), prioritises technology infrastructure. Abidjan's tech scene is one of Africa's most dynamic, with strong French-speaking developer communities." },
 { question: "What AI tools are best for Côte d'Ivoire's key industries?", answer: "Agriculture (cocoa, cashew, coffee — 22% of GDP) uses AI for yield prediction, quality control, and supply chain management. Fintech is booming with mobile banking and digital lending platforms. The telecom sector (Orange, MTN) drives digital payment adoption across the country." },
 { question: "What data regulations apply in Côte d'Ivoire?", answer: "Côte d'Ivoire's Data Protection Law (Law No. 2013-450) governs personal data. The Commission Nationale de l'Informatique et des Libertés (CNIL-CI) enforces compliance. The UEMOA (West African Monetary Union) regional framework also influences digital regulation." },
 { question: "Is French language supported by AI tools?", answer: "Yes, strongly. French is well supported by most global AI tools — ChatGPT, Google Translate, Microsoft Copilot, and Claude all have excellent French capabilities. Local tech communities in Abidjan actively develop French-language AI applications and content." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-cote-divoire',
          countryName: 'Côte d\'Ivoire',
          countryCode: 'cote-divoire',
          capital: 'Yamoussoukro',
          currency: 'XOF',
          languages: 'English',
          heroGradient: 'from-orange-500 via-white to-green-600',
          heroTitle: 'Best AI Tools for Côte d\'Ivoire in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent">Côte d&apos;Ivoire</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Côte d\'Ivoire operates in english and french for business. We flag every tool for local language support — critical for serving customers across Côte d\'Ivoire\'s diverse regions.' },
          { icon: ShieldCheck, title: 'XOF Pricing & Local Compliance', description: 'Ivorian businesses need tools that work in XOF, offer local payment methods like Orange Money and Wave, and comply with local data protection regulations. We rank every tool on real-world usability for Ivorian teams.' },
          { icon: Star, title: 'English Support', description: 'Côte d\'Ivoire\'s rapidly growing economy demands tools with english and french support, local customer service, and integration with locally-used platforms. We evaluate every tool for Côte d\'Ivoire market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Côte d\'Ivoire', item: '/ai-tools-cote-divoire' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Côte d&apos;Ivoire Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Côte d&apos;Ivoire&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-cote-divoire" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Côte d'Ivoire"
        countrySlug="cote-divoire"
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
