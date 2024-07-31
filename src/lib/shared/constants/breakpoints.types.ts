import type { BREAKPOINTS } from '$lib/shared/constants/breakpoints.constants';
import type { ObjectValues } from '$lib/shared/types/object-values';

export type Breakpoint = ObjectValues<typeof BREAKPOINTS>;
