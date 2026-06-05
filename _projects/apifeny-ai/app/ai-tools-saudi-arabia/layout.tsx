import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Saudi Arabia (2026) — Curated for KSA Startups & Teams',
  description:
    'Discover the best AI tools for Saudi businesses and founders. Curated directory of 85+ tools ranked by trending score, Asia-readiness, and local relevance. Updated daily. Supports Arabic, English, and regional languages.',
  openGraph: {
    title: 'Best AI Tools in Saudi Arabia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Saudi Arabia: local SAR pricing, data compliance, Arabic multilingual support, and MENA market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-saudi-arabia',
    siteName: 'Apifeny AI',
    locale: 'ar-SA',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Saudi Arabia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Saudi Arabia: local SAR pricing, data compliance, Arabic multilingual support, and MENA market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-saudi-arabia',
    languages: {
      'ar-SA': 'https://apifeny-ai.vercel.app/ai-tools-saudi-arabia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-saudi-arabia',
    },
  },
};

export default function AiToolsSaudiArabiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
