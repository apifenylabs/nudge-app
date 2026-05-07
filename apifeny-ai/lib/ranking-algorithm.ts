// ═══════════════════════════════════════════════════════════════════════════════
// APIFENY.AI — Cosme-Style Ranking Algorithm
// ═══════════════════════════════════════════════════════════════════════════════
//
// Computes a 0-10 ranking score using five weighted factors:
//   1. CommunityRating × review confidence (log-based)  — 35%
//   2. Trending velocity × recency decay                 — 20%
//   3. Manual editorial Asia score                       — 20%
//   4. Editor pick bonus                                 — 15%
//   5. Saves/bookmarks count                             — 10%
//
// All weights sum to 100%.
// ═══════════════════════════════════════════════════════════════════════════════

import { Tool } from './types';

// ─── Interfaces ──────────────────────────────────────────────────────────────

/** Per-tool engagement data (hardcoded for now, replace with DB queries later) */
export interface ToolEngagement {
  /** Number of reviews / ratings submitted in the last 7 days */
  recentReviews: number;
  /** Total saves/bookmarks */
  totalSaves: number;
  /** Is this an editor's pick? */
  editorPick: boolean;
  /** Number of saves added in the last 7 days (for velocity) */
  recentSaves: number;
  /** Number of new reviews in the last 7 days */
  recentRatings: number;
}

/** Result of the ranking algorithm for a single tool */
export interface RankedTool {
  tool: Tool;
  rank: number;
  score: number;
  breakdown: {
    communityScore: number;   // 0-10
    trendingScore: number;     // 0-10
    asiaScore: number;        // 0-10
    editorBonus: number;      // 0-10
    savesScore: number;       // 0-10
    final: number;            // 0-10 weighted
  };
}

// ─── Default Engagement Data ─────────────────────────────────────────────────

/**
 * Hardcoded engagement data for the seed dataset.
 * In production, replace this with a Supabase/DB query keyed by tool.id.
 *
 * For tools not listed here, sensible defaults are returned by getEngagement().
 */
