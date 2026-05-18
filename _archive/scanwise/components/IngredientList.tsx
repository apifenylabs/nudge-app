"use client";

import { analyzeIngredients } from "@/lib/score";
import { Badge } from "@/components/ui/badge";

interface IngredientListProps {
  ingredientsText?: string;
  additivesTags?: string[];
}

export default function IngredientList({
  ingredientsText,
  additivesTags,
}: IngredientListProps) {
  const { flagged, cleanCount, total } = analyzeIngredients(
    ingredientsText,
    additivesTags
  );

  if (!ingredientsText && (!additivesTags || additivesTags.length === 0)) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No ingredient data available for this product.
        </p>
      </div>
    );
  }

  // Split ingredients into list items
  const ingredientItems =
    ingredientsText
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {total} ingredients total
        </span>
        <span className="text-gray-300 dark:text-gray-600">·</span>
        <span className="text-emerald-600 dark:text-emerald-400">
          {cleanCount} clean
        </span>
        {flagged.length > 0 && (
          <>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className="text-red-500">
              {flagged.length} flagged
            </span>
          </>
        )}
      </div>

      {/* Flagged ingredients */}
      {flagged.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-red-600 dark:text-red-400">
            ⚠️ Flagged Ingredients
          </h4>
          <div className="space-y-2">
            {flagged.map((item, i) => (
              <div
                key={i}
                className={`rounded-lg border p-3 ${
                  item.severity === "dirty"
                    ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
                    : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-medium text-sm">{item.name}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.reason}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.severity === "dirty" ? "destructive" : "secondary"
                    }
                  >
                    {item.severity === "dirty" ? "Dirty ❌" : "Caution ⚠️"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full ingredient list (collapsible) */}
      {ingredientItems.length > 0 && (
        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
            Full Ingredient List ({ingredientItems.length})
          </summary>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {ingredientItems.map((ingredient, i) => {
              const isFlagged = flagged.some((f) =>
                ingredient.toLowerCase().includes(f.name.toLowerCase().split(" ")[0])
              );
              return (
                <span
                  key={i}
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs ${
                    isFlagged
                      ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {ingredient}
                </span>
              );
            })}
          </div>
        </details>
      )}
    </div>
  );
}
