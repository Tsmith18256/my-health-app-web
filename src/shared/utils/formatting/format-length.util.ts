import { LengthUnit } from "@/shared/enums/length-unit.enum";

/**
 * Formats the given length into string format for display in the UI.
 */
export const formatLength = (
  length: number,
  {
    fractionDigits: fractionDigitsOverride,
    unit = LengthUnit.Inches,
  }: IFormatLengthOptions
) => {
  const fractionDigits = fractionDigitsOverride ?? fractionDigitsMap[unit];
  const suffix = unitSuffixMap[unit];

  return `${length.toFixed(fractionDigits)}${suffix}`;
};

const fractionDigitsMap = {
  [LengthUnit.Centimeters]: 1,
  [LengthUnit.Inches]: 1,
  [LengthUnit.Millimeters]: 0,
} as const satisfies Record<LengthUnit, number>;

const unitSuffixMap = {
  [LengthUnit.Centimeters]: " cm",
  [LengthUnit.Inches]: '"',
  [LengthUnit.Millimeters]: " mm",
} as const satisfies Record<LengthUnit, string>;

interface IFormatLengthOptions {
  fractionDigits?: number;
  unit?: LengthUnit;
}
