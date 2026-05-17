'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search, Sparkles, TrendingUp, Layers, BookOpen, Trophy, ArrowRight,
  Zap, ChevronRight
} from 'lucide-react';
import FeaturedCategories from '@/components/FeaturedCategories';
import TrendingTools from '@/components/TrendingTools';
import SponsoredToolSpot from '@/components/SponsoredToolSpot';
import MustUseThisMonth from '@/components/MustUseThisMonth';
import FeaturedCollections from '@/components/FeaturedCollections';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import FeaturedRankings from '@/components/FeaturedRankings';
import SuccessStories from '@/components/SuccessStories';
import PipelineVisual from '@/components/PipelineVisual';

// ─── Inline SVG Components ──────────────────────────────────

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto h-auto"
    >
      <defs>
        <linearGradient id="hero-grad-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="hero-grad-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="300" cy="210" rx="220" ry="160" fill="url(#hero-grad-1)" />

      {/* Central node */}
      <circle cx="300" cy="200" r="20" fill="#7C3AED" opacity="0.35" />
      <circle cx="300" cy="200" r="10" fill="#8B5CF6" opacity="0.6" filter="url(#glow)" />

      {/* Connecting lines */}
      <line x1="180" y1="160" x2="290" y2="195" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3" />
      <line x1="420" y1="160" x2="310" y2="195" stroke="#22D3EE" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3" />
      <line x1="180" y1="250" x2="290" y2="210" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="4 3" />
      <line x1="420" y1="250" x2="310" y2="210" stroke="#22D3EE" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="4 3" />

      {/* Node: Your Goal */}
      <g>
        <rect x="100" y="135" width="90" height="40" rx="20" fill="#111125" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.5" />
        <text x="145" y="160" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontFamily="sans-serif" fontWeight="600">Your Goal</text>
        <text x="145" y="130" textAnchor="middle" fill="#555578" fontSize="9" fontFamily="sans-serif">🎯 Problem</text>
      </g>

      {/* Node: Playbook */}
      <g filter="url(#glow)">
        <rect x="245" y="175" width="110" height="50" rx="25" fill="#1A1A30" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="300" y="200" textAnchor="middle" fill="#C4B5FD" fontSize="12" fontFamily="sans-serif" fontWeight="600">📖 Playbook</text>
        <text x="300" y="216" textAnchor="middle" fill="#8888AA" fontSize="9" fontFamily="sans-serif">Step-by-step guide</text>
      </g>

      {/* Node: Tools */}
      <g>
        <rect x="410" y="135" width="90" height="40" rx="20" fill="#111125" stroke="#22D3EE" strokeWidth="1.5" strokeOpacity="0.5" />
        <text x="455" y="160" textAnchor="middle" fill="#22D3EE" fontSize="12" fontFamily="sans-serif" fontWeight="600">Tools</text>
        <text x="455" y="130" textAnchor="middle" fill="#555578" fontSize="9" fontFamily="sans-serif">🔧 Solution</text>
      </g>

      {/* Results node */}
      <line x1="300" y1="225" x2="300" y2="260" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="4 3" />
      <g>
        <rect x="230" y="260" width="140" height="36" rx="18" fill="url(#hero-grad-2)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" />
        <text x="300" y="283" textAnchor="middle" fill="#E8E8F0" fontSize="12" fontFamily="sans-serif" fontWeight="600">✨ Results</text>
      </g>

      {/* Floating tool indicators */}
      <g opacity="0.6">
        <rect x="140" y="295" width="28" height="28" rx="8" fill="#111125" stroke="#555578" strokeWidth="0.8" />
        <text x="154" y="314" textAnchor="middle" fill="#8888AA" fontSize="11" fontFamily="sans-serif">W</text>
      </g>
      <g opacity="0.6">
        <rect x="190" y="310" width="28" height="28" rx="8" fill="#111125" stroke="#555578" strokeWidth="0.8" />
        <text x="204" y="329" textAnchor="middle" fill="#8888AA" fontSize="11" fontFamily="sans-serif">C</text>
      </g>
      <g opacity="0.6">
        <rect x="380" y="295" width="28" height="28" rx="8" fill="#111125" stroke="#555578" strokeWidth="0.8" />
        <text x="394" y="314" textAnchor="middle" fill="#8888AA" fontSize="11" fontFamily="sans-serif">G</text>
      </g>
      <g opacity="0.6">
        <rect x="430" y="310" width="28" height="28" rx="8" fill="#111125" stroke="#555578" strokeWidth="0.8" />
        <text x="444" y="329" textAnchor="middle" fill="#8888AA" fontSize="11" fontFamily="sans-serif">M</text>
      </g>
    </svg>
  );
}

