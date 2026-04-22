import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const BASE_URL = 'https://family-travel-directory.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Asia Family Travel Directory | Kid-Safe Destinations Curated by Parents",
    template: "%s | Asia Family Travel Directory",
  },
  description: "The most beautiful directory of family-friendly travel destinations across Asia. Every place is safety-rated, kid-tested, and curated by parents who've been there.",
  keywords: ["family travel", "Asia destinations", "kid-safe travel", "family vacation", "Tokyo with kids", "Singapore family", "Bangkok children", "travel directory", "parent-approved"],
  authors: [{ name: "Family Travel Directory" }],
  creator: "Family Travel Directory",
  publisher: "Family Travel Directory",
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
    siteName: "Asia Family Travel Directory",
    title: "Asia Family Travel Directory | Kid-Safe Destinations",
    description: "The most beautiful directory of family-friendly travel destinations across Asia. Safety-rated, kid-tested, parent-approved.",
    url: BASE_URL,
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Asia Family Travel Directory",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asia Family Travel Directory",
    description: "The most beautiful directory of family-friendly travel destinations across Asia.",
    images: ["/og-image.jpg"],
    creator: "@familytravelasia",
  },
  verification: {
    google: "", // Add Google Search Console verification code here
  },
  category: "travel",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
