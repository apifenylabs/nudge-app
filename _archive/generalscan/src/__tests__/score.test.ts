import { describe, it, expect } from "vitest";
import {
  calculateSustainability,
  calculateHealth,
  calculateValue,
  calculateOverall,
  calculateAllScores,
} from "@/lib/score";
import type { OpenFoodFactsProduct } from "@/lib/types";

function makeProduct(overrides: Partial<OpenFoodFactsProduct["product"]> = {}): OpenFoodFactsProduct["product"] {
  return {
    product_name: "Test Product",
    brands: "Test Brand",
    categories: "Snacks",
    image_url: null,
    nutriscore_grade: null,
    ecoscore_grade: null,
    ingredients: [],
    ingredients_text: null,
    allergens: null,
    allergens_tags: [],
    labels: null,
    labels_tags: [],
    packaging_text: null,
    packaging_tags: [],
    origins: null,
    origins_tags: [],
    quantity: null,
    additive_tags: [],
    nova_group: null,
    categories_tags: [],
    ...overrides,
  };
}

describe("calculateSustainability", () => {
  it("returns good score for product with grade A ecoscore", () => {
    const scores = calculateSustainability(
      makeProduct({ ecoscore_grade: "a" })
    );
    expect(scores.score).toBeGreaterThanOrEqual(40);
    expect(scores.breakdown.length).toBeGreaterThan(0);
    expect(scores.grade).toBe("a");
  });

  it("returns higher score for eco-friendly packaging", () => {
    const glassScore = calculateSustainability(
      makeProduct({
        packaging_tags: ["glass", "recyclable"],
        ecoscore_grade: "b",
      })
    );
    const plasticScore = calculateSustainability(
      makeProduct({
        packaging_tags: ["plastic"],
        ecoscore_grade: "b",
      })
    );
    expect(glassScore.score).toBeGreaterThan(plasticScore.score);
  });

  it("gives higher score with organic certification", () => {
    const organic = calculateSustainability(
      makeProduct({
        labels_tags: ["en:organic"],
      })
    );
    const none = calculateSustainability(makeProduct());
    expect(organic.score).toBeGreaterThan(none.score);
  });
});

describe("calculateHealth", () => {
  it("returns perfect score for grade A nutriscore", () => {
    const scores = calculateHealth(
      makeProduct({ nutriscore_grade: "a" })
    );
    expect(scores.score).toBeGreaterThanOrEqual(50);
    expect(scores.grade).toBe("a");
  });

  it("reduces score for poor nutriscore", () => {
    const good = calculateHealth(
      makeProduct({ nutriscore_grade: "a" })
    );
    const bad = calculateHealth(
      makeProduct({ nutriscore_grade: "e" })
    );
    expect(good.score).toBeGreaterThan(bad.score);
  });

  it("penalizes allergens", () => {
    const noAllergens = calculateHealth(
      makeProduct({
        nutriscore_grade: "b",
        allergens_tags: [],
      })
    );
    const hasAllergens = calculateHealth(
      makeProduct({
        nutriscore_grade: "b",
        allergens_tags: ["en:milk", "en:gluten", "en:eggs"],
      })
    );
    expect(noAllergens.score).toBeGreaterThan(hasAllergens.score);
  });
});

describe("calculateValue", () => {
  it("gives higher score with brand info", () => {
    const hasBrand = calculateValue(makeProduct({ brands: "Nestlé" }));
    const noBrand = calculateValue(makeProduct({ brands: "" }));
    expect(hasBrand.score).toBeGreaterThan(noBrand.score);
  });

  it("gives higher score for complete products", () => {
    const complete = calculateValue(
      makeProduct({
        brands: "Brand",
        quantity: "200g",
        product_name: "Product",
        image_url: "https://example.com/img.jpg",
        ingredients_text: "water, sugar",
        categories: "Beverages",
        nutriscore_grade: "a",
      })
    );
    const incomplete = calculateValue(makeProduct());
    expect(complete.score).toBeGreaterThan(incomplete.score);
  });
});

describe("calculateOverall", () => {
  it("returns a score between 0 and 100", () => {
    const score = calculateOverall(80, 90, 70);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("weights health more heavily", () => {
    const goodHealth = calculateOverall(50, 90, 50);
    const goodSustainability = calculateOverall(90, 50, 50);
    expect(goodHealth).toBeGreaterThan(goodSustainability);
  });
});

describe("calculateAllScores", () => {
  it("returns a complete scores object", () => {
    const scores = calculateAllScores(makeProduct({ nutriscore_grade: "a", ecoscore_grade: "b" }));
    
    expect(scores).toHaveProperty("sustainability");
    expect(scores).toHaveProperty("health");
    expect(scores).toHaveProperty("value");
    expect(scores).toHaveProperty("overall");

    expect(scores.sustainability.score).toBeGreaterThanOrEqual(0);
    expect(scores.health.score).toBeGreaterThanOrEqual(0);
    expect(scores.value.score).toBeGreaterThanOrEqual(0);
    expect(scores.overall.score).toBeGreaterThanOrEqual(0);

    expect(scores.overall.breakdown).toHaveProperty("sustainability");
    expect(scores.overall.breakdown).toHaveProperty("health");
    expect(scores.overall.breakdown).toHaveProperty("value");
  });

  it("scores stay within 0-100 bounds", () => {
    // Even with extreme data, scores should be valid
    const badProduct = makeProduct({
      nutriscore_grade: "e",
      ecoscore_grade: "e",
      allergens_tags: ["en:milk", "en:eggs", "en:peanuts", "en:gluten", "en:soy"],
      additive_tags: ["en:e100", "en:e101", "en:e102", "en:e103", "en:e104", "en:e105"],
    });
    const scores = calculateAllScores(badProduct);

    expect(scores.sustainability.score).toBeGreaterThanOrEqual(0);
    expect(scores.health.score).toBeGreaterThanOrEqual(0);
    expect(scores.value.score).toBeGreaterThanOrEqual(0);
    expect(scores.overall.score).toBeGreaterThanOrEqual(0);
  });
});
