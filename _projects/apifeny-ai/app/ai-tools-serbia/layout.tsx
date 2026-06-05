import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Serbia (2026) — Curated for Balkan Tech & Startups',
  description:
    'Discover the best AI tools for Serbian businesses and developers. Curated directory of 85+ tools ranked by trending score, Serbia-market readiness, and local relevance. Updated daily. Built for Belgrade tech ecosystem.',
  openGraph: {
    title: 'Best AI Tools in Serbia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Serbia: multilingual support, RSD/EUR pricing, GDPR alignment, and Balkan market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-serbia',
    siteName: 'Apifeny AI',
    locale: 'sr-RS',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Serbia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Serbia: multilingual support, RSD/EUR pricing, GDPR alignment, and Balkan market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-serbia',
    languages: {
      'sr-RS': 'https://apifeny-ai.vercel.app/ai-tools-serbia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-serbia',
    },
  },
};

export default function AiToolsSerbiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
