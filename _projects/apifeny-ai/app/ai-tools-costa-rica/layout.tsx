import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Costa Rica (2026) — Curated for Costa Rican Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Costa Rica (2026) — Apifeny AI',
    description:
      'Find AI tools built for Costa Rica: CRC/USD pricing, data protection compliance, Spanish/English support, Central American readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-costa-rica',
    siteName: 'Apifeny AI',
    locale: 'es-CR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Costa Rica (2026) — Apifeny AI',
    description:
      'Find AI tools built for Costa Rica: CRC/USD pricing, data protection compliance, Spanish/English support, Central American readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-costa-rica',
    languages: {
      'es-CR': 'https://apifeny-ai.vercel.app/ai-tools-costa-rica',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-costa-rica',
    },
  },
};

export default function AiToolsCostaRicaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
