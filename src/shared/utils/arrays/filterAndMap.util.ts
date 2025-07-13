/**
 * A utility function that is the same as calling `.filter()` and `.map()` in
 * succession, but with only one loop over the array.
 */
export const filterAndMap = <TInput, TOutput>(
  arr: TInput[],
  filterCallback: (item: TInput) => boolean,
  mapCallback: (item: TInput) => TOutput,
): TOutput[] => {
  return arr.reduce<TOutput[]>((acc, item) => {
    if (filterCallback(item)) {
      return acc.concat(mapCallback(item));
    }

    return acc;
  }, []);
};
