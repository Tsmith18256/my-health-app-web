import type { INewBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.types';
import type { IFormattedBodyCompEntry } from '$lib/body-comp/utils/format-body-comp-entry/format-body-comp-entry.types';
import { formatBodyCompEntry } from '$lib/body-comp/utils/format-body-comp-entry/format-body-comp-entry.util';
import dayjs from 'dayjs';
import { describe, expect, test } from 'vitest';


describe('Format Body Comp Entry util', () => {
  test('should format entry correctly', () => {
    const entry: INewBodyCompEntry = {
      date: dayjs('2023-01-01'),
      weightInG: 75000,
      waistCircInMm: 900,
      neckCircInMm: 400,
      chestSkinfoldInMm: 10,
      abSkinfoldInMm: 12,
      thighSkinfoldInMm: 13
    };

    const formatted = formatBodyCompEntry(entry);

    const expected: IFormattedBodyCompEntry = {
      date: 'Jan 1, 2023',
      weight: '165.3',
      bodyFat: '14.50%',
      waistCirc: '35.4',
      neckCirc: '15.7',
      chestSkinfold: '10',
      abSkinfold: '12',
      thighSkinfold: '13'
    };

    expect(formatted).toStrictEqual(expected);
  });
});
