import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Finland (2026) — Curated for Finnish Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Finland (2026) — Apifeny AI',
    description:
      'Find AI tools built for Finland: EUR pricing, GDPR compliance, Finnish support. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-finland',
    siteName: 'Apifeny AI',
    locale: 'fi-FI',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Finland (2026) — Apifeny AI',
    description:
      'Find AI tools built for Finland: EUR pricing, GDPR compliance, Finnish support. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-finland',
    languages: {
      'fi-FI': 'https://apifeny-ai.vercel.app/ai-tools-finland',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-finland',
    },
  },
};

export default function AiToolsFinlandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
