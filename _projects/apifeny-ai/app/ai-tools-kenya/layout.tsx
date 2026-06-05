import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Kenya (2026) — Curated for Kenyan Startups & Teams',
  description:
    'Discover the best AI tools for Kenyan businesses and founders. Curated directory of 85+ tools ranked by trending score, Africa-readiness, and local relevance. Updated daily. Supports Swahili, English, and regional languages.',
  openGraph: {
    title: 'Best AI Tools in Kenya (2026) — Apifeny AI',
    description:
      'Find AI tools built for Kenya: local KES pricing, data compliance, Swahili multilingual support, and African market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-kenya',
    siteName: 'Apifeny AI',
    locale: 'sw-KE',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Kenya (2026) — Apifeny AI',
    description:
      'Find AI tools built for Kenya: local KES pricing, data compliance, Swahili multilingual support, and African market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-kenya',
    languages: {
      'sw-KE': 'https://apifeny-ai.vercel.app/ai-tools-kenya',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-kenya',
    },
  },
};

export default function AiToolsKenyaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
