import { ObjectValues } from "@/types/object-values.types";

export const convertLengthUnits = (
  amount: number,
  from: LengthUnit,
  to: LengthUnit
) => {
  const grams = amount * millimetersPerUnit[from];

  return grams / millimetersPerUnit[to];
};

export const LengthUnit = {
  Inches: "in",
  Millimeters: "mm",
} as const;
export type LengthUnit = ObjectValues<typeof LengthUnit>;

const millimetersPerUnit: Record<LengthUnit, number> = {
  [LengthUnit.Inches]: 25.4,
  [LengthUnit.Millimeters]: 1
};
