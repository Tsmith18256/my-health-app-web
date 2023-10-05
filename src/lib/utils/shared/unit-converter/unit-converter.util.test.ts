import { convertGsToLbs, convertInsToCms, convertInsToMms, convertLbsToGs, convertMmsToCms } from '$lib/utils/shared/unit-converter/unit-converter.util';
import { describe, expect, test } from 'vitest';

describe('Unit Converter util', () => {
  test('converts positive lbs to grams correctly', () => {
    const received = convertLbsToGs(123.4);

    expect(received).toBeCloseTo(55973.2985, 4);
  });

  test('converts negative lbs to grams correctly', () => {
    const received = convertLbsToGs(-123.4);

    expect(received).toBeCloseTo(-55973.2985, 4);
  });

  test('converts positive grams to lbs correctly', () => {
    const received = convertGsToLbs(1500);

    expect(received).toBeCloseTo(3.3069, 4);
  });

  test('converts negative lbs to grams correctly', () => {
    const received = convertGsToLbs(-1500);

    expect(received).toBeCloseTo(-3.3069, 4);
  });

  test('converts positive mms to cms correctly', () => {
    const received = convertMmsToCms(1743);

    expect(received).toBeCloseTo(174.3, 4);
  });

  test('converts negative mms to cms correctly', () => {
    const received = convertMmsToCms(-1743);

    expect(received).toBeCloseTo(-174.3, 4);
  });

  test('converts positive ins to cms correctly', () => {
    const received = convertInsToCms(12);

    expect(received).toBeCloseTo(30.48, 4);
  });

  test('converts negative ins to cms correctly', () => {
    const received = convertInsToCms(-12);

    expect(received).toBeCloseTo(-30.48, 4);
  });

  test('converts positive ins to mms correctly', () => {
    const received = convertInsToMms(6);

    expect(received).toBeCloseTo(152.4, 4);
  });

  test('converts negative ins to mms correctly', () => {
    const received = convertInsToMms(-6);

    expect(received).toBeCloseTo(-152.4, 4);
  });
});
