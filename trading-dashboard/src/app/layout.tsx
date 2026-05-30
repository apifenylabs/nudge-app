import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Trading Dashboard",
  description: "Algo Trading Orchestra — Live P&L, pipeline, and performance",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
