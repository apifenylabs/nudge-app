import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "GeneralScan — Know What You're Buying",
  description:
    "Scan barcodes or search product names to get instant sustainability scores, health ratings, and value comparisons. Make informed choices for your health and the planet.",
  keywords: [
    "product scanner", "sustainability", "health rating", "eco score",
    "nutri-score", "barcode scanner", "food scanner",
  ],
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
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span>GeneralScan</span>
            </a>
            <nav className="ml-auto flex items-center gap-4 text-sm">
              <a
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Search
              </a>
              <a
                href="/compare"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Compare
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
          {children}
        </main>
        <footer className="border-t py-4 text-center text-xs text-muted-foreground">
          Powered by Open Food Facts &amp; Open Beauty Facts. Data may not be complete for all products.
        </footer>
      </body>
    </html>
  );
}
