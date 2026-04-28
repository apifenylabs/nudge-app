"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getScoreColor, getScoreLabel } from "@/lib/utils";
import { SearchResult } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: SearchResult;
}

export function ProductCard({ product }: ProductCardProps) {
  const name = product.product_name || "Unknown Product";
  const brand = product.brands || "";
  const imageUrl = product.image_small_url || product.image_url || null;
  const ecoscore = product.ecoscore_grade?.toUpperCase();
  const nutriscore = product.nutriscore_grade?.toUpperCase();

  return (
    <Link href={`/product/${product.code}`} className="block">
      <Card className="flex gap-4 p-4 hover:shadow-md transition-shadow cursor-pointer group">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain p-1"
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
            {name}
          </h3>
          {brand && (
            <p className="text-xs text-muted-foreground truncate">{brand}</p>
          )}
          {product.quantity && (
            <p className="text-xs text-muted-foreground">{product.quantity}</p>
          )}
          <div className="flex gap-1.5 mt-2">
            {nutriscore && (
              <Badge
                variant="secondary"
                className={`text-xs ${
                  nutriscore === "A" || nutriscore === "B"
                    ? "bg-green-100 text-green-800"
                    : nutriscore === "C"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                Health: {nutriscore}
              </Badge>
            )}
            {ecoscore && (
              <Badge
                variant="secondary"
                className={`text-xs ${
                  ecoscore === "A" || ecoscore === "B"
                    ? "bg-green-100 text-green-800"
                    : ecoscore === "C"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                Eco: {ecoscore}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex gap-4 p-4">
      <Skeleton className="w-20 h-20 flex-shrink-0 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </Card>
  );
}
