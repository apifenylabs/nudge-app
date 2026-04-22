import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

// Open Food Facts API client
class OpenFoodFactsAPI {
  constructor() {
    this.baseURL = API_ENDPOINTS.OPEN_FOOD_FACTS;
    this.client = axios.create({
      timeout: 10000,
      headers: {
        'User-Agent': 'KidScan - Food Safety App - Version 1.0',
      },
    });
  }

  /**
   * Get product by barcode
   * @param {string} barcode - Product barcode
   * @returns {Promise<Object>} Product data
   */
  async getProductByBarcode(barcode) {
    try {
      const response = await this.client.get(`${this.baseURL}/${barcode}.json`);
      
      if (response.data.status === 0) {
        throw new Error('Product not found');
      }

      return this.normalizeProductData(response.data.product);
    } catch (error) {
      console.error('OpenFoodFacts API error:', error.message);
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }

  /**
   * Normalize product data from Open Food Facts
   * @param {Object} product - Raw product data
   * @returns {Object} Normalized product
   */
  normalizeProductData(product) {
    return {
      id: product._id || product.code,
      barcode: product.code,
      name: product.product_name || 'Unknown Product',
      brand: product.brands || product.brand_owner || 'Unknown Brand',
      categories: product.categories || '',
      ingredients: product.ingredients_text || '',
      imageUrl: product.image_url || product.image_front_url || null,
      
      // Nutritional information
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

      // Allergens
      allergens: product.allergens || '',
      allergenTags: product.allergens_tags || [],
      
      // Additives
      additives: product.additives_tags || [],
      
      // Nova group (processing level)
      novaGroup: product.nova_group || 0,
      
      // Nutri-Score
      nutriScore: product.nutrition_grades || 'unknown',
      
      // Serving size
      servingSize: product.serving_size || '100g',
      
      // Raw data for reference
      rawData: product,
    };
  }

  /**
   * Search products by name
   * @param {string} query - Search query
   * @param {number} page - Page number
   * @returns {Promise<Array>} Search results
   */
  async searchProducts(query, page = 1) {
    try {
      const response = await this.client.get('https://world.openfoodfacts.org/cgi/search.pl', {
        params: {
          search_terms: query,
          page,
          json: 1,
          page_size: 20,
        },
      });

      return response.data.products
        .filter(product => product.product_name)
        .map(product => this.normalizeProductData(product));
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }
}

// USDA Food Data Central API (for additional verification)
class USDAFoodDataAPI {
  constructor() {
    this.baseURL = API_ENDPOINTS.USDA_FOOD_DATA;
    this.apiKey = process.env.USDA_API_KEY || ''; // Would need API key for full access
    this.client = axios.create({
      timeout: 10000,
    });
  }

  /**
   * Search for food items
   * @param {string} query - Food name
   * @returns {Promise<Array>} Search results
   */
  async searchFood(query) {
    if (!this.apiKey) {
      console.warn('USDA API key not configured');
      return [];
    }

    try {
      const response = await this.client.get(this.baseURL, {
        params: {
          api_key: this.apiKey,
          query,
          pageSize: 10,
        },
      });

      return response.data.foods || [];
    } catch (error) {
      console.error('USDA API error:', error.message);
      return [];
    }
  }
}

// Local cache for products
class ProductCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 100; // Cache up to 100 products
  }

  get(barcode) {
    const item = this.cache.get(barcode);
    if (item && Date.now() - item.timestamp < 3600000) { // 1 hour cache
      return item.data;
    }
    return null;
  }

  set(barcode, data) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest item
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(barcode, {
      data,
      timestamp: Date.now(),
    });
  }

  clear() {
    this.cache.clear();
  }
}

// Main API service
class APIService {
  constructor() {
    this.openFoodFacts = new OpenFoodFactsAPI();
    this.usdaFoodData = new USDAFoodDataAPI();
    this.cache = new ProductCache();
  }

  /**
   * Get product with caching
   * @param {string} barcode - Product barcode
   * @returns {Promise<Object>} Product data
   */
  async getProduct(barcode) {
    // Check cache first
    const cached = this.cache.get(barcode);
    if (cached) {
      console.log('Returning cached product');
      return cached;
    }

    // Fetch from API
    const product = await this.openFoodFacts.getProductByBarcode(barcode);
    
    // Cache the result
    this.cache.set(barcode, product);
    
    return product;
  }

  /**
   * Verify product data with multiple sources
   * @param {Object} product - Product to verify
   * @returns {Promise<Object>} Verified product with confidence score
   */
  async verifyProduct(product) {
    const verificationResults = {
      sources: 1, // We have Open Food Facts
      confidence: 0.7, // Base confidence
      warnings: [],
      verifiedData: { ...product },
    };

    // TODO: Implement multi-source verification
    // 1. Check USDA database
    // 2. Cross-reference with other free APIs
    // 3. Validate nutritional values
    
    return verificationResults;
  }
}

// Export singleton instance
export default new APIService();