import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Ghana (2026) — Curated for Ghanaian Teams & Startups',
  description:
    'Discover top AI tools for Ghanaian businesses and founders. Curated directory of AI apps ranked for Ghana-market readiness and local relevance.',
  openGraph: {
    title: 'Best AI Tools in Ghana (2026) — Apifeny AI',
    description:
      'Find AI tools built for Ghana: GHS considerations, English support, local market readiness. Expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-ghana',
    siteName: 'Apifeny AI',
    locale: 'en-GH',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Ghana (2026) — Apifeny AI',
    description:
      'Find AI tools built for Ghana: GHS considerations, English support, local market readiness. Expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-ghana',
    languages: {
      'en-GH': 'https://apifeny-ai.vercel.app/ai-tools-ghana',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-ghana',
    },
  },
};

export default function AiToolsGhanaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
