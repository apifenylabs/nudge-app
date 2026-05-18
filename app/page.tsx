// Server component — preloads metadata and blog posts at build time
import { Metadata } from 'next';
import { getMeta } from '@/lib/getData';
import { getAllPosts } from '@/lib/blog-data';
import HomeContent from './page-content';

const BASE_URL = 'https://familytravelasia.com';

export const metadata: Metadata = {
  title: 'Asia Family Travel Directory — Best Destinations & Activities for Families',
  description: 'Curated family travel guide to the best kid-friendly destinations across Asia. Real parent reviews, safety-rated activities, age-filtered recommendations, and practical tips.',
  openGraph: {
    title: 'Asia Family Travel Directory — Trusted by Parents Across Asia',
    description: 'Find the best family-friendly destinations, activities, and travel tips for Asia. Curated by parents, rated by families.',
    url: BASE_URL,
    siteName: 'Asia Family Travel Directory',
    type: 'website',
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Asia Family Travel Directory' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asia Family Travel Directory',
    description: 'Find the best family-friendly destinations across Asia. Curated by parents, rated by families.',
    images: [`${BASE_URL}/og-image.jpg`],
  },
  alternates: { canonical: BASE_URL },
};

export default function Page() {
  const meta = getMeta();
  const blogPosts = getAllPosts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which Asian countries are best for family travel?",
                "acceptedAnswer": { "@type": "Answer", "text": "Japan, Thailand, Singapore, South Korea, and Malaysia top our list for kid-friendly infrastructure, safety, and diverse attractions that appeal to all ages." }
              },
              {
                "@type": "Question",
                "name": "What age range are your recommendations suitable for?",
                "acceptedAnswer": { "@type": "Answer", "text": "Our directory covers everything from infant-friendly resorts to teen-approved adventures. Use our age-range filter to find the perfect match for your family." }
              },
              {
                "@type": "Question",
                "name": "How do you safety-rate destinations?",
                "acceptedAnswer": { "@type": "Answer", "text": "Each destination is rated on a ten-point scale based on parent reviews, local safety data, medical access, and child-friendly infrastructure." }
              },
              {
                "@type": "Question",
                "name": "Are your travel tips based on real parent experiences?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every recommendation includes parent-submitted tips, real reviews, and verified information from families who have visited with children." }
              }
            ]
          })
        }}
      />
      <h1 className="sr-only">Asia Family Travel Directory — Best Family Destinations, Activities & Travel Tips</h1>
      <HomeContent meta={meta} blogPosts={blogPosts} />
    </>
  );
}
