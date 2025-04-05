/**
 * Rounds the given number to the given number of decimal places.
 */
export const roundToDecimalPlaces = (
  unroundedNumber: number,
  decimalPlaces: number
) => {
  const multiplier = 10 ** decimalPlaces;

  return Math.round(unroundedNumber * multiplier) / multiplier;
};
