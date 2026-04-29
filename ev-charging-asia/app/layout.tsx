import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const BASE_URL = 'https://ev-charging-asia.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EV Charging Asia | Find Charging Stations Across Asia",
    template: "%s | EV Charging Asia",
  },
  description: "Find EV charging stations across Japan, Singapore, Thailand, Malaysia, and China. Filter by connector type (CCS2, CHAdeMO, NACS, GB/T), charging speed, and reliability rating.",
  keywords: ["EV charging", "Asia", "electric vehicle", "charging stations", "Japan EV", "Singapore EV", "Thailand EV", "Malaysia EV", "China EV", "CCS2", "CHAdeMO", "NACS", "GB/T"],
  authors: [{ name: "EV Charging Asia" }],
  creator: "EV Charging Asia",
  publisher: "EV Charging Asia",
  alternates: { canonical: BASE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EV Charging Asia",
    title: "EV Charging Asia | Find Charging Stations Across Asia",
    description: "Find EV charging stations across Japan, Singapore, Thailand, Malaysia, and China.",
    url: BASE_URL,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EV Charging Asia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EV Charging Asia | Find Charging Stations Across Asia",
    description: "Find EV charging stations across Japan, Singapore, Thailand, Malaysia, and China.",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
