const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Open Food Facts API base URL
const OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/v0/product';

// In-memory cache for products
const productCache = new Map();
const CACHE_DURATION = 3600000; // 1 hour

/**
 * Get product from Open Food Facts
 */
async function getProductFromOpenFoodFacts(barcode) {
  try {
    const response = await axios.get(`${OPEN_FOOD_FACTS_API}/${barcode}.json`, {
      timeout: 10000,
      headers: {
        'User-Agent': 'KidScan Verification Server - Version 1.0',
      },
    });

    if (response.data.status === 0) {
      throw new Error('Product not found in Open Food Facts');
    }

    return normalizeProductData(response.data.product);
  } catch (error) {
    console.error('OpenFoodFacts API error:', error.message);
    throw error;
  }
}

/**
 * Normalize product data
 */
function normalizeProductData(product) {
  return {
    id: product._id || product.code,
    barcode: product.code,
    name: product.product_name || 'Unknown Product',
    brand: product.brands || product.brand_owner || 'Unknown Brand',
    categories: product.categories || '',
    ingredients: product.ingredients_text || '',
    imageUrl: product.image_url || product.image_front_url || null,
    
    nutrition: {
      energy: product.nutriments?.energy_100g || 0,
      protein: product.nutriments?.proteins_100g || 0,
      carbs: product.nutriments?.carbohydrates_100g || 0,
      sugar: product.nutriments?.sugars_100g || 0,
      fat: product.nutriments?.fat_100g || 0,
      saturatedFat: product.nutriments?.['saturated-fat_100g'] || 0,
      fiber: product.nutriments?.fiber_100g || 0,
      sodium: product.nutriments?.sodium_100g || 0,
      salt: product.nutriments?.salt_100g || 0,
    },

    allergens: product.allergens || '',
    allergenTags: product.allergens_tags || [],
    additives: product.additives_tags || [],
    novaGroup: product.nova_group || 0,
    nutriScore: product.nutrition_grades || 'unknown',
    servingSize: product.serving_size || '100g',
    
    // Source information
    sources: ['openfoodfacts'],
    lastUpdated: new Date().toISOString(),
    
    // Raw data for reference
    rawData: product,
  };
}

/**
 * Calculate age-specific scores
 */
function calculateAgeScores(product) {
  const ageGroups = [
    { id: '0-2', label: '0-2 years', minAge: 0, maxAge: 2 },
    { id: '3-5', label: '3-5 years', minAge: 3, maxAge: 5 },
    { id: '6-8', label: '6-8 years', minAge: 6, maxAge: 8 },
    { id: '9-12', label: '9-12 years', minAge: 9, maxAge: 12 },
  ];

  const scores = {};
  
  ageGroups.forEach(ageGroup => {
    scores[ageGroup.id] = calculateScoreForAge(product, ageGroup.id);
  });
  
  return scores;
}

/**
 * Calculate score for specific age group
 */
function calculateScoreForAge(product, ageGroupId) {
  let score = 50; // Base score
  
  const warnings = [];
  const recommendations = [];
  
  // Simple scoring logic (same as mobile, for consistency)
  const sugar = product.nutrition?.sugar || 0;
  const sodium = product.nutrition?.sodium || 0;
  
  // Age-specific limits
  const sugarLimits = { '0-2': 0, '3-5': 4, '6-8': 8, '9-12': 12 };
  const sodiumLimits = { '0-2': 200, '3-5': 300, '6-8': 400, '9-12': 500 };
  
  // Sugar evaluation
  if (sugar === 0) {
    score += 10;
    recommendations.push('No added sugar - excellent choice!');
  } else if (sugar <= sugarLimits[ageGroupId]) {
    score += 5;
  } else if (sugar <= sugarLimits[ageGroupId] * 2) {
    score -= 10;
    warnings.push(`High sugar content (${sugar}g) for ${ageGroupId}`);
  } else {
    score -= 20;
    warnings.push(`Very high sugar content (${sugar}g) - not recommended`);
  }
  
  // Sodium evaluation
  if (sodium === 0) {
    score += 5;
  } else if (sodium <= sodiumLimits[ageGroupId]) {
    score += 3;
  } else if (sodium <= sodiumLimits[ageGroupId] * 2) {
    score -= 8;
    warnings.push(`High sodium content (${sodium}mg) for ${ageGroupId}`);
  } else {
    score -= 15;
    warnings.push(`Very high sodium content (${sodium}mg) - not recommended`);
  }
  
  // Allergen check
  const ingredients = (product.ingredients || '').toLowerCase();
  const commonAllergens = ['milk', 'eggs', 'peanuts', 'tree nuts', 'fish', 'shellfish', 'soy', 'wheat', 'gluten'];
  const foundAllergens = commonAllergens.filter(allergen => ingredients.includes(allergen));
  
  if (foundAllergens.length > 0) {
    score -= 15;
    warnings.push(`Contains: ${foundAllergens.join(', ')}`);
  }
  
  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, Math.round(score)));
  
  // Determine score level
  let level = 'POOR';
  let color = '#F44336'; // Red
  
  if (score >= 80) {
    level = 'EXCELLENT';
    color = '#4CAF50'; // Green
  } else if (score >= 60) {
    level = 'GOOD';
    color = '#8BC34A'; // Light Green
  } else if (score >= 40) {
    level = 'FAIR';
    color = '#FFC107'; // Amber
  }
  
  return {
    score,
    level,
    color,
    warnings,
    recommendations,
  };
}

