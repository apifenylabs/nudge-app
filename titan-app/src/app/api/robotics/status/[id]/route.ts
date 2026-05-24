// GET /api/robotics/status/[id] — Get single deployment by ID
import { NextRequest, NextResponse } from 'next/server';
import { getDeploymentById } from '@/lib/robotics/deploy';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing deployment id' }, { status: 400 });
    }

    const result = await getDeploymentById(id);

    if (result.error) {
      const status = result.error === 'Deployment not found' ? 404 : 500;
      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json({ data: result.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
