import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Brazil (2026) — Curated for Brazilian Startups & Teams',
  description:
    'Discover the best AI tools for Brazilian businesses and founders. Curated directory of 85+ tools ranked by trending score, Latin American readiness, and local relevance. Updated daily. Supports Portuguese, English, and Spanish.',
  openGraph: {
    title: 'Best AI Tools in Brazil (2026) — Apifeny AI',
    description:
      'Find AI tools built for Brazil: local BRL pricing, LGPD compliance, Portuguese multilingual support, and LatAm market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-brazil',
    siteName: 'Apifeny AI',
    locale: 'pt-BR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Brazil (2026) — Apifeny AI',
    description:
      'Find AI tools built for Brazil: local BRL pricing, LGPD compliance, Portuguese multilingual support, and LatAm market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-brazil',
    languages: {
      'pt-BR': 'https://apifeny-ai.vercel.app/ai-tools-brazil',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-brazil',
    },
  },
};

export default function AiToolsBrazilLayout({ children }: { children: React.ReactNode }) {
  return children;
}
