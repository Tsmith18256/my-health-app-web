import { calculateAveragedBodyFat } from '$lib/body-comp/utils/body-fat-calculator/body-fat-calculator.util';
import { MEASUREMENT_SYSTEMS } from '$lib/shared/constants/measurement-systems.constants';
import { settings, userAge } from '$lib/shared/stores/settings/settings.store';
import {
  LengthMeasurement,
  LengthUnit,
} from '$lib/shared/utils/measurements/length-measurement/length-measurement.util';
import {
  WEIGHT_UNITS,
  WeightMeasurement,
} from '$lib/shared/utils/measurements/weight-measurement/weight-measurement.util';
import { convertMmsToCms } from '$lib/shared/utils/unit-converter/unit-converter.util';
import dayjs, { Dayjs } from 'dayjs';
import { get } from 'svelte/store';

interface IConstructorProps {
  id?: number;
  date: Dayjs;
  weight: number;
  waistCircumference?: number;
  neckCircumference?: number;
  chestSkinfold?: number;
  abSkinfold?: number;
  thighSkinfold?: number;
}

export class BodyCompEntry {
  id: number;
  date: IConstructorProps['date'];

  private _abSkinfold: LengthMeasurement | undefined;
  private _chestSkinfold: LengthMeasurement | undefined;
  private _neckCircumference: LengthMeasurement | undefined;
  private _thighSkinfold: LengthMeasurement | undefined;
  private _waistCircumference: LengthMeasurement | undefined;
  private _weight: WeightMeasurement = new WeightMeasurement();

  constructor(initialValues: IConstructorProps) {
    this.id = initialValues.id ?? dayjs().unix();
    this.date = initialValues.date;
    this.waistCircumference = initialValues.waistCircumference;
    this.weight = initialValues.weight;
    this.neckCircumference = initialValues.neckCircumference;
    this.chestSkinfold = initialValues.chestSkinfold;
    this.abSkinfold = initialValues.abSkinfold;
    this.thighSkinfold = initialValues.thighSkinfold;
  }

  get abSkinfold(): number | undefined {
    return this._abSkinfold?.getValue({ unit: LengthUnit.Millimetres });
  }

  set abSkinfold(value: number | undefined) {
    if (value === undefined) {
      this._abSkinfold = undefined;
    } else if (!this._abSkinfold) {
      this._abSkinfold = new LengthMeasurement({ value, unit: LengthUnit.Millimetres });
    } else {
      this._abSkinfold.setValue({ value, unit: LengthUnit.Millimetres });
    }
  }

  get chestSkinfold(): number | undefined {
    return this._chestSkinfold?.getValue({ unit: LengthUnit.Millimetres });
  }

  set chestSkinfold(value: number | undefined) {
    if (value === undefined) {
      this._chestSkinfold = undefined;
    } else if (!this._chestSkinfold) {
      this._chestSkinfold = new LengthMeasurement({ value, unit: LengthUnit.Millimetres });
    } else {
      this._chestSkinfold.setValue({ value, unit: LengthUnit.Millimetres });
    }
  }

  get neckCircumference(): number | undefined {
    const unit = getCircumferenceUnit();

    return this._neckCircumference?.getValue({ unit });
  }

  set neckCircumference(value: number | undefined) {
    const unit = getCircumferenceUnit();

    if (value === undefined) {
      this._neckCircumference = undefined;
    } else if (!this._neckCircumference) {
      this._neckCircumference = new LengthMeasurement({ value, unit });
    } else {
      this._neckCircumference.setValue({ value, unit });
    }
  }

  get thighSkinfold(): number | undefined {
    return this._thighSkinfold?.getValue({ unit: LengthUnit.Millimetres });
  }

  set thighSkinfold(value: number | undefined) {
    if (value === undefined) {
      this._thighSkinfold = undefined;
    } else if (!this._thighSkinfold) {
      this._thighSkinfold = new LengthMeasurement({ value, unit: LengthUnit.Millimetres });
    } else {
      this._thighSkinfold.setValue({ value, unit: LengthUnit.Millimetres });
    }
  }

  get waistCircumference(): number | undefined {
    const unit = getCircumferenceUnit();

    return this._waistCircumference?.getValue({ unit });
  }

