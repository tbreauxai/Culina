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
 * Converts an amount from one unit to another via grams base.
 */
export function convertAmount(amount, fromUnit, toUnit) {
  let parsedAmount;
  // Support strings like "1/2" as fractions
  if (typeof amount === 'string' && amount.includes('/')) {
    const [num, den] = amount.split('/');
    parsedAmount = parseFloat(num) / parseFloat(den);
  } else {
    parsedAmount = parseFloat(amount);
  }
  if (isNaN(parsedAmount)) return amount;
  
  const fromRate = CONVERSION_RATES[fromUnit];
  const toRate = CONVERSION_RATES[toUnit];
  if (!fromRate || !toRate) return amount;
  
  const converted = (parsedAmount * fromRate) / toRate;
  return Number(converted.toFixed(2));
}