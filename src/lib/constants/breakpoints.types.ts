import type { BREAKPOINTS } from '$lib/constants/breakpoints.constants'

export type Breakpoint = typeof BREAKPOINTS[keyof typeof BREAKPOINTS];
