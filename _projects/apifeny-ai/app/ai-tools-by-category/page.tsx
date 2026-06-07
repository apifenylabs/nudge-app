import { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, type CategoryInfo } from '@/lib/category-data';
import { toolsData } from '@/lib/data';
import { Sparkles, Search, ArrowRight } from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata: Metadata = {
 title: 'AI Tools by Category — Find & Compare Best AI Tools 2026 | Apifeny AI',
 description: 'Browse 100+ AI tools organized by category. Compare chatbots, coding assistants, design tools, marketing AI, and more. Detailed reviews, pricing, and Asia-readiness scores.',
 openGraph: {
 title: 'AI Tools by Category — Find & Compare Best AI Tools 2026',
 description: 'Browse 100+ AI tools organized by category. Compare features, pricing, and Asia-readiness.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-by-category',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'AI Tools by Category — Find & Compare Best AI Tools 2026',
 description: 'Browse 100+ AI tools organized by category. Compare features, pricing, and Asia-readiness.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-by-category',
 },
};

export default function AIToolsByCategoryPage() {
 const categories = Object.values(CATEGORIES);

 // Featured categories with most tools
 const featuredCategories = ['code-development', 'writing-content', 'chatbots-assistants', 'image-generation', 'marketing-seo', 'ai-agents'];

 const searchIntentMap: Record<string, string> = {
 'chatbots-assistants': '💬 "What is the best AI chatbot?"',
 'code-development': '⚡ "Which AI coding assistant is best?"',
 'writing-content': '✍️ "Best AI writer for my content"',
 'image-generation': '🎨 "What is the best AI image generator?"',
 'video-animation': '📹 "Best AI video maker for creators"',
 'marketing-seo': '📈 "AI for marketing done right"',
 'design-creative': '🎨 "AI design tools for non-designers"',
 'data-analytics': '📊 "Analyze data with AI"',
 'ai-agents': '🤖 "Autonomous AI agents compared"',
 'productivity': '⏱️ "Get more done with AI"',
 'audio-voice': '🎙️ "Best AI voice tools for Asia"',
 'no-code-automation': '🔄 "Automate without code"',
 'research-analysis': '🔍 "Research with AI assistants"',
 };

 const totalTools = Object.keys(toolsData).length;

 const faqSchema = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'What are the best AI chatbots and assistants?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: 'The best AI chatbots include ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), and DeepSeek. Compare them on features, pricing, and Asian language support at Apifeny AI.',
 },
 },
 {
 '@type': 'Question',
 name: 'Which AI coding assistant is best for developers?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: 'GitHub Copilot, Cursor, and Claude are the top AI coding assistants. Cursor leads for IDE-integrated development, while Copilot is best for VS Code users. Claude excels at complex code reasoning.',
 },
 },
 {
 '@type': 'Question',
 name: 'What AI tools work best for Asian markets?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: 'Many AI tools now support Asian languages and markets. DeepSeek and Qwen excel at Chinese, while ChatGPT and Claude support Japanese, Korean, and Southeast Asian languages. Check our Asia-readiness scores on each tool page.',
 },
 },
 {
 '@type': 'Question',
 name: 'Are there free AI tools worth using?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: 'Yes — ChatGPT Free, Claude Free, Gemini, and Perplexity offer capable free tiers. Open-source options like Ollama and Stable Diffusion are completely free. Compare free vs paid at Apifeny AI.',
 },
 },
 {
 '@type': 'Question',
 name: 'How do I choose the right AI tool for my workflow?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: 'Start by defining your primary need (writing, coding, design, research). Browse by category on this page, compare top tools in each category by features and pricing, and check our community playbooks for real-world use cases.',
 },
 },
 ],
 };

 return (
 <>
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'AI Tools by Category', item: '/ai-tools-by-category' },
 ]}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
 />
 <main className="min-h-screen bg-white">
 {/* ── HERO ────────────────────────────────────────── */}
 <section className="relative overflow-hidden border-b border-gray-200/30">
 <div className="absolute inset-0 bg-gradient-to-b from-neon-900/10 via-transparent to-transparent pointer-events-none" />
 <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
 <div className="mb-4">
 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon/20 bg-neon/5 text-xs text-neon-light tracking-wider uppercase">
 <Sparkles className="w-3 h-3" />
 {totalTools}+ Tools Catalogued
 </span>
 </div>
 <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
 AI Tools{' '}
 <span className="bg-gradient-to-r from-neon-light to-aqua-light bg-clip-text text-transparent">
 by Category
 </span>
 </h1>
 <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mb-8">
 Stop searching. We&apos;ve organized <strong className="text-gray-900">{totalTools}+ AI tools</strong> into
 13 categories — each with real community ratings, affiliate offers,
 and Asia-readiness scores. Find the right tool in 2 minutes.
 </p>
 {/* Quick nav pills */}
 <div className="flex flex-wrap gap-2">
 {featuredCategories.map((slug) => {
 const cat = CATEGORIES[slug];
 if (!cat) return null;
 return (
 <a
 key={slug}
 href={`#cat-${slug}`}
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300/50 bg-gray-100 text-sm text-gray-700 hover:border-neon/30 hover:text-neon-light transition-all"
 >
 <span>{cat.icon}</span>
 <span>{cat.name}</span>
 </a>
 );
 })}
 <a
 href="#all-categories"
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-sm text-neon-light hover:bg-neon/10 transition-all"
 >
 <span>All 13 Categories</span>
 <ArrowRight className="w-3 h-3" />
 </a>
 </div>
 </div>
 </section>

 {/* ── ALL CATEGORIES GRID ─────────────────────────── */}

 <section id="all-categories" className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
 <div className="mb-12">
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
 All AI Tool Categories
 </h2>
 <p className="text-gray-600 max-w-2xl">
 Each category contains hand-picked tools with detailed reviews, pricing comparisons,
 and Asia-readiness analysis. Click any category to explore.
 </p>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {categories.map((cat: CategoryInfo) => {
 const toolCount = Object.values(toolsData).filter(
 (t) => 'category' in t && t.category === cat.slug
 ).length;
 const intent = searchIntentMap[cat.slug] || `Best ${cat.name.toLowerCase()} compared`;

 return (
 <Link
 key={cat.slug}
 id={`cat-${cat.slug}`}
 href={`/categories/${cat.slug}`}
 className="group block bg-gradient-to-br from-tech-800/60 to-tech-900/60 border border-gray-200/40 rounded-xl p-5 hover:border-neon/30 hover:shadow-lg hover:shadow-neon/5 transition-all"
 >
 {/* Icon + count */}
 <div className="flex items-center justify-between mb-3">
 <span className="text-2xl">{cat.icon}</span>
 <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{toolCount} tools</span>
 </div>

 <h3 className="text-gray-900 font-semibold text-base mb-1 group-hover:text-neon-light transition-colors">
 {cat.name}
 </h3>
 <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
 {cat.description}
 </p>

 {/* Search intent label */}
 <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto">
 <Search className="w-3 h-3 shrink-0" />
 <span className="truncate">{intent}</span>
 </div>
 </Link>
 );
 })}
 </div>
 </section>

 {/* ── WHY BROWSE BY CATEGORY ─────────────────────── */}
 <section className="border-t border-gray-200/30 py-16 sm:py-20 px-4">
 <div className="max-w-5xl mx-auto">
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
 Why Browse AI Tools by Category?
 </h2>
 <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
 Finding the right AI tool shouldn&apos;t take hours. Here&apos;s how category browsing helps.
 </p>

 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {[
 {
 icon: '🎯',
 title: 'Compare Apples to Apples',
 desc: 'All tools in the same category are benchmarked on the same criteria — features, pricing, performance, and Asia-readiness.',
 },
 {
 icon: '💰',
 title: 'Find Free & Affordable Options',
 desc: 'Not every AI tool costs $20/month. Many have generous free tiers or open-source alternatives. Filter by price.',
 },
 {
 icon: '🌏',
 title: 'Asia-Ready Tools Only',
 desc: 'Every tool has an Asia-readiness score. We flag tools that support Asian languages, local payment methods, and regional hosting.',
 },
 {
 icon: '⭐',
 title: 'Community Ratings & Reviews',
 desc: 'Real users rate each tool. No sponsored rankings — just honest feedback from the Apifeny community.',
 },
 {
 icon: '🔗',
 title: 'Affiliate Deals & Discounts',
 desc: 'Some categories include affiliate offers — meaning you can save money while supporting our independent reviews.',
 },
 {
 icon: '📋',
 title: 'Curated Lists & Comparisons',
 desc: 'Each category has comparison tables, side-by-side feature breakdowns, and curated lists for specific use cases.',
 },
 ].map((item, i) => (
 <div
 key={i}
 className="bg-gray-100 border border-gray-200/30 rounded-xl p-5 hover:border-gray-300/50 transition-all"
 >
 <span className="text-2xl mb-3 block">{item.icon}</span>
 <h3 className="text-gray-900 font-semibold mb-1">{item.title}</h3>
 <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── CROSS-LINK: COUNTRY PAGES ──────────────────── */}
 <section className="border-t border-gray-200/30 py-16 px-4">
 <div className="max-w-5xl mx-auto">
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
 AI Tools by Country
 </h2>
 <p className="text-gray-600 max-w-2xl mx-auto text-center mb-8">
 Find the best AI tools available and popular in your country.
 </p>
 <div className="flex flex-wrap justify-center gap-2">
 {[
 { name: 'Singapore', slug: 'singapore' },
 { name: 'Hong Kong', slug: 'hong-kong' },
 { name: 'Japan', slug: 'japan' },
 { name: 'South Korea', slug: 'south-korea' },
 { name: 'India', slug: 'india' },
 { name: 'Indonesia', slug: 'indonesia' },
 { name: 'Thailand', slug: 'thailand' },
 { name: 'Vietnam', slug: 'vietnam' },
 { name: 'Malaysia', slug: 'malaysia' },
 { name: 'Philippines', slug: 'philippines' },
 { name: 'China', slug: 'china' },
 { name: 'Taiwan', slug: 'taiwan' },
 { name: 'Australia', slug: 'australia' },
 { name: 'New Zealand', slug: 'new-zealand' },
 { name: 'UAE', slug: 'uae' },
 ].map((country) => (
 <Link
 key={country.slug}
 href={`/ai-tools-${country.slug}`}
 className="px-3 py-1.5 rounded-full border border-gray-200/40 bg-gray-100 text-sm text-gray-600 hover:text-neon-light hover:border-neon/20 transition-all"
 >
 {country.name}
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* ── FAQ ─────────────────────────────────────────── */}
 <section className="border-t border-gray-200/30 py-16 px-4">
 <div className="max-w-3xl mx-auto">
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
 Frequently Asked Questions
 </h2>
 <div className="space-y-4 mt-8">
 {faqSchema.mainEntity.map((faq, i) => (
 <details
 key={i}
 className="group bg-gray-100 border border-gray-200/40 rounded-xl overflow-hidden"
 >
 <summary className="px-5 py-4 text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between list-none">
 <span>{faq.name}</span>
 <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2">
 ▼
 </span>
 </summary>
 <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-200/30 pt-3">
 {faq.acceptedAnswer.text}
 </div>
 </details>
 ))}
 </div>
 </div>
 </section>

 {/* ── CTA ─────────────────────────────────────────── */}
 <section className="border-t border-gray-200/30 py-16 px-4">
 <div className="max-w-3xl mx-auto text-center">
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
 Can&apos;t Find What You&apos;re Looking For?
 </h2>
 <p className="text-gray-600 mb-6 max-w-lg mx-auto">
 Browse all tools alphabetically, check our detailed playbooks, or submit your own tool recommendation.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
 <Link
 href="/tools"
 className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold hover:shadow-lg hover:shadow-neon/20 transition-all"
 >
 Browse All Tools
 </Link>
 <Link
 href="/categories"
 className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:border-neon/30 hover:text-neon-light transition-all"
 >
 View Category Grid
 </Link>
 <Link
 href="/submit"
 className="px-6 py-3 rounded-xl text-gray-600 hover:text-white transition-all text-sm"
 >
 Submit a Tool
 </Link>
 </div>
 </div>
 </section>
 </main>
 </>
 );
}
