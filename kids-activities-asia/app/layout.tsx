import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = 'https://kids-activities-asia.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kids Activities Asia | Best Things to Do with Kids in Asian Cities",
    template: "%s | Kids Activities Asia",
  },
  description: "Curated guide to the best kids' activities, classes, and family-friendly attractions across Asia. Age-filtered, parent-approved, and safety-rated.",
  keywords: ["kids activities", "Asia family travel", "children's classes", "family activities", "things to do with kids", "Hong Kong kids", "Singapore kids", "Bangkok kids", "Tokyo kids", "Bali kids"],
  authors: [{ name: "Kids Activities Asia" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kids Activities Asia",
    title: "Kids Activities Asia | Best Things to Do with Kids in Asian Cities",
    description: "Curated guide to the best kids' activities, classes, and family-friendly attractions across Asia.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen pb-20`}>
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🎪</span>
              <span className="font-bold text-lg text-gray-900">KidsActivitiesAsia</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-6 text-sm">
              <Link href="/search" className="text-gray-600 hover:text-orange-500 transition-colors">Browse</Link>
              <Link href="/about" className="text-gray-600 hover:text-orange-500 transition-colors">About</Link>
              <Link href="/blog" className="text-gray-600 hover:text-orange-500 transition-colors">Blog</Link>
              <Link href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
        <Analytics />
        <BottomNav />
      </body>
    </html>
  );
}
