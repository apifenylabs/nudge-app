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
  title: 'Best AI Tools in Belgium (2026) — Curated for Belgian Teams & Startups',
  description: 'Discover the best AI tools for Belgian businesses and founders. Curated directory of 85+ tools ranked by trending score, Belgium-market readiness, and local relevance. Updated daily. Built for Brussels, Antwerp, Ghent, and Belgium',
  ogTitle: 'Best AI Tools in Belgium (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Belgium: imec ecosystem, multilingual (NL/FR/DE/EN) support, GDPR compliance, and EUR pricing. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsBelgiumPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Belgium', item: '/ai-tools-belgium' }]} />
      <GeoSeoSchema
        countryName="Belgium"
        countryCode="belgium"
        capital="Belgium"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Belgium"}
        slug="ai-tools-belgium"
        faqs={[
 { question: "What are the best AI tools in Belgium?", answer: "The best AI tools in Belgium include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Belgium is a European AI hub — home to imec in Leuven, the Ghent AI Lab (GAIL), and a growing startup ecosystem across Brussels, Antwerp, and Ghent. These tools are well-suited for Belgian businesses because they offer EUR pricing, multilingual (NL/FR/DE/EN) support, and strong GDPR-compliant data handling." },
 { question: "How does Belgian data protection law (GDPR) affect AI tool selection?", answer: "Belgium follows the EU GDPR, enforced by the Belgian Data Protection Authority (GBA/APD). As home to the EU institutions, Belgium has particularly high data compliance standards. The AI4Belgium Charter for Responsible AI Use sets additional ethical guidelines. We evaluate every tool for GDPR compliance, EU data residency, and alignment with GBA/APD guidance on AI and automated decision-making." },
 { question: "What AI tools are best for Belgium's key industries?", answer: "Belgium's economy has distinct AI priorities: logistics and port AI in Antwerp (Europe's second-largest port), deep tech and chip design AI with imec in Leuven, fintech AI in Brussels' financial district, health AI leveraging Belgium's world-class pharma sector (UCB, Janssen), and creative AI in Ghent's digital media ecosystem." },
 { question: "How can Belgian startups access AI funding and support?", answer: "Belgium offers extensive AI innovation support. VLAIO (Flanders) provides R&D grants. hub.brussels supports Brussels startups. DigitalWallonia4.ai drives AI adoption in Wallonia. The federal AI4Belgium programme coordinates national AI strategy. EU Horizon Europe programmes supplement funding. Belgium also benefits from generous R&D tax credits." },
 { question: "What AI regulations exist in Belgium?", answer: "Belgium's AI regulatory framework is shaped by the EU AI Act, with national coordination via the AI4Belgium programme. The Belgian Data Protection Authority (GBA/APD) enforces GDPR for AI training data. The AI4Belgium Charter sets voluntary standards for responsible AI use. Sector-specific regulations apply: FSMA for fintech AI, FAMHP for health AI, and the FPS Mobility for transport AI." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-belgium',
          countryName: 'Belgium',
          countryCode: 'belgium',
          capital: 'Belgium',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-black via-yellow-400 to-red-600',
          heroTitle: 'Best AI Tools for Belgium in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-black via-yellow-400 to-red-600 bg-clip-text text-transparent">Belgium</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Belgium operates in english for business. We flag every tool for local language support — critical for serving customers across Belgium\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Belgium businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Belgium teams.' },
          { icon: Star, title: 'English Support', description: 'Belgium\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Belgium market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Belgium', item: '/ai-tools-belgium' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Belgium Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Belgium&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-belgium" />
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
