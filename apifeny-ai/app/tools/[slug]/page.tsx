import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { toolsData } from '@/lib/data';
import ToolDetail from '@/components/ToolDetail';

const BASE_URL = 'https://apifeny-ai.vercel.app';

interface ToolPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return toolsData
    .filter((t) => t.is_published)
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = toolsData.find((t) => t.slug === params.slug);
  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: tool.name,
    description: tool.tagline || tool.description,
    openGraph: {
      title: `${tool.name} — Apifeny AI`,
      description: tool.tagline || tool.description,
      type: 'article',
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = toolsData.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.tagline || tool.description,
    url: `${BASE_URL}/tools/${tool.slug}`,
    applicationCategory: tool.category,
    operatingSystem: 'Web, iOS, Android',
    aggregateRating: tool.avg_rating > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: tool.avg_rating,
      ratingCount: tool.total_ratings,
      bestRating: 5,
    } : undefined,
    potentialAction: tool.website_url ? {
      '@type': 'ViewAction',
      target: tool.website_url,
    } : undefined,
    author: {
      '@type': 'Organization',
      name: 'Apifeny AI',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: tool.pricing_min_usd || 0,
      highPrice: tool.pricing_max_usd || 0,
      offerCount: 1,
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'AI Tools', item: `${BASE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: tool.name, item: `${BASE_URL}/tools/${tool.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ToolDetail tool={tool} />
      </div>
    </>
  );
}
