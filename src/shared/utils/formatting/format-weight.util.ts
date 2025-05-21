import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { convertWeightUnits } from "@/shared/utils/units/convert-weight-units.util";
import { getWeightUnitAbbreviation } from "@/shared/utils/units/get-weight-unit-abbreviation.util";

/**
 * Formats the given weight into string format for display in the UI.
 */
export const formatWeight = (
  weightInG: number,
  { unit = WeightUnit.Pounds }: IFormatWeightOptions = {}
) => {
  const converted = convertWeightUnits(weightInG, WeightUnit.Grams, unit);
  const fractionDigits = fractionDigitsByUnit[unit];

  const multiplier = 10 ** fractionDigits;
  const rounded = Math.round(converted * multiplier) / multiplier;
  const isPlural = rounded !== 1;
  const override = isPlural
    ? pluralSuffixOverrideByUnit[unit]
    : singularSuffixOverrideByUnit[unit];
  const suffix = override ?? ` ${getWeightUnitAbbreviation(unit, isPlural)}`;

  return `${converted.toFixed(fractionDigits)}${suffix}`;
};

const fractionDigitsByUnit: Record<WeightUnit, number> = {
  [WeightUnit.Grams]: 0,
  [WeightUnit.Kilograms]: 1,
  [WeightUnit.Pounds]: 1,
};

const singularSuffixOverrideByUnit: Partial<Record<WeightUnit, string>> = {};

const pluralSuffixOverrideByUnit: Partial<Record<WeightUnit, string>> = {};

interface IFormatWeightOptions {
  unit?: WeightUnit;
}
