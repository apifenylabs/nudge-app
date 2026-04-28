"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/lib/api";
import StreakBadge from "@/components/StreakBadge";
import { recordScan } from "@/lib/streaks";
import hooksData from "@/data/hooks.json";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [randomFact, setRandomFact] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Set a random fact on mount
  useEffect(() => {
    const hooks = hooksData as Array<{ hook: string; category: string }>;
    const random = hooks[Math.floor(Math.random() * hooks.length)];
    setRandomFact(random?.hook || "");
  }, []);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const q = query.trim();
      if (!q) return;

      setSearching(true);
      recordScan();

      try {
        // Navigate to results page
        router.push(`/results?q=${encodeURIComponent(q)}`);
      } catch {
        setSearching(false);
      }
    },
    [query, router]
  );

  const handleSurpriseMe = useCallback(async () => {
    setSearching(true);
    recordScan();

    try {
      const res = await fetch(
        "https://world.openfoodfacts.org/api/v2/search?q=food&page=" +
          Math.floor(Math.random() * 100 + 1) +
          "&page_size=20&json=true"
      );
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        const random =
          data.products[Math.floor(Math.random() * data.products.length)];
        router.push(`/product/${random.code}`);
      } else {
        setSearching(false);
      }
    } catch {
      setSearching(false);
    }
  }, [router]);

  const handleScanBarcode = useCallback(() => {
    // Placeholder for barcode scanner
    setShowSearch(true);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ScanWise
          </span>
        </div>
        <StreakBadge />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-lg space-y-8">
          {/* Hero */}
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100">
              Know What You&apos;re Buying
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Scan or search any product to get instant safety scores,
              ingredient analysis, and smarter alternatives.
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search product name or scan barcode..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 rounded-2xl border-2 border-gray-200 bg-white pl-5 pr-12 text-base shadow-sm focus:border-emerald-400 focus:ring-emerald-400 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-emerald-500"
                autoFocus
              />
              <button
                type="submit"
                disabled={searching || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-emerald-500 p-2.5 text-white transition-all hover:bg-emerald-600 disabled:opacity-50"
              >
                {searching ? (
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleScanBarcode}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:border-emerald-400 hover:text-emerald-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                Scan Barcode
              </button>

              <button
                type="button"
                onClick={handleSurpriseMe}
                disabled={searching}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50"
              >
                🎲 Surprise Me
              </button>
            </div>
          </form>

          {/* Curiosity Hook / Random Fact */}
          {randomFact && !searching && (
            <Card className="border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                <span className="mr-1 font-medium text-emerald-600 dark:text-emerald-400">
                  💡 Did you know?
                </span>
                {randomFact}
              </p>
            </Card>
          )}

          {/* Loading animation */}
          {searching && (
            <div className="space-y-4 text-center">
              <div className="relative mx-auto h-1 w-full max-w-xs overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-full w-1/3 animate-[scan_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
              </div>
              <p className="text-sm text-gray-400 animate-pulse">
                Scanning products...
              </p>
            </div>
          )}

          {/* Quick features */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-400 dark:text-gray-500">
            <div className="rounded-lg bg-white/50 p-3 dark:bg-gray-900/50">
              🛡️ Safety Score
            </div>
            <div className="rounded-lg bg-white/50 p-3 dark:bg-gray-900/50">
              🧪 Ingredient Check
            </div>
            <div className="rounded-lg bg-white/50 p-3 dark:bg-gray-900/50">
              🌿 Alternatives
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-4 text-center text-xs text-gray-400 dark:text-gray-600">
        Powered by Open Food Facts · Data for informational purposes only
      </footer>

      <style jsx>{`
        @keyframes scan {
          0%,
          100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}
