import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units";

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
  const suffix = suffixByUnit[unit];

  const str = `${converted.toFixed(fractionDigits)}${suffix}`;

  return str;
};

const fractionDigitsByUnit: Record<LengthUnit, number> = {
  [LengthUnit.Centimeters]: 1,
  [LengthUnit.Inches]: 1,
  [LengthUnit.Millimeters]: 0,
};

const suffixByUnit: Record<LengthUnit, string> = {
  [LengthUnit.Centimeters]: " cm",
  [LengthUnit.Inches]: '"',
  [LengthUnit.Millimeters]: " mm",
};

interface IFormatLengthOptions {
  fractionDigits?: number;
  unit?: LengthUnit;
}
