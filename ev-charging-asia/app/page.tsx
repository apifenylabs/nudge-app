import { getMeta, getHomepageData } from '@/lib/getData';
import { getAllPosts } from '@/lib/blog-data';
import HomeContent from './page-content';

export default function Page() {
  const meta = getMeta();
  const homepageData = getHomepageData();
  const posts = getAllPosts().slice(0, 6);
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
                "name": "Which charging networks work across multiple Asian countries?",
                "acceptedAnswer": { "@type": "Answer", "text": "Shell Recharge, Charge+, and local networks like PCS in Malaysia and EA Anywhere in Singapore offer cross-border roaming. We map every compatible network for each route." }
              },
              {
                "@type": "Question",
                "name": "Can I drive an EV from Singapore to Thailand?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, the route from Singapore through Malaysia to Thailand is possible with proper planning. We provide detailed itineraries with verified charging stops every 150-200 km." }
              },
              {
                "@type": "Question",
                "name": "What connector types are most common in Asia?",
                "acceptedAnswer": { "@type": "Answer", "text": "CCS2 is standard in Thailand, Singapore, and Malaysia. CHAdeMO remains common in Japan. Type 2 AC is widely available across most cities for overnight charging." }
              },
              {
                "@type": "Question",
                "name": "Do I need multiple charging apps to travel across Asia?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, most countries have their own networks. Our directory consolidates all stations so you don't need to juggle multiple apps — we show compatible networks for your route." }
              }
            ]
          })
        }}
      />
      <HomeContent meta={meta} homepageData={homepageData} blogPosts={posts} />
    </>
  );
}
