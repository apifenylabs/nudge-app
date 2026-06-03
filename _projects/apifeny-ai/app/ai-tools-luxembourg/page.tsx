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
  title: 'Best AI Tools in Luxembourg (2026) — Curated for Luxembourgish Teams & Startups',
  description: 'Discover the best AI tools for Luxembourgish businesses and founders. Find GDPR-compliant, EUR-priced AI tools for Luxembourg City startups, the finance sector, and space-tech ecosystem.',
  ogTitle: 'Best AI Tools in Luxembourg (2026) — Apifeny AI',
  ogDescription: 'Find AI tools purpose-built for Luxembourg: EU GDPR compliance, EUR pricing, and multilingual (Luxembourgish / French / German / English) support. Curated for the finance hub and EU institution capital.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsLuxembourgPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Luxembourg', item: '/ai-tools-luxembourg' }]} />
      <GeoSeoSchema
        countryName="Luxembourg"
        countryCode="luxembourg"
        capital="Luxembourg"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Luxembourg"}
        slug="ai-tools-luxembourg"
        faqs={[
 { question: "What are the best AI tools in Luxembourg?", answer: "The best AI tools in Luxembourg include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Luxembourg is an EU powerhouse in finance, fintech, and space technology — home to the European Court of Justice, European Investment Bank, SES satellite communications, and a thriving fund management industry. The country's AI ecosystem is driven by the Luxembourg AI Strategy (AI4LU), Luxinnovation, Interdisciplinary Centre for Security, Reliability and Trust (SnT) at Uni.lu, and the Luxembourg National Data Service (LNDS)." },
 { question: "How does GDPR affect Luxembourgish AI tool selection?", answer: "Luxembourg is an EU member state, so the General Data Protection Regulation (GDPR) applies in full with oversight from the Commission Nationale pour la Protection des Données (CNPD). The CNPD enforces strict standards on how AI tools collect, process, and store personal data. Luxembourg-based businesses — especially in finance and EU institutions — must ensure AI tools meet GDPR requirements including data residency within the EEA, DPA compliance documentation, data processing agreements (DPAs), and rights to explanation for automated decisions. The proposed EU AI Act adds additional obligations for high-risk AI systems, with CNPD expected to play a key enforcement role." },
 { question: "What AI tools are best for Luxembourg's finance sector?", answer: "Luxembourg holds the world's second-largest investment fund centre after the US, manages over €5 trillion in fund assets, and hosts the European Investment Bank (EIB). AI tools for this sector require: regulatory compliance with CSSF (Commission de Surveillance du Secteur Financier) guidelines, secure data handling for fund management and wealth advisory, automated AML/KYC screening, portfolio risk analysis with model explainability, multilingual reporting in English, French, and German, and integration with Bloomberg, Refinitiv, and other financial data platforms. Document intelligence tools for fund prospectuses and regulatory filings are especially in demand in Luxembourg's asset management ecosystem." },
 { question: "How can Luxembourgish startups access AI funding?", answer: "Luxembourg offers extensive AI innovation support. The Luxembourg AI Strategy (AI4LU) coordinates national AI policy and funding. Luxinnovation provides guidance and matchmaking for AI projects. The Fit4Start programme offers up to €150K for early-stage AI startups. The Luxembourg National Research Fund (FNR) funds AI research through CORE and BRIDGES programmes. Horizon Europe, the EU's €95.5B research framework, funds Luxembourg-based AI consortia. The European Space Agency (ESA) Business Incubation Centre (BIC) Luxembourg supports space-adjacent AI startups. The Ministry of the Economy offers digital transformation vouchers for AI adoption by SMEs. The Luxembourg House of Financial Technology (LHoFT) supports fintech AI startups." },
 { question: "What AI regulations exist in Luxembourg?", answer: "Luxembourg's AI regulatory framework is multi-layered. The EU AI Act, passed in 2024, establishes risk-based requirements for AI systems including transparency, human oversight, and conformity assessments for high-risk applications. GDPR, enforced locally by the CNPD, governs all personal data used in AI training and inference. The CSSF regulates AI in financial services including automated advising, credit scoring, and anti-money laundering. The EU Digital Operational Resilience Act (DORA) imposes ICT risk management requirements on financial entities using AI. The EU Data Act and Data Governance Act affect how AI tools access and process data. National AI legislation is being developed under the AI4LU strategy, with potential new laws on AI accountability in the finance sector." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-luxembourg',
          countryName: 'Luxembourg',
          countryCode: 'luxembourg',
          capital: 'Luxembourg',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-blue-500',
          heroTitle: 'Best AI Tools for Luxembourg in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-blue-500 bg-clip-text text-transparent">Luxembourg</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Luxembourg operates in english for business. We flag every tool for local language support — critical for serving customers across Luxembourg\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Luxembourg businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Luxembourg teams.' },
          { icon: Star, title: 'English Support', description: 'Luxembourg\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Luxembourg market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Luxembourg', item: '/ai-tools-luxembourg' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Luxembourg Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Luxembourg&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-luxembourg" />
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
