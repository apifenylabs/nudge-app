import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in the UK (2026) — Curated for British Teams & Startups',
  description:
    'Discover the best AI tools for UK businesses and founders. Curated directory of 85+ tools ranked by trending score, UK-market readiness, and local relevance. Updated daily. Optimised for London, Cambridge, Manchester, and fintech/enterprise teams.',
  openGraph: {
    title: 'Best AI Tools in the UK (2026) — Apifeny AI',
    description:
      'Find AI tools built for Britain: UK GDPR compliance, GBP pricing, AI Safety Institute alignment, and UK tech ecosystem fit. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-uk',
    siteName: 'Apifeny AI',
    locale: 'en-GB',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in the UK (2026) — Apifeny AI',
    description:
      'Find AI tools built for Britain: UK GDPR compliance, GBP pricing, AI Safety Institute alignment, and UK tech ecosystem fit. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-uk',
    languages: {
      'en-GB': 'https://apifeny-ai.vercel.app/ai-tools-uk',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-uk',
    },
  },
};

export default function AiToolsUkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
