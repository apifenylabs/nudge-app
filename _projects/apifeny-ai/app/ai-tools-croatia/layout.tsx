import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Croatia (2026) — Curated for Croatian Teams & Startups',
  description:
    'Discover top AI tools for Croatian businesses and founders. Curated directory of AI apps ranked for Croatia-market readiness and local relevance.',
  openGraph: {
    title: 'Best AI Tools in Croatia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Croatia: EUR pricing, Croatian/English support, GDPR compliance, EU-ready. Expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-croatia',
    siteName: 'Apifeny AI',
    locale: 'hr-HR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Croatia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Croatia: EUR pricing, Croatian/English support, GDPR compliance, EU-ready. Expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-croatia',
    languages: {
      'hr-HR': 'https://apifeny-ai.vercel.app/ai-tools-croatia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-croatia',
    },
  },
};

export default function AiToolsCroatiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
