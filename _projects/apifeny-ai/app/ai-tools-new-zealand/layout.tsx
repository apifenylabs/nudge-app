import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in New Zealand (2026) — Curated for Kiwi Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in New Zealand (2026) — Apifeny AI',
    description:
      'Find AI tools built for New Zealand: NZD pricing, NZ Privacy Act compliance, English support, APAC readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-new-zealand',
    siteName: 'Apifeny AI',
    locale: 'en-NZ',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in New Zealand (2026) — Apifeny AI',
    description:
      'Find AI tools built for New Zealand: NZD pricing, NZ Privacy Act compliance, English support, APAC readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-new-zealand',
    languages: {
      'en-NZ': 'https://apifeny-ai.vercel.app/ai-tools-new-zealand',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-new-zealand',
    },
  },
};

export default function AiToolsNewZealandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
