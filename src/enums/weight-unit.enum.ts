import { ObjectValues } from '@/types/object-values.types';

export const WeightUnit = {
  Grams: "g",
  Pounds: "lb",
} as const;

export type WeightUnit = ObjectValues<typeof WeightUnit>;
