export default function CrossSiteFooter() {
  return (
    <footer className="w-full border-t border-dark-border bg-ink px-6 py-8 mt-auto">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-0">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted dark:text-[#a3a3a3]">🌐 Explore More</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a
            href="https://www.familytravelasia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-cream dark:text-[#a3a3a3] dark:hover:text-cream"
          >
            Family Travel Asia
          </a>
          <a
            href="https://luxury-family-travel-asia.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-cream dark:text-[#a3a3a3] dark:hover:text-cream"
          >
            Luxury Family Travel Asia
          </a>
          <a
            href="https://ev-charging-asia.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-cream dark:text-[#a3a3a3] dark:hover:text-cream"
          >
            EV Charging Asia
          </a>
          <a
            href="https://senior-friendly-travel-asia.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-cream dark:text-[#a3a3a3] dark:hover:text-cream"
          >
            Senior Friendly Travel Asia
          </a>
          <a
            href="https://kids-activities-asia.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-cream dark:text-[#a3a3a3] dark:hover:text-cream"
          >
            Kids Activities Asia
          </a>
          <a
            href="https://apifeny-ai.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-cream dark:text-[#a3a3a3] dark:hover:text-cream"
          >
            Apifeny AI Tools
          </a>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted dark:text-[#a3a3a3]">
        © 2026 Social Beast. Part of the Alpha Portfolio.
      </p>
    </footer>
  );
}
