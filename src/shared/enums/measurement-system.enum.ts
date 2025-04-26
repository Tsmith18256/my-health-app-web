import { ObjectValues } from '@/shared/helper-types/object-values.type';

/**
 * The measurement systems for weight and length units.
 */
export const MeasurementSystem = {
  Imperial: 'imperial',
  Metric: 'metric'
};

export type MeasurementSystem = ObjectValues<typeof MeasurementSystem>;
