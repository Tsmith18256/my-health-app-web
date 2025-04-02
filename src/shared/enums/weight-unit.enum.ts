import { ObjectValues } from '@/shared/types/object-values.types';

export const WeightUnit = {
  Grams: "g",
  Pounds: "lb",
} as const;

export type WeightUnit = ObjectValues<typeof WeightUnit>;
