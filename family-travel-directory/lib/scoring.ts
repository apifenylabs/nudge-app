/**
 * Destination Scoring Algorithm
 * Computes a composite score from safety + popularity + family-friendliness
 * All scores are normalized to 0-100 scale
 * Skill Economy: <200 lines
 */

export interface ScoreInput {
  safetyRating: number;       // 1-5
  popularity: number;         // 0-100
  ageRange: string;           // e.g. "0-3", "4-9", "10+", "2-10"
  tipsAndTricks: number;      // count of parent tips
  galleryLength: number;      // number of gallery images
  reviewRating: number | null; // avg review rating (1-5), null if none
  reviewCount: number;        // number of reviews
  amenities: number;          // count of amenities
}

export interface ScoreResult {
  overall: number;            // 0-100 composite
  safety: number;             // 0-100 normalized
  popularity: number;         // 0-100 as-is
  familyFriendliness: number; // 0-100 derived
  reviewScore: number;        // 0-100 from reviews
  confidence: number;         // 0-1 — how much data we have
}

const WEIGHTS = {
  safety: 0.35,
  popularity: 0.25,
  familyFriendliness: 0.25,
  reviewScore: 0.15,
};

/**
 * Calculate how family-friendly a destination is based on:
 * - Age range coverage (wider is more flexible)
 * - Number of tips from parents
 * - Available amenities
 */
function calcFamilyFriendliness(input: ScoreInput): number {
  let score = 0;

  // Age range coverage: parse ranges like "0-3", "4-9", "10+", "2-10"
  const parts = input.ageRange.split(/[-–&,]/).map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  if (parts.length >= 2) {
    const minAge = Math.min(...parts);
    const maxAge = Math.max(...parts);
    const coverage = maxAge - minAge;
    // Wider age range = more family-friendly, up to 18 years
    score += Math.min(coverage / 18, 1) * 40;
  } else if (parts.length === 1) {
    // Single age or "10+"
    score += 20;
  } else {
    score += 10;
  }

  // Tips contribution (max 30 points)
  score += Math.min(input.tipsAndTricks / 10, 1) * 30;

  // Amenities contribution (max 20 points)
  score += Math.min(input.amenities / 8, 1) * 20;

  // Gallery contribution (max 10 points)
  score += Math.min(input.galleryLength / 10, 1) * 10;

  return Math.round(score);
}

/**
 * Calculate review-derived score
 */
function calcReviewScore(rating: number | null, count: number): number {
  if (!rating || count === 0) return 50; // Neutral default
  // Normalize 1-5 → 0-100, boosted by number of reviews (confidence)
  const base = ((rating - 1) / 4) * 100;
  const confidenceBoost = Math.min(count / 20, 1) * 10;
  return Math.round(Math.min(base + confidenceBoost, 100));
}

/**
 * Compute the composite destination score
 */
export function computeScore(input: ScoreInput): ScoreResult {
  const safety = Math.round((input.safetyRating / 5) * 100);
  const popularity = input.popularity;
  const familyFriendliness = calcFamilyFriendliness(input);
  const reviewScore = calcReviewScore(input.reviewRating, input.reviewCount);

  const overall = Math.round(
    safety * WEIGHTS.safety +
    popularity * WEIGHTS.popularity +
    familyFriendliness * WEIGHTS.familyFriendliness +
    reviewScore * WEIGHTS.reviewScore
  );

  // Confidence: how much data informed the score
  const dataPoints = [
    input.safetyRating > 0,
    input.popularity > 0,
    input.tipsAndTricks > 0,
    input.amenities > 0,
    input.galleryLength > 0,
    input.reviewCount > 0,
  ].filter(Boolean).length;
  const confidence = Math.round((dataPoints / 6) * 10) / 10;

  return { overall, safety, popularity, familyFriendliness, reviewScore, confidence };
}

/**
 * Generate a label for the score tier
 */
export function scoreTier(overall: number): { label: string; color: string } {
  if (overall >= 85) return { label: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  if (overall >= 70) return { label: 'Great', color: 'text-sky-600 bg-sky-50 border-sky-200' };
  if (overall >= 55) return { label: 'Good', color: 'text-amber-600 bg-amber-50 border-amber-200' };
  return { label: 'Average', color: 'text-gray-600 bg-gray-50 border-gray-200' };
}

/**
 * Simple scoring: normalized 0-100
 * safetyRating * 0.4 + popularity * 0.3 + tipsCount * 0.2 + (has parentStory ? 0.1 : 0)
 */
export function computeSimpleScore(
  safetyRating: number,
  popularity: number,
  tipsCount: number,
  hasParentStory: boolean
): number {
  const safetyPart = (safetyRating / 5) * 40;       // 0-40
  const popPart = (popularity / 100) * 30;            // 0-30
  const tipPart = Math.min(tipsCount / 10, 1) * 20;   // 0-20
  const storyPart = hasParentStory ? 10 : 0;           // 0-10
  return Math.round(safetyPart + popPart + tipPart + storyPart);
}
