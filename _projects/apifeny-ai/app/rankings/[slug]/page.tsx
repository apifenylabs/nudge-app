import { Metadata } from 'next';
import { getRankingCategory } from '@/lib/ranking-categories';
import RankingCategoryClient from './_RankingCategoryClient';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
 const cat = getRankingCategory(params.slug);
 const categoryName = cat?.title || params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
 const categoryDesc = cat?.subtitle || cat?.description || `Curated rankings of the best ${categoryName.toLowerCase()} AI tools.`;

 return {
 title: `Best ${categoryName} AI Tools (2026) — Rankings & Reviews | Apifeny AI`,
 description: categoryDesc,
 keywords: [
 `best ${categoryName.toLowerCase()} AI tools`,
 `${categoryName.toLowerCase()} AI rankings`,
 `top ${categoryName.toLowerCase()} AI`,
 `AI for ${categoryName.toLowerCase()}`,
 'AI tools comparison',
 ],
 alternates: { canonical: `${BASE_URL}/rankings/${params.slug}` },
 openGraph: {
 title: `Best ${categoryName} AI Tools (2026) — Rankings & Reviews | Apifeny AI`,
 description: categoryDesc,
 url: `${BASE_URL}/rankings/${params.slug}`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630, alt: `Best ${categoryName} AI Tools` }],
 },
 twitter: {
 card: 'summary_large_image',
 title: `Best ${categoryName} AI Tools (2026) — Rankings`,
 description: categoryDesc,
 images: ['/og'],
 },
 robots: { index: true, follow: true },
 };
}

export default function Page({ params }: { params: { slug: string } }) {
 return <RankingCategoryClient params={params} />;
}
