import { BREAKPOINTS } from '$lib/shared/constants/breakpoints.constants';
import {
  isDesktopWidth,
  isMobileWidth,
} from '$lib/shared/utils/breakpoint/breakpoint.util';
import { describe, expect, test } from 'vitest';

const mobileWidth = BREAKPOINTS.tablet - 5;

describe('Breakpoint utils', () => {
  describe('isMobileWidth', () => {
    test.each([
      [true, mobileWidth],
      [false, BREAKPOINTS.tablet],
      [false, BREAKPOINTS.desktopSmall],
      [false, BREAKPOINTS.desktopLarge],
    ])('returns %s for screen width of %ipx', (expected, width) => {
      const isMobile = isMobileWidth(width);

      expect(isMobile).toBe(expected);
    });
  });

  describe('is desktop width', () => {
    test.each([
      [false, mobileWidth],
      [false, BREAKPOINTS.tablet],
      [true, BREAKPOINTS.desktopSmall],
      [true, BREAKPOINTS.desktopLarge],
    ])('returns %s for screen width of %ipx', (expected, width) => {
      const isDesktop = isDesktopWidth(width);

      expect(isDesktop).toBe(expected);
    });
  });
});
