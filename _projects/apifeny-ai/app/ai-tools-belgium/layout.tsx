import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Belgium (2026) — Curated for Belgian Teams & Startups',
  description:
    'Discover the best AI tools for Belgian businesses and founders. Curated directory of 85+ tools ranked by trending score, Belgium-market readiness, and local relevance. Updated daily. Built for Brussels, Antwerp, Ghent, and Belgium',
  openGraph: {
    title: 'Best AI Tools in Belgium (2026) — Apifeny AI',
    description:
      'Find AI tools built for Belgium: imec ecosystem, multilingual (NL/FR/DE/EN) support, GDPR compliance, and EUR pricing. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-belgium',
    siteName: 'Apifeny AI',
    locale: 'nl-BE',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Belgium (2026) — Apifeny AI',
    description:
      'Find AI tools built for Belgium: imec ecosystem, multilingual (NL/FR/DE/EN) support, GDPR compliance, and EUR pricing. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-belgium',
    languages: {
      'nl-BE': 'https://apifeny-ai.vercel.app/ai-tools-belgium',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-belgium',
    },
  },
};

export default function AiToolsBelgiumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
