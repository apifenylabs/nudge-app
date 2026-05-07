import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ─── Types ──────────────────────────────────────────────────────

interface ReviewInput {
  destination_id: string;
  author_name: string;
  author_badge?: 'verified_parent' | 'parent' | 'visitor';
  kids_ages?: string[];
  overall_rating: number;
  safety_rating?: number | null;
  fun_rating?: number | null;
  value_rating?: number | null;
  food_rating?: number | null;
  title: string;
  content: string;
  visit_date?: string | null;
  would_recommend?: boolean;
  tips?: string;
}

interface ReviewRecord extends ReviewInput {
  id: string;
  helpful_count: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

// ─── Supabase setup ────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// ─── In-memory fallback (when Supabase is not set up) ──────────

const memoryStore: ReviewRecord[] = [
  {
    id: 'demo-1',
    destination_id: 'tokyo-001',
    author_name: 'Sarah, mom of 2',
    author_badge: 'verified_parent',
    kids_ages: ['4', '7'],
    overall_rating: 5,
    safety_rating: 5,
    fun_rating: 5,
    value_rating: 4,
    food_rating: 4,
    title: 'Absolutely magical for small kids',
    content: 'We spent two days here and our kids aged 4 and 7 were in heaven. The staff are incredibly attentive to families, the park is spotless, and the baby care centers are lifesavers. We brought our own snacks which saved a ton.',
    visit_date: '2025-09-15',
    would_recommend: true,
    tips: 'Arrive 30 minutes before opening. Head straight to the back of the park first — everyone rushes to the front.',
    helpful_count: 12,
    status: 'approved',
    created_at: '2025-10-01T08:00:00Z',
    updated_at: '2025-10-01T08:00:00Z',
    user_id: null,
  },
  {
    id: 'demo-2',
    destination_id: 'tokyo-001',
    author_name: 'Mike, dad of 3',
    author_badge: 'parent',
    kids_ages: ['2', '5', '9'],
    overall_rating: 4,
    safety_rating: 5,
    fun_rating: 4,
    value_rating: 3,
    food_rating: 4,
    title: 'Great but expensive for a big family',
    content: 'The kids loved it, no question. Safety standards are top notch — never once worried about losing anyone. But with three kids, the cost adds up fast. Worth it for a special occasion, not a regular thing.',
    visit_date: '2025-08-20',
    would_recommend: true,
    tips: 'Buy the multi-day pass if you can swing it. One day is not enough with kids who need breaks.',
    helpful_count: 8,
    status: 'approved',
    created_at: '2025-10-05T14:30:00Z',
    updated_at: '2025-10-05T14:30:00Z',
    user_id: null,
  },
  {
    id: 'demo-3',
    destination_id: 'tokyo-001',
    author_name: 'Emma, mom of 1',
    author_badge: 'visitor',
    kids_ages: ['3'],
    overall_rating: 3,
    safety_rating: 4,
    fun_rating: 3,
    value_rating: 2,
    food_rating: 3,
    title: 'Good but our toddler was overwhelmed',
    content: 'Beautiful park and very clean, but our 3-year-old got overwhelmed by the crowds and noise fairly quickly. We spent more time in quiet corners than on rides. Probably better for ages 5+ for actual ride enjoyment.',
    visit_date: '2025-07-10',
    would_recommend: false,
    tips: 'Use the Baby Care Center in World Bazaar — it has a quiet feeding room that saved our afternoon.',
    helpful_count: 5,
    status: 'approved',
    created_at: '2025-10-10T11:00:00Z',
    updated_at: '2025-10-10T11:00:00Z',
    user_id: null,
  },
  {
    id: 'demo-pending-1',
    destination_id: 'tokyo-001',
    author_name: 'Jenny, mom of 2',
    author_badge: 'parent',
    kids_ages: ['6', '10'],
    overall_rating: 5,
    safety_rating: 5,
    fun_rating: 5,
    value_rating: 4,
    food_rating: 5,
    title: 'Best family day ever!',
    content: 'Our girls aged 6 and 10 both had the time of their lives. The older one loved the thrill rides while the younger one was obsessed with the character parade. We stayed for the fireworks and it was the perfect end to the day.',
    visit_date: '2025-11-01',
    would_recommend: true,
    tips: 'Download the app to check wait times. We saved 90 minutes with the priority pass system!',
    helpful_count: 0,
    status: 'pending',
    created_at: '2025-11-15T09:00:00Z',
    updated_at: '2025-11-15T09:00:00Z',
    user_id: null,
  },
];

// ─── Storage helpers ───────────────────────────────────────────

function getStore(): ReviewRecord[] {
  // Use in-memory store as fallback
  return memoryStore;
}

function addToStore(record: ReviewRecord): void {
  memoryStore.push(record);
}

function updateInStore(id: string, updates: Partial<ReviewRecord>): ReviewRecord | null {
  const idx = memoryStore.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  memoryStore[idx] = { ...memoryStore[idx], ...updates, updated_at: new Date().toISOString() };
  return memoryStore[idx];
}

// ─── API Handler ──────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const destinationId = req.nextUrl.searchParams.get('destination_id');
  const status = req.nextUrl.searchParams.get('status') || 'approved';
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50');
  const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0');

