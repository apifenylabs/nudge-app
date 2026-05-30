import type { Metadata } from "next";
import AffiliatePageClient from "./client";

export const metadata: Metadata = {
  title: "Titan Affiliate Program — Earn 20% Recurring Commission | Apifeny",
  description:
    "Join the Titan Affiliate Program and earn up to 30% recurring commission. Promote AI agent tools your audience already wants. Sign up free.",
  openGraph: {
    title: "Titan Affiliate Program — Earn 20% Recurring Commission",
    description:
      "Promote Titan and earn recurring commissions on every referral. Three tiers, monthly payouts, real-time dashboard.",
    type: "website",
    siteName: "Titan",
    images: [
      {
        url: "/og-affiliate.png",
        width: 1200,
        height: 630,
        alt: "Titan Affiliate Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan Affiliate Program — Earn 20% Recurring Commission",
    description:
      "Promote Titan and earn recurring commissions on every referral. Three tiers, monthly payouts, real-time dashboard.",
  },
  keywords: [
    "affiliate program",
    "AI affiliate",
    "referral program",
    "recurring commission",
    "AI agent affiliate",
    "Titan affiliate",
    "Apifeny affiliate",
  ],
};

export default function AffiliatePage() {
  return <AffiliatePageClient />;
}
