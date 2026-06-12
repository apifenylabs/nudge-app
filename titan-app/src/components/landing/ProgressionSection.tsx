import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import ProgressionCarousel from "@/components/organisms/ProgressionCarousel";

export default function ProgressionSection() {
  return (
    <section className="border-t border-gray-100 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-4 border-amber-200 bg-amber-50 text-amber-700">
          <Sparkles className="h-3 w-3 mr-1" />
          Interactive Preview
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          See Your Agent Evolve
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Swipe through the 7 stages of agent progression. Each tier unlocks new auras,
          abilities, and visual prestige. Your real agent matches your level automatically.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <ProgressionCarousel currentLevel={15} />
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-400">
          Demo showing Level 15 (Master tier). Sign in to see YOUR progression.
        </p>
      </div>
    </section>
  );
}
