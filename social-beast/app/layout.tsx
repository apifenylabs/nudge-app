import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CrossSiteFooter from "@/components/CrossSiteFooter";

const BASE_URL = 'https://social-beast-two.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Social Beast — Content Empire for Builders",
    template: "%s | Social Beast",
  },
  description: "Create, schedule, and publish social content across all your platforms. AI-powered content engine for builders, founders, and creators.",
  manifest: "/manifest.json",
  keywords: ["social media scheduler", "content creation", "AI content", "build in public", "automated posting", "content engine"],
  authors: [{ name: "Social Beast" }],
  creator: "Social Beast",
  publisher: "Social Beast",
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Social Beast',
    title: 'Social Beast — Content Empire for Builders',
    description: 'Create, schedule, and publish social content across all your platforms. AI-powered content engine for builders, founders, and creators.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Beast — Content Empire for Builders',
    description: 'Create, schedule, and publish social content across all your platforms. AI-powered content engine for builders, founders, and creators.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Social Beast",
              "url": "https://social-beast-two.vercel.app",
              "description": "Create, schedule, and publish social content across all your platforms. AI-powered content engine for builders, founders, and creators.",
              "sameAs": [],
            }),
          }}
        />
        {/* Schema.org WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Social Beast",
              "url": "https://social-beast-two.vercel.app",
              "applicationCategory": "SocialMediaApplication",
              "operatingSystem": "Web",
              "description": "Create, schedule, and publish social content across all your platforms. AI-powered content engine for builders, founders, and creators.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }),
          }}
        />
        {/* Schema.org WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Social Beast",
              "url": "https://social-beast-two.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://social-beast-two.vercel.app/posts?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body>
        {children}
        <CrossSiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
