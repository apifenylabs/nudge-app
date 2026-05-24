import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for development
// In production, connect to a real email service (Mailchimp, ConvertKit, etc.)
const subscribers: Array<{ email: string; source: string; subscribedAt: string }> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check for duplicates
    if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    subscribers.push({
      email: email.toLowerCase(),
      source: source || 'default',
      subscribedAt: new Date().toISOString(),
    });

    // In production, add to Mailchimp / ConvertKit here
    console.log(`[Newsletter] New subscriber: ${email} (source: ${source})`);

    return NextResponse.json({
      success: true,
      message: 'Welcome to the EV Charging Asia newsletter!',
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function GET() {
  // In production, protect this endpoint
  return NextResponse.json({
    totalSubscribers: subscribers.length,
    subscribers: subscribers.slice(0, 10), // Only return recent 10
  });
}
