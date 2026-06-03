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
  title: 'Best AI Tools in Brazil (2026) — Curated for Brazilian Startups & Teams',
  description: 'Discover the best AI tools for Brazilian businesses and founders. Curated directory of 85+ tools ranked by trending score, Latin American readiness, and local relevance. Updated daily. Supports Portuguese, English, and Spanish.',
  ogTitle: 'Best AI Tools in Brazil (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Brazil: local BRL pricing, LGPD compliance, Portuguese multilingual support, and LatAm market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsBrazilPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Brazil', item: '/ai-tools-brazil' }]} />
      <GeoSeoSchema
        countryName="Brazil"
        countryCode="brazil"
        capital="Brazil"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Brazil"}
        slug="ai-tools-brazil"
        faqs={[
 { question: "Quais são as melhores ferramentas de IA no Brasil em 2026?", answer: "As melhores ferramentas de IA no Brasil incluem o ChatGPT para criação de conteúdo e produtividade, o GitHub Copilot para desenvolvimento de software, o Canva AI para design, e as ferramentas Google AI para automação empresarial. O Brasil possui um ecossistema de IA vibrante, com hubs em São Paulo, Campinas, Rio de Janeiro e Belo Horizonte, além da FAPESP (Fundação de Amparo à Pesquisa do Estado de São Paulo) e do C4AI (Centro de Inteligência Artificial) na USP." },
 { question: "As ferramentas de IA são adaptadas ao mercado brasileiro?", answer: "Sim, o Brasil possui uma infraestrutura digital robusta com 4G/5G cobrindo mais de 90% da população, adoção massiva de cloud computing (AWS São Paulo, Azure Brazil, Google Cloud), e um ecossistema fintech de classe mundial (Nubank, PicPay, Mercado Pago). A Lei Geral de Proteção de Dados (LGPD) regula dados pessoais, e a Estratégia Brasileira de Inteligência Artificial (EBIA) do governo federal impulsiona a adoção de IA em setores estratégicos como finanças, agronegócio e saúde." },
 { question: "Quais ferramentas de IA são melhores para os setores-chave do Brasil?", answer: "Os setores brasileiros que mais se beneficiam da IA incluem: fintech (Nubank, PicPay, Banco Inter usam IA para crédito, detecção de fraudes e atendimento), agronegócio (Embrapa, Climate FieldView, IBM Watson para previsão de safras), saúde (Hospital Sírio-Libanês, Einstein usam IA para diagnósticos), e-commerce (Mercado Libre, Magazine Luiza com IA para recomendações), e educação (Descomplica, Alura com plataformas adaptativas)." },
 { question: "Como startups brasileiras podem adotar IA de forma econômica?", answer: "Startups brasileiras podem acessar programas da FAPESP (PIPE Pesquisa Inovativa), Finep Inovação, e editais do CNPq e CAPES. O ecossistema de Venture Capital brasileiro levantou mais de $5B nos últimos anos, com fundos como Kaszek, Monashees e Canary focados em IA. Ferramentas de IA oferecem tiers gratuitos (ChatGPT Free, Google Colab, GitHub Copilot Education) ideais para MVPs." },
 { question: "Quais são as regulamentações de IA no Brasil?", answer: "O Brasil está desenvolvendo seu marco regulatório de IA com o Projeto de Lei nº 2.338/2023 (PL da IA), que estabelece transparência e supervisão humana. A LGPD é o principal regulamento para dados, fiscalizada pela ANPD. A Estratégia Brasileira de IA (EBIA) define as diretrizes nacionais, enquanto o Banco Central regula IA em fintechs." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-brazil',
          countryName: 'Brazil',
          countryCode: 'brazil',
          capital: 'Brazil',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-green-600 via-yellow-400 to-blue-600',
          heroTitle: 'Best AI Tools for Brazil in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-green-600 via-yellow-400 to-blue-600 bg-clip-text text-transparent">Brazil</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Brazil operates in english for business. We flag every tool for local language support — critical for serving customers across Brazil\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Brazil businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Brazil teams.' },
          { icon: Star, title: 'English Support', description: 'Brazil\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Brazil market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Brazil', item: '/ai-tools-brazil' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Brazil Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Brazil&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-brazil" />
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
