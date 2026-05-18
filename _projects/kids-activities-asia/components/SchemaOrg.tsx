export default function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kids Activities Asia",
          "url": "https://kids-activities-asia.vercel.app",
          "description": "Curated guide to the best kids' activities across Asia",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://kids-activities-asia.vercel.app/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        }),
      }}
    />
  );
}
