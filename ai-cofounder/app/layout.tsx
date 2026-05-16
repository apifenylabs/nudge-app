import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/layout/Navbar";
import CrossSiteFooter from "@/components/layout/CrossSiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Cofounder — Your AI Cofounder. For Real.",
    template: "%s — Cofounder",
  },
  description:
    "A guided AI agent that helps you ideate, build, launch, and scale — starting with your niche. Meal planning, personal finance, solopreneur, and travel.",
  keywords: [
    "AI cofounder",
    "AI agent",
    "meal planning AI",
    "personal finance AI",
    "solopreneur AI",
    "travel AI",
    "startup AI",
  ],
  authors: [{ name: "Cofounder" }],
  creator: "Cofounder",
  publisher: "Cofounder",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Cofounder",
    title: "Cofounder — Your AI Cofounder. For Real.",
    description:
      "A guided AI agent that helps you ideate, build, launch, and scale — starting with your niche.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cofounder — Your AI Cofounder. For Real.",
    description:
      "A guided AI agent that helps you ideate, build, launch, and scale — starting with your niche.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://cofounder.ai"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* GEO / AI search optimization */}
        <meta name="geo.region" content="HK" />
        <meta name="geo.placename" content="Hong Kong" />
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  name: "Cofounder",
                  url: "https://cofounder.ai",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "All",
                  description:
                    "A guided AI agent that helps you ideate, build, launch, and scale — starting with your niche.",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  author: {
                    "@type": "Organization",
                    name: "Cofounder",
                  },
                },
                {
                  "@type": "Organization",
                  name: "Cofounder",
                  url: "https://cofounder.ai",
                  logo: "https://cofounder.ai/logo.png",
                  description:
                    "Your AI cofounder — a guided agent that helps you ideate, build, launch, and scale.",
                  sameAs: ["https://twitter.com/cofounder_ai"],
                },
                {
                  "@type": "WebSite",
                  name: "Cofounder",
                  url: "https://cofounder.ai",
                  inLanguage: "en-US",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://cofounder.ai/search?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://cofounder.ai",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Categories",
                      item: "https://cofounder.ai/categories",
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "Meal Planning",
                      item: "https://cofounder.ai/categories/meal-planning",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <CrossSiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
