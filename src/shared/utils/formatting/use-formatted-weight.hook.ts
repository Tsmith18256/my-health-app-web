"use client";

import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";

export const useFormattedWeight = (weightInG: number) => {
  const state = useUserSettings();

  return formatWeight(weightInG, {
    unit:
      state.weightSystem === MeasurementSystem.Imperial
        ? WeightUnit.Pounds
        : WeightUnit.Kilograms,
  });
};
