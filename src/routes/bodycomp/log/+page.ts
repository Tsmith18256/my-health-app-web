import { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
import dayjs from 'dayjs';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    entries: [
      new BodyCompEntry({
        date: dayjs('2024-07-01'),
        weight: 180.6,
        waistCircumference: 36.0,
        neckCircumference: 15.0,
        chestSkinfold: 13,
        abSkinfold: 18,
        thighSkinfold: 15,
      }),
      new BodyCompEntry({
        date: dayjs('2024-07-15'),
        weight: 177.2,
        waistCircumference: 35.5,
        neckCircumference: 15.0,
        chestSkinfold: 12,
        abSkinfold: 17,
        thighSkinfold: 14,
      }),
    ],
  };
};
