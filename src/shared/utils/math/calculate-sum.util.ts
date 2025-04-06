/**
 * Takes n numbers and returns the sum of all of them.
 */
export const calculateSum = (...inputValues: number[]) => {
  return inputValues.reduce((sum, currentValue) => {
    return sum + currentValue;
  }, 0);
};
