"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductInfoProps {
  ingredients: string;
  allergens: string[];
  packaging: string;
  origins: string;
  labels: string[];
  novaGroup: number | null;
}

export function ProductInfo({
  ingredients,
  allergens,
  packaging,
  origins,
  labels,
  novaGroup,
}: ProductInfoProps) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold text-sm mb-3">Product Details</h3>
      <div className="space-y-3">
        {ingredients && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Ingredients</p>
            <p className="text-sm leading-relaxed">{ingredients}</p>
          </div>
        )}

        {allergens.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Allergens{" "}
                <span className="text-red-500">⚠</span>
              </p>
              <div className="flex flex-wrap gap-1">
                {allergens.map((a, i) => (
                  <Badge key={i} variant="destructive" className="text-xs">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {labels.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Certifications & Labels</p>
              <div className="flex flex-wrap gap-1">
                {labels.map((l, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {l}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {packaging && (
          <>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Packaging</p>
              <p className="text-sm">{packaging}</p>
            </div>
          </>
        )}

        {origins && (
          <>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Origin</p>
              <p className="text-sm">{origins}</p>
            </div>
          </>
        )}

        {novaGroup !== null && (
          <>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Processing Level (NOVA)</p>
              <p className="text-sm">
                {novaGroup === 1
                  ? "Group 1 - Unprocessed or minimally processed"
                  : novaGroup === 2
                  ? "Group 2 - Processed culinary ingredients"
                  : novaGroup === 3
                  ? "Group 3 - Processed foods"
                  : novaGroup === 4
                  ? "Group 4 - Ultra-processed foods"
                  : `Group ${novaGroup}`}
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
