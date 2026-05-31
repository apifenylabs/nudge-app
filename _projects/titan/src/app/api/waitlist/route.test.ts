import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

// Mock @supabase/supabase-js
const mockSelect = vi.fn();
const mockOrder = vi.fn();
const mockLimit = vi.fn();
const mockFrom = vi.fn(() => ({ select: mockSelect }));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

function makeRequest(headers?: Record<string, string>): NextRequest {
  const h = new Headers();
  if (headers) {
    Object.entries(headers).forEach(([k, v]) => h.set(k, v));
  }
  return new NextRequest('http://localhost:3000/api/waitlist', { headers: h });
}

describe('GET /api/waitlist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
  });

  it('returns entries on success', async () => {
    const fakeData = [{ email: 'a@b.com', created_at: '2025-01-01' }];
    mockSelect.mockReturnValue({ order: mockOrder });
    mockOrder.mockReturnValue({ limit: mockLimit });
    mockLimit.mockResolvedValueOnce({ data: fakeData, error: null });

    const res = await GET(makeRequest());
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.entries).toEqual(fakeData);
  });

  it('returns empty entries on database error', async () => {
    mockSelect.mockReturnValue({ order: mockOrder });
    mockOrder.mockReturnValue({ limit: mockLimit });
    mockLimit.mockResolvedValueOnce({ data: null, error: { message: 'fail' } });

    const res = await GET(makeRequest());
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.entries).toEqual([]);
    expect(json.error).toBe('fail');
  });

  it('returns empty entries when Supabase env vars are missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const res = await GET(makeRequest());
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.entries).toEqual([]);
    expect(json.error).toBe('Supabase not configured');
  });
});
