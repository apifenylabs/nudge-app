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
  title: 'Best AI Tools in Canada (2026) — Curated for Canadian Teams & Startups',
  description: 'Discover the best AI tools for Canadian businesses and founders. Curated directory of 85+ tools ranked by trending score, Canada-market readiness, and local relevance. Updated daily. Built for Toronto, Montreal, Vancouver, and Canada.',
  ogTitle: 'Best AI Tools in Canada (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Canada: CIFAR-aligned research, Vector Institute ecosystem, CAD pricing, bilingual (EN/FR) support, and Canadian data compliance. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsCanadaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Canada', item: '/ai-tools-canada' }]} />
      <GeoSeoSchema
        countryName="Canada"
        countryCode="canada"
        capital="Canada"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Canada"}
        slug="ai-tools-canada"
        faqs={[
 { question: "What are the best AI tools in Canada?", answer: "The best AI tools in Canada include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Canada is a global AI powerhouse — home to the Vector Institute in Toronto, Mila in Montreal, and the Alberta Machine Intelligence Institute (Amii). The country's AI research ecosystem (CIFAR, Pan-Canadian AI Strategy) has produced foundational AI breakthroughs and top talent from U of T, McGill, UBC, and Waterloo." },
 { question: "How does Canadian privacy law (PIPEDA) affect AI tool selection?", answer: "Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and Quebec's Law 25 impose strict requirements on how AI tools collect, use, and disclose personal information. The proposed Artificial Intelligence and Data Act (AIDA) will further regulate high-impact AI systems. We flag every tool for PIPEDA compliance, provincial privacy law readiness (especially Quebec's Law 25), data residency options within Canada, and alignment with OPC guidance on AI and automated decision-making." },
 { question: "What AI tools are best for Canada's key industries?", answer: "Canada's economy has distinct AI priorities: AI research and deep learning tools for Toronto's Vector Institute and Montreal's Mila ecosystem, fintech AI in Vancouver and Toronto (wealth management, payments), cleantech and energy AI in Alberta and BC, healthcare AI for Canada's public health system, natural language tools for French and English bilingual requirements, and autonomous vehicle AI in Waterloo and Toronto. Canadian businesses also lead in AI for mining, forestry, and agricultural technology." },
 { question: "How can Canadian startups access AI funding and support?", answer: "Canada offers extensive AI innovation support. The Pan-Canadian AI Strategy (CIFAR) funds research and commercialization. The Scientific Research and Experimental Development (SR&ED) tax credit provides 35-45% cash refunds on qualifying AI R&D costs for Canadian companies. IRAP (National Research Council) provides grants for AI technology adoption. BDC Capital and federal/provincial VC programs support AI startups. The Global Talent Stream fast-tracks AI talent visas. Programs like NextAI, Creative Destruction Lab (CDL), and BC Tech's AI initiatives provide mentorship and funding." },
 { question: "What AI regulations exist in Canada?", answer: "Canada's AI regulatory framework is evolving. The proposed Artificial Intelligence and Data Act (AIDA), part of Bill C-27, will establish requirements for high-impact AI systems including risk assessments, transparency, and accountability. PIPEDA governs data used in AI training. Quebec's Law 25 sets additional privacy requirements. Specific sectors have regulations: Health Canada for medical AI, OSFI for financial AI, and Transport Canada for autonomous vehicles. Canada's Voluntary AI Code of Conduct sets early standards for responsible AI development." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-canada',
          countryName: 'Canada',
          countryCode: 'canada',
          capital: 'Canada',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for Canada in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">Canada</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Canada operates in english for business. We flag every tool for local language support — critical for serving customers across Canada\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Canada businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Canada teams.' },
          { icon: Star, title: 'English Support', description: 'Canada\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Canada market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Canada', item: '/ai-tools-canada' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Canada Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Canada&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-canada" />
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
