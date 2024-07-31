import type { MeasurementSystem } from '$lib/shared/constants/measurement-systems.types';
import type { LengthMeasurement } from '$lib/shared/utils/measurements/length-measurement/length-measurement.util';
import type { Dayjs } from 'dayjs';

export interface ISettings {
  // ---------------------------
  // Information about the user.
  // ---------------------------
  /**
   * The user's birthday.
   */
  birthday: Dayjs;
  /**
   * The user's height.
   */
  height: LengthMeasurement;

  // ------------------------------------------------
  // Measurement system for each type of measurement.
  // ------------------------------------------------
  /**
   * The user's chosen measurement system for their weight.
   */
  bodyweightSystem: MeasurementSystem;
  /**
   * The user's chosen measurement system for their height.
   */
  heightSystem: MeasurementSystem;
  /**
   * The user's chosen measurement system for circumference measurements (waist, neck, etc).
   */
  circumferenceSystem: MeasurementSystem;
}
