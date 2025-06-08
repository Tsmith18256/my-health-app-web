"use client";

import { ComponentProps, useCallback } from "react";
import { ObjectValues } from "@/shared/helper-types/object-values.type";
import styles from "./button.module.css";
import { TestId } from "@/shared/enums/test-id.enum";

/**
 * The main button component used throughout the app.
 */
export const Button = ({
  appearance = ButtonAppearance.Primary,
  ariaLabel,
  onClick: onClickProp,
  size = ButtonSize.Medium,
  ...buttonProps
}: IButtonProps) => {
  const onClick = useCallback<NonNullable<ComponentProps<"button">["onClick"]>>(
    (e) => {
      // Removes the outline from around the button after click is complete.
      e.currentTarget.blur();

      onClickProp?.(e);
    },
    [onClickProp],
  );

  return (
    <button
      {...buttonProps}
      aria-label={ariaLabel}
      className={`
        ${styles.button}
        ${classesBySize[size]}
        ${classesByAppearance[appearance]}
      `}
      data-testid={TestId.Button}
      onClick={onClick}
    />
  );
};

export const ButtonAppearance = {
  Danger: "Danger",
  Negative: "Negative",
  Primary: "Primary",
} as const;

export type ButtonAppearance = ObjectValues<typeof ButtonAppearance>;

export const ButtonSize = {
  Small: "Small",
  Medium: "Medium",
  Large: "Large",
} as const;

export type ButtonSize = ObjectValues<typeof ButtonSize>;

interface IButtonProps
  extends Pick<
    ComponentProps<"button">,
    "children" | "disabled" | "onClick" | "type"
  > {
  appearance?: ButtonAppearance;
  ariaLabel?: ComponentProps<"button">["aria-label"];
  size?: ButtonSize;
}

const classesByAppearance: Record<ButtonAppearance, string> = {
  [ButtonAppearance.Danger]: styles["appearance-danger"],
  [ButtonAppearance.Negative]: styles["appearance-negative"],
  [ButtonAppearance.Primary]: styles["appearance-primary"],
};

const classesBySize: Record<ButtonSize, string> = {
  [ButtonSize.Small]: styles["size-small"],
  [ButtonSize.Medium]: styles["size-medium"],
  [ButtonSize.Large]: styles["size-large"],
};
