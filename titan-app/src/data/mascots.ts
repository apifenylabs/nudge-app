// Titan Mascots – 5 culturally-iconic companion archetypes
// Inspired by the legendary creature companions of Mario, Pokémon, and Neopets
// Each mascot lives as an SVG in /public/mascots/

export interface MascotDef {
  id: string;
  name: string;
  emoji: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  image: string;
  colorTint: string;
  glowIntensity: number; // 0.5–2.0
  sparkleCount: number; // 4–24
  hoverAnimation: "wave" | "bounce" | "spin" | "pulse" | "excited";
  description: string;
  /** Archetype / cultural inspiration hint */
  archetype: string;
}

export const MASCOTS: MascotDef[] = [
  {
    id: "sage",
    name: "Sage",
    emoji: "🦉",
    rarity: "uncommon",
    image: "/mascots/sage.svg",
    colorTint: "#6366F1",
    glowIntensity: 1.2,
    sparkleCount: 10,
    hoverAnimation: "bounce",
    description: "A wise owl with spectacles and a tiny book. Sage gives you the big-picture view — strategy, insight, and calm guidance. Like a wise professor who always has the answer.",
    archetype: "Professor Oak · Wisdom · Strategy",
  },
  {
    id: "spark",
    name: "Spark",
    emoji: "⚡",
    rarity: "uncommon",
    image: "/mascots/spark.svg",
    colorTint: "#FACC15",
    glowIntensity: 1.3,
    sparkleCount: 14,
    hoverAnimation: "excited",
    description: "An electric spirit buzzing with pure energy. Spark zips through your tasks at lightning speed, always one step ahead. Zap, crackle, done — that's the Spark way.",
    archetype: "Pikachu · Speed · Energy",
  },
  {
    id: "aegis",
    name: "Aegis",
    emoji: "🛡️",
    rarity: "rare",
    image: "/mascots/aegis.svg",
    colorTint: "#F472B6",
    glowIntensity: 1.4,
    sparkleCount: 12,
    hoverAnimation: "pulse",
    description: "A soft pink guardian with a shield heart. Aegis keeps your data safe, your workflows steady, and your spirits high. Loyal, protective, and impossibly cute — like a guardian angel in puffball form.",
    archetype: "Kirby · Protection · Trust",
  },
  {
    id: "drift",
    name: "Drift",
    emoji: "🐉",
    rarity: "rare",
    image: "/mascots/drift.svg",
    colorTint: "#34D399",
    glowIntensity: 1.5,
    sparkleCount: 16,
    hoverAnimation: "bounce",
    description: "A gentle explorer dragon with tiny wings and a big heart. Drift loves charting new territories — code paths, data streams, automation flows. Every new discovery is an adventure.",
    archetype: "Dragonite · Exploration · Wonder",
  },
  {
    id: "pixel",
    name: "Pixel",
    emoji: "🎮",
    rarity: "legendary",
    image: "/mascots/pixel.svg",
    colorTint: "#0EA5E9",
    glowIntensity: 2.0,
    sparkleCount: 24,
    hoverAnimation: "excited",
    description: "A creator spirit born from pure imagination. Pixel builds worlds, scripts, and automations with the joy of a game designer. Every project is a new level to conquer. Game on.",
    archetype: "Toad · Creativity · Building",
  },
];

export function getMascotById(id: string): MascotDef {
  return MASCOTS.find((m) => m.id === id) ?? MASCOTS[0];
}

export function getDefaultMascot(): MascotDef {
  return MASCOTS[0];
}
