import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SchemaOrg from "@/components/SchemaOrg";
import SiteFooter from "@/components/SiteFooter";
import Script from "next/script";
import PremiumThemeInitializer from "@/components/PremiumThemeInitializer";
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

const BASE_URL = 'https://luxury-family-travel-asia.vercel.app';

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
    canonical: 'https://luxury-family-travel-asia.vercel.app',
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
      url: "/og",
      width: 1200,
      height: 630,
      alt: "Luxury Family Travel Asia | Exclusive Family Experiences",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Family Travel Asia | Exclusive Family Experiences",
    description: "61 curated luxury family destinations across Asia. 5-star resorts, private villas, butler service, Michelin dining, and exclusive experiences for discerning families.",
    images: ["/og"],
    creator: "@luxuryfamilyasia",
  },
  verification: {
    google: "", // Add Google Search Console verification code here
  },
  category: "travel",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
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
              "name": "Luxury Family Travel Asia",
              "url": "https://luxury-family-travel-asia.vercel.app",
              "description": "61 curated luxury family destinations across Asia. 5-star resorts, private villas, butler service, Michelin dining, and exclusive experiences for discerning families.",
              "sameAs": [
                "https://www.familytravelasia.com",
                "https://ev-charging-asia.vercel.app",
                "https://apifeny-ai.vercel.app",
                "https://kids-activities-asia.vercel.app",
                "https://senior-friendly-travel-asia.vercel.app",
                "https://nudge-sigma-liart.vercel.app",
                "https://social-beast-two.vercel.app",
                "https://ai-cofounder-lovat.vercel.app"
              ],
            }),
          }}
        />

      </head>
      <body className="min-h-full bg-warm-white text-charcoal pb-safe pt-safe">
        {/* Theme color scheme initializer */}
        <PremiumThemeInitializer />
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