const DEFAULT_ENGAGEMENTS: Record<string, Partial<ToolEngagement>> = {
  '1':  { recentReviews: 320, totalSaves: 45200, editorPick: true,  recentSaves: 1800, recentRatings: 85 },   // ChatGPT
  '2':  { recentReviews: 210, totalSaves: 32100, editorPick: true,  recentSaves: 1400, recentRatings: 62 },   // Claude
  '3':  { recentReviews: 180, totalSaves: 28100, editorPick: false, recentSaves: 2100, recentRatings: 93 },   // Gemini
  '4':  { recentReviews: 140, totalSaves: 19500, editorPick: false, recentSaves: 800,  recentRatings: 41 },   // Copilot
  '5':  { recentReviews: 110, totalSaves: 15200, editorPick: false, recentSaves: 450,  recentRatings: 28 },   // Midjourney
  '6':  { recentReviews: 160, totalSaves: 22100, editorPick: true,  recentSaves: 1300, recentRatings: 67 },   // Perplexity
  '7':  { recentReviews: 195, totalSaves: 28100, editorPick: true,  recentSaves: 2200, recentRatings: 104 },  // Cursor
  '8':  { recentReviews: 75,  totalSaves: 12300, editorPick: false, recentSaves: 300,  recentRatings: 22 },   // Notion AI
  '9':  { recentReviews: 85,  totalSaves: 8900,  editorPick: false, recentSaves: 650,  recentRatings: 38 },   // Devin
  '10': { recentReviews: 250, totalSaves: 18400, editorPick: true,  recentSaves: 1100, recentRatings: 56 },   // Canva AI
  '15': { recentReviews: 170, totalSaves: 24100, editorPick: false, recentSaves: 900,  recentRatings: 48 },   // Hugging Face
  '16': { recentReviews: 130, totalSaves: 17200, editorPick: false, recentSaves: 1200, recentRatings: 72 },   // LangChain
  '14': { recentReviews: 60,  totalSaves: 8600,  editorPick: false, recentSaves: 350,  recentRatings: 19 },   // Synthesia
  '20': { recentReviews: 50,  totalSaves: 5800,  editorPick: false, recentSaves: 200,  recentRatings: 14 },   // Intercom
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Get the log-based review confidence multiplier: log10(reviews+1) / log10(maxReviews+1) */
function reviewConfidence(totalRatings: number, maxRatings: number): number {
  if (totalRatings <= 0 || maxRatings <= 0) return 0;
  return Math.log10(totalRatings + 1) / Math.log10(maxRatings + 1);
}

/** Recency decay factor: tools created longer ago get slightly penalised. */
function recencyDecay(createdAt: string): number {
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  const daysSinceCreation = (now - created) / (1000 * 60 * 60 * 24);
  // Linear decay: 1.0 at 0 days → 0.7 at 365 days → 0.5 at 730 days
  return Math.max(0.5, 1.0 - daysSinceCreation * 0.0007);
}

/** Trending velocity score (0-10) based on recent engagement per day */
function trendingVelocity(recentReviews: number, recentSaves: number, recentRatings: number): number {
  // Normalise: each metric capped and weighted equally
  const cappedReviews = Math.min(recentReviews, 500) / 50;       // max 10
  const cappedSaves = Math.min(recentSaves, 2000) / 200;          // max 10
  const cappedRatings = Math.min(recentRatings, 100) / 10;        // max 10

  return (cappedReviews * 0.4 + cappedSaves * 0.3 + cappedRatings * 0.3);
}

/** Get engagement data for a tool (hardcoded fallback) */
function getEngagement(toolId: string): ToolEngagement {
  const defaults: ToolEngagement = {
    recentReviews: 30,
    totalSaves: 5000,
    editorPick: false,
    recentSaves: 100,
    recentRatings: 10,
  };
  const data = DEFAULT_ENGAGEMENTS[toolId];
  if (!data) return defaults;
  return { ...defaults, ...data };
}

// ─── Main Algorithm ──────────────────────────────────────────────────────────

/**
 * Compute the Cosme-style ranking score (0-10) for a single tool.
 *
 * Weights:
 *   CommunityRating × review confidence  — 35%
 *   Trending velocity × recency decay     — 20%
 *   Asia score                            — 20%
 *   Editor pick bonus                    — 15%
 *   Saves count                          — 10%
 */
export function computeToolScore(
  tool: Tool,
  engagement?: ToolEngagement,
  maxRatings?: number
): number {
  const eng = engagement ?? getEngagement(tool.id);
  const maxR = maxRatings ?? 28450; // ChatGPT has the most ratings

  // 1. CommunityRating × review confidence (log-based)
  //    Normalise avg_rating (out of 5) to 0-10 scale
  const communityBase = (tool.avg_rating / 5) * 10;
  const confidence = reviewConfidence(tool.total_ratings, maxR);
  const communityScore = communityBase * confidence;

  // 2. Trending velocity × recency decay
  const rawVelocity = trendingVelocity(
    eng.recentReviews,
    eng.recentSaves,
    eng.recentRatings
  );
  const decay = recencyDecay(tool.created_at);
  const trendingScore = rawVelocity * decay;

  // 3. Asia score (already 0-10 from data)
  const asiaScore = tool.asia_score;

  // 4. Editor pick bonus (0 if not, 8 if editor's pick)
  const editorBonus = eng.editorPick ? 8 : 0;

  // 5. Saves count (0-10, normalised against max saves in dataset)
  const maxSaves = 45200; // ChatGPT
  const savesScore = (eng.totalSaves / maxSaves) * 10;

  // ── Weighted sum ──
  const finalScore =
    communityScore * 0.35 +
    trendingScore * 0.20 +
    asiaScore * 0.20 +
    editorBonus * 0.15 +
    savesScore * 0.10;

  // Clamp to 0-10
  return Math.round(Math.min(10, Math.max(0, finalScore)) * 100) / 100;
}

/**
 * Compute detailed scores for all published tools and return them sorted
 * by ranking (highest score first).
 */
export function computeAllScores(tools: Tool[]): RankedTool[] {
  // Find max ratings across all tools for normalisation
  const maxRatings = Math.max(...tools.map((t) => t.total_ratings), 1);

  const ranked: Omit<RankedTool, 'rank'>[] = tools
    .filter((t) => t.is_published)
    .map((tool) => {
      const eng = getEngagement(tool.id);

      const maxR = maxRatings;
      const communityBase = (tool.avg_rating / 5) * 10;
      const confidence = reviewConfidence(tool.total_ratings, maxR);
      const communityScore = Math.round(communityBase * confidence * 100) / 100;

      const rawVelocity = trendingVelocity(
        eng.recentReviews,
        eng.recentSaves,
        eng.recentRatings
      );
      const decay = recencyDecay(tool.created_at);
      const trendingScore = Math.round(rawVelocity * decay * 100) / 100;

      const asiaScore = tool.asia_score;

      const editorBonus = eng.editorPick ? 8 : 0;

      const maxSaves = Math.max(...tools.map((t) => t.saves_count), 1);
      const savesScore = Math.round((eng.totalSaves / maxSaves) * 10 * 100) / 100;

      const finalScore =
        communityScore * 0.35 +
        trendingScore * 0.20 +
        asiaScore * 0.20 +
        editorBonus * 0.15 +
        savesScore * 0.10;

      return {
        tool,
        score: Math.round(Math.min(10, Math.max(0, finalScore)) * 100) / 100,
        breakdown: {
          communityScore,
          trendingScore,
          asiaScore,
          editorBonus,
          savesScore,
          final: Math.round(Math.min(10, Math.max(0, finalScore)) * 100) / 100,
        },
      };
    })
    .sort((a, b) => b.score - a.score);

  // Assign ranks (ties get the same rank)
  return ranked.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
}

/**
 * Get top N ranked tools.
 */
export function getTopRanked(tools: Tool[], count: number = 8): RankedTool[] {
  return computeAllScores(tools).slice(0, count);
}

// ─── Convenience Exports ─────────────────────────────────────────────────────

/** Get the composite "momentum" score for a tool (used in Must-Use). */
export function getMomentumScore(tool: Tool): number {
  const eng = getEngagement(tool.id);
  return trendingVelocity(eng.recentReviews, eng.recentSaves, eng.recentRatings);
}