  set waistCircumference(value: number | undefined) {
    const unit = getCircumferenceUnit();

    if (value === undefined) {
      this._waistCircumference = undefined;
    } else if (!this._waistCircumference) {
      this._waistCircumference = new LengthMeasurement({ value, unit });
    } else {
      this._waistCircumference.setValue({ value, unit });
    }
  }

  get weight(): number {
    const unit = getWeightUnit();

    return this._weight.getValue({ unit });
  }

  set weight(value: number) {
    const unit = getWeightUnit();

    this._weight.setValue({ value, unit });
  }

  getBodyFatPercent(): number | undefined {
    const waistCircumference = this._waistCircumference;
    const neckCircumference = this._neckCircumference;
    const abSkinfold = this._abSkinfold;
    const chestSkinfold = this._chestSkinfold;
    const thighSkinfold = this._thighSkinfold;
    const canCalculateBodyFat = waistCircumference && neckCircumference && abSkinfold && chestSkinfold && thighSkinfold;

    return (
      canCalculateBodyFat &&
      calculateAveragedBodyFat({
        age: get(userAge),
        heightInCm: convertMmsToCms(get(settings).heightInMm),
        neckInCm: neckCircumference.getValue({ unit: LengthUnit.Centimetres }),
        waistInCm: waistCircumference.getValue({ unit: LengthUnit.Centimetres }),
        chestInMm: chestSkinfold.getValue({ unit: LengthUnit.Millimetres }),
        abInMm: abSkinfold.getValue({ unit: LengthUnit.Millimetres }),
        thighInMm: thighSkinfold.getValue({ unit: LengthUnit.Millimetres }),
      })
    );
  }

  getFatMass(): number | undefined {
    const bodyFat = this.getBodyFatPercent();

    if (!bodyFat) {
      return undefined;
    }

    return this.weight * bodyFat;
  }

  getLeanMass(): number | undefined {
    const bodyFat = this.getBodyFatPercent();

    if (!bodyFat) {
      return undefined;
    }

    return this.weight * (1 - bodyFat);
  }

  getFormattedAbSkinfold(): string | undefined {
    return this._abSkinfold?.getFormatted({ unit: LengthUnit.Millimetres });
  }

  getFormattedChestSkinfold(): string | undefined {
    return this._chestSkinfold?.getFormatted({ unit: LengthUnit.Millimetres });
  }

  getFormattedFatMass(): string | undefined {
    const fatMass = this.getFatMass();

    if (!fatMass) {
      return undefined;
    }

    const unit = getWeightUnit();

    return new WeightMeasurement({ value: fatMass, unit }).getFormatted({ unit });
  }

  getFormattedLeanMass(): string | undefined {
    const leanMass = this.getLeanMass();

    if (!leanMass) {
      return undefined;
    }

    const unit = getWeightUnit();

    return new WeightMeasurement({ value: leanMass, unit }).getFormatted({ unit });
  }

  getFormattedNeckCircumference(): string | undefined {
    const unit = getCircumferenceUnit();

    return this._neckCircumference?.getFormatted({ unit });
  }

  getFormattedThighSkinfold(): string | undefined {
    return this._thighSkinfold?.getFormatted({ unit: LengthUnit.Millimetres });
  }

  getFormattedWaistCircumference(): string | undefined {
    const unit = getCircumferenceUnit();

    return this._waistCircumference?.getFormatted({ unit, decimalPlaces: 1 });
  }

  getFormattedWeight(): string {
    const unit = getWeightUnit();

    return this._weight.getFormatted({ unit, decimalPlaces: 1 });
  }
}

const getCircumferenceUnit = () => {
  const { circumferenceSystem } = get(settings);

  if (circumferenceSystem === MEASUREMENT_SYSTEMS.imperial) {
    return LengthUnit.Inches;
  } else {
    return LengthUnit.Centimetres;
  }
};

const getWeightUnit = () => {
  const { bodyweightSystem } = get(settings);

  if (bodyweightSystem === MEASUREMENT_SYSTEMS.imperial) {
    return WEIGHT_UNITS.pounds;
  } else {
    return WEIGHT_UNITS.kilograms;
  }
};
