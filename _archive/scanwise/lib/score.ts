// Scoring algorithm for ScanWise

interface ScoreResult {
  overall: number;
  safety: number;
  ingredients: number;
  completeness: number;
  breakdown: {
    nutriscore: number;
    nova: number;
    additivePenalty: number;
    flaggedIngredients: FlaggedIngredient[];
    totalIngredients: number;
    cleanCount: number;
  };
}

interface FlaggedIngredient {
  name: string;
  reason: string;
  severity: "clean" | "caution" | "dirty";
  penalty: number;
}

// Nutri-Score grade → numeric value
const NUTRI_SCORE_MAP: Record<string, number> = {
  a: 95,
  b: 80,
  c: 60,
  d: 35,
  e: 15,
};

// NOVA group → processing score
const NOVA_MAP: Record<number, number> = {
  1: 90, // Unprocessed/minimally processed
  2: 70, // Processed culinary ingredients
  3: 40, // Processed foods
  4: 20, // Ultra-processed foods
};

// Known controversial additives with severity and reason
const CONTROVERSIAL_ADDITIVES: Array<{
  patterns: string[];
  name: string;
  reason: string;
  severity: "caution" | "dirty";
  penalty: number;
}> = [
  {
    patterns: ["carrageenan", "e407"],
    name: "Carrageenan",
    reason: "Linked to gut inflammation and digestive issues",
    severity: "dirty",
    penalty: 12,
  },
  {
    patterns: ["bht", "butylated hydroxytoluene", "e321"],
    name: "BHT",
    reason: "Suspected endocrine disruptor, banned in some countries",
    severity: "dirty",
    penalty: 12,
  },
  {
    patterns: ["bha", "butylated hydroxyanisole", "e320"],
    name: "BHA",
    reason: "Possible human carcinogen (IARC Group 2B)",
    severity: "dirty",
    penalty: 15,
  },
  {
    patterns: ["red 40", "red40", "allura red", "e129"],
    name: "Red 40 (Allura Red)",
    reason: "Linked to hyperactivity, derived from petroleum",
    severity: "dirty",
    penalty: 10,
  },
  {
    patterns: ["yellow 5", "yellow5", "tartrazine", "e102"],
    name: "Yellow 5 (Tartrazine)",
    reason: "Linked to allergic reactions and hyperactivity",
    severity: "dirty",
    penalty: 10,
  },
  {
    patterns: ["yellow 6", "yellow6", "sunset yellow", "e110"],
    name: "Yellow 6 (Sunset Yellow)",
    reason: "Linked to hyperactivity, contains benzidine",
    severity: "dirty",
    penalty: 10,
  },
  {
    patterns: ["blue 1", "blue1", "brilliant blue", "e133"],
    name: "Blue 1 (Brilliant Blue)",
    reason: "Linked to allergic reactions, questionable safety",
    severity: "caution",
    penalty: 8,
  },
  {
    patterns: [
      "high fructose corn syrup",
      "hfcs",
      "high-fructose corn syrup",
    ],
    name: "High Fructose Corn Syrup",
    reason:
      "Linked to obesity, metabolic issues, and fatty liver disease",
    severity: "dirty",
    penalty: 10,
  },
  {
    patterns: ["msg", "monosodium glutamate", "e621"],
    name: "MSG (Monosodium Glutamate)",
    reason: "May cause headaches and sensitivity in some individuals",
    severity: "caution",
    penalty: 5,
  },
  {
    patterns: ["titanium dioxide", "e171"],
    name: "Titanium Dioxide",
    reason: "Banned in EU foods (2022), potential genotoxicity",
    severity: "dirty",
    penalty: 15,
  },
  {
    patterns: ["aspartame", "e951"],
    name: "Aspartame",
    reason: "Possible carcinogen (IARC Group 2B), linked to headaches",
    severity: "caution",
    penalty: 8,
  },
  {
    patterns: ["sucralose", "e955", "splenda"],
    name: "Sucralose",
    reason: "May disrupt gut microbiome, raises blood sugar in some",
    severity: "caution",
    penalty: 7,
  },
  {
    patterns: ["saccharin", "e954"],
    name: "Saccharin",
    reason: "Linked to bladder cancer in animal studies",
    severity: "caution",
    penalty: 8,
  },
  {
    patterns: ["sodium nitrite", "e250", "sodium nitrate", "e251"],
    name: "Sodium Nitrite/Nitrate",
    reason: "Forms carcinogenic nitrosamines when cooked",
    severity: "dirty",
    penalty: 12,
  },
  {
    patterns: ["potassium bromate", "e924"],
    name: "Potassium Bromate",
    reason: "Banned in EU, UK, Canada — possible carcinogen",
    severity: "dirty",
    penalty: 15,
  },
  {
    patterns: ["propyl paraben", "propylparaben", "e216"],
    name: "Propyl Paraben",
    reason: "Endocrine disruptor, restricted in EU cosmetics",
    severity: "dirty",
    penalty: 12,
  },
  {
    patterns: ["palm oil", "palmitate"],
    name: "Palm Oil",
    reason: "High in saturated fat, linked to deforestation",
    severity: "caution",
    penalty: 5,
  },
];

