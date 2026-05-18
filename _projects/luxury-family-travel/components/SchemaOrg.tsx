export default function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Luxury Family Travel Asia",
          "url": "https://luxury-family-travel-asia.vercel.app",
          "description": "Curated premium family travel experiences across Asia",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://luxury-family-travel-asia.vercel.app/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        }),
      }}
    />
  );
}
