import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShoppingCart,
  Camera,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Store,
  DollarSign,
  Rocket,
  HelpCircle,
  Star,
  ChevronRight,
  Clock,
  Target,
  Globe,
  Sparkles,
  Zap,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  Bot,
  ImageIcon,
  Package,
  Phone,
  Shield,
  Lightbulb,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getRelatedPosts } from '@/lib/blog-data';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'AI for E-Commerce in Asia (2026) — Top Tools & Strategies | Apifeny AI',
  description:
    'A complete guide to AI tools for e-commerce in Asian markets: product photography, chatbots, inventory forecasting, marketing personalization, marketplace optimization, and more. Built for SMB owners in Singapore, Malaysia, Thailand, Philippines, Vietnam, and Indonesia.',
  keywords: [
    'AI for e-commerce Asia',
    'AI e-commerce tools',
    'AI product photography',
    'AI chatbot e-commerce',
    'AI inventory forecasting',
    'AI marketing e-commerce',
    'AI for Shopee sellers',
    'AI for Lazada sellers',
    'AI for Tokopedia',
    'e-commerce AI tools Singapore',
    'e-commerce AI tools Malaysia',
    'e-commerce AI tools Thailand',
    'e-commerce AI tools Philippines',
    'e-commerce AI tools Vietnam',
    'e-commerce AI tools Indonesia',
    'AI repricing tools',
    'AI product listing optimization',
    'WhatsApp AI chatbot e-commerce',
    'TikTok Shop AI ads',
    'Ramadan e-commerce AI',
    'Lunar New Year e-commerce AI',
    '11.11 AI tools',
    'multi-language AI e-commerce',
    'AI customer service Asia',
    'AI demand forecasting Asia',
    'AI marketplace seller tools',
    'e-commerce automation AI',
    'AI for small e-commerce business Asia',
    'cheap AI tools e-commerce Asia',
    'AI product visuals Southeast Asia',
    'Apifeny e-commerce guide',
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/ai-ecommerce-asia`,
  },
  openGraph: {
    title: 'AI for E-Commerce in Asia (2026) — Top Tools & Strategies',
    description:
      'Complete guide to AI tools for e-commerce in Singapore, Malaysia, Thailand, Philippines, Vietnam, and Indonesia. Product photography, chatbots, inventory, marketing, marketplace optimization.',
    url: `${BASE_URL}/guides/ai-ecommerce-asia`,
    type: 'article',
    locale: 'en_US',
    siteName: 'Apifeny AI',
    images: [
      {
        url: `${BASE_URL}/og/ai-ecommerce-asia.jpg`,
        width: 1200,
        height: 630,
        alt: 'AI for E-Commerce in Asia — Top Tools & Strategies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for E-Commerce in Asia (2026) — Top Tools & Strategies',
    description:
      'Complete guide to AI tools for e-commerce across Southeast Asia — product photography, chatbots, inventory, marketing, and marketplace optimization.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Sections ────────────────────────────────────────────────────────

const sections = [
  {
    id: 'why-matters',
    icon: ShoppingCart,
    title: '1. Why E-Commerce AI Matters in Asia',
    color: 'bg-blue-50 dark:bg-blue-950/30',
    text: [
      `Asia's e-commerce landscape is fundamentally different from the West. While Amazon dominates globally, Asian shoppers navigate a fragmented ecosystem of super-apps, marketplaces, and social commerce platforms. This complexity is exactly where AI delivers the most value.`,
      `Consider these realities for Asian e-commerce sellers:`,
      `• Multi-language customers – A Singapore-based seller might serve customers in English, Chinese, Malay, and Tamil — sometimes in a single day. AI translation and multi-language chatbots handle this effortlessly.`,
      `• Super-app ecosystem – Shoppers in Southeast Asia spend most of their time inside Grab, Shopee, Lazada, Gojek, and Line. AI tools that integrate with these platforms give you direct access to where customers already shop.`,
      `• Payment diversity – From GrabPay and ShopeePay to bank transfers and cash-on-delivery (still 30-40% of transactions in Vietnam and Philippines), AI payment reconciliation tools save massive manual effort.`,
      `• Seasonal demand spikes – Ramadan Bazaar in Malaysia, Lunar New Year across Chinese communities, Songkran in Thailand, 12.12, 11.11 Singles' Day — AI demand forecasting helps you stock right and avoid overstock.`,
      `• Social commerce dominance – TikTok Shop in Indonesia hit $6 billion+ in GMV in 2025. Livestream commerce across Shopee Live, LazLive, and TikTok requires AI-powered product tagging, real-time captions, and personalized recommendations.`,
      `The bottom line: AI tools for Asian e-commerce handle complexity that would take a team of 5-10 humans to manage manually. For SMBs, AI is the only scalable way to compete with larger players.`,
    ],
    tools: ['chatgpt', 'perplexity', 'qwen'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Draft product descriptions in multiple Asian languages' },
      { name: 'Qwen', slug: 'qwen', note: 'Alibaba cloud AI — strong multilingual Asian support' },
    ],
  },
  {
    id: 'product-photography',
    icon: ImageIcon,
    title: '2. AI Product Photography & Visuals for Asian Markets',
    color: 'bg-purple-50 dark:bg-purple-950/30',
    text: [
      `Product photography is the #1 conversion driver in e-commerce — but professional shoots are expensive and slow. AI image generation tools now let SMBs create studio-quality product photos, model shots, and lifestyle imagery without a photographer.`,
      `For Asian markets specifically, AI product photography shines in these use cases:`,
      `• Model diversity – Generate product shots with Asian models representing different Southeast Asian ethnicities, skin tones, and traditional attires for regional campaigns (Batik patterns, Songket, Ao Dai, Barong Tagalog).`,
      `• Ramadan and Hari Raya visuals – Generate festive product imagery with ketupat, crescent moons, and traditional decorations for the Ramadan season — a massive e-commerce period in Malaysia and Indonesia.`,
      `• Lunar New Year campaigns – Red packets, Mandarin oranges, lantern motifs — AI can generate hundreds of CNY variations for your product catalog in minutes.`,
      `• Background replacement – Remove distracting backgrounds and replace with clean studio, tropical beach, or night market scenes that resonate with Asian shoppers.`,
      `• Size-inclusive product visualization – Show your products on diverse body types without hiring multiple models.`,
      `Top AI product photography tools include Leonardo AI for fine-grained control over Asian aesthetic elements, and Midjourney for high-quality lifestyle imagery. Canva AI is the most accessible free option with built-in Asian-themed templates.`,
    ],
    tools: ['midjourney', 'leonardo-ai', 'canva-ai'],
    affiliateSuggestions: [
      { name: 'Canva AI', slug: 'canva-ai', note: 'Asian templates and AI design — free tier available' },
      { name: 'Leonardo AI', slug: 'leonardo-ai', note: '150 free daily credits, strong for product imagery' },
    ],
  },
  {
    id: 'chatbots-customer-service',
    icon: MessageSquare,
    title: '3. AI Chatbots & Customer Service in Asian Languages',
    color: 'bg-green-50 dark:bg-green-950/30',
    text: [
      `Customer service is the biggest operational cost for e-commerce SMBs. Asian customers expect fast responses in their local language across multiple chat apps — WhatsApp, Line, Shopee Chat, Lazada Chat, Facebook Messenger, and Telegram.`,
      `AI chatbots purpose-built for Asian markets now handle:`,
      `• Multi-platform integration – One AI agent connected to WhatsApp Business API, Line Official Account, and marketplace chat simultaneously. Customers never leave their preferred app.`,
      `• Multi-language switching – Detect language automatically and respond in Thai, Vietnamese, Indonesian, Malay, Chinese, or English. The best tools maintain context across language switches within the same conversation.`,
      `• Order tracking & status – Integrate with logistics providers (J&T, Ninja Van, DHL eCommerce, Flash Express) to provide real-time tracking without human intervention.`,
      `• Return & refund handling – AI guides customers through return policies specific to Shopee, Lazada, or Tokopedia — which all have different rules.`,
      `• Product recommendations based on chat context – "I'm looking for a gift for my mother during CNY" triggers AI to suggest relevant products with festive packaging options.`,
      `• Escalation with full context – When a human agent takes over, the AI provides a complete conversation summary in both languages.`,
      `ChatGPT (custom GPT) and Intercom AI (Fin) are strong options for building custom e-commerce chatbot workflows. For WhatsApp-native e-commerce, intercom's WhatsApp integration is the premium choice.`,
    ],
    tools: ['intercom-ai', 'chatgpt', 'qwen'],
    affiliateSuggestions: [
      { name: 'Intercom AI', slug: 'intercom-ai', note: 'WhatsApp Business API with AI — $39/mo' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Custom GPT for FAQ automation — $20/mo' },
    ],
  },
  {
    id: 'inventory-forecasting',
    icon: Package,
    title: '4. AI Inventory & Demand Forecasting for Asian Retailers',
    color: 'bg-amber-50 dark:bg-amber-950/30',
    text: [
      `Inventory management in Asian e-commerce is uniquely challenging due to seasonal demand patterns that differ from Western markets. AI demand forecasting tools help you stock the right products at the right time for peak seasons.`,
      `Key Asian seasonal events that impact inventory:`,
      `• Lunar New Year (Jan/Feb) – Red-themed products, gift boxes, premium food items, new clothing. Demand spikes 2-3x for festive categories.`,
      `• Ramadan & Hari Raya (Mar/Apr) – The biggest shopping season in Indonesia and Malaysia. Food, fashion, home decor, and travel items see massive demand. AI forecasting helps you stock 2 months in advance.`,
      `• 11.11 Singles' Day (Nov 11) – The world's largest shopping event. Originated in China but now dominates all of Southeast Asia. AI optimizes inventory allocation across Shopee, Lazada, and TikTok Shop.`,
      `• 12.12 and year-end sales (Dec) – Thailand and Philippines see their biggest discounts during 12.12, followed by Christmas and New Year shopping.`,
      `• Back-to-School (May-Jun) – Philippines, Thailand, and Malaysia have school season product demand spikes.`,
      `• Songkran (Thai New Year, Apr) – Water-related products, travel items, and summer fashion surge in Thailand.`,
      `AI tools analyze historical sales data, market trends, weather patterns, and social media signals to predict demand with 85%+ accuracy. This means 30-40% less dead stock and 20% fewer stockouts.`,
      `For Asian retailers without dedicated data teams, ChatGPT with custom instructions can perform basic demand analysis on your sales data, while enterprise tools like Perplexity provide market trend research.`,
    ],
    tools: ['perplexity', 'chatgpt', 'gemini'],
    affiliateSuggestions: [
      { name: 'Perplexity', slug: 'perplexity', note: 'Research seasonal trends and competitors — $20/mo' },
      { name: 'Gemini', slug: 'gemini', note: 'Free AI with massive context for data analysis' },
    ],
  },
  {
    id: 'marketing-personalization',
    icon: TrendingUp,
    title: '5. AI Marketing & Personalization',
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    text: [
      `Marketing in Asian e-commerce means managing multiple platforms, local languages, diverse customer preferences, and rapidly changing trends. AI marketing tools automate personalization at a scale that would require an entire marketing team.`,
      `Key AI marketing applications for Asian e-commerce:`,
      `• Shopee & Lazada AI ads – Both platforms now offer AI-powered ad optimization: Smart Targeting for Shopee and A+ Ads for Lazada. These auto-adjust bids, targeting, and creative elements.`,
      `• TikTok Shop AI campaigns – TikTok's AI ad tools auto-generate video ads from product images, add trending music and captions in local languages, and target by shopping behavior.`,
      `• Personalized email & WhatsApp campaigns – AI segments customers by purchase history, browsing behavior, and regional preferences. Send Lunar New Year offers to Chinese shoppers, Hari Raya promos to Malay customers, and Christmas deals to English-speaking audiences — all automated.`,
      `• Dynamic pricing for marketplaces – AI monitors competitor pricing on Shopee and Lazada and adjusts your prices automatically to maintain the Best Price badge without sacrificing margins.`,
      `• Product recommendation engines – AI cross-sells and up-sells based on Asian purchase patterns: "Customers who bought this Baju Kurung also bought these songkoks" or "Bought the Xiaomi phone → recommend screen protector + wireless earbuds bundle."`,
      `• Social listening for e-commerce – Monitor mentions on TikTok, Instagram, and Facebook to identify trending products in your region before competitors do.`,
      `ChatGPT, Claude, and Gemini all support multi-language ad copy generation. Canva AI is excellent for creating platform-specific ad creatives with local cultural context.`,
    ],
    tools: ['chatgpt', 'claude', 'canva-ai'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Multi-language ad copy and campaigns — $20/mo' },
      { name: 'Claude', slug: 'claude', note: 'Long-form campaign strategy and analysis' },
    ],
  },
  {
    id: 'marketplace-sellers',
    icon: Store,
    title: '6. AI for Marketplace Sellers (Shopee, Lazada, Tokopedia)',
    color: 'bg-rose-50 dark:bg-rose-950/30',
    text: [
      `Selling on Shopee, Lazada, and Tokopedia requires constant optimization — product listings, pricing, ads, reviews, and customer service all need daily attention. AI marketplace tools automate the heavy lifting so you can focus on growth.`,
      `AI tools for marketplace sellers in Asia:`,
      `• Product listing optimization – AI analyzes top-performing listings in your category and suggests optimized titles, bullet points, and descriptions in the local marketplace language. For Shopee Malaysia: optimize for Bahasa Malaysia AND English keywords.`,
      `• Automated keyword research – AI scrapes search terms from Shopee, Lazada, and Tokopedia to find high-volume, low-competition keywords in local languages. Essential for product title SEO on marketplaces.`,
      `• AI repricing – Monitor competitor prices in real-time and auto-adjust your pricing to maintain competitive positioning on Shopee and Lazada. Some tools offer "minimum profit threshold" safeguards.`,
      `• Review analysis & response – AI reads every product review across all your listings, generates sentiment reports ("35% of negative reviews mention shipping delay"), and drafts responses in the customer's language.`,
      `• AI image optimization for marketplaces – Generate marketplace-optimized product images with the right aspect ratios (Shopee: 1:1, Lazada: 3:4) and SEO-friendly filenames.`,
      `• Bulk product listing – AI auto-generates listings from a spreadsheet: create titles, descriptions, specifications, and images for 100+ products in under an hour.`,
      `• Chat automation for marketplaces – Integrate AI with Shopee Chat and Lazada Chat to auto-answer common questions about sizing, shipping, and returns directly within the marketplace app.`,
      `While dedicated marketplace AI tools exist, ChatGPT combined with marketplace APIs covers most needs for SMBs. Qwen (Alibaba) has strong integration potential with Lazada specifically.`,
    ],
    tools: ['chatgpt', 'qwen', 'perplexity'],
    affiliateSuggestions: [
      { name: 'Qwen', slug: 'qwen', note: 'Alibaba ecosystem — strong for Lazada sellers' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Competitor and keyword research' },
    ],
  },
  {
    id: 'pricing-comparison',
    icon: DollarSign,
    title: '7. Pricing & ROI Comparison Table',
    color: 'bg-teal-50 dark:bg-teal-950/30',
    text: [
      `Not all AI tools are created equal — and not every e-commerce business needs the premium option. Here's a practical comparison of AI tools across budget levels, tailored for Asian e-commerce SMBs.`,
    ],
    // No tools here — we have a custom table section
    tools: [],
    affiliateSuggestions: [],
  },
  {
    id: 'faq',
    icon: HelpCircle,
    title: 'FAQ: AI for E-Commerce in Asia',
    color: 'bg-sky-50 dark:bg-sky-950/30',
    text: [],
    tools: [],
    affiliateSuggestions: [],
  },
];

const pricingTableData = [
  {
    category: 'Product Photography',
    freeOption: 'Canva AI (free) — AI design with Asian templates',
    budgetOption: 'Leonardo AI ($0-10/mo) — 150 free daily credits',
    premiumOption: 'Midjourney ($10-60/mo) — highest quality lifestyle imagery',
    roiNotes: 'Save $500-2000/mo on photography',
  },
  {
    category: 'Customer Service Chatbot',
    freeOption: 'ChatGPT ($20/mo) — Custom GPT for FAQ',
    budgetOption: 'Intercom AI Fin ($39/mo) — Multi-platform + WhatsApp',
    premiumOption: 'Custom AI agent ($200-500/mo) — Full Shopify + marketplace integration',
    roiNotes: 'Replace 1-2 support staff ($500-1500/mo each)',
  },
  {
    category: 'Inventory Forecasting',
    freeOption: 'Gemini (free) — Basic demand analysis from sales data',
    budgetOption: 'ChatGPT + spreadsheet ($20/mo) — Custom forecasting prompts',
    premiumOption: 'Enterprise analytics ($100-500/mo) — Real-time ML demand prediction',
    roiNotes: 'Reduce dead stock 30-40% = thousands saved annually',
  },
  {
    category: 'Marketing & Ads',
    freeOption: 'Shopee/Lazada built-in AI ads (platform fees only)',
    budgetOption: 'Canva AI ($13/mo) — Platform-specific ad creatives',
    premiumOption: 'Claude Pro + Canva ($33/mo) — Strategy + execution',
    roiNotes: 'Improve ROAS by 20-40% on average',
  },
  {
    category: 'Marketplace Optimization',
    freeOption: 'ChatGPT ($20/mo) — Bulk listing generation',
    budgetOption: 'ChatGPT + Perplexity ($40/mo) — Listings + keyword research',
    premiumOption: 'Dedicated marketplace AI ($50-200/mo) — Full automation suite',
    roiNotes: 'Save 20-30 hrs/week on listing management',
  },
  {
    category: 'Translation',
    freeOption: 'Google Translate (free) — Basic Asian language support',
    budgetOption: 'DeepL ($9-25/mo) — Most accurate Asian translation',
    premiumOption: 'Qwen API (pay-per-use) — Alibaba cloud AI for marketplace translation',
    roiNotes: 'Essential for multi-market sellers — save $200-500/mo on translators',
  },
];

const faqItems = [
  {
    q: 'Which AI tool should I start with for my e-commerce business?',
    a: 'Start with ChatGPT ($20/mo) — it covers content creation, customer service scripting, basic data analysis, and multi-language translation. It\'s the most versatile starting point. Add Canva AI ($13/mo) next for product visuals and social media graphics. These two tools alone can replace $2,000-3,000/month of agency services.',
  },
  {
    q: 'Can AI help with Shopee and Lazada store optimization?',
    a: 'Absolutely. AI can generate optimized product listings with local keywords, analyze competitor pricing, auto-respond to customer chats, and monitor review sentiment. ChatGPT handles most listing optimization tasks. For deeper integration with Shopee and Lazada\'s internal AI tools (Smart Targeting, A+ Ads), use the platforms\' own advertising AI tools.',
  },
  {
    q: 'How does AI handle multiple Asian languages for my store?',
    a: 'Modern AI tools natively support Chinese (Simplified & Traditional), Malay/Indonesian (Bahasa), Thai, Vietnamese, Tagalog, Japanese, and Korean. ChatGPT, Gemini, and Qwen all handle multi-language conversations. For product listings, generate content in English first, then use AI to translate and localize for each marketplace. DeepL offers the highest accuracy for Asian language translation, especially for formal business content.',
  },
  {
    q: 'Is AI inventory forecasting accurate enough for small businesses?',
    a: 'Yes, even basic AI forecasting using ChatGPT with your historical sales data can achieve 70-80% accuracy for the next 2-4 weeks. That\'s significantly better than manual guesswork. For more sophisticated forecasting, connect your sales data to Google Gemini\'s 1M+ token context window and ask it to identify seasonal patterns and demand trends.',
  },
  {
    q: 'What\'s the cheapest AI setup for a starting e-commerce seller?',
    a: 'Free setup: Canva AI (free tier) for product images + Gemini (free) for content and analysis + Google Translate for multi-language. Budget setup at $33/month: ChatGPT Plus ($20) + Canva Pro ($13). This combination covers product listings, customer service scripts, ad copy, and basic data analysis. Add tools as your revenue grows.',
  },
  {
    q: 'Can AI help with my TikTok Shop and social commerce?',
    a: 'Yes. AI tools can generate TikTok Shop product videos from still images, write video scripts optimized for the TikTok algorithm, auto-caption in local languages, and recommend trending audio tags. For livestream commerce, AI provides real-time chat responses, product tagging, and viewer engagement analytics. Use ChatGPT for scripting and Canva AI for video creation.',
  },
  {
    q: 'How do I choose between AI tools built for Asia vs global tools?',
    a: 'Global tools (ChatGPT, Claude, Canva) are generally more polished, have larger community support, and integrate with more platforms. Asia-native tools (Qwen from Alibaba, DeepSeek, Ernie Bot from Baidu) have stronger Asian language support, local compliance, and better integration with Alibaba ecosystem (Lazada) or WeChat/ByteDance ecosystem. For most SMBs, global tools + a local AI for translation is the sweet spot.',
  },
  {
    q: 'What about data privacy and customer data?',
    a: 'For customer data (chat logs, order history, review data), avoid feeding raw customer data into free-tier AI tools. Use paid plans (ChatGPT Team, Claude Pro) which don\'t train on your data. For marketplace data going through Shopee or Lazada, their AI tools process data within their platform — no additional data sharing. For sensitive pricing and inventory data, consider open-source models via Hugging Face or local inference with tools like Ollama or LM Studio.',
  },
];

export default function AIEcommerceAsiaGuide() {
  // Related blog posts
  const relatedPosts = getRelatedPosts('ai-ecommerce-asia', 3) || [];

  return (
    <div className="min-h-screen bg-tech-900">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: BASE_URL },
          { name: 'Guides', item: `${BASE_URL}/guides` },
          { name: 'AI for E-Commerce in Asia', item: `${BASE_URL}/guides/ai-ecommerce-asia` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "AI for E-Commerce in Asia (2026) — Top Tools & Strategies",
            "description": "A complete guide to AI tools for e-commerce in Asian markets: product photography, chatbots, inventory forecasting, marketing personalization, marketplace optimization, and more.",
            "datePublished": "2026-05-24",
            "dateModified": "2026-05-24",
            "author": { "@type": "Organization", "name": "Apifeny AI" },
            "publisher": { "@type": "Organization", "name": "Apifeny AI", "url": BASE_URL },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/guides/ai-ecommerce-asia` },
            "about": { "@type": "Thing", "name": "AI for e-commerce in Asia" },
            "keywords": "AI for e-commerce Asia, AI product photography, AI chatbot e-commerce, AI inventory forecasting, AI marketplace seller tools, Shopee AI, Lazada AI, Tokopedia AI, TikTok Shop AI, multi-language e-commerce AI",
          }),
        }}
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-tech-900 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Guide &middot; 12 min read
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            AI for E-Commerce in Asia{' '}
            <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
              (2026)
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-tech-200 max-w-3xl mb-6 leading-relaxed">
            Top tools and strategies for e-commerce SMBs in Singapore, Malaysia, Thailand, Philippines,
            Vietnam, and Indonesia. From AI product photography to multi-language chatbots, inventory
            forecasting to marketplace optimization — everything you need to compete with AI.
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-tech-300">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>Updated May 2026</span>
            </div>
            <div className="flex items-center gap-2 text-tech-300">
              <Target className="w-4 h-4 text-rose-400" />
              <span>E-commerce SMBs in ASEAN</span>
            </div>
            <div className="flex items-center gap-2 text-tech-300">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>12 min read</span>
            </div>
          </div>

          {/* Key stats */}
          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2 text-tech-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>8 actionable AI sections</span>
            </div>
            <div className="flex items-center gap-2 text-tech-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Pricing &amp; ROI comparison table</span>
            </div>
            <div className="flex items-center gap-2 text-tech-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>7-day getting-started roadmap</span>
            </div>
            <div className="flex items-center gap-2 text-tech-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>FAQ &amp; tool recommendations</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Table of Contents ───────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-tech-800/50 border border-tech-500/20 rounded-xl p-6 sm:p-8">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-400" />
            What You&apos;ll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2.5 text-sm text-tech-300 hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-tech-800/40"
              >
                <s.icon className="w-4 h-4 shrink-0" />
                {s.title.replace(/^\d+\.\s*/, '')}
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Now Section ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="border-l-4 border-rose-500 bg-rose-500/10 rounded-lg p-6">
          <p className="text-sm text-tech-200 leading-relaxed">
            <strong className="text-rose-400">The Asian e-commerce AI advantage:</strong> Southeast
            Asia&apos;s e-commerce market is projected to exceed <strong>$300 billion GMV by 2027</strong>,
            with AI-adopting SMBs capturing disproportionate market share. Businesses that use AI across
            product photography, customer service, and inventory management report <strong>40% higher
            conversion rates</strong> and <strong>50% lower operational costs</strong> compared to those
            relying on manual processes. The tools in this guide cost <strong>$13-50/month</strong> each
            — less than a single part-time employee.
          </p>
        </div>
      </section>

      {/* ── Content Sections ───────────────────────────────────────── */}
      {sections.map((s) => {
        // Special handling for sections with tables/faq
        if (s.id === 'pricing-comparison') {
          return (
            <section key={s.id} id={s.id} className={`scroll-mt-20 ${s.color} border-y border-gray-200/50 dark:border-gray-800/50`}>
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                    <s.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {s.title}
                  </h2>
                </div>

                {s.text.map((para, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}

                {/* Pricing Table */}
                <div className="mt-8 overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider">Free / Budget</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Mid-Range</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Premium</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">ROI Notes</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {pricingTableData.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              {row.category}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                              <span className="inline-block bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-[10px] font-medium px-2 py-0.5 rounded-full mb-1">Free / Budget</span>
                              <br />
                              {row.freeOption}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                              <span className="inline-block bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-[10px] font-medium px-2 py-0.5 rounded-full mb-1">Mid</span>
                              <br />
                              {row.budgetOption}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                              <span className="inline-block bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 text-[10px] font-medium px-2 py-0.5 rounded-full mb-1">Premium</span>
                              <br />
                              {row.premiumOption}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                              <span className="inline-block bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-[10px] font-medium px-2 py-0.5 rounded-full mb-1">ROI</span>
                              <br />
                              {row.roiNotes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (s.id === 'faq') {
          return (
            <section key={s.id} id={s.id} className={`scroll-mt-20 ${s.color} border-y border-gray-200/50 dark:border-gray-800/50`}>
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                    <s.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    FAQ: AI for E-Commerce in Asia
                  </h2>
                </div>

                <div className="space-y-4">
                  {faqItems.map((faq, i) => (
                    <details
                      key={i}
                      className="group bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.q}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 group-open:rotate-90" />
                      </summary>
                      <div className="px-5 pb-5">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // Default section rendering
        return (
          <section key={s.id} id={s.id} className={`scroll-mt-20 ${s.color} border-y border-gray-200/50 dark:border-gray-800/50`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                  <s.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {s.title}
                </h2>
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
                {s.text.map((para, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>

              {/* Recommended Tools */}
              {s.tools.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Recommended Tools for This Category
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {s.tools.map((slug) => {
                      const tool = toolsData.find((t: any) => t.slug === slug);
                      if (!tool) return null;
                      return (
                        <ToolCard
                          key={slug}
                          tool={tool as any}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Affiliate CTA */}
              {s.affiliateSuggestions.length > 0 && (
                <div className="mt-8 p-5 bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Try These Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {s.affiliateSuggestions.map((a) => {
                      const tool = toolsData.find((t: any) => t.slug === a.slug);
                      if (!tool) return null;
                      const link = (tool as any).affiliateUrl || (tool as any).url || `https://apifeny.ai/tools/${a.slug}`;
                      return (
                        <a
                          key={a.slug}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-full px-3 py-1.5 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
                        >
                          {a.name}
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* ── Getting Started in 7 Days ──────────────────────────────── */}
      <section id="getting-started" className="scroll-mt-20 bg-sky-50 dark:bg-sky-950/30 border-y border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
              <Rocket className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              8. Getting Started in 7 Days
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            Implementing AI for your e-commerce business doesn&apos;t need to be overwhelming.
            Here&apos;s a practical 7-day roadmap for Asian e-commerce SMBs to get started with
            AI tools immediately.
          </p>

          <div className="space-y-6">
            {/* Day 1 */}
            <div className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-700 dark:text-green-400 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Day 1: Set Up AI Product Photography</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sign up for <strong>Canva AI</strong> (free) or <strong>Leonardo AI</strong> (150 free daily credits).
                    Take 10 product photos, remove backgrounds, add studio lighting. For Marketplace:
                    create 1:1 images for Shopee and 3:4 images for Lazada.
                    <em className="block mt-1 text-gray-500 dark:text-gray-500">Time: 30 min | Cost: Free</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-700 dark:text-green-400 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Day 2: Optimize Product Listings with AI</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use <strong>ChatGPT</strong> or <strong>Gemini</strong> to rewrite your top 10 product listings.
                    Ask AI to optimize titles for Shopee/Lazada keywords in local languages.
                    Generate bullet points, enhanced descriptions, and SEO-friendly metadata.
                    <em className="block mt-1 text-gray-500 dark:text-gray-500">Time: 1 hour | Cost: Free-$20/mo</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Day 3 */}
            <div className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-700 dark:text-green-400 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Day 3: Set Up Customer Service AI</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create a custom ChatGPT assistant with your FAQ, shipping policy, return policy,
                    and product catalog. Test responses in English, Bahasa, Thai, and Vietnamese.
                    For WhatsApp-native stores: explore Intercom AI Fin integration.
                    <em className="block mt-1 text-gray-500 dark:text-gray-500">Time: 2 hours | Cost: $20-39/mo</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Day 4 */}
            <div className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-700 dark:text-green-400 font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Day 4: Launch AI-Powered Ad Campaign</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Set up Shopee Smart Targeting or Lazada A+ Ads for your top 5 products.
                    Use <strong>Canva AI</strong> to create ad creatives with local cultural elements.
                    Generate ad copy in 2-3 languages using <strong>ChatGPT</strong>.
                    <em className="block mt-1 text-gray-500 dark:text-gray-500">Time: 1.5 hours | Cost: Ad spend + $13-20/mo</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Day 5 */}
            <div className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-700 dark:text-green-400 font-bold text-sm">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Day 5: Analyze Inventory & Demand</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Export your last 6 months of sales data from Shopee/Lazada. Upload to
                    <strong>Gemini</strong> (free, 1M+ token context). Ask AI to identify seasonal
                    patterns, slow-movers, and optimal reorder quantities. Start planning for
                    the next major shopping event (Ramadan, 11.11, CNY).
                    <em className="block mt-1 text-gray-500 dark:text-gray-500">Time: 1 hour | Cost: Free</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Day 6 */}
            <div className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-700 dark:text-green-400 font-bold text-sm">6</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Day 6: Automate Review Management</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Export all product reviews. Use <strong>Claude</strong> or <strong>ChatGPT</strong>
                    to analyze sentiment, identify common complaints, and draft response templates
                    in local languages. Set up a weekly review analysis routine.
                    <em className="block mt-1 text-gray-500 dark:text-gray-500">Time: 1 hour | Cost: $0-20/mo</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Day 7 */}
            <div className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-700 dark:text-green-400 font-bold text-sm">7</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Day 7: Review, Measure & Scale</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Review your first week: How much time did AI save? Which tools performed best?
                    Check conversion rates on AI-optimized listings vs old ones. Plan next week:
                    add TikTok Shop AI ads, expand to another marketplace, or upgrade your AI tools.
                    Document your AI workflow so you can scale it.
                    <em className="block mt-1 text-gray-500 dark:text-gray-500">Time: 30 min | ROI review</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl">
            <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
              <Lightbulb className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
              <strong>7-day total investment:</strong> $13-59/month in tools, approximately 7 hours
              setup time. Expected ROI from Week 2 onward: 15-20 hours saved per week,
              20-40% improvement in conversion rates, and significantly faster customer response times.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="border-t border-tech-500/10 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative rounded-2xl bg-gradient-to-br from-rose-500/10 via-orange-500/5 to-tech-800 border border-tech-500/30 p-8 sm:p-12">
            <ShoppingCart className="w-10 h-10 text-rose-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to Transform Your E-Commerce Store with AI?
            </h2>
            <p className="text-tech-300 max-w-xl mx-auto mb-6 leading-relaxed">
              Browse our curated directory of AI tools vetted for Asian e-commerce businesses.
              Compare features, pricing, and find the perfect tools for your Shopee, Lazada,
              or TikTok Shop store.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5"
              >
                Browse All AI Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-rose-500/30 hover:text-white transition-all"
              >
                Browse by Category
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Blog Posts ─────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-tech-500/10 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="w-5 h-5 text-rose-400" />
              <h2 className="text-2xl font-bold text-white">Related Guides &amp; Articles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-tech-800/40 border border-tech-500/20 rounded-xl p-6 hover:border-rose-500/30 transition-all"
                >
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {related.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-tech-500/30 text-tech-400">
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-rose-300 transition mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-tech-400 line-clamp-2 mb-3">
                    {related.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-rose-400 group-hover:gap-2 transition-all">
                    Read Article
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Re-explore tools CTA ──────────────────────────────────── */}
      <section className="border-t border-tech-500/10 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-tech-400">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>Explore more AI tools on</span>
            <Link href="/" className="text-rose-400 hover:text-rose-300 font-medium underline underline-offset-4">
              Apifeny AI
            </Link>
            <span className="text-tech-500">&mdash;</span>
            <Link href="/guides" className="text-rose-400 hover:text-rose-300 font-medium underline underline-offset-4">
              All Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ExternalLink({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}