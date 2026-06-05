import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Egypt (2026) — Curated for Egyptian Startups & Teams',
  description:
    'Discover the best AI tools for Egyptian businesses and founders. Curated directory of 85+ tools ranked by trending score, Africa-readiness, and local relevance. Updated daily. Supports Arabic, English, and regional languages.',
  openGraph: {
    title: 'Best AI Tools in Egypt (2026) — Apifeny AI',
    description:
      'Find AI tools built for Egypt: local EGP pricing, data compliance, Arabic multilingual support, and African market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-egypt',
    siteName: 'Apifeny AI',
    locale: 'ar-EG',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Egypt (2026) — Apifeny AI',
    description:
      'Find AI tools built for Egypt: local EGP pricing, data compliance, Arabic multilingual support, and African market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-egypt',
    languages: {
      'ar-EG': 'https://apifeny-ai.vercel.app/ai-tools-egypt',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-egypt',
    },
  },
};

export default function AiToolsEgyptLayout({ children }: { children: React.ReactNode }) {
  return children;
}