function UseCaseIcon({ type }: { type: string }) {
  switch (type) {
    case 'content':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 flex-shrink-0">
          <rect x="4" y="8" width="40" height="32" rx="6" stroke="#8B5CF6" strokeWidth="1.5" fill="#111125" fillOpacity="0.5" />
          <line x1="14" y1="18" x2="34" y2="18" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="14" y1="24" x2="30" y2="24" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <line x1="14" y1="30" x2="26" y2="30" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          <circle cx="38" cy="12" r="6" fill="#7C3AED" opacity="0.3" />
          <path d="M36 12h4M38 10v4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'code':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 flex-shrink-0">
          <rect x="6" y="10" width="36" height="28" rx="4" stroke="#22D3EE" strokeWidth="1.5" fill="#111125" fillOpacity="0.5" />
          <circle cx="12" cy="16" r="2" fill="#22D3EE" opacity="0.5" />
          <circle cx="18" cy="16" r="2" fill="#22D3EE" opacity="0.5" />
          <rect x="10" y="22" width="28" height="2" rx="1" fill="#22D3EE" opacity="0.3" />
          <rect x="10" y="28" width="20" height="2" rx="1" fill="#22D3EE" opacity="0.2" />
          <path d="M36 22l4 4-4 4" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
      );
    case 'research':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 flex-shrink-0">
          <circle cx="24" cy="24" r="14" stroke="#FFD700" strokeWidth="1.5" fill="#111125" fillOpacity="0.5" />
          <circle cx="24" cy="24" r="8" stroke="#FFD700" strokeWidth="1" opacity="0.4" />
          <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <circle cx="24" cy="24" r="3" fill="#FFD700" opacity="0.3" />
        </svg>
      );
    case 'design':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 flex-shrink-0">
          <rect x="8" y="12" width="32" height="24" rx="4" stroke="#F43F5E" strokeWidth="1.5" fill="#111125" fillOpacity="0.5" />
          <rect x="14" y="16" width="20" height="12" rx="2" stroke="#F43F5E" strokeWidth="1" opacity="0.3" />
          <circle cx="24" cy="22" r="4" fill="#F43F5E" opacity="0.3" />
          <circle cx="24" cy="22" r="2" fill="#F43F5E" opacity="0.5" />
          <path d="M8 30h32" stroke="#F43F5E" strokeWidth="1" opacity="0.2" />
        </svg>
      );
    case 'marketing':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 flex-shrink-0">
          <rect x="4" y="14" width="16" height="20" rx="3" stroke="#10B981" strokeWidth="1.5" fill="#111125" fillOpacity="0.5" />
          <rect x="28" y="14" width="16" height="20" rx="3" stroke="#10B981" strokeWidth="1.5" fill="#111125" fillOpacity="0.5" />
          <line x1="12" y1="34" x2="12" y2="40" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
          <line x1="36" y1="34" x2="36" y2="40" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
          <line x1="12" y1="40" x2="36" y2="40" stroke="#10B981" strokeWidth="1.5" opacity="0.3" />
          <path d="M22 12l4 4M22 36l4-4" stroke="#10B981" strokeWidth="1" opacity="0.3" />
          <circle cx="24" cy="24" r="3" fill="#10B981" opacity="0.2" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Data ──────────────────────────────────────────────────

interface ToolItem {
  name: string;
  slug: string;
  tagline?: string;
}

interface UseCaseSection {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  tools: ToolItem[];
  playbookSlug: string;
  categorySlug: string;
  gradient: string;
  borderGlow: string;
  svgType: string;
}

