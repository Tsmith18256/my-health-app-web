import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import { convertWeightUnits } from "@/shared/utils/units/convert-weight-units.util";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units.util";

/**
 * Hook to get weight and length unit data and utility functions for the user's
 * preferred measurement systems.
 *
 * The data and functions returned by this hook will use the user's preferred
 * systems and the data will be regenerated if the user changes their
 * preferences.
 */
export const usePreferredUnitUtils = () => {
  const { lengthSystem, weightSystem } = useUserSettings();

  const bodyweightUnit = getUnitForSystem(weightSystem, {
    imperial: WeightUnit.Pounds,
    metric: WeightUnit.Kilograms,
  });

  const circumferenceUnit = getUnitForSystem(lengthSystem, {
    imperial: LengthUnit.Inches,
    metric: LengthUnit.Centimeters,
  });

  return {
    bodyweightUnit,
    circumferenceUnit,

    convertBodyweightFromGrams: (weight: number) => {
      return convertWeightUnits(weight, WeightUnit.Grams, bodyweightUnit);
    },

    convertBodyweightToGrams: (weight: number) => {
      return convertWeightUnits(weight, bodyweightUnit, WeightUnit.Grams);
    },

    convertCircumferenceFromMillimetres: (length: number) => {
      console.log(length);
      return convertLengthUnits(
        length,
        LengthUnit.Millimeters,
        circumferenceUnit
      );
    },

    convertCircumferenceToMillimetres: (length: number) => {
      return convertLengthUnits(
        length,
        circumferenceUnit,
        LengthUnit.Millimeters
      );
    },
  };
};

function getUnitForSystem(
  system: MeasurementSystem,
  opts: IGetUnitForSystemOpts<WeightUnit>
): WeightUnit;
function getUnitForSystem(
  system: MeasurementSystem,
  opts: IGetUnitForSystemOpts<LengthUnit>
): LengthUnit;
/**
 * Gets the measurement system to use based on the given options.
 *
 * This function is essentially just at ternary to return the provided imperial
 * or metric value. It is just provided to reduce boilerplate.
 */
function getUnitForSystem(
  system: MeasurementSystem,
  { imperial, metric }: IGetUnitForSystemOpts
) {
  if (system === MeasurementSystem.Imperial) {
    return imperial;
  }

  return metric;
}

interface IGetUnitForSystemOpts<
  TUnits extends LengthUnit | WeightUnit = LengthUnit | WeightUnit,
> {
  imperial: TUnits;
  metric: TUnits;
}
