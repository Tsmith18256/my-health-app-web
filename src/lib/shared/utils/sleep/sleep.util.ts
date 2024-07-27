/**
 * Returns a promise that resolves after the given number of milliseconds.
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
