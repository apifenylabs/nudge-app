import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Coding Tools 2026 — Top 13 Code Assistants Ranked',
 description:
 'Find the best AI coding tools in 2026. Compare 13 top-rated AI code assistants including GitHub Copilot, Cursor, Claude Code, and more. Expert rankings, real reviews, and pricing comparisons.',
 openGraph: {
 title: 'Best AI Coding Tools 2026 — Apifeny AI',
 description:
 '13 best AI coding tools ranked by trending score and user ratings. Find the perfect code assistant for your stack — from Copilot to Claude Code.',
 url: 'https://apifeny-ai.vercel.app/best-ai-coding-tools',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/best-ai-coding-tools',
 },
};

export default function BestAICodingToolsLayout({ children }: { children: React.ReactNode }) {
 return children;
}
