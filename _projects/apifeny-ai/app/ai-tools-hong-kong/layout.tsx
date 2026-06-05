import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Hong Kong (2026) — Curated for HK Startups & Enterprises',
  description:
    'Discover the best AI tools for Hong Kong businesses. Curated directory of 85+ tools ranked by trending score, Chinese-language readiness, data privacy, and local relevance. Updated daily.',
  openGraph: {
    title: 'Best AI Tools in Hong Kong (2026) — Apifeny AI',
    description:
      'Find AI tools built for Hong Kong: Traditional Chinese support, HKD pricing, data residency compliance (PDPO), and Asia-Pacific readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-hong-kong',
    siteName: 'Apifeny AI',
    locale: 'zh-HK',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Hong Kong (2026) — Apifeny AI',
    description:
      'Find AI tools built for Hong Kong: Traditional Chinese support, HKD pricing, data residency compliance (PDPO), and Asia-Pacific readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-hong-kong',
    languages: {
      'zh-HK': 'https://apifeny-ai.vercel.app/ai-tools-hong-kong',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-hong-kong',
    },
  },
};

export default function AiToolsHongKongLayout({ children }: { children: React.ReactNode }) {
  return children;
}
