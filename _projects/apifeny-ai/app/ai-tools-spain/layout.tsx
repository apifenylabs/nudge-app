import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Spain (2026) — Curated for Spanish Teams & Startups',
  description:
    'Find the best AI tools for Spain: EUR pricing, GDPR and LOPDGDD compliance, Spanish support. 85+ tools, expert ranked.',
  openGraph: {
    title: 'Best AI Tools in Spain (2026) — Apifeny AI',
    description:
      'Find AI tools built for Spain: EUR pricing, GDPR & LOPDGDD compliance, Spanish support, EU readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-spain',
    siteName: 'Apifeny AI',
    locale: 'es-ES',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Spain (2026) — Apifeny AI',
    description:
      'Find AI tools built for Spain: EUR pricing, GDPR & LOPDGDD compliance, Spanish support, EU readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-spain',
    languages: {
      'es-ES': 'https://apifeny-ai.vercel.app/ai-tools-spain',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-spain',
    },
  },
};

export default function AiToolsSpainLayout({ children }: { children: React.ReactNode }) {
  return children;
}
