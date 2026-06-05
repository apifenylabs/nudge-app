import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Ukraine (2026) — Curated for Ukrainian Teams & Startups',
  description:
    'Discover the best AI tools for Ukrainian businesses and developers. Curated directory of 85+ tools ranked by trending score, Ukraine-market readiness, and local relevance. Updated daily. Built for Kyiv, Lviv, Kharkiv, and Ukraine',
  openGraph: {
    title: 'Best AI Tools in Ukraine (2026) — Apifeny AI',
    description:
      'Find AI tools built for Ukraine: EU-aligned, UAH/pricing, Ukrainian/English support, and GDPR compliance. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-ukraine',
    siteName: 'Apifeny AI',
    locale: 'uk-UA',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Ukraine (2026) — Apifeny AI',
    description:
      'Find AI tools built for Ukraine: EU-aligned, UAH/pricing, Ukrainian/English support, and GDPR compliance. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-ukraine',
    languages: {
      'uk-UA': 'https://apifeny-ai.vercel.app/ai-tools-ukraine',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-ukraine',
    },
  },
};

export default function AiToolsUkraineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
