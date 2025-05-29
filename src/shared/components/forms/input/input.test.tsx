import { Input } from "@/shared/components/forms/input/input.component";
import { TestId } from "@/testing/test-id.enum";
import { render } from "@/testing/react-testing-library/test.util";
import { ComponentProps } from "react";
import { expect, it } from "vitest";

it("renders a label and input with the correct attributes", () => {
  const props = {
    defaultValue: 6,
    id: "testField",
    label: "Cool label",
    min: 0,
    name: "testFieldName",
    required: true,
    step: 0.1,
    type: "number",
  } as const satisfies Required<ComponentProps<typeof Input>>;

  const res = render(<Input {...props} />);

  const label = res.getByTestId(TestId.InputLabel);
  expect(label).toHaveAttribute("for", props.id);

  const field = res.getByTestId(TestId.InputField);
  expect(field).toHaveAttribute("id", props.id);
  expect(field).toHaveAttribute("min", props.min.toString());
  expect(field).toHaveAttribute("name", props.name);
  expect(field).toHaveAttribute("required");
  expect(field).toHaveAttribute("step", props.step.toString());
  expect(field).toHaveAttribute("type", props.type);
  expect(field).toHaveAttribute("value", props.defaultValue.toString());
});

it("defaults to a text field", () => {
  const props = {
    id: "testField",
    label: "Cool label",
    name: "testFieldName",
  } as const satisfies ComponentProps<typeof Input>;

  const res = render(<Input {...props} />);

  const label = res.getByTestId(TestId.InputLabel);
  expect(label).toHaveAttribute("for", props.id);

  const field = res.getByTestId(TestId.InputField);
  expect(field).toHaveAttribute("id", props.id);
  expect(field).toHaveAttribute("name", props.name);
  expect(field).toHaveAttribute("type", "text");
});
