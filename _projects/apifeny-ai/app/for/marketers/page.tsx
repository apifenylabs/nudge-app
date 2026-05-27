import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingUp,
  BarChart3,
  Search,
  PenTool,
  Share2,
  Mail,
  Palette,
  Zap,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone,
  DollarSign,
  Shield,
  Sparkles,
  Target,
  LineChart,
  Video,
  Rocket,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import type { Playbook } from '@/lib/playbooks';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'Best AI Marketing Tools for Asian Markets (2026) — SEO, Content, Social | Apifeny AI',
  description:
    'Curated AI marketing tools tested for Asian markets. SEO, content, social media, email, design, analytics — with multi-language support, local pricing, and WeChat/LINE ready.',
  keywords: [
    'AI marketing tools',
    'AI tools for marketers',
    'best AI marketing tools Asia',
    'AI marketing tools 2026',
    'AI SEO tools Asia',
    'AI content marketing tools',
    'AI social media management Asia',
    'Chinese marketing AI tools',
    'AI tools for digital marketers',
    'AI advertising tools Asia',
    'marketing automation AI',
    'AI copywriting tools Asia',
    'WeChat marketing AI tools',
    'LINE marketing automation',
    'content marketing AI Southeast Asia',
    'AI SEO tools for Asian markets',
    'best marketing AI for small business Asia',
    'multilingual AI marketing tools',
  ],
  alternates: { canonical: `${BASE_URL}/for/marketers` },
  openGraph: {
    title: 'Best AI Marketing Tools for Asian Markets 2026 | Apifeny AI',
    description:
      '30+ hand-picked AI marketing tools tested for Asia. SEO, content, social, email, design & analytics — all with multi-language support & local pricing.',
    url: `${BASE_URL}/for/marketers`,
    siteName: 'Apifeny AI',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Marketing Tools for Asian Markets 2026 | Apifeny AI',
    description:
      '30+ hand-picked AI marketing tools tested for Asian markets. Multi-language, local pricing, WeChat/LINE ready.',
    images: ['/og'],
  },
};

// ── Marketer-specific tool picks ──
const MARKETER_TOOL_SLUGS = [
  'chatgpt',
  'claude',
  'perplexity',
  'semrush',
  'ahrefs',
  'surferseo',
  'jasper',
  'copy-ai',
  'canva',
  'canva-magic-studio',
  'midjourney',
  'heygen',
  'descript',
  'fireflies-ai',
  'notion-ai',
  'zapier-central',
  'make',
  'n8n',
  'elevenlabs',
  'murf-ai',
  'synthesia',
  'pika',
  'dify',
  'coze',
  'deepseek',
  'gemini',
];

