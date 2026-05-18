"use client";

import { useState, useCallback } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { WelcomeState, NoResultsState, ErrorState } from "@/components/States";
import { searchProducts, searchBeautyProducts, isBeautyQuery } from "@/lib/api";
import type { SearchResult } from "@/lib/types";

type SearchState = "idle" | "searching" | "results" | "empty" | "error";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>("idle");
  const [products, setProducts] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string>("");

  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    setState("searching");
    setError("");

    try {
      let results: SearchResult[];

      // Detect if beauty query and route accordingly
      if (isBeautyQuery(searchQuery)) {
        results = await searchBeautyProducts(searchQuery);
      } else {
        results = await searchProducts(searchQuery);
      }

      if (results.length === 0) {
        setState("empty");
        setProducts([]);
      } else {
        setState("results");
        setProducts(results);
      }
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error ? err.message : "Failed to search products"
      );
      setProducts([]);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Know What You&apos;re Buying
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Search a product name to see its sustainability score, health rating,
          and value. Make informed choices for your health and the planet.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} isSearching={state === "searching"} />

      {state === "idle" && <WelcomeState />}

      {state === "searching" && (
        <div>
          <p className="text-sm text-muted-foreground mb-3">
            Searching for &ldquo;{query}&rdquo;...
          </p>
          <LoadingSkeleton />
        </div>
      )}

      {state === "results" && (
        <div>
          <p className="text-sm text-muted-foreground mb-3">
            Found {products.length} result{products.length !== 1 ? "s" : ""} for
            &ldquo;{query}&rdquo;
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>
        </div>
      )}

      {state === "empty" && <NoResultsState query={query} />}

      {state === "error" && (
        <ErrorState
          message={error}
          onRetry={() => handleSearch(query)}
        />
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[...Array(6)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
