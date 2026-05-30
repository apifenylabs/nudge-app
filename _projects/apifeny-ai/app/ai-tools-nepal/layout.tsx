import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Nepal (2026) — 100+ Tools for Kathmandu Dev Scene & Tourism AI',
  description:
    'Discover the best AI tools for Nepali businesses and founders. Curated directory of 100+ tools ranked by trending score, Nepali (नेपाली) language support, and local market relevance. Updated daily.',
  openGraph: {
    title: 'Best AI Tools in Nepal (2026) — Apifeny AI',
    description:
      'Find AI tools built for Nepal: Nepali (नेपाली) language support, NPR/USD pricing, and trekking/tourism industry readiness. 100+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-nepal',
    siteName: 'Apifeny AI',
    locale: 'ne_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Nepal (2026) — Apifeny AI',
    description:
      'Find the best AI tools for Nepal. Expert-ranked directory with Nepali interface support and local pricing info.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-nepal',
    languages: {
      'ne-NP': 'https://apifeny-ai.vercel.app/ai-tools-nepal',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-nepal',
    },
  },
};

export default function AIToolsNepalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
