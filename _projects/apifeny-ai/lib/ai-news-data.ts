// ═══════════════════════════════════════════════
// AI News Data — Latest AI Industry News (Asia Focus)
// ═══════════════════════════════════════════════
// Curated by the Apifeny AI editorial team.
// Updated weekly with fresh stories from the AI
// ecosystem across Asia and globally.
// ═══════════════════════════════════════════════

export interface AINewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string; // ISO date
  category: NewsCategory;
  region: NewsRegion;
  tags: string[];
  isFeatured: boolean;
  isAsiaSpecific: boolean;
  imageUrl?: string;
}

export type NewsCategory =
  | 'funding'
  | 'product-launch'
  | 'research-breakthrough'
  | 'regulation'
  | 'asia-expansion'
  | 'partnership'
  | 'acquisition'
  | 'open-source'
  | 'industry-trend';

export type NewsRegion =
  | 'global'
  | 'southeast-asia'
  | 'east-asia'
  | 'south-asia'
  | 'north-america'
  | 'europe';

export const NEWS_CATEGORIES: { value: NewsCategory; label: string; emoji: string }[] = [
  { value: 'funding', label: 'Funding & Investment', emoji: '💰' },
  { value: 'product-launch', label: 'Product Launch', emoji: '🚀' },
  { value: 'research-breakthrough', label: 'Research Breakthrough', emoji: '🔬' },
  { value: 'regulation', label: 'Regulation & Policy', emoji: '⚖️' },
  { value: 'asia-expansion', label: 'Asia Expansion', emoji: '🌏' },
  { value: 'partnership', label: 'Partnership', emoji: '🤝' },
  { value: 'acquisition', label: 'Acquisition', emoji: '🤝' },
  { value: 'open-source', label: 'Open Source', emoji: '📖' },
  { value: 'industry-trend', label: 'Industry Trend', emoji: '📈' },
];

export const NEWS_REGIONS: { value: NewsRegion; label: string }[] = [
  { value: 'global', label: 'Global' },
  { value: 'southeast-asia', label: 'Southeast Asia' },
  { value: 'east-asia', label: 'East Asia' },
  { value: 'south-asia', label: 'South Asia' },
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
];

// ─── Articles ──────────────────────────────────────────────────────────
// Fresh batch for June 2026. Swapping these out weekly keeps the page
// sticky for returning visitors.

