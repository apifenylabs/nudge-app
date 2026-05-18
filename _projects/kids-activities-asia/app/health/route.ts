import { NextResponse } from 'next/server';

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ev-charging-asia',
    version: '1.0.0',
    uptime: process.uptime(),
  };
  return NextResponse.json(health, { status: 200 });
}
