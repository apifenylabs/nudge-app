import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in 2026 — Curated Directory of 85+ Tools',
  description:
    'Discover the best AI tools of 2026. Curated directory of 85+ top-rated AI tools across writing, coding, design, marketing, and more. Expert rankings, real reviews, and Asia-ready filters.',
  openGraph: {
    title: 'Best AI Tools in 2026 — Apifeny AI',
    description:
      'Find the single best AI tool for every task. 85+ hand-picked tools ranked by trending score, real user ratings, and Asia-readiness. Updated daily.',
    url: 'https://apifeny-ai.vercel.app/best-ai-tools',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/best-ai-tools',
  },
};

export default function BestAIToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
