import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { expect, it, vi } from "vitest";
import { Button } from "@/shared/components/buttons/button/button.component";
import { render } from "@/testing/react-testing-library/test.util";
import { TestId } from "@/testing/test-id.enum";

it("calls onClick when clicked", async () => {
  const user = userEvent.setup();

  const onClick = vi.fn<OnClickCallback>();
  const { getByTestId } = render(<Button onClick={onClick} />);

  const button = getByTestId(TestId.Button);
  await user.click(button);

  expect(onClick).toHaveBeenCalledOnce();
});

it("doesn't call onClick when disabled", async () => {
  const user = userEvent.setup();

  const onClick = vi.fn<OnClickCallback>();
  const { getByTestId } = render(<Button disabled={true} onClick={onClick} />);

  const button = getByTestId(TestId.Button);
  await user.click(button);

  expect(onClick).not.toHaveBeenCalled();
});

type OnClickCallback = NonNullable<ComponentProps<typeof Button>["onClick"]>;
