import { calculateSum } from '@/shared/utils/math/calculate-sum.util';

/**
 * Takes n numbers and returns the average of all of them.
 */
export const calculateAverage = (...inputValues: number[]) => {
  const sum = calculateSum(...inputValues);

  return sum / inputValues.length;
};
