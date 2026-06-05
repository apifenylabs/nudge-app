import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Malaysia (2026) — Curated for MY Startups & Teams',
  description:
    'Discover the best AI tools for Malaysia businesses and founders. Curated directory of 85+ tools ranked by trending score, Asia-readiness, and local relevance. Updated daily. Supports BM, Chinese, Tamil, and English.',
  openGraph: {
    title: 'Best AI Tools in Malaysia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Malaysia: multilingual support, local MYR pricing, data residency, and Asian market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-malaysia',
    siteName: 'Apifeny AI',
    locale: 'ms-MY',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Malaysia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Malaysia: multilingual support, local MYR pricing, data residency, and Asian market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-malaysia',
    languages: {
      'ms-MY': 'https://apifeny-ai.vercel.app/ai-tools-malaysia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-malaysia',
    },
  },
};

export default function AiToolsMalaysiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
