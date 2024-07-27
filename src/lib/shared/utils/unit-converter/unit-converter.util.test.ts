import {
  convertCmsToIns,
  convertGsToKgs,
  convertGsToLbs,
  convertGsToOzs,
  convertInsToCms,
  convertInsToMms,
  convertKgsToGs,
  convertLbsToGs,
  convertMmsToCms,
  convertMmsToIns,
  convertOzsToGs,
} from '$lib/shared/utils/unit-converter/unit-converter.util';
import { describe, expect, test } from 'vitest';

describe('Unit Converter util', () => {
  describe('Weight conversions', () => {
    test('converts positive gs to kgs correctly', () => {
      const received = convertGsToKgs(967458);

      expect(received).toBeCloseTo(967.458, 4);
    });

    test('converts negative gs to kgs correctly', () => {
      const received = convertGsToKgs(-967458);

      expect(received).toBeCloseTo(-967.458, 4);
    });

    test('converts positive kgs to gs correctly', () => {
      const received = convertKgsToGs(55.6);

      expect(received).toBeCloseTo(55600);
    });

    test('converts negative kgs to gs correctly', () => {
      const received = convertKgsToGs(-55.6);

      expect(received).toBeCloseTo(-55600);
    });

    test('converts positive lbs to gs correctly', () => {
      const received = convertLbsToGs(123.4);

      expect(received).toBeCloseTo(55973.2985, 4);
    });

    test('converts negative lbs to gs correctly', () => {
      const received = convertLbsToGs(-123.4);

      expect(received).toBeCloseTo(-55973.2985, 4);
    });

    test('converts positive ozs to gs correctly', () => {
      const received = convertOzsToGs(14.3);

      expect(received).toBeCloseTo(405.3981);
    });

    test('converts negative ozs to gs correctly', () => {
      const received = convertOzsToGs(-14.3);

      expect(received).toBeCloseTo(-405.3981);
    });

    test('converts positive gs to lbs correctly', () => {
      const received = convertGsToLbs(1500);

      expect(received).toBeCloseTo(3.3069, 4);
    });

    test('converts negative lbs to gs correctly', () => {
      const received = convertGsToLbs(-1500);

      expect(received).toBeCloseTo(-3.3069, 4);
    });

    test('converts positive gs to ozs correctly', () => {
      const received = convertGsToOzs(356);

      expect(received).toBeCloseTo(12.5575);
    });

    test('converts negative gs to ozs correctly', () => {
      const received = convertGsToOzs(-356);

      expect(received).toBeCloseTo(-12.5575);
    });
  });

  describe('Distance conversions', () => {
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
});
