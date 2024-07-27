import type { MeasurementSystem } from '$lib/shared/constants/measurement-systems.types';
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
  heightInMm: number;

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
