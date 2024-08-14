import type { ObjectValues } from '$lib/shared/types/object-values';
import {
  convertCmsToMms,
  convertFtToMms,
  convertInsToMms,
  convertMmsToCms,
  convertMmsToFt,
  convertMmsToIns,
} from '$lib/shared/utils/unit-converter/unit-converter.util';

/**
 * @todo Combine logic from this file and WeightMeasurement
 */

export const LengthUnit = {
  // Metric system
  Millimetres: 'MILLIMETRES',
  Centimetres: 'CENTIMETRES',
  // Imperial system
  Inches: 'INCHES',
  Feet: 'FEET',
} as const;

export type LengthUnit = ObjectValues<typeof LengthUnit>;

interface IGetOpts {
  unit: LengthUnit;
}

interface ISetOpts extends IGetOpts {
  value: number;
}

interface IGetFormattedOpts extends IGetOpts {
  decimalPlaces?: number;
}

const suffixes: Record<LengthUnit, string> = {
  [LengthUnit.Millimetres]: 'mm',
  [LengthUnit.Centimetres]: 'cm',
  [LengthUnit.Inches]: 'in',
  [LengthUnit.Feet]: 'ft',
};

export class LengthMeasurement {
  private valueInMillimetres = 0;

  constructor(opts?: ISetOpts) {
    if (opts) {
      this.setValue(opts);
    }
  }

  getValue({ unit }: IGetOpts): number {
    switch (unit) {
      case LengthUnit.Millimetres:
        return this.valueInMillimetres;
      case LengthUnit.Centimetres:
        return convertMmsToCms(this.valueInMillimetres);
      case LengthUnit.Inches:
        return convertMmsToIns(this.valueInMillimetres);
      case LengthUnit.Feet:
        return convertMmsToFt(this.valueInMillimetres);
    }
  }

  setValue({ value, unit }: ISetOpts): void {
    switch (unit) {
      case LengthUnit.Millimetres:
        this.valueInMillimetres = value;
        break;
      case LengthUnit.Centimetres:
        this.valueInMillimetres = convertCmsToMms(value);
        break;
      case LengthUnit.Inches:
        this.valueInMillimetres = convertInsToMms(value);
        break;
      case LengthUnit.Feet:
        this.valueInMillimetres = convertFtToMms(value);
        break;
    }
  }

  getFormatted({ unit, decimalPlaces = 0 }: IGetFormattedOpts): string {
    const suffix = suffixes[unit];
    const value = this.getValue({ unit });

    return `${value.toFixed(decimalPlaces)} ${suffix}`;
  }
}
