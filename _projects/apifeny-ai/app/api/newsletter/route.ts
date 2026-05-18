import { NextRequest, NextResponse } from 'next/server';

// ─── Types ───

interface Subscriber {
  email: string;
  name?: string;
  subscribedAt: string;
  source: string;
  isActive: boolean;
  preferences?: {
    weeklyDigest: boolean;
    toolAlerts: boolean;
    playbookUpdates: boolean;
  };
}

interface NewsletterIssue {
  id: string;
  subject: string;
  previewText: string;
  htmlBody?: string;
  sentAt?: string;
  recipientCount: number;
  openRate?: number;
  clickRate?: number;
}

// ─── In-memory store (falls back to file-based persistence) ───
// In production, replace with Supabase/PostgreSQL.

let subscribers: Subscriber[] = [];
let issues: NewsletterIssue[] = [];

// ─── Storage helpers ───

const fs = require('fs');
const path = require('path');
const STORAGE_DIR = path.join(process.cwd(), '.newsletter-data');

function ensureStorageDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    try {
      fs.mkdirSync(STORAGE_DIR, { recursive: true });
    } catch {
      // Silently fail — in-memory fallback
    }
  }
}

function loadData() {
  ensureStorageDir();
  const subPath = path.join(STORAGE_DIR, 'subscribers.json');
  const issuesPath = path.join(STORAGE_DIR, 'issues.json');
  try {
    if (fs.existsSync(subPath)) {
      subscribers = JSON.parse(fs.readFileSync(subPath, 'utf-8'));
    }
    if (fs.existsSync(issuesPath)) {
      issues = JSON.parse(fs.readFileSync(issuesPath, 'utf-8'));
    }
  } catch {
    // In-memory fallback
  }
}

function saveData() {
  ensureStorageDir();
  try {
    fs.writeFileSync(
      path.join(STORAGE_DIR, 'subscribers.json'),
      JSON.stringify(subscribers, null, 2)
    );
    fs.writeFileSync(
      path.join(STORAGE_DIR, 'issues.json'),
      JSON.stringify(issues, null, 2)
    );
  } catch {
    // In-memory fallback
  }
}

// Load existing data on module init
try {
  loadData();
} catch {
  // First run — no data yet
}

// ─── Validation ───

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Handlers ───

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, name, source } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Missing action parameter' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'subscribe': {
        if (!email || !isValidEmail(email)) {
          return NextResponse.json(
            { error: 'Invalid email address' },
            { status: 400 }
          );
        }

        const existing = subscribers.find(
          (s) => s.email.toLowerCase() === email.toLowerCase()
        );

        if (existing) {
          if (existing.isActive) {
            return NextResponse.json({
              success: true,
              message: 'You\'re already subscribed!',
              alreadySubscribed: true,
            });
          }
          // Re-activate
          existing.isActive = true;
          existing.subscribedAt = new Date().toISOString();
          saveData();
          return NextResponse.json({
            success: true,
            message: 'Welcome back! You\'ve been re-subscribed.',
          });
        }

        const newSubscriber: Subscriber = {
          email: email.toLowerCase(),
          name: name || undefined,
          subscribedAt: new Date().toISOString(),
          source: source || 'newsletter-signup',
          isActive: true,
          preferences: {
            weeklyDigest: true,
            toolAlerts: true,
            playbookUpdates: true,
          },
        };

        subscribers.push(newSubscriber);
        saveData();

        return NextResponse.json({
          success: true,
          message: 'Welcome to the Apifeny AI newsletter! 🎉',
          subscriberCount: subscribers.filter((s) => s.isActive).length,
        });
      }

      case 'unsubscribe': {
        if (!email) {
          return NextResponse.json(
            { error: 'Missing email' },
            { status: 400 }
          );
        }

        const sub = subscribers.find(
          (s) => s.email.toLowerCase() === email.toLowerCase()
        );

        if (sub) {
          sub.isActive = false;
          saveData();
        }

        return NextResponse.json({
          success: true,
          message: 'You\'ve been unsubscribed. Sorry to see you go!',
        });
      }

      case 'status': {
        return NextResponse.json({
          success: true,
          subscriberCount: subscribers.filter((s) => s.isActive).length,
          totalSubscribers: subscribers.length,
          issuesSent: issues.length,
        });
      }

      case 'update-preferences': {
        const { email: prefEmail, preferences } = body;
        if (!prefEmail) {
          return NextResponse.json(
            { error: 'Missing email' },
            { status: 400 }
          );
        }

        const prefSub = subscribers.find(
          (s) => s.email.toLowerCase() === prefEmail.toLowerCase()
        );

        if (!prefSub) {
          return NextResponse.json(
            { error: 'Subscriber not found' },
            { status: 404 }
          );
        }

        prefSub.preferences = { ...prefSub.preferences, ...preferences };
        saveData();

        return NextResponse.json({
          success: true,
          message: 'Preferences updated!',
          preferences: prefSub.preferences,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ─── GET: Public stats ───

export async function GET() {
  loadData();
  return NextResponse.json({
    success: true,
    stats: {
      activeSubscribers: subscribers.filter((s) => s.isActive).length,
      totalSubscribers: subscribers.length,
      issuesSent: issues.length,
    },
    isActive: true,
    backend: 'local-json',
  });
}
