import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Romania (2026) — Curated for Romanian Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Romania (2026) — Apifeny AI',
    description:
      'Find AI tools built for Romania: RON/EUR pricing, GDPR compliance, Romanian/English support, EU readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-romania',
    siteName: 'Apifeny AI',
    locale: 'ro-RO',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Romania (2026) — Apifeny AI',
    description:
      'Find AI tools built for Romania: RON/EUR pricing, GDPR compliance, Romanian/English support, EU readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-romania',
    languages: {
      'ro-RO': 'https://apifeny-ai.vercel.app/ai-tools-romania',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-romania',
    },
  },
};

export default function AiToolsRomaniaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
