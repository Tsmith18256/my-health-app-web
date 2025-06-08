import { ComponentProps } from "react";
import { expect, it } from "vitest";
import { DatePicker } from "@/shared/components/forms/date-picker/date-picker.component";
import { render } from "@/testing/react-testing-library/test.util";
import { TestId } from "@/testing/test-id.enum";

it("renders a label and input with the correct attributes", () => {
  const props = {
    defaultValue: 6,
    id: "testField",
    label: "Cool label",
    name: "testFieldName",
    required: true,
  } as const satisfies ComponentProps<typeof DatePicker>;

  const res = render(<DatePicker {...props} />);

  const label = res.getByTestId(TestId.DatePickerLabel);
  expect(label).toHaveAttribute("for", props.id);

  const field = res.getByTestId(TestId.DatePicker);
  expect(field).toHaveAttribute("id", props.id);
  expect(field).toHaveAttribute("name", props.name);
  expect(field).toHaveAttribute("required");
  expect(field).toHaveAttribute("value", props.defaultValue.toString());
});
