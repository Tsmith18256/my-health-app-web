import { settings, userAge } from '$lib/stores/shared/settings/settings.store';
import type { INewBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';
import { calculateAveragedBodyFat } from '$lib/utils/body-comp/body-fat-calculator/body-fat-calculator.util';
import type { IFormattedBodyCompEntry } from '$lib/utils/body-comp/format-body-comp-entry/format-body-comp-entry.types';
import { convertGsToLbs, convertMmsToCms, convertMmsToIns } from '$lib/utils/shared/unit-converter/unit-converter.util';
import { get } from 'svelte/store';

export const formatBodyCompEntry = (entry: INewBodyCompEntry): IFormattedBodyCompEntry => {
  const { date, weightInG, waistCircInMm, neckCircInMm, chestSkinfoldInMm, abSkinfoldInMm, thighSkinfoldInMm } =
      entry;
  const canCalculateBodyFat =
    waistCircInMm && neckCircInMm && chestSkinfoldInMm && abSkinfoldInMm && thighSkinfoldInMm;

  const bodyFat =
    canCalculateBodyFat &&
    calculateAveragedBodyFat({
      age: get(userAge),
      heightInCm: convertMmsToCms(get(settings).heightInMm),
      neckInCm: convertMmsToCms(neckCircInMm),
      waistInCm: convertMmsToCms(waistCircInMm),
      chestInMm: chestSkinfoldInMm,
      abInMm: abSkinfoldInMm,
      thighInMm: thighSkinfoldInMm,
    });

  return {
    date: date.format('MMM D, YYYY'),
    weight: convertGsToLbs(weightInG).toFixed(1),
    bodyFat: bodyFat?.toLocaleString(undefined, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    waistCirc: waistCircInMm !== undefined ? convertMmsToIns(waistCircInMm).toFixed(1) : undefined,
    neckCirc: neckCircInMm !== undefined ? convertMmsToIns(neckCircInMm).toFixed(1) : undefined,
    chestSkinfold: chestSkinfoldInMm?.toString(),
    abSkinfold: abSkinfoldInMm?.toString(),
    thighSkinfold: thighSkinfoldInMm?.toString(),
  };
};
