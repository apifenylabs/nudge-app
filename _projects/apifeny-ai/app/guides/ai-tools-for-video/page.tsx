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
  Film,
  Clapperboard,
  Captions,
  Play,
  Video,
  Palette,
  Share2,
  PenTool,
  Filter,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQSchema from '@/components/FAQSchema';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'Best AI Tools for Video in 2026 — Create, Edit & Scale Video Content | Apifeny AI',
  description:
    'Compare the best AI tools for video in 2026 — AI video generation, editing, auto-subtitling, social video, animation, and analytics. Vetted for creators, marketers, and small businesses in Asia.',
  keywords: [
    'AI video tools',
    'AI video generator',
    'AI video editor',
    'best AI video tools 2026',
    'AI video creation',
    'AI video generation',
    'AI video editing software',
    'AI subtitling tools',
    'AI video analytics',
    'AI animation tools',
    'AI social video creator',
    'AI video marketing',
    'best video AI tools',
    'AI video platform',
    'AI video tools for small business',
    'text to video AI',
    'AI avatar video',
    'Runway Gen-3',
    'Pika AI video',
    'Synthesia AI',
    'Descript video editor',
    'Kapwing AI',
    'Veed.io',
    'Opus Clip',
    'Submagic',
    'Dubverse',
    'Canva AI video',
    'Clipchamp',
    'InVideo AI',
    'Animaker',
    'Vyond',
    'Jitter animation',
    'VidIQ',
    'TubeBuddy',
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/ai-tools-for-video`,
  },
  openGraph: {
    title: 'Best AI Tools for Video in 2026 — Create, Edit & Scale Video Content',
    description:
      'Practical guide to the best AI tools for video. Generation, editing, subtitling, social content, animation, and analytics — vetted for creators and small businesses in Asia.',
    url: `${BASE_URL}/guides/ai-tools-for-video`,
    type: 'article',
    locale: 'en_US',
    siteName: 'Apifeny AI',
    images: [
      {
        url: `${BASE_URL}/og/ai-tools-for-video.jpg`,
        width: 1200,
        height: 630,
        alt: 'Best AI Tools for Video in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Video in 2026 — Create, Edit & Scale Video Content',
    description:
      'Practical guide to the best AI tools for video — generation, editing, subtitling, social content, animation, and analytics for creators and small businesses.',
  },
};

// ─── Content sections ───
const sections = [
  {
    id: 'ai-video-generation',
    title: '1. AI Video Generation',
    icon: Video,
    color: 'bg-blue-50 dark:bg-blue-950/30',
    text: `Video generation has undergone a paradigm shift in 2026. AI models can now produce cinematic-quality footage from text prompts, maintain character consistency across scenes, and generate entire narratives with controlled camera motion. What used to require a full production crew — cameras, actors, lighting, sets — is now accessible from a single browser tab.

For Asian content creators, today's AI video generators offer:
• Multi-language text prompts (English, Chinese, Japanese, Korean, Thai, Vietnamese)
• Culturally-aware avatar options with Asian features and accents
• Aspect ratios optimized for Asian platforms (TikTok vertical, YouTube, WeChat)
• Localized voice-overs with region-specific pronunciation
• Scene-consistent characters across different videos

The best AI video generation tools in 2026 combine text-to-video, image-to-video, and video-to-video in one platform. They support 4K output, frame interpolation, and real-time collaboration. Pricing has dropped significantly — what cost $500/month in 2024 now starts at $10–30/month.`,
    tools: ['runway', 'pika', 'synthesia'],
    affiliateSuggestions: [
      { name: 'Runway', slug: 'runway', note: 'Best cinematic quality with Gen-3 Alpha' },
      { name: 'Pika', slug: 'pika', note: 'Best for viral social media clips' },
      { name: 'Synthesia', slug: 'synthesia', note: 'Best for AI avatar presenter videos' },
    ],
  },
  {
    id: 'ai-video-editing',
    title: '2. AI Video Editing',
    icon: Clapperboard,
    color: 'bg-green-50 dark:bg-green-950/30',
    text: `Traditional video editing — timeline slicing, scrubbing through footage, manual trimming — is being replaced by AI-native workflows. Modern AI video editors let you edit video by editing text: the transcription becomes your timeline. Cut words from the transcript and the video cuts accordingly.

Key AI editing features that save hours per video:
• Text-based editing: edit the transcript, the video follows
• AI-powered noise reduction and audio cleanup
• Automatic filler word removal ("um", "uh", "like")
• Smart silence detection and removal
• AI scene detection and auto-chaptering
• One-click aspect ratio resizing (16:9 → 9:16 for Reels/TikTok)
• AI eye-contact correction and gaze adjustment
• Background removal and replacement
• Auto-color grading and lighting correction
• Multi-track AI voice isolation

For Asian markets, look for tools that support non-English transcription accurately. Many AI editors now handle Chinese, Japanese, Korean, Thai, and Vietnamese with high accuracy — essential for local content teams creating videos in multiple languages.`,
    tools: ['descript', 'runway', 'heygen'],
    affiliateSuggestions: [
      { name: 'Descript', slug: 'descript', note: 'Best text-based editing workflow' },
      { name: 'Runway', slug: 'runway', note: 'Professional AI editing with Gen-3 tools' },
      { name: 'HeyGen', slug: 'heygen', note: 'AI avatar editing and translation' },
    ],
  },
  {
    id: 'ai-subtitling-translation',
    title: '3. AI Auto-Subtitling & Translation',
    icon: Captions,
    color: 'bg-purple-50 dark:bg-purple-950/30',
    text: `Subtitles are no longer optional — platforms like TikTok, Instagram Reels, and YouTube Shorts default to sound-off viewing. AI-powered subtitling and translation tools have become essential for anyone creating video content, especially for multi-language Asian audiences.

What modern AI subtitling tools handle automatically:
• Speech-to-text in 50+ languages with speaker diarization
• Auto-translation between Asian language pairs (e.g., Korean → Thai, Chinese → Vietnamese)
• Styled captions with animated text, emojis, and highlight effects
• Burned-in and separate SRT/ASS subtitle file export
• Keyword highlighting for engagement
• Multi-language subtitle tracks in a single video
• Lip-sync translation (dub voices while matching mouth movement)
• Platform-optimized caption placement (safe zones for TikTok vs YouTube)

For Asian content creators, the ability to auto-translate a single video into 5–10 Asian languages and dub it with matched lip-sync is a game-changer. A 10-minute video that took 8 hours to subtitle manually now takes under 5 minutes with AI.`,
    tools: ['descript', 'runway', 'heygen'],
    affiliateSuggestions: [
      { name: 'Descript', slug: 'descript', note: 'Auto-transcribe and caption in one click' },
      { name: 'HeyGen', slug: 'heygen', note: 'Best lip-sync translation for Asian languages' },
    ],
  },
  {
    id: 'ai-social-video',
    title: '4. AI Social Video Creators',
    icon: Play,
    color: 'bg-amber-50 dark:bg-amber-950/30',
    text: `Social media demands a relentless volume of short-form video. AI social video creators let you repurpose one piece of content into dozens of platform-optimized clips, complete with captions, transitions, music, and CTAs — in minutes instead of hours.

AI features in modern social video tools:
• Auto-repurposing: turn a long-form video into 10+ shorts/clips
• Smart trimming: AI finds the most engaging moments
• Auto-captioning with platform-specific styles
• AI music selection and beat-synced transitions
• Template-based rapid creation for consistent branding
• One-click resizing for TikTok, Reels, YouTube Shorts, LinkedIn
• Hashtag and title suggestions based on content analysis
• AI thumbnail generation with highest-click potential

For Asian small businesses, social video tools are particularly valuable for creating localized content at scale. A single product demo can be auto-cropped, captioned, and translated for different platforms and languages simultaneously.`,
    tools: ['canva-ai', 'descript', 'runway', 'pika'],
    affiliateSuggestions: [
      { name: 'Canva AI', slug: 'canva-ai', note: 'Best all-in-one social video creator' },
      { name: 'Descript', slug: 'descript', note: 'Best for repurposing long-form to short-form' },
      { name: 'Pika', slug: 'pika', note: 'Best for creative social media clips' },
    ],
  },
  {
    id: 'ai-animation-motion',
    title: '5. AI Animation & Motion Graphics',
    icon: Palette,
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    text: `Animation used to require years of training in After Effects, Maya, or Blender. AI has democratized motion graphics — describe what you want and the AI generates animated explainers, character animations, kinetic typography, and logo animations in seconds.

AI animation capabilities in 2026:
• Text-to-animated explainer videos with character rigging
• AI character animation with facial expressions and lip sync
• Kinetic typography and text animation from a prompt
• Logo and icon animation with preset motion styles
• Whiteboard animation auto-generation from scripts
• Motion graphics templates with AI-customizable elements
• AI-powered tweening and keyframe interpolation
• Custom color palette animation with brand consistency

For businesses in Asia, AI animation tools are particularly popular for educational content, product explainers, and corporate training videos. The ability to switch character styles, backgrounds, and languages without re-animating makes them incredibly cost-effective for multi-market campaigns.`,
    tools: ['runway', 'pika', 'canva-ai', 'descript'],
    affiliateSuggestions: [
      { name: 'Runway', slug: 'runway', note: 'Best motion graphics with Gen-3' },
      { name: 'Canva AI', slug: 'canva-ai', note: 'Best for quick animated social content' },
      { name: 'Pika', slug: 'pika', note: 'Best creative video effects' },
    ],
  },
  {
    id: 'ai-video-analytics',
    title: '6. AI Video Analytics & Optimization',
    icon: BarChart3,
    color: 'bg-rose-50 dark:bg-rose-950/30',
    text: `Creating great video is only half the battle — you need to know what works and why. AI video analytics tools analyze viewer behavior, predict performance, and recommend optimization actions that improve watch time, engagement, and conversion rates.

AI analytics capabilities for video content:
• Audience retention heatmaps showing exactly where viewers drop off
• Engagement scoring for each scene or segment
• A/B thumbnail testing with AI-generated variations
• Title and description optimization using CTR prediction models
• Competitor video analysis and content gap identification
• Topic trend detection: what video topics are rising in your niche
• Optimal posting time prediction per platform
• Auto-generated performance reports with actionable recommendations
• Transcript-based SEO optimization for YouTube search rankings
• Sentiment analysis on comments and engagement

For Asian video creators — whether on YouTube, TikTok, or local platforms like Bilibili or Douyin — AI analytics tools provide the data edge needed to compete. They reveal not just what your audience watches, but why they watch, and what they want next.`,
    tools: ['runway', 'descript', 'heygen', 'pika'],
    affiliateSuggestions: [
      { name: 'Runway', slug: 'runway', note: 'ML-powered optimization for video performance' },
      { name: 'Descript', slug: 'descript', note: 'Analytics built into the editing workflow' },
      { name: 'HeyGen', slug: 'heygen', note: 'Performance tracking for avatar videos' },
    ],
  },
];


const guideFaqs = [
  {
    "question": "What is the best AI video creation tool in 2026?",
    "answer": "Runway Gen-3 leads for AI video generation from text and images. CapCut is the best free AI video editor, especially for TikTok and social media content. For AI avatars and professional talking-head videos, Synthesia and HeyGen are the top choices. Descript is best for AI-powered editing and transcription."
  },
  {
    "question": "Can AI generate videos from text?",
    "answer": "Yes \u2014 Runway Gen-3, Pika, and Luma AI generate videos from text prompts. Sora by OpenAI (when available) will further advance text-to-video capabilities. Current tools generate 5-10 second clips suitable for social media. Longer videos still require traditional editing combined with AI generation."
  },
  {
    "question": "Which AI video tool is best for Asian content creators?",
    "answer": "CapCut (by ByteDance, TikTok's parent company) is the most popular AI video editor in Asia, with strong support for Chinese, Japanese, Korean, Thai, and Vietnamese. It offers auto-captions, trending templates, and effects optimized for Asian platforms including TikTok, Douyin, and Xiaohongshu."
  }
];

export default function AIToolsForVideoGuide() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Guides', item: '/guides' },
          { name: 'AI Tools for Video', item: '/guides/ai-tools-for-video' },
        ]}
        baseUrl={BASE_URL}
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 dark:from-violet-900 dark:via-purple-950 dark:to-indigo-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-200 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Guide · 14 min read
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Best AI Tools for Video in 2026
          </h1>
          <p className="text-lg sm:text-xl text-violet-100/90 max-w-2xl mb-8">
            The definitive guide to AI-powered video tools — generate, edit, subtitle, animate, and optimize video content with AI. Vetted for creators, marketers, and small businesses in Asia.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-violet-200/80">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Updated May 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              Creators &amp; Marketers
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              Asia-Focused
            </span>
          </div>
        </div>
      </section>

      {/* ─── Table of Contents ─── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            What You&apos;ll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50"
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
        <div className="border-l-4 border-violet-500 bg-violet-50 dark:bg-violet-950/30 rounded-lg p-6">
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong className="text-violet-700 dark:text-violet-300">Why AI-powered video tools matter more in 2026:</strong> Video now accounts for 82% of all internet traffic, and short-form video consumption grew another 40% year-over-year across Asian markets. AI video tools have closed the quality gap — what used to require a $10,000 production budget can now be produced with a $20/month subscription. For Asian small businesses and creators, this means professional-grade video content is finally accessible to everyone. The tools covered in this guide are vetted for reliability, output quality, Asian language support, and value for money.
          </p>
        </div>
      </section>

      {/* ─── Quick Comparison Table ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              Quick Comparison — Best AI Video Tools
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Tool</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Best For</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Starting Price</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Key Features</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Free Trial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { name: 'Runway', best: 'Cinematic AI video generation', price: '$12/mo', features: 'Gen-3 Alpha, text-to-video, inpainting', free: 'Free credits' },
                  { name: 'Pika', best: 'Viral social media clips', price: '$0 (Free)', features: 'Text/image-to-video, camera control, lip sync', free: '✅ Free tier' },
                  { name: 'Synthesia', best: 'AI avatar presenter videos', price: '$29/mo', features: '160+ avatars, 120+ languages, templates', free: 'Free preview' },
                  { name: 'Descript', best: 'AI video & audio editing', price: '$24/mo', features: 'Text-based editing, AI voice, filler removal', free: '✅ Free tier' },
                  { name: 'HeyGen', best: 'Multilingual avatar video', price: '$0 (Free)', features: 'AI avatars, lip-sync translation, voice clone', free: '✅ Free tier' },
                  { name: 'Canva AI', best: 'All-in-one social video', price: '$0 (Free)', features: 'Magic Studio, templates, auto-caption', free: '✅ Free tier' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{row.name}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{row.best}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{row.price}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-xs max-w-[200px]">{row.features}</td>
                    <td className="px-6 py-3 text-center">{row.free}</td>
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
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 rounded-full px-3 py-1.5 hover:bg-violet-100 dark:hover:bg-violet-900/60 transition-colors"
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
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 sm:p-12">
          <Sparkles className="w-10 h-10 text-violet-600 dark:text-violet-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Create Amazing Video Content?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
            Browse our curated directory of AI tools vetted for video creation, editing, animation, and optimization. Compare features, pricing, and Asia-specific capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors shadow-sm"
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
