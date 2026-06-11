import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PageTransition from "@/components/PageTransition";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { XpNotificationProvider } from "@/components/XpNotification";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Titan — Build Your AI Agent Army | Solo Leveling Progression",
  description:
    "A visual AI agent builder with Solo Leveling progression mechanics. Train agents across 6 tiers, unlock 24+ skill nodes, and deploy to robots or the cloud. Closed alpha — join the waitlist.",
  keywords: ["AI agent builder", "Solo Leveling", "agent swarm", "visual progression", "robot deployment"],
  openGraph: {
    title: "Titan — Build Your AI Agent Army",
    description:
      "Visual AI agent builder with gamified progression. Train, evolve, and deploy your AI agent swarm across 6 tiers.",
    type: "website",
    url: "https://titan.apifeny.com",
    siteName: "Titan",
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: "Titan — Build Your AI Agent Army",
    description:
      "Visual AI agent builder with Solo Leveling progression. Train, evolve, and deploy AI agents across 6 tiers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Titan",
              "url": "https://titan.vercel.app/",
              "description":
                "Build your AI agent army with Solo Leveling progression mechanics. Train, evolve, and deploy agents from Novice to Sovereign.",
              "applicationCategory": "AI Agent Builder",
              "operatingSystem": "Web",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "0",
                "highPrice": "499",
                "priceCurrency": "USD",
              },
            }),
          }}
        />
        <XpNotificationProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </XpNotificationProvider>
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
