import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Poland (2026) — Curated for Polish Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Poland (2026) — Apifeny AI',
    description:
      'Find AI tools built for Poland: PLN/EUR pricing, GDPR & RODO compliance, Polish support, EU readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-poland',
    siteName: 'Apifeny AI',
    locale: 'pl-PL',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Poland (2026) — Apifeny AI',
    description:
      'Find AI tools built for Poland: PLN/EUR pricing, GDPR & RODO compliance, Polish support, EU readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-poland',
    languages: {
      'pl-PL': 'https://apifeny-ai.vercel.app/ai-tools-poland',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-poland',
    },
  },
};

export default function AiToolsPolandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
