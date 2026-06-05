import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Japan (2026) — Curated for Japanese Teams & Startups',
  description:
    'Discover the best AI tools for Japanese businesses and founders. Curated directory of 85+ tools ranked by trending score, Japan-market readiness, and local relevance. Updated daily. Built for Tokyo, Osaka, Kyoto, and Japan',
  openGraph: {
    title: 'Best AI Tools in Japan (2026) — Apifeny AI',
    description:
      'Find AI tools built for Japan: RIKEN AIP research, Tokyo University ecosystem, JPY pricing, Japanese (JA) support, and APAC data compliance. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-japan',
    siteName: 'Apifeny AI',
    locale: 'ja-JP',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Japan (2026) — Apifeny AI',
    description:
      'Find AI tools built for Japan: RIKEN AIP research, Tokyo University ecosystem, JPY pricing, Japanese (JA) support, and APAC data compliance. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-japan',
    languages: {
      'ja-JP': 'https://apifeny-ai.vercel.app/ai-tools-japan',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-japan',
    },
  },
};

export default function AiToolsJapanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
