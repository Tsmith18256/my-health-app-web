import { Input } from "@/shared/components/forms/input/input.component";
import { TestId } from "@/testing/test-id.enum";
import { render } from "@/testing/react-testing-library/test.util";
import { ComponentProps } from "react";
import { expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

it("renders a label and input with the correct attributes", () => {
  const props = {
    ...baseProps,
    defaultValue: 6,
    min: 0,
    required: true,
    step: 0.1,
    type: "number",
  } as const satisfies ComponentProps<typeof Input>;

  const { getByTestId } = render(<Input {...props} />);

  const label = getByTestId(TestId.InputLabel);
  expect(label).toHaveAttribute("for", props.id);

  const field = getByTestId(TestId.InputField);
  expect(field).toHaveAttribute("id", props.id);
  expect(field).toHaveAttribute("min", props.min.toString());
  expect(field).toHaveAttribute("name", props.name);
  expect(field).toHaveAttribute("required");
  expect(field).toHaveAttribute("step", props.step.toString());
  expect(field).toHaveAttribute("type", props.type);
  expect(field).toHaveAttribute("value", props.defaultValue.toString());
});

it("defaults to a text field", () => {
  const { getByTestId } = render(<Input {...baseProps} />);

  const label = getByTestId(TestId.InputLabel);
  expect(label).toHaveAttribute("for", baseProps.id);

  const field = getByTestId(TestId.InputField);
  expect(field).toHaveAttribute("id", baseProps.id);
  expect(field).toHaveAttribute("name", baseProps.name);
  expect(field).toHaveAttribute("type", "text");
});

it("calls onChange for every character when typing in a controlled input", async () => {
  const user = userEvent.setup();
  const text = "some text";

  const onChange = vi.fn();
  const props = {
    ...baseProps,
    onChange,
    value: "",
  } as const satisfies ComponentProps<typeof Input>;

  const { getByTestId } = render(<Input {...props} />);

  const field = getByTestId(TestId.InputField);

  // Select the text field before typing
  await user.click(field);
  await user.keyboard(text);

  expect(onChange).toHaveBeenCalledTimes(text.length);
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    expect(onChange.mock.calls[i]?.[0]).toBe(char);
  }
});

const baseProps = {
  id: "testField",
  label: "Cool label",
  name: "testFieldName",
} as const satisfies Partial<ComponentProps<typeof Input>>;
