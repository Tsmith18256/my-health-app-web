import type { BREAKPOINTS } from '$lib/constants/breakpoints.constants'
import type { ObjectValues } from '$lib/types/shared/object-values';

export type Breakpoint = ObjectValues<typeof BREAKPOINTS>;
