import type { IBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';

/**
 * Sorts an array of body composition entries by date in descending order (newest entries first).
 */
export const sortBodyCompEntriesByNewest = (entries: IBodyCompEntry[]): IBodyCompEntry[] => {
  return entries.toSorted((a, b) => {
    if (a.date.isBefore(b.date)) {
      return 1;
    } else if (a.date.isAfter(b.date)) {
      return -1;
    } else {
      return 0;
    }
  });
}
