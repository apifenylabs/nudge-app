import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asia Family Travel Directory | Kid-Safe Destinations",
  description: "The most beautiful, modern directory of family-friendly travel destinations across Asia. Curated, safety-rated, and updated daily.",
  keywords: "family travel, Asia destinations, kid-safe, travel directory, Tokyo, Hong Kong, Bangkok, Singapore, Bali",
  openGraph: {
    type: "website",
    title: "Asia Family Travel Directory",
    description: "Apple-level premium directory for family travel planning across Asia",
    images: ["/og-image.jpg"],
  },
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
