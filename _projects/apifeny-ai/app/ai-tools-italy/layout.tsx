import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Italy (2026) — Curated for Italian Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Italy (2026) — Apifeny AI',
    description:
      'Find AI tools built for Italy: EUR pricing, GDPR compliance, Italian language support, EU readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-italy',
    siteName: 'Apifeny AI',
    locale: 'it-IT',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Italy (2026) — Apifeny AI',
    description:
      'Find AI tools built for Italy: EUR pricing, GDPR compliance, Italian language support, EU readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-italy',
    languages: {
      'it-IT': 'https://apifeny-ai.vercel.app/ai-tools-italy',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-italy',
    },
  },
};

export default function AiToolsItalyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
