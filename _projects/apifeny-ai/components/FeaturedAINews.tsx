'use client';

import Link from 'next/link';
import { Newspaper, ArrowRight, Globe, TrendingUp, Sparkles, ExternalLink, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  aiNewsArticles,
  getCategoryInfo,
  getRegionLabel,
  getFeaturedArticles,
  getLatestArticles,
  formatDate,
} from '@/lib/ai-news-data';

const REGION_COLORS: Record<string, string> = {
  'southeast-asia': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'east-asia': 'bg-red-100 text-red-700 border-red-200',
  'south-asia': 'bg-orange-100 text-orange-700 border-orange-200',
  'north-america': 'bg-blue-100 text-blue-700 border-blue-200',
  'europe': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'global': 'bg-violet-100 text-violet-700 border-violet-200',
};

function getRegionBadgeStyle(region: string): string {
  return REGION_COLORS[region] || 'bg-gray-100 text-gray-700 border-gray-200';
}

export default function FeaturedAINews() {
  const featured = getFeaturedArticles().slice(0, 3);
  const latest = getLatestArticles(4);

  if (featured.length === 0 && latest.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-violet-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                <Newspaper className="w-4 h-4 text-violet-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI News & Updates</h2>
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              Curated AI industry news — Asia focus, global coverage
            </p>
          </div>
          <Link
            href="/ai-news"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 text-sm font-medium text-violet-700 hover:bg-violet-100 transition-all"
          >
            View all news <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Featured Stories */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featured.map((article) => {
              const catInfo = getCategoryInfo(article.category);
              return (
                <a
                  key={article.id}
                  href={`/ai-news/${article.id}`}
                  className="group block"
                >
                  <Card className="h-full border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all duration-200 bg-white">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-[11px] bg-violet-50 border-violet-200 text-violet-700">
                          {catInfo?.emoji || '📰'} {catInfo?.label || article.category}
                        </Badge>
                        <Badge variant="outline" className={`text-[11px] ${getRegionBadgeStyle(article.region)}`}>
                          {getRegionLabel(article.region)}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors mb-2 line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{formatDate(article.publishedAt)}</span>
                        <span className="flex items-center gap-1 text-violet-500 group-hover:gap-1.5 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        )}

        {/* Latest News Strip */}
        {latest.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                Latest Updates
              </div>
              <Link
                href="/ai-news"
                className="text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
              >
                All news <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {latest.map((article) => {
                const catInfo = getCategoryInfo(article.category);
                return (
                  <a
                    key={article.id}
                    href={`/ai-news/${article.id}`}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-base flex-shrink-0">{catInfo?.emoji || '📰'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 group-hover:text-violet-600 transition-colors truncate font-medium">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-gray-400">{formatDate(article.publishedAt)}</span>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getRegionBadgeStyle(article.region)}`}>
                          {getRegionLabel(article.region)}
                        </Badge>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-violet-500 transition-colors flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/ai-news"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-all"
          >
            View all AI News <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
