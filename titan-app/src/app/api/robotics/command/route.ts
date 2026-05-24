// POST /api/robotics/command — Send a command to a deployed robot
import { NextRequest, NextResponse } from 'next/server';
import { sendCommand } from '@/lib/robotics/deploy';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { deploymentId, command, params } = body;

    // Validate required fields
    if (!deploymentId || typeof deploymentId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid required field: deploymentId' },
        { status: 400 }
      );
    }

    if (!command || typeof command !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid required field: command' },
        { status: 400 }
      );
    }

    const result = await sendCommand(deploymentId, command, params);

    if (result.error) {
      const status = result.error.includes('not found') ? 404 : 400;
      return NextResponse.json(
        { success: false, output: result.output, error: result.error },
        { status }
      );
    }

    return NextResponse.json(
      { success: true, output: result.output },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
