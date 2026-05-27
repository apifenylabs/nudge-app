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
  Mail,
  Globe,
  Shield,
  Smartphone,
  BookOpen,
  Lightbulb,
  Rocket,
  Star,
  ChevronRight,
  Search,
  FileText,
  LineChart,
  Share2,
  PenTool,
  Filter,
  Music,
  Image,
  GraduationCap,
  Pencil,
  Languages,
  Brain,
  ClipboardCheck,
  School,
  BookMarked,
  NotebookPen,
  Headphones,
  Video,
  Scale,
  Gavel,
  FileSearch,
  ShieldCheck,
  FileSignature,
  Landmark,
  Briefcase,
  BadgeCheck,
  ScrollText,
  Handshake,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQSchema from '@/components/FAQSchema';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'Best AI Tools for Legal Professionals in 2026 — Complete Guide | Apifeny AI',
  description:
    'Compare the best AI tools for lawyers, paralegals, in-house counsel, and legal professionals in 2026 — contract review, legal research, document drafting, e-discovery, compliance, and case prediction. With Asia-Pacific legal market focus.',
  keywords: [
    'AI tools for legal professionals',
    'best AI legal tools 2026',
    'AI for lawyers',
    'AI contract review tools',
    'AI legal research',
    'AI document drafting',
    'AI e-discovery tools',
    'AI compliance software',
    'AI case prediction',
    'AI legal document automation',
    'AI for law firms',
    'legal AI tools Asia',
    'AI paralegal tools',
    'AI contract analysis',
    'AI legal writing',
    'AI due diligence tools',
    'AI intellectual property tools',
    'AI legal billing',
    'AI legal chatbots',
    'smart legal tools',
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/ai-tools-for-legal`,
  },
  openGraph: {
    title: 'Best AI Tools for Legal Professionals in 2026 — Complete Guide',
    description:
      'Practical guide to the best AI tools for lawyers, paralegals, in-house counsel, and legal professionals — contract review, legal research, document drafting, e-discovery, compliance, and case prediction. With Asia-Pacific legal market focus.',
    url: `${BASE_URL}/guides/ai-tools-for-legal`,
    type: 'article',
    locale: 'en_US',
    siteName: 'Apifeny AI',
    images: [
      {
        url: `${BASE_URL}/og/ai-tools-for-legal.jpg`,
        width: 1200,
        height: 630,
        alt: 'Best AI Tools for Legal Professionals in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Legal Professionals in 2026 — Complete Guide',
    description:
      'Practical guide to the best AI tools for lawyers, paralegals, in-house counsel — contract review, legal research, document drafting, e-discovery, compliance.',
  },
};

// ─── Content sections ───
const sections = [
  {
    id: 'contract-review',
    title: '1. AI Contract Review & Analysis',
    icon: FileSearch,
    color: 'bg-blue-50 dark:bg-blue-950/30',
    text: `Contract review is one of the most time-intensive tasks in legal practice. AI contract review tools can analyse hundreds of pages of contracts in minutes, flag risky clauses, identify missing terms, and suggest standard language aligned with your jurisdiction's requirements. For legal professionals in Asia-Pacific, where multi-language contracts are common (English + local language), AI tools that handle bilingual contract review are especially valuable.

Key features to look for in AI contract review tools:
• Automated clause extraction and classification (indemnity, termination, liability limits)
• Risk scoring for each clause based on jurisdiction-specific legal standards
• Redlining and comparison of contract versions
• Obligation tracking: flag deadlines, renewal dates, and performance obligations
• Bulk review capability for M&A due diligence (hundreds of contracts at once)
• Multi-language support for Asian legal markets (Chinese, Japanese, Korean, Thai, Vietnamese)
• Export to standard formats (Word, PDF, Excel redlines)
• Playbook alignment: check contracts against your firm's preferred language

For APAC law firms handling cross-border deals, AI contract review reduces review time by 60-80% while catching more issues than manual review alone.`,
    tools: ['chatgpt', 'claude', 'perplexity'],
    affiliateSuggestions: [
      { name: 'Claude', slug: 'claude', note: 'Best AI for long contract analysis with 200K token context' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Versatile contract clause analysis and drafting' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Research jurisdiction-specific legal precedents' },
    ],
  },
  {
    id: 'legal-research',
    title: '2. AI Legal Research & Precedent Discovery',
    icon: Landmark,
    color: 'bg-purple-50 dark:bg-purple-950/30',
    text: `Legal research is the backbone of any case or transaction. AI-powered legal research tools go beyond keyword search — they understand legal concepts, find relevant precedents, summarise judgments, and even predict case outcomes based on historical data. For APAC jurisdictions with complex hybrid legal systems (common law, civil law, sharia law, customary law), AI that navigates multiple legal frameworks is game-changing.

AI legal research capabilities:
• Natural language querying: "What are the key precedents for force majeure in Singapore?"
• Automated case summarisation with ratio decidendi and obiter dicta extraction
• Statute and regulation cross-referencing across multiple APAC jurisdictions
• Citation analysis: find cases that cite your key precedent, both ways
• Predictive analytics: estimate likelihood of case outcomes based on judge and court history
• Real-time updates: track legislative changes and new rulings
• Multi-jurisdiction support for cross-border work
• Integration with major legal databases (Westlaw, LexisNexis, vLex, AsianLII)

For law firms across Asia, AI legal research turns days of library work into hours of AI-assisted analysis, dramatically reducing billable hours spent on research while improving thoroughness.`,
    tools: ['perplexity', 'claude', 'chatgpt'],
    affiliateSuggestions: [
      { name: 'Perplexity', slug: 'perplexity', note: 'Best for cited legal research with source verification' },
      { name: 'Claude', slug: 'claude', note: 'Analyse long judgments and extract key legal principles' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Draft legal research memos and arguments' },
    ],
  },
  {
    id: 'document-drafting',
    title: '3. AI Document Drafting & Automation',
    icon: FileSignature,
    color: 'bg-green-50 dark:bg-green-950/30',
    text: `Document drafting is where lawyers spend the most billable time. AI document drafting tools accelerate this by generating first drafts from simple prompts, filling templates with client data, and maintaining consistency across your firm's document suite. For Asian law firms managing high-volume practices (conveyancing, corporate secretarial, immigration), AI document automation can transform profitability.

What AI document drafting does for legal professionals:
• Generate first drafts of contracts, pleadings, letters, and opinions from simple instructions
• Template automation: populate standard forms with client and matter data
• Clause library management: maintain firm-wide approved language with version control
• Cross-referencing: auto-update document references when clauses change
• Style and tone consistency across a firm's document output
• Multi-language document generation (same contract in English and Chinese)
• Integration with practice management software (Clio, PracticePanther, LEAP)
• Court-form filling for specific jurisdictions (e.g., SICC, HKCFI, SGHC)

Firms using AI document drafting report 3-5x faster turnaround on standard documents and 40% reduction in drafting errors, especially for junior associates.`,
    tools: ['chatgpt', 'claude', 'notion-ai'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Fast first drafts of legal documents and correspondence' },
      { name: 'Claude', slug: 'claude', note: 'Precise legal language with long context understanding' },
      { name: 'Notion AI', slug: 'notion-ai', note: 'Templated document creation within firm wikis' },
    ],
  },
  {
    id: 'e-discovery',
    title: '4. AI E-Discovery & Document Review',
    icon: Search,
    color: 'bg-amber-50 dark:bg-amber-950/30',
    text: `E-discovery can be the most expensive phase of litigation. AI-powered e-discovery tools use machine learning to categorise, prioritise, and review millions of documents in a fraction of the time and cost of manual review. For APAC jurisdictions with expanding discovery obligations (Singapore, Hong Kong, Australia), AI e-discovery is becoming essential for cost-effective litigation.

AI e-discovery capabilities:
• Technology-Assisted Review (TAR): AI learns from reviewer decisions to prioritise relevant documents
• Predictive coding: rank documents by relevance to specific discovery requests
• Email threading: reconstruct conversations from scattered email chains
• Near-deduplication: eliminate near-identical document versions
• Privilege log generation: auto-identify and log privileged communications
• Foreign language processing: handle multilingual document sets across Asian languages
• Early case assessment: provide instant document volume and key player analysis
• Production-ready exports: format documents for opposing counsel and court submission

For firms handling complex commercial litigation or regulatory investigations in Asia, AI e-discovery can reduce review costs by 70% while improving accuracy and defensibility.`,
    tools: ['claude', 'chatgpt', 'perplexity'],
    affiliateSuggestions: [
      { name: 'Claude', slug: 'claude', note: 'Batch document review with massive context capacity' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Document categorisation and privilege analysis' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Cross-reference documents with legal standards' },
    ],
  },
  {
    id: 'compliance',
    title: '5. AI for Regulatory Compliance & Risk Management',
    icon: ShieldCheck,
    color: 'bg-cyan-50 dark:bg-cyan-950/30',
    text: `Regulatory compliance is increasingly complex across APAC, with overlapping requirements from MAS (Singapore), HKMA (Hong Kong), SFC, BOT (Thailand), OJK (Indonesia), and other regulators. AI compliance tools monitor regulatory changes, assess your organisation's compliance posture, and automate reporting — reducing the risk of costly regulatory breaches.

AI compliance features that matter for APAC legal teams:
• Regulatory change monitoring across APAC jurisdictions (real-time alerts)
• Compliance obligation register: map regulations to specific organisational obligations
• Automated gap analysis: compare your policies against latest regulatory requirements
• Regulatory filing assistance: populate and submit forms to local regulators
• AML/KYC screening: AI-enhanced customer due diligence and transaction monitoring
• Data privacy compliance: GDPR, PDPA (Singapore, Thailand), PIPL (China), APP (Australia)
• Whistleblowing and incident management with reporting workflows
• ESG compliance tracking for listed companies (HKEX, SGX, ASX requirements)

For in-house legal teams managing multi-jurisdictional compliance in Asia, AI tools reduce compliance monitoring time by 50-70% and significantly lower the risk of missing a regulatory deadline or change.`,
    tools: ['chatgpt', 'claude', 'perplexity'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Regulatory research and compliance documentation' },
      { name: 'Claude', slug: 'claude', note: 'Analyse compliance frameworks across jurisdictions' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Track regulatory changes in real-time' },
    ],
  },
  {
    id: 'ip-management',
    title: '6. AI for Intellectual Property Management',
    icon: BadgeCheck,
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    text: `Intellectual property is a growth area across Asia as innovation accelerates in China, Singapore, South Korea, and India. AI IP tools help with patent prior art searches, trademark clearance, copyright management, and IP portfolio analytics — turning months of searching into hours of AI-assisted analysis.

AI IP management capabilities:
• Patent prior art searching: semantic search across global patent databases (WIPO, USPTO, CNIPA, JPO, KIPO, IPOS)
• Trademark clearance: similarity search across classes and jurisdictions
• Patent claims analysis: compare claims across related patents
• Trademark watching: monitor new filings that may conflict with your marks
• IP portfolio analytics: identify gaps, opportunities, and renewal deadlines
• Infringement monitoring: scan marketplaces and websites for IP violations
• Copyright registration assistance: automate filing workflows
• Trade secret management: AI-enhanced access controls and document tracking

For IP-savvy firms in Asia's innovation hubs, AI IP tools reduce prior art search time by 80% and improve the quality of clearance searches — directly reducing risk of infringement litigation.`,
    tools: ['perplexity', 'claude', 'chatgpt'],
    affiliateSuggestions: [
      { name: 'Perplexity', slug: 'perplexity', note: 'Prior art searching and IP database queries' },
      { name: 'Claude', slug: 'claude', note: 'Analyse complex patent claims and specifications' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Draft IP litigation documents and licensing agreements' },
    ],
  },
  {
    id: 'practice-management',
    title: '7. AI Practice Management & Legal Billing',
    icon: Briefcase,
    color: 'bg-rose-50 dark:bg-rose-950/30',
    text: `Law firm profitability depends on efficient practice management. AI-enhanced legal practice management tools automate time tracking, billing, matter management, and client communication — reducing administrative burden and improving realisation rates. For solo practitioners and small firms common across Asia, AI practice management can be the difference between profit and burnout.

AI practice management features:
• Automatic time capture: AI tracks activities and suggests time entries from calendar, email, and documents
• Smart billing: AI reviews narratives for compliance with client guidelines and suggests edits
• Matter budgeting: predict costs and track against budget in real-time
• Client intake automation: AI-powered conflict checks and engagement letter generation
• Deadline and limitation period tracking with automated reminders
• AI draft billing narratives from work descriptions
• Cash flow forecasting based on billed-but-unpaid patterns
• Client portal with AI chatbot for status updates and document requests

For small and mid-sized firms in Asia, AI practice management tools can increase billable hours by 15-25% through better time capture and reduce write-offs by improving narrative quality.`,
    tools: ['chatgpt', 'notion-ai', 'claude'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Draft billing narratives and client communications' },
      { name: 'Notion AI', slug: 'notion-ai', note: 'Firm wikis, matter management, and template libraries' },
      { name: 'Claude', slug: 'claude', note: 'Review billing narratives for compliance and clarity' },
    ],
  },
  {
    id: 'legal-argument',
    title: '8. AI for Legal Argument & Case Strategy',
    icon: Gavel,
    color: 'bg-orange-50 dark:bg-orange-950/30',
    text: `Building a compelling legal argument requires deep understanding of case law, statute, and factual nuances. AI assists by identifying winning arguments from similar cases, predicting counter-arguments from opposing counsel, and stress-testing your legal reasoning before you step into court.

AI legal strategy capabilities:
• Argument generation: propose legal arguments based on facts and jurisdiction
• Counter-argument prediction: identify weaknesses and opposing points the other side will raise
• Judicial analytics: understand how specific judges rule on particular issues
• Case outcome prediction: statistical probability based on similar historical cases
• Fact chronology: AI extracts and organises key facts from document sets
• Trial preparation: generate examination outlines and cross-examination questions
• Settlement value analysis: estimate likely settlement ranges based on comparable cases
• Appeal strategy: assess grounds for appeal and likelihood of success

For litigation-heavy practices across Asia's common law jurisdictions (Singapore, Hong Kong, Malaysia, India), AI legal argument tools are becoming standard for trial preparation and appellate work.`,
    tools: ['claude', 'chatgpt', 'perplexity'],
    affiliateSuggestions: [
      { name: 'Claude', slug: 'claude', note: 'Deep legal reasoning and argument stress-testing' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Generate counter-arguments and trial outlines' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Research judicial tendencies and precedents' },
    ],
  },
];

