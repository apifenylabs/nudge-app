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

const BackToTop = dynamic(
  () => import('@/components/BackToTop'),
  { ssr: false }
);

const BASE_URL = 'https://www.seniorfriendlytravelasia.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Senior-Friendly Asia Travel | Slow-Paced, Accessible Destinations for Elderly Travelers",
    template: "%s | Senior-Friendly Asia Travel",
  },
  description: "Curated guide to senior-friendly travel in Asia. Accessible destinations, mobility-friendly hotels, slow-paced itineraries, medical facilities, and senior discounts for elderly travelers across Asia.",
  keywords: ["senior travel", "elderly travel Asia", "accessible destinations", "mobility-friendly hotels", "slow-paced travel", "senior discounts", "travel for elderly", "Asia accessible tourism", "senior-friendly tours"],
  authors: [{ name: "Senior-Friendly Asia Travel" }],
  creator: "Senior-Friendly Asia Travel",
  publisher: "Senior-Friendly Asia Travel",
  alternates: {
    canonical: 'https://www.seniorfriendlytravelasia.com',
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
    siteName: "Senior-Friendly Asia Travel",
    title: "Senior-Friendly Asia Travel | Slow-Paced, Accessible Destinations for Elderly Travelers",
    description: "Curated guide to senior-friendly travel in Asia. Accessible destinations, mobility-friendly hotels, slow-paced itineraries, medical facilities, and senior discounts for elderly travelers.",
    url: BASE_URL,
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Senior-Friendly Asia Travel",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior-Friendly Asia Travel | Accessible Destinations for Elderly Travelers",
    description: "Curated guide to senior-friendly travel in Asia. Accessible destinations, mobility-friendly hotels, slow-paced itineraries, medical facilities, and senior discounts.",
    images: ["/og-image.jpg"],
    creator: "@seniorfriendlytravelasia",
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE", // ⚠️ REQUIRED: Get this from Google Search Console
  },
  category: "travel",
  other: {
    'google-site-verification': 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE', // ⚠️ REQUIRED
  },
  applicationName: "Senior-Friendly Asia Travel",
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
        {/* Travelpayouts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=document.createElement("script");s.async=1;s.src="https://emrldtp.cc/NTMwNDAx.js?t=530401";document.head.appendChild(s);})()`,
          }}
        />
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Senior-Friendly Asia Travel",
              "url": "https://seniorfriendlytravelasia.com",
              "description": "Curated guide to senior-friendly travel in Asia. Accessible destinations, mobility-friendly hotels, slow-paced itineraries, medical facilities, and senior discounts.",
              "sameAs": [
                "https://ev-charging-asia.vercel.app",
                "https://apifeny-ai.vercel.app",
                "https://social-beast-two.vercel.app"
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
                  "name": "What are the best senior-friendly destinations in Asia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Top senior-friendly destinations in Asia include Singapore (excellent accessibility), Tokyo (clean, efficient public transport), Taipei (affordable, easy to navigate), Bangkok (affordable medical facilities), and Chiang Mai (slow-paced, cultural, and relaxing). Each offers mobility-friendly options and quality healthcare nearby."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Asia safe for elderly travelers?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, many Asian destinations are very safe for elderly travelers. Singapore, Japan, South Korea, Taiwan, and Thailand rank highly for safety, with low crime rates, good medical facilities, and increasing accessibility infrastructure. Our directory rates each destination by senior safety score based on real traveler reviews."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the best time of year for seniors to visit Southeast Asia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best time is generally November to February when weather is cooler and drier across most of Southeast Asia — ideal for elderly travelers who may struggle with extreme heat. Japan and Korea are best in spring (March-May) or autumn (September-November) for mild temperatures and stunning scenery."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do seniors get travel discounts in Asia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, many Asian destinations offer senior discounts. Japan offers discounts at many attractions for those 65+. Thailand provides senior pricing at national parks. Singapore has concession rates for seniors on public transport. Many hotels offer senior rates. Always carry a passport to verify age."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do seniors need travel insurance for Asia trips?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Comprehensive travel insurance is strongly recommended for senior travelers in Asia. Look for policies that specifically cover pre-existing medical conditions, medical evacuation, trip cancellation, and adequate hospital coverage. Some countries require proof of insurance for visa applications."
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
        <BackToTop />
      </body>
    </html>
  );
}
