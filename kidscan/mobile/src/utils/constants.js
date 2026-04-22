// Age groups and nutritional limits
export const AGE_GROUPS = [
  { id: '0-2', label: '0-2 years', minAge: 0, maxAge: 2 },
  { id: '3-5', label: '3-5 years', minAge: 3, maxAge: 5 },
  { id: '6-8', label: '6-8 years', minAge: 6, maxAge: 8 },
  { id: '9-12', label: '9-12 years', minAge: 9, maxAge: 12 },
];

// Sugar limits per age group (grams per serving)
export const SUGAR_LIMITS = {
  '0-2': 0,    // No added sugar recommended
  '3-5': 4,    // 1 tsp max
  '6-8': 8,    // 2 tsp max
  '9-12': 12,  // 3 tsp max
};

// Sodium limits per age group (mg per serving)
export const SODIUM_LIMITS = {
  '0-2': 200,
  '3-5': 300,
  '6-8': 400,
  '9-12': 500,
};

// Common allergens to check for
export const COMMON_ALLERGENS = [
  'milk',
  'eggs',
  'peanuts',
  'tree nuts',
  'fish',
  'shellfish',
  'soy',
  'wheat',
  'gluten',
];

// Choking hazard indicators
export const CHOKING_HAZARDS = [
  'whole nuts',
  'popcorn',
  'hard candy',
  'gum',
  'marshmallows',
  'grapes',
  'hot dogs',
  'raw carrots',
  'apple chunks',
  'cherry tomatoes',
];

// Additives to flag
export const ADDITIVES_TO_FLAG = [
  'artificial colors',
  'artificial flavors',
  'high fructose corn syrup',
  'msg',
  'trans fat',
  'hydrogenated oils',
  'aspartame',
  'saccharin',
  'sucralose',
];

// Score thresholds
export const SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  FAIR: 40,
  POOR: 20,
};

// Score colors
export const SCORE_COLORS = {
  EXCELLENT: '#4CAF50', // Green
  GOOD: '#8BC34A',      // Light Green
  FAIR: '#FFC107',      // Amber
  POOR: '#F44336',      // Red
};

// API endpoints
export const API_ENDPOINTS = {
  OPEN_FOOD_FACTS: 'https://world.openfoodfacts.org/api/v0/product',
  USDA_FOOD_DATA: 'https://api.nal.usda.gov/fdc/v1/foods/search',
};

// Default product image
export const DEFAULT_PRODUCT_IMAGE = 'https://via.placeholder.com/150?text=No+Image';

// App configuration
export const APP_CONFIG = {
  APP_NAME: 'KidScan',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@kidscan.app',
  PRIVACY_POLICY_URL: 'https://kidscan.app/privacy',
  TERMS_URL: 'https://kidscan.app/terms',
};