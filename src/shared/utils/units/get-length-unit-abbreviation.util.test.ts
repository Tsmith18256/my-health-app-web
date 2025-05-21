import { LengthUnit } from '@/shared/enums/length-unit.enum';
import { getLengthUnitAbbrevation } from '@/shared/utils/units/get-length-unit-abbreviation.util';
import { expect, it } from 'vitest';

it('returns correct length for singular', () => {
  const singularSuffix = getLengthUnitAbbrevation(LengthUnit.Inches, false);
  expect(singularSuffix).toBe("in");
});

it('returns correct length for plural', () => {
  const pluralSuffix = getLengthUnitAbbrevation(LengthUnit.Inches);
  expect(pluralSuffix).toBe("in");
});
