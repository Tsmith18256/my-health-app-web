import { ObjectValues } from "@/types/object-values.types";
import { ComponentProps } from "react";

export const Button = (props: IButtonProps) => {
  const appearance = props.appearance ?? ButtonAppearance.Primary;
  const size = props.size ?? ButtonSize.Medium;

  return (
    <button
      className={`border-3 font-semibold rounded-lg text-black w-full ${classesBySize[size]} ${classesByAppearance[appearance]}`}
      type={props.type}
    >
      {props.children}
    </button>
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
  extends Pick<ComponentProps<"button">, "children" | "type"> {
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
