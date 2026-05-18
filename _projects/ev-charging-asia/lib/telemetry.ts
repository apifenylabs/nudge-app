/**
 * Ecosystem Telemetry — ev-charging-asia
 *
 * Lightweight, consent-gated usage tracking with batching, retry, and
 * a drop-in React component for user opt-in.
 *
 * See _projects/shared/telemetry/ for the canonical source.
 */

/* ── Types ────────────────────────────────────────────────── */

interface TelemetryEvent {
  event: string;
  data?: Record<string, string | number | boolean>;
  timestamp: string;
  site: string;
  sessionId: string;
}

/* ── Config ────────────────────────────────────────────────── */

const TELEMETRY_KEY = 'ecosystem_telemetry_consent';
const TELEMETRY_API_KEY = 'ecosystem-telemetry-2026';
const BATCH_LIMIT = 10;
const BATCH_IDLE_MS = 5000;
const MAX_RETRIES = 3;

/* ── Core singleton ────────────────────────────────────────── */

class TelemetryManager {
  private static instance: TelemetryManager;
  private apiEndpoint = '';
  private buffer: TelemetryEvent[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private sessionId = '';
  private siteName = 'ev-charging-asia';

  private constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('ecosystem_session_id');
        if (stored) {
          this.sessionId = stored;
        } else {
          this.sessionId = crypto.randomUUID();
          sessionStorage.setItem('ecosystem_session_id', this.sessionId);
        }
      } catch {
        this.sessionId = 's-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
      }
    }
  }

  static getInstance(): TelemetryManager {
    if (!TelemetryManager.instance) {
      TelemetryManager.instance = new TelemetryManager();
    }
    return TelemetryManager.instance;
  }

  /* ── Public API ──────────────────────────────────────── */

  init(apiEndpoint: string): void {
    this.apiEndpoint = apiEndpoint;
  }

  getConsent(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const val = localStorage.getItem(TELEMETRY_KEY);
      return val === 'true';
    } catch {
      return false;
    }
  }

  setConsent(enabled: boolean): void {
    if (typeof window === 'undefined') return;
    try {
      if (enabled) {
        localStorage.setItem(TELEMETRY_KEY, 'true');
        if (this.buffer.length > 0) {
          this.flush();
        }
      } else {
        localStorage.setItem(TELEMETRY_KEY, 'false');
        this.buffer = [];
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      }
    } catch {
      // localStorage unavailable
    }
  }

  track(event: string, data?: Record<string, string | number | boolean>): void {
    if (!this.getConsent()) return;
    if (!this.apiEndpoint) {
      console.warn('[Telemetry] init() must be called before track()');
      return;
    }

    this.buffer.push({
      event,
      data,
      timestamp: new Date().toISOString(),
      site: this.siteName,
      sessionId: this.sessionId,
    });

    if (this.buffer.length >= BATCH_LIMIT) {
      this.flush();
    } else if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), BATCH_IDLE_MS);
    }
  }

  /* ── Internal ────────────────────────────────────────── */

  private async flush(): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.buffer.length === 0) return;

    const batch = this.buffer.splice(0, BATCH_LIMIT);

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-telemetry-key': TELEMETRY_API_KEY,
          },
          body: JSON.stringify({ events: batch }),
        });

        if (res.ok) return;

        if (res.status === 400 || res.status === 401 || res.status === 403) {
          console.warn(`[Telemetry] Non-retryable error ${res.status}`);
          return;
        }
      } catch (err) {
        console.warn(`[Telemetry] Attempt ${attempt + 1}/${MAX_RETRIES} failed:`, err);
      }

      if (attempt < MAX_RETRIES - 1) {
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  getBufferLength(): number {
    return this.buffer.length;
  }

  getSiteName(): string {
    return this.siteName;
  }
}

/* ── Exports ────────────────────────────────────────── */

export const EcosystemTelemetry = TelemetryManager;

export function useEcosystemTelemetry() {
  const telemetry = TelemetryManager.getInstance();

  if (typeof window !== 'undefined') {
    try {
      const React = require('react');
      const [consent, setConsent] = React.useState(telemetry.getConsent());

      React.useEffect(() => {
        const handler = () => setConsent(telemetry.getConsent());
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
      }, []);

      const toggle = (val: boolean) => {
        telemetry.setConsent(val);
        setConsent(val);
      };

      return { consent, toggle, telemetry };
    } catch {
      return { consent: telemetry.getConsent(), toggle: telemetry.setConsent, telemetry };
    }
  }

  return { consent: false, toggle: telemetry.setConsent, telemetry };
}

export function withTelemetry<T>(
  fn: () => T,
  event: string,
  data?: Record<string, string | number | boolean>
): T {
  const result = fn();
  try {
    TelemetryManager.getInstance().track(event, data);
  } catch {
    // Don't break the action
  }
  return result;
}
