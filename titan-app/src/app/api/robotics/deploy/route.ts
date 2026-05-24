// POST /api/robotics/deploy — Deploy an agent to a robotics platform
import { NextRequest, NextResponse } from 'next/server';
import { createDeployment } from '@/lib/robotics/deploy';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, agentName, platform, endpoint, config } = body;

    // Validate required fields
    if (!agentId || typeof agentId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid required field: agentId' },
        { status: 400 }
      );
    }

    const validPlatforms = ['ros2', 'arduino', 'raspberry-pi', 'custom'];
    if (!platform || !validPlatforms.includes(platform)) {
      return NextResponse.json(
        { error: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}` },
        { status: 400 }
      );
    }

    const result = await createDeployment({
      agentId,
      agentName,
      platform,
      endpoint,
      config,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ data: result.data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
