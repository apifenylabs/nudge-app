import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Zap, Calendar, BookOpen, Tag, ArrowLeft, ChevronRight, BadgeCheck, Award, ShieldCheck } from 'lucide-react';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog-data';
import { renderMarkdown } from '@/lib/markdown-render';
import EvBookingCTA from './EvBookingCTA';
import ReadingProgress from '@/components/ReadingProgress';
import SocialShare from '@/components/SocialShare';

interface Props {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  // Pre-render top 30 blog posts to manage memory on free tier
  // Remaining 70+ posts render on-demand via ISR
  const posts = getAllPosts();
  return posts.slice(0, 30).map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} — EV Charging Asia Blog`,
    description: post.excerpt,
  };
}

const BASE_URL = 'https://ev-charging-asia.vercel.app';

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug, 2);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${BASE_URL}/og-image.jpg`,
    "author": {
      "@type": "Person",
      "name": post.author || 'EV Charging Asia'
    },
    "publisher": {
      "@type": "Organization",
      "name": "EV Charging Asia",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/og-image.jpg`,
        "width": 1200,
        "height": 630
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${params.slug}`
    },
    "keywords": (post.tags || []).join(', '),
    "wordCount": (post.content || '').split(/\s+/).length,
    "timeRequired": post.readingTime
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE_URL}/blog/${params.slug}` }
    ]
  };

  const faqSchema = 'faqSchema' in post ? post.faqSchema : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {jsonLdBreadcrumb && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ReadingProgress />
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">EV Charging Asia</span>
          </Link>
          <div className="flex items-center gap-3">
            {/* Visual breadcrumb */}
            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
              <ChevronRight size={10} />
              <Link href="/blog" className="hover:text-gray-700 dark:hover:text-gray-300">Blog</Link>
            </nav>
            <Link href="/blog" className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <ArrowLeft size={14} /> All posts
            </Link>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-md text-[10px] font-medium border border-emerald-200 dark:border-emerald-800/40">
              <BadgeCheck size={10} /> Verified Data
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 rounded-md text-[10px] font-medium border border-sky-200 dark:border-sky-800/40">
              <Award size={10} /> Expert Reviewed
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-md text-[10px] font-medium border border-amber-200 dark:border-amber-800/40">
              <ShieldCheck size={10} /> Up-to-date
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
            <span className="flex items-center gap-1"><BookOpen size={12} />{post.readingTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                <Tag size={10} />{tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-600 font-medium">{post.excerpt}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <div className="prose prose-gray max-w-none text-sm leading-relaxed">
            {renderMarkdown(post.content)}
          </div>
        </div>

        {/* Affiliate CTA — EV rentals, hotels, experiences */}
        <SocialShare title={post.title} slug={params.slug} />
        <EvBookingCTA tags={post.tags} />

        {related.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}
                  className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
                  <div className="text-xs text-gray-400 mb-1">{rp.date}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{rp.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Zap size={16} className="text-green-500" />
            <span className="text-sm">EV Charging Asia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