const CATEGORIES = [
  {
    slug: 'seo-rankings',
    title: 'SEO & Rankings',
    icon: <Search className="w-5 h-5" />,
    color: 'from-blue-600/20 to-blue-900/10',
    border: 'border-blue-500/30',
    textColor: 'text-blue-300',
    tools: ['semrush', 'ahrefs', 'surferseo', 'perplexity', 'chatgpt'],
    blogPosts: [
      { slug: 'ai-seo-tools-asian-markets', label: 'AI SEO Tools for Asia' },
      { slug: 'best-ai-writing-tools-bloggers-2026', label: 'AI Writing for SEO' },
    ],
  },
  {
    slug: 'content-copywriting',
    title: 'Content & Copywriting',
    icon: <PenTool className="w-5 h-5" />,
    color: 'from-emerald-600/20 to-emerald-900/10',
    border: 'border-emerald-500/30',
    textColor: 'text-emerald-300',
    tools: ['jasper', 'copy-ai', 'chatgpt', 'claude', 'gemini', 'deepseek', 'notion-ai'],
    blogPosts: [
      { slug: 'ai-for-content-creation-asia-strategy', label: 'AI Content Strategy for Asia' },
      { slug: 'best-ai-writing-tools-bloggers-2026', label: 'Best AI Writing Tools' },
    ],
  },
  {
    slug: 'social-media',
    title: 'Social Media & Community',
    icon: <Share2 className="w-5 h-5" />,
    color: 'from-purple-600/20 to-purple-900/10',
    border: 'border-purple-500/30',
    textColor: 'text-purple-300',
    tools: ['canva', 'canva-magic-studio', 'midjourney', 'pika', 'chatgpt', 'claude'],
    blogPosts: [
      { slug: 'ai-social-media-management-asia-2026', label: 'AI Social Media in Asia' },
      { slug: 'ai-image-generation-tools-marketers-asia', label: 'AI Images for Marketing' },
    ],
  },
  {
    slug: 'video-audio',
    title: 'Video & Audio Marketing',
    icon: <Video className="w-5 h-5" />,
    color: 'from-pink-600/20 to-pink-900/10',
    border: 'border-pink-500/30',
    textColor: 'text-pink-300',
    tools: ['heygen', 'synthesia', 'descript', 'elevenlabs', 'murf-ai', 'pika'],
    blogPosts: [
      { slug: 'ai-video-marketing-tools-asia-2026', label: 'AI Video for Asian Markets' },
      { slug: 'best-ai-video-generators-marketers', label: 'Best AI Video Generators' },
    ],
  },
  {
    slug: 'email-automation',
    title: 'Email & Marketing Automation',
    icon: <Mail className="w-5 h-5" />,
    color: 'from-yellow-600/20 to-yellow-900/10',
    border: 'border-yellow-500/30',
    textColor: 'text-yellow-300',
    tools: ['zapier-central', 'make', 'n8n', 'dify', 'coze', 'notion-ai'],
    blogPosts: [
      { slug: 'ai-email-marketing-small-business-asia', label: 'AI Email Marketing' },
      { slug: 'ai-automation-workflows-marketers', label: 'Marketing Automation Workflows' },
    ],
  },
  {
    slug: 'analytics-insights',
    title: 'Analytics & Intelligence',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'from-orange-600/20 to-orange-900/10',
    border: 'border-orange-500/30',
    textColor: 'text-orange-300',
    tools: ['perplexity', 'browse-ai', 'firecrawl', 'claude', 'notion-ai'],
    blogPosts: [
      { slug: 'ai-competitor-analysis-tools-asia', label: 'AI Competitor Analysis' },
      { slug: 'ai-business-analytics-tools-asia', label: 'AI Business Analytics' },
    ],
  },
  {
    slug: 'design-brand',
    title: 'Design & Branding',
    icon: <Palette className="w-5 h-5" />,
    color: 'from-teal-600/20 to-teal-900/10',
    border: 'border-teal-500/30',
    textColor: 'text-teal-300',
    tools: ['canva', 'canva-magic-studio', 'midjourney', 'gamma', 'leonardo-ai'],
    blogPosts: [
      { slug: 'best-ai-image-generators-compared-2026', label: 'Best AI Image Generators' },
      { slug: 'ai-image-generators-asian-marketing', label: 'Asian Marketing with AI Images' },
    ],
  },
  {
    slug: 'localized-marketing',
    title: 'Localized & Multi-Language',
    icon: <Globe className="w-5 h-5" />,
    color: 'from-cyan-600/20 to-cyan-900/10',
    border: 'border-cyan-500/30',
    textColor: 'text-cyan-300',
    tools: ['deepseek', 'gemini', 'heygen', 'chatgpt', 'claude', 'elevenlabs'],
    blogPosts: [
      { slug: 'ai-content-localization-asia-guide', label: 'AI Localization for Asia' },
      { slug: 'ai-translation-marketing-tools-asia', label: 'AI Translation for Marketers' },
    ],
  },
];

// Marketer-specific playbooks
const MARKETER_PLAYBOOK_SLUGS = [
  'marketing-strategy',
  'competitor-analysis',
  'social-media-automation',
  'content-repurposing',
  'email-automation-workflow',
  'ai-sales-pitch',
  'customer-support-automation',
];