const toolSlugs = ['chatgpt', 'claude', 'perplexity', 'gemini', 'notion-ai'];


const guideFaqs = [
  {
    "question": "What is the best AI tool for legal document review?",
    "answer": "Claude Pro with its 1M token context window is unmatched for reviewing lengthy legal documents \u2014 contracts, NDAs, operating agreements, and compliance filings. For Asian legal systems, Harvey AI is building specific support for Singapore and Hong Kong common law systems."
  },
  {
    "question": "Can AI replace lawyers for contract review?",
    "answer": "AI excels at identifying risky clauses, flagging missing terms, and comparing contracts against standards \u2014 covering about 70% of basic contract review. However, legal advice requires understanding jurisdiction-specific nuances, negotiation strategy, and risk appetite that AI cannot fully replicate. AI is best used as a first-pass review tool."
  }
];

export default function AIToolsForLegalGuide() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Guides', item: '/guides' },
          { name: 'AI Tools for Legal', item: '/guides/ai-tools-for-legal' },
        ]}
        baseUrl={BASE_URL}
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-950 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-200 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-6">
            <Scale className="w-3.5 h-3.5" />
            Guide · 15 min read
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Best AI Tools for Legal Professionals in 2026
          </h1>
          <p className="text-lg sm:text-xl text-blue-100/90 max-w-2xl mb-8">
            The complete guide to AI-powered legal tools — contract review, legal research, document drafting, e-discovery, compliance, IP management, practice management, and case strategy. Vetted for lawyers, paralegals, and in-house counsel across Asia-Pacific.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-blue-200/80">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Updated May 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Gavel className="w-4 h-4" />
              Lawyers &amp; Legal Professionals
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              Asia-Pacific Focus
            </span>
          </div>
        </div>
      </section>

      {/* ─── Table of Contents ─── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            What's in this guide
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm text-gray-600 dark:text-gray-400"
              >
                <s.icon className="w-4 h-4 text-blue-500 shrink-0" />
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Comparison Table ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-blue-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Quick Comparison: Best AI Legal Tools</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Tool</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Best For</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Starting Price</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Free Trial</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { name: 'Claude', best: 'Long contract review & deep legal analysis', price: '$20/mo (Pro)', trial: 'Free tier', rating: '4.6/5' },
                  { name: 'ChatGPT', best: 'All-round legal drafting & research', price: '$20/mo (Plus)', trial: 'Free tier', rating: '4.7/5' },
                  { name: 'Perplexity', best: 'Cited legal research & precedent finding', price: '$20/mo (Pro)', trial: 'Free tier', rating: '4.5/5' },
                  { name: 'Gemini', best: 'Free legal research & document analysis', price: 'Free', trial: 'Always free', rating: '4.5/5' },
                  { name: 'Notion AI', best: 'Practice management & legal wikis', price: '$10/mo (Plus)', trial: 'Free trial', rating: '4.4/5' },
                ].map((tool, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{tool.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{tool.best}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{tool.price}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/50 rounded-full px-2.5 py-1">
                        <CheckCircle className="w-3 h-3" />
                        {tool.trial}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{tool.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Recommendation Table ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-800 to-slate-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Which Tool for Which Legal Use Case?
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Use Case</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Recommended Tool</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-900 dark:text-white">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { use: 'Long contract review (100+ pages)', tool: 'Claude', why: '200K token context handles entire contracts' },
                  { use: 'Legal research with cited sources', tool: 'Perplexity', why: 'Provides verifiable citations from real sources' },
                  { use: 'Free legal document drafting', tool: 'Gemini', why: 'Best free option with Google Workspace integration' },
                  { use: 'Legal writing & argument drafting', tool: 'ChatGPT', why: 'Most versatile for drafting and iteration' },
                  { use: 'Firm wiki & practice management', tool: 'Notion AI', why: 'Templated document creation and team collaboration' },
                  { use: 'E-discovery document review', tool: 'Claude', why: 'Batch analysis of thousands of documents' },
                  { use: 'Compliance research across APAC', tool: 'Perplexity', why: 'Real-time regulatory updates with citations' },
                  { use: 'Due diligence & deal review', tool: 'Claude', why: 'Long context for complete deal document sets' },
                ].map((rec, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{rec.use}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 rounded-full px-2.5 py-1">
                        <CheckCircle className="w-3 h-3" />
                        {rec.tool}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{rec.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Content Sections ─── */}
      {sections.map((section) => (
        <section key={section.id} id={section.id} className={`scroll-mt-24 ${section.color}`}>
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800">
                <section.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{section.text}</p>

            {/* Affiliate CTAs */}
            {section.affiliateSuggestions && section.affiliateSuggestions.length > 0 && (
              <div className="space-y-3 mb-8">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Recommended tools</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.affiliateSuggestions.map((rec, i) => {
                    const tool = toolsData.find((t: any) => t.slug === rec.slug);
                    return (
                      <a
                        key={i}
                        href={(tool as any)?.affiliateUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {(tool as any)?.name?.charAt(0) || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {rec.name} <ArrowRight className="w-3 h-3 inline" />
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{rec.note}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tool cards */}
            {section.tools && section.tools.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Detailed reviews</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {section.tools.map((slug) => {
                    const tool = toolsData.find((t: any) => t.slug === slug);
                    if (!tool) return null;
                    return (
                      <ToolCard
                        key={slug}
                        tool={tool}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ─── Bottom CTA ─── */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-950 dark:from-gray-950 dark:to-black">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Legal Practice with AI?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Start with the AI tool that matches your practice area. Claude for contract-heavy practices, Perplexity for research-intensive litigation, or ChatGPT as your all-round legal assistant.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={(() => {
                const claude = toolsData.find((t: any) => t.slug === 'claude');
                return (claude as any)?.affiliateUrl || '#';
              })()}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg shadow-blue-700/20"
            >
              <Sparkles className="w-4 h-4" />
              Try Claude Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Browse All Guides
            </Link>
          </div>
        </div>
      </section>
      {/* ─── FAQ Schema ─── */}
      <FAQSchema faqs={guideFaqs} />
    </main>
  );
}
