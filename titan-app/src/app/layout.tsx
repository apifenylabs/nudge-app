import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
  title: "Titan — Your Personal AI Agent Platform | Build, Level Up & Deploy Agent Swarms",
  description: "Build your own AI agent collective with Titan. Gamified XP progression, 8 unique mascot companions, skill forge, certifications, and God-Tier unlocks. Like raising a Pokémon that actually does your work.",
  keywords: ["AI agent platform", "agent builder", "AI swarm", "gamified AI", "mascot AI", "agent orchestration", "Titan AI", "skill forge", "AI progression"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Titan — Your Personal AI Agent Platform",
    description: "Build, train, and orchestrate your own AI agent collective. Gamified progression with XP, skills, and certifications.",
    type: "website",
    siteName: "Titan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan — Your Personal AI Agent Platform",
    description: "Build, train, and orchestrate your own AI agent collective. Gamified progression with XP, skills, and certifications.",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#7c3aed",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
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
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
