import { ComponentProps } from "react";
import { ObjectValues } from "@/shared/helper-types/object-values.type";
import styles from './button.module.css';

export const Button = ({
  appearance = ButtonAppearance.Primary,
  size = ButtonSize.Medium,
  ...buttonProps
}: IButtonProps) => {
  return (
    <button
      {...buttonProps}
      className={`
        ${styles.button}
        ${classesBySize[size]}
        ${classesByAppearance[appearance]}
      `}
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
  size?: ButtonSize;
}

const classesByAppearance: Record<ButtonAppearance, string> = {
  [ButtonAppearance.Danger]: styles['appearance-danger'] ?? '',
  [ButtonAppearance.Negative]: styles['appearance-negative'] ?? '',
  [ButtonAppearance.Primary]: styles['appearance-primary'] ?? '',
};

const classesBySize: Record<ButtonSize, string> = {
  [ButtonSize.Small]: styles['size-small'] ?? '',
  [ButtonSize.Medium]: styles['size-medium'] ?? '',
  [ButtonSize.Large]: styles['size-large'] ?? '',
};
