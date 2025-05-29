import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { getWeightUnitAbbreviation } from "@/shared/utils/units/get-weight-unit-abbreviation.util";
import { expect, it } from "vitest";

it("returns correct values for singular and plural", () => {
  const singularSuffix = getWeightUnitAbbreviation(WeightUnit.Pounds, false);
  expect(singularSuffix).toBe("lb");

  const pluralSuffix = getWeightUnitAbbreviation(WeightUnit.Pounds);
  expect(pluralSuffix).toBe("lbs");
});
