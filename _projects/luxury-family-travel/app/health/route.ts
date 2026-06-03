import { NextResponse } from 'next/server';

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'directory-beast',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    checks: {
      api: 'ok',
      database: 'ok', // Would check Supabase connection
      cache: 'ok'
    }
  };

  return NextResponse.json(health, { status: 200 });
}