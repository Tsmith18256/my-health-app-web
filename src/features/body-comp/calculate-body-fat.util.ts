import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { ObjectValues } from "@/shared/helper-types/object-values.type";
import { Prettify } from "@/shared/helper-types/prettify.type";
import { calculateAverage } from "@/shared/utils/math/calculate-average.util";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units.util";

/**
 * Calculates the user's body fat for the given body composition entry.
 *
 * Based on how much information is defined in the body composition entry, the
 * most optimal method of calculating body fat available will be used. See the
 * `BodyFatMethod` enum for the list of possible methods.
 *
 * If not enough fields are defined to use any method, null will be returned.
 */
export const calculateBodyFat = (
  opts: ICalculateBodyFatOpts,
): IBodyFatResult | null => {
  const navyBf = calculateNavyBodyFat(opts);
  const skinfoldBf = calculateSkinfoldBodyFat3Site(opts);

  if (navyBf && skinfoldBf) {
    return getResultsObject({
      bodyFatPercent: calculateAverage(navyBf, skinfoldBf),
      method: BodyFatMethod.Combined,
      weightInG: opts.entry.weightInG,
    });
  }

  if (navyBf) {
    return getResultsObject({
      bodyFatPercent: navyBf,
      method: BodyFatMethod.Navy,
      weightInG: opts.entry.weightInG,
    });
  }

  if (skinfoldBf) {
    return getResultsObject({
      bodyFatPercent: skinfoldBf,
      method: BodyFatMethod.Skinfold3Site,
      weightInG: opts.entry.weightInG,
    });
  }

  return null;
};

const calculateNavyBodyFat = ({
  heightInMm: heightInMm,
  entry: { neckCircumferenceInMm, waistCircumferenceInMm },
}: ICalculateNavyBodyFatOpts): number | null => {
  if (!neckCircumferenceInMm || !waistCircumferenceInMm) {
    return null;
  }

  const heightInCm = convertLengthUnits(
    heightInMm,
    LengthUnit.Millimeters,
    LengthUnit.Centimeters,
  );
  const neckInCm = convertLengthUnits(
    neckCircumferenceInMm,
    LengthUnit.Millimeters,
    LengthUnit.Centimeters,
  );
  const waistInCm = convertLengthUnits(
    waistCircumferenceInMm,
    LengthUnit.Millimeters,
    LengthUnit.Centimeters,
  );

  const density =
    1.0324 -
    0.19077 * Math.log10(waistInCm - neckInCm) +
    0.15456 * Math.log10(heightInCm);

  return convertDensityToBodyFat(density);
};

const calculateSkinfoldBodyFat3Site = ({
  age,
  entry: { abSkinfold, chestSkinfold, thighSkinfold },
}: ICalculateSkinfoldBodyFat3SiteOpts): number | null => {
  if (!abSkinfold || !chestSkinfold || !thighSkinfold) {
    return null;
  }

  const total = abSkinfold + chestSkinfold + thighSkinfold;
  const density =
    1.10938 - 0.0008267 * total + 0.0000016 * total ** 2 - 0.0002574 * age;

  return convertDensityToBodyFat(density);
};

const convertDensityToBodyFat = (density: number): number => {
  // Convert to 0-100 percentage, then divide by 100 to get 0.0-1.0 percentage;
  return (495 / density - 450) / 100;
};

const getResultsObject = ({
  bodyFatPercent,
  method,
  weightInG,
}: Pick<IBodyFatResult, "bodyFatPercent" | "method"> &
  Pick<IBodyCompEntry, "weightInG">): IBodyFatResult => {
  const fatMass = weightInG * bodyFatPercent;

  return {
    bodyFatPercent,
    method,
    fatMass,
    leanMass: weightInG - fatMass,
  };
};

/**
 * Enum of the available methods of calculating body fat.
 */
export const BodyFatMethod = {
  /**
   * The corresponding body fat was computed using an average of the Navy and
   * 3-site Jackson-Pollock skinfold methods.
   *
   * This is the most optimal method of calculating body fat.
   */
  Combined: "combined",
  /**
   * The corresponding body fat was computed using the Navy method.
   *
   * This method has a tendency to overestimate body fat in lean individuals.
   * Source:
   * https://legionathletics.com/body-fat-calculator/#:~:text=It%20tends%20to%20overestimate%20body%20fat%20in%20lean%20individuals
   *
   * Calculator:
   * https://www.omnicalculator.com/health/navy-body-fat
   */
  Navy: "navy",
  /**
   * The corresponding body fat was computed using the 3-site Jackson-Pollock
   * skinfold method.
   *
   * This method can be inaccurate in lean individuals.
   * Source:
   * https://legionathletics.com/body-fat-calculator/#:~:text=The%20equations%20that%20convert%20skin%20thickness%20into%20a%20body%20fat%20percentage%20can%20also
   *
   * Calculator:
   * https://www.trainermetrics.com/fitness-assessment-calculations/body-fat-3-site-skinfold-jackson-pollock/
   */
  Skinfold3Site: "skinfold3site",
} as const;
export type BodyFatMethod = ObjectValues<typeof BodyFatMethod>;

type ICalculateBodyFatOpts = Prettify<
  ICalculateNavyBodyFatOpts & ICalculateSkinfoldBodyFat3SiteOpts
>;

interface ICalculateNavyBodyFatOpts extends ICalculateBodyFatBaseOpts {
  heightInMm: number;
}

interface ICalculateSkinfoldBodyFat3SiteOpts extends ICalculateBodyFatBaseOpts {
  age: number;
}

interface ICalculateBodyFatBaseOpts {
  entry: IBodyCompEntry;
}

interface IBodyFatResult {
  bodyFatPercent: number;
  fatMass: number;
  leanMass: number;
  method: BodyFatMethod;
}
