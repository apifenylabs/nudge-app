// ─── GET /api/robotics/status ──────────────────────────────────────────
// Query deployment status / health. Supports optional filters.

import { type NextRequest, NextResponse } from 'next/server';
import { getStatus, listDeployments } from '@/titan/src/lib/robotics/deploy';
import type { RobotPlatform } from '@/titan/src/lib/robotics/types';

const VALID_PLATFORMS: RobotPlatform[] = [
  'ros2',
  'arduino',
  'raspberry-pi',
  'custom',
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');
  const platformParam = searchParams.get('platform');
  const agentId = searchParams.get('agentId');

  // Validate platform filter if provided
  if (platformParam && !VALID_PLATFORMS.includes(platformParam as RobotPlatform)) {
    return NextResponse.json(
      {
        error: `Invalid platform. Must be one of: ${VALID_PLATFORMS.join(', ')}`,
      },
      { status: 400 }
    );
  }

  // ── Single deployment by ID ──────────────────────────────────────
  if (id) {
    const result = await getStatus(id);
    if (!result) {
      return NextResponse.json(
        { error: `Deployment '${id}' not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(result);
  }

  // ── List with optional filters ───────────────────────────────────
  const results = await listDeployments({
    platform: platformParam as RobotPlatform | undefined,
    agentId: agentId ?? undefined,
  });

  return NextResponse.json({
    count: results.length,
    deployments: results,
  });
}
