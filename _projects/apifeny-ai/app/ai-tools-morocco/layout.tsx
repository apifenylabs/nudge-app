import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Morocco (2026) — Curated for Moroccan Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Morocco (2026) — Apifeny AI',
    description:
      'Find AI tools built for Morocco: MAD pricing, Law 09-08 compliance, Arabic/French support, African market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-morocco',
    siteName: 'Apifeny AI',
    locale: 'ar-MA',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Morocco (2026) — Apifeny AI',
    description:
      'Find AI tools built for Morocco: MAD pricing, Law 09-08 compliance, Arabic/French support, African market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-morocco',
    languages: {
      'ar-MA': 'https://apifeny-ai.vercel.app/ai-tools-morocco',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-morocco',
    },
  },
};

export default function AiToolsMoroccoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
