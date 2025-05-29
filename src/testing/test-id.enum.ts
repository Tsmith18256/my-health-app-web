import { ObjectValues } from "@/shared/helper-types/object-values.type";

/**
 * IDs used for testing purposes.
 */
export const TestId = {
  Button: "Button",
  InputField: "InputField",
  InputLabel: "InputLabel",
} as const;

export type TestId = ObjectValues<typeof TestId>;
