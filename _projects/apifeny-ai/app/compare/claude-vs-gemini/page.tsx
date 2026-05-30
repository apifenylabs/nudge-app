import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  DollarSign,
  Code,
  Globe,
  Brain,
  MessageSquare,
  Sparkles,
  BookOpen,
  BarChart3,
  Users,
  ChevronRight,
  Star,
  Shield,
  Zap,
  Search,
  Image,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Claude vs Gemini 2026 — Pricing, Coding, Multimodal Compared | Apifeny AI',
  description:
    'Claude vs Gemini head-to-head: pricing ($20 vs $20), 200K vs 1M context windows, coding benchmarks, Google ecosystem vs Anthropic safety. Which AI wins for developers and enterprises in 2026?',
  keywords: [
    'Claude vs Gemini',
    'Gemini vs Claude',
    'Claude Sonnet vs Gemini Pro',
    'Claude pricing',
    'Gemini pricing',
    'AI assistant comparison',
    'best AI for coding',
    'Claude vs Gemini for developers',
    'Anthropic vs Google AI',
    'AI tools 2026',
  ],
  alternates: { canonical: `${BASE_URL}/compare/claude-vs-gemini` },
  openGraph: {
    title: 'Claude vs Gemini 2026 — Pricing, Coding, Multimodal Compared',
    description:
      'Claude vs Gemini: pricing ($20 vs $20), 200K vs 1M context, coding benchmarks, Google ecosystem integration. Which AI wins for your workflow?',
    url: `${BASE_URL}/compare/claude-vs-gemini`,
    siteName: 'Apifeny AI',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude vs Gemini 2026 — Pricing, Coding, Multimodal Compared',
    description:
      'Pricing, context windows, coding, ecosystem — which AI wins for developers and enterprises?',
    images: ['/og'],
  },
  robots: { index: true, follow: true },
};

// ─── Data ────────────────────────────────────────────────────────────
const VERDICT_SCORES = {
  claude: {
    coding: 9.0,
    reasoning: 9.5,
    writing: 9.5,
    creativity: 8.5,
    pricing: 5.0,
    ecosystem: 6.5,
    multimodal: 7.0,
    safety: 9.5,
    context: 8.5,
  },
  gemini: {
    coding: 8.0,
    reasoning: 8.0,
    writing: 7.5,
    creativity: 7.5,
    pricing: 8.5,
    ecosystem: 9.0,
    multimodal: 9.5,
    safety: 7.0,
    context: 10.0,
  },
} as const;

