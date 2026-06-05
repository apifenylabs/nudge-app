import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in UAE (2026) — Curated for UAE Startups & Teams',
  description:
    'Discover the best AI tools for UAE businesses and founders. Curated directory of 85+ tools ranked by trending score, Asia-readiness, and local relevance. Updated daily. Supports Arabic, English, and regional languages.',
  openGraph: {
    title: 'Best AI Tools in UAE (2026) — Apifeny AI',
    description:
      'Find AI tools built for UAE: local AED pricing, data compliance, Arabic/English multilingual support, and MENA market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-uae',
    siteName: 'Apifeny AI',
    locale: 'ar-AE',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in UAE (2026) — Apifeny AI',
    description:
      'Find AI tools built for UAE: local AED pricing, data compliance, Arabic/English multilingual support, and MENA market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-uae',
    languages: {
      'ar-AE': 'https://apifeny-ai.vercel.app/ai-tools-uae',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-uae',
    },
  },
};

export default function AiToolsUaeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
