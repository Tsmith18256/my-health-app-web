import { convertCmsToIns, convertGsToLbs, convertInsToCms, convertInsToMms, convertLbsToGs, convertMmsToCms, convertMmsToIns } from '$lib/utils/shared/unit-converter/unit-converter.util';
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

  test('converts positive mms to ins correctly', () => {
    const received = convertMmsToIns(37);

    expect(received).toBeCloseTo(1.4567, 4);
  });

  test('converts negative mms to ins correctly', () => {
    const received = convertMmsToIns(-37);

    expect(received).toBeCloseTo(-1.4567, 4);
  });

  test('converts positive cms to ins correctly', () => {
    const received = convertCmsToIns(13);

    expect(received).toBeCloseTo(5.1181, 4);
  });

  test('converts negative cms to ins correctly', () => {
    const received = convertCmsToIns(-13);

    expect(received).toBeCloseTo(-5.1181, 4);
  });
});
