import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Hungary (2026) — Curated for Hungarian Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Hungary (2026) — Apifeny AI',
    description:
      'Find AI tools built for Hungary: HUF/EUR pricing, GDPR compliance, Hungarian/English support, EU readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-hungary',
    siteName: 'Apifeny AI',
    locale: 'hu-HU',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Hungary (2026) — Apifeny AI',
    description:
      'Find AI tools built for Hungary: HUF/EUR pricing, GDPR compliance, Hungarian/English support, EU readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-hungary',
    languages: {
      'hu-HU': 'https://apifeny-ai.vercel.app/ai-tools-hungary',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-hungary',
    },
  },
};

export default function AiToolsHungaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
