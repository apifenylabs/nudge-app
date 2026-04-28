"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Heart, DollarSign, Star } from "lucide-react";

import { getProduct, getBeautyProduct } from "@/lib/api";
import { calculateAllScores } from "@/lib/score";
import type { OpenFoodFactsProduct, ProductScores } from "@/lib/types";
import { ScoreCard, ScoreCardSkeleton } from "@/components/ScoreCard";
import { ProductInfo } from "@/components/ProductInfo";
import { ErrorState } from "@/components/States";

type PageState = "loading" | "loaded" | "not-found" | "error";

export default function ProductDetailPage() {
  const params = useParams();
  const barcode = params.id as string;

  const [state, setState] = useState<PageState>("loading");
  const [product, setProduct] = useState<OpenFoodFactsProduct["product"] | null>(null);
  const [scores, setScores] = useState<ProductScores | null>(null);
  const [error, setError] = useState("");

  const fetchProduct = useCallback(async () => {
    if (!barcode) return;
    setState("loading");

    try {
      // First try Open Food Facts
      let data = await getProduct(barcode);
      let isBeauty = !data;

      // If not found, try Open Beauty Facts
      if (!data) {
        data = await getBeautyProduct(barcode);
        isBeauty = true;
      }

      if (!data || !data.product) {
        setState("not-found");
        return;
      }

      setProduct(data.product);
      const calculatedScores = calculateAllScores(data.product);
      setScores(calculatedScores);
      setState("loaded");
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error ? err.message : "Failed to load product data"
      );
    }
  }, [barcode]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (state === "loading") {
    return (
      <div className="space-y-6">
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (state === "not-found") {
    return (
      <div className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>
        <ErrorState
          message={`Product with code "${barcode}" was not found in our database.`}
        />
      </div>
    );
  }

  if (state === "error" || !product || !scores) {
    return (
      <div className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>
        <ErrorState message={error} onRetry={fetchProduct} />
      </div>
    );
  }

  const name = product.product_name || "Unknown Product";
  const brand = product.brands || "";
  const category = product.categories || "";
  const imageUrl =
    product.image_front_small_url || product.image_small_url || product.image_url || null;
  const quantity = product.quantity || "";
  const ingredients = product.ingredients_text || "";
  const allergens = product.allergens_tags ?? [];
  const packaging = product.packaging_text || (product.packaging_tags ?? []).join(", ");
  const origins = product.origins || "";
  const labels = (product.labels_tags ?? []).map((l: string) =>
    l.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/[_-]/g, " ")
  );
  const novaGroup = product.nova_group ?? null;

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to search
      </Link>

      {/* Product Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-48 h-48 mx-auto md:mx-0 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain p-2"
              sizes="192px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <svg
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold mb-1">{name}</h1>
          {brand && (
            <p className="text-muted-foreground mb-1">{brand}</p>
          )}
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {category && <span>{category}</span>}
            {quantity && (
              <>
                {category && <span className="text-muted-foreground/50">|</span>}
                <span>{quantity}</span>
              </>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] border-border bg-background hover:bg-muted hover:text-foreground border text-sm font-medium whitespace-nowrap transition-colors"
            >
              Compare Products
            </Link>
          </div>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard
          title="Overall"
          score={scores.overall.score}
          icon={<Star className="h-4 w-4" />}
          breakdown={[
            {
              factor: "Sustainability",
              score: scores.overall.breakdown.sustainability,
              max: 100,
            },
            {
              factor: "Health",
              score: scores.overall.breakdown.health,
              max: 100,
            },
            {
              factor: "Value",
              score: scores.overall.breakdown.value,
              max: 100,
            },
          ]}
        />
        <ScoreCard
          title="Sustainability"
          score={scores.sustainability.score}
          icon={<Leaf className="h-4 w-4" />}
          grade={scores.sustainability.grade?.toUpperCase()}
          breakdown={scores.sustainability.breakdown}
        />
        <ScoreCard
          title="Health"
          score={scores.health.score}
          icon={<Heart className="h-4 w-4" />}
          grade={scores.health.grade?.toUpperCase()}
          breakdown={scores.health.breakdown}
        />
        <ScoreCard
          title="Value"
          score={scores.value.score}
          icon={<DollarSign className="h-4 w-4" />}
          breakdown={scores.value.breakdown}
        />
      </div>

      {/* Product Info */}
      <ProductInfo
        ingredients={ingredients}
        allergens={allergens}
        packaging={packaging}
        origins={origins}
        labels={labels}
        novaGroup={novaGroup}
      />

      <p className="text-xs text-muted-foreground text-center">
        Data sourced from Open Food Facts. Scores are estimates based on available data.
      </p>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-48 h-48 mx-auto md:mx-0 rounded-lg bg-muted animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <ScoreCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
