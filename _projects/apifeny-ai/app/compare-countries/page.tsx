import { Metadata } from 'next';
import Link from 'next/link';
import {
  Globe,
  ArrowRight,
  BarChart3,
  MapPin,
  DollarSign,
  Users,
  Wifi,
  Zap,
  Star,
  Shield,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { countryComparisons, regions } from '@/lib/country-comparisons';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
  title: 'AI Tools by Country — Compare AI Ecosystems Across Asia | Apifeny AI',
  description:
    'Compare AI tool availability, pricing, and startup ecosystems across Singapore, Malaysia, Indonesia, Thailand, Vietnam, Philippines, India, China, Japan, South Korea, and more. Find the best AI tools for your country.',
  keywords: [
    'AI tools by country',
    'best AI tools Asia',
    'AI tools Singapore',
    'AI tools Malaysia',
    'AI tools Indonesia',
    'AI tools Thailand',
    'AI tools Vietnam',
    'AI tools Philippines',
    'AI tools India',
    'AI tools China',
    'AI tools Japan',
    'AI tools South Korea',
    'AI tool comparison Asia',
    'country comparison AI',
    'AI readiness Asia',
    'Southeast Asia AI tools',
    'Singapore AI ecosystem',
  ],
  alternates: { canonical: `${BASE_URL}/compare-countries` },
  openGraph: {
    title: 'AI Tools by Country — Compare AI Ecosystems Across Asia',
    description:
      'Compare AI tool availability, pricing, and startup ecosystems across 14 Asian markets. Find the best AI tools for your country.',
    url: `${BASE_URL}/compare-countries`,
    siteName: 'Apifeny AI',
    type: 'website',
    images: [{ url: `${BASE_URL}/og-countries.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools by Country — Compare AI Ecosystems Across Asia',
    description: 'Compare AI tool availability, pricing, and startup ecosystems across 14 Asian markets.',
  },
  robots: { index: true, follow: true },
};

const regionColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Southeast Asia': { bg: 'from-emerald-500/10 via-teal-500/5', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'East Asia': { bg: 'from-blue-500/10 via-indigo-500/5', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  'South Asia': { bg: 'from-amber-500/10 via-orange-500/5', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
};

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8.5 ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
    : score >= 7.5 ? 'text-blue-600 bg-blue-50 border-blue-200'
    : score >= 6.5 ? 'text-amber-600 bg-amber-50 border-amber-200'
    : 'text-gray-500 bg-gray-50 border-gray-200';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      <Star className="w-3 h-3" />
      {score.toFixed(1)}
    </span>
  );
}

export default function CompareCountriesIndexPage() {
  const scores = countryComparisons.map((c) => c.overallScore);
  const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  const topScore = Math.max(...scores);
  const topCountry = countryComparisons.find((c) => c.overallScore === topScore)!;

  const byRegion = regions.map((region) => ({
    region,
    countries: countryComparisons.filter((c) => c.region === region),
  }));

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools by Country', item: '/compare-countries' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-blue-50/30 to-amber-50/20 rounded-2xl" />
          <div className="relative rounded-2xl border border-gray-200 p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-medium mb-4">
              <Globe className="w-3.5 h-3.5" />
              Country Comparison
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              AI Tools{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                by Country
              </span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
              AI tool availability, pricing, and ecosystem vary dramatically across Asia. Compare
              <strong> {countryComparisons.length} countries</strong> and find the best AI tools for your market.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-600">{countryComparisons.length} countries</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">Avg readiness: <strong>{avgScore}/10</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-gray-600">
                  Top: <strong>{topCountry.flagEmoji} {topCountry.country}</strong> ({topScore.toFixed(1)})
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Region Tabs ──────────────────────────────────────── */}
        {byRegion.map(({ region, countries }) => {
          const colors = regionColors[region] || regionColors['Southeast Asia'];
          return (
            <section key={region} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
                <h2 className="text-xl font-bold text-gray-900">{region}</h2>
                <span className="text-sm text-gray-400">({countries.length} countries)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {countries.map((country) => {
                  const colors = regionColors[country.region] || regionColors['Southeast Asia'];
                  return (
                    <Link
                      key={country.slug}
                      href={`/compare-countries/${country.slug}`}
                      className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-emerald-300 transition-all duration-200"
                    >
                      <div className={`bg-gradient-to-br ${colors.bg} p-5 border-b border-gray-100`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{country.flagEmoji}</span>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              {country.country}
                            </h3>
                          </div>
                          <ScoreBadge score={country.overallScore} />
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{country.gdpPerCapita}/cap</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Wifi className="w-3 h-3" />
                            <span>{country.internetPenetration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{country.population}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{country.capital}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                          {country.startupEcosystem}
                        </p>

                        {/* Top tools chips */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {country.topAITools.slice(0, 4).map((tool) => (
                            <span key={tool} className="px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-[10px] text-gray-500">
                              {tool}
                            </span>
                          ))}
                          {country.topAITools.length > 4 && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-600">
                              +{country.topAITools.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-emerald-600 group-hover:gap-2 transition-all">
                          View details <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* ─── Bottom CTA ──────────────────────────────────────── */}
        <section className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 text-center">
          <div className="max-w-lg mx-auto">
            <Sparkles className="mx-auto mb-3 w-8 h-8 text-emerald-500" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Not sure which AI tools work in your country?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Browse our full directory of {countryComparisons.length > 80 ? '80+' : countryComparisons.length * 6}+ AI tools
              — each with detailed pricing, availability, and Asia-readiness scores.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition shadow-sm"
              >
                Browse All Tools <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/trending"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition"
              >
                <Zap className="w-4 h-4" /> Trending Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
