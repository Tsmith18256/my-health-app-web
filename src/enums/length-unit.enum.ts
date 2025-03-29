import { ObjectValues } from '@/types/object-values.types';

export const LengthUnit = {
  Inches: "in",
  Millimeters: "mm",
} as const;

export type LengthUnit = ObjectValues<typeof LengthUnit>;
