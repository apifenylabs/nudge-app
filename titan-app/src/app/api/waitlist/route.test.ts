import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'

// Mock @supabase/supabase-js — use vi.hoisted to avoid TDZ
const mockInsert = vi.hoisted(() => vi.fn())
const mockFrom = vi.hoisted(() => vi.fn(() => ({
  insert: mockInsert,
})))

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}))

function createRequest(body: unknown): Request {
  return new Request('http://localhost:3000/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/waitlist', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default: successful insert returning a row
    mockInsert.mockReturnValue({
      select: () => ({
        maybeSingle: () => Promise.resolve({ data: { id: '1' }, error: null }),
      }),
    })
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(createRequest({}))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBe('Valid email required')
  })

  it('returns 400 when email is invalid', async () => {
    const res = await POST(createRequest({ email: 'notanemail' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBe('Valid email required')
  })

  it('returns 200 on successful signup', async () => {
    const res = await POST(createRequest({ email: 'test@example.com', name: 'Test User' }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.message).toBe('Welcome to Titan!')
  })

  it('returns 200 with "already on waitlist" for duplicate email (23505)', async () => {
    mockInsert.mockReturnValue({
      select: () => ({
        maybeSingle: () => Promise.resolve({ data: null, error: { code: '23505', message: 'duplicate' } }),
      }),
    })
    const res = await POST(createRequest({ email: 'dup@example.com' }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.message).toBe('Already on waitlist!')
  })

  it('returns 500 on database error', async () => {
    mockInsert.mockReturnValue({
      select: () => ({
        maybeSingle: () => Promise.resolve({ data: null, error: { code: 'PGRST301', message: 'permission denied' } }),
      }),
    })
    const res = await POST(createRequest({ email: 'test@example.com' }))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toBe('permission denied')
  })

  it('passes optional fields to insert', async () => {
    const selectFn = vi.fn(() => ({ maybeSingle: () => Promise.resolve({ data: { id: '1' }, error: null }) }))
    mockInsert.mockReturnValue({ select: selectFn })

    await POST(createRequest({
      email: 'user@example.com',
      name: 'Alice',
      preferredMascot: 'aireon',
      referralSource: 'twitter',
    }))

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'user@example.com',
        name: 'Alice',
        preferred_mascot: 'aireon',
        referral_source: 'twitter',
        consented: true,
      })
    )
  })
})
