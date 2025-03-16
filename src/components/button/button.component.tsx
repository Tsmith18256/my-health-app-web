import { ObjectValues } from "@/types/ObjectValues";
import { ComponentProps } from "react";

export const Button = (props: IButtonProps) => {
  const size = props.size ?? ButtonSize.Medium;

  return (
    <button
      className={`bg-orange-400 border-3 font-semibold rounded-lg text-black w-full ${
        classesBySize[size]
      }`}
    >
      {props.children}
    </button>
  );
};

export const ButtonSize = {
  Medium: "Medium",
  Large: "Large",
} as const;

export type ButtonSize = ObjectValues<typeof ButtonSize>;

const classesBySize: Record<ButtonSize, string> = {
  [ButtonSize.Medium]: "p-3 text-lg",
  [ButtonSize.Large]: "p-4 text-2xl",
};

export interface IButtonProps
  extends Pick<ComponentProps<"button">, "children"> {
  size?: ButtonSize;
}
