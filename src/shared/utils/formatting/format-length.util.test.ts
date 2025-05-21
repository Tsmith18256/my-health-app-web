import { LengthUnit } from '@/shared/enums/length-unit.enum';
import { formatLength } from '@/shared/utils/formatting/format-length.util';
import { expect, it } from 'vitest';

it("formats length correctly for singular", () => {
  const singular = formatLength(453, {
    unit: LengthUnit.Inches,
  });

  expect(singular).toBe('17.8"');
});

it("formats length correctly for plural", () => {
  const plural = formatLength(1736, {
    unit: LengthUnit.Centimeters,
  });

  expect(plural).toBe('173.6 cm');
});
