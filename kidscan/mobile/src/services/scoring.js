import {
  AGE_GROUPS,
  SUGAR_LIMITS,
  SODIUM_LIMITS,
  COMMON_ALLERGENS,
  CHOKING_HAZARDS,
  ADDITIVES_TO_FLAG,
  SCORE_THRESHOLDS,
  SCORE_COLORS,
} from '../utils/constants';

/**
 * Age-specific scoring service for KidScan
 */
class ScoringService {
  /**
   * Calculate age-specific scores for a product
   * @param {Object} product - Product data
   * @returns {Object} Scores for each age group
   */
  calculateAgeScores(product) {
    const scores = {};
    
    AGE_GROUPS.forEach(ageGroup => {
      scores[ageGroup.id] = this.calculateScoreForAge(product, ageGroup.id);
    });
    
    return scores;
  }

  /**
   * Calculate score for specific age group
   * @param {Object} product - Product data
   * @param {string} ageGroupId - Age group ID
   * @returns {Object} Score details
   */
  calculateScoreForAge(product, ageGroupId) {
    let score = 50; // Base score
    
    const warnings = [];
    const recommendations = [];
    
    // 1. Check sugar content
    const sugarScore = this.evaluateSugar(product, ageGroupId);
    score += sugarScore.adjustment;
    if (sugarScore.warning) warnings.push(sugarScore.warning);
    if (sugarScore.recommendation) recommendations.push(sugarScore.recommendation);
    
    // 2. Check sodium/salt content
    const sodiumScore = this.evaluateSodium(product, ageGroupId);
    score += sodiumScore.adjustment;
    if (sodiumScore.warning) warnings.push(sodiumScore.warning);
    if (sodiumScore.recommendation) recommendations.push(sodiumScore.recommendation);
    
    // 3. Check allergens
    const allergenScore = this.evaluateAllergens(product);
    score += allergenScore.adjustment;
    if (allergenScore.warning) warnings.push(allergenScore.warning);
    
    // 4. Check choking hazards
    const chokingScore = this.evaluateChokingHazards(product, ageGroupId);
    score += chokingScore.adjustment;
    if (chokingScore.warning) warnings.push(chokingScore.warning);
    if (chokingScore.recommendation) recommendations.push(chokingScore.recommendation);
    
    // 5. Check additives
    const additiveScore = this.evaluateAdditives(product);
    score += additiveScore.adjustment;
    if (additiveScore.warning) warnings.push(additiveScore.warning);
    
    // 6. Check processing level (Nova group)
    const processingScore = this.evaluateProcessing(product);
    score += processingScore.adjustment;
    if (processingScore.warning) warnings.push(processingScore.warning);
    
    // 7. Check nutritional balance
    const nutritionScore = this.evaluateNutrition(product, ageGroupId);
    score += nutritionScore.adjustment;
    if (nutritionScore.recommendation) recommendations.push(nutritionScore.recommendation);
    
    // Ensure score is between 0-100
    score = Math.max(0, Math.min(100, score));
    
    // Determine score level and color
    const scoreLevel = this.getScoreLevel(score);
    const color = SCORE_COLORS[scoreLevel];
    
    return {
      score: Math.round(score),
      level: scoreLevel,
      color,
      warnings,
      recommendations,
      details: {
        sugar: sugarScore,
        sodium: sodiumScore,
        allergens: allergenScore,
        choking: chokingScore,
        additives: additiveScore,
        processing: processingScore,
        nutrition: nutritionScore,
      },
    };
  }

