import type { ObjectValues } from '$lib/shared/types/object-values.type';
import { convertMmsToIns } from '$lib/shared/utils/unit-converter/unit-converter.util';

export const LengthUnit = {
  // Metric system
  Millimetres: 'MILLIMETRES',
  // Imperial system
  Inches: 'INCHES',
} as const;

export type LengthUnit = ObjectValues<typeof LengthUnit>;

const suffixes: Record<LengthUnit, string> = {
  [LengthUnit.Millimetres]: 'mm',
  [LengthUnit.Inches]: 'in',
};

export const formatLength = (
  length: number,
  { unit = LengthUnit.Inches }: IFormatLengthOpts = {},
) => {
  const converted = convertLengthToUnit(length, unit);
  const suffix = suffixes[unit];

  return `${converted.toFixed(0)} ${suffix}`;
};

const convertLengthToUnit = (length: number, unit: LengthUnit) => {
  switch (unit) {
    case LengthUnit.Millimetres:
      return length;
    case LengthUnit.Inches:
      return convertMmsToIns(length);
  }
};

interface IFormatLengthOpts {
  unit?: LengthUnit;
}