/**
 * Generate summary
 */
function generateSummary(product, ageScores) {
  const primaryScore = ageScores['3-5']; // Default to preschool age
  
  const allWarnings = [];
  const allRecommendations = [];
  
  Object.values(ageScores).forEach(score => {
    allWarnings.push(...(score.warnings || []));
    allRecommendations.push(...(score.recommendations || []));
  });
  
  const uniqueWarnings = [...new Set(allWarnings.filter(Boolean))];
  const uniqueRecommendations = [...new Set(allRecommendations.filter(Boolean))];
  
  return {
    overallScore: primaryScore.score,
    overallLevel: primaryScore.level,
    overallColor: primaryScore.color,
    warnings: uniqueWarnings,
    recommendations: uniqueRecommendations,
  };
}

// API Routes

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'KidScan Verification API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/product/:barcode
 * Get product information with age scores
 */
app.get('/api/product/:barcode', async (req, res) => {
  const { barcode } = req.params;
  
  // Check cache
  const cached = productCache.get(barcode);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Returning cached product: ${barcode}`);
    return res.json(cached.data);
  }
  
  try {
    console.log(`Fetching product: ${barcode}`);
    
    // Get product data
    const product = await getProductFromOpenFoodFacts(barcode);
    
    // Calculate age scores
    const ageScores = calculateAgeScores(product);
    
    // Generate summary
    const summary = generateSummary(product, ageScores);
    
    const response = {
      success: true,
      product,
      ageScores,
      summary,
      barcode,
      cached: false,
      timestamp: new Date().toISOString(),
    };
    
    // Cache the result
    productCache.set(barcode, {
      data: response,
      timestamp: Date.now(),
    });
    
    res.json(response);
    
  } catch (error) {
    console.error(`Error fetching product ${barcode}:`, error.message);
    
    res.status(404).json({
      success: false,
      error: error.message,
      barcode,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * POST /api/verify
 * Verify product data (for future multi-source verification)
 */
app.post('/api/verify', async (req, res) => {
  const { barcode } = req.body;
  
  if (!barcode) {
    return res.status(400).json({
      success: false,
      error: 'Barcode is required',
    });
  }
  
  try {
    // For now, just return the product data
    // In future, this will implement multi-source verification
    const product = await getProductFromOpenFoodFacts(barcode);
    const ageScores = calculateAgeScores(product);
    const summary = generateSummary(product, ageScores);
    
    res.json({
      success: true,
      product,
      ageScores,
      summary,
      verification: {
        sources: 1,
        confidence: 0.7,
        needsHumanReview: false,
        notes: 'Single source verification (Open Food Facts)',
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/cache/stats
 * Get cache statistics (admin endpoint)
 */
app.get('/api/cache/stats', (req, res) => {
  res.json({
    cacheSize: productCache.size,
    cachedProducts: Array.from(productCache.keys()),
    timestamp: new Date().toISOString(),
  });
});

/**
 * DELETE /api/cache/:barcode
 * Clear cache for specific barcode
 */
app.delete('/api/cache/:barcode', (req, res) => {
  const { barcode } = req.params;
  const deleted = productCache.delete(barcode);
  
  res.json({
    success: true,
    deleted,
    barcode,
    message: deleted ? 'Cache cleared' : 'Product not in cache',
  });
});

/**
 * DELETE /api/cache
 * Clear all cache
 */
app.delete('/api/cache', (req, res) => {
  const previousSize = productCache.size;
  productCache.clear();
  
  res.json({
    success: true,
    cleared: previousSize,
    message: `Cleared ${previousSize} items from cache`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`KidScan Verification API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Product endpoint: http://localhost:${PORT}/api/product/{barcode}`);
});