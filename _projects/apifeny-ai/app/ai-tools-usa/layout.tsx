import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in the USA (2026) — Curated for American Teams & Startups',
  description:
    'Discover the best AI tools for American businesses and founders. Curated directory of 85+ tools ranked by trending score, US-market readiness, and local relevance. Updated daily. Optimized for Silicon Valley, NYC, Austin, and remote-first teams.',
  openGraph: {
    title: 'Best AI Tools in the USA (2026) — Apifeny AI',
    description:
      'Find AI tools built for America: GAFAM-native integrations, USD pricing, US data compliance (CCPA/FedRAMP), and startup ecosystem fit. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-usa',
    siteName: 'Apifeny AI',
    locale: 'en-US',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in the USA (2026) — Apifeny AI',
    description:
      'Find AI tools built for America: GAFAM-native integrations, USD pricing, US data compliance (CCPA/FedRAMP), and startup ecosystem fit. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-usa',
    languages: {
      'en-US': 'https://apifeny-ai.vercel.app/ai-tools-usa',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-usa',
    },
  },
};

export default function AiToolsUsaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
