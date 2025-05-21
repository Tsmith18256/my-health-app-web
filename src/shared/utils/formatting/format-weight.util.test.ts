import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";
import { expect, it } from 'vitest';

it("formats weight correctly for singular", () => {
  const singular = formatWeight(453.592, {
    unit: WeightUnit.Pounds,
  });

  expect(singular).toBe('1.0 lb');
});

it("formats weight correctly for plural", () => {
  const plural = formatWeight(1736, {
    unit: WeightUnit.Kilograms,
  });

  expect(plural).toBe('1.7 kg');
});
