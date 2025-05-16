/**
 * Clamps the given number between the minimum and maximum values. This is a
 * shorthand version of calling both `Max.min()` and `Math.max()`.
 */
export const clampNumber = (unclamped: number, min: number, max: number) => {
  if (min > max) {
    throw new Error("Minimum cannot be greater than maximum");
  }

  return Math.min(Math.max(unclamped, min), max);
};
