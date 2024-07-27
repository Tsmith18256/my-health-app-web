import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.types';
import { sortBodyCompEntriesByNewest } from '$lib/body-comp/utils/sort-body-comp-entries/sort-body-comp-entries.util';
import dayjs from 'dayjs';
import { describe, expect, test } from 'vitest';

describe('Sort Body Comp Entries by Newest util', () => {
  test('should sort entries in the correct order', () => {
    const unsorted: IBodyCompEntry[] = [
      {
        id: 1,
        date: dayjs('2023-10-02'),
        weightInG: 7550,
      },
      {
        id: 1,
        date: dayjs('2023-10-03'),
        weightInG: 7500,
      },
      {
        id: 1,
        date: dayjs('2023-10-01'),
        weightInG: 7600,
      },
      {
        id: 1,
        date: dayjs('2023-10-04'),
        weightInG: 7450,
      },
    ];

    const sorted = sortBodyCompEntriesByNewest(unsorted);

    expect(sorted).toStrictEqual([unsorted[3], unsorted[1], unsorted[0], unsorted[2]]);
  });
});
