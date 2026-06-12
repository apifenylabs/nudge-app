import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  { step: "01", title: "Create Your Profile", desc: "Sign up, choose your companion mascot, and define your agent's first skill.", color: "from-teal-500 to-teal-600" },
  { step: "02", title: "Build & Deploy", desc: "Create custom AI skills in a built-in editor, test them live, and put them to work managing your tasks.", color: "from-amber-500 to-amber-600" },
  { step: "03", title: "Earn & Ascend", desc: "Every action earns XP. Level up, unlock tiers, and grow your swarm.", color: "from-purple-500 to-purple-600" },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-gray-100 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Three steps to your first agent
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            No setup, no config. Start building in minutes.
          </p>
          <div className="mt-6 max-w-2xl mx-auto grid grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-xl bg-white border border-red-100">
              <p className="text-xs font-semibold text-red-500 mb-2">Without Titan</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-1.5 text-xs text-gray-500">✕ Juggling 5+ SaaS tools</li>
                <li className="flex items-start gap-1.5 text-xs text-gray-500">✕ Agents that don&apos;t grow with you</li>
                <li className="flex items-start gap-1.5 text-xs text-gray-500">✕ No gamified progression or XP</li>
                <li className="flex items-start gap-1.5 text-xs text-gray-500">✕ Hard to automate complex workflows</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white border border-teal-100">
              <p className="text-xs font-semibold text-teal-600 mb-2">With Titan</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-1.5 text-xs text-gray-600">✓ One hub for all your AI tools</li>
                <li className="flex items-start gap-1.5 text-xs text-gray-600">✓ Agents evolve and level up over time</li>
                <li className="flex items-start gap-1.5 text-xs text-gray-600">✓ XP, achievements, God-Tier unlocks</li>
                <li className="flex items-start gap-1.5 text-xs text-gray-600">✓ Visual swarm + skill forge in minutes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div key={step.step} className="group">
              <Card className="h-full border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
