import { WeightUnit } from "@/shared/enums/weight-unit.enum";

/**
 * Gets the abbreviation for the given weight unit.
 *
 * For example, the abbreviation for pounds is "lbs".
 */
export const getWeightUnitAbbreviation = (
  unit: WeightUnit,
  isPlural = true,
): string => {
  return isPlural
    ? (pluralAbbreviationByUnit[unit] ?? singularAbbreviationByUnit[unit])
    : singularAbbreviationByUnit[unit];
};

const singularAbbreviationByUnit = {
  [WeightUnit.Grams]: "g",
  [WeightUnit.Kilograms]: "kg",
  [WeightUnit.Pounds]: "lb",
} as const satisfies Record<WeightUnit, string>;

const pluralAbbreviationByUnit: Partial<Record<WeightUnit, string>> = {
  [WeightUnit.Pounds]: "lbs",
};
