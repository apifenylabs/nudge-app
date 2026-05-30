import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Tools in Taiwan (2026) — 100+ Tools for Taiwanese Startups & Enterprises',
 description:
 'Discover the best AI tools for Taiwan businesses and founders. Curated directory of 100+ tools ranked by trending score, Traditional Chinese support, and local market relevance. Updated daily.',
 openGraph: {
 title: 'Best AI Tools in Taiwan (2026) — Apifeny AI',
 description:
 'Find AI tools built for Taiwan: Traditional Chinese (繁體中文) support, NT$ TWD pricing, PDPA compliance, and semiconductor industry readiness. 100+ tools, expert ranked.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-taiwan',
 siteName: 'Apifeny AI',
 locale: 'zh_TW',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools in Taiwan (2026) — Apifeny AI',
 description:
 'Find the best AI tools for Taiwan. Expert-ranked directory with Traditional Chinese interface support and local pricing info.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-taiwan',
 languages: {
 'zh-TW': 'https://apifeny-ai.vercel.app/ai-tools-taiwan',
 'en': 'https://apifeny-ai.vercel.app/ai-tools-taiwan',
 },
 },
};

export default function AIToolsTaiwanLayout({ children }: { children: React.ReactNode }) {
 return children;
}
