import dayjs from 'dayjs';
import { describe, expect, test } from 'vitest';

import { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
import { sortBodyCompEntriesByNewest } from '$lib/body-comp/utils/sort-body-comp-entries/sort-body-comp-entries.util';

describe('Sort Body Comp Entries by Newest util', () => {
  test('should sort entries in the correct order', () => {
    const unsorted: BodyCompEntry[] = [
      new BodyCompEntry({
        date: dayjs('2023-10-02'),
        weight: 75.5,
      }),
      new BodyCompEntry({
        date: dayjs('2023-10-03'),
        weight: 75.0,
      }),
      new BodyCompEntry({
        date: dayjs('2023-10-01'),
        weight: 76.0,
      }),
      new BodyCompEntry({
        date: dayjs('2023-10-04'),
        weight: 74.5,
      }),
    ];

    const sorted = sortBodyCompEntriesByNewest(unsorted);

    expect(sorted).toStrictEqual([
      unsorted[3],
      unsorted[1],
      unsorted[0],
      unsorted[2],
    ]);
  });
});
