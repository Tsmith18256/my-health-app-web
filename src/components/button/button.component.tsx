import { ObjectValues } from "@/types/ObjectValues";
import { ComponentProps } from "react";

export const Button = (props: IButtonProps) => {
  const size = props.size ?? ButtonSize.Medium;
  const type = props.type ?? ButtonType.Primary;

  return (
    <button
      className={`border-3 font-semibold rounded-lg text-black w-full ${classesBySize[size]} ${classesByType[type]}`}
    >
      {props.children}
    </button>
  );
};

export const ButtonSize = {
  Small: "Small",
  Medium: "Medium",
  Large: "Large",
} as const;

export type ButtonSize = ObjectValues<typeof ButtonSize>;

export const ButtonType = {
  Danger: "Danger",
  Negative: "Negative",
  Primary: "Primary",
} as const;

export type ButtonType = ObjectValues<typeof ButtonType>;

export interface IButtonProps
  extends Pick<ComponentProps<"button">, "children"> {
  size?: ButtonSize;
  type?: ButtonType;
}

const classesBySize: Record<ButtonSize, string> = {
  [ButtonSize.Small]: "p-2",
  [ButtonSize.Medium]: "p-3 text-lg",
  [ButtonSize.Large]: "p-4 text-2xl",
};

const classesByType: Record<ButtonType, string> = {
  [ButtonType.Danger]: "bg-red-400 active:bg-red-600",
  [ButtonType.Negative]: "bg-gray-300 active:bg-gray-500",
  [ButtonType.Primary]: "bg-orange-400 active:bg-orange-600",
};
