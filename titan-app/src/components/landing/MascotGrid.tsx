import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const MASCOTS = [
  { name: "Sage", emoji: "🦉", src: "/mascots/sage.svg", element: "Wisdom", rarity: "Uncommon", bg: "from-indigo-100 to-indigo-50", border: "border-indigo-200", accent: "text-indigo-600" },
  { name: "Spark", emoji: "⚡", src: "/mascots/spark.svg", element: "Energy", rarity: "Uncommon", bg: "from-yellow-100 to-yellow-50", border: "border-yellow-200", accent: "text-yellow-600" },
  { name: "Aegis", emoji: "🛡️", src: "/mascots/aegis.svg", element: "Protection", rarity: "Rare", bg: "from-pink-100 to-pink-50", border: "border-pink-200", accent: "text-pink-600" },
  { name: "Drift", emoji: "🐉", src: "/mascots/drift.svg", element: "Exploration", rarity: "Rare", bg: "from-emerald-100 to-emerald-50", border: "border-emerald-200", accent: "text-emerald-600" },
  { name: "Pixel", emoji: "🎮", src: "/mascots/pixel.svg", element: "Creation", rarity: "Legendary", bg: "from-sky-100 to-sky-50", border: "border-sky-200", accent: "text-sky-600" },
];

const RARITY_COLORS: Record<string, string> = {
  Common: "text-gray-500 bg-gray-100",
  Uncommon: "text-green-600 bg-green-50",
  Rare: "text-blue-600 bg-blue-50",
  Epic: "text-purple-600 bg-purple-50",
  Legendary: "text-amber-600 bg-amber-50",
};

const STATS = [
  { label: "Companions", value: "8", suffix: "unique skins", icon: "Bot" },
  { label: "Rarity Tiers", value: "5", suffix: "common → legendary", icon: "Zap" },
  { label: "Skill Builder", value: "Built-in", suffix: "no coding needed", icon: "Trophy" },
  { label: "God Powers", value: "14", suffix: "unlockable abilities", icon: "TrendingUp" },
];

function StatIcon({ name }: { name: string }) {
  const cls = "h-4 w-4";
  switch (name) {
    case "Bot":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect x="16" y="4" width="4" height="4" /><path d="M16 20h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" /><path d="M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2" /><path d="M12 12v4" /><path d="M12 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg>;
    case "Zap":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg>;
    case "Trophy":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 22V16" /><path d="M14 22V16" /><path d="M18 9a6 6 0 0 1-12 0" /></svg>;
    case "TrendingUp":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
    default:
      return null;
  }
}

export default function MascotGrid() {
  return (
    <>
      {/* Mascot Grid */}
      <div className="mt-10 sm:mt-12">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {MASCOTS.map((mascot, i) => {
            const rarityBadge = RARITY_COLORS[mascot.rarity] || "text-gray-500 bg-gray-100";
            return (
              <div
                key={mascot.name}
                className="group w-28 sm:w-32"
              >
                <div className={`relative w-full h-44 sm:h-48 ${mascot.border} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden rounded-xl border`}>
                  <Card className={`w-full h-full ${mascot.border} border-0`}>
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className={`flex-1 flex items-center justify-center bg-gradient-to-b ${mascot.bg} p-3 relative overflow-hidden`}>
                        <Image
                          src={mascot.src}
                          alt={mascot.name}
                          width={80}
                          height={80}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                        />
                      </div>
                      <div className="px-2 py-1.5 text-center border-t border-gray-100 bg-white/80 backdrop-blur-sm">
                        <p className="text-xs font-semibold text-gray-900 truncate">{mascot.emoji} {mascot.name}</p>
                        <div className="flex items-center justify-center gap-1 mt-0.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${rarityBadge}`}>
                            {mascot.rarity}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          Each companion has unique evolutions, abilities, and unlockable skins. Your choice matters.
        </p>
      </div>

      {/* Stats row */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="text-gray-400 mb-1"><StatIcon name={stat.icon} /></div>
            <span className="text-xl font-bold text-gray-900">{stat.value}</span>
            <span className="text-xs text-gray-500 mt-0.5">{stat.label}</span>
            {stat.suffix && <span className="text-[10px] text-gray-400">{stat.suffix}</span>}
          </div>
        ))}
      </div>
    </>
  );
}
