import { BREAKPOINTS } from '$lib/constants/breakpoints.constants';

export const isMobileWidth = (width: number) => {
  return width < BREAKPOINTS.tablet;
};
