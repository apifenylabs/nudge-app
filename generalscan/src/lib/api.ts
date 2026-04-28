import type { OpenFoodFactsProduct, SearchResponse, SearchResult } from "./types";

const OPENFOODFACTS_URL = "https://world.openfoodfacts.org";
const OPENBEAUTY_URL = "https://world.openbeautyfacts.org";

export interface FetchOptions {
  signal?: AbortSignal;
}

async function fetchJSON<T>(url: string, opts?: FetchOptions): Promise<T> {
  const response = await fetch(url, {
    headers: { "User-Agent": "GeneralScan/1.0 (product-scanner; chris@example.com)" },
    signal: opts?.signal,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Search products by name via Open Food Facts
 */
export async function searchProducts(
  query: string,
  opts?: FetchOptions
): Promise<SearchResult[]> {
  const url = `${OPENFOODFACTS_URL}/cgi/search.pl?search_terms=${encodeURIComponent(
    query
  )}&json=1&page_size=20`;
  const data = await fetchJSON<SearchResponse>(url, opts);
  return data.products ?? [];
}

/**
 * Get a single product by barcode via Open Food Facts
 */
export async function getProduct(
  barcode: string,
  opts?: FetchOptions
): Promise<OpenFoodFactsProduct | null> {
  const url = `${OPENFOODFACTS_URL}/api/v2/product/${encodeURIComponent(barcode)}`;
  const data = await fetchJSON<OpenFoodFactsProduct>(url, opts);
  if (data.status === 0) return null;
  return data;
}

/**
 * Search beauty products by name via Open Beauty Facts
 */
export async function searchBeautyProducts(
  query: string,
  opts?: FetchOptions
): Promise<SearchResult[]> {
  const url = `${OPENBEAUTY_URL}/cgi/search.pl?search_terms=${encodeURIComponent(
    query
  )}&json=1&page_size=20`;
  const data = await fetchJSON<SearchResponse>(url, opts);
  return data.products ?? [];
}

/**
 * Get a single beauty product by barcode via Open Beauty Facts
 */
export async function getBeautyProduct(
  barcode: string,
  opts?: FetchOptions
): Promise<OpenFoodFactsProduct | null> {
  const url = `${OPENBEAUTY_URL}/api/v2/product/${encodeURIComponent(barcode)}`;
  const data = await fetchJSON<OpenFoodFactsProduct>(url, opts);
  if (data.status === 0) return null;
  return data;
}

/**
 * Try to detect if a search query is likely a beauty product
 * based on common beauty/cosmetic keywords
 */
export function isBeautyQuery(query: string): boolean {
  const beautyKeywords = [
    "shampoo", "conditioner", "soap", "lotion", "cream", "moisturizer",
    "lipstick", "foundation", "mascara", "eyeliner", "perfume", "cologne",
    "deodorant", "sunscreen", "toothpaste", "serum", "face wash", "body wash",
    "shaving", "makeup", "cosmetic", "skincare", "hair care",
  ];
  const lower = query.toLowerCase();
  return beautyKeywords.some((kw) => lower.includes(kw));
}