const useCaseSections: UseCaseSection[] = [
  {
    id: 'content-creation',
    icon: '\u270d\ufe0f',
    title: 'Content Creation',
    subtitle: 'Blog posts \u00b7 Social media \u00b7 Email \u00b7 Scripts',
    description: 'The problem: staring at a blank page, hours of drafting, inconsistent quality. The playbook: use ChatGPT for outlines, Claude for long-form drafts, Perplexity for research, Canva for visuals. Publish 3x faster without sacrificing quality.',
    tools: [
      { name: 'ChatGPT', slug: 'chatgpt', tagline: 'Versatile writing assistant' },
      { name: 'Claude', slug: 'claude', tagline: 'Long-form specialist' },
      { name: 'Perplexity', slug: 'perplexity', tagline: 'Research engine' },
      { name: 'Canva AI', slug: 'canva-ai', tagline: 'Visual content' },
      { name: 'Jasper', slug: 'jasper', tagline: 'Marketing copy' },
    ],
    playbookSlug: 'content-creation-with-chatgpt',
    categorySlug: 'content-creation',
    gradient: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
    borderGlow: 'hover:border-violet-500/50',
    svgType: 'content',
  },
  {
    id: 'code-dev',
    icon: '\u26a1',
    title: 'Code & Development',
    subtitle: 'Ship apps \u00b7 Automate workflows \u00b7 Better code',
    description: 'The problem: slow dev cycles, debugging hell, context switching. The playbook: Cursor + Claude for pair programming, GitHub Copilot for autocomplete, Devin for autonomous PRs. Go from idea to deployed MVP in hours.',
    tools: [
      { name: 'Cursor', slug: 'cursor', tagline: 'AI-native IDE' },
      { name: 'Claude', slug: 'claude', tagline: 'Complex reasoning' },
      { name: 'GitHub Copilot', slug: 'copilot', tagline: 'Code autocomplete' },
      { name: 'Devin', slug: 'devin', tagline: 'Autonomous engineer' },
      { name: 'Gemini', slug: 'gemini', tagline: 'Multi-language code' },
    ],
    playbookSlug: 'build-an-app-with-cursor',
    categorySlug: 'code-development',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderGlow: 'hover:border-cyan-500/50',
    svgType: 'code',
  },
  {
    id: 'research',
    icon: '\ud83d\udd0d',
    title: 'Research & Analysis',
    subtitle: 'Deep research \u00b7 Data analysis \u00b7 Intelligence',
    description: 'The problem: information overload, slow research, drawing wrong conclusions. The playbook: Perplexity for real-time research, Claude for 200K-token document analysis, Gemini for Google integration, ChatGPT for synthesis. Find answers in minutes.',
    tools: [
      { name: 'Perplexity', slug: 'perplexity', tagline: 'Web research engine' },
      { name: 'Claude', slug: 'claude', tagline: 'Document analysis' },
      { name: 'Gemini', slug: 'gemini', tagline: 'Google integration' },
      { name: 'ChatGPT', slug: 'chatgpt', tagline: 'Synthesis' },
      { name: 'Notion AI', slug: 'notion-ai', tagline: 'Notes & knowledge' },
    ],
    playbookSlug: 'ai-for-data-analysis',
    categorySlug: 'research-analysis',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderGlow: 'hover:border-emerald-500/50',
    svgType: 'research',
  },
  {
    id: 'design',
    icon: '\ud83c\udfa8',
    title: 'Design & Creative',
    subtitle: 'Visuals \u00b7 Videos \u00b7 Presentations \u00b7 Brand',
    description: 'The problem: expensive designers, slow iterations, inconsistent branding. The playbook: Canva AI for instant designs, Midjourney for custom imagery, Runway for video editing, Suno for music. Professional assets without a design degree.',
    tools: [
      { name: 'Canva AI', slug: 'canva-ai', tagline: 'All-in-one design' },
      { name: 'Midjourney', slug: 'midjourney', tagline: 'AI image generation' },
      { name: 'Runway', slug: 'runway', tagline: 'Video editing AI' },
      { name: 'Descript', slug: 'descript', tagline: 'Audio & video' },
      { name: 'Suno', slug: 'suno', tagline: 'Music generation' },
    ],
    playbookSlug: 'ai-video-production',
    categorySlug: 'design',
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    borderGlow: 'hover:border-rose-500/50',
    svgType: 'design',
  },
  {
    id: 'marketing',
    icon: '\ud83d\udcc8',
    title: 'Marketing & Growth',
    subtitle: 'SEO \u00b7 Email \u00b7 Social \u00b7 Ads',
    description: 'The problem: scattered campaigns, low conversion, guessing what works. The playbook: ChatGPT for strategy, Perplexity for keyword research, Synthesia for video, Intercom AI for chatbots. Data-driven marketing that converts.',
    tools: [
      { name: 'ChatGPT', slug: 'chatgpt', tagline: 'Strategy & copy' },
      { name: 'Perplexity', slug: 'perplexity', tagline: 'SEO research' },
      { name: 'Synthesia', slug: 'synthesia', tagline: 'AI video marketing' },
      { name: 'Intercom AI', slug: 'intercom-ai', tagline: 'Chatbot automation' },
      { name: 'Canva AI', slug: 'canva-ai', tagline: 'Campaign visuals' },
    ],
    playbookSlug: 'ai-marketing-for-asia',
    categorySlug: 'marketing',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderGlow: 'hover:border-amber-500/50',
    svgType: 'marketing',
  },
];