  /**
   * Evaluate sugar content
   */
  evaluateSugar(product, ageGroupId) {
    const sugarPer100g = product.nutrition?.sugar || 0;
    const limit = SUGAR_LIMITS[ageGroupId];
    
    if (sugarPer100g === 0) {
      return {
        adjustment: +10,
        warning: null,
        recommendation: 'No added sugar - excellent choice!',
      };
    }
    
    if (sugarPer100g <= limit) {
      return {
        adjustment: +5,
        warning: null,
        recommendation: `Sugar content (${sugarPer100g}g) is within safe limits for ${ageGroupId}`,
      };
    }
    
    if (sugarPer100g <= limit * 2) {
      return {
        adjustment: -10,
        warning: `High sugar content (${sugarPer100g}g) for ${ageGroupId}`,
        recommendation: 'Consider smaller portions or less frequent consumption',
      };
    }
    
    return {
      adjustment: -20,
      warning: `Very high sugar content (${sugarPer100g}g) - not recommended for ${ageGroupId}`,
      recommendation: 'Choose lower sugar alternatives',
    };
  }

  /**
   * Evaluate sodium content
   */
  evaluateSodium(product, ageGroupId) {
    const sodiumPer100g = product.nutrition?.sodium || 0;
    const limit = SODIUM_LIMITS[ageGroupId];
    
    if (sodiumPer100g === 0) {
      return {
        adjustment: +5,
        warning: null,
        recommendation: 'No sodium - good for young children',
      };
    }
    
    if (sodiumPer100g <= limit) {
      return {
        adjustment: +3,
        warning: null,
        recommendation: `Sodium content (${sodiumPer100g}mg) is within safe limits`,
      };
    }
    
    if (sodiumPer100g <= limit * 2) {
      return {
        adjustment: -8,
        warning: `High sodium content (${sodiumPer100g}mg) for ${ageGroupId}`,
        recommendation: 'Monitor portion size',
      };
    }
    
    return {
      adjustment: -15,
      warning: `Very high sodium content (${sodiumPer100g}mg) - not recommended`,
      recommendation: 'Choose lower sodium alternatives',
    };
  }

  /**
   * Evaluate allergens
   */
  evaluateAllergens(product) {
    const ingredients = (product.ingredients || '').toLowerCase();
    const allergenTags = product.allergenTags || [];
    
    const foundAllergens = COMMON_ALLERGENS.filter(allergen => 
      ingredients.includes(allergen) || 
      allergenTags.some(tag => tag.includes(allergen))
    );
    
    if (foundAllergens.length === 0) {
      return {
        adjustment: +5,
        warning: null,
        allergens: [],
      };
    }
    
    return {
      adjustment: -15,
      warning: `Contains: ${foundAllergens.join(', ')}`,
      allergens: foundAllergens,
    };
  }

  /**
   * Evaluate choking hazards
   */
  evaluateChokingHazards(product, ageGroupId) {
    if (ageGroupId !== '0-2' && ageGroupId !== '3-5') {
      return {
        adjustment: 0,
        warning: null,
        recommendation: null,
      };
    }
    
    const productName = (product.name || '').toLowerCase();
    const ingredients = (product.ingredients || '').toLowerCase();
    
    const foundHazards = CHOKING_HAZARDS.filter(hazard => 
      productName.includes(hazard) || ingredients.includes(hazard)
    );
    
    if (foundHazards.length === 0) {
      return {
        adjustment: +5,
        warning: null,
        recommendation: 'No obvious choking hazards detected',
      };
    }
    
    return {
      adjustment: -20,
      warning: `Choking hazard for ${ageGroupId}: ${foundHazards.join(', ')}`,
      recommendation: 'Supervise closely, cut into small pieces, or avoid',
    };
  }

  /**
   * Evaluate additives
   */
  evaluateAdditives(product) {
    const additives = product.additives || [];
    const ingredients = (product.ingredients || '').toLowerCase();
    
    const foundAdditives = ADDITIVES_TO_FLAG.filter(additive => 
      ingredients.includes(additive) ||
      additives.some(add => add.toLowerCase().includes(additive))
    );
    
    if (foundAdditives.length === 0) {
      return {
        adjustment: +5,
        warning: null,
        additives: [],
      };
    }
    
    return {
      adjustment: -10,
      warning: `Contains additives: ${foundAdditives.join(', ')}`,
      additives: foundAdditives,
    };
  }

