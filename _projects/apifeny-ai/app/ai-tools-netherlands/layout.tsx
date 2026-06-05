import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in the Netherlands (2026) — Curated for Dutch Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Netherlands (2026) — Apifeny AI',
    description:
      'Find AI tools built for Netherlands: EUR pricing, GDPR & AVG compliance, Dutch/English support, EU readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-netherlands',
    siteName: 'Apifeny AI',
    locale: 'nl-NL',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Netherlands (2026) — Apifeny AI',
    description:
      'Find AI tools built for Netherlands: EUR pricing, GDPR & AVG compliance, Dutch/English support, EU readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-netherlands',
    languages: {
      'nl-NL': 'https://apifeny-ai.vercel.app/ai-tools-netherlands',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-netherlands',
    },
  },
};

export default function AiToolsNetherlandsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
