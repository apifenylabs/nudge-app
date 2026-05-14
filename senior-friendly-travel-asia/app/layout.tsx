import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const BASE_URL = 'https://seniorfriendlytravel.asia';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Senior-Friendly Travel Asia | Accessible Destinations for Older Adults",
    template: "%s | Senior-Friendly Travel Asia",
  },
  description: "Curated directory of senior-friendly destinations across Asia. Accessible travel, mobility-friendly attractions, and practical advice for older adults exploring Asia.",
  keywords: ["senior travel", "Asia destinations", "accessible travel", "senior-friendly", "older adults travel", "mobility-friendly", "Asia for seniors", "retirement travel", "slow travel Asia"],
  authors: [{ name: "Senior-Friendly Travel Asia" }],
  creator: "Senior-Friendly Travel Asia",
  publisher: "Senior-Friendly Travel Asia",
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
    type: "website",
    locale: "en_US",
    siteName: "Senior-Friendly Travel Asia",
    title: "Senior-Friendly Travel Asia | Accessible Destinations for Older Adults",
    description: "Curated directory of senior-friendly destinations across Asia. Mobility-friendly attractions, accessible transport, and practical advice.",
    url: BASE_URL,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Senior-Friendly Travel Asia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior-Friendly Travel Asia | Accessible Destinations for Older Adults",
    description: "Curated directory of senior-friendly destinations across Asia. Mobility-friendly attractions, accessible transport, and practical advice.",
    images: ["/og-image.jpg"],
  },
  category: "travel",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 text-gray-900 pb-safe pt-safe">
        {children}
        <Analytics />
        <SpeedInsights />
        <SiteFooter />
        <GoogleAnalytics />
        {/* Schema.org Organization */}
        <Script
          id="schema-org-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Senior-Friendly Travel Asia",
              "url": "https://seniorfriendlytravel.asia",
              "description": "Curated directory of senior-friendly destinations across Asia. Accessible travel, mobility-friendly attractions, and practical advice for older adults exploring Asia.",
              "sameAs": [],
            }),
          }}
        />
        {/* Schema.org WebSite */}
        <Script
          id="schema-org-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Senior-Friendly Travel Asia",
              "url": "https://seniorfriendlytravel.asia",
              "description": "Curated directory of senior-friendly destinations across Asia. Mobility-friendly attractions, accessible transport, and practical advice.",

            }),
          }}
        />
      </body>
    </html>
  );
}
