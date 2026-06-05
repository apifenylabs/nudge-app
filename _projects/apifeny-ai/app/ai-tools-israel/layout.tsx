import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Israel (2026) — Curated for Israeli Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Israel (2026) — Apifeny AI',
    description:
      'Find AI tools built for Israel: ILS/USD pricing, Privacy Law compliance, Hebrew/English support. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-israel',
    siteName: 'Apifeny AI',
    locale: 'he-IL',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Israel (2026) — Apifeny AI',
    description:
      'Find AI tools built for Israel: ILS/USD pricing, Privacy Law compliance, Hebrew/English support. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-israel',
    languages: {
      'he-IL': 'https://apifeny-ai.vercel.app/ai-tools-israel',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-israel',
    },
  },
};

export default function AiToolsIsraelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
