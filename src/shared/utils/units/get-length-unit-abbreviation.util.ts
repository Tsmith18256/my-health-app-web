import { LengthUnit } from "@/shared/enums/length-unit.enum";

/**
 * Gets the abbreviation for the given length unit.
 *
 * For example, the abbreviation for pounds is "in".
 */
export const getLengthUnitAbbrevation = (unit: LengthUnit, isPlural = true) => {
  return isPlural
    ? (pluralAbbreviationByUnit[unit] ?? singularAbbrevationByUnit[unit])
    : singularAbbrevationByUnit[unit];
};

const singularAbbrevationByUnit = {
  [LengthUnit.Centimeters]: "cm",
  [LengthUnit.Inches]: "in",
  [LengthUnit.Millimeters]: "mm",
} as const satisfies Record<LengthUnit, string>;

const pluralAbbreviationByUnit: Partial<Record<LengthUnit, string>> = {};
