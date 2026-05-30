interface FAQ {
 question: string;
 answer: string;
}

interface FAQJsonLdProps {
 faqs: FAQ[];
 mainEntityName?: string;
}

/**
 * Server-safe JSON-LD FAQPage component.
 * Renders schema.org FAQPage structured data for rich snippet eligibility.
 * Unlike FAQSchema (client component), this renders during SSG/SSR.
 *
 * Google requires at least 2 questions for FAQ rich results eligibility.
 * Place near the end of the page content.
 */
export default function FAQJsonLd({ faqs }: FAQJsonLdProps) {
 if (!faqs || faqs.length < 2) return null;

 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: faqs.map((faq) => ({
 '@type': 'Question',
 name: faq.question,
 acceptedAnswer: {
 '@type': 'Answer',
 text: faq.answer.substring(0, 500),
 },
 })),
 };

 return (
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify(faqJsonLd),
 }}
 />
 );
}
