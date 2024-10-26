import { convertMmsToCms } from '$lib/shared/utils/unit-converter/unit-converter.util';

/**
 * Calculates body fat data based on the given inputs. This functions takes both the US Navy method and the 3-site
 * Jackson/Pollock skinfold method and averages them.
 *
 * For easier use, all the numbers this function accepts are optional; however, they are all required to compute a body
 * fat percent. If any value is undefined, undefined will be returned.
 */
export const calculateAveragedBodyFat = ({
  abSkinfold,
  age,
  chestSkinfold,
  height,
  neckCircumference,
  thighSkinfold,
  waistCircumference,
  weight,
}: ICalculateAveragedBodyFatOpts): IBodyFatData | undefined => {
  if (
    !abSkinfold ||
    !chestSkinfold ||
    !neckCircumference ||
    !thighSkinfold ||
    !waistCircumference ||
    !weight
  ) {
    return undefined;
  }

  const navyBf = calculateNavyBodyFat({
    height,
    waistCircumference,
    neckCircumference,
  });
  const skinfoldBf = calculateSkinfoldBodyFat3Site({
    age,
    abSkinfold,
    chestSkinfold,
    thighSkinfold,
  });

  const bodyFatPercent = (navyBf + skinfoldBf) / 2;

  return {
    bodyFatPercent,
    fatMass: weight * bodyFatPercent,
    leanMass: weight * (1 - bodyFatPercent),
  };
};

/**
 * Calculates body fat percentage based on the given inputs, using the US Navy method.
 */
const calculateNavyBodyFat = ({
  height,
  neckCircumference,
  waistCircumference,
}: ICalculateNavyBodyFatOpts): number => {
  const heightInCm = convertMmsToCms(height);
  const neckInCm = convertMmsToCms(neckCircumference);
  const waistInCm = convertMmsToCms(waistCircumference);

  const density =
    1.0324 -
    0.19077 * Math.log10(waistInCm - neckInCm) +
    0.15456 * Math.log10(heightInCm);

  return convertDensityToBodyFat(density);
};

/**
 * Calculates body fat percentage based on the given inputs, using the 3-site Jackson/Pollock skinfold method.
 */
const calculateSkinfoldBodyFat3Site = ({
  abSkinfold,
  age,
  chestSkinfold,
  thighSkinfold,
}: ICalculateSkinfoldBodyFat3SiteOpts) => {
  const total = chestSkinfold + abSkinfold + thighSkinfold;
  const density =
    1.10938 - 0.0008267 * total + 0.0000016 * total ** 2 - 0.0002574 * age;

  return convertDensityToBodyFat(density);
};

/**
 * Takes a body density number, which is the raw output of both body fat calculation methods, and converts it to a body
 * fat percentage.
 */
const convertDensityToBodyFat = (density: number): number => {
  // Convert to 0-100 percentage, then divide by 100 to get 0.0-1.0 percentage;
  return (495 / density - 450) / 100;
};

export interface IBodyFatData {
  bodyFatPercent: number;
  fatMass: number;
  leanMass: number;
}

export type ICalculateAveragedBodyFatOpts = Partial<ICalculateNavyBodyFatOpts> &
  Partial<ICalculateSkinfoldBodyFat3SiteOpts> &
  Pick<ICalculateNavyBodyFatOpts, 'height'> &
  Pick<ICalculateSkinfoldBodyFat3SiteOpts, 'age'> & { weight?: number };

interface ICalculateNavyBodyFatOpts {
  height: number;
  neckCircumference: number;
  waistCircumference: number;
}

interface ICalculateSkinfoldBodyFat3SiteOpts {
  age: number;
  chestSkinfold: number;
  abSkinfold: number;
  thighSkinfold: number;
}
