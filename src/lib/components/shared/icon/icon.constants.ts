export const ICON_IMAGE = {
  plus: 'fa-plus'
};

export type IconImage = typeof ICON_IMAGE[keyof typeof ICON_IMAGE];

export const ICON_SIZE = {
  extraSmall: 'extra-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extra-large'
} as const;

export type IconSize = typeof ICON_SIZE[keyof typeof ICON_SIZE];
