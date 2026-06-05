import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in South Africa (2026) — Curated for South African Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in South Africa (2026) — Apifeny AI',
    description:
      'Find AI tools built for South Africa: ZAR pricing, POPIA compliance, multilingual support (EN/AF), African market readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-south-africa',
    siteName: 'Apifeny AI',
    locale: 'en-ZA',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in South Africa (2026) — Apifeny AI',
    description:
      'Find AI tools built for South Africa: ZAR pricing, POPIA compliance, multilingual support (EN/AF), African market readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-south-africa',
    languages: {
      'en-ZA': 'https://apifeny-ai.vercel.app/ai-tools-south-africa',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-south-africa',
    },
  },
};

export default function AiToolsSouthAfricaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
