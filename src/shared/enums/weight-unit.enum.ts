import { ObjectValues } from '@/shared/helper-types/object-values.type';

export const WeightUnit = {
  Grams: "g",
  Kilograms: "kg",
  Pounds: "lb",
} as const;

export type WeightUnit = ObjectValues<typeof WeightUnit>;
