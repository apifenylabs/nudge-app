import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Bot,
  MessageSquare,
  BarChart3,
  Code,
  Globe,
  Shield,
  Smartphone,
  BookOpen,
  Lightbulb,
  Rocket,
  Star,
  ChevronRight,
  Search,
  Pen,
  FileText,
  Edit3,
  Share2,
  Phone,
  Mail,
  PieChart,
  Headphones,
  Building2,
  LineChart,
  Presentation,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQSchema from '@/components/FAQSchema';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'Best AI Tools for Sales in 2026 — Prospecting, Outreach & CRM | Apifeny AI',
  description:
    'Compare the best AI tools for sales teams in 2026. AI sales assistants, lead scoring, email outreach automation, CRM pipeline management, call coaching, sales analytics, and demo presentation tools. Vetted for Asia-Pacific sales teams.',
  keywords: [
    'AI tools for sales',
    'AI sales assistant',
    'AI lead scoring',
    'sales outreach automation',
    'AI CRM tools',
    'sales AI 2026',
    'AI for sales teams',
    'sales pipeline AI',
    'AI call coaching',
    'sales analytics AI',
    'best AI sales tools',
    'AI sales prospecting',
    'email outreach AI',
    'sales intelligence AI',
    'conversation intelligence',
    'AI sales forecasting',
    'sales automation tools',
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/ai-tools-for-sales`,
  },
  openGraph: {
    title: 'Best AI Tools for Sales in 2026 — Prospecting, Outreach & CRM',
    description:
      'Definitive guide to the best AI tools for sales in 2026. AI sales assistants, lead scoring, email automation, CRM pipeline management, call coaching, and analytics — vetted for sales teams across Asia-Pacific.',
    url: `${BASE_URL}/guides/ai-tools-for-sales`,
    type: 'article',
    locale: 'en_US',
    siteName: 'Apifeny AI',
    images: [
      {
        url: `${BASE_URL}/og/ai-tools-for-sales.jpg`,
        width: 1200,
        height: 630,
        alt: 'Best AI Tools for Sales in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Sales in 2026 — Prospecting, Outreach & CRM',
    description:
      'Definitive guide to AI tools for sales — AI assistants, lead scoring, email outreach, CRM automation, call coaching, and analytics, vetted for Asia-Pacific sales teams.',
  },
};

const sections = [
  {
    id: 'ai-sales-assistants',
    title: '1. AI Sales Assistants & Copilots',
    icon: Bot,
    color: 'bg-blue-50 dark:bg-blue-950/30',
    text: `AI sales assistants and copilots are becoming essential for modern sales teams. These tools handle research, drafting, objection handling, and deal strategy — helping reps spend less time on admin and more time selling.

For sales teams in Asia-Pacific, AI sales assistants offer:
• Real-time deal research: instantly gather company background, recent news, and decision-maker profiles
• Objection handling playbooks: AI generates responses to common objections based on industry and region
• Territory planning: AI analyzes market data to recommend which accounts to prioritize
• Multi-language deal support: draft proposals and emails in Chinese, Japanese, Korean, Thai, Vietnamese
• CRM data enrichment: automatically populate CRM fields from call notes and emails
• Deal strategy recommendations: AI analyzes pipeline data and suggests next actions
• Competitive intelligence: AI monitors competitor announcements and maps them to your deals

The impact is measurable: sales teams using AI assistants report 30-40% more time selling and 25% higher win rates. In Asia-Pacific markets, where relationship-building takes precedence and multi-language communication is the norm, AI assistants provide a force multiplier for lean sales teams.

Key capabilities to look for:
• Integration with CRM (Salesforce, HubSpot, Pipedrive, Zoho)
• Multi-language proposal and email generation
• Pipeline health analysis with action recommendations
• Mobile-first design for field sales in Southeast Asia
• Local data residency options (Singapore, Tokyo, Sydney)`,
    tools: ['chatgpt', 'claude', 'gemini'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'General-purpose sales research and drafting assistant' },
      { name: 'Claude', slug: 'claude', note: 'Complex deal analysis and long-form proposal writing' },
      { name: 'Gemini', slug: 'gemini', note: 'Multimodal sales deck analysis and market research' },
    ],
  },
  {
    id: 'lead-scoring-prospecting',
    title: '2. AI Lead Scoring & Prospecting',
    icon: Target,
    color: 'bg-green-50 dark:bg-green-950/30',
    text: `AI-powered lead scoring and prospecting tools are transforming how sales teams identify and prioritize potential customers. Rather than relying on static demographic rules, modern AI tools analyze behavioral signals, intent data, and historical conversion patterns to score leads in real time.

Current capabilities of AI lead scoring in 2026:
• Intent-based scoring: AI analyzes web browsing behavior, content consumption, and search patterns to identify buying signals
• Predictive lead conversion: ML models predict which leads are most likely to convert based on historical data
• Account-based prospecting: AI identifies lookalike accounts that match your best customer profiles
• Technographic and firmographic enrichment: auto-populate company tech stacks, funding status, growth metrics
• Behavioral scoring: weighs email opens, website visits, demo requests, and social engagement
• Real-time lead alerts: notify reps the moment a high-potential lead shows buying intent
• Social selling signals: AI monitors LinkedIn activity, job changes, and company news for warm outreach triggers

For Asia-Pacific sales teams, AI prospecting is particularly powerful:
• Japan: AI helps navigate the complex keiretsu business networks and identify decision-makers
• India: AI scores the massive startup ecosystem and identifies funded companies ready to buy
• Southeast Asia: AI bridges the gap between diverse markets — Singapore, Indonesia, Thailand, Vietnam — with consistent scoring models
• China: AI tools that integrate with WeChat and Douyin for social selling signals

Leading tools like Apollo, Lusha, and ZoomInfo now incorporate AI scoring engines that claim 3-5x improvement in lead conversion rates compared to traditional demographic scoring.`,
    tools: ['chatgpt', 'claude', 'gemini'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Custom lead scoring models via GPTs' },
      { name: 'Claude', slug: 'claude', note: 'Deep analysis of prospect research data' },
      { name: 'Gemini', slug: 'gemini', note: 'Multi-source data analysis for prospecting' },
    ],
  },
  {
    id: 'email-outreach-personalization',
    title: '3. AI Email Outreach & Personalization',
    icon: Mail,
    color: 'bg-purple-50 dark:bg-purple-950/30',
    text: `Email outreach remains the backbone of B2B sales, and AI has revolutionized how sales teams craft, personalize, and optimize their email sequences. Modern AI outreach tools go far beyond simple mail merge — they analyze recipient behavior and adapt messaging in real time.

How AI transforms email outreach:
• Hyper-personalization: AI crafts emails referencing specific company news, recent funding, job changes, or product launches
• Multi-variant testing: AI automatically A/B tests subject lines, body copy, CTAs, and send times
• Optimal send-time prediction: AI learns when each prospect is most likely to engage
• Natural language generation: AI drafts emails that sound human, natural, and culturally appropriate
• Sentiment analysis: AI monitors reply tone and flags frustrated or disengaged prospects
• Automated follow-up sequences: AI writes and schedules multi-step sequences with smart spacing
• Language adaptation: AI adjusts tone and formality based on the prospect's culture and seniority
• Reply intent detection: AI classifies replies (interested, not interested, out of office, meeting request) and routes accordingly

For Asia-Pacific sales, language and cultural adaptation are critical:
• Japan: formal keigo (honorific language) for initial outreach, casual for follow-ups after relationship established
• China: integration with WeChat for follow-up, use of WeCom for enterprise communication
• India: English-first but with regional cultural awareness (Diwali greetings, local holiday awareness)
• Thailand: warm, relationship-first tone with appropriate honorifics
• Vietnam: direct but respectful, referencing business growth context
• Indonesia: collectivist framing referencing team and community benefits`,
    tools: ['chatgpt', 'claude', 'deepseek'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Email sequence drafting and personalization' },
      { name: 'Claude', slug: 'claude', note: 'Cultural tone adaptation for Asian markets' },
      { name: 'DeepSeek', slug: 'deepseek', note: 'Cost-effective bulk email content generation' },
    ],
  },
  {
    id: 'crm-automation-pipeline',
    title: '4. AI CRM Automation & Pipeline Management',
    icon: Building2,
    color: 'bg-amber-50 dark:bg-amber-950/30',
    text: `CRMs are the system of record for sales, but they're only as good as the data they contain. AI CRM automation tools solve the perennial problem of poor data quality and manual data entry by automatically capturing, enriching, and updating CRM records.

AI CRM automation capabilities in 2026:
• Automatic activity capture: AI logs calls, emails, and meetings to the CRM without manual entry
• Deal stage prediction: AI analyzes pipeline velocity and predicts when deals will close
• Next-best-action recommendations: AI suggests optimal next steps based on historical win patterns
• Automated data enrichment: AI fills in missing fields (phone numbers, company size, industry codes)
• Duplicate detection and merging: AI finds and merges duplicate records across the CRM
• Pipeline health scoring: AI flags stalled deals, risk of churn, and expansion opportunities
• Forecasting automation: AI generates rolling forecasts based on pipeline data and historical trends
• Workflow automation: AI triggers automated actions (assign leads, send follow-ups, update stages)

For Asia-Pacific sales organizations, key CRM automation considerations:
• Data residency: Singapore, Japan, and Australia have strict data localization laws
• Multi-platform: many APAC companies use a mix of Salesforce, HubSpot, Zoho, and local CRMs (Seismic, Yonyou)
• Mobile-first: field sales in Indonesia, Philippines, and Vietnam need strong mobile CRM experiences
• Integration with local tools: WeCom, Line, WhatsApp Business, and Grab for logistics
• Offline capability: sales reps in low-connectivity areas need offline CRM sync`,
    tools: ['chatgpt', 'claude', 'qwen'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'CRM data enrichment and pipeline analysis' },
      { name: 'Claude', slug: 'claude', note: 'Deal review notes and pipeline health reports' },
      { name: 'Qwen', slug: 'qwen', note: 'Best for Chinese-language CRM workflows' },
    ],
  },
  {
    id: 'sales-analytics-forecasting',
    title: '5. AI Sales Analytics & Forecasting',
    icon: LineChart,
    color: 'bg-red-50 dark:bg-red-950/30',
    text: `Sales forecasting has traditionally been more art than science — heavily dependent on rep intuition and manager judgement. AI-powered analytics tools are bringing rigorous data science to sales forecasting, enabling far more accurate predictions and actionable insights.

AI sales analytics capabilities:
• Rolling revenue forecasts: AI generates 30/60/90-day forecasts with confidence intervals
• Win-rate analysis: AI identifies which deal characteristics correlate with higher win rates
• Sales cycle analysis: AI pinpoints where deals slow down and suggests acceleration strategies
• Rep performance analytics: AI benchmarks individual reps against team and industry averages
• Territory optimization: AI analyzes coverage gaps and recommends territory realignment
• Price optimization: AI recommends pricing and discounting strategies based on win/loss data
• Churn prediction: AI identifies at-risk accounts before they churn, with specific intervention suggestions
• Cohort analysis: AI segments customers by acquisition channel, industry, and region for trend analysis
• Quota attainment forecasting: AI predicts which reps will hit quota and who needs support

For Asia-Pacific sales leaders, AI analytics addresses specific challenges:
• Multi-market analytics: consolidate data across diverse APAC markets in a single dashboard
• Currency and economic factors: AI adjusts forecasts for currency fluctuations and local economic conditions
• Seasonal patterns: AI accounts for market-specific seasonality (Chinese New Year, Golden Week, Ramadan)
• Distribution channel analytics: AI analyzes performance across distributors, resellers, and direct sales
• Real-time dashboards: mobile-accessible dashboards for regional sales directors covering multiple countries`,
    tools: ['claude', 'chatgpt', 'deepseek'],
    affiliateSuggestions: [
      { name: 'Claude', slug: 'claude', note: 'Detailed sales analytics reports with reasoning' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Data visualization and trend analysis for dashboards' },
      { name: 'DeepSeek', slug: 'deepseek', note: 'Cost-effective bulk data analysis and forecasting' },
    ],
  },
  {
    id: 'demo-presentation-tools',
    title: '6. AI Demo & Presentation Tools',
    icon: Presentation,
    color: 'bg-teal-50 dark:bg-teal-950/30',
    text: `Product demos and sales presentations are make-or-break moments in the sales cycle. AI tools are transforming how sales teams create, personalize, and deliver presentations — moving from static slide decks to dynamic, personalized demo experiences.

AI demo and presentation capabilities:
• AI-generated slide decks: create entire presentations from a URL, PDF, or topic description
• Demo script generation: AI writes natural demo scripts tailored to prospect profile and industry
• Interactive product tours: AI creates guided product walkthroughs that adapt to prospect actions
• Personalized video demos: AI generates short personalized video messages at scale
• Live Q&A assistance: AI suggests answers during live demos based on your product knowledge base
• Competitive positioning: AI maps your features against competitor alternatives in real time
• Demo recording analysis: AI analyzes demo recordings to identify where prospects lost interest
• Follow-up content generation: AI creates tailored follow-up decks, case studies, and ROI calculators

For Asia-Pacific sales teams, presentation tools must handle:
• Multi-language slide decks: Chinese, Japanese, Korean for regional stakeholders
• Culturally appropriate design: different visual preferences across markets
• Offline presentation capability: many sales meetings happen in locations with unreliable internet
• Mobile-optimized demos: sharing presentations on WeChat, WhatsApp, and Line
• Local case study integration: AI pulls relevant Asia-Pacific success stories into presentations`,
    tools: ['chatgpt', 'claude', 'kimi'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Slide deck creation and content generation' },
      { name: 'Claude', slug: 'claude', note: 'Detailed presentation content and talking points' },
      { name: 'Kimi', slug: 'kimi', note: 'Long-document analysis for presentation preparation' },
    ],
  },
  {
    id: 'call-coaching-conversation-intelligence',
    title: '7. AI Call Coaching & Conversation Intelligence',
    icon: Headphones,
    color: 'bg-pink-50 dark:bg-pink-950/30',
    text: `Conversation intelligence and AI call coaching tools analyze every sales call to extract insights, coach reps, and improve conversion rates. These tools have become essential for sales enablement teams, particularly for onboarding new hires and scaling best practices across distributed teams.

AI call coaching capabilities:
• Automatic call transcription: high-accuracy transcription in multiple languages and dialects
• Sentiment analysis: AI tracks customer sentiment throughout the call and flags key moments
• Talk-listen ratio analysis: AI measures rep vs customer speaking time and provides feedback
• Objection detection: AI identifies objections and how the rep handled them
• Keyword and phrase tracking: AI monitors mentions of competitors, pricing, and features
• Coaching scorecards: AI scores each call against sales methodology criteria (MEDDIC, BANT, Challenger)
• Moment spotting: AI automatically clips and tags important moments for coaching reviews
• Revenue correlation: AI correlates call behaviors with deal outcomes to identify winning patterns
• Playbook recommendations: AI recommends relevant sales plays based on call context
• Multi-language support: analysis across English, Chinese, Japanese, Korean, and Southeast Asian languages

For Asia-Pacific sales teams, conversation intelligence must navigate:
• Language diversity: calls may switch between English and local languages mid-conversation
• Cultural communication styles: indirect communication in Japan vs direct in Australia
• Accent and dialect recognition: Singlish, Manglish (Malaysian English), Indian English
• Regulatory compliance: recording consent laws vary across Singapore, Japan, China, and Australia
• Platform integration: tools must work with Zoom, Teams, Line, WeChat Work, and local VoIP providers

Leading platforms like Gong and Chorus (ZoomInfo) have invested heavily in Asia-Pacific language support, while newer entrants offer more affordable options for mid-market teams.`,
    tools: ['claude', 'chatgpt', 'doubao'],
    affiliateSuggestions: [
      { name: 'Claude', slug: 'claude', note: 'Detailed call analysis and coaching report generation' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Call transcript summarization and follow-up drafting' },
      { name: 'Doubao', slug: 'doubao', note: 'Best for Chinese-language call analysis' },
    ],
  },
];


const guideFaqs = [
  {
    "question": "What is the best AI tool for sales in 2026?",
    "answer": "Freshsales (Freshworks) offers native WhatsApp Business API integration essential for Asian markets. Salesforce Einstein provides enterprise-grade AI sales features. For solopreneurs, combining ChatGPT for outreach with a CRM like Freshsales or HubSpot creates an effective low-cost AI sales stack starting at $0-12/month."
  },
  {
    "question": "Can AI write sales emails that convert?",
    "answer": "Yes \u2014 AI sales email tools can generate personalized outreach sequences at scale. ChatGPT with proper custom instructions creates effective cold emails. Tools like Jasper have specific sales copy templates. The key is personalization \u2014 AI can research prospects and tailor messaging based on their company, role, and recent activity."
  }
];

export default function AIToolsForSalesGuide() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Guides', item: '/guides' },
          { name: 'AI Tools for Sales', item: '/guides/ai-tools-for-sales' },
        ]}
        baseUrl={BASE_URL}
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 dark:from-emerald-900 dark:via-teal-950 dark:to-cyan-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-200 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Guide · 14 min read
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Best AI Tools for Sales in 2026
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100/90 max-w-2xl mb-8">
            The definitive guide to AI-powered sales tools — AI assistants, lead scoring, email outreach automation, CRM pipeline management, call coaching, sales analytics, and demo presentation tools. Vetted for sales teams across Asia-Pacific.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-200/80">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Updated May 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              Sales Professionals
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              Asia-Pacific Focused
            </span>
          </div>
        </div>
      </section>

      {/* ─── Table of Contents ─── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            What You&apos;ll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50"
              >
                <s.icon className="w-4 h-4 shrink-0" />
                {s.title.replace(/^\d+\.\s*/, '')}
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Now Section ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-6">
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong className="text-emerald-700 dark:text-emerald-300">Why AI in sales matters more in 2026:</strong> The global AI sales market is projected to reach $65 billion by 2030, growing at over 28% CAGR. In Asia-Pacific, sales AI adoption is accelerating faster than any other region — driven by explosive growth in SaaS across Southeast Asia, Japan&apos;s digital transformation mandate, India&apos;s booming startup ecosystem, and China&apos;s sophisticated AI infrastructure. Sales teams that leverage AI now are seeing 30-50% increases in productivity, 25% higher conversion rates, and significantly shorter ramp times for new hires. This guide covers the AI sales tools that deliver real results in 2026 — vetted for sales performance, CRM integration, and the unique context of Asia-Pacific sales environments.
          </p>
        </div>
      </section>

      {/* ─── Quick Comparison Table ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Quick Comparison — Best AI Tools for Sales
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Tool</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Best For</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Starting Price</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Key Sales Features</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Asia Ready</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { name: 'ChatGPT', best: 'Sales research & drafting', price: '$0 (Free)', features: 'Custom GPTs, multi-language outreach, proposal writing, CRM integration via API', asia: '✅ Multi-language' },
                  { name: 'Claude', best: 'Deal analysis & proposals', price: '$0 (Free)', features: '200K context, deal strategy analysis, objection handling, complex proposal writing', asia: '✅ Multi-language' },
                  { name: 'Gemini', best: 'Market research & decks', price: '$0 (Free)', features: 'Advanced vision, Google ecosystem, presentation generation, multi-source research', asia: '✅ Google-served' },
                  { name: 'DeepSeek', best: 'Bulk content & analysis', price: '$0 (Free)', features: '128K context, strong reasoning, cost-effective bulk outreach generation, free API', asia: '✅ China-built' },
                  { name: 'Qwen', best: 'China market sales', price: '$0 (Free)', features: 'Alibaba Cloud integration, Chinese business knowledge, WeChat ecosystem support', asia: '✅ China-optimized' },
                  { name: 'Kimi', best: 'Client research prep', price: '$0 (Free)', features: '200K+ context, PDF analysis, long-form market research, proposal preparation', asia: '✅ Chinese-focused' },
                  { name: 'Doubao', best: 'Chinese outreach', price: '$0 (Free)', features: 'ByteDance ecosystem, Chinese content generation, social selling content creation', asia: '✅ China-native' },
                  { name: 'Ernie Bot', best: 'Baidu ecosystem sales', price: '$0 (Free)', features: 'Baidu Search for prospect research, Chinese business intelligence, multimodal', asia: '✅ China ecosystem' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{row.name}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{row.best}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{row.price}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-xs max-w-[220px]">{row.features}</td>
                    <td className="px-6 py-3 text-center">{row.asia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Content Sections ─── */}
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-20 ${s.color} border-y border-gray-200/50 dark:border-gray-800/50`}
        >
          <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                <s.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {s.title}
              </h2>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
              {s.text.split('\n\n').map((para, i) => (
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
                  Recommended Tools
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
                    const link = (tool as any).affiliateUrl || (tool as any).website_url || (tool as any).url || `https://apifeny.ai/tools/${a.slug}`;
                    return (
                      <a
                        key={a.slug}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
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
      ))}

      {/* ─── Final CTA ─── */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 sm:p-12">
          <Sparkles className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Supercharge Your Sales Stack?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
            Browse our curated directory of AI tools vetted for sales professionals. Compare features, pricing, and Asia-Pacific specific capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors shadow-sm"
            >
              Browse All AI Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl px-6 py-3 transition-colors"
            >
              Browse by Category
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* ─── FAQ Schema ─── */}
      <FAQSchema faqs={guideFaqs} />
    </main>
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