const COMPARISON_ROWS = [
  {
    category: 'Pricing',
    icon: DollarSign,
    items: [
      {
        label: 'Free Tier',
        claude: '⚠️ Limited (Sonnet, daily usage caps).',
        gemini: '✅ Gemini 2.0 Flash — full access, no real limits.',
        winner: 'gemini',
      },
      {
        label: 'Paid Tier',
        claude: '$20/mo Pro · $100+ Max',
        gemini: '$19.99/mo Google One AI Premium (includes 2TB storage).',
        winner: 'gemini',
      },
      {
        label: 'API Pricing (Input)',
        claude: '$3.00 / M tokens (Sonnet)',
        gemini: '$0.10 / M tokens (Flash) · $1.25 / M tokens (Pro)',
        winner: 'gemini',
      },
      {
        label: 'API Pricing (Output)',
        claude: '$15.00 / M tokens',
        gemini: '$0.40 / M tokens (Flash) · $5.00 / M tokens (Pro)',
        winner: 'gemini',
      },
    ],
  },
  {
    category: 'Context & Reasoning',
    icon: Brain,
    items: [
      {
        label: 'Context Window',
        claude: '200K tokens — handles long documents, full codebases.',
        gemini: '1M tokens (Pro) — the largest context window available. Can process entire code repositories.',
        winner: 'gemini',
      },
      {
        label: 'Reasoning Quality',
        claude: '⭐ 9.5/10 — best-in-class chain-of-thought, nuanced analysis.',
        gemini: '7.5/10 — solid but struggles with complex multi-step reasoning.',
        winner: 'claude',
      },
      {
        label: 'Math & Logic',
        claude: 'Strong on formal logic, math proofs, structured reasoning.',
        gemini: 'Good with search-augmented answers, weaker on pure logic puzzles.',
        winner: 'claude',
      },
      {
        label: 'Long Document Analysis',
        claude: 'Excellent — 200K window handles most enterprise docs.',
        gemini: 'Unmatched at 1M tokens — entire book series or giant codebases in one context.',
        winner: 'gemini',
      },
    ],
  },
  {
    category: 'Coding',
    icon: Code,
    items: [
      {
        label: 'Code Generation',
        claude: '⭐ 9/10 — clean, idiomatic code across Python, JS, TS, Rust.',
        gemini: '7.5/10 — decent generation, less consistent on complex architecture.',
        winner: 'claude',
      },
      {
        label: 'Debugging',
        claude: 'Strong — methodically traces errors, explains root causes.',
        gemini: 'Good with Google Cloud integration, weaker on standalone debugging.',
        winner: 'claude',
      },
      {
        label: 'Refactoring',
        claude: 'Excellent — understands code structure, suggests clean abstractions.',
        gemini: 'Adequate — handles simple refactors, misses deeper architectural patterns.',
        winner: 'claude',
      },
      {
        label: 'API & Framework Knowledge',
        claude: 'Broad, up-to-date, especially for modern frameworks.',
        gemini: 'Deep Google ecosystem knowledge (GCP, Firebase, Android), weaker on third-party.',
        winner: 'tie',
      },
    ],
  },
  {
    category: 'Multimodal',
    icon: Image,
    items: [
      {
        label: 'Image Analysis',
        claude: 'Good — reads charts, diagrams, screenshots with text.',
        gemini: '⭐ 9.5/10 — native multimodal, indistinguishable from text processing.',
        winner: 'gemini',
      },
      {
        label: 'Video Understanding',
        claude: '❌ Not supported.',
        gemini: '✅ Native video input — analyzes frames, audio, and dialogue.',
        winner: 'gemini',
      },
      {
        label: 'Audio Processing',
        claude: '❌ Text/image only.',
        gemini: '✅ Native audio understanding — speech, music, environmental sounds.',
        winner: 'gemini',
      },
      {
        label: 'Code Execution',
        claude: '✅ Can write and execute Python (limited sandbox).',
        gemini: '✅ Google Colab + Code Execution API integration.',
        winner: 'tie',
      },
    ],
  },
  {
    category: 'Writing & Creativity',
    icon: BookOpen,
    items: [
      {
        label: 'Long-Form Writing',
        claude: '⭐ 9.5/10 — unmatched prose, essays, reports, and creative fiction.',
        gemini: '7/10 — serviceable but lacks the flair and consistency of Claude.',
        winner: 'claude',
      },
      {
        label: 'Editing & Critique',
        claude: 'Nuanced, constructive, preserves voice while improving clarity.',
        gemini: 'Functional edits, less attentive to tone and style.',
        winner: 'claude',
      },
      {
        label: 'Creative Writing',
        claude: 'Rich storytelling, character development, world-building.',
        gemini: 'Adequate but safe — tends toward generic output.',
        winner: 'claude',
      },
      {
        label: 'Translation',
        claude: 'Excellent — culturally aware, natural-sounding translations.',
        gemini: 'Strong — Google Translate backbone, especially for Asian languages.',
        winner: 'gemini',
      },
    ],
  },
  {
    category: 'Ecosystem',
    icon: Globe,
    items: [
      {
        label: 'Integrations',
        claude: 'API, Slack, GitHub Copilot alternative, desktop app.',
        gemini: 'Google Workspace, Colab, Android, Chrome, Vertex AI, Firebase.',
        winner: 'gemini',
      },
      {
        label: 'Enterprise Features',
        claude: 'Anthropic Console, admin tools, SOC 2, data privacy.',
        gemini: 'Vertex AI, GCP integration, enterprise SSO, IAM.',
        winner: 'tie',
      },
      {
        label: 'Mobile App',
        claude: 'iOS + Android app with voice input.',
        gemini: 'Deep Android integration — Assistant replacement, home screen widget.',
        winner: 'gemini',
      },
      {
        label: 'Internet Search',
        claude: 'Limited — no native web search in standard mode.',
        gemini: '✅ Native Google Search integration — always current with citations.',
        winner: 'gemini',
      },
    ],
  },
  {
    category: 'Safety & Trust',
    icon: Shield,
    items: [
      {
        label: 'Safety Approach',
        claude: '⭐ 9.5/10 — Constitutional AI, red-teaming, refusal rates calibrated.',
        gemini: '6.5/10 — safety guardrails sometimes over-restrict or under-restrict.',
        winner: 'claude',
      },
      {
        label: 'Data Privacy',
        claude: 'Enterprise-grade — does not train on API data by default.',
        gemini: 'Google Cloud data processing terms — reviewed for enterprise compliance.',
        winner: 'claude',
      },
      {
        label: 'Hallucination Rate',
        claude: 'Lowest among major models — consistent, honest responses.',
        gemini: 'Low, but higher on niche topics and less common languages.',
        winner: 'claude',
      },
      {
        label: 'Refusal Behavior',
        claude: 'Calibrated — rarely refuses legitimate tasks.',
        gemini: 'Can be overly cautious — sometimes refuses harmless requests.',
        winner: 'claude',
      },
    ],
  },
];

