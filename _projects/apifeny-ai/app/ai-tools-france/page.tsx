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
  title: 'Best AI Tools in France (2026) — Curated for French Startups & Teams',
  description: 'France operates in French and English across business, government, and daily life. We flag every tool for local language support so you never discover language gaps mid-workflow — critical for serving a market of 68M+ that values its linguistic heritage.',
  ogTitle: 'Best AI Tools in France (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for France. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsFrancePage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools France', item: '/ai-tools-france' }]} />
      <GeoSeoSchema
        countryName="France"
        countryCode="france"
        capital="France"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in France"}
        slug="ai-tools-france"
        faqs={[
 { question: "Quels sont les meilleurs outils IA en France en 2026 ?", answer: "Les meilleurs outils IA en France incluent ChatGPT pour la création de contenu et la productivité, GitHub Copilot pour le développement logiciel, Canva AI pour le design, et les outils Google AI pour l'automatisation. L'écosystème IA français est porté par des champions nationaux comme Mistral AI, des hubs d'innovation comme Station F, et des initiatives gouvernementales comme le programme 'IA pour la France'. Des centaines de startups IA émergent à Paris, Lyon, Marseille, Nice, Toulouse, et Bordeaux." },
 { question: "Les outils IA sont-ils adaptés au marché français ?", answer: "Oui, les entreprises françaises bénéficient d'une infrastructure numérique de premier plan avec le cloud souverain (Orange Cloud, OVHcloud), une couverture 5G étendue, et un cadre réglementaire européen solide. Le RGPD garantit la protection des données personnelles, et la loi française 'République Numérique' encadre les usages de l'IA. Les entreprises peuvent compter sur des infrastructures cloud régionales européennes (AWS Paris, Azure France, OVHcloud) pour la souveraineté des données." },
 { question: "Quels outils IA sont les meilleurs pour les secteurs clés de l'économie française ?", answer: "Les secteurs français bénéficiant de l'IA incluent : le luxe et la mode (LVMH, Chanel utilisent l'IA pour la personnalisation et la supply chain), la santé et les biotechs (Sanofi, Servier avec l'IA pour la découverte de médicaments), la finance et l'assurance (BNP Paribas, AXA adoptent l'IA pour la détection de fraude), l'aérospatiale (Airbus, Dassault avec l'IA pour la maintenance prédictive), l'agriculture (IA pour l'agriculture de précision), et le retail alimentaire (Carrefour, Auchan avec l'IA pour la gestion des stocks)." },
 { question: "Comment les startups françaises peuvent-elles adopter l'IA de manière économique ?", answer: "Les startups françaises peuvent bénéficier de nombreux dispositifs : le crédit d'impôt recherche (CIR) pour les projets d'IA, Bpifrance avec ses prêts innovation et subventions DeepTech, le programme French Tech 2030 pour les startups IA à impact, et les aides de l'ANR (Agence Nationale de la Recherche). Les incubateurs comme Station F, Agoranov, et le Hub Innov'Up offrent des ressources. Les outils IA proposent des versions gratuites (ChatGPT Free, Google Colab, GitHub Copilot pour étudiants via GitHub Education) idéales pour les MVP." },
 { question: "Quelles sont les spécificités réglementaires de l'IA en France ?", answer: "La France est un moteur de la régulation IA en Europe. Le RGPD de l'UE s'applique pleinement, renforcé par l'AI Act européen (premier cadre légal global sur l'IA au monde). En France, la CNIL (Commission Nationale de l'Informatique et des Libertés) est le régulateur clé. La loi 'Pour une République Numérique' et la Stratégie Nationale pour l'Intelligence Artificielle (SNIA) fixent les orientations. L'ARCEP régule les aspects télécoms. Les outils IA doivent garantir la transparence algorithmique, la non-discrimination, et le respect du droit d'auteur français." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-france',
          countryName: 'France',
          countryCode: 'france',
          capital: 'France',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for France in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-600 via-white to-red-600 bg-clip-text text-transparent">France</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'France operates in english for business. We flag every tool for local language support — critical for serving customers across France\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'France businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for France teams.' },
          { icon: Star, title: 'English Support', description: 'France\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for France market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools France', item: '/ai-tools-france' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for France Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for France&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-france" />
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
