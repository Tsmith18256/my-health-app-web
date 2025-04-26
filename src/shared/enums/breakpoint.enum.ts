import { ObjectValues } from "@/shared/helper-types/object-values.type";

/**
 * The CSS breakpoint values, provided here for when they need to be referenced
 * from JavaScript.
 */
export const Breakpoint = {
  Mobile: "0rem",
  Tablet: "48rem",
  DesktopSmall: "64rem",
  DesktopMedium: "96rem",
  DesktopLarge: "120rem",
} as const;

export type Breakpoint = ObjectValues<typeof Breakpoint>;
