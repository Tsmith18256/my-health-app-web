/**
 * Util to wrap setTimeout with a promise for programmatic delays.
 */
export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
