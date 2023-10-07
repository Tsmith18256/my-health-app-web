import type { ICON_IMAGE, ICON_SIZE } from '$lib/components/shared/icon/icon.constants';

export type IconImage = typeof ICON_IMAGE[keyof typeof ICON_IMAGE];
export type IconSize = typeof ICON_SIZE[keyof typeof ICON_SIZE];
