import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: "Swords",
    title: "Skill Builder",
    description: "Create custom AI skills with a built-in editor. Get them certified through automated audits — gold, silver, or bronze.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: "Crown",
    title: "Progression System",
    description: "Earn XP, unlock tiers, and ascend through God-Tier ranks. Every action levels up your swarm.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: "Orbit",
    title: "Orbital Swarm",
    description: "Visualize your agents orbiting your core. Drag-and-drop orchestration with real-time monitoring.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: "Zap",
    title: "Plugin Ecosystem",
    description: "Plug in skills for travel, finance, health, productivity — each with streaks, analytics, and daily check-ins.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: "Shield",
    title: "Audit & Certify",
    description: "OWASP and TDAD compliance checks. Production-grade security for production-grade agents.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: "Trophy",
    title: "Mascot Evolution",
    description: "Your companion evolves as you do. Unlock skins, outfits, and 3D tier upgrades through progression.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

function FeatureIcon({ name }: { name: string }) {
  const props = { className: "h-5 w-5" };
  switch (name) {
    case "Swords": return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" /><line x1="13" y1="19" x2="19" y2="13" /><line x1="16" y1="16" x2="20" y2="20" /><line x1="19" y1="21" x2="21" y2="19" /></svg>;
    case "Crown": return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" /><path d="M3 20h18" /></svg>;
    case "Orbit": return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></svg>;
    case "Zap": return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg>;
    case "Shield": return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "Trophy": return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 22V16" /><path d="M14 22V16" /><path d="M18 9a6 6 0 0 1-12 0" /></svg>;
    default: return null;
  }
}

export default function FeaturesSection() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Everything you need to command your swarm
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Built for AI power users who want their tools to feel like progression.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="group">
            <Card className="h-full border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
              <CardContent className="p-6">
                <div className={`w-10 h-10 rounded-lg ${feature.bg} ${feature.color} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <FeatureIcon name={feature.icon} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{feature.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