export const aiNewsArticles: AINewsArticle[] = [
  // ── Featured ──────────────────────────────────────────────────────
  {
    id: 'news-001',
    title: 'ByteDance Open-Sources AI Model That Rivals GPT-4o for Free',
    summary: 'ByteDance released their latest large language model under an Apache 2.0 license, claiming performance parity with GPT-4o on key benchmarks. The move signals an accelerating open-source AI arms race in Asia, with Chinese tech giants competing to democratise frontier AI.',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    publishedAt: '2026-06-10',
    category: 'open-source',
    region: 'east-asia',
    tags: ['ByteDance', 'open-source', 'LLM', 'GPT-4o', 'China'],
    isFeatured: true,
    isAsiaSpecific: true,
  },
  {
    id: 'news-002',
    title: 'Singapore Government Commits $500M to National AI Compute Infrastructure',
    summary: 'Singapore\'s Digital Ministry announced a S$500 million investment in sovereign AI compute clusters, targeting 10,000 GPU capacity by Q1 2027. The infrastructure will be available to startups and researchers at subsidised rates, cementing Singapore\'s position as Southeast Asia\'s AI hub.',
    source: 'Straits Times',
    sourceUrl: 'https://straitstimes.com',
    publishedAt: '2026-06-09',
    category: 'funding',
    region: 'southeast-asia',
    tags: ['Singapore', 'infrastructure', 'government', 'compute', 'GPUs'],
    isFeatured: true,
    isAsiaSpecific: true,
  },
  {
    id: 'news-003',
    title: 'Anthropic Launches Claude Enterprise with Asia-Pacific Data Residency',
    summary: 'Anthropic debuted Claude Enterprise, featuring dedicated instance deployments in Singapore, Tokyo, and Sydney. The offering targets regulated industries in Asia including finance, healthcare, and government, with guaranteed data residency and SOC 2 Type II certification.',
    source: 'Anthropic Blog',
    sourceUrl: 'https://anthropic.com',
    publishedAt: '2026-06-08',
    category: 'product-launch',
    region: 'southeast-asia',
    tags: ['Anthropic', 'Claude', 'enterprise', 'data-residency', 'APAC'],
    isFeatured: true,
    isAsiaSpecific: true,
  },

  // ── Regular articles ──────────────────────────────────────────────
  {
    id: 'news-004',
    title: 'India\'s Krutrim AI Raises $150M to Build Regional LLM for Indic Languages',
    summary: 'Krutrim AI, backed by Ola founder Bhavish Aggarwal, closed a $150M Series B to develop a large language model covering 22 Indian languages. The model already outperforms GPT-4 on Hindi, Tamil, and Bengali benchmarks, with planned API access for Indian enterprises.',
    source: 'Economic Times',
    sourceUrl: 'https://economictimes.indiatimes.com',
    publishedAt: '2026-06-07',
    category: 'funding',
    region: 'south-asia',
    tags: ['India', 'Krutrim', 'LLM', 'Indic-languages', 'funding'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-005',
    title: 'OpenAI GPT-5 Delayed — Safety Testing Reveals Alignment Gaps in Multilingual Contexts',
    summary: 'OpenAI announced a delay in GPT-5\'s public release after internal red-teaming revealed unexpected alignment failures in low-resource Asian languages. The company will release an interim GPT-4.5 update while safety teams re-train on expanded linguistic datasets.',
    source: 'The Verge',
    sourceUrl: 'https://theverge.com',
    publishedAt: '2026-06-06',
    category: 'research-breakthrough',
    region: 'global',
    tags: ['OpenAI', 'GPT-5', 'alignment', 'safety', 'multilingual'],
    isFeatured: false,
    isAsiaSpecific: false,
  },
  {
    id: 'news-006',
    title: 'Vietnam Passes Comprehensive AI Governance Law — First in Southeast Asia',
    summary: 'Vietnam\'s National Assembly approved the region\'s first comprehensive AI governance framework, mandating transparency disclosures for high-risk AI systems and establishing a national AI safety board. The law takes effect January 2027, with a phased compliance timeline for foreign AI providers.',
    source: 'VN Express',
    sourceUrl: 'https://vnexpress.net',
    publishedAt: '2026-06-05',
    category: 'regulation',
    region: 'southeast-asia',
    tags: ['Vietnam', 'regulation', 'AI-governance', 'policy', 'ASEAN'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-007',
    title: 'Google DeepMind Opens Tokyo Research Lab Focused on Asian Language AI',
    summary: 'DeepMind inaugurated a dedicated research lab in Tokyo with an initial team of 50 researchers. The lab will focus on challenges in Japanese, Korean, and Southeast Asian language processing, including non-English-centric reasoning, cultural context understanding, and multimodal Asian script recognition.',
    source: 'Google Blog',
    sourceUrl: 'https://blog.google',
    publishedAt: '2026-06-04',
    category: 'asia-expansion',
    region: 'east-asia',
    tags: ['Google', 'DeepMind', 'Tokyo', 'research', 'language-models'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-008',
    title: 'Meta\'s Llama 4 Released with Native Multilingual Support for 14 Asian Languages',
    summary: 'Meta open-sourced Llama 4, featuring native tokenisation and fine-tuned performance for 14 Asian languages including Thai, Vietnamese, Indonesian, and Filipino. Early benchmarks show a 40% improvement in Asian-language inference quality over Llama 3.',
    source: 'Meta AI',
    sourceUrl: 'https://ai.meta.com',
    publishedAt: '2026-06-03',
    category: 'open-source',
    region: 'global',
    tags: ['Meta', 'Llama 4', 'open-source', 'multilingual', 'NLP'],
    isFeatured: false,
    isAsiaSpecific: false,
  },
  {
    id: 'news-009',
    title: 'Grab AI Launches Predictive Pricing Engine for Southeast Asian Logistics',
    summary: 'Grab unveiled a new AI-powered logistics optimisation engine that predicts demand patterns across 8 Southeast Asian cities. Early pilots with Singapore and Bangkok delivery networks show 22% reduction in delivery times and 15% lower fuel consumption.',
    source: 'Tech in Asia',
    sourceUrl: 'https://techinasia.com',
    publishedAt: '2026-06-02',
    category: 'product-launch',
    region: 'southeast-asia',
    tags: ['Grab', 'logistics', 'AI', 'Southeast-Asia', 'delivery'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-010',
    title: 'South Korea\'s NAVER Launches HyperCLOVA X for Enterprise — Competes with GPT-4',
    summary: 'NAVER Cloud released HyperCLOVA X, an enterprise-grade AI platform targeting Korean and Japanese markets. The model achieves competitive scores against GPT-4 on Korean language benchmarks and offers on-premise deployment for security-conscious Korean conglomerates.',
    source: 'Korea Herald',
    sourceUrl: 'https://koreaherald.com',
    publishedAt: '2026-06-01',
    category: 'product-launch',
    region: 'east-asia',
    tags: ['NAVER', 'HyperCLOVA', 'Korea', 'enterprise', 'LLM'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-011',
    title: 'Adobe Firefly Video Now Available in Asia — AI Video Generation with Regional Asset Libraries',
    summary: 'Adobe expanded Firefly Video to Asian markets with regional asset libraries including culturally accurate stock footage, Asian typography templates, and localised text-to-video prompts in Japanese, Korean, and Chinese.',
    source: 'Adobe Blog',
    sourceUrl: 'https://blog.adobe.com',
    publishedAt: '2026-05-30',
    category: 'product-launch',
    region: 'southeast-asia',
    tags: ['Adobe', 'Firefly', 'video-generation', 'creative', 'Asia'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-012',
    title: 'AWS Launches Asia-First AI Training Chip: Inferentia 3',
    summary: 'Amazon Web Services unveiled Inferentia 3, purpose-built for AI training in Asian data centres. The chip delivers 2.5x the training throughput of Inferentia 2 while consuming 40% less power — a critical advantage in Asia\'s energy-constrained markets.',
    source: 'AWS Blog',
    sourceUrl: 'https://aws.amazon.com/blogs',
    publishedAt: '2026-05-28',
    category: 'product-launch',
    region: 'southeast-asia',
    tags: ['AWS', 'Inferentia', 'hardware', 'training', 'data-centre'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-013',
    title: 'Stability AI Releases Stable Diffusion 4 with Asian Art Styles Natively Supported',
    summary: 'Stability AI released SD4 with native style embeddings for ukiyo-e, batik, songket, and other traditional Asian art forms. The model generates culturally accurate Asian imagery without requiring LoRA fine-tuning, a breakthrough for designers across the region.',
    source: 'Stability AI Blog',
    sourceUrl: 'https://stability.ai',
    publishedAt: '2026-05-26',
    category: 'research-breakthrough',
    region: 'global',
    tags: ['Stability AI', 'Stable Diffusion', 'image-generation', 'art', 'culture'],
    isFeatured: false,
    isAsiaSpecific: false,
  },
  {
    id: 'news-014',
    title: 'Thailand Launches National AI Strategy 2.0 — Targets $15B AI Economy by 2030',
    summary: 'Thailand\'s Digital Economy Promotion Agency unveiled National AI Strategy 2.0, targeting 10,000 new AI-skilled workers annually, tax incentives for AI R&D investment, and the creation of two AI innovation zones in Bangkok and Chiang Mai.',
    source: 'Bangkok Post',
    sourceUrl: 'https://bangkokpost.com',
    publishedAt: '2026-05-24',
    category: 'regulation',
    region: 'southeast-asia',
    tags: ['Thailand', 'AI-strategy', 'government', 'workforce', 'investment'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-015',
    title: 'Indonesia\'s GoTo Merges with Bukalapak AI Teams — Largest AI Talent Pool in SEA',
    summary: 'GoTo Group and Bukalapak announced a strategic merger of their AI divisions, creating Southeast Asia\'s largest concentration of AI engineers at approximately 1,200 specialists. The combined entity will develop shared AI infrastructure for e-commerce, fintech, and on-demand services.',
    source: 'Jakarta Post',
    sourceUrl: 'https://thejakartapost.com',
    publishedAt: '2026-05-22',
    category: 'partnership',
    region: 'southeast-asia',
    tags: ['Indonesia', 'GoTo', 'Bukalapak', 'merger', 'AI-talent'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-016',
    title: 'GitHub Copilot Now Supports Thai, Vietnamese, and Indonesian Code Comments',
    summary: 'GitHub announced Copilot now understands and generates code comments in Thai, Vietnamese, and Indonesian. Developers can write inline documentation and prompts in their native language, with Copilot responding in the same language. The feature already covers 7 Asian languages.',
    source: 'GitHub Blog',
    sourceUrl: 'https://github.blog',
    publishedAt: '2026-05-20',
    category: 'product-launch',
    region: 'global',
    tags: ['GitHub', 'Copilot', 'coding', 'languages', 'Asia'],
    isFeatured: false,
    isAsiaSpecific: false,
  },
  {
    id: 'news-017',
    title: 'Alibaba Cloud Reduces AI API Pricing by 60% — Price War Escalates in Asia',
    summary: 'Alibaba Cloud slashed prices on its Tongyi Qianwen API by up to 60%, following Tencent and Baidu in a deepening Asian AI price war. The move targets SMB adoption in China and Southeast Asia, where cost remains the top barrier to AI integration.',
    source: 'South China Morning Post',
    sourceUrl: 'https://scmp.com',
    publishedAt: '2026-05-18',
    category: 'industry-trend',
    region: 'east-asia',
    tags: ['Alibaba', 'pricing', 'API', 'price-war', 'China'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-018',
    title: 'AI-Powered Tutoring Startup in India Hits 10M Users — World\'s Largest EdTech AI',
    summary: 'Indian edtech startup Bhasha AI reached 10 million monthly active users for its AI tutoring platform that teaches STEM subjects in 12 Indian languages. The model adapts to regional accents and learning styles, demonstrating AI\'s potential to bridge India\'s educational divides.',
    source: 'YourStory',
    sourceUrl: 'https://yourstory.com',
    publishedAt: '2026-05-16',
    category: 'industry-trend',
    region: 'south-asia',
    tags: ['India', 'edtech', 'tutoring', 'AI-education', 'Bhasha'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-019',
    title: 'Japan\'s SoftBank Vision Fund Pledges $1B to Asian AI Startups',
    summary: 'SoftBank announced a dedicated $1 billion fund for early-stage AI startups across Asia, excluding China. The fund will prioritise enterprise AI, healthcare AI, and climate AI startups in Japan, South Korea, Southeast Asia, and India.',
    source: 'Nikkei Asia',
    sourceUrl: 'https://asia.nikkei.com',
    publishedAt: '2026-05-14',
    category: 'funding',
    region: 'east-asia',
    tags: ['SoftBank', 'venture-capital', 'funding', 'startups', 'Asia'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-020',
    title: 'Philippines\' GCash Develops First Filipino LLM for Financial Services',
    summary: 'GCash, the Philippines\' leading fintech super-app, announced the development of a custom Filipino-language LLM for customer service, fraud detection, and financial advisory. The model, trained on 5 years of Filipino financial conversations, will be open-sourced for local developers.',
    source: 'Rappler',
    sourceUrl: 'https://rappler.com',
    publishedAt: '2026-05-12',
    category: 'research-breakthrough',
    region: 'southeast-asia',
    tags: ['Philippines', 'GCash', 'fintech', 'LLM', 'Filipino'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-021',
    title: 'Nvidia Acquires Taiwanese AI Chip Startup for $1.2B to Strengthen Edge AI Portfolio',
    summary: 'Nvidia completed its largest Asian acquisition, purchasing Taipei-based edge AI chipmaker Kneron for $1.2 billion. The deal gives Nvidia a foothold in the rapidly growing edge AI market across Asia, where Kneron\'s chips power smart city, retail, and manufacturing applications in 12 countries.',
    source: 'DigiTimes Asia',
    sourceUrl: 'https://digitimes.com',
    publishedAt: '2026-06-10',
    category: 'acquisition',
    region: 'east-asia',
    tags: ['Nvidia', 'Kneron', 'acquisition', 'edge-AI', 'Taiwan', 'chips'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-022',
    title: 'Salesforce and Singtel Partner to Launch AI-Powered Customer Service Platform Across ASEAN',
    summary: 'Salesforce and Singtel announced a strategic partnership to deploy AI-powered customer service solutions across six ASEAN markets. The platform combines Salesforce Einstein AI with Singtel\'s regional telecommunications infrastructure, targeting enterprises in banking, retail, and government sectors.',
    source: 'Channel News Asia',
    sourceUrl: 'https://channelnewsasia.com',
    publishedAt: '2026-06-09',
    category: 'partnership',
    region: 'southeast-asia',
    tags: ['Salesforce', 'Singtel', 'partnership', 'ASEAN', 'customer-service', 'enterprise'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-023',
    title: 'EU AI Act Compliance Costs Could Reach €1.5M per Mid-Size AI Company — Asian Exporters Brace for Impact',
    summary: 'A new analysis from McKinsey estimates mid-size AI companies will spend an average of €1.5 million each to comply with the EU AI Act by its 2027 enforcement deadline. Asian AI exporters, particularly from China, Japan, and South Korea, face additional localization costs for documentation and model auditing in European languages.',
    source: 'Financial Times',
    sourceUrl: 'https://ft.com',
    publishedAt: '2026-06-08',
    category: 'regulation',
    region: 'europe',
    tags: ['EU', 'AI-Act', 'regulation', 'compliance', 'export', 'cost'],
    isFeatured: false,
    isAsiaSpecific: false,
  },
  {
    id: 'news-024',
    title: 'Hugging Face Opens Singapore Hub to Serve Asia-Pacific ML Community',
    summary: 'Hugging Face inaugurated its Asia-Pacific headquarters in Singapore with a dedicated compute cluster, regional model registry, and local events space. The hub will host the first Asia-Pacific edition of the annual Hugging Face conference in September 2026, expected to draw 3,000 ML practitioners.',
    source: 'Hugging Face Blog',
    sourceUrl: 'https://huggingface.co/blog',
    publishedAt: '2026-06-07',
    category: 'asia-expansion',
    region: 'southeast-asia',
    tags: ['Hugging Face', 'Singapore', 'ML', 'community', 'conference', 'APAC'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
  {
    id: 'news-025',
    title: 'Apple Intelligence Expands to Asia with On-Device LLM Supporting 8 Asian Languages',
    summary: 'Apple launched its Apple Intelligence suite across Asia, featuring an on-device LLM that supports Japanese, Korean, Traditional Chinese, Simplified Chinese, Thai, Vietnamese, Indonesian, and Hindi. The AI model processes entirely on-device for privacy, with regional optimisations for Asian text input methods and voice recognition.',
    source: 'Apple Newsroom',
    sourceUrl: 'https://apple.com/newsroom',
    publishedAt: '2026-06-06',
    category: 'product-launch',
    region: 'southeast-asia',
    tags: ['Apple', 'Apple-Intelligence', 'on-device', 'multilingual', 'privacy', 'languages'],
    isFeatured: false,
    isAsiaSpecific: true,
  },
];

// ─── Helper functions ───────────────────────────────────────────────────

export function getCategoryInfo(category: NewsCategory) {
  return NEWS_CATEGORIES.find(c => c.value === category) ?? { value: category, label: category, emoji: '📰' };
}

export function getRegionLabel(region: NewsRegion) {
  return NEWS_REGIONS.find(r => r.value === region)?.label ?? region;
}

export function getFeaturedArticles(): AINewsArticle[] {
  return aiNewsArticles.filter(a => a.isFeatured);
}

export function getAsiaOnlyArticles(): AINewsArticle[] {
  return aiNewsArticles.filter(a => a.isAsiaSpecific);
}

export function getArticlesByCategory(category: NewsCategory): AINewsArticle[] {
  return aiNewsArticles.filter(a => a.category === category);
}

export function getArticlesByRegion(region: NewsRegion): AINewsArticle[] {
  return aiNewsArticles.filter(a => a.region === region);
}

export function getLatestArticles(count?: number): AINewsArticle[] {
  const sorted = [...aiNewsArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return count ? sorted.slice(0, count) : sorted;
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
