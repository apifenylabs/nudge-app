import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Titan — Build Your AI Agent Army",
  description:
    "A visual AI agent builder with Solo Leveling progression mechanics. Train, evolve, and deploy your AI army from Novice to Sovereign.",
  openGraph: {
    title: "Titan — Build Your AI Agent Army",
    description:
      "Visual AI agent builder with gamified progression. Start free.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan — Build Your AI Agent Army",
    description:
      "Visual AI agent builder with gamified progression. Solo Leveling meets Replit.",
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
