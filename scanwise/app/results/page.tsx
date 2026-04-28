"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { searchProducts } from "@/lib/api";
import { getScoreBadgeColor, getScoreLabel } from "@/lib/score";
import { recordScan } from "@/lib/streaks";
import StreakBadge from "@/components/StreakBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SearchResult } from "@/lib/api";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      router.push("/");
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      recordScan();

      try {
        const data = await searchProducts(query);
        setResults(data.products || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Search failed"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, router]);

  // Computed score for a product (approximate without full detail)
  const approximateScore = (product: SearchResult) => {
    const nutriscoreMap: Record<string, number> = {
      a: 95, b: 80, c: 60, d: 35, e: 15,
    };
    const novaMap: Record<number, number> = {
      1: 90, 2: 70, 3: 40, 4: 20,
    };
    const nutriscore = nutriscoreMap[product.nutriscore_grade?.toLowerCase()] ?? 50;
    const nova = novaMap[product.nova_group] ?? 50;
    return Math.round(nutriscore * 0.4 + nova * 0.3 + 50 * 0.3);
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="space-y-4 text-center">
          <div className="relative mx-auto h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-full w-1/3 animate-[scan_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
          </div>
          <p className="text-sm text-gray-400 animate-pulse">
            Searching for &ldquo;{query}&rdquo;...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
        <StreakBadge />
      </div>

      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Results for &ldquo;{query}&rdquo;
        </h1>
        <p className="text-sm text-gray-500">
          {results.length} products found
        </p>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </Card>
      )}

      {results.length === 0 && !error && (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <span className="text-4xl">🔍</span>
          <p className="text-gray-500 dark:text-gray-400">
            No products found for &ldquo;{query}&rdquo;
          </p>
          <Link
            href="/"
            className="rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            ← Try Another Search
          </Link>
        </div>
      )}

      {/* Results grid */}
      <div className="space-y-3">
        {results.map((product) => {
          const score = approximateScore(product);
          return (
            <Link key={product.code} href={`/product/${product.code}`}>
              <Card className="flex items-center gap-4 p-3 transition-all hover:border-emerald-300 hover:shadow-sm dark:hover:border-emerald-700">
                {/* Product image */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900">
                  {product.image_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={product.image_url}
                      alt={product.product_name || ""}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-2xl">📦</span>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {product.product_name || "Unknown Product"}
                  </h3>
                  {product.brands && (
                    <p className="truncate text-xs text-gray-500">
                      {product.brands}
                    </p>
                  )}
                  {product.categories && (
                    <p className="mt-0.5 truncate text-[10px] text-gray-400">
                      {product.categories}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-1.5">
                    {product.nutriscore_grade && (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white"
                        style={{
                          backgroundColor:
                            product.nutriscore_grade.toLowerCase() === "a" ? "#22c55e" :
                            product.nutriscore_grade.toLowerCase() === "b" ? "#84cc16" :
                            product.nutriscore_grade.toLowerCase() === "c" ? "#eab308" :
                            product.nutriscore_grade.toLowerCase() === "d" ? "#f97316" : "#ef4444"
                        }}
                      >
                        {product.nutriscore_grade.toUpperCase()}
                      </span>
                    )}
                    <Badge className={getScoreBadgeColor(score)}>
                      {getScoreLabel(score)} {score}
                    </Badge>
                  </div>
                </div>

                {/* Arrow */}
                <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Card>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center p-8">
          <p className="text-gray-400">Loading...</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
