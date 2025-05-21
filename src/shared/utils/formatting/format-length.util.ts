import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units.util";
import { getLengthUnitAbbrevation } from "@/shared/utils/units/get-length-unit-abbreviation.util";

/**
 * Formats the given length into string format for display in the UI.
 */
export const formatLength = (
  lengthInMm: number,
  {
    fractionDigits: fractionDigitsOverride,
    unit = LengthUnit.Inches,
  }: IFormatLengthOptions = {}
) => {
  const converted = convertLengthUnits(
    lengthInMm,
    LengthUnit.Millimeters,
    unit
  );
  const fractionDigits = fractionDigitsOverride ?? fractionDigitsByUnit[unit];

  const multiplier = 10 ** fractionDigits;
  const rounded = Math.round(converted * multiplier) / multiplier;
  const isPlural = rounded !== 1;
  const override = isPlural
    ? pluralSuffixOverrideByUnit[unit]
    : singularSuffixOverrideByUnit[unit];
  const suffix = override ?? ` ${getLengthUnitAbbrevation(unit, isPlural)}`;

  return `${converted.toFixed(fractionDigits)}${suffix}`;
};

const fractionDigitsByUnit: Record<LengthUnit, number> = {
  [LengthUnit.Centimeters]: 1,
  [LengthUnit.Inches]: 1,
  [LengthUnit.Millimeters]: 0,
};

const singularSuffixOverrideByUnit: Partial<Record<LengthUnit, string>> = {
  [LengthUnit.Inches]: '"',
};

const pluralSuffixOverrideByUnit: Partial<Record<LengthUnit, string>> = {
  [LengthUnit.Inches]: '"',
};

interface IFormatLengthOptions {
  fractionDigits?: number;
  unit?: LengthUnit;
}
