/**
 * Rounds a number to the given number of decimal places.
 */
export const roundToDecimalPlaces = (
  num: number,
  decimalPlaces: number,
): number => {
  const numToMultiply = decimalPlaces * 10;

  return Math.round(num * numToMultiply) / numToMultiply;
};