const pipelineItems = [
  { stage: '\ud83d\udca1 Idea', color: 'from-violet-500 to-purple-600', desc: 'Can\'t think what to build? Start here.' },
  { stage: '\ud83d\udd0d Research', color: 'from-cyan-500 to-blue-600', desc: 'Validate your idea before you build.' },
  { stage: '\u26a1 Build', color: 'from-fuchsia-500 to-pink-600', desc: 'Ship fast with AI-assisted coding.' },
  { stage: '\ud83d\ude80 Market', color: 'from-amber-500 to-orange-600', desc: 'Launch and grow your audience.' },
  { stage: '\ud83d\udcc8 Scale', color: 'from-emerald-500 to-teal-600', desc: 'Automate and optimize at scale.' },
];

const stats = [
  { icon: BookOpen, value: '71', label: 'AI Playbooks', desc: 'Step-by-step guides that work' },
  { icon: Layers, value: '90+', label: 'AI Tools', desc: 'Curated, reviewed & ranked' },
  { icon: TrendingUp, value: '5', label: 'Pipeline Stages', desc: 'Idea \u2192 Research \u2192 Build \u2192 Market \u2192 Scale' },
  { icon: Trophy, value: 'Asia', label: 'Ranked', desc: 'Editorial scores for Asia' },
];

const filterPills = [
  { label: 'Free', filter: 'pricing=Free' },
  { label: 'Paid', filter: 'pricing=Paid' },
  { label: 'Agentic', filter: 'agentic=true' },
  { label: 'Multimodal', filter: 'multimodal=true' },
  { label: 'Asia-Ready', filter: 'asiaReady=true' },
];

