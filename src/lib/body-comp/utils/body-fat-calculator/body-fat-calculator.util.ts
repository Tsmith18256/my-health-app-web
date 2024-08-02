/**
 * Calculates body fat percentage based on the given inputs. This functions takes both the US Navy method and the 3-site
 * Jackson/Pollock skinfold method and averages them.
 *
 * TODO: Add support for women.
 */
export const calculateAveragedBodyFat = (
  opts: ICalculateAveragedBodyFatOpts,
): number => {
  const navyBf = calculateNavyBodyFat(opts);
  const skinfoldBf = calculateSkinfoldBodyFat3Site(opts);

  return (navyBf + skinfoldBf) / 2;
};

/**
 * Calculates body fat percentage based on the given inputs, using the US Navy method.
 *
 * TODO: Add support for women.
 */
export const calculateNavyBodyFat = (
  opts: ICalculateNavyBodyFatOpts,
): number => {
  const { heightInCm, neckInCm, waistInCm } = opts;

  const density =
    1.0324 -
    0.19077 * Math.log10(waistInCm - neckInCm) +
    0.15456 * Math.log10(heightInCm);

  return convertDensityToBodyFat(density);
};

/**
 * Calculates body fat percentage based on the given inputs, using the 3-site Jackson/Pollock skinfold method.
 *
 * TODO: Add support for women.
 */
export const calculateSkinfoldBodyFat3Site = (
  opts: ICalculateSkinfoldBodyFat3SiteOpts,
) => {
  const { age, chestInMm, abInMm, thighInMm } = opts;

  const totalMm = chestInMm + abInMm + thighInMm;
  const density =
    1.10938 - 0.0008267 * totalMm + 0.0000016 * totalMm ** 2 - 0.0002574 * age;

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

export interface ICalculateAveragedBodyFatOpts
  extends ICalculateNavyBodyFatOpts,
    ICalculateSkinfoldBodyFat3SiteOpts {}

interface ICalculateNavyBodyFatOpts {
  heightInCm: number;
  neckInCm: number;
  waistInCm: number;
}

interface ICalculateSkinfoldBodyFat3SiteOpts {
  age: number;
  chestInMm: number;
  abInMm: number;
  thighInMm: number;
}
