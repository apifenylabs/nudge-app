import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Norway (2026) — Curated for Norwegian Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Norway (2026) — Apifeny AI',
    description:
      'Find AI tools built for Norway: NOK pricing, GDPR compliance, Norwegian support. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-norway',
    siteName: 'Apifeny AI',
    locale: 'nb-NO',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Norway (2026) — Apifeny AI',
    description:
      'Find AI tools built for Norway: NOK pricing, GDPR compliance, Norwegian support. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-norway',
    languages: {
      'nb-NO': 'https://apifeny-ai.vercel.app/ai-tools-norway',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-norway',
    },
  },
};

export default function AiToolsNorwayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
