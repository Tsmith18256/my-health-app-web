/**
 * Rounds the given number to the nearest multiple of the given interval.
 *
 * See the unit tests for example inputs and outputs.
 */
export const roundToInterval = (
  unroundedNumber: number,
  interval: number
) => {
  if (interval < 0) {
    throw new Error('Negative intervals are not allowed');
  }

  return Math.round(unroundedNumber / interval) * interval;
};
