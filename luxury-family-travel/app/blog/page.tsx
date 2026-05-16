import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data';

const BASE_URL = 'https://luxury-family-travel-asia.vercel.app';

export const metadata: Metadata = {
  title: 'Luxury Family Travel Blog & Guides | Premium Family Experiences in Asia',
  description: 'Curated guides and insider tips for luxury family travel across Asia. 5-star resorts, private villas, Michelin dining with kids, and exclusive experiences from our editorially ranked collection.',
  keywords: ['luxury family travel blog', 'premium family experiences Asia', '5-star family resorts', 'luxury travel with children', 'exclusive family getaways', 'Michelin dining with kids', 'private villa Asia'],
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: 'Luxury Family Travel Blog & Guides | Premium Family Experiences in Asia',
    description: 'Curated guides and insider tips for luxury family travel across Asia.',
    url: `${BASE_URL}/blog`,
    siteName: 'Luxury Family Travel Asia',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Luxury Family Travel Asia - Blog & Guides' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Family Travel Blog & Guides',
    description: 'Curated guides and insider tips for luxury family travel across Asia.',
    images: ['/og-image.jpg'],
  },
};

function getTagVariant(tag: string): string {
  const colorMap: Record<string, string> = {
    'comparison': 'bg-blue-100 text-blue-700',
    'asia-travel': 'bg-emerald-100 text-emerald-700',
    'parent-tips': 'bg-amber-100 text-amber-700',
    'family-vacation-planning': 'bg-violet-100 text-violet-700',
    'kid-friendly': 'bg-rose-100 text-rose-700',
    'tripadvisor-alternative': 'bg-indigo-100 text-indigo-700',
    'family-travel-reviews': 'bg-teal-100 text-teal-700',
    'family-travel-tips': 'bg-orange-100 text-orange-700',
    'parent-approved': 'bg-pink-100 text-pink-700',
    'kid-friendly-travel': 'bg-cyan-100 text-cyan-700',
    'travel-planning': 'bg-purple-100 text-purple-700',
    'parent-advice': 'bg-lime-100 text-lime-700',
  };
  return colorMap[tag] || 'bg-gray-100 text-gray-700';
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg ${featured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-0' : ''}`}
    >
      {featured && (
        <div className="relative h-48 md:h-full bg-gray-100 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-sky-100 via-sky-200 to-blue-200 flex items-center justify-center">
            <Compass size={48} className="text-sky-400/60" />
          </div>
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider">
            Featured
          </div>
        </div>
      )}
      <div className="p-6 md:p-8">
        {/* Meta row */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h2 className={`font-bold text-gray-900 group-hover:text-sky-600 transition-colors mb-3 leading-snug ${featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
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
            <span className="text-xs text-gray-400">+{post.tags.length - 4} more</span>
          )}
        </div>

        {/* Read more */}
        <div className="flex items-center gap-1 text-sm font-semibold text-sky-600 group-hover:gap-2 transition-all">
          Read Article
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Family Travel Blog & Guides",
    "description": "Expert guides, honest comparisons, and practical tips for family travel in Asia.",
    "url": `${BASE_URL}/blog`,
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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-200">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">FT</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Family Travel<span className="text-sky-500">.</span>
                </h1>
                <p className="text-sm text-gray-500">Kid-safe directory</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              <Link href="/" className="group text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors relative">
                Destinations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/blog" className="group text-gray-900 font-medium text-sm tracking-wide transition-colors relative">
                Blog
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-sky-500"></span>
              </Link>
              <a href="/#destinations-section" className="group text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors relative">
                Trip Planner
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            <Link
              href="/"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-sky-200 transition-all duration-300 active:scale-95"
            >
              <Compass size={16} />
              Explore Destinations
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ─── BLOG GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <p className="text-gray-500 text-sm mt-1">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1"
          >
            Browse Destinations
            <ArrowRight size={14} />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <Compass size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Coming Soon</h3>
            <p className="text-gray-500 text-sm">We're writing new articles. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured article — full-width with large image */}
            {posts[0] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <BlogCard post={posts[0]} featured />
              </div>
            )}
            {/* Remaining articles — 1-col mobile, 2-col tablet, 3-col desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}

        {/* Topic tags cloud */}
        <div className="mt-16 pt-10 border-t border-gray-200/50">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Browse by Topic</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(posts.flatMap(p => p.tags))).map(tag => (
              <span
                key={tag}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${getTagVariant(tag)}`}
              >
                {tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative bg-gradient-to-br from-[#FF6B35] via-gray-900 to-[#1a365d] rounded-2xl p-8 md:p-12 overflow-hidden animate-gradient-shift">
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
      <footer className="border-t border-gray-200/50 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Compass size={16} className="text-sky-600" />
              <span className="text-sm">Asia Family Travel Directory</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
              <a href="#" className="hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <p className="text-sm text-gray-400">&copy; 2026 Asia Family Travel Directory. Curated by parents, for parents.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
