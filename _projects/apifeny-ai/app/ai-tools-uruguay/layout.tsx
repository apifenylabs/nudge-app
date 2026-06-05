import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Uruguay (2026) — Curated for Uruguayan Teams & Startups',
  description:
    'Discover top AI tools for Uruguayan businesses and founders. Curated directory of AI apps ranked for Uruguay-market readiness and local relevance.',
  openGraph: {
    title: 'Best AI Tools in Uruguay (2026) — Apifeny AI',
    description:
      'Find AI tools built for Uruguay: UYU pricing, Spanish/English support, local relevance. Expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-uruguay',
    siteName: 'Apifeny AI',
    locale: 'es-UY',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Uruguay (2026) — Apifeny AI',
    description:
      'Find AI tools built for Uruguay: UYU pricing, Spanish/English support, local relevance. Expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-uruguay',
    languages: {
      'es-UY': 'https://apifeny-ai.vercel.app/ai-tools-uruguay',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-uruguay',
    },
  },
};

export default function AiToolsUruguayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
