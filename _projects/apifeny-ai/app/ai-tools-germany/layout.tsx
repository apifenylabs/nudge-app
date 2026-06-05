import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Germany (2026) — Kuratiert für deutsche Unternehmen & Startups',
  description:
    'Discover the best AI tools for German businesses and founders. Curated directory of 85+ tools ranked by trending score, Germany-market readiness, and local relevance. Updated daily. Built for Berlin, Munich, and the Industrie 4.0 ecosystem.',
  openGraph: {
    title: 'Best AI Tools in Germany (2026) — Apifeny AI',
    description:
      'Find AI tools built for Germany: DSGVO compliance, EUR pricing, KI Bundesverband alignment, and manufacturing/AI integration. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-germany',
    siteName: 'Apifeny AI',
    locale: 'de-DE',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Germany (2026) — Apifeny AI',
    description:
      'Find AI tools built for Germany: DSGVO compliance, EUR pricing, KI Bundesverband alignment, and manufacturing/AI integration. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-germany',
    languages: {
      'de-DE': 'https://apifeny-ai.vercel.app/ai-tools-germany',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-germany',
    },
  },
};

export default function AiToolsGermanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
