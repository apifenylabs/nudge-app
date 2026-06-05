import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in France (2026) — Curated for French Startups & Teams',
  description:
    'France operates in French and English across business, government, and daily life. We flag every tool for local language support so you never discover language gaps mid-workflow — critical for serving a market of 68M+ that values its linguistic heritage.',
  openGraph: {
    title: 'Best AI Tools in France (2026) — Apifeny AI',
    description:
      'Find AI tools built for France. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-france',
    siteName: 'Apifeny AI',
    locale: 'fr-FR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in France (2026) — Apifeny AI',
    description:
      'Find AI tools built for France. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-france',
    languages: {
      'fr-FR': 'https://apifeny-ai.vercel.app/ai-tools-france',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-france',
    },
  },
};

export default function AiToolsFranceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
