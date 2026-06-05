import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Portugal (2026) — Curated for Portuguese Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Portugal (2026) — Apifeny AI',
    description:
      'Find AI tools built for Portugal: EUR pricing, GDPR compliance, Portuguese support, EU readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-portugal',
    siteName: 'Apifeny AI',
    locale: 'pt-PT',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Portugal (2026) — Apifeny AI',
    description:
      'Find AI tools built for Portugal: EUR pricing, GDPR compliance, Portuguese support, EU readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-portugal',
    languages: {
      'pt-PT': 'https://apifeny-ai.vercel.app/ai-tools-portugal',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-portugal',
    },
  },
};

export default function AiToolsPortugalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
