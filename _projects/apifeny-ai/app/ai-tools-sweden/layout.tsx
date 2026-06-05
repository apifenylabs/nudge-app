import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Sweden (2026) — Curated for Swedish Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Sweden (2026) — Apifeny AI',
    description:
      'Find AI tools built for Sweden: SEK/EUR pricing, GDPR compliance, Nordic language support. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-sweden',
    siteName: 'Apifeny AI',
    locale: 'sv-SE',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Sweden (2026) — Apifeny AI',
    description:
      'Find AI tools built for Sweden: SEK/EUR pricing, GDPR compliance, Nordic language support. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-sweden',
    languages: {
      'sv-SE': 'https://apifeny-ai.vercel.app/ai-tools-sweden',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-sweden',
    },
  },
};

export default function AiToolsSwedenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
