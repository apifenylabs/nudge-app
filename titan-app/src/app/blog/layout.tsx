import type { Metadata } from "next";

const BASE_URL = "https://titan.apifeny.com";

export const metadata: Metadata = {
  title: "Blog — Titan AI Agent Builder",
  description:
    "Tutorials, guides, product updates, and AI tips from the Titan team. Learn how to build, train, and deploy AI agents with zero coding.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
    types: {
      "application/atom+xml": `${BASE_URL}/feed`,
    },
  },
  openGraph: {
    title: "Titan Blog — AI Agent Building Tips & Tutorials",
    description:
      "Master AI agent building with Titan. Tutorial guides, product updates, community showcases, and expert tips — from beginner to God-Tier.",
    url: `${BASE_URL}/blog`,
    siteName: "Titan — AI Agent Builder",
    type: "website",
    images: [{ url: `${BASE_URL}/og`, width: 1200, height: 630, alt: "Titan Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan Blog — AI Agent Building Tips & Tutorials",
    description:
      "Master AI agent building with Titan. Tutorials, guides, product updates, and community showcases.",
    images: [`${BASE_URL}/og`],
  },
  robots: { index: true, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
