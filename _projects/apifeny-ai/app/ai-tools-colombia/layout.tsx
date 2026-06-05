import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Colombia (2026) — Curated for Colombian Teams & Startups',
  description:
    'Discover the best AI tools for Colombian businesses and founders. Curated directory of 85+ tools ranked by trending score, Colombia-market readiness, and local relevance. Updated daily. Built for Bogotá, Medellín, Cali, and Colombia',
  openGraph: {
    title: 'Best AI Tools in Colombia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Colombia: iNNpulsa ecosystem, Latin America',
    url: 'https://apifeny-ai.vercel.app/ai-tools-colombia',
    siteName: 'Apifeny AI',
    locale: 'es-CO',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Colombia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Colombia: iNNpulsa ecosystem, Latin America',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-colombia',
    languages: {
      'es-CO': 'https://apifeny-ai.vercel.app/ai-tools-colombia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-colombia',
    },
  },
};

export default function AiToolsColombiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
