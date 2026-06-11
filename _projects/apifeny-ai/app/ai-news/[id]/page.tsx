import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  CalendarDays,
  MapPin,
  Tag,
  Share2,
  Bookmark,
  Sparkles,
  Newspaper,
  Globe,
  Mail,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { aiNewsArticles, getCategoryInfo, getRegionLabel, formatDate, getLatestArticles, type AINewsArticle } from '@/lib/ai-news-data';

const BASE_URL = 'https://apifeny-ai.vercel.app';

// ─── Generate static params for all articles ───────────────────────────

export function generateStaticParams() {
  return aiNewsArticles.map((article) => ({
    id: article.id,
  }));
}

// ─── Dynamic metadata ───────────────────────────────────────────────────

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const article = aiNewsArticles.find((a) => a.id === params.id);
  if (!article) return {};

  const catInfo = getCategoryInfo(article.category);
  const regionLabel = getRegionLabel(article.region);

  return {
    title: `${article.title} | AI News — Apifeny AI`,
    description: article.summary,
    keywords: [
      'AI news',
      article.title,
      catInfo.label,
      regionLabel,
      ...article.tags,
    ],
    alternates: { canonical: `${BASE_URL}/ai-news/${article.id}` },
    openGraph: {
      title: `${article.title} | AI News — Apifeny AI`,
      description: article.summary,
      url: `${BASE_URL}/ai-news/${article.id}`,
      siteName: 'Apifeny AI',
      type: 'article',
      publishedTime: article.publishedAt,
      tags: article.tags,
      images: [{ url: '/og', width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: ['/og'],
    },
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────

function getRelatedArticles(current: AINewsArticle, count: number = 4): AINewsArticle[] {
  const related = aiNewsArticles
    .filter(
      (a) =>
        a.id !== current.id &&
        (a.category === current.category ||
         a.region === current.region ||
         a.tags.some((t) => current.tags.includes(t)))
    )
    .slice(0, count);

  // Fallback: fill with latest if not enough
  if (related.length < count) {
    const latest = aiNewsArticles.filter(
      (a) => a.id !== current.id && !related.find((r) => r.id === a.id)
    );
    return [...related, ...latest].slice(0, count);
  }
  return related;
}

// ─── Page Component ────────────────────────────────────────────────────

function AINewsDetailPage({ params }: { params: { id: string } }) {
  const article = aiNewsArticles.find((a) => a.id === params.id);
  if (!article) notFound();

  const catInfo = getCategoryInfo(article.category);
  const regionLabel = getRegionLabel(article.region);
  const relatedArticles = getRelatedArticles(article);

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'AI News', item: '/ai-news' },
          { name: article.title, item: `/ai-news/${article.id}` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ── Back Navigation ──────────────────────────────────────── */}
        <Link
          href="/ai-news"
          className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-neon transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          Back to AI News
        </Link>

        {/* ── Article Header ───────────────────────────────────────── */}
        <header className="mb-10">
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100">
              {catInfo.emoji} {catInfo.label}
            </span>
            {article.isAsiaSpecific && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-medium border border-cyan-100">
                <MapPin className="w-3 h-3" /> {regionLabel}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(article.publishedAt)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>

          {/* Source & external link */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-gray-400" />
              Source:{' '}
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon hover:underline font-medium"
              >
                {article.source}
                <ExternalLink className="w-3 h-3 inline ml-0.5" />
              </a>
            </span>
            {article.isAsiaSpecific && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Globe className="w-3.5 h-3.5" />
                Asia-relevant story
              </span>
            )}
          </div>
        </header>

        {/* ── Summary / Content ────────────────────────────────────── */}
        <div className="prose prose-gray max-w-none">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 p-6 sm:p-8 mb-8">
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">
              {article.summary}
            </p>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Read full article CTA */}
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-8 mb-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Read the Full Article</h3>
            <p className="text-sm text-gray-600 mb-4">
              This story was originally published by {article.source}. Visit their site for the complete article.
            </p>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-white rounded-lg font-medium hover:bg-neon/90 transition shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Read on {article.source}
            </a>
          </div>

          {/* Share */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
              <Share2 className="w-4 h-4" />
              Share This Story
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`${BASE_URL}/ai-news/${article.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${BASE_URL}/ai-news/${article.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Share on LinkedIn
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`Check out this AI news story: ${BASE_URL}/ai-news/${article.id}`)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Email
              </a>
            </div>
          </div>
        </div>

        {/* ── Related Articles ──────────────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 border-t border-gray-100 pt-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-neon" />
              <h2 className="text-xl font-bold text-gray-900">Related Stories</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedArticles.map((related) => {
                const rc = getCategoryInfo(related.category);
                return (
                  <Link
                    key={related.id}
                    href={`/ai-news/${related.id}`}
                    className="group block p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
                        {rc.emoji} {rc.label}
                      </span>
                      <span className="text-[10px] text-gray-400">{formatDate(related.publishedAt)}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-neon transition-colors leading-snug mb-1">
                      {related.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{related.summary}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Newsletter Signup ──────────────────────────────────── */}
        <section className="mt-12">
          <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-200 p-6 sm:p-8 text-center">
            <Mail className="mx-auto mb-3 w-8 h-8 text-violet-500" />
            <h2 className="text-lg font-bold text-gray-900 mb-2">Get AI News Delivered to Your Inbox</h2>
            <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">
              Weekly curated AI industry news — Asia focus, global coverage. No spam, unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
              />
              <button className="w-full sm:w-auto px-6 py-2.5 bg-neon text-white rounded-lg font-medium hover:bg-neon/90 transition shadow-sm whitespace-nowrap text-sm">
                Subscribe Free
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Join 630+ solopreneurs staying ahead of the AI curve.
            </p>
          </div>
        </section>

        {/* ── Explore More ──────────────────────────────────────────── */}
        <section className="mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 p-6 sm:p-8 text-center">
            <Bookmark className="mx-auto mb-3 w-8 h-8 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900 mb-2">Stay Updated with AI News</h2>
            <p className="text-sm text-gray-600 mb-6">
              Bookmark our news page for weekly updates on AI across Asia and around the world.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/ai-news"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-white rounded-lg font-medium hover:bg-neon/90 transition shadow-sm"
              >
                <Newspaper className="w-4 h-4" />
                All News
              </Link>
              <Link
                href="/trending"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition"
              >
                Trending Tools
              </Link>
            </div>
          </div>
        </section>

        {/* ── JSON-LD ────────────────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsArticle',
              headline: article.title,
              description: article.summary,
              datePublished: article.publishedAt,
              author: { '@type': 'Organization', name: 'Apifeny AI' },
              publisher: { '@type': 'Organization', name: article.source },
              url: `${BASE_URL}/ai-news/${article.id}`,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${BASE_URL}/ai-news/${article.id}`,
              },
              keywords: article.tags.join(', '),
            }),
          }}
        />
      </div>
    </div>
  );
}

export default AINewsDetailPage;
