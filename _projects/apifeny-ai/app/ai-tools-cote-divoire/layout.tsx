import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Tools in Côte d\'Ivoire (2026) — Curated for Ivorian Founders & Teams',
 description:
 'Discover the best AI tools for Ivorian businesses and founders. Curated directory of 85+ tools ranked by trending score, Francophone readiness, and local relevance. Updated daily.',
 openGraph: {
 title: 'Best AI Tools in Côte d\'Ivoire (2026) — Apifeny AI',
 description:
 'Find AI tools built for Côte d\'Ivoire: French-language support, local pricing, data residency, and West African market readiness. 85+ tools, expert ranked.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-cote-divoire',
 siteName: 'Apifeny AI',
 locale: 'en_CI',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools in Côte d\'Ivoire (2026) — Apifeny AI',
 description:
 'Find the best AI tools for Côte d\'Ivoire. Expert-ranked directory with Francophone Africa-ready filters and local pricing info.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-cote-divoire',
 },
};

export default function AIToolsCoteDIvoireLayout({ children }: { children: React.ReactNode }) {
 return children;
}
