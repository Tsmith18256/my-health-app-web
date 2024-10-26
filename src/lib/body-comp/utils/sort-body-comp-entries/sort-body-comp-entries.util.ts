import type { IBodyCompEntryV2 } from '$lib/body-comp/types/body-comp-entry.type';
import dayjs from 'dayjs';

/**
 * Sorts an array of body composition entries by date in descending order (newest entries first).
 */
export const sortBodyCompEntriesByNewest = (
  entries: IBodyCompEntryV2[],
): IBodyCompEntryV2[] => {
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
