export interface OpenFoodFactsProduct {
  code: string;
  product: {
    product_name?: string;
    brands?: string;
    categories?: string;
    categories_tags?: string[];
    image_url?: string;
    nutriscore_grade?: string;
    ecoscore_grade?: string;
    ecoscore_data?: {
      packaging?: { score?: number };
      environment?: { score?: number };
      resources?: { score?: number };
    };
    ingredients?: { id: string; text: string; rank?: number }[];
    ingredients_text?: string;
    allergens?: string;
    allergens_tags?: string[];
    labels?: string;
    labels_tags?: string[];
    labels_hierarchy?: string[];
    packaging_text?: string;
    packaging_tags?: string[];
    origins?: string;
    origins_tags?: string[];
    quantity?: string;
    serving_size?: string;
    nutrition_grades?: string;
    nutrient_levels?: Record<string, string>;
    nova_group?: number;
    additive_tags?: string[];
    image_small_url?: string;
    image_front_small_url?: string;
    [key: string]: unknown;
  };
  status: number;
  status_verbose: string;
}

export interface SearchResult {
  code: string;
  product_name?: string;
  brands?: string;
  image_url?: string;
  image_small_url?: string;
  nutriscore_grade?: string;
  ecoscore_grade?: string;
  categories?: string;
  quantity?: string;
}

export interface SearchResponse {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: SearchResult[];
}

export interface ScoreBreakdown {
  factor: string;
  score: number;
  max: number;
  label?: string;
}

export interface ProductScores {
  sustainability: {
    score: number;
    breakdown: ScoreBreakdown[];
    grade?: string;
  };
  health: {
    score: number;
    breakdown: ScoreBreakdown[];
    grade?: string;
  };
  value: {
    score: number;
    breakdown: ScoreBreakdown[];
  };
  overall: {
    score: number;
    breakdown: { sustainability: number; health: number; value: number };
  };
}

export interface ScoredProduct {
  code: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string | null;
  quantity: string;
  scores: ProductScores;
  ingredients: string;
  allergens: string[];
  packaging: string;
  origins: string;
  labels: string[];
  novaGroup: number | null;
  nutriscoreGrade: string | null;
  ecoscoreGrade: string | null;
}

export const NUTRI_SCORE_LABELS: Record<string, { label: string; color: string }> = {
  a: { label: "Excellent", color: "bg-green-600" },
  b: { label: "Good", color: "bg-green-400" },
  c: { label: "Average", color: "bg-yellow-400" },
  d: { label: "Poor", color: "bg-orange-500" },
  e: { label: "Bad", color: "bg-red-600" },
};

export const ECO_SCORE_LABELS: Record<string, { label: string; color: string }> = {
  a: { label: "Excellent", color: "bg-green-600" },
  b: { label: "Good", color: "bg-green-400" },
  c: { label: "Average", color: "bg-yellow-400" },
  d: { label: "Poor", color: "bg-orange-500" },
  e: { label: "Bad", color: "bg-red-600" },
};
