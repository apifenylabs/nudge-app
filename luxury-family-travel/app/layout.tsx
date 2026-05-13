import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteFooter from "@/components/SiteFooter";
import Script from "next/script";

const BASE_URL = 'https://luxuryfamilytravelasia.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Luxury Family Travel Asia | Curated Premium Experiences for Discerning Families",
    template: "%s | Luxury Family Travel Asia",
  },
  description: "Asia's most exclusive family experiences. Curated collection of 5-star resorts, private villas with butler service, Michelin-star dining for families, and unforgettable luxury adventures. Editorially ranked for discerning parents.",
  keywords: ["luxury family travel Asia", "5-star family resorts", "private villa Asia butler", "Michelin dining with kids", "luxury travel with children", "premium family experiences", "exclusive travel Asia", "ultra-luxury family vacation", "Asia luxury resorts for families", "best luxury family hotels Asia", "Cosme style travel", "curated luxury travel Asia"],
  authors: [{ name: "Luxury Family Travel Asia" }],
  creator: "Luxury Family Travel Asia",
  publisher: "Luxury Family Travel Asia",
  alternates: {
    canonical: 'https://luxuryfamilytravelasia.com',
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
    siteName: "Luxury Family Travel Asia",
    title: "Luxury Family Travel Asia | Exclusive Family Experiences",
    description: "61 curated luxury family destinations across Asia. 5-star resorts, private villas, butler service, Michelin dining, and exclusive experiences for discerning families.",
    url: BASE_URL,
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Luxury Family Travel Asia | Exclusive Family Experiences",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Family Travel Asia | Exclusive Family Experiences",
    description: "61 curated luxury family destinations across Asia. 5-star resorts, private villas, butler service, Michelin dining, and exclusive experiences for discerning families.",
    images: ["/og-image.jpg"],
    creator: "@luxuryfamilyasia",
  },
  verification: {
    google: "", // Add Google Search Console verification code here
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
      <head>
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6046953221141245" crossOrigin="anonymous" />
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Luxury Family Travel Asia",
              "url": "https://luxuryfamilytravelasia.com",
              "description": "61 curated luxury family destinations across Asia. 5-star resorts, private villas, butler service, Michelin dining, and exclusive experiences for discerning families.",
              "sameAs": [],
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
              "name": "Luxury Family Travel Asia",
              "url": "https://luxuryfamilytravelasia.com",
              "description": "61 curated luxury family destinations across Asia. 5-star resorts, private villas, butler service, Michelin dining, and exclusive experiences for discerning families.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://luxuryfamilytravelasia.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-gray-50 text-gray-900 pb-safe pt-safe">
        {children}
        <SiteFooter />
        <BottomNav />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
