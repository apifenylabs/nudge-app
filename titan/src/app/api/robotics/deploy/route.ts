// ─── POST /api/robotics/deploy ──────────────────────────────────────────
// Deploy an agent to a target robot hardware platform.

import { type NextRequest, NextResponse } from 'next/server';
import { deploy } from '../../../../lib/robotics/deploy';
import type { DeployRequest, RobotPlatform } from '../../../../lib/robotics/types';

const VALID_PLATFORMS: RobotPlatform[] = [
  'ros2',
  'arduino',
  'raspberry-pi',
  'custom',
];

/** Validate that a value is a non-empty string. */
function isNonEmpty(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const raw = body as Record<string, unknown>;
  const { agentId, platform, endpoint, config } = raw;

  // ── Validation ────────────────────────────────────────────────────

  if (!isNonEmpty(agentId)) {
    return NextResponse.json(
      { error: 'agentId is required and must be a non-empty string' },
      { status: 400 }
    );
  }

  if (!isNonEmpty(platform) || !VALID_PLATFORMS.includes(platform as RobotPlatform)) {
    return NextResponse.json(
      {
        error: `platform must be one of: ${VALID_PLATFORMS.join(', ')}`,
      },
      { status: 400 }
    );
  }

  const endpointStr =
    endpoint !== undefined
      ? isNonEmpty(endpoint)
        ? endpoint
        : null
      : undefined;

  if (endpoint !== undefined && endpointStr === null) {
    return NextResponse.json(
      { error: 'endpoint must be a non-empty string when provided' },
      { status: 400 }
    );
  }

  if (
    config !== undefined &&
    (typeof config !== 'object' || config === null || Array.isArray(config))
  ) {
    return NextResponse.json(
      { error: 'config must be a JSON object when provided' },
      { status: 400 }
    );
  }

  // ── Deploy ────────────────────────────────────────────────────────

  const deployRequest: DeployRequest = {
    agentId,
    platform: platform as RobotPlatform,
    endpoint: endpointStr,
    config: config as Record<string, unknown> | undefined,
  };

  const result = await deploy(deployRequest);

  return NextResponse.json(result, { status: 201 });
}
