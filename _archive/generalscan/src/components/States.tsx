"use client";

import { AlertCircle, SearchX, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <Card className={cn("p-8 text-center", className)}>
      <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">Oops!</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </Card>
  );
}

interface EmptyStateProps {
  className?: string;
}

export function EmptyState({ className }: EmptyStateProps) {
  return (
    <Card className={cn("p-8 text-center", className)}>
      <SearchX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No products found</h3>
      <p className="text-muted-foreground">
        Try a different search term, or check the spelling.
      </p>
    </Card>
  );
}

interface NoResultsStateProps {
  query: string;
  className?: string;
}

export function NoResultsState({ query, className }: NoResultsStateProps) {
  return (
    <Card className={cn("p-8 text-center", className)}>
      <SearchX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No results for &ldquo;{query}&rdquo;</h3>
      <p className="text-muted-foreground">
        We couldn&apos;t find any products matching your search. Try a different term.
      </p>
    </Card>
  );
}

interface WelcomeStateProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export function WelcomeState({ className }: WelcomeStateProps) {
  return (
    <div className={cn("text-center max-w-md mx-auto py-12", className)}>
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">GeneralScan</h2>
      <p className="text-muted-foreground mb-6">
        Search any product to see its sustainability score, health rating, and value.
        Make informed choices for your health and the planet.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <div className="p-3 rounded-lg border bg-muted/50">
          <div className="font-semibold text-sm text-green-600 mb-1">🌱 Sustainability</div>
          <p className="text-xs text-muted-foreground">
            Eco-score, packaging, certifications
          </p>
        </div>
        <div className="p-3 rounded-lg border bg-muted/50">
          <div className="font-semibold text-sm text-blue-600 mb-1">💚 Health</div>
          <p className="text-xs text-muted-foreground">
            Nutri-Score, ingredients, allergens
          </p>
        </div>
        <div className="p-3 rounded-lg border bg-muted/50">
          <div className="font-semibold text-sm text-amber-600 mb-1">💰 Value</div>
          <p className="text-xs text-muted-foreground">
            Brand quality, nutrition, completeness
          </p>
        </div>
      </div>
    </div>
  );
}
