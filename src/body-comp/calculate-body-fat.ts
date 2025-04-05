import { IBodyCompEntry } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units";

export const calculateNavyBodyFat = ({
  height,
  entry: { neckCircumference, waistCircumference },
}: ICalculateNavyBodyFatOpts) => {
  if (!neckCircumference || !waistCircumference) {
    return null;
  }

  const heightInCm = convertLengthUnits(
    height,
    LengthUnit.Inches,
    LengthUnit.Centimeters
  );
  const neckInCm = convertLengthUnits(
    neckCircumference,
    LengthUnit.Inches,
    LengthUnit.Centimeters
  );
  const waistInCm = convertLengthUnits(
    waistCircumference,
    LengthUnit.Inches,
    LengthUnit.Centimeters
  );

  const density =
    1.0324 -
    0.19077 * Math.log10(waistInCm - neckInCm) +
    0.15456 * Math.log10(heightInCm);

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

export interface ICalculateNavyBodyFatOpts {
  height: number;
  entry: IBodyCompEntry;
}
