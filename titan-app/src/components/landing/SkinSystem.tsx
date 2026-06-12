import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Diamond } from "lucide-react";

const SKINS_PLANS = [
  { name: "Free", price: "$0", skins: "1 (default)", cooldown: "N/A", swapFee: "—", color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" },
  { name: "Starter", price: "$5", skins: "3", cooldown: "30 days", swapFee: "Free", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" },
  { name: "Collector", price: "$12", skins: "10", cooldown: "14 days", swapFee: "Free", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  { name: "Skin Market", price: "Single", skins: "Any skin", cooldown: "7 days", swapFee: "$1-5", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
];

const MONETIZATION_STRATEGIES = [
  { text: "Monthly rotation: 2-3 exclusive skins rotate in/out of the shop each month. FOMO drives purchases." },
  { text: "Cooldown friction: Swapping skins costs time (30d free → 7d paid). This makes each choice feel meaningful, and power-users pay to shorten the wait." },
  { text: "Rarity tiers: Common (free), Uncommon ($2), Rare ($5), Epic ($12), Legendary ($25). Higher rarities have animated effects, unique sounds, and particle trails." },
  { text: "Trade-in system: Users can trade 3 common skins for 1 uncommon, or pay a fee to resell owned skins on a marketplace (30% platform cut)." },
  { text: "Evolution unlocks: Hitting level 10/20/30 on a mascot unlocks exclusive evolution skins for that line — no purchase needed, earned through play." },
  { text: "Projected skin MRR: With 200 users at $5-12/mo on skin tiers + 20 single sales/month → ~$1,200-2,500/mo within 3 months." },
];

export default function SkinSystem() {
  return (
    <section className="border-t border-gray-100 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-4 border-amber-200 bg-amber-50 text-amber-700">
          <Star className="h-3 w-3 mr-1" />
          Skins &amp; Cosmetics
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Collect &amp; Customize Your Companions
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Like any great game, your Titan mascot is more than a tool — it&apos;s an identity.
          Unlock skins, swap styles, and flex your rarity. Each decision costs commitment.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
        {SKINS_PLANS.map((plan) => (
          <Card key={plan.name} className={`${plan.border} ${plan.bg} border-2`}>
            <CardContent className="p-5 text-center">
              <h3 className={`font-semibold ${plan.color} mb-1`}>{plan.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">{plan.price}</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p><span className="font-medium text-gray-700">Skins:</span> {plan.skins}</p>
                <p><span className="font-medium text-gray-700">Swap cooldown:</span> {plan.cooldown}</p>
                <p><span className="font-medium text-gray-700">Fee:</span> {plan.swapFee}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Diamond className="h-4 w-4 text-amber-500" />
          Skins Monetization Strategy
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {MONETIZATION_STRATEGIES.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-amber-500 shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
