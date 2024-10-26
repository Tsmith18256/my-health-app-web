import type { ObjectValues } from '$lib/shared/types/object-values.type';

/**
 * Enum containing all of the accepted icons that can be displayed in the app.
 */
export const IconImage = {
  BodyComp: 'heartbeat',
  Exercise: 'running',
  HamburgerMenu: 'bars',
  Log: 'clipboard-list',
  LineChart: 'chart-line',
  Nutrition: 'apple-alt',
  Plus: 'plus',
  Settings: 'cog',
} as const;

export type IconImage = ObjectValues<typeof IconImage>;
