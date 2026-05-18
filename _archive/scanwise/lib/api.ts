// Open Food Facts API client

const OFF_BASE = "https://world.openfoodfacts.org/api/v2";
const OBF_BASE = "https://world.openbeautyfacts.org/api/v2";

export interface OpenFoodFactsProduct {
  code: string;
  product: {
    product_name?: string;
    brands?: string;
    categories?: string;
    ingredients_text?: string;
    ingredients?: Array<{ id: string; text: string; rank?: number }>;
    nutriscore_grade?: string;
    nova_group?: number;
    nutriments?: Record<string, number>;
    image_url?: string;
    image_small_url?: string;
    nutrition_grade_fr?: string;
    ecoscore_grade?: string;
    additives_tags?: string[];
    allergens_tags?: string[];
    labels_tags?: string[];
    packaging_text?: string;
    serving_size?: string;
    quantity?: string;
    countries_tags?: string[];
    _keywords?: string[];
  };
  status: number;
  status_verbose: string;
}

export interface SearchResult {
  code: string;
  product_name: string;
  brands: string;
  image_url: string;
  nutriscore_grade: string;
  nova_group: number;
  categories: string;
}

export interface SearchResponse {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: SearchResult[];
}

/**
 * Search for products by name
 */
export async function searchProducts(
  query: string,
  page = 1,
  pageSize = 20
): Promise<SearchResponse> {
  const url = `${OFF_BASE}/search?q=${encodeURIComponent(
    query
  )}&page=${page}&page_size=${pageSize}&json=true`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(`Open Food Facts search failed: ${res.status}`);
  }

  return res.json();
}

/**
 * Get product by barcode
 */
export async function getProductByCode(
  code: string
): Promise<OpenFoodFactsProduct> {
  const url = `${OFF_BASE}/product/${code}.json`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(`Open Food Facts lookup failed: ${res.status}`);
  }

  const data: OpenFoodFactsProduct = await res.json();

  if (data.status === 0) {
    throw new Error(`Product not found: ${data.status_verbose}`);
  }

  return data;
}

/**
 * Get a random product (for Surprise Me)
 */
export async function getRandomProduct(): Promise<OpenFoodFactsProduct> {
  // Search for a broad random term to get variety
  const randomTerms = [
    "food",
    "organic",
    "snack",
    "drink",
    "sauce",
    "cheese",
    "chocolate",
    "cereal",
    "pasta",
    "soup",
    "cookie",
    "yogurt",
    "bread",
    "rice",
    "oil",
  ];
  const term = randomTerms[Math.floor(Math.random() * randomTerms.length)];
  const page = Math.floor(Math.random() * 50) + 1;

  const results = await searchProducts(term, page, 20);

  if (!results.products || results.products.length === 0) {
    throw new Error("No random product found");
  }

  const random =
    results.products[Math.floor(Math.random() * results.products.length)];

  return getProductByCode(random.code);
}

/**
 * Get a random surprise hook
 */
export function getRandomHook(): string {
  const hooks: Array<{ hook: string }> = [];
  // Using dynamic import workaround — the hooks are loaded in the component
  return "";
}
