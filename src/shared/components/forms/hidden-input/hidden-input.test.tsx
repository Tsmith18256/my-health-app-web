import { ComponentProps } from "react";
import { expect, it } from "vitest";
import { HiddenInput } from "@/shared/components/forms/hidden-input/hidden-input.component";
import { render } from "@/testing/react-testing-library/test.util";
import { TestId } from "@/shared/enums/test-id.enum";

it("renders a hidden input with the correct attributes", () => {
  const props = {
    defaultValue: 6,
    name: "testFieldName",
  } as const satisfies Required<ComponentProps<typeof HiddenInput>>;

  const res = render(<HiddenInput {...props} />);

  const field = res.getByTestId(TestId.HiddenInput);
  expect(field).toHaveAttribute("name", props.name);
  expect(field).toHaveAttribute("value", props.defaultValue.toString());
});
