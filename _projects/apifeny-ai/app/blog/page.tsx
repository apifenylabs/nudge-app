import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen, Layers, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';
import { getAllCategories } from '@/lib/blog-categories';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';
const POSTS_PER_PAGE = 30;

export function generateMetadata({ searchParams }: { searchParams: { page?: string; q?: string } }): Metadata {
  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const searchQuery = (searchParams?.q || '').toLowerCase().trim();

  if (searchQuery) {
    return {
      title: `Search: ${searchQuery} — AI Tools Blog & Guides | Apifeny AI`,
      description: `AI tools guides matching "${searchQuery}". Expert reviews, comparisons, and practical tips.`,
      robots: { index: false, follow: true },
      alternates: { canonical: `${BASE_URL}/blog?q=${encodeURIComponent(searchQuery)}` },
      openGraph: {
        title: `Search: ${searchQuery} — AI Tools Blog & Guides`,
        description: `AI tools guides matching "${searchQuery}".`,
        url: `${BASE_URL}/blog?q=${encodeURIComponent(searchQuery)}`,
        siteName: 'Apifeny AI',
        type: 'website',
      },
    };
  }

  if (currentPage > 1) {
    return {
      title: `AI Tools Blog & Guides — Page ${currentPage} | Apifeny AI`,
      description: `Expert AI tools guides and comparisons — Page ${currentPage}. Discover the best AI for your workflow in Asia.`,
      robots: { index: false, follow: true },
      alternates: { canonical: `${BASE_URL}/blog?page=${currentPage}` },
      openGraph: {
        title: `AI Tools Blog & Guides — Page ${currentPage}`,
        description: `Expert AI tools guides and comparisons — Page ${currentPage}.`,
        url: `${BASE_URL}/blog?page=${currentPage}`,
        siteName: 'Apifeny AI',
        type: 'website',
      },
    };
  }

  return {
    title: 'AI Tools Blog & Guides | Apifeny AI',
    description: 'Expert guides, comparisons, and practical tips for AI tools and agents. Discover the best AI for your workflow in Asia.',
    keywords: ['AI tools blog', 'AI guides', 'AI comparison', 'Asia AI tools', 'AI productivity', 'solopreneur AI'],
    alternates: { canonical: `${BASE_URL}/blog` },
    openGraph: {
      title: 'AI Tools Blog & Guides | Apifeny AI',
      description: 'Expert guides, comparisons, and practical tips for AI tools and agents.',
      url: `${BASE_URL}/blog`,
      siteName: 'Apifeny AI',
      type: 'website',
      images: [{ url: '/og', width: 1200, height: 630, alt: 'Apifeny AI Blog' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Tools Blog & Guides',
      description: 'Expert guides, comparisons, and practical tips for AI tools and agents.',
      images: ['/og'],
    },
  };
}

function getTagVariant(tag: string): string {
  const variants: Record<string, string> = {
    'ai-tools': 'border-violet-300 text-violet-700 bg-violet-50',
    'AI-comparison': 'border-cyan-300 text-cyan-700 bg-cyan-50',
    'comparison': 'border-cyan-300 text-cyan-700 bg-cyan-50',
    'solopreneur': 'border-purple-300 text-purple-700 bg-purple-50',
    'productivity': 'border-amber-300 text-amber-700 bg-amber-50',
    'coding': 'border-emerald-300 text-emerald-700 bg-emerald-50',
    'translation': 'border-blue-300 text-blue-700 bg-blue-50',
    'automation': 'border-orange-300 text-orange-700 bg-orange-50',
    'marketing-automation': 'border-pink-300 text-pink-700 bg-pink-50',
    'development': 'border-cyan-300 text-cyan-700 bg-cyan-50',
    'programming': 'border-indigo-300 text-indigo-700 bg-indigo-50',
  };
  return variants[tag] || 'border-gray-300 text-gray-600 bg-gray-50';
}

function buildPageUrl(page: number, q: string): string {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', String(page));
  if (q) params.set('q', q);
  const qs = params.toString();
  return `/blog${qs ? '?' + qs : ''}`;
}

export default function BlogListPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  const allPosts = getAllPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalPosts = allPosts.length;

  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const searchQuery = (searchParams?.q || '').toLowerCase().trim();

  const filtered = searchQuery
    ? allPosts.filter(p =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.excerpt.toLowerCase().includes(searchQuery) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery))
      )
    : allPosts;

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const pagePosts = filtered.slice(start, start + POSTS_PER_PAGE);

  const getPageRange = () => {
    const range: (number | '...')[] = [];
    const delta = 2;
    const left = Math.max(2, safePage - delta);
    const right = Math.min(totalPages - 1, safePage + delta);
    range.push(1);
    if (left > 2) range.push('...');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push('...');
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  const pageUrl = safePage > 1 ? `?page=${safePage}` : '';
  const schemaUrl = `${BASE_URL}/blog${pageUrl}${searchQuery ? (safePage > 1 ? '&' : '?') + 'q=' + encodeURIComponent(searchQuery) : ''}`;
  const schemaName = searchQuery
    ? `Search: ${searchQuery} \u2014 AI Tools Blog & Guides`
    : `AI Tools Blog & Guides \u2014 Page ${safePage}`;

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 uppercase tracking-wider">Blog & Guides</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 max-w-3xl">
            AI Tools{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Guides & Insights
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-6">
            Expert reviews, comparisons, and practical guides to help you find and use the best AI tools for your workflow in Asia.
          </p>
          <form action="/blog" method="GET" className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={searchQuery || ''}
                placeholder={`Search ${totalPosts} guides...`}
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
              />
              {searchQuery && (
                <Link
                  href="/blog"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear
                </Link>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Topic Clusters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-0">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Browse by Topic</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {getAllCategories().map((cat) => {
            const count = allPosts.filter(p =>
              p.tags.some(t => cat.tags.map(ct => ct.toLowerCase()).includes(t.toLowerCase()))
            ).length;
            return (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="group bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition line-clamp-1">
                  {cat.slug === 'translation-language' ? 'Translation & Language' :
                   cat.slug === 'coding-development' ? 'Coding & Development' :
                   cat.slug === 'accounting-finance' ? 'Accounting & Finance' :
                   cat.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{count} guides</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {searchQuery
              ? `Found ${filtered.length} guide${filtered.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : `Page ${safePage} of ${totalPages} (${totalPosts} guides)`}
          </p>
          {searchQuery && (
            <Link href="/blog" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              &larr; All guides
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pagePosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all hover:shadow-lg hover:shadow-blue-100/50"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getTagVariant(tag)}`}
                    >
                      {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                  Read Guide
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {pagePosts.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No guides found</h2>
            <p className="text-gray-400 mb-6">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'No posts available yet.'}
            </p>
            {searchQuery && (
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                Browse All Guides
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Blog pagination">
            {safePage > 1 ? (
              <Link
                href={buildPageUrl(safePage - 1, searchQuery)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-100 text-sm text-gray-300 cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </span>
            )}

            <div className="hidden sm:flex items-center gap-1">
              {getPageRange().map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-gray-400">...</span>
                ) : (
                  <Link
                    key={p}
                    href={buildPageUrl(p as number, searchQuery)}
                    className={`inline-flex items-center justify-center min-w-[36px] h-9 rounded-lg text-sm font-medium transition ${
                      p === safePage
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    {p}
                  </Link>
                )
              )}
            </div>

            <span className="sm:hidden text-sm text-gray-500 px-2">
              Page {safePage} of {totalPages}
            </span>

            {safePage < totalPages ? (
              <Link
                href={buildPageUrl(safePage + 1, searchQuery)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-100 text-sm text-gray-300 cursor-not-allowed">
                Next
                <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </nav>
        )}

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: schemaName,
              description: 'Expert guides, comparisons, and practical tips for AI tools and agents.',
              url: schemaUrl,
              isPartOf: { '@type': 'WebSite', name: 'Apifeny AI', url: BASE_URL },
              numberOfItems: filtered.length,
            }),
          }}
        />
      </section>

      {/* Newsletter CTA */}
      {!searchQuery && (
        <section className="bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Stay Ahead with AI Insights
              </h2>
              <p className="text-blue-100 mb-6">
                Get the latest AI tool reviews, guides, and Asia-focused tips delivered to your inbox.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-700 font-medium hover:bg-blue-50 transition"
              >
                Browse All Guides
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
            ],
          }),
        }}
      />
    </main>
  );
}
