import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost:3000/api/verify-admin', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

describe('POST /api/verify-admin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 on bad JSON', async () => {
    const req = new NextRequest('http://localhost:3000/api/verify-admin', {
      method: 'POST',
      body: '{bad json',
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 500 when no secret configured and wrong dev password', async () => {
    delete process.env.TITAN_ADMIN_SECRET;
    const res = await POST(makeRequest({ password: 'wrong' }));
    const json = await res.json();
    expect(res.status).toBe(500);
    expect(json.error).toBe('Not configured');
  });

  it('accepts dev password when no env secret set', async () => {
    delete process.env.TITAN_ADMIN_SECRET;
    const res = await POST(makeRequest({ password: 'titan-admin-dev' }));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });

  it('returns 401 for incorrect password when env is set', async () => {
    process.env.TITAN_ADMIN_SECRET = 'real-secret';
    const res = await POST(makeRequest({ password: 'wrong' }));
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json.error).toBe('Invalid password');
  });

  it('returns 200 for correct password when env is set', async () => {
    process.env.TITAN_ADMIN_SECRET = 'real-secret';
    const res = await POST(makeRequest({ password: 'real-secret' }));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });
});
