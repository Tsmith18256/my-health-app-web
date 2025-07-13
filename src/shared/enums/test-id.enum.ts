import { ObjectValues } from "@/shared/helper-types/object-values.type";

/**
 * IDs used for testing purposes.
 */
export const TestId = {
  Button: "Button",
  DatePicker: "DatePicker",
  DatePickerLabel: "DatePickerLabel",
  HiddenInput: "HiddenInput",
  InputField: "InputField",
  InputLabel: "InputLabel",
  OverviewGraph: "OverviewGraph",
  OverviewGraphNoData: "OverviewGraphNoData",
} as const;

export type TestId = ObjectValues<typeof TestId>;
