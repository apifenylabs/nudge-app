import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, User, Sparkles, Compass } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog-data';
import { allDestinations } from '@/lib/data';
import type { BlogPost } from '@/lib/blog-data';
import BlogAdSlots from './BlogAdSlots';
import BlogBookingCTA from './BlogBookingCTA';
import SiteFooter from '@/components/SiteFooter';
import ReadingProgress from '@/components/ReadingProgress';
import SocialShare from '@/components/SocialShare';

const BASE_URL = 'https://familytravelasia.com';

// Build a lookup map from destinations once (avoids iterating on every call)
const destLookup = new Map(allDestinations.map(d => [d.id, `${d.name}, ${d.city}`]));

function getDestinationName(destId: string): string | null {
  return destLookup.get(destId) ?? null;
}

export async function generateStaticParams() {
  const { getAllPosts } = await import('@/lib/blog-data');
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  const title = `${post.title} | Asia Family Travel Directory`;
  const description = post.excerpt.substring(0, 160);
  const familyKeywords = `family travel, ${post.tags.filter(t => !t.includes('family')).slice(0, 4).join(', ')}, Asia family travel, tips for parents traveling Asia`.split(', ').join(', ');

  return {
    title,
    description,
    keywords: `${post.tags.join(', ')}, ${familyKeywords}`,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/blog/${slug}`,
      siteName: 'Asia Family Travel Directory',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.featuredImage ? post.featuredImage : '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.featuredImage ? post.featuredImage : '/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

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

function markdownToHtml(markdown: string): string {
  let html = markdown.replace(
    /\[([^\]]+)\]\(\/destination\/([^)]+)\)/g,
    (_match, text, slug) => {
      const destName = getDestinationName(slug);
      if (destName) {
        return `<a href="/destination/${slug}" class="text-sky-600 hover:text-sky-700 underline underline-offset-2 decoration-sky-200 hover:decoration-sky-400 transition-colors">${text}</a>`;
      }
      return `<a href="/destination/${slug}" class="text-sky-600 hover:text-sky-700 underline underline-offset-2 decoration-sky-200 hover:decoration-sky-400 transition-colors">${text}</a>`;
    }
  );

  // Process absolute links
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" class="text-sky-600 hover:text-sky-700 underline underline-offset-2 decoration-sky-200 hover:decoration-sky-400 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Process internal links: [text](/)
  html = html.replace(
    /\[([^\]]+)\]\(\/\)/g,
    '<a href="/" class="text-sky-600 hover:text-sky-700 underline underline-offset-2 decoration-sky-200 hover:decoration-sky-400 transition-colors">$1</a>'
  );

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Tables
  html = html.replace(/\|(.+)\|/g, (_match, row) => {
    const cells = row.split('|').map((c: string) => c.trim());
    const isSeparator = cells.every((c: string) => /^[-: ]+$/.test(c));
    if (isSeparator) return '';
    return `<tr>${cells.map((c: string) => `<td class="px-4 py-3 text-sm border-b border-gray-100">${c}</td>`).join('')}</tr>`;
  });

  // Wrap tables
  html = html.replace(
    /(<tr>.*?<\/tr>\n?)+/g,
    '<div class="overflow-x-auto my-6"><table class="w-full min-w-[600px] bg-white rounded-xl border border-gray-200">$&</table></div>'
  );

  // Paragraphs
  html = html.replace(/^(?!<[a-z])(.+)$/gm, (match: string) => {
    const trimmed = match.trim();
    if (!trimmed || trimmed.startsWith('<')) return match;
    if (trimmed.startsWith('|')) return match;
    if (/^\d+\.\s/.test(trimmed)) return `<li class="ml-6 list-decimal text-gray-700 leading-relaxed mb-1">${trimmed.replace(/^\d+\.\s/, '')}</li>`;
    return `<p class="text-gray-700 leading-relaxed mb-4">${trimmed}</p>`;
  });

  html = html.replace(/^- (.+)$/gm, '<li class="ml-6 list-disc text-gray-700 leading-relaxed mb-1">$1</li>');
  html = html.replace(/^---$/gm, '<hr class="my-10 border-gray-200" />');

  return html;
}

function ArticleContent({ content }: { content: string }) {
  const html = markdownToHtml(content);
  return (
    <div className="prose-custom max-w-none">
      <BlogAdSlots position="top" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <BlogAdSlots position="bottom" />
    </div>
  );
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage ? `${BASE_URL}${post.featuredImage}` : `${BASE_URL}/og-image.jpg`,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Asia Family Travel Directory",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/og-image.jpg`,
        "width": 1200,
        "height": 630,
      },
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    "keywords": post.tags.join(', '),
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": post.readingTime,
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE_URL}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      {'faqSchema' in post && post.faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(post.faqSchema) }} />
      )}

      <ReadingProgress />

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
            </nav>

            <Link
              href="/"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-sky-200 transition-all"
            >
              <Compass size={16} />
              Explore Destinations
            </Link>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTagVariant(tag)}`}>
                <Tag size={10} className="mr-1" />
                {tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                <User size={14} className="text-sky-600" />
              </span>
              <span className="font-medium text-gray-700">{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>
        </header>

        {post.featuredImage && (
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose-custom max-w-none">
          <ArticleContent content={post.content} />
        </div>

        <SocialShare title={post.title} slug={slug} />

        <BlogBookingCTA tags={post.tags} />

        {post.relatedDestinations.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Related Destinations</h3>
            <div className="flex flex-wrap gap-3">
              {post.relatedDestinations.map(destId => {
                const name = getDestinationName(destId);
                if (!name) return null;
                return (
                  <Link key={destId} href={`/destination/${destId}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors text-sm font-medium">
                    <Compass size={14} />
                    {name}
                    <ArrowRight size={12} />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}
                  className="group block bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(rp.date)}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{rp.readingTime}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors mb-2 leading-snug">{rp.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