// ─── Page Component ───────────────────────────────────────

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const statsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      {/* ════════════════════════════════════════════════ */}
      {/* HERO — Problem -> Playbook -> Tools            */}
      {/* ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-4">
        {/* Animated bg */}
        <div className="absolute inset-0 bg-tech-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-neon/8 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
        <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-neon/10 rounded-full blur-[150px] animate-pulse-glow pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-aqua/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4 sm:mb-5 animate-fade-in shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <Sparkles className="w-3.5 h-3.5" />
                71 Playbooks &middot; Curated Tools &middot; Real Results
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 animate-slide-up">
                Stop collecting AI tools.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-light via-aqua to-asia">
                  Start shipping results.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-tech-100/70 max-w-xl mb-4 animate-slide-up leading-relaxed">
                71 step-by-step playbooks. 90+ curated tools. One clear path from problem to solution.{' '}
                <strong className="text-white">Pick what you want to do &mdash; we show you exactly how.</strong>
                No endless directories. No hype. Just workflows that ship.
              </p>

              <form onSubmit={handleSearch} className="max-w-lg mb-4 animate-slide-up">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon via-aqua to-asia rounded-xl opacity-0 group-focus-within:opacity-30 blur-sm transition-opacity duration-300" />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tech-300 z-10" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What do you want to build or automate?"
                    className="relative w-full bg-tech-900/95 border border-tech-500/30 rounded-xl pl-12 pr-24 py-4 text-base text-white placeholder:text-tech-400/70 focus:outline-none focus:border-neon/60 focus:ring-2 focus:ring-neon/15 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="flex flex-wrap items-center gap-2 animate-fade-in">
                {filterPills.map((pill) => (
                  <Link
                    key={pill.label}
                    href={`/tools?${pill.filter}`}
                    className="px-3 py-1.5 rounded-full border border-tech-500/30 bg-tech-700/60 text-tech-100 hover:text-white hover:border-neon/40 hover:bg-tech-700 text-xs sm:text-sm font-medium transition"
                  >
                    {pill.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: SVG */}
            <div className="hidden lg:block animate-fade-in">
              <HeroIllustration />
            </div>
          </div>

          <div className="mt-6 lg:mt-8">
            <PipelineVisual />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* USE CASE SECTIONS                              */}
      {/* ════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 border-t border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-neon/10 to-aqua/10 border border-neon/15 text-neon-light text-xs font-medium mb-4 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <Zap className="w-3.5 h-3.5" />
              Problem &rarr; Playbook &rarr; Tools
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              What do you want to accomplish?
            </h2>
            <p className="text-tech-200 text-sm sm:text-base max-w-2xl mx-auto">
              Every workflow starts with a real problem. Pick yours &mdash; we give you the
              playbook and the tools. No database of 10,000 tools. Just what works.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {useCaseSections.map((section) => (
              <div
                key={section.id}
                className={`group relative rounded-2xl bg-gradient-to-br ${section.gradient} bg-tech-700/50 border border-tech-500/20 ${section.borderGlow} transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-neon/10 overflow-hidden backdrop-blur-sm`}
              >
                <div className="absolute inset-0 bg-tech-grid opacity-5 pointer-events-none" />

                <div className="relative p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-shrink-0">
                      <UseCaseIcon type={section.svgType} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{section.icon}</span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-neon-light transition-colors">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-xs text-tech-200 mb-2 uppercase tracking-wider font-medium">
                        {section.subtitle}
                      </p>

                      <p className="text-sm text-tech-100/70 leading-relaxed mb-4">
                        {section.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                        {section.tools.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-tech-600/50 border border-tech-500/15 hover:bg-tech-600/80 hover:border-neon/30 transition group/tool"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon/30 to-aqua/20 flex items-center justify-center text-[10px] font-bold text-neon-light flex-shrink-0">
                              {tool.name[0]}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-white truncate">{tool.name}</div>
                              {tool.tagline && (
                                <div className="text-[9px] text-tech-300 truncate">{tool.tagline}</div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={`/playbook/${section.playbookSlug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neon/15 border border-neon/20 text-neon-light text-xs font-medium hover:bg-neon/25 transition"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          View playbook
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          href={`/categories/${section.categorySlug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-tech-600/50 border border-tech-500/20 text-tech-200 text-xs font-medium hover:text-white hover:border-tech-400/30 transition"
                        >
                          Browse all tools
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon/15 to-aqua/10 border border-neon/25 text-neon-light text-sm font-medium hover:bg-neon/20 transition hover:-translate-y-0.5 shadow-lg shadow-neon/5"
            >
              <BookOpen className="w-4 h-4" />
              Browse all 71 playbooks
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-tech-700/80 border border-tech-500/30 text-white text-sm font-medium hover:border-tech-400/50 transition hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <Layers className="w-4 h-4" />
              All 90+ tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* STATS BAR                                      */}
      {/* ════════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="relative py-10 sm:py-12 border-y border-tech-500/20 bg-tech-800/40"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-neon/10 mb-3">
                    <Icon className="w-5 h-5 text-neon-light" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-tech-200 mt-1">{stat.label}</div>
                  <div className="text-[10px] sm:text-xs text-tech-300 mt-0.5">{stat.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* PIPELINE STAGES                                */}
      {/* ════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-tech-800/30 border-t border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Follow a pipeline, not a directory
            </h2>
            <p className="text-sm text-tech-200">
              Every playbook fits into one of these stages. Pick where you are.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {pipelineItems.map((item) => (
              <Link
                key={item.stage}
                href={`/playbooks?pipeline=${item.stage.replace(/[^\w]/g, '').toLowerCase()}`}
                className="group relative px-5 py-3 rounded-xl bg-tech-700 border border-tech-500/30 hover:border-transparent transition-all hover:-translate-y-0.5 overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${item.color}`} />
                <div className="relative flex items-center gap-2">
                  <span className="text-base">{item.stage}</span>
                  <ArrowRight className="w-3 h-3 text-tech-300 group-hover:text-white transition-colors" />
                </div>
                <p className="relative text-[10px] text-tech-300 group-hover:text-white/80 transition-colors mt-0.5">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PLAYBOOKS ─── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* ─── MUST-USE THIS MONTH ─── */}
      <section className="py-16 sm:py-20 bg-tech-800/30 border-y border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MustUseThisMonth />
        </div>
      </section>

      {/* ─── TRENDING TOOLS ─── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingTools />
        </div>
      </section>

      {/* ─── FEATURED CATEGORIES ─── */}
      <section className="py-16 sm:py-20 bg-tech-800/30 border-y border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedCategories />
        </div>
      </section>

      {/* ─── RANKINGS ─── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedRankings />
        </div>
      </section>

      {/* ─── SUCCESS STORIES ─── */}
      <section className="py-16 sm:py-20 bg-tech-800/30 border-y border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SuccessStories />
        </div>
      </section>

      {/* ─── SPONSORED ─── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SponsoredToolSpot />
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <NewsletterSignup source="homepage-cta" />
        </div>
      </section>
    </div>
  );
}