export default function MarketersPage() {
  const marketerPlaybooks = playbooks.filter((p: Playbook) =>
    MARKETER_PLAYBOOK_SLUGS.includes(p.slug)
  );

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-tech-700/30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-emerald-600/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-neon" />
            <span className="text-neon font-semibold text-sm uppercase tracking-wider">For Marketers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Best AI Marketing Tools for{' '}
            <span className="bg-gradient-to-r from-purple-400 to-neon-light bg-clip-text text-transparent">
              Asian Markets
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-tech-300 max-w-3xl leading-relaxed mb-8">
            Marketing in Asia means multi-language, super-app ecosystems, and regional compliance &mdash; generic
            tool lists won't cut it. These <strong className="text-white">curated AI marketing tools</strong> are
            tested for SEO, content, social, email, and video in Chinese, Japanese, Korean, Thai, and Vietnamese
            markets. <strong className="text-white">All with local pricing, WeChat/LINE readiness, and Asian data compliance.</strong>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#categories"
              className="inline-flex items-center gap-2 bg-neon text-gray-950 font-semibold px-6 py-3 rounded-xl hover:bg-neon-light transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Browse by Category
            </Link>
            <Link
              href="#comparison"
              className="inline-flex items-center gap-2 border border-tech-600 text-tech-200 font-medium px-6 py-3 rounded-xl hover:border-neon/50 hover:text-white transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              Compare Top Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-tech-700/30 bg-tech-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '25+', label: 'Curated Tools', icon: <Zap className="w-4 h-4" /> },
              { value: '8', label: 'Marketing Categories', icon: <BarChart3 className="w-4 h-4" /> },
              { value: '7', label: 'Playbooks', icon: <Rocket className="w-4 h-4" /> },
              { value: '$0-150', label: 'Monthly Budget', icon: <DollarSign className="w-4 h-4" /> },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-neon-light">{stat.icon}</span>
                <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-tech-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Index */}
      <section id="categories" className="border-b border-tech-700/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Tools by Marketing Category
          </h2>
          <p className="text-tech-300 max-w-2xl mb-10 leading-relaxed">
            Every tool on this page is selected for marketers in Asian markets &mdash; SEO for Baidu and Naver,
            social for WeChat and LINE, content for CJK characters, and analytics that respect PDPA/PDPO/PIPA.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={`#cat-${cat.slug}`}
                className={`block bg-gradient-to-br ${cat.color} border ${cat.border} rounded-xl p-5 hover:scale-[1.02] transition-all group`}
              >
                <div className={`flex items-center gap-2 mb-2 ${cat.textColor}`}>
                  {cat.icon}
                  <h3 className="font-bold text-white">{cat.title}</h3>
                </div>
                <p className="text-sm text-tech-400 mb-3">
                  {cat.tools.length} tools &middot; {cat.blogPosts.length} guides
                </p>
                <span className="text-xs text-neon-light group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                  Explore {cat.title}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="border-b border-tech-700/30 bg-tech-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Quick Comparison: Top AI Marketing Tools for Asia
          </h2>
          <p className="text-tech-300 max-w-3xl mb-8">
            Side-by-side comparison of leading AI marketing tools with Asian market readiness scores.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-tech-700/40">
                  <th className="py-3 px-4 text-tech-300 font-semibold">Tool</th>
                  <th className="py-3 px-4 text-tech-300 font-semibold">Category</th>
                  <th className="py-3 px-4 text-tech-300 font-semibold">Asia Score</th>
                  <th className="py-3 px-4 text-tech-300 font-semibold">CJK</th>
                  <th className="py-3 px-4 text-tech-300 font-semibold">Pricing</th>
                  <th className="py-3 px-4 text-tech-300 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tool: 'Semrush', slug: 'semrush', cat: 'SEO', asia: '8/10', cjk: 'Yes', price: '$$$', best: 'Keyword research, competitor SEO, Baidu tracking' },
                  { tool: 'Ahrefs', slug: 'ahrefs', cat: 'SEO', asia: '8/10', cjk: 'Yes', price: '$$$', best: 'Backlink analysis, content gap, domain authority' },
                  { tool: 'SurferSEO', slug: 'surferseo', cat: 'SEO', asia: '7/10', cjk: 'Partial', price: '$$', best: 'AI content optimization for rankings' },
                  { tool: 'Jasper', slug: 'jasper', cat: 'Content', asia: '6/10', cjk: 'Partial', price: '$$', best: 'Branded content, ad copy, marketing funnels' },
                  { tool: 'Copy.ai', slug: 'copy-ai', cat: 'Content', asia: '6/10', cjk: 'Partial', price: '$-$$', best: 'Go-to-market copy, multilingual landing pages' },
                  { tool: 'HeyGen', slug: 'heygen', cat: 'Video', asia: '10/10', cjk: 'Yes', price: '$$', best: 'AI video avatars with Chinese/Japanese/Korean voice' },
                  { tool: 'Canva', slug: 'canva-magic-studio', cat: 'Design', asia: '9/10', cjk: 'Yes', price: '$-$$', best: 'Social media graphics, WeChat posts, LINE stickers' },
                  { tool: 'DeepSeek', slug: 'deepseek', cat: 'Content', asia: '9/10', cjk: 'Native', price: '$', best: 'Chinese content, cost-effective bulk writing' },
                  { tool: 'Gemini', slug: 'gemini', cat: 'Research', asia: '10/10', cjk: 'Native', price: 'Free', best: 'Market research, localization, Google ecosystem' },
                  { tool: 'Zapier Central', slug: 'zapier-central', cat: 'Automation', asia: '6/10', cjk: 'Partial', price: '$$', best: 'Multi-platform marketing automation' },
                ].map((row) => (
                  <tr key={row.slug} className="border-b border-tech-700/20 hover:bg-tech-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <Link href={`/tool/${row.slug}`} className="text-white font-medium hover:text-neon-light transition-colors">
                        {row.tool}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-tech-300">{row.cat}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        parseInt(row.asia) >= 9 ? 'text-green-400' :
                        parseInt(row.asia) >= 7 ? 'text-yellow-400' : 'text-tech-400'
                      }`}>{row.asia}</span>
                    </td>
                    <td className="py-3 px-4 text-tech-300">{row.cjk}</td>
                    <td className="py-3 px-4 text-tech-400 text-xs">{row.price}</td>
                    <td className="py-3 px-4 text-tech-400 text-xs max-w-[200px]">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Category Detail Sections */}
      {CATEGORIES.map((cat) => (
        <section
          key={cat.slug}
          id={`cat-${cat.slug}`}
          className="border-b border-tech-700/20 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-3 mb-2">
              <span className={cat.textColor}>{cat.icon}</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{cat.title}</h2>
            </div>

            <p className="text-tech-400 max-w-2xl mb-6 leading-relaxed">
              {cat.slug === 'seo-rankings' && 'SEO tools that work for Baidu, Naver, Google Asia, and Yandex. Keywords in CJK, domain authority tracking for .cn/.jp/.kr/.tw, and local search intent analysis.'}
              {cat.slug === 'content-copywriting' && 'Create marketing copy, blog posts, ad text, and landing pages at scale. Tools tested for Chinese, Japanese, Korean, Thai, and Vietnamese content creation.'}
              {cat.slug === 'social-media' && 'Design social posts, schedule content, and manage communities across WeChat, LINE, Facebook, Instagram, TikTok, and Xiaohongshu (RED).'}
              {cat.slug === 'video-audio' && 'Generate AI avatars that speak Asian languages naturally. Perfect for Chinese, Japanese, Korean, and Southeast Asian video content and voiceovers.'}
              {cat.slug === 'email-automation' && 'Build email sequences, marketing automation flows, and chatbot funnels. With Asian payment gateways, super-app integration, and PDPA compliance.'}
              {cat.slug === 'analytics-insights' && 'Competitor analysis, market research, consumer sentiment tracking, and web scraping &mdash; all optimized for Asian markets.'}
              {cat.slug === 'design-brand' && 'Brand assets, social media graphics, product images, and presentation design with multi-language text support and Asian aesthetic templates.'}
              {cat.slug === 'localized-marketing' && 'Translate, localize, and adapt marketing content across 10+ Asian languages. Voiceovers, subtitles, and culturally adapted ad creative.'}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {cat.tools.map((toolSlug) => {
                const tool = toolsData[toolSlug];
                if (!tool) {
                  const fallbackName = toolSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <Link
                      key={toolSlug}
                      href={`/tool/${toolSlug}`}
                      className="bg-tech-800/40 border border-tech-700/30 rounded-xl p-4 hover:border-neon/30 transition-all group"
                    >
                      <h3 className="font-semibold text-white group-hover:text-neon-light transition-colors mb-1">
                        {fallbackName}
                      </h3>
                    </Link>
                  );
                }
                return (
                  <Link
                    key={toolSlug}
                    href={`/tool/${toolSlug}`}
                    className="bg-tech-800/40 border border-tech-700/30 rounded-xl p-4 hover:border-neon/30 transition-all group"
                  >
                    <h3 className="font-semibold text-white group-hover:text-neon-light transition-colors mb-1">
                      {tool.name || tool.title || toolSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </h3>
                    {tool.tagline && (
                      <p className="text-sm text-tech-400 line-clamp-2">{tool.tagline}</p>
                    )}
                    {typeof tool.asia_score === 'number' && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <Globe className="w-3 h-3 text-neon-light" />
                        <span className="text-xs text-tech-500">
                          Asia Score: {tool.asia_score}/10 &middot; {tool.pricing_tier || ''}
                        </span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>

            {cat.blogPosts.length > 0 && (
              <div className="mt-8 pt-6 border-t border-tech-700/20">
                <h4 className="text-sm font-semibold text-tech-400 uppercase tracking-wider mb-3">
                  Related Guides
                </h4>
                <div className="flex flex-wrap gap-3">
                  {cat.blogPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm text-tech-300 bg-tech-800/30 border border-tech-700/30 rounded-lg px-3 py-1.5 hover:text-neon-light hover:border-neon/30 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {post.label}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Blog Posts */}
      <section className="border-b border-tech-700/30 bg-tech-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-neon" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Asia-Focused Marketing Guides
            </h2>
          </div>
          <p className="text-tech-300 mb-8 max-w-2xl">
            Deep-dive guides and tutorials written specifically for digital marketers targeting Asian consumers.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { slug: 'ai-seo-tools-asian-markets', title: 'AI SEO Tools for Asia', excerpt: 'How to rank on Baidu, Naver, and Google Asia using AI-powered SEO tools. Keyword research in CJK, local link building, and compliance.' },
              { slug: 'ai-social-media-management-asia-2026', title: 'AI Social Media in Asia', excerpt: 'Manage WeChat, LINE, Xiaohongshu, TikTok, and Instagram with AI. Content scheduling, auto-reply, and community analytics.' },
              { slug: 'ai-email-marketing-small-business-asia', title: 'AI Email Marketing', excerpt: 'Automated email sequences that convert in Asian markets. With LINE and WeChat push notification integration.' },
              { slug: 'ai-image-generation-tools-marketers-asia', title: 'AI Images for Asian Marketing', excerpt: 'Create culturally relevant visuals for Asian campaigns. Chinese New Year, Ramadan, Lunar-themed branding.' },
              { slug: 'ai-video-marketing-tools-asia-2026', title: 'AI Video Marketing in Asia', excerpt: 'Generate AI avatars speaking Cantonese, Mandarin, Korean, Japanese, Thai. Video ads that convert across SEA.' },
              { slug: 'ai-content-localization-asia-guide', title: 'AI Content Localization', excerpt: 'Localize marketing content for 10+ Asian markets. WeChat mini-programs to LINE official accounts.' },
              { slug: 'ai-competitor-analysis-tools-asia', title: 'AI Competitor Analysis', excerpt: 'Track competitor activity across Asian markets with AI &mdash; pricing, ad creatives, content strategy.' },
              { slug: 'ai-business-analytics-tools-asia', title: 'AI Business Analytics', excerpt: 'Dashboards tracking KPIs across Asian markets. Sentiment analysis, trend detection, market intelligence.' },
              { slug: 'ai-advertising-tools-asia-2026', title: 'AI Advertising in Asia', excerpt: 'Programmatic ad optimization for Asian platforms: JD.com, Shopee, Lazada, LINE Ads, WeChat Moments.' },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-tech-800/40 border border-tech-700/30 rounded-xl p-5 hover:border-neon/30 transition-all"
              >
                <h3 className="font-semibold text-white group-hover:text-neon-light transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-tech-400 line-clamp-2 mb-3">{post.excerpt}</p>
                <span className="text-xs text-neon-light group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                  Read Guide
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Playbooks */}
      <section className="border-b border-tech-700/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="w-5 h-5 text-neon" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Marketing Playbooks
            </h2>
          </div>
          <p className="text-tech-300 mb-8 max-w-2xl">
            Step-by-step playbooks for real marketing workflows &mdash; competitor analysis, social media automation,
            content repurposing, email sequences, and more. Copy-paste ready for Asian markets.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketerPlaybooks.map((p: Playbook) => (
              <Link
                key={p.slug}
                href={`/playbooks/${p.slug}`}
                className="group bg-gradient-to-br from-tech-800/50 to-tech-900/50 border border-tech-700/30 rounded-xl p-5 hover:border-neon/30 transition-all"
              >
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  p.difficulty === 'Beginner'
                    ? 'bg-green-500/10 text-green-300 border border-green-500/30'
                    : p.difficulty === 'Intermediate'
                    ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/30'
                    : 'bg-red-500/10 text-red-300 border border-red-500/30'
                }`}>
                  {p.difficulty}
                </span>
                <h3 className="font-semibold text-white mt-2 mb-1 group-hover:text-neon-light transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-tech-400 line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-1 text-xs text-tech-500 mt-3">
                  <Clock className="w-3 h-3" />
                  <span>{p.read_time_minutes} min</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-1.5 text-sm text-tech-300 hover:text-neon-light transition-colors"
            >
              View all playbooks ({playbooks.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Asia */}
      <section className="border-b border-tech-700/30 bg-tech-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Why Asian Marketers Need Different AI Tools
          </h2>
          <p className="text-tech-300 max-w-3xl mb-8 leading-relaxed">
            Marketing in Asia is fundamentally different from the West. It's not just about language &mdash;
            it's about platform ecosystems, payment preferences, cultural nuance, and regulatory landscapes.
            Here's why generic AI marketing tools often fail, and what to look for instead.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Globe className="w-5 h-5" />, title: 'Multi-Platform Reality',
                desc: "You're not just on social media &mdash; you're on WeChat, LINE, KakaoTalk, Zalo, Grab, Shopee, Lazada, and Xiaohongshu simultaneously. Your AI tools must connect to these ecosystems, not just Facebook and Instagram." },
              { icon: <Smartphone className="w-5 h-5" />, title: 'Super-App Marketing',
                desc: "WeChat isn't just chat &mdash; it's e-commerce, payments, mini-programs, advertising, and CRM rolled into one. LINE does the same in Japan/Thailand/Taiwan. Your automation stack needs super-app connectors." },
              { icon: <DollarSign className="w-5 h-5" />, title: 'Local Pricing Reality',
                desc: "USD-based subscriptions hurt Asian marketing teams. Prioritize tools with regional pricing, free tiers that don't expire, or payment via local gateways like PayNow, GCash, FPX, and GrabPay." },
              { icon: <Shield className="w-5 h-5" />, title: 'Data Compliance',
                desc: "PDPA (SG), PDPO (HK), PIPA (KR), Personal Information Protection Law (CN), and Thailand's PDPA. Your analytics tools must store and process data in-region for compliance." },
            ].map((item) => (
              <div key={item.title} className="bg-tech-800/40 border border-tech-700/30 rounded-xl p-5">
                <span className="text-neon-light block mb-2">{item.icon}</span>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-tech-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* ── BLOG CROSS-LINKS ── */}
      <BlogCategoryLinks
        slugs={['marketing', 'content-creation', 'ai-tools']}
        heading="Marketing & Content Guides"
      />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-br from-neon/10 to-purple-600/10 border border-neon/20 rounded-2xl p-8 sm:p-12">
          <Sparkles className="w-8 h-8 text-neon mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Build Your Marketing Stack?
          </h2>
          <p className="text-tech-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Pick one category above, read the recommended guide, and try one tool this week.
            Most have free tiers &mdash; you can start for $0 and scale as you grow.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/best-ai-tools"
              className="inline-flex items-center gap-2 bg-neon text-gray-950 font-semibold px-6 py-3 rounded-xl hover:bg-neon-light transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Browse All Tools
            </Link>
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-2 border border-tech-600 text-tech-200 font-medium px-6 py-3 rounded-xl hover:border-neon/50 hover:text-white transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Marketing Playbooks
            </Link>
            <Link
              href="/for/solopreneurs"
              className="inline-flex items-center gap-2 border border-tech-600 text-tech-200 font-medium px-6 py-3 rounded-xl hover:border-neon/50 hover:text-white transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              For Solopreneurs
            </Link>
          </div>
        </div>
      </section>

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'For Marketers', item: `${BASE_URL}/for/marketers` },
            ],
          }),
        }}
      />
      {/* CollectionPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Best AI Marketing Tools for Asian Markets (2026)',
            description: 'Curated AI marketing tools tested for Asian markets. SEO, content, social, email, design & analytics with multi-language support.',
            url: `${BASE_URL}/for/marketers`,
            about: {
              '@type': 'Thing',
              name: 'AI marketing tools for Asian markets',
            },
          }),
        }}
      />
    </main>
  );
}