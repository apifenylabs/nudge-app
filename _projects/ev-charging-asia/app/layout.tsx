import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteFooter from "@/components/SiteFooter";
import { ThemeProvider } from "@/components/ThemeProvider";
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

const BASE_URL = 'https://ev-charging-asia.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EV Charging Asia | Family + Luxury EV Road Trip Planner",
    template: "%s | EV Charging Asia",
  },
  description: "Plan the ultimate family EV road trip across Asia. Find charging stations, book luxury EV-friendly hotels, discover family-friendly routes from Bangkok to Bali and beyond. CCS2, CHAdeMO, NACS, GB/T.",
  keywords: ["EV road trip", "family EV travel", "luxury EV", "Asia", "electric vehicle", "charging stations", "Japan EV", "Singapore EV", "Thailand EV", "Malaysia EV", "Indonesia EV", "China EV", "CCS2", "CHAdeMO", "NACS", "GB/T", "Tesla road trip Asia", "family travel", "EV vacation"],
  authors: [{ name: "EV Charging Asia" }],
  creator: "EV Charging Asia",
  publisher: "EV Charging Asia",
  alternates: { canonical: BASE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EV Charging Asia — Family EV Road Trips",
    title: "EV Charging Asia | Family + Luxury EV Road Trip Planner",
    description: "Plan the ultimate family EV road trip across Asia. Find charging stations, luxury hotels, and family itineraries.",
    url: BASE_URL,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EV Charging Asia — Family EV Road Trips" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EV Charging Asia | Family + Luxury EV Road Trip Planner",
    description: "Plan the ultimate family EV road trip across Asia. Find charging stations, luxury hotels, and family itineraries.",
    images: ["/og-image.jpg"],
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
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
              "name": "EV Charging Asia",
              "url": "https://ev-charging-asia.vercel.app",
              "description": "Plan the ultimate family EV road trip across Asia. Find charging stations, book luxury EV-friendly hotels, discover family-friendly routes.",
              "sameAs": [
                "https://www.familytravelasia.com",
                "https://luxury-family-travel-asia.vercel.app",
                "https://apifeny-ai.vercel.app",
                "https://kids-activities-asia.vercel.app",
                "https://senior-friendly-travel-asia.vercel.app",
                "https://nudge-sigma-liart.vercel.app",
                "https://social-beast-two.vercel.app"
              ],
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
              "name": "EV Charging Asia",
              "url": "https://ev-charging-asia.vercel.app",
              "description": "Plan the ultimate family EV road trip across Asia. Find charging stations, book luxury EV-friendly hotels, discover family-friendly routes.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://ev-charging-asia.vercel.app/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen">
        <ThemeProvider>
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <EcosystemToggle />
          <TelemetryInit />
          <BackToTop />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
