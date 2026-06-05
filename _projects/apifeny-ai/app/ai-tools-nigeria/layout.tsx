import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Nigeria (2026) — Curated for NG Startups & Teams',
  description:
    'Discover the best AI tools for Nigeria businesses and founders. Curated directory of 85+ tools ranked by trending score, Africa-readiness, and local relevance. Updated daily. Supports English and regional languages.',
  openGraph: {
    title: 'Best AI Tools in Nigeria (2026) — Apifeny AI',
    description:
      'Find AI tools built for Nigeria: local NGN pricing, NDPR data compliance, and Africa market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-nigeria',
    siteName: 'Apifeny AI',
    locale: 'en-NG',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Nigeria (2026) — Apifeny AI',
    description:
      'Find AI tools built for Nigeria: local NGN pricing, NDPR data compliance, and Africa market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-nigeria',
    languages: {
      'en-NG': 'https://apifeny-ai.vercel.app/ai-tools-nigeria',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-nigeria',
    },
  },
};

export default function AiToolsNigeriaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
