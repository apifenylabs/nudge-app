import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  MapPin,
  Users,
  DollarSign,
  Wifi,
  Shield,
  Zap,
  Star,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Lightbulb,
  HelpCircle,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';
import { countryComparisons, getCountryBySlug } from '@/lib/country-comparisons';
import { toolsData } from '@/lib/data';

const BASE_URL = 'https://apifeny-ai.vercel.app';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return countryComparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: 'Country Not Found' };

  return {
    title: `Best AI Tools in ${country.country} (2026) — Pricing, Ecosystem & Top Picks | Apifeny AI`,
    description: `AI tools available in ${country.country}: ${country.topAITools.slice(0, 5).join(', ')}. ${country.country}'s AI readiness score: ${country.overallScore}/10. Compare pricing, local alternatives, and startup ecosystem.`,
    keywords: [
      `AI tools ${country.country}`,
      `best AI tools in ${country.country}`,
      `${country.country} AI ecosystem`,
      `${country.country} AI startups`,
      `${country.country} AI pricing`,
      `AI tools ${country.currencyCode}`,
      `artificial intelligence ${country.country}`,
      `${country.country} tech ecosystem`,
    ],
    alternates: { canonical: `${BASE_URL}/compare-countries/${country.slug}` },
    openGraph: {
      title: `Best AI Tools in ${country.country} (2026) — Pricing, Ecosystem & Top Picks`,
      description: `${country.country}'s AI readiness score: ${country.overallScore}/10. Top tools: ${country.topAITools.slice(0, 3).join(', ')}. Pricing, local AI scene, and startup ecosystem analysis.`,
      url: `${BASE_URL}/compare-countries/${country.slug}`,
      siteName: 'Apifeny AI',
      type: 'article',
      images: [{ url: `${BASE_URL}/og-country-${country.slug}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Best AI Tools in ${country.country} (2026)`,
      description: `AI readiness: ${country.overallScore}/10. Top tools: ${country.topAITools.slice(0, 3).join(', ')}.`,
    },
    robots: { index: true, follow: true },
  };
}

const toolSlugMap = new Map<string, string>(
  toolsData.filter((t) => t.is_published).map((t) => [t.name.toLowerCase(), t.slug])
);

function getToolLink(toolName: string): { name: string; slug: string } | null {
  const lower = toolName.toLowerCase();
  if (toolSlugMap.has(lower)) return { name: toolName, slug: toolSlugMap.get(lower)! };
  // Try partial match
  const match = toolsData.find((t) => lower.includes(t.slug) || t.name.toLowerCase().includes(lower));
  if (match) return { name: match.name, slug: match.slug };
  return null;
}

function ProsCons({ items, variant }: { items: string[]; variant: 'pro' | 'con' }) {
  const color = variant === 'pro'
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : 'text-amber-700 bg-amber-50 border-amber-200';
  const Icon = variant === 'pro' ? CheckCircle2 : AlertTriangle;

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-2 text-sm p-2 rounded-lg border ${color}`}>
          <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CountryDetailPage({ params }: Props) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const otherCountries = countryComparisons
    .filter((c) => c.slug !== slug)
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 4);

  // Find tools in our dataset that match the country's top tools
  const matchedTools = country.topAITools
    .map((name) => getToolLink(name))
    .filter(Boolean) as { name: string; slug: string }[];

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools by Country', item: '/compare-countries' },
          { name: country.country, item: `/compare-countries/${country.slug}` },
        ]}
      />

      <GeoSeoSchema
        countryName={country.country}
        countryCode={country.slug}
        capital={country.capital}
        currency={country.currencyCode}
        language={country.language}
        languageCode="en"
        slug={`compare-countries/${country.slug}`}
        marketSize={`${country.population} population, GDP/capita ${country.gdpPerCapita}`}
        faqs={[
          {
            question: `What are the best AI tools available in ${country.country}?`,
            answer: `The most popular AI tools in ${country.country} include ${country.topAITools.slice(0, 4).join(', ')}. Availability depends on language support, pricing, and regional restrictions.`,
          },
          {
            question: `Is ChatGPT available in ${country.country}?`,
            answer: `ChatGPT (OpenAI) is available in ${country.country}${country.country === 'China' ? ' via VPN and third-party services, but is officially blocked by the Great Firewall. Chinese alternatives like DeepSeek and Baidu ERNIE are more commonly used.' : ' through the official website and mobile apps. Users can access the free tier or subscribe to ChatGPT Plus for $20/month.'}`,
          },
          {
            question: `How much do AI tools cost in ${country.country}?`,
            answer: `Most AI tools are priced in USD. In ${country.country} (${country.currencyCode}), a $20/month subscription costs approximately the local equivalent. Free tiers from Google Gemini, Perplexity, and DeepSeek are popular alternatives.`,
          },
          {
            question: `What is the AI readiness score of ${country.country}?`,
            answer: `${country.country} has an AI Readiness Score of ${country.overallScore}/10, based on internet infrastructure, English proficiency, spending power, local talent pool, and government AI support.`,
          },
          {
            question: `What AI startups are based in ${country.country}?`,
            answer: `${country.startupEcosystem}`,
          },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/compare-countries"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          All Countries
        </Link>

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-blue-50/20 to-amber-50/10 rounded-2xl" />
          <div className="relative rounded-2xl border border-gray-200 p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{country.flagEmoji}</span>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                      AI Tools in {country.country}
                    </h1>
                    <p className="text-gray-500 mt-1">{country.capital} · {country.region}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${
                  country.overallScore >= 8.5 ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : country.overallScore >= 7.5 ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : country.overallScore >= 6.5 ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}>
                  <Star className="w-5 h-5" />
                  <span className="text-2xl font-bold">{country.overallScore.toFixed(1)}</span>
                  <span className="text-sm opacity-70">/10</span>
                </div>
                <span className="text-xs text-gray-400 mt-1">AI Readiness Score</span>
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Users, label: 'Population', value: country.population },
                { icon: DollarSign, label: 'GDP / Capita', value: country.gdpPerCapita },
                { icon: Wifi, label: 'Internet', value: country.internetPenetration },
                { icon: Globe, label: 'Language', value: country.language.split(',')[0].trim() },
                { icon: MessageSquare, label: 'English', value: country.englishProficiency.split('(')[0].trim() },
                { icon: MapPin, label: 'Currency', value: country.currencyCode },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-white/70 border border-gray-200 p-3 text-center">
                  <stat.icon className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                  <div className="text-xs text-gray-500">{stat.label}</div>
                  <div className="text-sm font-semibold text-gray-800">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Main Content ───────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top AI Tools */}
            <section className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" />
                Top AI Tools in {country.country}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                These AI tools are most commonly used by professionals and businesses in {country.country}.
              </p>
              <div className="flex flex-wrap gap-2">
                {matchedTools.length > 0 ? (
                  matchedTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all"
                    >
                      {tool.name}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">Tool details loading from our database...</p>
                )}
              </div>
            </section>

            {/* Local AI Scene */}
            <section className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                Local AI Ecosystem
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {country.localAIScene}
              </p>
            </section>

            {/* Startup Ecosystem */}
            <section className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                Startup & Tech Ecosystem
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {country.startupEcosystem}
              </p>
            </section>

            {/* Pricing Note */}
            <section className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-500" />
                Pricing & Affordability
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {country.pricingNote}
              </p>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                {country.country} AI Landscape — Pros & Cons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-700 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Strengths
                  </h3>
                  <ProsCons items={country.strengths} variant="pro" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Challenges
                  </h3>
                  <ProsCons items={country.challenges} variant="con" />
                </div>
              </div>
            </section>
          </div>

          {/* ─── Sidebar ────────────────────────────────────────── */}
          <aside className="space-y-6">
            {/* Compare with other countries */}
            <section className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" />
                Compare with
              </h3>
              <div className="space-y-2">
                {otherCountries.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/compare-countries/${other.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{other.flagEmoji}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-800 group-hover:text-emerald-700 transition-colors">
                          {other.country}
                        </div>
                        <div className="text-xs text-gray-400">{other.region}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      other.overallScore >= 8.5 ? 'bg-emerald-100 text-emerald-700'
                      : other.overallScore >= 7.5 ? 'bg-blue-100 text-blue-700'
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      {other.overallScore.toFixed(1)}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/compare-countries"
                className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 mt-3 group"
              >
                View all countries <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
              </Link>
            </section>

            {/* AI Readiness Legend */}
            <section className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                About This Score
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                <p>
                  Our <strong>AI Readiness Score</strong> (1-10) evaluates each country on:
                </p>
                <ul className="space-y-1 pl-4 list-disc">
                  <li>Internet & digital infrastructure</li>
                  <li>English / language proficiency</li>
                  <li>Spending power for USD-priced tools</li>
                  <li>Local AI ecosystem & startup scene</li>
                  <li>Government AI support & regulation</li>
                  <li>Talent pool & developer community</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span><strong>8.5+</strong> Excellent — full global tool access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span><strong>7.5-8.4</strong> Strong — most tools accessible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span><strong>6.0-7.4</strong> Emerging — free tools dominate</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick CTA */}
            <section className="rounded-xl bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 p-5 text-center">
              <BookOpen className="mx-auto mb-2 w-6 h-6 text-emerald-500" />
              <h3 className="text-sm font-bold text-gray-900 mb-1">Explore AI Tools</h3>
              <p className="text-xs text-gray-600 mb-3">
                Browse our full directory of AI tools with detailed Asia-readiness scores.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition"
              >
                Browse All Tools <ArrowRight className="w-3 h-3" />
              </Link>
            </section>
          </aside>
        </div>

        {/* ─── Country Context CTA ──────────────────────────────── */}
        <section className="mt-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Want to see how {country.country} compares?
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mb-6">
            View all {countryComparisons.length} countries side-by-side. Compare AI tool availability,
            pricing, and ecosystem strengths across Asia and Oceania.
          </p>
          <Link
            href="/compare-countries"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition shadow-sm"
          >
            <Globe className="w-4 h-4" /> View All Country Comparisons
          </Link>
        </section>
      </div>
    </div>
  );
}
