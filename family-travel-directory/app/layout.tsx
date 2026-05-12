import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const BASE_URL = 'https://familytravelasia.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Asia Family Travel Directory | Honest Tips from Real Parents",
    template: "%s | Asia Family Travel Directory",
  },
  description: "29+ family-friendly destinations across Asia. Honest tips, real parent stories, and practical advice for traveling with kids in Tokyo, Hong Kong, Bangkok, and more.",
  keywords: ["family travel", "Asia destinations", "kid-safe travel", "family vacation", "Tokyo with kids", "Singapore family", "Bangkok children", "travel directory", "parent-approved"],
  authors: [{ name: "Family Travel Directory" }],
  creator: "Family Travel Directory",
  publisher: "Family Travel Directory",
  alternates: {
    canonical: 'https://familytravelasia.com',
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
    siteName: "Asia Family Travel Directory",
    title: "Asia Family Travel Directory | Honest Tips from Real Parents",
    description: "29+ family-friendly destinations across Asia. Honest tips, real parent stories, and practical advice for traveling with kids in Tokyo, Hong Kong, Bangkok, and more.",
    url: BASE_URL,
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Asia Family Travel Directory",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asia Family Travel Directory | Honest Tips from Real Parents",
    description: "29+ family-friendly destinations across Asia. Honest tips, real parent stories, and practical advice for traveling with kids in Tokyo, Hong Kong, Bangkok, and more.",
    images: ["/og-image.jpg"],
    creator: "@familytravelasia",
  },
  verification: {
    google: "", // Add Google Search Console verification code here
  },
  category: "travel",
  other: {
    'google-site-verification': '',
  },
  applicationName: "Asia Family Travel Directory",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
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
              "name": "Asia Family Travel Directory",
              "url": "https://familytravelasia.com",
              "description": "29+ family-friendly destinations across Asia. Honest tips, real parent stories, and practical advice for traveling with kids — curated by Vibe Engine.",
              "sameAs": [],
            }),
          }}
        />
        {/* Mobile-first viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
      </head>
      <body className="min-h-full bg-surface text-body pb-safe pt-safe font-body">
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
