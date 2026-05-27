import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Writing Tools 2026 — Top 14 Writing Assistants Ranked',
  description:
    'Discover the best AI writing tools of 2026. Compare 14 top-rated AI writing assistants for content creation, copywriting, email, and blog posts. Expert rankings with real user reviews.',
  openGraph: {
    title: 'Best AI Writing Tools 2026 — Apifeny AI',
    description:
      '14 best AI writing tools ranked by trending and ratings. Find your perfect AI writing assistant for blogs, emails, social media, and more.',
    url: 'https://apifeny.ai/best-ai-writing-tools',
  },
  alternates: {
    canonical: 'https://apifeny.ai/best-ai-writing-tools',
  },
};

export default function BestAIWritingToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