// ─── Verdict Data ─────────────────────────────────────────────────────
const VERDICT_CASES: { scenario: string; winner: string; explanation: string }[] = [
  {
    scenario: 'You write code daily',
    winner: 'Claude',
    explanation: 'Claude produces cleaner, more idiomatic code across languages. Its reasoning ability makes it better at debugging and refactoring complex systems.',
  },
  {
    scenario: 'You need multimodal AI',
    winner: 'Gemini',
    explanation: 'Gemini handles images, video, and audio natively. If your workflow involves visual content analysis, video understanding, or voice, Gemini is the clear choice.',
  },
  {
    scenario: 'You write long content',
    winner: 'Claude',
    explanation: 'Claude is unmatched for long-form writing, editing, and creative work. Its prose quality and nuanced understanding are best-in-class.',
  },
  {
    scenario: 'You want the best free tier',
    winner: 'Gemini',
    explanation: 'Gemini\'s free tier with Gemini 2.0 Flash offers near-full access with no hard rate limits. Claude\'s free tier has daily usage caps.',
  },
  {
    scenario: 'You need deep Google integration',
    winner: 'Gemini',
    explanation: 'If you live in Google Workspace, use Android, or deploy on GCP, Gemini\'s native ecosystem integration is a massive productivity boost.',
  },
  {
    scenario: 'Safety and compliance matter most',
    winner: 'Claude',
    explanation: 'Claude\'s Constitutional AI approach, lower hallucination rate, and enterprise-grade data privacy make it the safer choice for regulated industries.',
  },
  {
    scenario: 'You process massive documents',
    winner: 'Gemini',
    explanation: 'Gemini\'s 1M token context window lets you ingest entire codebases or book-length documents in one go — no chunking needed.',
  },
];

