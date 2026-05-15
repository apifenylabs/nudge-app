import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "Apifeny AI — Discover the Best AI Tools & Agents", template: "%s | Apifeny AI" },
  description: "25+ AI playbooks and 90+ curated AI tools with Asia-ready filters. Step-by-step guides for content creation, app building, marketing, finance, healthcare, real estate, ecommerce, HR, legal, gaming, and more. Built for Asia.",
  keywords: ["AI tools directory", "best AI agents", "AI tools for solopreneurs", "Asia-ready AI", "AI playbooks", "AI tools for business", "AI playbook guides", "AI use cases"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Apifeny AI",
    title: "Apifeny AI — Discover the Best AI Tools & Agents",
    description: "25+ AI playbooks and 90+ curated AI tools with Asia-ready filters. Step-by-step guides for every use case.",
    url: BASE_URL,
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apifeny AI",
    description: "25+ AI playbooks and 90+ curated tools. Real workflows for real results.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Apifeny AI",
              "url": "https://apifeny.ai",
              "description": "Curated AI tools, agents, and playbooks with Asia-ready filters and editorial rankings.",
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
              "name": "Apifeny AI",
              "url": "https://apifeny.ai",
              "description": "Curated AI tools, agents, and playbooks with Asia-ready filters and editorial rankings.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://apifeny.ai/tools?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-tech-900 text-white flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
