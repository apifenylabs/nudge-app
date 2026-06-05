import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Pakistan (2026) — Curated for PK Startups & Teams',
  description:
    'Discover the best AI tools for Pakistan businesses and founders. Curated directory of 85+ tools ranked by trending score, Asia-readiness, and local relevance. Updated daily. Supports Urdu, English, and regional languages.',
  openGraph: {
    title: 'Best AI Tools in Pakistan (2026) — Apifeny AI',
    description:
      'Find AI tools built for Pakistan: local PKR pricing, data compliance, Urdu multilingual support, and Asian market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-pakistan',
    siteName: 'Apifeny AI',
    locale: 'ur-PK',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Pakistan (2026) — Apifeny AI',
    description:
      'Find AI tools built for Pakistan: local PKR pricing, data compliance, Urdu multilingual support, and Asian market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-pakistan',
    languages: {
      'ur-PK': 'https://apifeny-ai.vercel.app/ai-tools-pakistan',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-pakistan',
    },
  },
};

export default function AiToolsPakistanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
