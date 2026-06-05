import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Chile (2026) — Curated for Chilean Teams & Startups',
  description:
    'Discover the best AI tools for Chilean businesses and founders. Curated directory of 85+ tools ranked by trending score, Chile-market readiness, and local relevance. Updated daily. Built for Santiago, Valparaíso, Concepción, and Chile.',
  openGraph: {
    title: 'Best AI Tools in Chile (2026) — Apifeny AI',
    description:
      'Find AI tools built for Chile: CORFO ecosystem, Latin America',
    url: 'https://apifeny-ai.vercel.app/ai-tools-chile',
    siteName: 'Apifeny AI',
    locale: 'es-CL',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Chile (2026) — Apifeny AI',
    description:
      'Find AI tools built for Chile: CORFO ecosystem, Latin America',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-chile',
    languages: {
      'es-CL': 'https://apifeny-ai.vercel.app/ai-tools-chile',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-chile',
    },
  },
};

export default function AiToolsChileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
