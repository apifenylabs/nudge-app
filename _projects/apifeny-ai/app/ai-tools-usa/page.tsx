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
  title: 'Best AI Tools in the USA (2026) — Curated for American Teams & Startups',
  description: 'Discover the best AI tools for American businesses and founders. Curated directory of 85+ tools ranked by trending score, US-market readiness, and local relevance. Updated daily. Optimized for Silicon Valley, NYC, Austin, and remote-first teams.',
  ogTitle: 'Best AI Tools in the USA (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for America: GAFAM-native integrations, USD pricing, US data compliance (CCPA/FedRAMP), and startup ecosystem fit. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsUsaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools USA', item: '/ai-tools-usa' }]} />
      <GeoSeoSchema
        countryName="USA"
        countryCode="usa"
        capital="USA"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in USA"}
        slug="ai-tools-usa"
        faqs={[
 { question: "What are the best AI tools in the USA?", answer: "The best AI tools in the USA include ChatGPT for content and productivity, GitHub Copilot for software development, Claude for reasoning tasks, Midjourney for creative design, and Perplexity for research. America's position as the global AI leader — home to GAFAM (Google, Apple, Facebook/Meta, Amazon, Microsoft) — means the most advanced tools launch in the US market first, with mature API ecosystems, extensive third-party integrations, and enterprise-grade infrastructure." },
 { question: "How should American businesses choose AI tools for compliance?", answer: "US businesses must navigate a complex regulatory landscape: CCPA/CPRA for California consumer data privacy, FedRAMP for federal contractors, HIPAA for healthcare AI, FINRA/SEC guidelines for fintech, and emerging state-level AI disclosure laws. We flag every tool for SOC 2 compliance, GDPR readiness, data residency options, and specific US regulatory certifications — critical for enterprises in San Francisco, New York, and across the Fortune 500 ecosystem." },
 { question: "What AI tools are best for America's key industries?", answer: "America's tech-driven economy demands AI across every sector: Silicon Valley's SaaS and cloud-native startups (AI agents, vector databases, LLM ops), NYC's fintech and media (algorithmic trading, content personalization), healthcare AI in Boston and Nashville (medical imaging, drug discovery), defense and aerospace AI in D.C. and Seattle, manufacturing AI in the Midwest (predictive maintenance, supply chain), and streaming/AI entertainment in LA." },
 { question: "How can US startups get funded for AI development?", answer: "The US has the world's most mature AI fundraising ecosystem. Top VCs (Sequoia, a16z, Accel, Benchmark, Greylock) actively invest in seed-to-Series B AI startups. SBIR/STTR grants fund government AI R&D. Major tech accelerators (Y Combinator, Techstars, 500 Global) have dedicated AI tracks. Enterprise AI partnerships with Azure, AWS, GCP innovation labs provide credits and co-marketing. AI startups should target the explosive demand in vertical AI agents, LLM infrastructure, and enterprise automation." },
 { question: "What's the US regulatory outlook for AI tools in 2026?", answer: "The US AI regulatory landscape is evolving rapidly in 2026. The Biden Administration's Executive Order on AI (2023) established voluntary commitments from leading AI developers. The current Congress is debating the CREATE AI Act, the Algorithmic Accountability Act, and federal privacy legislation. State-level activity is intense — California's AI Safety Bill, Colorado's AI consumer protections, and New York's AI hiring law. Tools used in regulated industries must demonstrate transparency, bias testing, and human-in-the-loop safeguards." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-usa',
          countryName: 'USA',
          countryCode: 'usa',
          capital: 'USA',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for USA in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-600 via-white to-red-600 bg-clip-text text-transparent">USA</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'USA operates in english for business. We flag every tool for local language support — critical for serving customers across USA\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'USA businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for USA teams.' },
          { icon: Star, title: 'English Support', description: 'USA\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for USA market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools USA', item: '/ai-tools-usa' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for USA Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for USA&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-usa" />
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
