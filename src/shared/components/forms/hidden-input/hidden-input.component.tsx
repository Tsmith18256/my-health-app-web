import { TestId } from "@/shared/enums/test-id.enum";
import type { ComponentProps } from "react";

/**
 * Adds a hidden text field to the DOM. This won't be seen by the user and is
 * simply for adding values to the `FormData` object.
 */
export const HiddenInput = ({ defaultValue, name }: IHiddenInputProps) => {
  return (
    <input
      defaultValue={defaultValue}
      data-testid={TestId.HiddenInput}
      name={name}
      type="hidden"
    />
  );
};

interface IHiddenInputProps
  extends Pick<ComponentProps<"input">, "defaultValue"> {
  /**
   * The name of the field. This will be used to look up the value from the
   * `FormData` object.
   */
  name: string;
}
