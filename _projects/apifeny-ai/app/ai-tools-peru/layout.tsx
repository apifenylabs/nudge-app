import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Peru (2026) — Curated for Peruvian Startups & Developers',
  description:
    'Discover the best AI tools for Peruvian businesses and developers. Curated directory of 85+ tools ranked by trending score, Peru-market readiness, and local relevance. Updated daily. Built for Lima',
  openGraph: {
    title: 'Best AI Tools in Peru (2026) — Apifeny AI',
    description:
      'Find AI tools built for Peru: Spanish-first, PEN/pricing, bilingual support, and LATAM data protection compliance. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-peru',
    siteName: 'Apifeny AI',
    locale: 'es-PE',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Peru (2026) — Apifeny AI',
    description:
      'Find AI tools built for Peru: Spanish-first, PEN/pricing, bilingual support, and LATAM data protection compliance. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-peru',
    languages: {
      'es-PE': 'https://apifeny-ai.vercel.app/ai-tools-peru',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-peru',
    },
  },
};

export default function AiToolsPeruLayout({ children }: { children: React.ReactNode }) {
  return children;
}
