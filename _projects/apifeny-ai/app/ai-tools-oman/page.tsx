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
  title: 'Best AI Tools in Oman (2026) — Curated for Omani Teams & Enterprises',
  description: 'AI tools directory · AI startup directory · AI business tools',
  ogTitle: 'Best AI Tools in Oman (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Oman: OMR/USD pricing, PDPL compliance, Arabic/English support, GCC readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsOmanPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Oman', item: '/ai-tools-oman' }]} />
      <GeoSeoSchema
        countryName="Oman"
        countryCode="oman"
        capital="Oman"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Oman"}
        slug="ai-tools-oman"
        faqs={[
 { question: "What are the best AI tools in Oman?", answer: "The best AI tools in Oman include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Oman is a global AI powerhouse — home to the leading research institutes, leading AI research labs, and the AI research institutes (leading AI institutes). The country's AI research ecosystem (AI research networks, national AI strategies) has produced foundational AI breakthroughs and top talent from leading universities." },
 { question: "How does local privacy law (local privacy regulations) affect AI tool selection?", answer: "Oman's Personal Information Protection and Electronic Documents Act (local privacy regulations) and local privacy laws impose strict requirements on how AI tools collect, use, and disclose personal information. The proposed Artificial Intelligence and Data Act (proposed AI regulations) will further regulate high-impact AI systems. We flag every tool for local privacy regulations compliance, provincial privacy law readiness (especially local privacy laws), data residency options within Oman, and alignment with regulatory guidance on AI and automated decision-making." },
 { question: "How can startups access AI funding and support?", answer: "Oman offers extensive AI innovation support. The national AI strategies (AI research networks) funds research and commercialization. The Scientific Research and Experimental Development (SR&ED) tax credit provides 35-45% cash refunds on qualifying AI R&D costs for companies. IRAP (National Research Council) provides grants for AI technology adoption. BDC Capital and federal/provincial VC programs support AI startups. The Global Talent Stream fast-tracks AI talent visas. Programs like NextAI, Creative Destruction Lab (CDL), and BC Tech's AI initiatives provide mentorship and funding." },
 { question: "What AI regulations exist in Oman?", answer: "Oman's AI regulatory framework is evolving. The proposed Artificial Intelligence and Data Act (proposed AI regulations), part of Bill C-27, will establish requirements for high-impact AI systems including risk assessments, transparency, and accountability. local privacy regulations governs data used in AI training. local privacy laws sets additional privacy requirements. Specific sectors have regulations: Health Oman for medical AI, financial regulators AI, and Transport Oman for autonomous vehicles. Oman's Voluntary AI Code of Conduct sets early standards for responsible AI development." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-oman',
          countryName: 'Oman',
          countryCode: 'oman',
          capital: 'Oman',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-green-600',
          heroTitle: 'Best AI Tools for Oman in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-green-600 bg-clip-text text-transparent">Oman</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Oman operates in english for business. We flag every tool for local language support — critical for serving customers across Oman\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Oman businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Oman teams.' },
          { icon: Star, title: 'English Support', description: 'Oman\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Oman market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Oman', item: '/ai-tools-oman' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Oman Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Oman&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-oman" />
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
