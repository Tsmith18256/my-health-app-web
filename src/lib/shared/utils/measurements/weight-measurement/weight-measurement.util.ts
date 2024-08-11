import type { ObjectValues } from '$lib/shared/types/object-values';
import {
  convertGsToKgs,
  convertGsToLbs,
  convertGsToOzs,
  convertKgsToGs,
  convertLbsToGs,
  convertOzsToGs,
} from '$lib/shared/utils/unit-converter/unit-converter.util';

export const WEIGHT_UNITS = {
  // Metric system
  grams: 'GRAMS',
  kilograms: 'KILOGRAMS',
  // Imperial system
  ounces: 'OUNCES',
  pounds: 'POUNDS',
} as const;

export type WeightUnit = ObjectValues<typeof WEIGHT_UNITS>;

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
  [WEIGHT_UNITS.grams]: 'g',
  [WEIGHT_UNITS.kilograms]: 'kg',
  [WEIGHT_UNITS.ounces]: 'oz',
  [WEIGHT_UNITS.pounds]: 'lbs',
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
      case WEIGHT_UNITS.grams:
        return this.valueInGrams;
      case WEIGHT_UNITS.kilograms:
        return convertGsToKgs(this.valueInGrams);
      case WEIGHT_UNITS.ounces:
        return convertGsToOzs(this.valueInGrams);
      case WEIGHT_UNITS.pounds:
        return convertGsToLbs(this.valueInGrams);
    }
  }

  setValue({ value, unit }: ISetOpts): void {
    switch (unit) {
      case WEIGHT_UNITS.grams:
        this.valueInGrams = value;
        break;
      case WEIGHT_UNITS.kilograms:
        this.valueInGrams = convertKgsToGs(value);
        break;
      case WEIGHT_UNITS.ounces:
        this.valueInGrams = convertOzsToGs(value);
        break;
      case WEIGHT_UNITS.pounds:
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
