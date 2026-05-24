// GET /api/robotics/status — List all deployments (optional ?agentId filter)
import { NextRequest, NextResponse } from 'next/server';
import { getDeployments } from '@/lib/robotics/deploy';

export async function GET(request: NextRequest) {
  try {
    const agentId = request.nextUrl.searchParams.get('agentId') ?? undefined;
    const result = await getDeployments(agentId);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ data: result.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
