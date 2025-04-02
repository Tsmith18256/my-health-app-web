import { LengthUnit } from '@/shared/enums/length-unit.enum';

export const convertLengthUnits = (
  amount: number,
  from: LengthUnit,
  to: LengthUnit
) => {
  const grams = amount * millimetersPerUnit[from];

  return grams / millimetersPerUnit[to];
};

const millimetersPerUnit: Record<LengthUnit, number> = {
  [LengthUnit.Centimeters]: 10,
  [LengthUnit.Inches]: 25.4,
  [LengthUnit.Millimeters]: 1
};
