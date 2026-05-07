import { NextRequest, NextResponse } from 'next/server';

interface PhotoSubmission {
  id: string;
  destinationId: string;
  photoUrl: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  moderatedAt?: string;
  moderatedBy?: string;
}

const reviewQueue: PhotoSubmission[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { destinationId, photoUrl, submittedBy } = body;

    if (!destinationId || !photoUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!photoUrl.startsWith('http')) {
      return NextResponse.json({ error: 'Invalid photo URL' }, { status: 400 });
    }

    const submission: PhotoSubmission = {
      id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      destinationId,
      photoUrl,
      submittedBy: submittedBy || 'anonymous',
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    reviewQueue.push(submission);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Photo submitted for review. It will appear after approval.',
      submissionId: submission.id 
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status') || 'pending';
  const destinationId = req.nextUrl.searchParams.get('destinationId');
  
  let results = reviewQueue.filter(s => s.status === status);
  if (destinationId) {
    results = results.filter(s => s.destinationId === destinationId);
  }
  
  return NextResponse.json({ queue: results });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { submissionId, action, moderator } = body;

  if (!submissionId || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const submission = reviewQueue.find(s => s.id === submissionId);
  if (!submission) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
  }

  submission.status = action === 'approve' ? 'approved' : 'rejected';
  submission.moderatedAt = new Date().toISOString();
  submission.moderatedBy = moderator || 'admin';

  return NextResponse.json({ success: true, submission });
}
