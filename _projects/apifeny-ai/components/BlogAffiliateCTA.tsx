// BlogAffiliateCTA — Boost monetization on blog posts by
// showing contextual affiliate CTAs based on post tags.

import Link from 'next/link';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

interface AffiliateOffer {
  keywords: string[];
  title: string;
  description: string;
  href: string;
  cta: string;
}

const OFFERS: AffiliateOffer[] = [
  {
    keywords: ['chatgpt', 'openai', 'gpt'],
    title: 'Get Started with ChatGPT',
    description: 'Supercharge your workflow with the most popular AI assistant. Free to start.',
    href: 'https://chatgpt.com',
    cta: 'Try ChatGPT Free →',
  },
  {
    keywords: ['claude', 'anthropic'],
    title: 'Claude by Anthropic',
    description: 'Thoughtful AI for complex reasoning, long documents, and safe deployment.',
    href: 'https://claude.ai',
    cta: 'Try Claude Free →',
  },
  {
    keywords: ['gemini', 'google-ai', 'bard'],
    title: 'Google Gemini',
    description: 'Google\'s most capable AI model with deep Google ecosystem integration.',
    href: 'https://gemini.google.com',
    cta: 'Try Gemini Free →',
  },
  {
    keywords: ['cursor', 'coding', 'copilot', 'programming', 'development'],
    title: 'Level Up Your Coding',
    description: 'Cursor — the AI-first code editor. Write code 10x faster with AI.',
    href: 'https://cursor.sh',
    cta: 'Try Cursor Free →',
  },
  {
    keywords: ['midjourney', 'image-generation', 'design', 'art'],
    title: 'Create Stunning AI Art',
    description: 'Midjourney leads AI image generation. Turn your ideas into visuals instantly.',
    href: 'https://midjourney.com',
    cta: 'Try Midjourney →',
  },
  {
    keywords: ['perplexity', 'research', 'search'],
    title: 'AI-Powered Research',
    description: 'Perplexity — the answer engine for deep research with real-time citations.',
    href: 'https://perplexity.ai',
    cta: 'Try Perplexity Free →',
  },
  {
    keywords: ['notion', 'productivity', 'notes'],
    title: 'Notion AI — Your Workspace, Amplified',
    description: 'Write, plan, and organize with AI built into your workspace.',
    href: 'https://notion.so',
    cta: 'Try Notion AI →',
  },
  {
    keywords: ['elevenlabs', 'voice', 'audio', 'tts'],
    title: 'ElevenLabs — AI Voice Studio',
    description: 'Industry-leading text-to-speech and voice cloning in 29+ languages.',
    href: 'https://elevenlabs.io',
    cta: 'Try ElevenLabs Free →',
  },
  {
    keywords: ['canva', 'design', 'graphics'],
    title: 'Canva Magic Studio',
    description: 'Design anything with AI — presentations, social media, videos, and more.',
    href: 'https://canva.com',
    cta: 'Try Canva Free →',
  },
  {
    keywords: ['runway', 'video', 'generation'],
    title: 'Runway — AI Video Creation',
    description: 'Generate and edit videos with state-of-the-art AI video models.',
    href: 'https://runwayml.com',
    cta: 'Try Runway →',
  },
  {
    keywords: ['jasper', 'copywriting', 'marketing'],
    title: 'Jasper — AI Marketing Copilot',
    description: 'Create on-brand marketing content 10x faster with Jasper AI.',
    href: 'https://jasper.ai',
    cta: 'Try Jasper Free →',
  },
  {
    keywords: ['devin', 'ai-agent', 'autonomous'],
    title: 'Devin — AI Software Engineer',
    description: 'The first AI software engineer. Delegate coding tasks and ship faster.',
    href: 'https://cognition.ai',
    cta: 'Learn About Devin →',
  },
];

interface BlogAffiliateCTAProps {
  postSlug: string;
  postTags: string[];
  postTitle: string;
}

export default function BlogAffiliateCTA({ postSlug, postTags, postTitle }: BlogAffiliateCTAProps) {
  const lowerTags = postTags.map(t => t.toLowerCase());
  const lowerTitle = postTitle.toLowerCase();

  const matchedOffer = OFFERS.find(offer =>
    offer.keywords.some(kw =>
      lowerTags.some(t => t.includes(kw)) || lowerTitle.includes(kw)
    )
  );

  const cardClass = "mt-10 p-6 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50";
  const iconClass = "flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center";
  const iconStyle = "w-5 h-5 text-blue-600";
  const headingClass = "text-lg font-semibold text-gray-900 mb-1";
  const descClass = "text-sm text-gray-600 mb-3";
  const linkClass = "inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800 transition";

  if (!matchedOffer) {
    return (
      <div className={cardClass}>
        <div className="flex items-start gap-4">
          <div className={iconClass}>
            <Sparkles className={iconStyle} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={headingClass}>
              Explore AI Tools for {postTitle.split(' ').slice(0, 3).join(' ')}
            </h3>
            <p className={descClass}>
              Discover the best AI tools reviewed and ranked by our team. Free & paid options for every budget.
            </p>
            <Link href="/best-ai-tools" className={linkClass}>
              Browse All AI Tools
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <div className="flex items-start gap-4">
        <div className={iconClass}>
          <Zap className={iconStyle} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={headingClass}>
            {matchedOffer.title}
          </h3>
          <p className={descClass}>
            {matchedOffer.description}
          </p>
          <a
            href={matchedOffer.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={linkClass}
          >
            {matchedOffer.cta}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
