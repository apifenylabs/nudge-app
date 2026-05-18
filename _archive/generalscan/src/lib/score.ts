import type { ProductScores, ScoreBreakdown, OpenFoodFactsProduct } from "./types";

/**
 * Scoring algorithm for GeneralScan
 * 
 * All scores are 0-100 where 100 = best possible.
 */

export function calculateSustainability(product: OpenFoodFactsProduct["product"]): {
  score: number;
  breakdown: ScoreBreakdown[];
  grade?: string;
} {
  const prod = product;
  const breakdown: ScoreBreakdown[] = [];
  let total = 0;

  // 1. Eco-Score (0-40 points)
  const ecoscoreMap: Record<string, number> = { a: 40, b: 32, c: 24, d: 12, e: 0 };
  const ecoscoreGrade = prod.ecoscore_grade?.toLowerCase() ?? "";
  const ecoscorePoints = ecoscoreMap[ecoscoreGrade] ?? 10; // default if missing
  breakdown.push({
    factor: "Eco-Score",
    score: ecoscorePoints,
    max: 40,
    label: prod.ecoscore_grade?.toUpperCase(),
  });
  total += ecoscorePoints;

  // 2. Packaging (0-20 points)
  let packagingScore = 10; // baseline
  const packagingTags = prod.packaging_tags ?? [];
  const hasRecyclable = packagingTags.some(
    (t) => t.includes("recyclable") || t.includes("recycle")
  );
  const hasPlastic = packagingTags.some((t) => t.includes("plastic"));
  const hasGlass = packagingTags.some((t) => t.includes("glass"));
  const hasCardboard = packagingTags.some((t) => t.includes("cardboard") || t.includes("paper"));

  if (hasGlass || hasCardboard) packagingScore = 15;
  if (hasRecyclable && (hasGlass || hasCardboard)) packagingScore = 20;
  if (hasPlastic && !hasRecyclable) packagingScore = 5;

  breakdown.push({ factor: "Packaging Material", score: packagingScore, max: 20 });
  total += packagingScore;

  // 3. Certifications (0-20 points)
  const labelTags = prod.labels_tags ?? [];
  const hasOrganic = labelTags.some((l) => l.includes("organic") || l.includes("bio"));
  const hasFairTrade = labelTags.some((l) => l.includes("fair-trade") || l.includes("fairtrade"));
  const hasLocal = labelTags.some((l) => l.includes("local"));
  const hasRainforest = labelTags.some((l) => l.includes("rainforest"));

  let certScore = 0;
  if (hasOrganic) certScore += 8;
  if (hasFairTrade) certScore += 6;
  if (hasRainforest) certScore += 4;
  if (hasLocal) certScore += 2;

  breakdown.push({ factor: "Certifications", score: certScore, max: 20 });
  total += certScore;

  // 4. Origins / Local Sourcing (0-20 points)
  const originTags = prod.origins_tags ?? [];
  const originScore = originTags.length > 0 ? Math.min(originTags.length * 5, 20) : 5; // default if unknown
  breakdown.push({ factor: "Local Sourcing", score: originScore, max: 20 });
  total += originScore;

  const grade = ecoscoreGrade || undefined;

  return { score: Math.min(100, total), breakdown, grade };
}

