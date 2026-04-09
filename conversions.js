// Base unit is Grams (g)
export const CONVERSION_RATES = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
  // Volume estimates (based on water density)
  tsp: 4.92892,
  tbsp: 14.7868,
  cup: 236.588,
};

export const UNIT_LABELS = {
  g: "Grams (g)",
  kg: "Kilograms (kg)",
  oz: "Ounces (oz)",
  lb: "Pounds (lb)",
  tsp: "Teaspoons (tsp)",
  tbsp: "Tablespoons (tbsp)",
  cup: "Cups",
};

/**
 * Converts an amount from grams to the target unit.
 */
export function convertFromGrams(amountInGrams, targetUnit) {
  if (!CONVERSION_RATES[targetUnit]) return amountInGrams;
  
  const converted = amountInGrams / CONVERSION_RATES[targetUnit];
  
  // Clean up the formatting (e.g., 1.50 -> 1.5, 1.333 -> 1.33)
  return Number(converted.toFixed(2));
}