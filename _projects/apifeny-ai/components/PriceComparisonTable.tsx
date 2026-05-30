'use client';

import { Check, X, Minus, ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAffiliateForTool } from '@/lib/affiliate-links';

interface PriceTier {
 name: string;
 price: string;
 popular?: boolean;
 features: { label: string; included: boolean | 'limited' }[];
}

interface PriceComparisonTableProps {
 toolSlug: string;
 toolName: string;
 websiteUrl: string;
 pricingTier: string;
 pricingMin?: number;
 pricingMax?: number;
}

function generateTiers(
 toolSlug: string,
 toolName: string,
 pricingTier: string,
 pricingMin?: number,
 pricingMax?: number
): PriceTier[] {
 // Default tiers per pricing model
 const freeTier: PriceTier = {
 name: 'Free',
 price: '$0',
 features: [
 { label: 'Basic access', included: true },
 { label: 'Core features', included: true },
 { label: 'Priority support', included: false },
 { label: 'Advanced features', included: false },
 { label: 'API access', included: false },
 { label: 'Team collaboration', included: false },
 ],
 };

 const proTier: PriceTier = {
 name: 'Pro',
 price: pricingMin ? `$${pricingMin}/mo` : '$20/mo',
 popular: true,
 features: [
 { label: 'Basic access', included: true },
 { label: 'Core features', included: true },
 { label: 'Priority support', included: pricingMin && pricingMin >= 20 },
 { label: 'Advanced features', included: true },
 { label: 'API access', included: true },
 { label: 'Team collaboration', included: true },
 ],
 };

 const enterpriseTier: PriceTier = {
 name: 'Enterprise',
 price: pricingMax ? `$${pricingMax}/mo` : 'Custom',
 features: [
 { label: 'Basic access', included: true },
 { label: 'Core features', included: true },
 { label: 'Priority support', included: true },
 { label: 'Advanced features', included: true },
 { label: 'API access', included: true },
 { label: 'Team collaboration', included: true },
 ],
 };

 switch (pricingTier) {
 case 'Free':
 return [freeTier];
 case 'Open Source':
 return [
 {
 name: 'Self-Hosted',
 price: 'Free',
 popular: true,
 features: [
 { label: 'Full access', included: true },
 { label: 'Community support', included: true },
 { label: 'Self-managed', included: true },
 { label: 'Custom integrations', included: true },
 { label: 'API access', included: true },
 { label: 'Team collaboration', included: true },
 ],
 },
 ];
 case 'Freemium':
 return [freeTier, proTier, enterpriseTier];
 case 'Paid':
 return [proTier, enterpriseTier];
 case 'Enterprise':
 return [enterpriseTier];
 default:
 return [freeTier, proTier];
 }
}

function FeatureIcon({ included }: { included: boolean | 'limited' }) {
 if (included === true) return <Check className="w-4 h-4 text-emerald-400" />;
 if (included === 'limited') return <Minus className="w-4 h-4 text-amber-400" />;
 return <X className="w-4 h-4 text-tech-400" />;
}

export default function PriceComparisonTable({
 toolSlug,
 toolName,
 websiteUrl,
 pricingTier,
 pricingMin,
 pricingMax,
}: PriceComparisonTableProps) {
 const tiers = generateTiers(toolSlug, toolName, pricingTier, pricingMin, pricingMax);
 const affiliate = getAffiliateForTool(toolSlug);
 const href = affiliate?.referral_url || websiteUrl;

 return (
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 overflow-hidden">
 {/* Header */}
 <div className="px-5 py-4 border-b border-tech-500/20">
 <h3 className="text-sm font-semibold text-white flex items-center gap-2">
 <Sparkles className="w-4 h-4 text-neon-light" />
 Pricing &amp; Plans
 </h3>
 </div>

 {/* Desktop table */}
 <div className="hidden sm:block">
 <table className="w-full">
 <thead>
 <tr className="border-b border-tech-500/20">
 <th className="text-left py-3 px-5 text-xs font-medium text-tech-200 w-1/3">
 Feature
 </th>
 {tiers.map((tier) => (
 <th
 key={tier.name}
 className={cn(
 'py-3 px-4 text-sm font-semibold text-center relative',
 tier.popular ? 'text-neon-light' : 'text-white'
 )}
 >
 {tier.popular && (
 <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-neon text-white text-[9px] font-bold px-2 py-0.5 rounded-b">
 BEST OPTION
 </div>
 )}
 {tier.name}
 <div className="text-[11px] font-normal text-tech-200 mt-0.5">
 {tier.price}
 </div>
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {tiers[0].features.map((feature, i) => (
 <tr key={i} className="border-b border-tech-500/10 last:border-0">
 <td className="py-2.5 px-5 text-xs text-tech-100">{feature.label}</td>
 {tiers.map((tier) => (
 <td key={tier.name} className="py-2.5 px-4 text-center">
 <div className="flex justify-center">
 <FeatureIcon included={tier.features[i]?.included ?? false} />
 </div>
 </td>
 ))}
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 {/* Mobile cards */}
 <div className="sm:hidden divide-y divide-tech-500/20">
 {tiers.map((tier) => (
 <div key={tier.name} className={cn('p-4', tier.popular ? 'bg-neon/5' : '')}>
 <div className="flex items-center justify-between mb-2">
 <div className="flex items-center gap-2">
 <span className="text-sm font-semibold text-white">{tier.name}</span>
 {tier.popular && (
 <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-neon text-white">
 BEST
 </span>
 )}
 </div>
 <span className="text-sm font-medium text-tech-100">{tier.price}</span>
 </div>
 <div className="space-y-1">
 {tier.features.map((feature, i) => (
 <div key={i} className="flex items-center gap-2 text-xs">
 <FeatureIcon included={feature.included} />
 <span className="text-tech-200">{feature.label}</span>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>

 {/* CTA footer */}
 <div className="px-5 py-3 border-t border-tech-500/20 bg-tech-800/50 flex justify-end">
 <a
 href={href}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neon hover:bg-neon-dark text-white text-xs font-medium transition"
 >
 See full pricing at {toolName}
 <ExternalLink className="w-3.5 h-3.5" />
 </a>
 </div>
 </div>
 );
}
