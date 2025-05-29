import { clampNumber } from "@/shared/utils/math/clamp-number/clamp-number.util";
import { expect, it } from "vitest";

it.each([
  ["Doesn't alter a number that's within the range", 30, 10, 50, 30],
  ["Clamps a number that's below the minimum", 2, 15, 20, 15],
  ["Clamps a number that's above the maximum", 100, 0, 5, 5],
  ["Works with negative numbers", -10, -30, -20, -20],
  ["Works with floating point numbers", -10.5, -0.8, 10, -0.8],
])("%s", (_, unclamped, min, max, expected) => {
  const clamped = clampNumber(unclamped, min, max);

  expect(clamped).toBe(expected);
});

it("throws an error if min is greater than max", () => {
  expect(() => clampNumber(5, 10, 0)).toThrowError();
});
