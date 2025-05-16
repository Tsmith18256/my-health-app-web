import { roundToInterval } from '@/shared/utils/math/round-to-interval/round-to-interval.util';
import { expect, it } from 'vitest';

it.each([
  ['to an integer interval', 163, 5, 165],
  ['.5 up', 232.5, 3, 234],
  ['to a floating point interval', 163, 5, 165],
  ['a negative number', -7, 4, -8],
  ['.5 up with a negative number', -3.5, 1, -3],
])('Rounds %s', (_, unrounded, interval, expected) => {
  const rounded = roundToInterval(unrounded, interval);

  expect(rounded).toBe(expected);
});

it('throws an error for negative interval', () => {
  expect(() => roundToInterval(12, -4)).toThrowError();
});