export default function ClaudeVsGeminiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Compare', item: '/compare' },
          { name: 'Claude vs Gemini', item: '/compare/claude-vs-gemini' },
        ]}
      />
      <div className="min-h-screen bg-[#FAFAF9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Back link */}
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#1F1F1F] mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Comparisons
          </Link>

          {/* Hero */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1F1F1F] mb-3">
              Claude vs Gemini 2026
            </h1>
            <p className="text-base sm:text-lg text-[#666] max-w-3xl leading-relaxed">
              Two very different approaches to AI excellence. Anthropic focuses on safety and deep reasoning.
              Google builds the most multimodal, ecosystem-integrated model on the market.
              Which one belongs in your stack?
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-[#999] font-mono">Updated May 2026</span>
              <span className="text-[#ccc]">·</span>
              <span className="text-xs text-[#999] font-mono">10 min read</span>
            </div>
          </div>

          {/* Verdict Scoreboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <div className="sm:col-span-3">
              <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">Verdict Scoreboard</h2>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🤖</span>
                <span className="font-semibold text-[#1F1F1F]">Claude (Sonnet 4)</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Coding', score: VERDICT_SCORES.claude.coding, barColor: '#D97706' },
                  { label: 'Reasoning', score: VERDICT_SCORES.claude.reasoning, barColor: '#D97706' },
                  { label: 'Writing', score: VERDICT_SCORES.claude.writing, barColor: '#D97706' },
                  { label: 'Creativity', score: VERDICT_SCORES.claude.creativity, barColor: '#D97706' },
                  { label: 'Multimodal', score: VERDICT_SCORES.claude.multimodal, barColor: '#D97706' },
                  { label: 'Safety', score: VERDICT_SCORES.claude.safety, barColor: '#D97706' },
                  { label: 'Ecosystem', score: VERDICT_SCORES.claude.ecosystem, barColor: '#D97706' },
                  { label: 'Context Window', score: VERDICT_SCORES.claude.context, barColor: '#D97706' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs text-[#666] mb-0.5">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.score}/10</span>
                    </div>
                    <div className="h-1.5 bg-[#F0EEE8] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.score * 10}%`, background: item.barColor }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔮</span>
                <span className="font-semibold text-[#1F1F1F]">Gemini (Pro 2.0)</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Coding', score: VERDICT_SCORES.gemini.coding, barColor: '#2563EB' },
                  { label: 'Reasoning', score: VERDICT_SCORES.gemini.reasoning, barColor: '#2563EB' },
                  { label: 'Writing', score: VERDICT_SCORES.gemini.writing, barColor: '#2563EB' },
                  { label: 'Creativity', score: VERDICT_SCORES.gemini.creativity, barColor: '#2563EB' },
                  { label: 'Multimodal', score: VERDICT_SCORES.gemini.multimodal, barColor: '#2563EB' },
                  { label: 'Safety', score: VERDICT_SCORES.gemini.safety, barColor: '#2563EB' },
                  { label: 'Ecosystem', score: VERDICT_SCORES.gemini.ecosystem, barColor: '#2563EB' },
                  { label: 'Context Window', score: VERDICT_SCORES.gemini.context, barColor: '#2563EB' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs text-[#666] mb-0.5">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.score}/10</span>
                    </div>
                    <div className="h-1.5 bg-[#F0EEE8] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.score * 10}%`, background: item.barColor }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5 flex flex-col items-center justify-center text-center">
              <BarChart3 className="h-8 w-8 text-[#D97706] mb-2" />
              <p className="text-sm font-semibold text-[#1F1F1F]">Our Take</p>
              <p className="text-xs text-[#666] mt-1 leading-relaxed">
                Claude wins for <strong>coding + writing + safety</strong>.<br />
                Gemini wins for <strong>multimodal + ecosystem + pricing</strong>.<br />
                <span className="text-[#D97706] font-semibold">Best overall: Claude</span>, but the gap narrows with every Gemini release.
              </p>
            </div>
          </div>

          {/* Detailed Comparison */}
          {COMPARISON_ROWS.map((section) => (
            <div key={section.category} className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <section.icon className="h-5 w-5 text-[#D97706]" />
                <h2 className="text-lg font-semibold text-[#1F1F1F]">{section.category}</h2>
              </div>
              <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
                <div className="grid grid-cols-[1fr_1fr_1fr_auto] text-xs font-semibold text-[#666] uppercase tracking-wider bg-[#F5F4F0] px-4 py-3 border-b border-[#E5E0D8]">
                  <span>Attribute</span>
                  <span className="text-[#D97706]">Claude</span>
                  <span className="text-[#2563EB]">Gemini</span>
                  <span className="sr-only">Winner</span>
                </div>
                {section.items.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`grid grid-cols-[1fr_1fr_1fr_auto] gap-2 px-4 py-3 ${
                      idx < section.items.length - 1 ? 'border-b border-[#F0EEE8]' : ''
                    }`}
                  >
                    <div className="text-sm font-medium text-[#1F1F1F] self-center">{item.label}</div>
                    <div className={`text-xs leading-relaxed self-center ${item.winner === 'claude' ? 'font-semibold text-[#1F1F1F]' : 'text-[#666]'}`}>
                      {('claude' in item ? (item as any).claude : '—')}
                    </div>
                    <div className={`text-xs leading-relaxed self-center ${item.winner === 'gemini' ? 'font-semibold text-[#1F1F1F]' : 'text-[#666]'}`}>
                      {('gemini' in item ? (item as any).gemini : '—')}
                    </div>
                    <div className="self-center">
                      {item.winner === 'claude' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          Claude
                        </span>
                      )}
                      {item.winner === 'gemini' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#2563EB] bg-[#DBEAFE] px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          Gemini
                        </span>
                      )}
                      {item.winner === 'tie' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#666] bg-[#F0EEE8] px-2 py-0.5 rounded-full">
                          Tie
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Use Case Verdicts */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">Which Should You Choose?</h2>
            <div className="space-y-3">
              {VERDICT_CASES.map((verdict) => (
                <div
                  key={verdict.scenario}
                  className="bg-white rounded-xl border border-[#E5E0D8] p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-[#1F1F1F]">{verdict.scenario}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          verdict.winner === 'Claude'
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#DBEAFE] text-[#2563EB]'
                        }`}>
                          → {verdict.winner}
                        </span>
                      </div>
                      <p className="text-xs text-[#666] leading-relaxed">{verdict.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference Table */}
          <div className="bg-gradient-to-br from-[#FEFCE8] to-[#FFF] rounded-2xl border border-[#E5E0D8] p-5 sm:p-6 mb-10">
            <h2 className="text-base font-semibold text-[#1F1F1F] mb-3">Quick Reference</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white rounded-xl border border-[#E5E0D8] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🤖</span>
                  <span className="font-semibold text-[#1F1F1F]">Choose Claude when…</span>
                </div>
                <ul className="space-y-1">
                  {[
                    'You write code daily and need deep reasoning',
                    'Long-form writing and editing are core to your work',
                    'Safety, compliance, and low hallucination matter',
                    'You prefer nuanced, thoughtful conversation',
                    'You need strong debugging and refactoring',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#666]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#D97706] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-[#E5E0D8] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔮</span>
                  <span className="font-semibold text-[#1F1F1F]">Choose Gemini when…</span>
                </div>
                <ul className="space-y-1">
                  {[
                    'Multimodal input (video, audio, images) is essential',
                    'You live in the Google ecosystem (Workspace, GCP, Android)',
                    'You want the best free tier AI available',
                    'You need to process massive documents (1M context)',
                    'Budget-friendly API pricing matters',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#666]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* More Comparisons */}
          <div className="border-t border-[#E5E0D8] pt-8">
            <h2 className="text-base font-semibold text-[#1F1F1F] mb-4">More AI Comparisons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/compare/chatgpt-vs-claude"
                className="block bg-white rounded-xl border border-[#E5E0D8] p-4 hover:border-[#D97706] hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">💬</span>
                  <span className="font-medium text-sm text-[#1F1F1F]">ChatGPT vs Claude</span>
                </div>
                <p className="text-xs text-[#666]">Pricing, coding, and features compared head-to-head.</p>
              </Link>
              <Link
                href="/compare/gemini-vs-chatgpt"
                className="block bg-white rounded-xl border border-[#E5E0D8] p-4 hover:border-[#D97706] hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">⚡</span>
                  <span className="font-medium text-sm text-[#1F1F1F]">Gemini vs ChatGPT</span>
                </div>
                <p className="text-xs text-[#666]">Google vs OpenAI — ecosystem, multimodal, and pricing.</p>
              </Link>
              <Link
                href="/compare/deepseek-vs-chatgpt"
                className="block bg-white rounded-xl border border-[#E5E0D8] p-4 hover:border-[#D97706] hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🧠</span>
                  <span className="font-medium text-sm text-[#1F1F1F]">DeepSeek vs ChatGPT</span>
                </div>
                <p className="text-xs text-[#666]">Open-source challenger vs the incumbent.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
