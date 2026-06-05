import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Greece (2026) — Curated for Greek Teams & Startups',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Greece (2026) — Apifeny AI',
    description:
      'Find AI tools built for Greece: EUR pricing, GDPR compliance, Greek/English support, EU readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-greece',
    siteName: 'Apifeny AI',
    locale: 'el-GR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Greece (2026) — Apifeny AI',
    description:
      'Find AI tools built for Greece: EUR pricing, GDPR compliance, Greek/English support, EU readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-greece',
    languages: {
      'el-GR': 'https://apifeny-ai.vercel.app/ai-tools-greece',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-greece',
    },
  },
};

export default function AiToolsGreeceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
