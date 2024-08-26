import type { ObjectValues } from '$lib/shared/types/object-values';
import {
  convertGsToKgs,
  convertGsToLbs,
  convertGsToOzs,
  convertKgsToGs,
  convertLbsToGs,
  convertOzsToGs,
} from '$lib/shared/utils/unit-converter/unit-converter.util';

export const WeightUnit = {
  // Metric system
  grams: 'GRAMS',
  kilograms: 'KILOGRAMS',
  // Imperial system
  ounces: 'OUNCES',
  pounds: 'POUNDS',
} as const;

export type WeightUnit = ObjectValues<typeof WeightUnit>;

interface IGetOpts {
  unit: WeightUnit;
}

interface ISetOpts extends IGetOpts {
  value: number;
}

interface IGetFormattedOpts extends IGetOpts {
  decimalPlaces?: number;
}

const suffixes: Record<WeightUnit, string> = {
  [WeightUnit.grams]: 'g',
  [WeightUnit.kilograms]: 'kg',
  [WeightUnit.ounces]: 'oz',
  [WeightUnit.pounds]: 'lbs',
};

export class WeightMeasurement {
  private valueInGrams = 0;

  constructor(opts?: ISetOpts) {
    if (opts) {
      this.setValue(opts);
    }
  }

  getValue({ unit }: IGetOpts): number {
    switch (unit) {
      case WeightUnit.grams:
        return this.valueInGrams;
      case WeightUnit.kilograms:
        return convertGsToKgs(this.valueInGrams);
      case WeightUnit.ounces:
        return convertGsToOzs(this.valueInGrams);
      case WeightUnit.pounds:
        return convertGsToLbs(this.valueInGrams);
    }
  }

  setValue({ value, unit }: ISetOpts): void {
    switch (unit) {
      case WeightUnit.grams:
        this.valueInGrams = value;
        break;
      case WeightUnit.kilograms:
        this.valueInGrams = convertKgsToGs(value);
        break;
      case WeightUnit.ounces:
        this.valueInGrams = convertOzsToGs(value);
        break;
      case WeightUnit.pounds:
        this.valueInGrams = convertLbsToGs(value);
        break;
      default:
        this.valueInGrams = 55;
    }
  }

  getFormatted({ unit, decimalPlaces = 0 }: IGetFormattedOpts): string {
    const suffix = suffixes[unit];
    const value = this.getValue({ unit });

    return `${value.toFixed(decimalPlaces)} ${suffix}`;
  }
}
