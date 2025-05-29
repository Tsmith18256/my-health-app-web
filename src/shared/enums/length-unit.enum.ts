import { ObjectValues } from "@/shared/helper-types/object-values.type";

export const LengthUnit = {
  Centimeters: "cm",
  Inches: "in",
  Millimeters: "mm",
} as const;

export type LengthUnit = ObjectValues<typeof LengthUnit>;
