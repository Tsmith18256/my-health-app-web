import { ObjectValues } from '@/shared/types/object-values.types';

export const LengthUnit = {
  Centimeters: "cm",
  Inches: "in",
  Millimeters: "mm",
} as const;

export type LengthUnit = ObjectValues<typeof LengthUnit>;
