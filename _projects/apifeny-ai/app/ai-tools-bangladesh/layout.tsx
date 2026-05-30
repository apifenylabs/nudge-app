import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Tools in Bangladesh (2026) — 100+ Tools for Dhaka Startups & Garment Industry',
 description:
 'Discover the best AI tools for Bangladesh businesses and founders. Curated directory of 100+ tools ranked by trending score, Bengali (বাংলা) language support, and local market relevance. Updated daily.',
 openGraph: {
 title: 'Best AI Tools in Bangladesh (2026) — Apifeny AI',
 description:
 'Find AI tools built for Bangladesh: Bengali (বাংলা) language support, BDT/USD pricing, PDPA compliance, and garment/textile industry readiness. 100+ tools, expert ranked.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-bangladesh',
 siteName: 'Apifeny AI',
 locale: 'bn_BD',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools in Bangladesh (2026) — Apifeny AI',
 description:
 'Find the best AI tools for Bangladesh. Expert-ranked directory with Bengali interface support and local pricing info.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-bangladesh',
 languages: {
 'bn-BD': 'https://apifeny-ai.vercel.app/ai-tools-bangladesh',
 'en': 'https://apifeny-ai.vercel.app/ai-tools-bangladesh',
 },
 },
};

export default function AIToolsBangladeshLayout({ children }: { children: React.ReactNode }) {
 return children;
}
