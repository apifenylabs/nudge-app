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
  title: "Titan — Phasr Forge",
  description: "The Solo Leveling Steam of AI — visually level-up your personal agent swarm",
  openGraph: {
    title: "Titan — Level Up Your Personal AI Agent Swarm",
    description: "Build, train, and orchestrate your own AI agent collective. Gamified progression with XP, skills, certifications, and a 3D companion.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan — Phasr Forge",
    description: "Level up your personal AI agent swarm with XP, skills, and a 3D companion.",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
