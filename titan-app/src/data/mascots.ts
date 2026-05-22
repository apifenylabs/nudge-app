// Titan Mascots – 8 cute companions with metadata
// Each mascot has a simple SVG stored in /public/mascots/

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
}

export const MASCOTS: MascotDef[] = [
  {
    id: "teal-blob",
    name: "Teal Blob",
    emoji: "🌀",
    rarity: "common",
    image: "/mascots/teal-blob.svg",
    colorTint: "#14B8A6",
    glowIntensity: 1.0,
    sparkleCount: 8,
    hoverAnimation: "bounce",
    description: "The original Titan companion. Squishy, happy, always there.",
  },
  {
    id: "cosmic-fox",
    name: "Cosmic Fox",
    emoji: "🦊",
    rarity: "uncommon",
    image: "/mascots/cosmic-fox.svg",
    colorTint: "#F97316",
    glowIntensity: 1.2,
    sparkleCount: 12,
    hoverAnimation: "wave",
    description: "A clever fox with stardust in its tail. Curious and quick.",
  },
  {
    id: "little-robot",
    name: "Little Robot",
    emoji: "🤖",
    rarity: "uncommon",
    image: "/mascots/little-robot.svg",
    colorTint: "#06B6D4",
    glowIntensity: 1.1,
    sparkleCount: 10,
    hoverAnimation: "excited",
    description: "Bleep bloop! Your tiny mechanical sidekick.",
  },
  {
    id: "ember-dragon",
    name: "Ember Dragon",
    emoji: "🐉",
    rarity: "rare",
    image: "/mascots/ember-dragon.svg",
    colorTint: "#F59E0B",
    glowIntensity: 1.5,
    sparkleCount: 16,
    hoverAnimation: "pulse",
    description: "A fiery dragon hatchling with golden scales. Fierce protector.",
  },
  {
    id: "purrbot-cat",
    name: "Purrbot Cat",
    emoji: "🐱",
    rarity: "common",
    image: "/mascots/purrbot-cat.svg",
    colorTint: "#A78BFA",
    glowIntensity: 0.9,
    sparkleCount: 6,
    hoverAnimation: "bounce",
    description: "Half cat, half bot. 100% adorable. Purrs when you level up.",
  },
  {
    id: "orb-weaver",
    name: "Orb Weaver",
    emoji: "🔮",
    rarity: "rare",
    image: "/mascots/orb-weaver.svg",
    colorTint: "#EC4899",
    glowIntensity: 1.4,
    sparkleCount: 20,
    hoverAnimation: "spin",
    description: "A mystical floating orb that hums with cosmic energy.",
  },
  {
    id: "chompy-plant",
    name: "Chompy Plant",
    emoji: "🌱",
    rarity: "uncommon",
    image: "/mascots/chompy-plant.svg",
    colorTint: "#10B981",
    glowIntensity: 1.0,
    sparkleCount: 8,
    hoverAnimation: "excited",
    description: "A cute carnivorous plant that nibbles your tasks away.",
  },
  {
    id: "starlight",
    name: "Starlight",
    emoji: "⭐",
    rarity: "legendary",
    image: "/mascots/starlight.svg",
    colorTint: "#FDE047",
    glowIntensity: 2.0,
    sparkleCount: 24,
    hoverAnimation: "pulse",
    description: "A being of pure light. Rare, beautiful, and powerful. ✨",
  },
];

export function getMascotById(id: string): MascotDef {
  return MASCOTS.find((m) => m.id === id) ?? MASCOTS[0];
}

export function getDefaultMascot(): MascotDef {
  return MASCOTS[0];
}
