import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Jordan (2026) — Curated for Jordanian Teams & Startups',
  description:
    'Discover top AI tools for Jordanian businesses and founders. Curated directory of AI apps ranked for Jordan-market readiness and local relevance.',
  openGraph: {
    title: 'Best AI Tools in Jordan (2026) — Apifeny AI',
    description:
      'Find AI tools built for Jordan: JOD pricing, Arabic/English support, local compliance. Expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-jordan',
    siteName: 'Apifeny AI',
    locale: 'ar-JO',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Jordan (2026) — Apifeny AI',
    description:
      'Find AI tools built for Jordan: JOD pricing, Arabic/English support, local compliance. Expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-jordan',
    languages: {
      'ar-JO': 'https://apifeny-ai.vercel.app/ai-tools-jordan',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-jordan',
    },
  },
};

export default function AiToolsJordanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
