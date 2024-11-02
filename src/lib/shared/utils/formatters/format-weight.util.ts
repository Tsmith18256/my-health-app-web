import { convertGsToLbs } from '$lib/shared/utils/unit-converter/unit-converter.util';

export const formatWeight = (weight: number) => {
  const converted = convertGsToLbs(weight);

  return `${converted.toFixed(1)} lbs`;
};
