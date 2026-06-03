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
  title: 'Best AI Tools in Germany (2026) — Kuratiert für deutsche Unternehmen & Startups',
  description: 'Discover the best AI tools for German businesses and founders. Curated directory of 85+ tools ranked by trending score, Germany-market readiness, and local relevance. Updated daily. Built for Berlin, Munich, and the Industrie 4.0 ecosystem.',
  ogTitle: 'Best AI Tools in Germany (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Germany: DSGVO compliance, EUR pricing, KI Bundesverband alignment, and manufacturing/AI integration. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsGermanyPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Germany', item: '/ai-tools-germany' }]} />
      <GeoSeoSchema
        countryName="Germany"
        countryCode="germany"
        capital="Germany"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Germany"}
        slug="ai-tools-germany"
        faqs={[
 { question: "What are the best AI tools in Germany?", answer: "The best AI tools in Germany include ChatGPT for content and productivity, GitHub Copilot for development, Claude for analysis, DeepL for German-English translation, and Salesforce Einstein for enterprise CRM AI. Germany is Europe's AI manufacturing powerhouse, home to world-class AI research at DFKI, Max Planck Institute, TU Munich, and TU Berlin. The KI Bundesverband and Germany's National AI Strategy drive coordinated AI adoption across automotive, manufacturing, healthcare, and fintech sectors." },
 { question: "How does DSGVO (GDPR) affect AI tool selection in Germany?", answer: "The DSGVO (Datenschutz-Grundverordnung) plus the Bundesdatenschutzgesetz (BDSG) creates one of the world's strictest data protection regimes. German businesses must ensure AI tools comply with requirements for data minimization, purpose limitation, automated decision-making transparency (Art. 22), and data processing records. The upcoming EU AI Act adds additional obligations for high-risk AI systems. We flag every tool for DSGVO compliance, data residency in Germany/EU, and alignment with the independent German data protection authorities (Aufsichtsbehörden)." },
 { question: "What AI tools are best for Germany's key industries?", answer: "Germany's economy-centred AI needs include: manufacturing and Industrie 4.0 AI (predictive maintenance, quality control, digital twins for automotive and machinery), automotive AI (autonomous driving, ADAS, supply chain optimisation for VW, BMW, Mercedes, Bosch), healthcare AI (diagnostics, drug discovery through Germany's world-class healthcare system), fintech AI for Berlin's thriving fintech scene (N26, Trade Republic, solarisBank), and energy AI for the Energiewende (grid management, renewables optimisation)." },
 { question: "How can German startups access AI funding and support?", answer: "Germany offers extensive AI innovation funding. The federal KI-Strategie has allocated over €5B for AI research and adoption. The EXIST program and ERP Start-up Capital provide early-stage grants. The Bundeswirtschaftsministerium (BMWK) funds AI innovation via the Mittelstand-Digital and go-digital programs. High-Tech Gründerfonds (HTGF), Earlybird, and Berlin-based VCs actively invest in German AI startups. The KI Bundesverband, CyberForum, and regional AI hubs (Berlin, Munich, Hamburg) provide ecosystem access. Germany's R&D tax credit (Forschungszulage) refunds up to 35% of qualifying AI R&D costs." },
 { question: "What AI regulations exist in Germany?", answer: "Germany's AI regulatory framework combines European and national layers. The EU AI Act (effective 2025-2027) classifies AI systems by risk level, with strict requirements for high-risk systems. The DSGVO/BDSG governs all AI data processing. The Bundesamt für Sicherheit in der Informationstechnik (BSI) sets AI security standards. The EU Data Act regulates data sharing for AI training. Germany's KI-Beirat (AI Advisory Board) and national AI observatory monitor AI developments. The EU product liability directive update covers AI systems in manufacturing and automotive — critical for Germany's Industrie 4.0 sector." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-germany',
          countryName: 'Germany',
          countryCode: 'germany',
          capital: 'Germany',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-black via-red-600 to-yellow-400',
          heroTitle: 'Best AI Tools for Germany in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-black via-red-600 to-yellow-400 bg-clip-text text-transparent">Germany</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Germany operates in english for business. We flag every tool for local language support — critical for serving customers across Germany\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Germany businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Germany teams.' },
          { icon: Star, title: 'English Support', description: 'Germany\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Germany market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Germany', item: '/ai-tools-germany' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Germany Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Germany&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-germany" />
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
