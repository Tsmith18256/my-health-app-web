import { calculateAveragedBodyFat, calculateNavyBodyFat, calculateSkinfoldBodyFat3Site } from '$lib/body-comp/utils/body-fat-calculator/body-fat-calculator.util';
import { describe, expect, test } from 'vitest';

describe('Body Fat Calculator util', () => {
  test('calculates correct averaged body fat', () => {
    const received = calculateAveragedBodyFat({
      age: 28,
      heightInCm: 177.8,
      neckInCm: 38.1,
      waistInCm: 87.6,
      chestInMm: 10,
      abInMm: 14,
      thighInMm: 12
    });

    expect(received).toBeCloseTo(0.1453, 4);
  });

  test('calculates correct navy body fat', () => {
    const received = calculateNavyBodyFat({
      heightInCm: 177.8,
      neckInCm: 38.1,
      waistInCm: 87.6,
    });

    expect(received).toBeCloseTo(0.1836, 4);
  });

  test('calculates correct skinfold body fat', () => {
    const received = calculateSkinfoldBodyFat3Site({
      age: 28,
      chestInMm: 10,
      abInMm: 14,
      thighInMm: 12
    });

    expect(received).toBeCloseTo(0.1069, 4);
  });
});