export function calculateHealth(product: OpenFoodFactsProduct["product"]): {
  score: number;
  breakdown: ScoreBreakdown[];
  grade?: string;
} {
  const prod = product;
  const breakdown: ScoreBreakdown[] = [];
  let total = 0;

  // 1. Nutri-Score (0-50 points)
  const nutriscoreMap: Record<string, number> = { a: 50, b: 40, c: 28, d: 14, e: 0 };
  const nutriscoreGrade = prod.nutriscore_grade?.toLowerCase() ?? "";
  const nutriscorePoints = nutriscoreMap[nutriscoreGrade] ?? 15;
  breakdown.push({
    factor: "Nutri-Score",
    score: nutriscorePoints,
    max: 50,
    label: prod.nutriscore_grade?.toUpperCase(),
  });
  total += nutriscorePoints;

  // 2. Ingredient Quality (0-25 points)
  const ingredients = prod.ingredients ?? [];
  const ingredientsText = prod.ingredients_text ?? "";
  const additiveTags = prod.additive_tags ?? [];

  let ingredientScore = 15; // baseline
  // Fewer ingredients = less processed
  if (ingredients.length > 0 && ingredients.length <= 5) ingredientScore = 25;
  else if (ingredients.length <= 10) ingredientScore = 20;
  else if (ingredients.length <= 20) ingredientScore = 15;
  else ingredientScore = 10;

  // Penalty for additives
  const additivePenalty = additiveTags.length * 3;
  ingredientScore = Math.max(0, ingredientScore - additivePenalty);

  breakdown.push({ factor: "Ingredient Quality", score: ingredientScore, max: 25 });
  total += ingredientScore;

  // 3. Allergens (0-10 points)
  const allergenTags = prod.allergens_tags ?? [];
  const allergenScore = allergenTags.length === 0 ? 10 : Math.max(0, 10 - allergenTags.length * 2);
  breakdown.push({ factor: "Allergen Clarity", score: allergenScore, max: 10 });
  total += allergenScore;

  // 4. Certifications (0-15 points)
  const labelTags = prod.labels_tags ?? [];
  let healthCertScore = 0;
  if (labelTags.some((l) => l.includes("organic") || l.includes("bio"))) healthCertScore += 8;
  if (labelTags.some((l) => l.includes("no-gmo") || l.includes("non-gmo"))) healthCertScore += 4;
  if (labelTags.some((l) => l.includes("vegan"))) healthCertScore += 3;

  breakdown.push({ factor: "Health Certifications", score: healthCertScore, max: 15 });
  total += healthCertScore;

  const grade = nutriscoreGrade || undefined;

  return { score: Math.min(100, total), breakdown, grade };
}

export function calculateValue(product: OpenFoodFactsProduct["product"]): {
  score: number;
  breakdown: ScoreBreakdown[];
} {
  const prod = product;
  const breakdown: ScoreBreakdown[] = [];
  let total = 0;

  // 1. Brand Recognition (0-30 points)
  const brandScore = prod.brands ? 25 : 0;
  breakdown.push({ factor: "Brand Known", score: brandScore, max: 30 });
  total += brandScore;

  // 2. Quantity Info (0-15 points)
  const quantityScore = prod.quantity ? 15 : 0;
  breakdown.push({ factor: "Quantity Specified", score: quantityScore, max: 15 });
  total += quantityScore;

  // 3. Nutrition Quality (0-35 points)
  const nutriscoreMap: Record<string, number> = { a: 35, b: 28, c: 20, d: 12, e: 5 };
  const nutriscoreGrade = prod.nutriscore_grade?.toLowerCase() ?? "";
  const nutritionScore = nutriscoreMap[nutriscoreGrade] ?? 10;
  breakdown.push({ factor: "Nutrition Quality", score: nutritionScore, max: 35 });
  total += nutritionScore;

  // 4. Product Completeness (0-20 points)
  let completeness = 0;
  if (prod.product_name) completeness += 5;
  if (prod.image_url) completeness += 5;
  if (prod.ingredients_text) completeness += 5;
  if (prod.categories) completeness += 5;
  breakdown.push({ factor: "Product Completeness", score: completeness, max: 20 });
  total += completeness;

  return { score: Math.min(100, total), breakdown };
}

export function calculateOverall(
  sustainabilityScore: number,
  healthScore: number,
  valueScore: number
): number {
  // Weights: Health 45%, Sustainability 25%, Value 30%
  return Math.round(sustainabilityScore * 0.25 + healthScore * 0.45 + valueScore * 0.3);
}

export function calculateAllScores(
  product: OpenFoodFactsProduct["product"]
): ProductScores {
  const sustainability = calculateSustainability(product);
  const health = calculateHealth(product);
  const value = calculateValue(product);
  const overallScore = calculateOverall(sustainability.score, health.score, value.score);

  return {
    sustainability: {
      score: sustainability.score,
      breakdown: sustainability.breakdown,
      grade: sustainability.grade,
    },
    health: {
      score: health.score,
      breakdown: health.breakdown,
      grade: health.grade,
    },
    value: {
      score: value.score,
      breakdown: value.breakdown,
    },
    overall: {
      score: overallScore,
      breakdown: {
        sustainability: sustainability.score,
        health: health.score,
        value: value.score,
      },
    },
  };
}
