import { Metadata } from 'next';
import Link from 'next/link';
import { Flame, TrendingUp, ArrowLeft, Layers, Star, Zap, Award } from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { toolsData } from '@/lib/data';
import { computeAllScores } from '@/lib/ranking-algorithm';
import ToolCard from '@/components/ToolCard';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Trending AI Tools — Most Popular Right Now | Apifeny AI',
  description:
    'Discover the most popular AI tools trending across Asia. Real-time rankings by community votes, saves, and editor picks. Updated continuously.',
  keywords: [
    'trending AI tools',
    'popular AI tools',
    'best AI tools 2026',
    'trending AI Asia',
    'AI tools ranking',
    'top AI tools',
    'most used AI tools',
  ],
  alternates: { canonical: `${BASE_URL}/trending` },
  openGraph: {
    title: 'Trending AI Tools — Most Popular Right Now | Apifeny AI',
    description:
      'See which AI tools are trending in Asia — ranked by community votes, saves, and editor picks.',
    url: `${BASE_URL}/trending`,
    siteName: 'Apifeny AI',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Trending AI Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trending AI Tools — Most Popular Right Now',
    description: 'See which AI tools are trending in Asia. Ranked by community, updated continuously.',
    images: ['/og'],
  },
};

function TrendingPage() {
  const ranked = computeAllScores(toolsData);
  const topTools = ranked.slice(0, 20);

  const tierInfo = (index: number) => {
    if (index === 0) return { label: '#1 Trending', icon: <Award className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50 border-amber-200' };
    if (index <= 2) return { label: 'Trending', icon: <Flame className="w-5 h-5 text-orange-500" />, bg: 'bg-orange-50 border-orange-200' };
    if (index <= 5) return { label: 'Rising', icon: <TrendingUp className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50 border-emerald-200' };
    return { label: 'Popular', icon: <Star className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50 border-blue-200' };
  };

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Trending Tools', item: '/trending' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-white transition mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          All Tools
        </Link>

        {/* Hero */}
        <section className="relative mb-10 sm:mb-12">
          <div className="absolute inset-0 bg-gray-50 opacity-30 rounded-2xl" />
          <div className="relative rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-yellow-500/10 border border-gray-200 p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-medium mb-4">
              <Flame className="w-3.5 h-3.5" />
              Trending Now
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Trending{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                AI Tools
              </span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              The most popular AI tools in Asia right now — ranked by community engagement,
              saves, and editor recommendations. Updated continuously as new votes come in.
            </p>
          </div>
        </section>

        {/* Score explanation */}
        <div className="mb-8 flex flex-wrap gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" /> #1 Trending
          </span>
          <span className="inline-flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" /> Top 3 Trending
          </span>
          <span className="inline-flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Rising (Top 6)
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-blue-500" /> Popular
          </span>
          <span className="ml-auto">
            <Link href="/rankings" className="text-neon hover:underline">
              View workflow rankings →
            </Link>
          </span>
        </div>

        {/* Trending grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {topTools.map((rankedTool, index) => {
            const tier = tierInfo(index);
            return (
              <div key={rankedTool.tool.slug} className="group relative">
                {/* Rank badge */}
                <div className="absolute -top-2 -left-2 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md border ${tier.bg}`}>
                    #{index + 1}
                  </div>
                </div>

                {/* Tier indicator */}
                <div className="absolute top-2 right-2 z-10">
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${tier.bg}`}>
                    {tier.icon}
                    {tier.label}
                  </div>
                </div>

                <ToolCard tool={rankedTool.tool} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <section className="mt-16 text-center">
          <div className="inline-block p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Not seeing what you need?
            </h2>
            <p className="text-gray-600 mb-6">
              Browse all {toolsData.length}+ AI tools by category or workflow
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-white rounded-lg font-medium hover:bg-neon/90 transition shadow-sm"
              >
                <Layers className="w-4 h-4" />
                Browse All Tools
              </Link>
              <Link
                href="/ai-tools-by-category"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition"
              >
                <Zap className="w-4 h-4" />
                By Category
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TrendingPage;
