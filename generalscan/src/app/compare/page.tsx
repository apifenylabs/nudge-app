"use client";

import { useState, useCallback } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ScoreCard } from "@/components/ScoreCard";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState, ErrorState } from "@/components/States";
import { searchProducts, searchBeautyProducts, isBeautyQuery } from "@/lib/api";
import { calculateAllScores } from "@/lib/score";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Leaf, Heart, DollarSign, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { SearchResult, OpenFoodFactsProduct, ProductScores } from "@/lib/types";

interface ComparedProduct {
  code: string;
  name: string;
  brand: string;
  imageUrl: string | null;
  scores: ProductScores;
}

export default function ComparePage() {
  const [comparedProducts, setComparedProducts] = useState<ComparedProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchState, setSearchState] = useState<"idle" | "results" | "empty" | "error">("idle");
  const [searchError, setSearchError] = useState("");

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setSearchState("idle");

    try {
      const results = isBeautyQuery(query)
        ? await searchBeautyProducts(query)
        : await searchProducts(query);

      if (results.length === 0) {
        setSearchState("empty");
        setSearchResults([]);
      } else {
        setSearchState("results");
        setSearchResults(results);
      }
    } catch (err) {
      setSearchState("error");
      setSearchError(err instanceof Error ? err.message : "Search failed");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const addProduct = useCallback(
    async (result: SearchResult) => {
      // Check if already added
      if (comparedProducts.some((p) => p.code === result.code)) return;

      try {
        // Fetch full product data for scoring
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v2/product/${result.code}`
        );
        const data: OpenFoodFactsProduct = await response.json();

        if (data.status === 0 || !data.product) return;

        const scores = calculateAllScores(data.product);
        const newProduct: ComparedProduct = {
          code: result.code,
          name: result.product_name || "Unknown",
          brand: result.brands || "",
          imageUrl: result.image_small_url || result.image_url || null,
          scores,
        };

        setComparedProducts((prev) => [...prev, newProduct]);
        setSearchState("idle");
        setSearchResults([]);
      } catch {
        // Silently fail — skip products that can't be scored
      }
    },
    [comparedProducts]
  );

  const removeProduct = useCallback((code: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.code !== code));
  }, []);

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to search
      </Link>

      <div>
        <h1 className="text-2xl font-bold mb-2">Compare Products</h1>
        <p className="text-muted-foreground">
          Search for products to add them to the comparison table.
        </p>
      </div>

      {/* Search to add */}
      <div className="space-y-4">
        <SearchBar
          onSearch={handleSearch}
          isSearching={isSearching}
          placeholder="Search a product to compare..."
          defaultValue={searchQuery}
        />

        {searchState === "results" && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Click a product to add it to the comparison
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {searchResults.slice(0, 6).map((result) => (
                <button
                  key={result.code}
                  onClick={() => addProduct(result)}
                  disabled={comparedProducts.some((p) => p.code === result.code)}
                  className="text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ProductCard product={result} />
                </button>
              ))}
            </div>
          </div>
        )}

        {searchState === "empty" && (
          <EmptyState />
        )}

        {searchState === "error" && (
          <ErrorState message={searchError} onRetry={() => handleSearch(searchQuery)} />
        )}
      </div>

      {/* Compare Table */}
      {comparedProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <div
            className="grid gap-4 min-w-[600px]"
            style={{
              gridTemplateColumns: `200px repeat(${comparedProducts.length}, minmax(200px, 1fr))`,
            }}
          >
            {/* Header Row */}
            <div className="text-sm font-semibold text-muted-foreground p-2">Product</div>
            {comparedProducts.map((p) => (
              <div key={p.code} className="p-2 relative">
                <button
                  onClick={() => removeProduct(p.code)}
                  className="absolute -top-1 -right-1 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  aria-label={`Remove ${p.name}`}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        No Img
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold leading-tight truncate w-full">
                    {p.name}
                  </p>
                  {p.brand && (
                    <p className="text-xs text-muted-foreground truncate w-full">
                      {p.brand}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Overall Row */}
            <div className="p-2 flex items-center gap-2 text-sm font-medium">
              <Star className="h-4 w-4 text-amber-500" /> Overall
            </div>
            {comparedProducts.map((p) => (
              <div key={p.code} className="p-2 text-center">
                <span
                  className={`text-2xl font-bold ${
                    p.scores.overall.score >= 80
                      ? "text-green-600"
                      : p.scores.overall.score >= 60
                      ? "text-yellow-600"
                      : p.scores.overall.score >= 40
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {p.scores.overall.score}
                </span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            ))}

            {/* Sustainability Row */}
            <div className="p-2 flex items-center gap-2 text-sm font-medium">
              <Leaf className="h-4 w-4 text-green-500" /> Sustainability
            </div>
            {comparedProducts.map((p) => (
              <div key={p.code} className="p-2 text-center">
                <span
                  className={`text-2xl font-bold ${
                    p.scores.sustainability.score >= 80
                      ? "text-green-600"
                      : p.scores.sustainability.score >= 60
                      ? "text-yellow-600"
                      : p.scores.sustainability.score >= 40
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {p.scores.sustainability.score}
                </span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            ))}

            {/* Health Row */}
            <div className="p-2 flex items-center gap-2 text-sm font-medium">
              <Heart className="h-4 w-4 text-red-400" /> Health
            </div>
            {comparedProducts.map((p) => (
              <div key={p.code} className="p-2 text-center">
                <span
                  className={`text-2xl font-bold ${
                    p.scores.health.score >= 80
                      ? "text-green-600"
                      : p.scores.health.score >= 60
                      ? "text-yellow-600"
                      : p.scores.health.score >= 40
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {p.scores.health.score}
                </span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            ))}

            {/* Value Row */}
            <div className="p-2 flex items-center gap-2 text-sm font-medium">
              <DollarSign className="h-4 w-4 text-amber-500" /> Value
            </div>
            {comparedProducts.map((p) => (
              <div key={p.code} className="p-2 text-center">
                <span
                  className={`text-2xl font-bold ${
                    p.scores.value.score >= 80
                      ? "text-green-600"
                      : p.scores.value.score >= 60
                      ? "text-yellow-600"
                      : p.scores.value.score >= 40
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {p.scores.value.score}
                </span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products to compare</h3>
          <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
            Search for products above and click to add them. You can compare up
            to 4 products side by side.
          </p>
        </Card>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Scores are based on publicly available data from Open Food Facts.
      </p>
    </div>
  );
}
