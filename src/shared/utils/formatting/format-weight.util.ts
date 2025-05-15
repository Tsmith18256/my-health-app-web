import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { convertWeightUnits } from "@/shared/utils/units/convert-weight-units";

/**
 * Formats the given weight into string format for display in the UI.
 */
export const formatWeight = (
  weightInG: number,
  { unit = WeightUnit.Pounds }: IFormatWeightOptions = {}
) => {
  const converted = convertWeightUnits(weightInG, WeightUnit.Grams, unit);
  const fractionDigits = fractionDigitsByUnit[unit];
  const suffix = suffixByUnit[unit];

  return `${converted.toFixed(fractionDigits)}${suffix}`;
};

const fractionDigitsByUnit: Record<WeightUnit, number> = {
  [WeightUnit.Grams]: 0,
  [WeightUnit.Kilograms]: 1,
  [WeightUnit.Pounds]: 1,
};

const suffixByUnit: Record<WeightUnit, string> = {
  [WeightUnit.Grams]: " g",
  [WeightUnit.Kilograms]: " kg",
  [WeightUnit.Pounds]: " lbs",
};

interface IFormatWeightOptions {
  unit?: WeightUnit;
}
