import { ObjectValues } from "@/shared/helper-types/object-values.type";

/**
 * Aria labels for accessibility throughout the UI.
 */
export const AriaLabel = {
  DeleteEntry: "Delete entry",
  EditEntry: "Edit entry",
  GoBack: "Go back",
} as const;

export type AriaLabel = ObjectValues<typeof AriaLabel>;
