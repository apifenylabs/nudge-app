// Server component — preloads metadata and blog posts at build time
import { getMeta } from '@/lib/getData';
import { getAllPosts } from '@/lib/blog-data';
import HomeContent from './page-content';

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
                "name": "What makes a family resort 'luxury' in Asia?",
                "acceptedAnswer": { "@type": "Answer", "text": "Top-tier family luxury means dedicated kids' clubs with trained staff, multi-bedroom villas or suites, private pools, all-inclusive dining with children's menus, and on-site babysitting services." }
              },
              {
                "@type": "Question",
                "name": "Which Asian destination offers the best luxury family resorts?",
                "acceptedAnswer": { "@type": "Answer", "text": "Bali, Phuket, and the Maldives lead our rankings for world-class family resorts with premium amenities, but Singapore and Tokyo also excel in luxury urban family experiences." }
              },
              {
                "@type": "Question",
                "name": "Are these resorts genuinely family-friendly or just expensive?",
                "acceptedAnswer": { "@type": "Answer", "text": "We verify each property against strict criteria: dedicated family facilities, age-appropriate activities, safety standards, and real parent reviews. Price alone doesn't earn our recommendation." }
              },
              {
                "@type": "Question",
                "name": "How much should I budget for a luxury family trip to Asia?",
                "acceptedAnswer": { "@type": "Answer", "text": "Expect $300-800 per night for a premium family resort in Southeast Asia, and $500-1,500+ in the Maldives or Japan. Many resorts offer family packages that bundle meals and activities." }
              }
            ]
          })
        }}
      />
      <HomeContent meta={meta} blogPosts={blogPosts} />
    </>
  );
}
