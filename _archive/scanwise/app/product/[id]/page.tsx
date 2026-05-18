"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getProductByCode } from "@/lib/api";
import { calculateScore, getScoreBadgeColor, getScoreLabel } from "@/lib/score";
import { recordScan } from "@/lib/streaks";
import ScoreGauge from "@/components/ScoreGauge";
import IngredientList from "@/components/IngredientList";
import ShareCard from "@/components/ShareCard";
import NewsFeed from "@/components/NewsFeed";
import StreakBadge from "@/components/StreakBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { OpenFoodFactsProduct } from "@/lib/api";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<OpenFoodFactsProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("scores");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductByCode(id);
        setProduct(data);
        recordScan();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="space-y-4 text-center">
          <div className="relative mx-auto h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-full w-1/3 animate-[scan_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
          </div>
          <p className="text-sm text-gray-400 animate-pulse">
            Looking up product data...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <span className="text-4xl">😕</span>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Product Not Found
        </h2>
        <p className="text-sm text-gray-500">{error || "Could not load product data."}</p>
        <Link
          href="/"
          className="rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
        >
          ← Search Again
        </Link>
      </div>
    );
  }

  const p = product.product;
  const score = calculateScore(p);
  const scoreColor = getScoreBadgeColor(score.overall);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-4">
      {/* Back + Streak */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
        <StreakBadge />
      </div>

      {/* Product Header */}
      <Card className="overflow-hidden p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Product image */}
          {p.image_url && (
            <div className="flex shrink-0 items-center justify-center bg-gray-50 p-6 dark:bg-gray-900 sm:w-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image_url}
                alt={p.product_name || "Product image"}
                className="max-h-32 max-w-full object-contain"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-center p-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {p.product_name || "Unknown Product"}
            </h1>
            {p.brands && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {p.brands}
              </p>
            )}
            {p.quantity && (
              <p className="mt-1 text-xs text-gray-400">{p.quantity}</p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge className={scoreColor}>
                {getScoreLabel(score.overall)} ({score.overall})
              </Badge>
              {p.nutriscore_grade && (
                <Badge variant="outline">
                  Nutri-Score: {p.nutriscore_grade.toUpperCase()}
                </Badge>
              )}
              {p.nova_group && (
                <Badge variant="outline">
                  NOVA {p.nova_group}
                  {p.nova_group === 1
                    ? " (Minimal)"
                    : p.nova_group === 2
                      ? " (Culinary)"
                      : p.nova_group === 3
                        ? " (Processed)"
                        : " (Ultra)"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scores">Scores</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>

        {/* Score Tab */}
        <TabsContent value="scores" className="mt-4 space-y-4">
          {/* Main score gauge */}
          <div className="flex justify-center py-4">
            <ScoreGauge score={score.overall} label="Overall Score" />
          </div>

          {/* Score breakdown */}
          <Card className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Score Breakdown
            </h3>
            <div className="space-y-3">
              <ScoreBar
                label="Safety"
                score={score.safety}
                sub={`Nutri-Score: ${score.breakdown.nutriscore} · NOVA: ${score.breakdown.nova}`}
              />
              <ScoreBar
                label="Ingredients"
                score={score.ingredients}
                sub={`${score.breakdown.cleanCount} clean · ${score.breakdown.flaggedIngredients.length} flagged`}
              />
              <ScoreBar
                label="Data Completeness"
                score={score.completeness}
                sub="How much data is available"
              />
            </div>
          </Card>
        </TabsContent>

        {/* Ingredients Tab */}
        <TabsContent value="ingredients" className="mt-4">
          <Card className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Ingredient Analysis
            </h3>
            <IngredientList
              ingredientsText={p.ingredients_text}
              additivesTags={p.additives_tags}
            />
          </Card>
        </TabsContent>

        {/* News Tab */}
        <TabsContent value="news" className="mt-4">
          <Card className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Latest News & Recalls
            </h3>
            <NewsFeed
              productName={p.product_name}
              category={p.categories?.split(",")[0]?.trim()}
            />
          </Card>
        </TabsContent>
      </Tabs>

      {/* Share Card Section */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          📤 Share This Result
        </h3>
        <ShareCard
          productName={p.product_name || "Unknown Product"}
          brand={p.brands || "Unknown Brand"}
          score={score.overall}
          ingredientsCount={score.breakdown.totalIngredients}
          cleanCount={score.breakdown.cleanCount}
          imageUrl={p.image_small_url}
        />
      </div>

      <Separator className="my-6" />

      {/* Product metadata */}
      <div className="space-y-2 text-xs text-gray-400 dark:text-gray-500">
        <p>
          <strong>Barcode:</strong> {product.code}
        </p>
        {p.categories && (
          <p>
            <strong>Categories:</strong> {p.categories}
          </p>
        )}
        {p.countries_tags && (
          <p>
            <strong>Markets:</strong>{" "}
            {p.countries_tags.map((c) => c.replace("en:", "")).join(", ")}
          </p>
        )}
        <p className="mt-2">
          Data sourced from Open Food Facts. Scores are algorithmic estimates
          based on available data and should not be considered medical advice.
        </p>
      </div>

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

function ScoreBar({
  label,
  score,
  sub,
}: {
  label: string;
  score: number;
  sub: string;
}) {
  const color =
    score >= 80
      ? "bg-emerald-500"
      : score >= 60
        ? "bg-yellow-500"
        : score >= 40
          ? "bg-orange-500"
          : "bg-red-500";
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="font-bold">{score}</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-0.5 text-[10px] text-gray-400">{sub}</p>
    </div>
  );
}
