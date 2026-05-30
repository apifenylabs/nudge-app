'use client';

interface FAQ {
 question: string;
 answer: string;
}

interface FAQSchemaProps {
 faqs: FAQ[];
 /** Optional mainEntity name for the page — defaults to the guide's title */
 mainEntityName?: string;
 baseUrl?: string;
}

/**
 * JSON-LD FAQPage schema component for guide pages that answer common questions.
 * Injects schema.org FAQPage structured data for rich snippet eligibility in search results.
 *
 * Usage:
 * <FAQSchema
 * faqs={[
 * { question: "What is...?", answer: "..." },
 * { question: "How much...?", answer: "..." },
 * ]}
 * />
 *
 * Place this component anywhere in the guide page layout (ideally near the FAQ section).
 * Google requires at least 2 questions for FAQ rich results eligibility.
 */
export default function FAQSchema({ faqs, baseUrl = 'https://apifeny.ai' }: FAQSchemaProps) {
 if (!faqs || faqs.length < 2) return null;

 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: faqs.map((faq) => ({
 '@type': 'Question',
 name: faq.question,
 acceptedAnswer: {
 '@type': 'Answer',
 text: faq.answer.substring(0, 500), // Google recommends < 500 chars per answer
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
