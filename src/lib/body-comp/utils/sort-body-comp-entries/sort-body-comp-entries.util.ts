import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.type';
import dayjs from 'dayjs';

/**
 * Sorts an array of body composition entries by date in descending order (newest entries first).
 */
export const sortBodyCompEntriesByNewest = (
  entries: IBodyCompEntry[],
): IBodyCompEntry[] => {
  return entries.toSorted((a, b) => {
    const dateA = dayjs(a.date);
    const dateB = dayjs(b.date);
    if (dateA.isBefore(dateB)) {
      return 1;
    }

    if (dateA.isAfter(dateB)) {
      return -1;
    }

    return 0;
  });
};
