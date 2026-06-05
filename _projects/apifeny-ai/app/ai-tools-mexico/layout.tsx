import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Mexico (2026) — Curated for Mexican Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Mexico (2026) — Apifeny AI',
    description:
      'Find AI tools built for Mexico: MXN pricing, LFPDPPP compliance, Spanish support, LatAm readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-mexico',
    siteName: 'Apifeny AI',
    locale: 'es-MX',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Mexico (2026) — Apifeny AI',
    description:
      'Find AI tools built for Mexico: MXN pricing, LFPDPPP compliance, Spanish support, LatAm readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-mexico',
    languages: {
      'es-MX': 'https://apifeny-ai.vercel.app/ai-tools-mexico',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-mexico',
    },
  },
};

export default function AiToolsMexicoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