  /**
   * Evaluate processing level
   */
  evaluateProcessing(product) {
    const novaGroup = product.novaGroup || 0;
    
    if (novaGroup === 1) {
      return {
        adjustment: +10,
        warning: null,
        level: 'Unprocessed or minimally processed',
      };
    }
    
    if (novaGroup === 2) {
      return {
        adjustment: +5,
        warning: null,
        level: 'Processed culinary ingredients',
      };
    }
    
    if (novaGroup === 3) {
      return {
        adjustment: -5,
        warning: 'Processed food - moderate consumption recommended',
        level: 'Processed',
      };
    }
    
    if (novaGroup === 4) {
      return {
        adjustment: -15,
        warning: 'Ultra-processed food - limit consumption',
        level: 'Ultra-processed',
      };
    }
    
    return {
      adjustment: 0,
      warning: null,
      level: 'Unknown processing level',
    };
  }

  /**
   * Evaluate nutritional balance
   */
  evaluateNutrition(product, ageGroupId) {
    const nutrition = product.nutrition || {};
    
    // Simple nutritional balance check
    const hasProtein = nutrition.protein > 0;
    const hasFiber = nutrition.fiber > 0;
    const lowSaturatedFat = nutrition.saturatedFat < 3;
    
    let adjustment = 0;
    const positivePoints = [];
    
    if (hasProtein) {
      adjustment += 3;
      positivePoints.push('Contains protein');
    }
    
    if (hasFiber) {
      adjustment += 3;
      positivePoints.push('Contains fiber');
    }
    
    if (lowSaturatedFat) {
      adjustment += 2;
      positivePoints.push('Low in saturated fat');
    }
    
    return {
      adjustment,
      recommendation: positivePoints.length > 0 
        ? `Positive aspects: ${positivePoints.join(', ')}`
        : 'Consider pairing with protein or fiber-rich foods',
    };
  }

  /**
   * Get score level based on numeric score
   */
  getScoreLevel(score) {
    if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'EXCELLENT';
    if (score >= SCORE_THRESHOLDS.GOOD) return 'GOOD';
    if (score >= SCORE_THRESHOLDS.FAIR) return 'FAIR';
    return 'POOR';
  }

  /**
   * Generate summary for product
   */
  generateSummary(product, ageScores) {
    const primaryAgeGroup = '3-5'; // Default to preschool age
    
    const primaryScore = ageScores[primaryAgeGroup];
    const allWarnings = [];
    const allRecommendations = [];
    
    // Collect all warnings and recommendations
    Object.values(ageScores).forEach(score => {
      allWarnings.push(...(score.warnings || []));
      allRecommendations.push(...(score.recommendations || []));
    });
    
    // Remove duplicates
    const uniqueWarnings = [...new Set(allWarnings.filter(Boolean))];
    const uniqueRecommendations = [...new Set(allRecommendations.filter(Boolean))];
    
    return {
      overallScore: primaryScore.score,
      overallLevel: primaryScore.level,
      overallColor: primaryScore.color,
      warnings: uniqueWarnings,
      recommendations: uniqueRecommendations,
      bestForAges: this.findBestAgeGroups(ageScores),
      avoidForAges: this.findAvoidAgeGroups(ageScores),
    };
  }

  /**
   * Find which age groups this product is best for
   */
  findBestAgeGroups(ageScores) {
    return AGE_GROUPS
      .filter(age => ageScores[age.id].score >= SCORE_THRESHOLDS.GOOD)
      .map(age => age.label);
  }

  /**
   * Find which age groups should avoid this product
   */
  findAvoidAgeGroups(ageScores) {
    return AGE_GROUPS
      .filter(age => ageScores[age.id].score < SCORE_THRESHOLDS.FAIR)
      .map(age => age.label);
  }
}

// Export singleton instance
export default new ScoringService();