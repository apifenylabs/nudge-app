import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Lithuania (2026) — Curated for Baltic Startups & Developers',
  description:
    'Discover the best AI tools for Lithuanian businesses and developers. Curated directory of 85+ tools ranked by trending score, Lithuania-market readiness, and local relevance. Updated daily. Built for Vilnius tech ecosystem.',
  openGraph: {
    title: 'Best AI Tools in Lithuania (2026) — Apifeny AI',
    description:
      'Find AI tools built for Lithuania: multilingual support, EUR pricing, GDPR compliance, and Baltic data center readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-lithuania',
    siteName: 'Apifeny AI',
    locale: 'lt-LT',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Lithuania (2026) — Apifeny AI',
    description:
      'Find AI tools built for Lithuania: multilingual support, EUR pricing, GDPR compliance, and Baltic data center readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-lithuania',
    languages: {
      'lt-LT': 'https://apifeny-ai.vercel.app/ai-tools-lithuania',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-lithuania',
    },
  },
};

export default function AiToolsLithuaniaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
