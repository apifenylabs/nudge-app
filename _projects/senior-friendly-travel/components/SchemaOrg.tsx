export default function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Family Travel Asia",
          "url": "https://familytravelasia.com",
          "description": "Honest family travel advice for Asia",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://familytravelasia.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        }),
      }}
    />
  );
}
