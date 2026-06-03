import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// ─── Types ──────────────────────────────────────────────────────
interface ReviewRecord {
  id: string;
  destination_id: string;
  author_name: string;
  author_badge: string;
  kids_ages: string[];
  overall_rating: number;
  safety_rating: number | null;
  fun_rating: number | null;
  value_rating: number | null;
  food_rating: number | null;
  title: string;
  content: string;
  visit_date: string | null;
  would_recommend: boolean;
  tips: string;
  helpful_count: number;
  not_helpful_count: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

// In-memory store fallback (matches reviews route)
const memoryStore: ReviewRecord[] = [
  {
    id: 'demo-1', destination_id: 'tokyo-001', author_name: 'Sarah, mom of 2',
    author_badge: 'verified_parent', kids_ages: ['4', '7'],
    overall_rating: 5, safety_rating: 5, fun_rating: 5, value_rating: 4, food_rating: 4,
    title: 'Absolutely magical for small kids',
    content: 'We spent two days here and our kids aged 4 and 7 were in heaven.',
    visit_date: '2025-09-15', would_recommend: true, tips: 'Arrive 30 minutes early.',
    helpful_count: 12, not_helpful_count: 1, status: 'approved',
    created_at: '2025-10-01T08:00:00Z', updated_at: '2025-10-01T08:00:00Z', user_id: null,
  },
  {
    id: 'demo-2', destination_id: 'tokyo-001', author_name: 'Mike, dad of 3',
    author_badge: 'parent', kids_ages: ['2', '5', '9'],
    overall_rating: 4, safety_rating: 5, fun_rating: 4, value_rating: 3, food_rating: 4,
    title: 'Great but expensive for a big family',
    content: 'The kids loved it, no question. Safety standards are top notch.',
    visit_date: '2025-08-20', would_recommend: true, tips: 'Buy multi-day pass.',
    helpful_count: 8, not_helpful_count: 0, status: 'approved',
    created_at: '2025-10-05T14:30:00Z', updated_at: '2025-10-05T14:30:00Z', user_id: null,
  },
  {
    id: 'demo-3', destination_id: 'tokyo-001', author_name: 'Emma, mom of 1',
    author_badge: 'visitor', kids_ages: ['3'],
    overall_rating: 3, safety_rating: 4, fun_rating: 3, value_rating: 2, food_rating: 3,
    title: 'Good but our toddler was overwhelmed',
    content: 'Beautiful park and very clean, but our 3-year-old got overwhelmed.',
    visit_date: '2025-07-10', would_recommend: false, tips: 'Use Baby Care Center.',
    helpful_count: 5, not_helpful_count: 0, status: 'approved',
    created_at: '2025-10-10T11:00:00Z', updated_at: '2025-10-10T11:00:00Z', user_id: null,
  },
  {
    id: 'demo-pending-1', destination_id: 'tokyo-001', author_name: 'Jenny, mom of 2',
    author_badge: 'parent', kids_ages: ['6', '10'],
    overall_rating: 5, safety_rating: 5, fun_rating: 5, value_rating: 4, food_rating: 5,
    title: 'Best family day ever!',
    content: 'Our girls aged 6 and 10 both had the time of their lives.',
    visit_date: '2025-11-01', would_recommend: true, tips: 'Download the app.',
    helpful_count: 0, not_helpful_count: 0, status: 'pending',
    created_at: '2025-11-15T09:00:00Z', updated_at: '2025-11-15T09:00:00Z', user_id: null,
  },
];

// Track user votes to prevent double-voting (in-memory)
const userVotes = new Map<string, { helpful: boolean; timestamp: number }>();

function getSupabase(request: Request) {
  const cookieStore = request.headers.get('cookie') || '';
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.split(';').map(c => {
            const [name, ...rest] = c.trim().split('=')
            return { name, value: rest.join('=') }
          }).filter(c => c.name)
        },
        setAll() { /* no-op */ },
      },
    }
  )
}

/**
 * POST /api/reviews/[id]/helpful?vote=true | false
 * Toggle helpful/unhelpful vote on a review
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const vote = request.nextUrl.searchParams.get('vote') !== 'false'; // default helpful

  try {
    // Try Supabase first
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const isConfigured = !!(supabaseUrl && supabaseKey);

    if (isConfigured) {
      // Get user
      const supabase = getSupabase(request);
      const { data: { user } } = await supabase.auth.getUser();

      // Update the review helpful/unhelpful count in Supabase
      const column = vote ? 'helpful_count' : 'not_helpful_count';
      const { data, error } = await supabase
        .from('destination_reviews')
        .select('helpful_count, not_helpful_count')
        .eq('id', id)
        .single();

      if (error) {
        // Fallback to in-memory
        return handleMemoryVote(id, vote);
      }

      const newCount = (data?.[column] || 0) + 1;
      const { error: updateError } = await supabase
        .from('destination_reviews')
        .update({ [column]: newCount, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (updateError) throw updateError;

      return NextResponse.json({
        success: true,
        review_id: id,
        helpful_count: column === 'helpful_count' ? newCount : data?.helpful_count || 0,
        not_helpful_count: column === 'not_helpful_count' ? newCount : data?.not_helpful_count || 0,
        user_vote: vote,
      });
    }

    // Fallback to in-memory
    return handleMemoryVote(id, vote);
  } catch (err) {
    console.error('Error voting on review:', err);
    // Safe fallback
    return handleMemoryVote(id, vote);
  }
}

function handleMemoryVote(id: string, vote: boolean) {
  // Check for double vote
  const existing = userVotes.get(id);
  if (existing) {
    return NextResponse.json({
      success: false,
      error: 'You have already voted on this review',
      existing_vote: existing.helpful,
    }, { status: 409 });
  }

  const idx = memoryStore.findIndex(r => r.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  // Record the vote
  userVotes.set(id, { helpful: vote, timestamp: Date.now() });

  // Update counts
  if (vote) {
    memoryStore[idx].helpful_count = (memoryStore[idx].helpful_count || 0) + 1;
  } else {
    memoryStore[idx].not_helpful_count = (memoryStore[idx].not_helpful_count || 0) + 1;
  }

  return NextResponse.json({
    success: true,
    review_id: id,
    helpful_count: memoryStore[idx].helpful_count,
    not_helpful_count: memoryStore[idx].not_helpful_count,
    user_vote: vote,
  });
}

/**
 * GET /api/reviews/[id]/helpful — get current vote counts
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const idx = memoryStore.findIndex(r => r.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  return NextResponse.json({
    review_id: id,
    helpful_count: memoryStore[idx].helpful_count || 0,
    not_helpful_count: memoryStore[idx].not_helpful_count || 0,
  });
}
