import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SchemaOrg from "@/components/SchemaOrg";
import dynamic from 'next/dynamic';

const EcosystemToggle = dynamic(
  () => import('@/components/EcosystemToggle'),
  { ssr: false }
);

const TelemetryInit = dynamic(
  () => import('@/components/TelemetryInit'),
  { ssr: false }
);

const BASE_URL = 'https://www.familytravelasia.com';

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
    canonical: 'https://www.familytravelasia.com',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Dark mode init — prevents FOUC */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var m=localStorage.getItem('theme');if(m==='dark'||(!m&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})()`,
        }} />
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
              "sameAs": [
                "https://ev-charging-asia.vercel.app",
                "https://kids-activities-asia.vercel.app",
                "https://luxury-family-travel-asia.vercel.app",
                "https://apifeny-ai.vercel.app",
                "https://senior-friendly-travel-asia.vercel.app",
                "https://social-beast-two.vercel.app",
                "https://nudge-sigma-liart.vercel.app"
              ],
            }),
          }}
        />
        {/* Schema.org FAQ (rendered client-side as JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What are the best family-friendly destinations in Asia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Top family-friendly destinations in Asia include Tokyo (Japan), Singapore, Bangkok (Thailand), Bali (Indonesia), Hong Kong, Seoul (South Korea), Kuala Lumpur (Malaysia), and Da Nang (Vietnam). Each offers kid-safe attractions, family-friendly accommodation, and activities suitable for all ages."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Asia safe for family travel with young children?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, many Asian destinations are very safe for family travel. Singapore, Japan, South Korea, and Taiwan consistently rank among the safest countries for families. Our directory rates each destination by safety score based on parent reviews and on-the-ground research."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the best time of year to visit Southeast Asia with kids?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best time depends on the country. Generally, November to February offers cooler, drier weather across most of Southeast Asia — ideal for family travel. Avoid monsoon seasons (June-October in Thailand/Vietnam). Japan and Korea are best in spring (March-May) or autumn (September-November)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I find kid-friendly activities near me in Asia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use our directory to browse 29+ destinations across Asia, filter by age range (babies, toddlers, tweens, teens), safety rating, category (theme parks, nature, cultural sites), and price range. Each listing includes parent tips, safety scores, and booking options via Klook and Viator."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need travel insurance for family trips in Asia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, comprehensive travel insurance is strongly recommended for family travel in Asia. Look for policies that cover medical evacuation, trip cancellation, lost luggage, and adventure activities. Many Asian countries require proof of insurance for visa applications."
                  }
                }
              ]
            }),
          }}
        />
        {/* Mobile-first viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
      </head>
      <body className="min-h-full bg-surface text-body pb-safe pt-safe font-body dark:bg-gray-900 dark:text-gray-100">
        <SchemaOrg />
        {children}
        <SiteFooter />
        <BottomNav />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <EcosystemToggle />
        <TelemetryInit />
      </body>
    </html>
  );
}