/**
 * Analyze ingredients and return flagged items
 */
export function analyzeIngredients(
  ingredientsText?: string,
  additivesTags?: string[]
): { flagged: FlaggedIngredient[]; cleanCount: number; total: number } {
  const flagged: FlaggedIngredient[] = [];
  const normalizedText = (ingredientsText || "").toLowerCase();

  // Check against known controversial additives
  for (const additive of CONTROVERSIAL_ADDITIVES) {
    for (const pattern of additive.patterns) {
      if (normalizedText.includes(pattern)) {
        flagged.push({
          name: additive.name,
          reason: additive.reason,
          severity: additive.severity,
          penalty: additive.penalty,
        });
        break;
      }
    }
  }

  // Also check additives_tags from the API
  if (additivesTags) {
    for (const tag of additivesTags) {
      const tagLower = tag.toLowerCase().replace("en:", "");
      for (const additive of CONTROVERSIAL_ADDITIVES) {
        for (const pattern of additive.patterns) {
          if (tagLower.includes(pattern)) {
            const alreadyFlagged = flagged.some(
              (f) => f.name === additive.name
            );
            if (!alreadyFlagged) {
              flagged.push({
                name: additive.name,
                reason: additive.reason,
                severity: additive.severity,
                penalty: additive.penalty,
              });
            }
            break;
          }
        }
      }
    }
  }

  // Estimate total ingredients by splitting on commas
  const total =
    ingredientsText
      ?.split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0).length || 0;

  const cleanCount = Math.max(0, total - flagged.length);

  return { flagged, cleanCount, total };
}

/**
 * Calculate ingredients score based on flagged items
 */
function calculateIngredientsScore(
  flagged: FlaggedIngredient[],
  total: number
): number {
  if (total === 0) return 50; // No data, default to middle

  // Start at 100, deduct penalty for each flagged ingredient
  let score = 100;
  for (const f of flagged) {
    score -= f.penalty;
  }

  // Bonus for high clean ratio
  const cleanRatio = Math.max(0, total - flagged.length) / total;
  if (cleanRatio > 0.9) score += 5;
  if (cleanRatio > 0.95) score += 3;

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate completeness score based on available data
 */
function calculateCompleteness(product: {
  product_name?: string;
  brands?: string;
  ingredients_text?: string;
  image_url?: string;
  nutriments?: Record<string, number>;
  nutriscore_grade?: string;
  categories?: string;
}): number {
  const fields = [
    product.product_name,
    product.brands,
    product.ingredients_text,
    product.image_url,
    product.nutriscore_grade,
    product.categories,
    product.nutriments && Object.keys(product.nutriments).length > 0,
  ];

  const present = fields.filter(Boolean).length;
  return Math.round((present / fields.length) * 100);
}

/**
 * Get safe Nutri-Score value
 */
function getNutriScore(grade?: string): number {
  if (!grade) return 50;
  const normalized = grade.toLowerCase().trim();
  return NUTRI_SCORE_MAP[normalized] ?? 50;
}

/**
 * Get safe NOVA score
 */
function getNovaScore(group?: number): number {
  if (!group || group < 1 || group > 4) return 50;
  return NOVA_MAP[group] ?? 50;
}

/**
 * Calculate the overall ScoreResult for a product
 */
export function calculateScore(product: {
  product_name?: string;
  brands?: string;
  ingredients_text?: string;
  image_url?: string;
  nutriments?: Record<string, number>;
  nutriscore_grade?: string;
  nova_group?: number;
  additives_tags?: string[];
  categories?: string;
}): ScoreResult {
  // Safety Score
  const nutriscore = getNutriScore(product.nutriscore_grade);
  const nova = getNovaScore(product.nova_group);

  const { flagged, cleanCount, total } = analyzeIngredients(
    product.ingredients_text,
    product.additives_tags
  );
  const additivePenalty = flagged.reduce((sum, f) => sum + f.penalty, 0);

  const rawSafety =
    nutriscore * 0.4 + nova * 0.3 + Math.max(0, 100 - additivePenalty) * 0.3;
  const safety = Math.round(Math.max(0, Math.min(100, rawSafety)));

  // Ingredients Score
  const ingredientRaw = calculateIngredientsScore(flagged, total);
  const ingredients = Math.round(ingredientRaw);

  // Completeness Score
  const completeness = calculateCompleteness(product);

  // Overall Score
  const overall = Math.round(
    safety * 0.5 + ingredients * 0.3 + completeness * 0.2
  );

  return {
    overall,
    safety,
    ingredients,
    completeness,
    breakdown: {
      nutriscore,
      nova,
      additivePenalty,
      flaggedIngredients: flagged,
      totalIngredients: total,
      cleanCount,
    },
  };
}

/**
 * Get a color class based on score
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-yellow-500";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
}

/**
 * Get a label for the score
 */
export function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Great";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Poor";
  return "Avoid";
}

/**
 * Get a background color class for badge
 */
export function getScoreBadgeColor(score: number): string {
  if (score >= 80) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
  if (score >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  if (score >= 40) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
}
