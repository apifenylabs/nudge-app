import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Denmark (2026) — Curated for Danish Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Denmark (2026) — Apifeny AI',
    description:
      'Find AI tools built for Denmark: DKK pricing, GDPR compliance, Danish support. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-denmark',
    siteName: 'Apifeny AI',
    locale: 'da-DK',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Denmark (2026) — Apifeny AI',
    description:
      'Find AI tools built for Denmark: DKK pricing, GDPR compliance, Danish support. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-denmark',
    languages: {
      'da-DK': 'https://apifeny-ai.vercel.app/ai-tools-denmark',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-denmark',
    },
  },
};

export default function AiToolsDenmarkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
