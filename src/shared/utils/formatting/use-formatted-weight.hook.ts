"use client";

import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";

export const useFormattedWeight = (weightInG: number) => {
  const state = useUserSettings();

  console.log("STATE:", JSON.stringify(state, undefined, 2));

  return formatWeight(weightInG, {
    unit: state.weightSystem ? WeightUnit.Pounds : WeightUnit.Kilograms,
  });
};
