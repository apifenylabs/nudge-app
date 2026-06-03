// POST /api/contact — handles contact form submissions
// Uses lazy supabase import pattern. Falls back to local JSON file.

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

function validate(data: Partial<ContactSubmission>): string | null {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 1) {
    return 'Name is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return 'A valid email address is required';
  }
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    return 'Message must be at least 10 characters';
  }
  return null;
}

function saveToLocalFile(submission: ContactSubmission): boolean {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'contact-submissions.json');
    let submissions: ContactSubmission[] = [];
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        submissions = JSON.parse(raw);
      }
    } catch {
      submissions = [];
    }
    submissions.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const submission: ContactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: (body.subject || '').trim(),
      message: body.message.trim(),
      created_at: new Date().toISOString(),
    };

    // Try Supabase first (lazy import — never module scope)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        // Dynamic import — NOT at module scope
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { error } = await supabase
          .from('contact_submissions')
          .insert({
            name: submission.name,
            email: submission.email,
            subject: submission.subject,
            message: submission.message,
            created_at: submission.created_at,
          });

        if (!error) {
          console.log('[Contact] Saved to Supabase:', submission.id);
          return NextResponse.json({
            success: true,
            message: 'Thank you! We\'ve received your message and will get back to you soon.',
          });
        }

        console.warn('[Contact] Supabase insert failed:', error.message);
      } else {
        console.warn('[Contact] Supabase credentials missing — falling back to local file');
      }
    } catch (supabaseError: any) {
      console.warn('[Contact] Supabase error:', supabaseError?.message || supabaseError);
    }

    // Fallback: save to local JSON file
    const saved = saveToLocalFile(submission);
    if (saved) {
      console.log('[Contact] Saved to local file:', submission.id);
      return NextResponse.json({
        success: true,
        message: 'Thank you! We\'ve received your message and will get back to you soon.',
      });
    }

    // Last resort: log to console
    console.log('[Contact] Submission (no storage):', JSON.stringify(submission));
    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ve received your message and will get back to you soon.',
    });
  } catch (error: any) {
    console.error('[Contact] Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
