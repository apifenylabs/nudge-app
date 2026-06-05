import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Panama (2026) — Curated for Panamanian Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Panama (2026) — Apifeny AI',
    description:
      'Find AI tools built for Panama: USD pricing, data protection compliance, Spanish/English support, Latin American readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-panama',
    siteName: 'Apifeny AI',
    locale: 'es-PA',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Panama (2026) — Apifeny AI',
    description:
      'Find AI tools built for Panama: USD pricing, data protection compliance, Spanish/English support, Latin American readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-panama',
    languages: {
      'es-PA': 'https://apifeny-ai.vercel.app/ai-tools-panama',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-panama',
    },
  },
};

export default function AiToolsPanamaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
