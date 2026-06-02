import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from 'next/dynamic';

const EcosystemToggle = dynamic(
 () => import('@/components/EcosystemToggle'),
 { ssr: false }
);

const TelemetryInit = dynamic(
 () => import('@/components/TelemetryInit'),
 { ssr: false }
);

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 metadataBase: new URL(BASE_URL),
 title: { default: "Apifeny AI — AI Tools & Playbooks That Actually Work", template: "%s | Apifeny AI" },
 description: "Stop collecting AI tools, start shipping. 79 AI playbooks and 60 curated tools organized by workflow — content creation, coding, marketing, design, research, customer support, sales, and more. Asia-ready filters and editorial rankings.",
 keywords: ["AI tools directory", "best AI agents", "AI playbooks", "AI tools for solopreneurs", "Asia-ready AI", "AI tools for business", "AI workflow guides", "AI use cases", "AI for Asia", "AI tool rankings", "AI coding tools", "AI content creation"],
 openGraph: {
 type: "website",
 locale: "en_US",
 siteName: "Apifeny AI",
 title: "Apifeny AI — AI Tools & Playbooks That Actually Work",
 description: "Problem -> Playbook -> Tools. 79 step-by-step AI playbooks with 60 curated tools. Built for Asia.",
 url: BASE_URL,
 images: [{ url: "/og", width: 1200, height: 630 }],
 },
 twitter: {
 card: "summary_large_image",
 title: "Apifeny AI — AI Tools & Playbooks",
 description: "Problem -> Playbook -> Tools. 79 playbooks, 60 curated tools, Asia-ready filters.",
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
 "url": "https://apifeny-ai.vercel.app",
 "description": "Curated AI tools, agents, and playbooks with Asia-ready filters and editorial rankings.",
 "sameAs": [
 "https://www.familytravelasia.com",
 "https://ev-charging-asia.vercel.app",
 "https://kids-activities-asia.vercel.app",
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
 "name": "Apifeny AI",
 "url": "https://apifeny-ai.vercel.app",
 "description": "Curated AI tools, agents, and playbooks with Asia-ready filters and editorial rankings.",
 "potentialAction": {
 "@type": "SearchAction",
 "target": {
 "@type": "EntryPoint",
 "urlTemplate": "https://apifeny-ai.vercel.app/tools?q={search_term_string}"
 },
 "query-input": "required name=search_term_string"
 }
 }),
 }}
 />
 {/* Travelpayouts */}
 <script
 dangerouslySetInnerHTML={{
 __html: `(function(){var s=document.createElement("script");s.async=1;s.src="https://emrldtp.cc/NTMwNDAx.js?t=530401";document.head.appendChild(s);})()`,
 }}
 />
 </head>
 <body className="min-h-screen bg-white text-gray-900 flex flex-col">
 <Header />
 <main className="flex-1">{children}</main>
 <Footer />
 <Analytics />
 <SpeedInsights />
 <GoogleAnalytics />
 <EcosystemToggle />
 <TelemetryInit />
 </body>
 </html>
 );
}
