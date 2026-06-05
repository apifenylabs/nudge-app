import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Switzerland (2026) — Curated for Swiss Teams & Enterprises',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Switzerland (2026) — Apifeny AI',
    description:
      'Find AI tools built for Switzerland: CHF pricing, Swiss nFADP compliance, multilingual (DE/FR/IT/EN) support. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-switzerland',
    siteName: 'Apifeny AI',
    locale: 'de-CH',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Switzerland (2026) — Apifeny AI',
    description:
      'Find AI tools built for Switzerland: CHF pricing, Swiss nFADP compliance, multilingual (DE/FR/IT/EN) support. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-switzerland',
    languages: {
      'de-CH': 'https://apifeny-ai.vercel.app/ai-tools-switzerland',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-switzerland',
    },
  },
};

export default function AiToolsSwitzerlandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
