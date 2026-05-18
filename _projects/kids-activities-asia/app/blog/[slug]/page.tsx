import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog-data';
import BlogBookingCTA from '@/components/BlogBookingCTA';
import type { Metadata } from 'next';
import type { BlogPost } from '@/lib/blog-data';

interface Props {
  params: { slug: string };
}

const BASE_URL = 'https://kids-activities-asia.vercel.app';

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  'parent-tips': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'activities': { bg: 'bg-orange-100', text: 'text-orange-700' },
  'safety': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'reviews': { bg: 'bg-green-100', text: 'text-green-700' },
  'travel': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'education': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'birthday-parties': { bg: 'bg-pink-100', text: 'text-pink-700' },
  'classes': { bg: 'bg-teal-100', text: 'text-teal-700' },
  'comparisons': { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  'seasonal': { bg: 'bg-red-100', text: 'text-red-700' },
};

const TAG_LABELS: Record<string, string> = {
  'parent-tips': 'Parent Tips',
  'activities': 'Activities',
  'safety': 'Safety',
  'reviews': 'Reviews',
  'travel': 'Travel',
  'education': 'Education',
  'birthday-parties': 'Birthday Parties',
  'classes': 'Classes',
  'comparisons': 'Comparisons',
  'seasonal': 'Seasonal',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Kids Activities Asia`,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt.slice(0, 160),
    },
  };
}

function PostCard({ post }: { post: BlogPost }) {
  const tagColor = TAG_COLORS[post.tags[0]] || TAG_COLORS['activities'];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="h-36 bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl opacity-50">🎪</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          {post.tags.slice(0, 2).map(tag => {
            const tc = TAG_COLORS[tag] || TAG_COLORS['activities'];
            return (
              <span key={tag} className={`text-xs font-medium ${tc.bg} ${tc.text} px-2 py-0.5 rounded-full`}>
                {TAG_LABELS[tag] || tag}
              </span>
            );
          })}
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors text-sm leading-snug mb-1">
          {post.title}
        </h3>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(post.date)}
        </span>
      </div>
    </Link>
  );
}

function ArticleContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-gray max-w-none
        prose-headings:text-gray-900 prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
        prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1 prose-ul:mb-5
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-1 prose-ol:mb-5
        prose-li:text-gray-700
        prose-img:rounded-xl prose-img:my-8 prose-img:w-full prose-img:shadow-md
        prose-blockquote:border-l-4 prose-blockquote:border-orange-300
        prose-blockquote:bg-orange-50 prose-blockquote:py-2 prose-blockquote:px-5
        prose-blockquote:text-gray-700 prose-blockquote:not-italic
        prose-hr:border-gray-100 prose-hr:my-10"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

function JsonLdScripts({ post }: { post: BlogPost }) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt.slice(0, 160),
    image: post.imageUrl || `${BASE_URL}/og-image.jpg`,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Kids Activities Asia',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kids Activities Asia',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <>
      <JsonLdScripts post={post} />
      <article className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-medium text-sm mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Blog
      </Link>

      {/* Article Header */}
      <header className="mb-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => {
            const tc = TAG_COLORS[tag] || TAG_COLORS['activities'];
            return (
              <span
                key={tag}
                className={`text-xs font-medium ${tc.bg} ${tc.text} px-2.5 py-1 rounded-full`}
              >
                {TAG_LABELS[tag] || tag}
              </span>
            );
          })}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {post.author && (
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          )}
        </div>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="mt-8 -mx-4 md:mx-0">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl md:rounded-2xl shadow-md"
            />
          </div>
        )}
      </header>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-orange-200 via-yellow-200 to-transparent mb-10" />

      {/* Article Body */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 lg:p-12">
        <ArticleContent content={post.content} />

        {/* Affiliate CTA — tag-matched booking partners */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <BlogBookingCTA post={post} />
        </div>
      </div>

      {/* Post Footer */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 py-6 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => {
              const tc = TAG_COLORS[tag] || TAG_COLORS['activities'];
              return (
                <span
                  key={tag}
                  className={`text-xs font-medium ${tc.bg} ${tc.text} px-2 py-0.5 rounded-full`}
                >
                  {TAG_LABELS[tag] || tag}
                </span>
              );
            })}
          </div>
        </div>
        <Link
          href="/blog"
          className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-1"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px flex-1 bg-gray-100" />
            <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap px-4">
              Related Articles
            </h2>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(related => (
              <PostCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-100 p-8 md:p-10 text-center mt-8">
        <span className="text-4xl block mb-4">💌</span>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Love This Article?</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-5">
          Get more parenting tips, activity guides, and family travel inspiration 
          delivered straight to your inbox.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
        >
          Browse Activities
        </Link>
      </section>
    </article>
    </>
  );
}
