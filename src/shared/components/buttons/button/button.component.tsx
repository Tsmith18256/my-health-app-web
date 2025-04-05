import { ObjectValues } from "@/shared/helper-types/object-values/object-values.type";
import { ComponentProps } from "react";

export const Button = ({
  appearance = ButtonAppearance.Primary,
  size = ButtonSize.Medium,
  ...buttonProps
}: IButtonProps) => {
  return (
    <button
      {...buttonProps}
      className={`
        border-3
        cursor-pointer
        disabled:bg-gray-700
        disabled:cursor-not-allowed
        font-semibold
        rounded-lg
        text-black
        w-full
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

export interface IButtonProps
  extends Pick<
    ComponentProps<"button">,
    "children" | "disabled" | "onClick" | "type"
  > {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
}

const classesByAppearance: Record<ButtonAppearance, string> = {
  [ButtonAppearance.Danger]: "bg-red-400 active:bg-red-600",
  [ButtonAppearance.Negative]: "bg-gray-300 active:bg-gray-500",
  [ButtonAppearance.Primary]: "bg-orange-400 active:bg-orange-600",
};

const classesBySize: Record<ButtonSize, string> = {
  [ButtonSize.Small]: "p-2",
  [ButtonSize.Medium]: "p-3 text-lg",
  [ButtonSize.Large]: "p-4 text-2xl",
};
