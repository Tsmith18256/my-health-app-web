import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";

export const validateMeasurementSystem = (input: string): MeasurementSystem => {
  if (Object.values(MeasurementSystem).includes(input as MeasurementSystem)) {
    return input as MeasurementSystem;
  }

  throw new Error(`(${input}) is not a valid measurement system`);
};
