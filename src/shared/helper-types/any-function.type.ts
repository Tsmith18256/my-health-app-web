/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Helper type akin to `Function` but with more type safety.
 */
export type AnyFunction = (...args: any[]) => unknown;
