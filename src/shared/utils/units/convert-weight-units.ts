import { WeightUnit } from '@/shared/enums/weight-unit.enum';

export const convertWeightUnits = (
  amount: number,
  from: WeightUnit,
  to: WeightUnit
) => {
  const grams = amount * gramsPerUnit[from];

  return grams / gramsPerUnit[to];
};

const gramsPerUnit: Record<WeightUnit, number> = {
  [WeightUnit.Grams]: 1,
  [WeightUnit.Pounds]: 453.5924,
};
