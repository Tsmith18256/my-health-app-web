import { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';

/**
 * Sorts an array of body composition entries by date in descending order (newest entries first).
 */
export const sortBodyCompEntriesByNewest = (
  entries: BodyCompEntry[],
): BodyCompEntry[] => {
  return entries.toSorted((a, b) => {
    if (a.date.isBefore(b.date)) {
      return 1;
    } else if (a.date.isAfter(b.date)) {
      return -1;
    } else {
      return 0;
    }
  });
};
