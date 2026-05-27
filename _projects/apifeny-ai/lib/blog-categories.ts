// SEO-optimized category definitions for topic cluster pages
export interface BlogCategory {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  tags: string[];  // Tags that map to this category
  postCount: number;
}

const categories: BlogCategory[] = [
  {
    slug: 'ai-tools',
    title: 'AI Tools Reviews & Guides',
    description: 'Curated reviews and practical guides for the best AI tools across every category — coding, writing, design, marketing, and more. Find the right tool for your workflow.',
    seoTitle: 'Best AI Tools Reviews & Guides (2026) | Apifeny AI',
    seoDescription: 'Expert reviews and practical guides for the best AI tools in 2026. Compare coding assistants, writing tools, design apps, marketing platforms, and more for Asian solopreneurs.',
    keywords: ['AI tools reviews', 'best AI tools 2026', 'AI tools Asia', 'AI software comparison', 'AI tool guide'],
    tags: ['ai-tools', 'AI-tools', 'best-ai-tools', 'AI SEO', 'AI coding', 'AI-assistants'],
    postCount: 0,
  },
  {
    slug: 'asia',
    title: 'AI Tools for Asia',
    description: 'AI tools and platforms that work specifically for Asian markets, languages, and business environments. From Singapore to Tokyo, find what works locally.',
    seoTitle: 'AI Tools for Asia — Local Solutions for Asian Markets (2026) | Apifeny AI',
    seoDescription: 'Discover AI tools optimized for Asian markets, languages, and business needs. Compare solutions for Singapore, Malaysia, Hong Kong, Japan, Thailand, Indonesia, and the Philippines.',
    keywords: ['AI tools Singapore', 'AI tools Malaysia', 'AI tools Japan', 'AI tools Hong Kong', 'Asia AI solutions'],
    tags: ['asia', 'singapore', 'malaysia', 'japan', 'hong-kong', 'Hong Kong', 'Hong-Kong', 'thailand', 'indonesia', 'vietnam', 'philippines', 'South Korea', 'asia-marketing', 'southeast-asia', 'kuala-lumpur', 'kl', 'china-ai'],
    postCount: 0,
  },
  {
    slug: 'productivity',
    title: 'AI Productivity & Automation',
    description: 'Supercharge your productivity with AI-powered automation tools. Workflows, scheduling, email triage, and time-saving systems for solopreneurs and small teams.',
    seoTitle: 'AI Productivity Tools & Automation Workflows (2026) | Apifeny AI',
    seoDescription: 'Boost your productivity with AI automation tools. Compare workflow automation, scheduling assistants, email triage, and time management tools tested for Asian solopreneurs.',
    keywords: ['AI productivity', 'automation tools', 'workflow automation', 'time management AI', 'AI scheduling'],
    tags: ['productivity', 'automation', 'n8n', 'zapier', 'workflow', 'time-management', 'scheduling'],
    postCount: 0,
  },
  {
    slug: 'solopreneur',
    title: 'AI Tools for Solopreneurs',
    description: 'Practical AI tool stacks for solo business owners operating in Asia. Save time, reduce costs, and automate your one-person operation.',
    seoTitle: 'Best AI Tools for Solopreneurs in Asia (2026) | Apifeny AI',
    seoDescription: 'Curated AI tools and stacks for solopreneurs in Asia. Compare accounting, marketing, automation, and productivity tools that save you 20+ hours per week on a budget.',
    keywords: ['AI for solopreneurs', 'solo business tools', 'AI automation solopreneur', 'budget AI tools', 'freelancer AI tools'],
    tags: ['solopreneur', 'freelance', 'freelancer', 'budget', 'money-saving', 'startup'],
    postCount: 0,
  },
  {
    slug: 'marketing',
    title: 'AI Marketing Tools & Strategy',
    description: 'Market smarter with AI-powered tools for social media, email, content, and SEO. Strategies and tools tested for Asian audiences.',
    seoTitle: 'AI Marketing Tools for Asian Markets (2026) | Apifeny AI',
    seoDescription: 'AI-powered marketing tools and strategies for Asian markets. Compare social media management, email marketing, SEO tools, and content creation platforms for your business.',
    keywords: ['AI marketing', 'social media AI', 'email marketing AI', 'AI SEO tools', 'marketing automation'],
    tags: ['marketing', 'social-media', 'email-marketing', 'seo', 'marketing-automation', 'LinkedIn', 'digital-marketing', 'content-strategy', 'growth'],
    postCount: 0,
  },
  {
    slug: 'coding-development',
    title: 'AI Coding & Development Tools',
    description: 'Build faster with AI coding assistants, no-code platforms, and development tools. Comparisons and guides for developers in Asia.',
    seoTitle: 'Best AI Coding Tools & Assistants (2026) | Apifeny AI',
    seoDescription: 'Compare the best AI coding assistants and development tools in 2026. Cursor vs Copilot vs Windsurf, no-code platforms, and development tools for Asian developers.',
    keywords: ['AI coding tools', 'coding assistants', 'GitHub Copilot', 'Cursor AI', 'AI development tools'],
    tags: ['coding', 'programming', 'development', 'app-building', 'app-development', 'no-code', 'mvp', 'cursor', 'Copilot', 'AI-coding', 'developer-tools', 'website-builders', 'website-design'],
    postCount: 0,
  },
  {
    slug: 'content-creation',
    title: 'AI Content Creation & Writing',
    description: 'Create better content faster with AI writing, image generation, video editing, and design tools. Guides for creators and marketers in Asia.',
    seoTitle: 'AI Content Creation Tools for Asian Creators (2026) | Apifeny AI',
    seoDescription: 'Create content faster with AI writing, image generation, and video editing tools. Compare Midjourney, DALL-E, Canva AI, and writing tools for Asian creators.',
    keywords: ['AI content creation', 'AI writing tools', 'AI image generation', 'AI video editing', 'content creation AI'],
    tags: ['content-creation', 'ai-writing-tools', 'image-generation', 'midjourney', 'adobe-firefly', 'dall-e', 'dalle', 'canva', 'blogging', 'video-creation', 'video-editing', 'video-marketing', 'design', 'AI-design', 'ai-content', 'ai-art', 'content'],
    postCount: 0,
  },
  {
    slug: 'comparisons',
    title: 'AI Tool Comparisons',
    description: 'Head-to-head comparisons of the biggest AI tools. ChatGPT vs Claude, Cursor vs Copilot, Midjourney vs DALL-E — see how they stack up.',
    seoTitle: 'AI Tool Comparisons — Side-by-Side Reviews (2026) | Apifeny AI',
    seoDescription: 'Head-to-head comparisons of popular AI tools. ChatGPT vs Claude vs Gemini, Cursor vs Copilot, Midjourney vs DALL-E, and more. Find the best AI for your needs.',
    keywords: ['AI comparisons', 'ChatGPT vs Claude', 'Cursor vs Copilot', 'AI tool comparison', 'best AI 2026'],
    tags: ['comparison', 'ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'AI-comparison', 'perplexity', 'jasper-ai'],
    postCount: 0,
  },
  {
    slug: 'translation-language',
    title: 'AI Translation & Language Tools',
    description: 'Break language barriers with AI translation, localization, and language learning tools optimized for Asian languages.',
    seoTitle: 'Best AI Translation & Language Tools for Asian Languages (2026) | Apifeny AI',
    seoDescription: 'Compare AI translation and localization tools for Chinese, Japanese, Korean, Thai, Vietnamese, and Bahasa. DeepL vs Gemini, localization workflows, and language learning apps.',
    keywords: ['AI translation', 'language tools', 'Asian languages', 'localization tools', 'DeepL vs Gemini'],
    tags: ['translation', 'localization', 'language-learning', 'asian-languages', 'deepL', 'japanese', 'korean', 'mandarin', 'multilingual', 'bahasa', 'google-translate'],
    postCount: 0,
  },
  {
    slug: 'accounting-finance',
    title: 'AI Accounting & Finance Tools',
    description: 'Manage your business finances with AI accounting, bookkeeping, and tax tools designed for Asian solopreneurs and SMEs.',
    seoTitle: 'Best AI Accounting & Finance Tools for Asia (2026) | Apifeny AI',
    seoDescription: 'AI-powered accounting and finance tools for Asian businesses. Compare Xero, Zoho Books, Wave, QuickBooks, and tax compliance tools for Singapore, Hong Kong, Malaysia, India.',
    keywords: ['AI accounting', 'finance tools', 'bookkeeping AI', 'Asian accounting', 'tax compliance AI'],
    tags: ['accounting', 'finance', 'bookkeeping', 'tax', 'xero', 'zoho-books', 'ai-accounting', 'quickbooks', 'sst', 'business'],
    postCount: 0,
  },
  {
    slug: 'ecommerce',
    title: 'AI for E-Commerce & Retail',
    description: 'Optimize your online store with AI tools for product photography, inventory management, customer service, and sales analytics.',
    seoTitle: 'AI E-Commerce Tools for Asia — Shopee, Lazada & More (2026) | Apifeny AI',
    seoDescription: 'Boost your e-commerce sales with AI tools for product photography, inventory management, customer service chatbots, and sales analytics. Tested for Shopee, Lazada, and Grab.',
    keywords: ['AI e-commerce', 'Shopee AI tools', 'Lazada automation', 'AI product photography', 'e-commerce Asia'],
    tags: ['ecommerce', 'shopee', 'lazada', 'grab', 'product-photography', 'product-images', 'e-commerce Asia', 'inventory management', 'tiktok-shop', 'customer-service', 'chatbots'],
    postCount: 0,
  },
];

export function getAllCategories(): BlogCategory[] {
  return categories;
}

export function getCategoryBySlug(slug: string): BlogCategory | null {
  return categories.find(c => c.slug === slug) || null;
}
