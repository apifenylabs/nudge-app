import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Ireland (2026) — Curated for Irish Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Ireland (2026) — Apifeny AI',
    description:
      'Find AI tools built for Ireland: EUR pricing, GDPR compliance, English support. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-ireland',
    siteName: 'Apifeny AI',
    locale: 'en-IE',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Ireland (2026) — Apifeny AI',
    description:
      'Find AI tools built for Ireland: EUR pricing, GDPR compliance, English support. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-ireland',
    languages: {
      'en-IE': 'https://apifeny-ai.vercel.app/ai-tools-ireland',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-ireland',
    },
  },
};

export default function AiToolsIrelandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
