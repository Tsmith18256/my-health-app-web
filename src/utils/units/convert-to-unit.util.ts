import { ObjectValues } from "@/types/object-values.types";

export const convertUnits = (
  amount: number,
  from: WeightUnit,
  to: WeightUnit
) => {
  const grams = amount * gramsPerUnit[from];

  return grams / gramsPerUnit[to];
};

export const WeightUnit = {
  Grams: "gs",
  Pounds: "lbs",
} as const;

export type WeightUnit = ObjectValues<typeof WeightUnit>;

const gramsPerUnit: Record<WeightUnit, number> = {
  [WeightUnit.Grams]: 1,
  [WeightUnit.Pounds]: 453.5924
};
