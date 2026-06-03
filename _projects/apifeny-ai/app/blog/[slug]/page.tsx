import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, User, Sparkles, BookOpen, Layers } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, getRelatedPostsByCategory } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data';
import BlogAffiliateCTA from '../../../components/BlogAffiliateCTA';
import AffiliateCard from '../../../components/AffiliateCard';
import BlogRelatedTools from '../../../components/BlogRelatedTools';
import BlogGeoLinks from '../../../components/BlogGeoLinks';
import BlogPlaybookLinks from '../../../components/BlogPlaybookLinks';
import BlogLandingLinks from '../../../components/BlogLandingLinks';
import BlogPostCrossLinks from '../../../components/BlogPostCrossLinks';
import NewsletterSignup from '../../../components/NewsletterSignup';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQJsonLd from '@/components/FAQJsonLd';
import { extractFaqFromContent } from '@/lib/blog-faq';
import { getAffiliateForTool } from '@/lib/affiliate-links';

const BASE_URL = 'https://apifeny-ai.vercel.app';

function renderContent(content: string): string {
 let html = content
 .replace(/## (.*?)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
 .replace(/### (.*?)$/gm, '<h3 class="text-xl font-bold text-gray-800 mt-8 mb-3">$1</h3>')
 .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
 .replace(/^- (.*?)$/gm, '<li class="text-gray-600 mb-1.5 pl-2">\u2022 $1</li>')
 .replace(/\n\n/g, '</p><p class="text-gray-600 leading-relaxed mb-4">')
 .replace(/\n/g, '<br />');

 html = '<p class="text-gray-600 leading-relaxed mb-4">' + html + '</p>';
 html = html.replace(/<p class="text-gray-600 leading-relaxed mb-4">(<h[23])/g, '$1');
 html = html.replace(/<\/h[23]><br \/><\/p>/g, '</h2>');
 html = html.replace(/<br \/><\/p>/g, '</p>');
 html = html.replace(/<\/li><br \/><\/p>/g, '</li></ul></p>');
 html = html.replace(/<p class="text-gray-600 leading-relaxed mb-4">(<li)/g, '<ul class="space-y-1 mb-4">$1');
 html = html.replace(/<\/p><p class="text-gray-600 leading-relaxed mb-4"><br \/>/g, '</p>');

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
 const categoryRelated = getRelatedPostsByCategory(params.slug, 4);
 const faqEntries = extractFaqFromContent(post.content, post.title, post.tags);

 const breadcrumbItems = [
 { name: 'Home', item: '/' },
 { name: 'Blog', item: '/blog' },
 { name: post.title, item: `/blog/${post.slug}` },
 ];

 return (
 <main className="min-h-screen bg-white">
 <BreadcrumbSchema items={breadcrumbItems} />

 {/* Article */}
 <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 {/* Back link */}
 <Link
 href="/blog"
 className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 transition mb-8"
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
 className="text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200 text-blue-700 bg-blue-50"
 >
 {tag.replace(/-/g, ' ')}
 </span>
 ))}
 </div>

 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
 {post.title}
 </h1>

 {/* Meta */}
 <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 mb-6">
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
 <div className="prose prose-gray max-w-none">
 <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
 </div>

 {/* In-content cross-links to related blog posts */}
 <BlogPostCrossLinks
 currentSlug={post.slug}
 currentTags={post.tags}
 maxLinks={3}
 />

 {/* Affiliate tool recommendations — content-contextual cards */}
 {(() => {
 // Match top AI tools mentioned in post tags
 const toolMap: Record<string, { slug: string; name: string }> = {
 'chatgpt': { slug: 'chatgpt', name: 'ChatGPT' },
 'openai': { slug: 'chatgpt', name: 'ChatGPT' },
 'claude': { slug: 'claude', name: 'Claude' },
 'gemini': { slug: 'gemini', name: 'Gemini' },
 'midjourney': { slug: 'midjourney', name: 'Midjourney' },
 'perplexity': { slug: 'perplexity', name: 'Perplexity' },
 'cursor': { slug: 'cursor', name: 'Cursor' },
 'notion': { slug: 'notion-ai', name: 'Notion AI' },
 'elevenlabs': { slug: 'elevenlabs', name: 'ElevenLabs' },
 'canva': { slug: 'canva-ai', name: 'Canva Magic Studio' },
 'runway': { slug: 'runway', name: 'Runway' },
 'jasper': { slug: 'jasper', name: 'Jasper' },
 'bolt': { slug: 'bolt-new', name: 'Bolt.new' },
 'devin': { slug: 'devin', name: 'Devin' },
 'deepl': { slug: 'deepl', name: 'DeepL Pro' },
 'windsurf': { slug: 'windsurf', name: 'Windsurf' },
 'copilot': { slug: 'copilot', name: 'GitHub Copilot' },
 'synthesia': { slug: 'synthesia', name: 'Synthesia' },
 'heygen': { slug: 'heygen', name: 'HeyGen' },
 'replit': { slug: 'replit-agent', name: 'Replit Agent' },
 'firecrawl': { slug: 'firecrawl', name: 'FireCrawl' },
 };

 const lowerTags = post.tags.map(t => t.toLowerCase());
 const matched = Object.entries(toolMap).find(([key]) =>
 lowerTags.some(t => t === key || t.startsWith(key) || t.includes(key))
 );
 const matchedTool = matched ? matched[1] : null;
 const hasAffiliate = matchedTool ? getAffiliateForTool(matchedTool.slug) : null;

 return matchedTool && hasAffiliate ? (
 <div className="mt-8 mb-4">
 <AffiliateCard
 toolSlug={matchedTool.slug}
 toolName={matchedTool.name}
 variant="default"
 />
 </div>
 ) : null;
 })()}

 {/* Affiliate CTA */}
 <BlogAffiliateCTA
 postSlug={post.slug}
 postTags={post.tags}
 postTitle={post.title}
 />
 </article>

 {/* Cross-links to strategic landing pages */}
 <BlogLandingLinks postTags={post.tags} />

 {/* Related AI Tools */}
 <BlogRelatedTools
 postTitle={post.title}
 postTags={post.tags}
 />

 {/* Geo-specific cross-links */}
 <BlogGeoLinks
 postSlug={post.slug}
 postTags={post.tags}
 />

 {/* Blog → Playbooks cross-links */}
 <BlogPlaybookLinks
 postTags={post.tags}
 />

 <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 {/* Bottom Tags */}
 <div className="pt-8 border-t border-gray-200">
 <div className="flex flex-wrap items-center gap-2">
 <Tag className="w-4 h-4 text-gray-400" />
 {post.tags.map((tag) => (
 <span
 key={tag}
 className="text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 bg-gray-50"
 >
 {tag.replace(/-/g, ' ')}
 </span>
 ))}
 </div>
 </div>
 </article>

 {/* Continue Reading — Category-based related posts */}
 {categoryRelated.length > 0 && (
 <section className="border-t border-gray-200 bg-gray-50/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="flex items-center gap-2 mb-8">
 <BookOpen className="w-5 h-5 text-blue-600" />
 <h2 className="text-2xl font-bold text-gray-900">Continue Reading</h2>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
 {categoryRelated.map(({ post: related, category }) => (
 <Link
 key={related.slug}
 href={`/blog/${related.slug}`}
 className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all hover:shadow-md flex flex-col"
 >
 {/* Category label */}
 {category && (
 <span className="self-start inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50 mb-3">
 <Layers className="w-2.5 h-2.5" />
 {category.title.length > 28 ? category.title.substring(0, 26) + '\u2026' : category.title}
 </span>
 )}

 <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition mb-2 line-clamp-2">
 {related.title}
 </h3>

 <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
 {related.excerpt}
 </p>

 <div className="flex items-center gap-1 text-xs text-blue-600 group-hover:gap-2 transition-all mt-auto">
 Read Article
 <ArrowRight className="w-3 h-3" />
 </div>
 </Link>
 ))}
 </div>
 </div>
 </section>
 )}

      {/* Newsletter CTA */}
      <div className="border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <NewsletterSignup source={`blog-${post.slug}`} />
        </div>
      </div>

 {/* FAQ Schema structured data */}
      {faqEntries.length >= 2 && <FAQJsonLd faqs={faqEntries} />}

      {/* Schema structured data */}
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
 </main>
 );
}
