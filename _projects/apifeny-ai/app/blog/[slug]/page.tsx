import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, User, Sparkles, BookOpen } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data';
import BlogAffiliateCTA from '../../components/BlogAffiliateCTA';

const BASE_URL = 'https://apifeny.ai';

function renderContent(content: string): string {
  // Convert markdown-style content to HTML
  // Bold: **text**
  let html = content
    .replace(/## (.*?)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/### (.*?)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/^- (.*?)$/gm, '<li class="text-tech-300 mb-1.5 pl-2">• $1</li>')
    .replace(/### (.*?)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-3">$1</h3>')
    .replace(/\n\n/g, '</p><p class="text-tech-300 leading-relaxed mb-4">')
    .replace(/\n/g, '<br />');

  // Wrap in paragraph tags
  html = '<p class="text-tech-300 leading-relaxed mb-4">' + html + '</p>';
  // Remove extra paragraph around h2/h3/lists
  html = html.replace(/<p class="text-tech-300 leading-relaxed mb-4">(<h[23])/g, '$1');
  html = html.replace(/<\/h[23]><br \/><\/p>/g, '</h2>');
  html = html.replace(/<br \/><\/p>/g, '</p>');
  html = html.replace(/<\/li><br \/><\/p>/g, '</li></ul></p>');
  html = html.replace(/<p class="text-tech-300 leading-relaxed mb-4">(<li)/g, '<ul class="space-y-1 mb-4">$1');
  // Fix stray breaks and paragraph wrapping
  html = html.replace(/<\/p><p class="text-tech-300 leading-relaxed mb-4"><br \/>/g, '</p>');

  return html;
}

export async function generateStaticParams() {
  const { getAllPosts } = await import('@/lib/blog-data');
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, 'AI tools', 'Apifeny AI'],
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: 'article',
      siteName: 'Apifeny AI',
      images: [{ url: '/og', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og'],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <div className="min-h-screen bg-tech-900">
      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-tech-400 hover:text-neon-light transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full border border-neon/30 text-neon-light bg-neon/10"
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-tech-400 mb-6">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
        </div>

        {/* Affiliate CTA — monetization block */}
        <BlogAffiliateCTA
          postSlug={post.slug}
          postTags={post.tags}
          postTitle={post.title}
        />

        {/* Bottom Tags */}
        <div className="pt-8 border-t border-tech-500/20">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-tech-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full border border-tech-500/30 text-tech-300 bg-tech-800/50"
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="border-t border-tech-500/20 bg-tech-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="w-5 h-5 text-neon" />
            <h2 className="text-2xl font-bold text-white">Related Guides</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group bg-tech-800/40 border border-tech-500/20 rounded-xl p-6 hover:border-neon/30 transition-all"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {related.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-tech-500/30 text-tech-400">
                      {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-white group-hover:text-neon-light transition mb-2 line-clamp-2">
                  {related.title}
                </h3>
                <p className="text-sm text-tech-400 line-clamp-2 mb-3">
                  {related.excerpt}
                </p>
                <div className="flex items-center gap-1 text-xs text-neon-light group-hover:gap-2 transition-all">
                  Read Guide
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "articleBody": post.content.substring(0, 5000),
            "datePublished": post.date,
            "dateModified": post.date,
            "author": { "@type": "Person", "name": post.author },
            "publisher": { "@type": "Organization", "name": "Apifeny AI", "url": BASE_URL },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` },
            "keywords": post.tags.join(", "),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE_URL}/blog/${post.slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
