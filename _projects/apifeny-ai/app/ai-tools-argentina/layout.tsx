import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Argentina (2026) — Curated for Argentine Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Argentina (2026) — Apifeny AI',
    description:
      'Find AI tools built for Argentina: ARS/USD pricing, PDPA compliance, Spanish support, LatAm readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-argentina',
    siteName: 'Apifeny AI',
    locale: 'es-AR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Argentina (2026) — Apifeny AI',
    description:
      'Find AI tools built for Argentina: ARS/USD pricing, PDPA compliance, Spanish support, LatAm readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-argentina',
    languages: {
      'es-AR': 'https://apifeny-ai.vercel.app/ai-tools-argentina',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-argentina',
    },
  },
};

export default function AiToolsArgentinaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