  try {
    // Try Supabase first
    if (supabase && isConfigured) {
      try {
        let query = supabase
          .from('destination_reviews')
          .select('*', { count: 'exact', head: false })
          .eq('status', status)
          .order('created_at', { ascending: false });

        if (destinationId) {
          query = query.eq('destination_id', destinationId);
        }

        const { data, error, count } = await query
          .range(offset, offset + limit - 1);

        if (!error) {
          return NextResponse.json({ reviews: data || [], total: count || 0 });
        }
        // table may not exist, fall through
        console.error('Supabase query failed, using in-memory:', error);
      } catch (dbError) {
        console.error('Supabase query exception, using in-memory:', dbError);
      }
    }

    // In-memory fallback
    let results = getStore().filter((r) => r.status === status);
    if (destinationId) {
      results = results.filter((r) => r.destination_id === destinationId);
    }
    const total = results.length;
    results = results.slice(offset, offset + limit);

    return NextResponse.json({ reviews: results, total });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return NextResponse.json(
      { reviews: [], total: 0, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ReviewInput = await req.json();

    // Validation
    if (!body.destination_id || !body.author_name || !body.title || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields: destination_id, author_name, title, content' },
        { status: 400 }
      );
    }

    if (!body.overall_rating || body.overall_rating < 1 || body.overall_rating > 5) {
      return NextResponse.json(
        { error: 'Overall rating is required and must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (body.content.length < 10) {
      return NextResponse.json(
        { error: 'Review content must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Try Supabase first, fall back to in-memory if table doesn't exist
    if (supabase && isConfigured) {
      try {
        const { data, error } = await supabase
          .from('destination_reviews')
          .insert({
            destination_id: body.destination_id,
            author_name: body.author_name,
            author_badge: body.author_badge || 'parent',
            kids_ages: body.kids_ages || [],
            overall_rating: body.overall_rating,
            safety_rating: body.safety_rating || null,
            fun_rating: body.fun_rating || null,
            value_rating: body.value_rating || null,
            food_rating: body.food_rating || null,
            title: body.title,
            content: body.content,
            visit_date: body.visit_date || null,
            would_recommend: body.would_recommend ?? true,
            tips: body.tips || '',
            status: 'pending',
          })
          .select()
          .single();

        if (error) throw error;
        return NextResponse.json({ success: true, review: data }, { status: 201 });
      } catch (dbError) {
        // Supabase table may not exist — fall through to in-memory fallback
        console.error('Supabase insert failed, using in-memory fallback:', dbError);
      }
    }

    // In-memory fallback
    const record: ReviewRecord = {
      id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      destination_id: body.destination_id,
      author_name: body.author_name,
      author_badge: body.author_badge || 'parent',
      kids_ages: body.kids_ages || [],
      overall_rating: body.overall_rating,
      safety_rating: body.safety_rating || null,
      fun_rating: body.fun_rating || null,
      value_rating: body.value_rating || null,
      food_rating: body.food_rating || null,
      title: body.title,
      content: body.content,
      visit_date: body.visit_date || null,
      would_recommend: body.would_recommend ?? true,
      tips: body.tips || '',
      helpful_count: 0,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: null,
    };

    addToStore(record);
    return NextResponse.json({ success: true, review: record }, { status: 201 });
  } catch (err) {
    console.error('Error submitting review:', err);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
