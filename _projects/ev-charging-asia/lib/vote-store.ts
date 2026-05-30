/**
 * Vote Store — persistent vote storage using file system (/tmp on Vercel serverless).
 * Falls back to in-memory if file writes fail.
 * 
 * Votes survive cold starts and redeploys during the same instance lifecycle.
 * For permanent persistence, pair with Supabase or KV store.
 */

import fs from 'fs';
import path from 'path';

export interface VoteRecord {
  routeId: string;
  ip: string;
  rating: number;
  votedAt: string;
}

export interface RouteScore {
  totalVotes: number;
  averageRating: number;
  starDistribution: number[];
}

const STORE_DIR = process.env.VOTE_STORE_DIR || '/tmp/evca-votes';
const STORE_FILE = path.join(STORE_DIR, 'votes.json');

// In-memory cache
let votesCache: VoteRecord[] | null = null;
let routeScoresCache: Record<string, RouteScore> | null = null;

function ensureDir(): void {
  try {
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }
  } catch {
    // Silently fail — will fall back to memory
  }
}

function loadFromDisk(): VoteRecord[] {
  ensureDir();
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // Corrupted or missing file
  }
  return [];
}

function saveToDisk(votes: VoteRecord[]): void {
  ensureDir();
  try {
    // Write atomically using temp file
    const tmpFile = STORE_FILE + '.tmp';
    fs.writeFileSync(tmpFile, JSON.stringify(votes), 'utf-8');
    fs.renameSync(tmpFile, STORE_FILE);
  } catch {
    // File system not available (serverless cold start without /tmp)
  }
}

function getVotes(): VoteRecord[] {
  if (votesCache === null) {
    votesCache = loadFromDisk();
  }
  return votesCache;
}

function recalculateScores(votes: VoteRecord[]): Record<string, RouteScore> {
  const scores: Record<string, RouteScore> = {};

  for (const vote of votes) {
    if (!scores[vote.routeId]) {
      scores[vote.routeId] = { totalVotes: 0, averageRating: 0, starDistribution: [0, 0, 0, 0, 0] };
    }
    scores[vote.routeId].totalVotes++;
    scores[vote.routeId].starDistribution[vote.rating - 1]++;
  }

  for (const [id, score] of Object.entries(scores)) {
    const sum = score.starDistribution.reduce((a, c, i) => a + c * (i + 1), 0);
    score.averageRating = Math.round((sum / score.totalVotes) * 10) / 10;
  }

  return scores;
}

function refreshScores(): void {
  routeScoresCache = recalculateScores(getVotes());
}

export function getScoresCache(): Record<string, RouteScore> {
  if (routeScoresCache === null) {
    refreshScores();
  }
  return routeScoresCache || {};
}

export function addOrUpdateVote(routeId: string, ip: string, rating: number): { updated: boolean } {
  const votes = getVotes();
  const existingIndex = votes.findIndex(v => v.routeId === routeId && v.ip === ip);
  const updated = existingIndex >= 0;

  if (existingIndex >= 0) {
    votes[existingIndex] = { routeId, ip, rating, votedAt: new Date().toISOString() };
  } else {
    votes.push({ routeId, ip, rating, votedAt: new Date().toISOString() });
  }

  votesCache = votes;
  saveToDisk(votes);
  refreshScores();

  return { updated };
}

export function getVotesForRoute(routeId: string): { score: RouteScore; userVote: number; ip: string } | null {
  const scores = getScoresCache();
  const score = scores[routeId] || { totalVotes: 0, averageRating: 0, starDistribution: [0, 0, 0, 0, 0] };
  return { score, userVote: 0, ip: '' };
}

export function getAllScores(): Array<{ routeId: string } & RouteScore> {
  const scores = getScoresCache();
  return Object.entries(scores)
    .map(([routeId, score]) => ({ routeId, ...score }))
    .sort((a, b) => b.totalVotes - a.totalVotes || b.averageRating - a.averageRating);
}
