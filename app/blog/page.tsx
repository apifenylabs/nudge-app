import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowRight, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data';
import SiteFooter from '@/components/SiteFooter';

const BASE_URL = 'https://familytravelasia.com';
const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: 'Family Travel Blog & Guides | Asia Family Travel Directory',
  description: 'Expert guides, honest comparisons, and practical tips for family travel in Asia. Real parent advice for Tokyo, Bangkok, Singapore, Hong Kong, and more.',
  keywords: ['family travel blog', 'Asia travel guides', 'parent travel tips', 'family vacation planning', 'kid-friendly destinations Asia'],
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: 'Family Travel Blog & Guides | Asia Family Travel Directory',
    description: 'Expert guides, honest comparisons, and practical tips for family travel in Asia.',
    url: `${BASE_URL}/blog`,
    siteName: 'Asia Family Travel Directory',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Asia Family Travel Directory Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Travel Blog & Guides',
    description: 'Expert guides, honest comparisons, and practical tips for family travel in Asia.',
    images: ['/og-image.jpg'],
  },
};

function getTagVariant(tag: string): string {
  const colorMap: Record<string, string> = {
    'comparison': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'asia-travel': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    'parent-tips': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    'family-vacation-planning': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    'kid-friendly': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    'tripadvisor-alternative': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    'family-travel-reviews': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    'family-travel-tips': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    'parent-approved': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    'kid-friendly-travel': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    'travel-planning': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'parent-advice': 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  };
  return colorMap[tag] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg ${featured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-0' : ''}`}
    >
      {featured && (
        <div className="relative h-48 md:h-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-sky-100 via-sky-200 to-blue-200 dark:from-sky-900 dark:via-sky-800 dark:to-blue-900 flex items-center justify-center">
            <Compass size={48} className="text-sky-400/60 dark:text-sky-500/40" />
          </div>
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
            Featured
          </div>
        </div>
      )}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readingTime}
          </span>
        </div>

        <h2 className={`font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-3 leading-snug ${featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
          {post.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTagVariant(tag)}`}
            >
              <Tag size={10} className="mr-1" />
              {tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </span>
          ))}
          {post.tags.length > 4 && (
            <span className="text-xs text-gray-400 dark:text-gray-500">+{post.tags.length - 4} more</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold text-sky-600 dark:text-sky-400 group-hover:gap-2 transition-all">
          Read Article
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}

function PaginationBar({ currentPage, totalPages, baseUrl }: { currentPage: number; totalPages: number; baseUrl: string }) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (page <= 1) return baseUrl;
    return `${baseUrl}?page=${page}`;
  };

  // Build page range with ellipsis
  const pageNumbers: (number | 'ellipsis')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push('ellipsis');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pageNumbers.push(i);
    if (currentPage < totalPages - 2) pageNumbers.push('ellipsis');
    pageNumbers.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-12" aria-label="Blog pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 dark:text-gray-600 cursor-not-allowed">
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, idx) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${idx}`} className="px-2 py-2 text-sm text-gray-400 dark:text-gray-500">...</span>
          ) : (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 dark:text-gray-600 cursor-not-allowed">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>;
}) {
  // use() the searchParams promise per Next.js 15 convention
  // For static export compatibility, resolve with default if needed
  const posts = getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort();

  // Handle searchParams — default to page 1
  let currentPage = 1;
  let activeTag: string | null = null;
  // Static check: searchParams is a Promise in Next.js 15;
  // destructure defensively for both RSC and static export
  const sp = searchParams as unknown as { page?: string; tag?: string };
  const pageParam = typeof sp === 'object' && sp !== null ? sp.page : undefined;
  const tagParam = typeof sp === 'object' && sp !== null ? sp.tag : undefined;

  // Filter by tag if present
  let filteredPosts = posts;
  if (tagParam && allTags.includes(tagParam)) {
    activeTag = tagParam;
    filteredPosts = posts.filter(p => p.tags.includes(tagParam));
  }

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));

  if (pageParam) {
    const parsed = parseInt(pageParam, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      currentPage = parsed;
    }
  }

  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;
  const pagePosts = filteredPosts.slice(startIdx, endIdx);
  const isFirstPage = currentPage === 1 && !activeTag;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Family Travel Blog & Guides",
    "description": "Expert guides, honest comparisons, and practical tips for family travel in Asia.",
    "url": `${BASE_URL}/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
    "publisher": {
      "@type": "Organization",
      "name": "Asia Family Travel Directory"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── NAV ─── */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-200 dark:shadow-sky-900">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">FT</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Family Travel<span className="text-sky-500">.</span>
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Kid-safe directory</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              <Link href="/" className="group text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm tracking-wide transition-colors relative">
                Destinations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/blog" className="group text-gray-900 dark:text-white font-medium text-sm tracking-wide transition-colors relative">
                Blog
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-sky-500"></span>
              </Link>
              <a href="/#destinations-section" className="group text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm tracking-wide transition-colors relative">
                Trip Planner
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            <Link
              href="/"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-sky-200 dark:hover:shadow-sky-900/50 transition-all duration-300 active:scale-95"
            >
              <Compass size={16} />
              Explore Destinations
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-gray-700 text-sm text-gray-300 mb-6">
              <Compass size={14} />
              Real advice from parents who've been there
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Family Travel<span className="text-sky-400"> Blog</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Honest comparisons, practical guides, and real parent stories.
              Everything you need to plan smarter family adventures in Asia.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />
      </section>

      {/* ─── BLOG GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeTag
                ? `${activeTag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`
                : isFirstPage ? 'Latest Articles' : `Articles — Page ${currentPage}`}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {activeTag ? `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} tagged` : `Page ${currentPage} of ${totalPages} (${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''})`}
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors flex items-center gap-1"
          >
            Browse Destinations
            <ArrowRight size={14} />
          </Link>
        </div>

        {pagePosts.length === 0 ? (
          <div className="text-center py-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg">
            <Compass size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Coming Soon</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{activeTag ? 'No articles found with this tag.' : "We're writing new articles. Check back soon!"}</p>
          </div>
        ) : (
          <>
            {/* Featured article only on page 1 */}
            {isFirstPage && pagePosts[0] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <BlogCard post={pagePosts[0]} featured />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isFirstPage
                ? pagePosts.slice(1).map(post => <BlogCard key={post.slug} post={post} />)
                : pagePosts.map(post => <BlogCard key={post.slug} post={post} />)
              }
            </div>
          </>
        )}

        {/* ─── PAGINATION ─── */}
        <PaginationBar currentPage={currentPage} totalPages={totalPages} baseUrl={`${BASE_URL}/blog`} />

        {/* Topic tags cloud with filtering (show on all pages) */}
        <div className="mt-16 pt-10 border-t border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
            {activeTag ? (
              <>
                Filtering by: <span className="text-sky-600 dark:text-sky-400">{activeTag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                <Link href="/blog" className="ml-3 text-xs font-normal text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline underline-offset-2">Clear filter</Link>
              </>
            ) : 'Browse by Topic'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => {
              const isActive = tag === activeTag;
              const postCount = posts.filter(p => p.tags.includes(tag)).length;
              return (
                <Link
                  key={tag}
                  href={isActive ? '/blog' : `/blog?tag=${encodeURIComponent(tag)}`}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md'
                      : getTagVariant(tag)
                  }`}
                >
                  {tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  <span className={`opacity-60 text-[10px] ${isActive ? 'text-white/70' : ''}`}>({postCount})</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative bg-gradient-to-br from-[#FF6B35] via-gray-900 to-[#1a365d] dark:from-[#FF6B35]/90 dark:via-gray-950 dark:to-[#0f1a2e] rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to plan a trip your kids will love?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Browse 29+ hand-picked destinations with age-specific filters, safety ratings, and real parent stories.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg active:scale-[0.98]"
            >
              <Compass size={18} />
              Explore Destinations
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <SiteFooter />
    </>
  );
}
