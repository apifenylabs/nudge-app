import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-3 text-lg font-bold text-foreground">
              Nudge
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Voice task manager and family assistant app. Speak tasks naturally — Nudge
              understands, assigns, and reminds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Our Network
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.familytravelasia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Asia Family Travel Directory
                </a>
              </li>
              <li>
                <a
                  href="https://luxury-family-travel-asia.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Luxury Family Travel Asia
                </a>
              </li>
              <li>
                <a
                  href="https://ev-charging-asia.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  EV Charging Asia
                </a>
              </li>
              <li>
                <a
                  href="https://apifeny-ai.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Apifeny AI
                </a>
              </li>
              <li>
                <a
                  href="https://kids-activities-asia.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Kids Activities Asia
                </a>
              </li>
              <li>
                <a
                  href="https://social-beast-two.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Social Beast
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Nudge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
