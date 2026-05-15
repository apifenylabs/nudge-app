/**
 * Shared in-memory tip and vote store.
 * In production, replace with a database (Supabase, Vercel KV, etc.)
 * For this project, persists per server process lifetime.
 */

export interface Tip {
  id: string;
  stationId: string;
  author: string;
  text: string;
  category: 'family' | 'luxury' | 'wellness' | 'charging' | 'general';
  rating?: number;
  createdAt: string;
  helpful: number;
}

// Global store to survive module reloads
const globalForStore = globalThis as unknown as { __tipStoreData: Tip[] };
if (!globalForStore.__tipStoreData) {
  globalForStore.__tipStoreData = [
    {
      id: 'seed-1',
      stationId: 'bangkok-1',
      author: 'Sarah L.',
      text: 'Great for families — there\'s a playground right next to the charging area. Grab coffee at Starbucks while the kids play.',
      category: 'family',
      rating: 5,
      createdAt: '2025-12-15T10:30:00Z',
      helpful: 12,
    },
    {
      id: 'seed-2',
      stationId: 'bangkok-2',
      author: 'Mike C.',
      text: 'Very reliable 250kW charger. The mall has a food court with kid-friendly options on the 3rd floor.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-11-20T08:15:00Z',
      helpful: 8,
    },
    {
      id: 'seed-3',
      stationId: 'singapore-1',
      author: 'Amanda K.',
      text: 'Luxury experience. The Conrad hotel valet parks and charges your EV. Perfect for a weekend getaway.',
      category: 'luxury',
      rating: 5,
      createdAt: '2025-10-05T14:00:00Z',
      helpful: 15,
    },
    {
      id: 'seed-4',
      stationId: 'kl-1',
      author: 'David T.',
      text: 'Easy to find, well-lit at night. Has a 7-Eleven next door for snacks. Toilets are clean.',
      category: 'wellness',
      rating: 4,
      createdAt: '2025-09-28T16:45:00Z',
      helpful: 6,
    },
    {
      id: 'seed-5',
      stationId: 'chiang-mai-1',
      author: 'Emily R.',
      text: 'Beautiful mountain drive to get here. Charger works perfectly. Try the nearby café for organic coffee.',
      category: 'wellness',
      rating: 5,
      createdAt: '2025-08-12T09:20:00Z',
      helpful: 22,
    },
  ];
}

export function getTips(): Tip[] {
  return globalForStore.__tipStoreData;
}

export function getTipsByStation(stationId: string): Tip[] {
  return globalForStore.__tipStoreData
    .filter(t => t.stationId === stationId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addTip(tip: Omit<Tip, 'id' | 'createdAt' | 'helpful'>): Tip {
  const newTip: Tip = {
    ...tip,
    id: `tip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    helpful: 0,
  };
  globalForStore.__tipStoreData.push(newTip);
  return newTip;
}

// In-memory vote tracking (per server restart)
const globalForVotes = globalThis as unknown as { __tipVoteStore: Map<string, number> };
if (!globalForVotes.__tipVoteStore) {
  globalForVotes.__tipVoteStore = new Map();
}

export function recordVote(voteKey: string): number {
  const current = globalForVotes.__tipVoteStore.get(voteKey) || 0;
  globalForVotes.__tipVoteStore.set(voteKey, current + 1);
  return current + 1;
}

export function getTipStats(tipId: string): { totalVotes: number } {
  // Aggregate all votes for this tip
  let total = 0;
  for (const [key, count] of globalForVotes.__tipVoteStore.entries()) {
    if (key.endsWith(`:${tipId}`)) {
      total += count;
    }
  }
  return { totalVotes: total };
}
