/**
 * Takes a vanilla Date object and converts it to a string without any time
 * data. Any time included in the vanilla date will be ignored.
 */
export const formatVanillaDateWithoutTime = (date: Date): string => {
  return date.toISOString().substring(0, 10);
};
