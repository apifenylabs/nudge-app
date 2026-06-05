import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Slovenia (2026) — Curated for Slovenian Teams & Startups',
  description:
    'Discover top AI tools for Slovenian businesses and founders. Curated directory of AI apps ranked for Slovenia-market readiness and local relevance.',
  openGraph: {
    title: 'Best AI Tools in Slovenia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Slovenia: EUR pricing, Slovenian/English support, GDPR compliance, EU-ready. Expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-slovenia',
    siteName: 'Apifeny AI',
    locale: 'sl-SI',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Slovenia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Slovenia: EUR pricing, Slovenian/English support, GDPR compliance, EU-ready. Expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-slovenia',
    languages: {
      'sl-SI': 'https://apifeny-ai.vercel.app/ai-tools-slovenia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-slovenia',
    },
  },
};

export default function AiToolsSloveniaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
