import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Slovakia (2026) — Curated for Slovak Teams & Startups',
  description:
    'Discover the best AI tools for Slovak businesses and founders. Curated directory of 85+ tools ranked by trending score, Slovakia-market readiness, and local relevance. Updated daily. Built for Bratislava, Košice, and Slovakia',
  openGraph: {
    title: 'Best AI Tools in Slovakia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Slovakia: EUR pricing, GDPR compliance, Slovak/English support, and Industry 4.0 readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-slovakia',
    siteName: 'Apifeny AI',
    locale: 'sk-SK',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Slovakia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Slovakia: EUR pricing, GDPR compliance, Slovak/English support, and Industry 4.0 readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-slovakia',
    languages: {
      'sk-SK': 'https://apifeny-ai.vercel.app/ai-tools-slovakia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-slovakia',
    },
  },
};

export default function AiToolsSlovakiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
