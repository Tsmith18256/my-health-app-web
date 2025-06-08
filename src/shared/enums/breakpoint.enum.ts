import { ObjectValues } from "@/shared/helper-types/object-values.type";

/**
 * The CSS breakpoint values, provided here for when they need to be referenced
 * from JavaScript.
 */
export const Breakpoint = {
  Mobile: "0rem",
  Tablet: "48rem",
  desktop_small: "64rem",
  desktop_medium: "96rem",
  desktop_large: "120rem",
} as const;

export type Breakpoint = ObjectValues<typeof Breakpoint>;
